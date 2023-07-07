const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
const jwt = require("jsonwebtoken")
dotenv.config({ path: './config.env' });
require('./db/conn');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
const User = require('./model/RegistrationSchema');
const Transaction = require('./model/TransactionHistory');
const Report = require('./model/UserReportSchema');
const UserDownloadHistory = require('./model/UsersDownloadHistory');



//Middleware function for authorization of Labeller

const authorizeMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    console.log("Token Missing");
    return res.status(401).json({ message: "Authorization Token Missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    if (decoded.Role !== "Labeller") {
      console.log("Unauthorized Access");
      return res.status(403).json({ message: "Unauthorized Access" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Invalid Token or Token Expired");
    res.status(403).json({ message: "Invalid Token or Token expired" });
  }
};




app.get('/', (req, res) => {
  res.send("Hello welcome to home page");
});





app.post('/UpdateBug', authorizeMiddleware, async (req, res) => {
  try {
    const db = mongoose.connection.useDb('PMS');
    await db.collection('UserReports').updateOne({
      'Bugs': req.body.data.OldBug
    },
      { $set: { 'Bugs.$[elem]': req.body.data.NewBug } },
      { arrayFilters: [{ 'elem': req.body.data.OldBug }] }
    );
    console.log("Updation of Bug done Successfully");
    res.status(200).json({ message: 'Bugs updated successfully.' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating bug.' });
  }

}
)

app.post('/UpdateFeature', authorizeMiddleware, async (req, res) => {
  try {
    const db = mongoose.connection.useDb('PMS');
    await db.collection('UserReports').updateOne(
      { 'Features': req.body.data.OldFeature },
      { $set: { 'Features.$[elem]': req.body.data.NewFeature } },
      { arrayFilters: [{ 'elem': req.body.data.OldFeature }] }
    );
    console.log("Updation of feature done Successfully");
    res.status(200).json({ message: 'Feature is successfully updated.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating Feature.' });
  }
});




app.get('/api/data', authorizeMiddleware, (req, res) => {
  const db = mongoose.connection.useDb("PMS");
  db.collection('UserReports').find({}).toArray()
    .then((data) => {
      if (data.length === 0) {
        res.status(404).json({ message: 'No data found' });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error finding data', error: error.message });
    });
})
app.delete('/deleteBug', authorizeMiddleware, async (req, res) => {
  try {
    const { tobeDeleted } = req.body;
    console.log(tobeDeleted);
    const report = await Report.findOne({ Bugs: tobeDeleted })
    if (!report) {
      return res.status(404).send('Bug Not found');
    }
    report.Bugs = report.Bugs.filter((value) => value != tobeDeleted);
    await report.save();
    res.send(`${tobeDeleted} Bug deleted Successfully`);
    console.log(`${tobeDeleted} Bug deleted Successfully`);
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})


app.delete("/deleteBugsFeatures", async (req, res) => {
  try {
    const { tobeDeletedBugs, tobeDeletedFeatures } = req.body;
    console.log(tobeDeletedBugs);
    for (let i = 0; i < tobeDeletedBugs.length; i++) {
      const report = await Report.findOne({ Bugs: tobeDeletedBugs[i] });
      if (!report) {
        return res.status(404).send("Bugs Not found");
      }
      report.Bugs = report.Bugs.filter((value) => value !== tobeDeletedBugs[i]);
      await report.save();
      console.log(`${tobeDeletedBugs[i]}deleted Successfully`);
    }
    console.log(tobeDeletedFeatures);
    for (let i = 0; i < tobeDeletedFeatures.length; i++) {
      const report = await Report.findOne({ Features: tobeDeletedFeatures[i] });
      if (!report) {
        return res.status(404).send("Features not found");
      }
      report.Features = report.Features.filter((value) => value !== tobeDeletedFeatures[i]);
      await report.save();
      console.log(`${tobeDeletedFeatures[i]} value deleted Successfully`);
    }
    res.send("Bugs and Features deleted Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


app.delete('/deleteFeature', authorizeMiddleware, async (req, res) => {
  try {
    const { tobeDeleted } = req.body;
    console.log(tobeDeleted);
    const report = await Report.findOne({ Features: tobeDeleted })
    if (!report) {
      return res.status(404).send('Report Not found');
    }
    report.Features = report.Features.filter((value) => value != tobeDeleted);
    await report.save();
    res.send(`${tobeDeleted} Feature deleted Successfully`);
    console.log(`${tobeDeleted} Feature deleted Successfully`);

  }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})


app.post('/Report', (req, res) => {
  console.log(req.body);
  if (!req.body.Software) {
    return res.status(422).json("Please fill the Software properly");
  }
  const report = new Report({ Software: req.body.Software, Bugs: req.body.Bugs, Features: req.body.Features });
  report.save().then(() => {
    res.status(201).json({ message: "Report successfully Stored" });
  }).catch((err) => res.status(500).json({ err: "Failed to Store Report" }));
})


app.post('/TransactionHistory', (req, res) => {
  console.log(req.body);
  const { usertype, username, status, transactionHash, blockHash, contractAddress, blockNumber, gasUsed, from, to, typeOfTransaction } = req.body;
  const transaction = new Transaction({ usertype, username, status, transactionHash, blockHash, contractAddress, blockNumber, gasUsed, from, to, typeOfTransaction });
  transaction.save().then(() => {
    res.status(201).json({ message: "Trasaction Details successfully stored" });

  }).catch((err) => res.status(500).json({ err: "Failed to Store transaction" }));
})



app.get('/api/getTransactionHistory', (req, res) => {

  const usertype = req.query.usertype;
  const username = req.query.username;
  console.log(usertype);
  console.log(username);
  const db = mongoose.connection.useDb("PMS");
  db.collection('transactions').find({ usertype: usertype, username: username }).toArray()
    .then((data) => {
      if (data.length === 0) {
        res.status(404).json({ message: 'No data found' });
      } else {
        console.log(data);
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error finding Transaction History', error: error.message });
    });
})




app.post('/Register', (req, res) => {
  console.log(req.body);
  if (!req.body.Username || !req.body.Password || !req.body.Email) {
    return res.status(422).json("Please fill the fields properly");
  }
  User.findOne({ Email: req.body.Email }).then((Userpresent) => {
    if (Userpresent) {
      return res.status(422).json("UserName or Email Already Exits");
    }
    else {
      const user = new User({ Username: req.body.Username, Password: req.body.Password, Email: req.body.Email });
      user.save().then(() => {
        res.status(201).json({ message: "user registered successfully" });
      }).catch((err) => res.status(500).json({ err: "Failed to register" }));
    }
  }).catch((err) => console.log(err));
});


app.post('/downloadPatch', async (req, res) => {
  console.log(req.body);
  const { Username, Patchname } = req.body;
  try {
    const downloadHistory = new UserDownloadHistory({ Username: Username, Patchname: Patchname });
    downloadHistory.save().then(() => {
      res.status(201).json({ message: "Download history saved successfully" });
    }).catch((err) => res.status(500).json({ err: "Failed to save download history" }));
  }
  catch (error) {
    console.log(error);
  }
})

app.get('/getDownloadHistory', async (req, res) => {
  console.log(req.query);
  const { Username } = req.query;
  const db = mongoose.connection.useDb("PMS");
  db.collection('downloadhistories').find({Username:Username}).toArray()
    .then((data) => {
      if (data.length === 0) {
        res.status(404).json({ message: 'No data found for given username' });
      } else {
        const patchNames = data.map((data) => data.Patchname);
        res.status(200).json(patchNames);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error finding data', error: error.message });
    });

})
// http://localhost/getdownloadHistory/patchname
app.get('/getdownloadHistory/patchname',async(req,res)=>{
  console.log(req.query);
  const { Patchname }=req.query;
  const db=mongoose.connection.useDb("PMS");
  db.collection('downloadhistories').find({Patchname:Patchname}).toArray()
  .then((data)=>{
    if(data.length===0){
      res.status(404).json({message:"No data found for given patchname"});
        }
        else{
          res.status(200).json(data);
        }
  }).catch((error)=>{
    res.status(500).json({message:"Error finding data",error:error.message});
  })
})

app.post('/authentication', async (req, res) => {
  const { Username, Password } = req.body;
  console.log(Username, Password);
  try {
    const user = await User.findOne({ Username: Username });
    console.log(user);
    if (user && user.Password == Password) {
      const tokenPayload = {
        Username: user.Username,
        Role: user.Role
      }
      const Username = user.Username;
      const Role = user.Role;
      const token = jwt.sign(tokenPayload, process.env.SECRETKEY, { expiresIn: '1h' });
      res.status(200).json({ token, Username, Role });
    }
    else {
      res.status(401).json({ message: 'Authentication failed! Unauthorized access' });
    }
  }
  catch (error) {
    console.error('Error occurred during authentication:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.listen(process.env.PORT, () => {
  console.log(`server is running from port ${process.env.PORT}`);
});