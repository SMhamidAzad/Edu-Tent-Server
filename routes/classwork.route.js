const express = require('express');
const { classworkCollection } = require('../dbCollection/dbCollection');
const router = express.Router();

router.post('/', async (req, res) => {
    const query = req.body;
    const result = await classworkCollection.insertOne(query);
    res.send(result);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const query = { classId: id };
    const cursor = classworkCollection.find(query);
    const result = await cursor.toArray();
    res.send(result);
})


module.exports = router;