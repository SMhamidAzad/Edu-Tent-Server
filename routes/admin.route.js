const express = require('express');
const { userCollection } = require('../dbCollection/dbCollection');
const router = express.Router();

router.get('/:email', async (req, res) => {
    const email = req.params.email;
    const user = await userCollection.findOne({ email: email });
    const isAdmin = user?.role === 'admin';
    res.send({ admin: isAdmin })
  })

  module.exports=router;