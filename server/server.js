const cors = require('cors');
const express = require('express');
const sequelize = require('./sequelize');
const path = require('path');

const app = express();
const port = 8080;



app.use(cors());
app.use(express.json());
app.use(express.static(path.join(path.resolve(), 'public')))

app.use("/Candidate", require("./Routes/Candidate"));
app.use("/JobPosting", require("./Routes/JobPosting"));
app.use("/JobPostings", require("./Routes/JobPostings"));

app.listen(process.env.PORT || port, () => {
    try {
        console.log("Server is running...");
    } catch (error) {
        console.error(error);
    }
});