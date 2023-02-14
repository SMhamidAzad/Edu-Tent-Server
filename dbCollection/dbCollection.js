const client = require("../utiles/dbConnection");

// all collection 
    const userCollection = client.db('onlineClassroom').collection('users');
    const classCollection = client.db('onlineClassroom').collection('classes');
    const classworkCollection = client.db('onlineClassroom').collection('work');
    const profileCollection = client.db('onlineClassroom').collection('profile');
    const enrollclassCollection = client.db('onlineClassroom').collection('enroll');


    module.exports={userCollection,classCollection,classworkCollection,profileCollection,enrollclassCollection}