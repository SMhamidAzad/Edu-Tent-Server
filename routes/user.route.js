const express = require('express');
const { userCollection } = require('../dbCollection/dbCollection');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.get('/', async (req, res) => {
    const allUser = await userCollection.find().toArray();
    res.send(allUser);
});

router.put('/:email', async (req, res) => {
    const email = req.params.email;
    const user = req.body;
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
        $set: user,
    };
    const result = await userCollection.updateOne(filter, updateDoc, options);
    const token = jwt.sign({ email: email }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '2h' })
    res.send({ result, token });
})

router.put('/admin/:email', async (req, res) => {
    const email = req.params.email;
    const filter = { email: email };
    const updateDoc = {
        $set: { role: 'admin' },
    };
    const result = await userCollection.updateOne(filter, updateDoc);
    res.send(result);
})

module.exports=router