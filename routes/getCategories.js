import Category from "../model/categorySchema.js";
import CatSchMap from "../model/categorySchemaMap.js";

async function GetCategories(category, catId, n) {
    let found = {};

    if (n > 0) {
        try {
            if (typeof catId == 'undefined' && catId == undefined) {
                found[category] = await Category.find({ category: category });
            } else {
                found[category] = await Category.find({ category: category, categoryId: catId });
            }

            let foundItems = !Array.isArray(found[category]) ? [found[category]] : found[category];
            let childItems = [];
            let catSchMapData = await CatSchMap.findOne();
            let childCategory = catSchMapData.childCat[catSchMapData.categories.indexOf(category)];
            foundItems.forEach(item => {
                let children = item.categoryChildren;
                children.forEach(childId => {
                    childItems.push(GetCategories(childCategory, childId, n - 1));
                })
            });

            found[category].categoryChildren = childItems;
        } catch (error) {

        }
    }

    return found;
}

async function GetCatChildren(category, catId) {

}

export default GetCategories;