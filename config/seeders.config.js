require("dotenv").config();

module.exports = {
  development: {
    server_admin_email: process.env.server_admin_email,
    port: process.env.port,
    database_client: process.env.database_client,
    database_host: process.env.database_host,
    database_name: process.env.database_name,
    database_user: process.env.database_user,
    database_password: process.env.database_password,
    database_nullAsDefault: process.env.database_nullAsDefault,
    databaseDebug: process.env.databaseDebug,
    database_port: process.env.database_port,
    jwt_access_token_secret: process.env.jwt_access_token_secret,
    jwt_expiry_time: process.env.jwt_expiry_time,
    email_host: process.env.email_host,
    email_port: process.env.email_port,
    admin_email: process.env.admin_email,
    admin_password: process.env.admin_password,
    redis_endpoint_url: process.env.redis_endpoint_url,
    redis_username: process.env.redis_username,
    redis_password: process.env.redis_password,
    redis_port: process.env.redis_port,
    redis_expiration_time: process.env.redis_expiration_time,
    access_token_secret: process.env.access_token_secret,
    flw_public_key : process.env.flw_public_key,
    flw_secret_key: process.env.flw_secret_key,
    flw_encryption_key: process.env.flw_encryption_key
  }
}