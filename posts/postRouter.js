const express = require('express');

const router = express.Router();

// custom middleware
function validatePost(req, res, next) {

};


//The R in CRUD
router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

//The D in CRUD
router.delete('/:id', (req, res) => {

});

//The U in CRUD
router.put('/:id', (req, res) => {

});

module.exports = router;