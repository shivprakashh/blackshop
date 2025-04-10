import mongoose from "mongoose";

const detailSchema = new mongoose.Schema({
    name: { type: String, required: true }, // 'name' is required
    value: { type: String, required: true }  // 'value' is required
  });
  
  // Define the schema for the 'info' object
  const infoSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    price: { type: String, required: true },
    discount: { type: String},
    stocks: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, default: 4 },  // Product rating
    reviews: [{
      user: { type: String },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
      date: { type: Date, default: Date.now }
    }],
    images: [{ type: String }], // Array of image URLs
    tags: [{ type: String }], // Tags for searching and categorizing
    priceHistory: [{
      price: { type: Number },
      discount: { type: Number },
      date: { type: Date, default: Date.now }
    }]
  });
  
  // Define the main schema for the data
  const dataSchema = new mongoose.Schema({
    imagesname: { type: [String], required: true },
    profilepic:{type:String,required:true} , // List of image names
    info: { type: infoSchema, required: true }, // Product details
    detail: { type: [detailSchema], required: true },  // Product specifications
    quantity: { type: Number, required: true, default: 0 }, // Available stock quantity
    sold: { type: Number, default: 0 }, // Number of items sold
    status: { type: String, enum: ['active', 'inactive', 'out of stock'], default: 'active' }, // Product status
    createdAt: { type: Date, default: Date.now }, // Timestamp for product creation
    updatedAt: { type: Date, default: Date.now } // Timestamp for product update
  }, { timestamps: true });
  

// ✅ Prevent Model Overwrite Issue
const Add = mongoose.models.Add || mongoose.model("Add", dataSchema, "productcollection");


export default Add;
