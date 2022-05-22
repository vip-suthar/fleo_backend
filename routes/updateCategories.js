import Category, { CategorySchema } from "../model/categorySchema.js";
import CatSchMap from "../model/categorySchemaMap.js";

CategorySchema.post('save', async function (next) {
    // anyFunc(this);
    if (this.parentCatId != null) {
        let catSchMapData = await CatSchMap.findOne();
        let catIndex = catSchMapData.categories.indexOf(this.category);
        let parentCat = catSchMapData.parentCat[catIndex];
        let parent = await Category.find({ category: parentCat, categoryId: this.parentCatId });
        parent.categoryChildren.push(this.categoryId);
        await Category.findOneAndUpdate({ category: parentCat, categoryId: this.parentCatId }, { categoryChildren: parent.categoryChildren });
        UpdateCategorySales(parentCat, this.parentCatId, true, this.currentSales, "add");
    }
});

async function recalCatSales(cat, catId) {
    let catItem = await Category.findOne({ category: cat, categoryId: catId });

    if (catItem.categoryChildren.length = 0) {
        return catItem.currentSales;
    }

    let catSchMapData = await CatSchMap.findOne();

    let newTotalSales = 0;
    let childCategory = catSchMapData.childCat[catSchMapData.categories.indexOf(cat)];
    catItem.categoryChildren.forEach(async itemId => {
        // let item = await Category.findOne({category: childCategory, categoryId: itemId});
        newTotalSales += (await recalCatSales(childCategory, itemId));
    });

    let percentage = Math.round(parseFloat((newTotalSales / catItem.targetSales) * 100).toFixed(2)),
        colorCode = percentage <= 33 ? 1 : percentage <= 66 ? 2 : 3;
    await Category.findOneAndUpdate({ category: cat, categoryId: catId }, { currentSales: newTotalSales, percentage: percentage, colorCode: colorCode });

    return newTotalSales;
}

async function UpdateCategorySales(cat, catId, curr = true, currValue, type, target = false, targetValue) {

    if (cat == null || !cat || catId == null || !catId) {
        return;
    }

    let catItem = await Category.findOne({ category: cat, categoryId: catId });

    console.log(cat, catId);

    if (target) {
        catItem.targetSales = targetValue;
    }

    if (curr) {
        switch (type) {
            case "add":
                catItem.currentSales += currValue;
                break;
            case "subtract":
                catItem.currentSales -= currValue;
                break;
            default:
                catItem.currentSales = currValue
                break;
        }
    }



    let percentage = Math.round(parseFloat((catItem.currentSales / catItem.targetSales) * 100).toFixed(2)),
        colorCode = percentage <= 33 ? 1 : percentage <= 66 ? 2 : 3;

    await Category.findOneAndUpdate({ category: cat, categoryId: catId }, { currentSales: catItem.currentSales, targetSales: catItem.targetSales, percentage: percentage, colorCode: colorCode });

    let catSchMapData = await CatSchMap.findOne();
    let catIndex = catSchMapData.categories.indexOf(cat);
    let parentCat = catSchMapData.parentCat[catIndex];

    UpdateCategorySales(parentCat, catItem.parentCatId, curr, currValue, type, target, targetValue);
    return true;
}

export default UpdateCategorySales;