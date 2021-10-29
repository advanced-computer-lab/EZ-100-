const express = require("express");
const mongoose = require('mongoose');


const MongoURI = 'mongodb+srv://alaa:1234@cluster0.6ulyk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


//App variables
const app = express();
const port = process.env.PORT || "8000";
const User = require('./models/User');
// #Importing the userController
const userController = require('./Routes/userController');
const routes = require('./Routes/userRoutes');

// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

app.get("/Home", (req, res) => {
    res.status(200).send("You have everything installed !");
  });

// #Routing to usercontroller here
//app.use(routes);


// app.use((req,res)=>{
//   res.status(404).send('<h1> 404 oops! </h1> <hr> <h2> Page Not Found! </h2>')
// });
/*
                                                    End of your code
*/


// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
