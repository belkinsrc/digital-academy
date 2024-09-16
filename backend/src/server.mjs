import fs from 'node:fs';
import express from 'express';
import cors from 'cors';
import router from './routes/index.mjs';
import { connectToDatabase, disconnectFromDatabase } from './db.mjs';
import Product from './models/product.mjs';
import Category from './models/category.mjs';

const app = express();

(async () => {
  await connectToDatabase();

  // Первоначальная инициализация данных в БД внутри сервиса mongo
  fs.readFile('/app/src/static/products.json', async (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const products = JSON.parse(data);

      for (const prdct of products) {
        const product = new Product({
          label: prdct.label,
          productName: prdct.productName,
          category: prdct.category,
          imageSrc: prdct.imageSrc,
          registration: {
            startDate: Number(prdct.registration.startDate),
            endDate: Number(prdct.registration.endDate),
          },
          startCourse: Number(prdct.startCourse),
          price: Number(prdct.price),
          isPopular: Boolean(prdct.isPopular),
        });
        await product.save();
      }
    }
  });

  fs.readFile('/app/src/static/categories.json', async (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const categories = JSON.parse(data);

      for (const ctgry of categories) {
        const category = new Category({
          name: ctgry.name,
          category: ctgry.category,
        });
        await category.save();
      }
    }
  });

  app.use(cors());
  app.use(express.json());
  app.use(router);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  process.on('SIGINT', async () => {
    await disconnectFromDatabase();
    process.exit(0);
  });
})();
