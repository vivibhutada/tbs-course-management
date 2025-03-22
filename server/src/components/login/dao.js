const MailTemplate=require('../../utils/mailUtility')
const bcrypt = require('bcrypt');

const checklogin = ({ db,keys }) => async ({ loginid, password, }) => {
    try {
        const [user] = await db.sequelize.query(`select userid,loginid,firstname,lastname,email,mobile,profile,password from ad_users au where status ='Active' and loginid = ? `,
        {  replacements: [loginid], type: db.sequelize.QueryTypes.SELECT });
                // console.log("keys",keys);
        if(user){
            const isPasswordMatch = await bcrypt.compare(password,user.password);
            if(!isPasswordMatch){
            return false;
            }
            //const otp = Math.floor(Math.random() * 900000) + 100000;
            const otp = 111111;
            //sendOTP(user.mobile,user.email);
            await db.sequelize.query(`UPDATE ad_users set otp=?, otptimeout=date_add(now(),INTERVAL `+keys.OTP_TIMEOUT+` minute) where userid = ? and status ='Active'`,
            {replacements: [otp,user.userid]});
                let payload={
                    userid:user.userid.toString(),
                    otp:otp.toString(),
                    otp_timeout:keys.OTP_TIMEOUT
                }
                //new MailTemplate(db,'otp_email',payload);
            }
        return user;
        
    } catch (error) {
        throw new Error(error);
    }
    
}
const verifylogin = ({ db }) => async ({ loginid,password,  otp }) => {
    try {
        const [user] = await db.sequelize.query(`select userid,loginid,firstname,lastname,email,mobile,profile,password from ad_users au where status ='Active' and loginid = ? and otp= '${otp}' and otptimeout >= now() `,
        {  replacements: [loginid,otp], type: db.sequelize.QueryTypes.SELECT });
        if(user){
            const isPasswordMatch = await bcrypt.compare(password,user.password);
            if(!isPasswordMatch){
                return false;
            }
            const t = await db.sequelize.query(`UPDATE ad_users set otp=null, otptimeout=null where userid = ? and status ='Active'`,{replacements: [user.userid]});
            console.log(t);
        }
        return user;
    } catch (error) {
        throw new Error(error);
    }
    
}
const userrolemenu = ({ db }) => async ({ userid }) => {
    const [menus] = await db.sequelize.query(`select m.menuid,m.parentmenuid,m.displaymenuname as title,m.singularmenuname as subtitle,m.icon,m.menupath as path,m.source,'false' as active,'false' as selected,case when menutype = 'Tree Menu' then 'sub' else 'link' end as type,m.menutype from ad_menus m where m.status = 'Active' AND isAdmin = 'true' order by m.orderno asc `);
    const [rolemenu] = await db.sequelize.query(`select ar.menuid, m.menuslug from ad_userrolemap au inner join ad_rolemenumap ar on ar.roleid =au.roleid inner join ad_menus m on m.menuid=ar.menuid where au.userid=${userid} group by ar.menuid`);
    const menuslugsArray = rolemenu.map(item => item.menuslug);
    const menuHierarchy = buildMenuHierarchy(menus,rolemenu);
    return {'menuHierarchy':menuHierarchy,'menuslugs':menuslugsArray};
}

function buildMenuHierarchy(data,rolemenu, parentId = null) {
    const children = data
      .filter(item => item.parentmenuid === parentId && rolemenu.some(mapping =>mapping.menuid === item.menuid))
      .map(item => ({
        ...item,
        children: buildMenuHierarchy(data,rolemenu, item.menuid),
      }));
    return children.length > 0 ? children : null;
}

module.exports = {
    checklogin,
    verifylogin,
    userrolemenu,
}