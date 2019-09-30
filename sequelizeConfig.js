const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const conexaoDB = {
  name: process.env.MSSQL_DB,
  username: process.env.MSSQL_USUARIO,
  password: process.env.MSSQL_SENHA,
  options: {
    timezone: process.env.MSSQL_TIMEZONE,
    logging: false,
    dialect: 'mssql',
    host: process.env.MSSQL_HOST,
    port: process.env.MSSQL_PORTA,
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
  },
};

if (process.env.NODE_ENV === 'test') {
  conexaoDB.conexao = { dialect: 'sqlite', logging: false };
}

let operatorsAliases = {};
operatorsAliases = Object.keys(Op).forEach(key => (operatorsAliases[`\$${key}`] = Op[key]));

const sequelizeConfig = new Sequelize(
  conexaoDB.name,
  conexaoDB.username,
  conexaoDB.password,
  conexaoDB.options,
);

sequelizeConfig
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = { sequelizeConfig };
