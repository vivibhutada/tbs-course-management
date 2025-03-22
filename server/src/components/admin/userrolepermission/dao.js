const getAll = ({ db, validation }) => async ( roleid) => {
  try {
    
    const fetchMenuHierarchy = async (parentMenuId) => {
      let menus = []; 

      console.log("parentMenuId ", parentMenuId);

      if (parentMenuId === null) {
        console.log("Fetching top-level menus...");
        const [topLevelMenus] = await db.sequelize.query(
          `SELECT * FROM ad_menus WHERE parentmenuid IS NULL AND deletedon IS NULL`
        );
        menus = topLevelMenus; 
      } else {
        console.log("Fetching child menus for parentMenuId ", parentMenuId);
        const [childMenus] = await db.sequelize.query(
          `SELECT * FROM ad_menus WHERE parentmenuid = :_parentmenuid AND deletedon IS NULL`,
          {
            replacements: {
              _parentmenuid: parentMenuId, 
            },
          }
        );
        menus = childMenus; 
      }

      

      // Process each menu
      const enrichedMenus = await Promise.all(
        menus.map(async (menu) => {
          
          if (!menu.menuid) {
            console.error("Menu ID is missing for menu:", menu);
            throw new Error("Invalid menu ID");
          }

          
          const [actions] = await db.sequelize.query(
            `SELECT * FROM ad_menus_actionable_mapping WHERE menuid = :_menuid`,
            {
              replacements: {
                _menuid: menu.menuid,
              },
            }
          );

          
          const menuActions = actions || [];
          
          // Fetch child menus recursively
          const childMenus = await fetchMenuHierarchy(menu.menuid);

          const [roleMenu] = await db.sequelize.query(
            `SELECT * FROM ad_rolemenumap WHERE menuid = :_menuid AND roleid = :_roleid AND status = 'Active'`,
            {
              replacements: {
                _menuid: menu.menuid,
                _roleid: roleid,
              },
            }
          );

          
          const menumapped = roleMenu.length > 0;
          
          const actionPermissions = menuActions.map(async (action) => {
            const [roleAction] = await db.sequelize.query(
              `SELECT * FROM ad_rolemenumap WHERE menuid = :_menuid AND roleid = :_roleid AND status = 'Active'`,
              {
                replacements: {
                  _menuid: menu.menuid,
                  _roleid: roleid,
                },
              }
            );
            
            const allowedActions = roleAction.length > 0 ? roleAction[0].action : null;
           
            const actionMapped = allowedActions ? allowedActions.split('|').includes(action.menus_actionable_slug) : false;
            return {
              ...action,
              actionMapped, 
            };
          });

          const actionPermissionsResults = await Promise.all(actionPermissions);

          return {
            ...menu,
            actions: actionPermissionsResults, 
            childmenu: childMenus,
            menumapped,
          };
        })
      );

      return enrichedMenus;
    };

    
    const mainmenu = await fetchMenuHierarchy(null);

    
    return { mainmenu };
  } catch (error) {
    console.error("Error fetching menus:", error);
    throw error; 
  }
};

const save = ({ db, validation }) => async (body) => {
  try {
    body.roleid = commonHelper.valueDecryption(String(body.roleid));
    // delete the existing 
    let deleteQuery = `DELETE FROM ad_rolemenumap WHERE roleid = ?;`;
    await db.sequelize.query(deleteQuery, { replacements: [body.roleid] });

    for (const item of body.permission) {
      for (let index = 0; index < item.menuId.length; index++) {
        const id = item.menuId[index];
        const isLast = index === item.menuId.length - 1;
        const action = isLast ? item.action : null;

        const query = `
          INSERT INTO ad_rolemenumap (
            menuid, roleid, action, createdby, createdon
          ) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP);
        `;
        await db.sequelize.query(query, {
          replacements: [
            id,
            body.roleid,
            action,
            body.createdby,
          ]
        });
      }
    }
    return { status: true ,message:validation.messages.permission_saved};
  } catch (error) {
    console.error("Error inserting permissions:", error);
    throw error; // Re-throw the error to handle it further upstream if needed
  }
};



  module.exports = {
    getAll,
    save
  }