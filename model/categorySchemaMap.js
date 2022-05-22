import mongoose from "mongoose";

const CatMapSchema = new mongoose.Schema({
    categories: {type: [{type: String}]},
    levels: {type: [{type: Number}]},
    parentCat: {type: [{type: String}]},
    childCat: {type: [{type: String}]}
});

var CatSchMap = mongoose.model('CatMapSchema', CatMapSchema);

export default CatSchMap;