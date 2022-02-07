const { Sequelize } = require('sequelize');

const {config} = require('dotenv');

config({});

let sequelize;

if (process.env.MODE === 'development') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/examen.db',
    define: {

      timestamps: false
    }
  });
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
}


sequelize.sync({ alter: true }).then(() => {
  console.log('All models were syncronized successfully');
});

module.exports = sequelize;
