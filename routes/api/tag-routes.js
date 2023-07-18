const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const allTags = await Tag.findAll();
  try {
    res.status(200).json(allTags);
  } catch {
    res.status(500).json({ message: "Error finding the tags."})
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const singleTag = await Tag.findByPk(req.params.id);
  try {
    res.status(200).json(singleTag);
  } catch {
    res.status(500).json({ message: "Tag id not found."})
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  const newTag = await Tag.create({
    tag_name: req.body.tag_name,
  });
  try {
    res.status(200).json(newTag);
  } catch {
    res.status(500).json({ message: "Error creating tag."})
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updateTagName = await Tag.update({
    tag_name: req.body.tag_name,
  },
  {
    where: {
      id: req.params.id,
    }
  }) 
  try {
    res.status(200).json(updateTagName);
  } catch {
    res.status(500).json({ message: "Error updating tag name."})
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
    .then((deletedId) => {
      res.status(200).json({ message: "Tag deleted successfully."});
    })
  } catch {
    res.status(500).json({ message: "There was an error deleting this tag."})
  }
 
});

module.exports = router;
