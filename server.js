// Declare dependencies & Variables
const express = require ('express');
const app = express();
const mysql = require ('mysql2');
const dotenv = require ('dotenv');
const cors = require ('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

// connect to db
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//check if db connection works
db.connect((err) => {
    //if there is error
    if(err) return console.log("Error connecting to db");
    
    //if no error
    console.log("Connection successful: ", db.threadId);

    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);

        //send message to the browser
        console.log('Sending message to browser...');
        app.get('/', (req, res) => {
            res.send('Server started successfully!')
        })
    });
});