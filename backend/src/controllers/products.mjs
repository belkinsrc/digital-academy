import Product from '../models/product.mjs';

async function getProducts(req, res) {
  try {
    const { popular, category } = req.query;
    const query = {};

    if (category) {
      if (category !== 'all') {
        query.category = category;
      }
    }
    if (popular === 'true') {
      query.isPopular = true;
    }
    const products = await Product.find(query);
    res.status(200);
    res.json(products);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
}

async function getProductsById(req, res) {
  try {
    const { data } = req.body;
    const products = await Promise.all(
      data.ids.map(async (id) => {
        const product = await Product.findById(id);
        return product;
      })
    );
    if (data['info'] !== undefined && data['info'] !== false) {
      const productsInfo = products.map(({ price }) => {
        return {
          price,
        };
      });
      res.status(200);
      res.json(productsInfo);
    } else {
      res.status(200);
      res.json(products);
    }
  } catch (error) {
    res.status(500);
    res.json(error);
  }
}

export { getProducts, getProductsById };
