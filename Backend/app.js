const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config({ path: './config.env' });
require('./db/conn');


app.use(express.json());
app.use(cors());
const User = require('./model/RegistrationSchema');
const Report = require('./model/UserReportSchema');
const port = process.env.PORT;


app.get('/', (req, res) => {
  res.send("Hello welcome to home page");
});





app.post('/UpdateBug', async (req, res) => {
  try {

    const db = mongoose.connection.useDb('PMS');
    await db.collection('UserReports').updateOne({
      'Bugs': req.body.data.OldBug
    },
      { $set: { 'Bugs.$[elem]': req.body.data.NewBug } },
      { arrayFilters: [{ 'elem': req.body.data.OldBug }] }
    );
    res.status(200).json({ message: 'Bugs updated successfully.' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating bug.' });
  }

}
)


app.post('/UpdateFeature', async (req, res) => {
  try {
    const db = mongoose.connection.useDb('PMS');
    await db.collection('UserReports').updateOne(
      { 'Features': req.body.data.OldFeature },
      { $set: { 'Features.$[elem]': req.body.data.NewFeature } },
      { arrayFilters: [{ 'elem': req.body.data.OldFeature }] }
    );

    res.status(200).json({ message: 'Feature is successfully updated.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating Feature.' });
  }
});


app.get('/api/data', (req, res) => {
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


app.delete('/deleteBug', async (req, res) => {
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


app.delete('/deleteFeature', async (req, res) => {
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


app.post('/authentication', (req, res) => {
  const { Username, Password } = req.body;
  try {
    const user = User.findOne({ Username: Username });
    if (user && user.Password == Password) {
      res.status(200).json({ message: 'Authentication successful!' });
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

app.listen(port, () => {
  console.log(`server is running from port ${port}`);
});