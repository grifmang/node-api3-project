const express = require('express');
const data = require('./userDb');
const posts = require('../posts/postDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  data.insert(req.body)
  .then(response => {
    res.status(201).json({ message: "user created" });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "Error creating user." });
  })

});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const sendPackage = {
    user_id: id,
    text: req.body.text
  }
  posts.insert(sendPackage)
  .then(response => {
    res.status(201).json({ message: 'New post created.'})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: 'Post was not added, something went wrong.' });
  })
});

router.get('/', (req, res) => {
  // do your magic!
  data.get()
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "Something went wrong." })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  data.getById(req.params.id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "Error getting user." })
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  posts.getById(req.params.id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "No Posts." })
  })
  
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  data.remove(req.params.id)
  .then(response => {
    res.status(200).json({ message: "User Deleted." })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: "User was not deleted." });
  })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const { name } = req.body;
  data.update(id, name)
  .then(() => {
    return res.status(200).json({ message: "User Updated"});
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({ error: "User was not updated." });
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const userIds = [];
  if (req.params.id) {
    const { id } = req.params;
    data.get()
      .then(response => {
        response.map(element => {
          userIds.push(element.id);
        })
        
        if (userIds.includes(Number(id))) {
          next();
        }
        else {
          res.status(400).json({ error: 'Invalid' });
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing user data" })
  }
  else {
    if (req.body.name) {
      next();
    }
    else {
      res.status(400).json({ message: "missing required name field" }
      )
    } 
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing post data" })
  }
  else {
    if (req.body.text) {
      next();
    }
    else {
      res.status(400).json({ message: "missing required text field" }
      )
    } 
  }
}

module.exports = router;
