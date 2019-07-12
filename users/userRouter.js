//Connecting files
const express = require('express');

const User = require('./userDb.js');

const router = express.Router();

//Middleware
router.use(express.json());

function validateUserId(req, res, next) {
  const { id } = req.params;

  User.getById(id)
    .then(res => {
      if(res) {
        console.log(res);
        req.user = res;
        next();
      } else {
        res.status(400).json({ message: `Invalid user id: ${id}` });
      }
    })
    .catch(error => {
      res.status(500).json(error)
    });
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

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params;

  User.getUserPosts(id)
    .then(userPosts => {
      res.status(200).json(userPosts)
    })
    .catch(() => {
      res.status(500).json({
        error: "The user's post information could not be retrieved."
      })
    });
});

//The D in CRUD
router.delete('/:id', validateUserId, (req, res) => {
  const { id } = req.params;

  User.remove(id)
    .then(deleted => {
      res.status(204).end()
    })
    .catch(() => {
      res.status(500).json({
        error: "The user information could not be deleted."
      })
    });
});

//The U in CRUD
router.put('/:id', (req, res) => {

});

//custom middleware
function validatePost(req, res, next) {

};

module.exports = router;
