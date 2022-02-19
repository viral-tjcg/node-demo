const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const fs = require("fs");
const path = require('path');
const app = express();
var {firebase,Product} = require('./src/config/database');

//for constant varible and language file
const constants = require('./src/config/constants');
const language = require('./src/config/language');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

//get data for .env file
const dotenv = require('dotenv');
dotenv.config();

app.use('/upload', express.static(path.join(__dirname, '/upload')));

//for upload the file
let url = constants.product_image_path;
const multer  = require('multer')
var Storage = multer.diskStorage({
  destination: function(req, file, cb) {
      // Uploads is the Upload_folder_name 
      cb(null, "upload/")
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});
var upload = multer({
  storage: Storage
}).single('image');
//end for upload the file

//create a new user
app.post("/create", async (req, res) => {
  const data = req.body;

  //create a user
  firebase.auth().createUserWithEmailAndPassword(req.body.name, req.body.password).then(function(value) {
    res.send({ msg: value, status: true });
    }).catch(function(error) {
        res.send({ msg: error, status: false });
    });
});

//login with email id & password
app.post("/login", async (req, res) => {
  const data = req.body;

  //sign In the user
  firebase.auth().signInWithEmailAndPassword(req.body.name, req.body.password).then((firebaseUser) => {
    if (firebaseUser) {
      res.send({ msg: language.user_login ,userdata : firebaseUser });
    }else{
      res.send({ msg: language.user_login_error, status: false });
    }
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      res.send({ msg: language.wrong_password, status: false });
    } else {
      res.send({ msg: errorMessage, status: false });
    }
    console.log(error);
  });
});

//get a product list
app.get("/getProduct", async (req, res) => {
  const snapshot = await Product.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  //set a full image
  list.forEach(element => {
    list[list.indexOf(element)]['image_path'] = url + element['image'];
  });
  res.send(list);
});

//insert the product
app.post('/createProduct', upload, function (req, res) {
  const data = req.body;
  var productData = {
    "title" : req.body.title,
    "description" : req.body.description,
    "image" : req.file.filename,
  }

  Product.add(productData);
  res.send({ msg: language.product_add });
});

//update the product
app.post('/updateProduct', upload, function (req, res) {
  const data = req.body;
  const id = req.body.id;
  var productData = {}
	if(req.file) {
		productData = {
		"title" : req.body.title,
		"description" : req.body.description,
		"image" : req.file.filename,
	  }
	} else {
		productData = {
		"title" : req.body.title,
		"description" : req.body.description,
	  }
	}

  Product.doc(id).update(productData);
  res.send({ msg: language.product_update });
});

//delete the product
app.post("/deleteProduct", async (req, res) => {
  const id = req.body.id;
  await Product.doc(id).delete();
  res.send({ msg: language.product_delete });
});

// run a project on given server
//app.listen(process.env.PORT, () => console.log("Up & RUnning *"+process.env.PORT));

module.exports = app;