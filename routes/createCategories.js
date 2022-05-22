import Category from "../model/categorySchema.js";
import CatSchMap from "../model/categorySchemaMap.js";

async function generateCatId(catName) {
    let catCount = await Category.find({ category: catName }).count();
    let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let p = catCount % 26, id = catName + "-";
    while (catCount > 0) {
        id += alphabets[p];
        catCount = parseInt(catCount / 26);
    }
    return id;
}

async function CreateCategory(data) {
    try {
        let catSchMapData = await CatSchMap.findOne(),
            catIndex = catSchMapData.categories.indexOf(data.category),
            level = catSchMapData.levels[catIndex],
            percentage = Math.round(parseFloat((data.currentSales / data.targetSales) * 100).toFixed(2)),
            colorCode = percentage <= 33 ? 1 : percentage <= 66 ? 2 : 3;

        let newCategory = new Category({
            level: level,
            category: data.category,
            categoryId: await generateCatId(data.category),
            currentSales: data.currentSales,
            targetSales: data.targetSales,
            percentage: percentage,
            colorCode: colorCode,
            parentCatId: data.parentCatId,
            categoryChildren: []
        });

        await newCategory.save();

        return newCategory;

    } catch (error) {
        console.log(error);
        return {};
    }
}

export default CreateCategory;