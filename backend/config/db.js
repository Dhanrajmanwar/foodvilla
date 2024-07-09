import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://dhanrajmanwar61:Dhanraj13@cluster0.w7bftvw.mongodb.net/foodvilla')
    .then(()=>console.log("DB connected"))
}
