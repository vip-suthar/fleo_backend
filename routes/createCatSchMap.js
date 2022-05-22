import CatSchMap from "../model/categorySchemaMap.js";

async function CreateCatSchMap(data) {
    try {
        let newCatSchMap = new CatSchMap({
            categories: data.categories,
            levels: data.levels,
            parentCat: data.parentCat,
            childCat: data.childCat
        });

        await newCatSchMap.save();
        return true;
    } catch (error) {
        return false;
    }
}

export default CreateCatSchMap;