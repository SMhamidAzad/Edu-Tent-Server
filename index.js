const express = require('express');
const cors = require('cors');
require('dotenv').config();
const client = require('./utiles/dbConnection');
const userRouter = require('./routes/user.route');
const adminRouter = require('./routes/admin.route');
const classRouter = require('./routes/class.route');
const classworkRouter = require('./routes/classwork.route');
const profileRouter = require('./routes/profile.route');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function run(){
  try{
    await client.connect();

    app.use('/user',userRouter);
    app.use('/admin',adminRouter);
    app.use('/class',classRouter);
    app.use('/classwork',classworkRouter);
    app.use('/profile',profileRouter);
  }
  finally{}
}
run().catch(console.dir);
app.get('/', (req,res)=>{
    res.send('Running server for online classroom');
})
app.listen(port, ()=>{
    console.log('Listening to port ',port);
})




