import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fs from 'fs/promises'
import path from 'path'
import express from 'express'
import cors from 'cors'
import router from './routes/index.mjs'
import { connectToDatabase, disconnectFromDatabase } from './db.mjs'
import Product from './models/product.mjs'
import Category from './models/category.mjs'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Универсальная функция для чтения JSON файла
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error)
    throw error
  }
}

// Функция для последовательной инициализации продуктов
async function initializeProducts() {
  try {
    const productsPath = path.join(__dirname, 'static', 'products.json')
    const products = await readJsonFile(productsPath)

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
      })
      await product.save()
    }

    console.log('Products initialized successfully')
  } catch (error) {
    console.error('Error initializing products:', error)
  }
}

// Функция для последовательной инициализации категорий
async function initializeCategories() {
  try {
    const categoriesPath = path.join(__dirname, 'static', 'categories.json')
    const categories = await readJsonFile(categoriesPath)

    for (const ctgry of categories) {
      const category = new Category({
        name: ctgry.name,
        category: ctgry.category,
      })
      await category.save()
    }

    console.log('Categories initialized successfully')
  } catch (error) {
    console.error('Error initializing categories:', error)
  }
}

// Основной код приложения
;(async () => {
  try {
    await connectToDatabase()
    await initializeProducts() // Инициализация продуктов
    await initializeCategories() // Инициализация категорий

    app.use(cors())
    app.use(express.json())
    app.use(router)

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })

    // Отключение от базы данных при завершении процесса
    process.on('SIGINT', async () => {
      await disconnectFromDatabase()
      console.log('Disconnected from database')
      process.exit(0)
    })
  } catch (error) {
    console.error('Failed to start application:', error)
    process.exit(1)
  }
})()
