const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// iletileri al.(GET)
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
  });

//iletileri ekle.(ADD)
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
      text: req.body.text,
      createdAt: new Date()
    });
    res.status(201).send();
  });

//iletileri sil.(DELETE)
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send({});
  });

//iletileri güncelle.(UPDATE)

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
      'mongodb+srv://dementor:dementor123@veritabani-yuftm.mongodb.net/test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
        
      }
    );
  
    return client.db('deneme').collection('posts');
  }



module.exports = router;
