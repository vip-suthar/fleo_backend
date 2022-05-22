import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    level: { type: Number, required: true },
    category: { type: String, required: true },
    categoryId: { type: String, required: true },
    currentSales: { type: Number, default: 0 },
    targetSales: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    colorCode: { type: Number, enum: [1, 2, 3], default: 1 },
    parentCatId: { type: String, default: null },
    categoryChildren: { type: [{ type: String }], default: [] }
});

var Category = mongoose.model('Category', CategorySchema);

export default Category;
export {CategorySchema};