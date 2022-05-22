# Fleo Backend (using the api)

> To set up a category map, first send a "post" request to  "/create-cat-map-sch" with the following body

    {
        categories: [],
        levels: [],
        parentCat: [],
        childCat: []
    }

where index "i" of each array should correspond to category name (in string, like "factory"), and its relative properties (level -> number, parentCat -> string, childCat-> string).

## Creating a category

* To create a category item request
  
    type -> "POST"

    url -> "/create-cat"

    body ->

        {
            category: "", // category name (which is in the map)
            currentSales: number,
            targetSales: number,
            parentCatId: "" || null
        }

* To get a category
  
    type -> "POST"

    url -> "/get-cat"

    body ->

        {
            category: "", // category name (which is in the map)
            categoryId: "",
            n: number // no of levels to be retrived, counted from current category
        }

    > if categoryId is not provided in the above request body, it will return all the categories of that type.

* To update sales in a category
  
    type -> "POST"

    url -> "/update-cat"

    body ->

        {
            category: "", // category name (which is in the map)
            categoryId: "",
            currentSales: number, (optional)
            targetSales: number (optional)
        }
* To delete the category

    type -> "POST"

    url -> "/delete-cat"

    body ->

        {
            category: "", // category name (which is in the map)
            categoryId: "",
            children: boolean // if true, deletes children as well
        }
