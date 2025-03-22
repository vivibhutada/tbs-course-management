const jwt = require("jsonwebtoken");
const db = require('./../db').db;
const keys = require('./../keys.js');
const crypto = require("./crypto.js");

const generateAccessToken = async (userData) => {
  // const jwtObj = { key: crypto.cryptoEncrypt({ employeeuuid: userData.employeeuuid, username: userData.firstname, logintime: new Date() }) };
  const jwtObj = userData
  jwtObj.logintime = new Date();
  const refresh_token = jwt.sign(userData, keys.JWT_REFRESH_SECRET, { expiresIn: keys.JWT_REFRESH_EXPIRES_IN });
  const access_token = jwt.sign(jwtObj, keys.JWT_SECURITY_KEY, { expiresIn: keys.JWT_EXPIRES_IN });

   await db.sequelize.query(
    `INSERT INTO refresh_tokens (employeeid, access_token, refresh_token, token_json) VALUES (?,?, ?, ?)`, {
      replacements: [userData.userid,access_token, refresh_token, JSON.stringify(userData)]
    });
  return access_token;
}

const authenticateToken = (routeslug) => {
  
  return async (req, res, next) => {
    const authorizationToken = req.headers['authorization'];
   
    if (authorizationToken == null)
      return res.status(403).send({ statusCode: 403, message: "You are not authorized to access this application." });

    //const token = authorizationToken.split(' ');
    //console.log(token);return false;
    const access_token = authorizationToken ; //token[1];
    //console.log(access_token);return false;
    let [validatedToken] = await db.sequelize.query(
      `SELECT * FROM refresh_tokens WHERE access_token = ? AND is_valid = "true"`, {
        replacements: [access_token]
      });
      
    if (validatedToken.length > 0 && validatedToken[0].is_valid) {
      jwt.verify(access_token, keys.JWT_SECURITY_KEY, (err, data) => {
        if (err) {
          return res.status(401).send({ statusCode: 401, message: "Session Terminated" });
        } else {
         
          let userData = JSON.parse(validatedToken[0].token_json);
         
          let menuSlugArray = userData.menuslugs;
         
          if (routeslug == '' || menuSlugArray.includes(routeslug)) {
            if(userData.type=='customer'){  req.customer = data; }
            else{  req.user = data;}
            next();
          } else {
            // Invalid API Access
            return res.status(404).send({ statusCode: 404, message: "You do not have the necessary permissions to perform this action on this record.", status: 'Not Found' });
          }
        }
      });
    } else {
      // Invalid Token - Logout Token
      return res.status(403).send({ statusCode: 403, message: "You are not authorized to access this application." });
    }
  }
}

const refreshToken = async (req, res, next) => {
  const authorizationToken = req.headers['authorization'];
  if (authorizationToken == null)
    return res.status(403).send({ statusCode: 403, message: "You are not authorized to access this application." });

  const token = authorizationToken.split(' ');
  const access_token = token[1];

  let [validatedToken] = await db.sequelize.query(
    `SELECT * FROM refresh_tokens WHERE access_token = ? AND is_valid = true`, {
      replacements: [access_token]
    });
  
  if (validatedToken.length > 0 && validatedToken[0].is_valid) {
    jwt.verify(validatedToken[0].refresh_token, keys.JWT_REFRESH_SECRET, async(err, data) => {
      if (err) {
        return res.status(403).send({ statusCode: 403, message: "You are not authorized to access this application." });
      } else {
        let userData = JSON.parse(validatedToken[0].token_json);
        userData.date = new Date();
        let new_access_token =  await generateAccessToken(userData);
        if (new_access_token) {
          return res.status(200).send({ statusCode: 200, message: '', data: crypto.cryptoEncrypt({ accessToken: new_access_token }) });
        }
      }
    });
  } else {
    // Invalid Token - Logout Token
    return res.status(403).send({ statusCode: 403, message: "You are not authorized to access this application." });
  }
}

const clearToken = async (req, res, next) => {
  const authorizationToken = req.headers['authorization'];
  if (authorizationToken == null)
    return res.status(403).send({ statusCode: 403, message: "You are not authorized to access this application." });

  const token = authorizationToken.split(' ');
  const access_token = token[1];

  await db.sequelize.query(
    `DELETE FROM refresh_tokens WHERE access_token = ?`, {
      replacements: [access_token]
    });
  
  return res.status(200).send({ statusCode: 200, message: "" });
}

const authJwt = {
  authenticateToken: authenticateToken,
  generateAccessToken: generateAccessToken,
  refreshToken: refreshToken,
  clearToken: clearToken
};

module.exports = authJwt;
