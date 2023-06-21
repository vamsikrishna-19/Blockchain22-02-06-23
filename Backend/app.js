const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({ path: './config.env' });
require('./db/conn');


app.use(express.json());
const User = require('./model/RegistrationSchema');
const port = process.env.PORT;


app.get('/', (req, res) => {
  res.send("Hello welcome to home page");
});


// app.post('/send',(req,res)=>{
//     const userData = req.body;
//     const newUser={
//       Username: userData.Username,
//       Password:userData.Password,

//     };
//     const db=mongoose.connection.useDb("PMS");
//     db.collection('Registration').insertOne(newUser)
//     .then(()=>{
//       res.status(201).json({ message: 'Registration created successfully' });
//     })
//     .catch((error)=>{
//       res.status(500).json({ message: 'Error creating user' });
//     });
// })
// app.post('/delete',(req,res)=>{
//     const userData = req.body;
//     const newUser={
//       Username: userData.Username,
//       Password:userData.Password,

//     };
//     const db=mongoose.connection.useDb("PMS");
//     db.collection('Registration').deleteOne({Username:req.body.Username})
//     .then(()=>{
//       res.status(201).json({ message: 'Registration deleted successfully' });
//     })
//     .catch((error) => {
//       res.status(500).json({ message: 'Error deleting user' });
//     });
// });

// app.get('/find',(req,res)=>{
//     const userData = req.body;
//     const db=mongoose.connection.useDb("PMS");
//     db.collection('Registration').find().toArray()
//     .then((data) => {
//       if (data.length === 0) {
//         res.status(404).json({ message: 'User not found' });
//       } else {
//         res.status(200).json(data);
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({ message: 'Error finding user', error: error.message });
//     });
// });


// app.post('/update', (req, res) => {
//   const Username = req.body.Username;
//   const updatedData = req.body; 
//   const db=mongoose.connection.useDb("PMS");
//   db.collection('Registration').updateOne({ Username: Username }, { $set: updatedData })
//     .then(() => {
//       res.status(200).json({ message: 'User Registration updated successfully' });
//     })
//     .catch((error) => {
//       res.status(500).json({ message: 'Error updating user', error: error.message });
//     });
// });




app.post('/Register', (req, res) => {
  console.log(req.body);
  // res.json({message:req.body})
  if (!req.body.Username || !req.body.Password) {
    return res.status(422).json("Please fill the fields properly");
  }
  User.findOne({ Username: req.body.Username }).then((UserNamepresent) => {
    if (UserNamepresent){
      return res.status(422).json("UserName Already Exits");
    }
    else{
      const user = new User({ Username: req.body.Username, Password: req.body.Password });
      user.save().then(() => {
        res.status(201).json({ message: "user registered successfully" });
      }).catch((err) => res.status(500).json({ err: "Failed to register" }))
    }
  }).catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`server is running from port ${port}`);
});