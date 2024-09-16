import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  registration: {
    startDate: Number,
    endDate: Number,
  },
  startCourse: Number,
  price: {
    type: Number,
    required: true,
  },
  isPopular: Boolean,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
