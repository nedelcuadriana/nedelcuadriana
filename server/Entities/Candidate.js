const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Candidate = sequelize.define(
    "Candidate",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                min:{
                    args:5,
                    msg:"Minim 5 caractere pentru nume"
                }
            }
        },
        cv:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                min:{
                    args:100,
                    msg:"Minim 100 caractere pentru cv"
                }
            }

        },
       email:{
           type: DataTypes.STRING,
           allowNull:false,
           validate:{
               isEmail:true
           }
       }

    }
);

module.exports = Candidate;
