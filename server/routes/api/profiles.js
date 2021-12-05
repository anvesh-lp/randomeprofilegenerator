const express = require('express')
const mongoDbDriver = require('mongodb')
const {request} = require("express");
const router = express.Router();


// Moongo Db Cloud Database URL
const mongoUrl = 'mongodb+srv://ganesh:AsEFyTpSYKtrcJm1@profiles.bvvtf.mongodb.net/profiles?retryWrites=true&w=majority'

//Get Profiles
router.get('/', async (req, res) => {
    const posts = await loadProfilesCollection();
    res.send(await posts.find({}).toArray())
})


//add Profiles
router.post('/', async (req, res) => {
    const profiles = await loadProfilesCollection();
    console.log(req.body)
    await profiles.insertOne({
        name: req.body.name,
        createdAt: new Date()
    });
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    res.status(201).send();
});

//Deleting profiles
router.delete("/:id", async (req, res) => {
    const profiles = await loadProfilesCollection();
    await profiles.deleteOne({
        _id: new mongoDbDriver.ObjectID(req.params.id)
    });
    res.status(200).send();
})

// Loading the profiles from the mongo db
async function loadProfilesCollection() {
    //Connecting to mongo db client
    const client = await mongoDbDriver.MongoClient.connect(
        mongoUrl, {useNewUrlParser: true}
    );
    return client.db('profiles').collection("profiles");
}



module.exports = router;