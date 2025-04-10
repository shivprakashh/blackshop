import mongoose from 'mongoose';
import Add from './Add';  // Assuming your model is in the same directory as 'Add.js'

// Define the schema for the 'user' who is purchasing the product
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },

  phone: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
}, { timestamps: true });

// Define the schema for the purchase
const purchaseSchema = new mongoose.Schema({
  user: {
    type: userSchema, // Nested user schema
    required: true
  },
  products: [{
    product: { 
        type: Object,  // Embedding the product info directly here
       
        required: true 
      },
    quantity: { 
      type: Number, 
      required: true 
    },
    totalPrice: { 
      type: Number, 
     
    },
    finalPrice:{
        type:Number,
        require:true
    },
    OriginalPrice:{
        type:String,
        require:true
    },
    discount:{
        type:Number,
        require:true
    },
    profilepic:{type:String,required:true} ,
  }],
  totalprice:{
    type:Number,
    require:true
  },

  status: { 
    type: String, 
    enum: ['Pending', 'Completed', 'Cancelled'], 
    default: 'Pending' 
  },
  paid:{
    type:String,
    enum:['Yes','No'],
    default:'No'
  },
  paymentMethod: { 
    type: String, 
    enum: ['Credit Card', 'Debit Card', 'PayPal', 'COD'], 
  
   
  },
  orderDate: { 
    type: Date, 
    default: Date.now 
  },
  deliveryDate: { 
    type: Date, 
   
  },
  shippingAddress: { 
    type: String, 
   
  },
}, { timestamps: true });

// Create the Purchase model

const  Purchase= mongoose.models.Purchase || mongoose.model("Purchase", purchaseSchema, "purchasecollection");

// Export the Purchase model
export default Purchase;
