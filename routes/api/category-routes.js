const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const allCategories = await Category.findAll({
    include: [{ model: Product }], // Include associated Products
  }).catch((err) => {
    res.json(err);
  });
  res.json(allCategories);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryById = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  });

  if (!categoryById) {
    return res.status(404).json({ message: 'Category does not exist'});
  }

  res.json(categoryById);
  } 
);

router.post('/', async (req, res) => {
  // create a new category
  const newCategory = await Category.create({
    category_name: req.body.category_name,
  })
  res.status(201).json(newCategory);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryById = await Category.update({
    category_name: req.body.category_name,
  },
  {
    where: {
      id: req.params.id,
    }
  })
  res.status(200).json(categoryById)
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
  await Category.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((deletedCategory) => {
    res.status(200).json({ message: 'Category sucessfully deleted.'});
  })
} catch {
  res.status(500).json({ message: 'There was an error deleting the category.'})
}
});

module.exports = router;
