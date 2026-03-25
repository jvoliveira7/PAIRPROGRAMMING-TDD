const { Sequelize } = require('sequelize');
// const config = require('./config');

// const env = process.env.NODE_ENV || 'development';
// const dbConfig = config[env];

// const sequelize = dbConfig.storage
//   ? new Sequelize({ dialect: 'sqlite', storage: dbConfig.storage, logging: dbConfig.logging })
//   : new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
//       host: dbConfig.host,
//       port: dbConfig.port,
//       dialect: dbConfig.dialect,
//       logging: false,
//     });

// --- NOSSA CONEXÃO DIRETA COM O XAMPP ---
const sequelize = new Sequelize('biblioteca_teste', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;