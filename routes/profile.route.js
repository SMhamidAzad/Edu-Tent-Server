const express = require('express');
const { profileCollection } = require('../dbCollection/dbCollection');
const router = express.Router();

// router.post('/', async (req, res) => {
//     const profile = req.body;
//     const result = await profileCollection.insertOne(profile);
//     res.send(result);
//   })

  router.put('/:email', async (req, res) => {
    const email = req.params.email;
    const filter = { email: email };
    const profile = req.body;
    const options = { upsert: true };
    const updateDoc = {
      $set: profile,
    };
    const result = await profileCollection.updateOne(filter, updateDoc, options);
    res.send({ success: true, result });
  });
  router.get('/', async (req, res) => {
    const email = req.query.email;
    const query = { email: email };
    const cursor = profileCollection.find(query);
    const result = await cursor.toArray();
    res.send(result);
  })

module.exports=router;