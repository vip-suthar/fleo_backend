import Category from "../model/categorySchema.js";
import CatSchMap from "../model/categorySchemaMap.js";
import UpdateCategorySales from "./updateCategories.js";

async function DeleteCategory(cat, catId, children = true) {
    if (cat == null || !cat || catId == null || !catId) {
        return;
    }

    let catItem = await Category.findOne({ category: cat, categoryId: catId });
    if (catItem == null) {
        return;
    }
    let catSchMapData = await CatSchMap.findOne();
    if (children) {
        let childCategory = catSchMapData.childCat[catSchMapData.categories.indexOf(cat)];
        catItem.categoryChildren.forEach(async element => {
            await DeleteCategory(childCategory, element);
        });
    }

    let currentSales = catItem.currentSales;
    let parentCatId = catItem.parentCatId;
    await Category.findOneAndDelete({ category: cat, categoryId: catId });

    if (parentCatId != null) {
        let parentCat = catSchMapData.parentCat[catSchMapData.categories.indexOf(cat)];
        let parent = await Category.find({ category: parentCat, categoryId: parentCatId });
        parent.categoryChildren.splice(parent.categoryChildren.indexOf(cat), 1);
        await Category.findOneAndUpdate({ category: parentCat, categoryId: parentCatId }, { categoryChildren: parent.categoryChildren });
        UpdateCategorySales(parentCat, parentCatId, true, currentSales, "subtract");
    }

    return true;
}

export default DeleteCategory;