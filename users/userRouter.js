//Connecting files
const express = require('express');

const User = require('./userDb.js');

const router = express.Router();

//Middleware
router.use(express.json());

function validateUserId(req, res, next) {
  const { id } = req.params;
  console.log(req.params.id)
  if(id) {
    res.status(400).json({ message: "invalid user id" });
  } else {
    next();
  }
};

function validateUser(req, res, next) {
  const { name } = req.body;

  if(!name) {
    res
    .status(400)
    .json({ errorMessage: "Please provide a name for the user." })
  } else {
    next();
  }
};

//The C in CRUD
router.post('/', validateUser, (req, res) => {
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(() => {
      res.status(500),json({
        error: "There was an error while saving the user to the database"
      });
    });
});

router.post('/:id/posts', (req, res) => {

});

//The R in CRUD
router.get('/', (req, res) => {
  User.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(() => {
      res.status(500).json({
        error: "The user information could not be retrieved."
      });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  User.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(() => {
      res.status(500).json({
        error: "The User info could not be retrieved"
      });
    });
});

router.get('/:id/posts', (req, res) => {

});

//The D in CRUD
router.delete('/:id', (req, res) => {

});

//The U in CRUD
router.put('/:id', (req, res) => {

});

//custom middleware
function validatePost(req, res, next) {

};

module.exports = router;
