const express = require('express');
const posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  posts.get()
  .then(response => {
    return res.status(200).json(response)
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong." })
  })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  posts.getById(id)
  .then(response => {
    return res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong." })
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  posts.remove(id)
  .then(() => {
    return res.status(200).json({ message: `Post ${id} Removed.` })
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong." })
  })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  if (req.body.text) {
    posts.update(id, {text: req.body.text})
    .then(() => {
      posts.getById(id)
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong." })
      })
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: "Couldn't update post." })
    })
  }
  else {
    return res.status(400).json({ error: "Text is required to update a post." })
  }
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  if (!req.params.id) {
    return res.status(400).json({ error: "No user ID found in URL." })
  }
  
  const postIds = [];
  posts.get(req.params.id)
  .then(response => {
    response.map(element => {
      return postIds.push(element.id)
    })
    if (postIds.includes(Number(req.params.id))) {
      return next(); 
    }
    else {
      return res.status(400).json({ error: "User ID not found in database." })
    }
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong." })
  })
}

module.exports = router;
