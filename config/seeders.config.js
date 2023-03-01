require("dotenv").config();

module.exports = {
  development: {
    SERVER_ADMIN_EMAIL: process.env.SERVER_ADMIN_EMAIL,
    PORT: process.env.PORT,
  },
}