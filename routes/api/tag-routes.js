const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const sequelize =require('../../config/connection');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll(
    {
      model: Tag,
      attributes: ['id', 'tag_name'],
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    }
  )
  .then(data => {
    if(!data) {
      res.status(404).json({message: 'Tag not found'});
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne(
    {
      model: Tag,
      attributes: ['id', 'tag_name'],
      where: {
        id: req.params.id
      },
      include: {
        product:['id','product_name','price', 'stock']
      }
    })
    .then(data => {
      if(!data) {
        res.status(404).json({message: `${req.params.id} tag is not found`});
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((data) => res.json(data))
  .catch(err => {
    console.error(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      if(!data) {
        res.status(404).json({ message: `${req.params.id} can not be found`});
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    if(!data) {
      res.status(404).json({ message: `${req.params.id} can not be found`});
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json(err);
  })
});

module.exports = router;
