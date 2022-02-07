const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");
const Candidate = require ('../Entities/Candidate');

const JobPosting = sequelize.define(
    "JobPosting",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                min:{
                    args:3,
                    msg:"Minim 3 caractere pentru descriere"
                }
            }
        },
        deadline:{
            type:DataTypes.DATEONLY,
         
        }

    }
);

JobPosting.hasMany(Candidate);
module.exports = JobPosting;

