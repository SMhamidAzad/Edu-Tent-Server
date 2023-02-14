const express = require('express');
const { ObjectId, CURSOR_FLAGS } = require('mongodb');
const { classCollection, enrollclassCollection } = require('../dbCollection/dbCollection');
const router = express.Router();

router.post('/', async (req, res) => {
    const classes = req.body;
    const result = await classCollection.insertOne(classes);
    res.send(result);
  })

  router.get('/', async (req, res) => {
    const query = {};
    const result = await classCollection.find(query).toArray();
    res.send(result)
  })

  router.get('/teacher/:email', async (req, res) => {
    const email =req.params.email;
    const query = { email: email };
   const cursor = await classCollection.find(query);
   const result = await cursor.toArray();
    res.send(result)
  })

  

  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await classCollection.deleteOne(query);
    res.send(result);
  });

  router.get('/:id', async (req, res) => {
    const id = req.params.id;
    // const query = { _id: ObjectId(id) };
    const query = { classId: id };
    const result = await enrollclassCollection.findOne(query);
    res.send(result)
  })

  router.get('/created/teacher/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await classCollection.findOne(query);
    res.send(result)
  })

  router.post('/enroll', async(req,res)=>{
    const {code, email} =req.body;
    const filter = { code: code };
    const enroll = await classCollection.findOne(filter);
    enroll.student=email;
    const {_id,...others}= enroll;
    others.classId=_id.toString();
    const result = await enrollclassCollection.insertOne(others)
    res.send(result)
  }) 

  router.get('/enroll/:email', async(req,res)=>{
     const email =req.params.email;
     const query = { student: email };
    const cursor =await enrollclassCollection.find(query);
    const result = await cursor.toArray();
    res.send(result)
  })

  module.exports=router;