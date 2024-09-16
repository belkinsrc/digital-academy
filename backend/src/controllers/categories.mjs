import Category from '../models/category.mjs';

async function getCategories(req, res) {
  try {
    const categories = await Category.find({});
    res.status(200);
    res.json(categories);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
}

export { getCategories };
