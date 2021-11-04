require("dotenv").config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || null,
    "database": process.env.DB_NAME || "backend_project_db_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "backend_project_db_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "backend_project_db_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
