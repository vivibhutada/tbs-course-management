module.exports = {
    // SERVICE PORT
    PORT:process.env.COMMON_PORT,
    // MYSQL DB
    MYSQL_HOST: process.env.MYSQL_HOST || '192.168.0.4',
    MYSQL_USER: process.env.MYSQL_USER || 'root' ,
    MYSQL_DB: process.env.MYSQL_DB || 'mysql_b3',
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'Sqltbs@24',
    MYSQL_PORT: process.env.MYSQL_PORT || 3306,
    // SYSTEM PARAMETER
    ISLIVE:process.env.ISLIVE,
    JWT_SECURITY_KEY:process.env.JWT_SECURITY_KEY,
    JWT_EXPIRES_IN : process.env.JWT_EXPIRES_IN || '12h',
    JWT_REFRESH_SECRET : process.env.JWT_REFRESH_SECRET || 'indigrow2024',
    JWT_REFRESH_EXPIRES_IN : process.env.JWT_REFRESH_EXPIRES_IN || '24h',
    CRYPTO_SECURITY_KEY:process.env.CRYPTO_SECURITY_KEY,
    HMA_SECURITY_KEY:process.env.HMA_SECURITY_KEY,
    UAT_PASSWORD:process.env.UAT_PASSWORD,
    OTP_TIMEOUT:process.env.OTP_TIMEOUT,
  };


  