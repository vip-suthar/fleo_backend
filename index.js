import express from 'express';
import mongoose from 'mongoose';
import config from './config.js';
import CreateCategory from './routes/createCategories.js';
import CreateCatSchMap from './routes/createCatSchMap.js';
import GetCategories from './routes/getCategories.js';
import UpdateCategorySales from './routes/updateCategories.js';
import DeleteCategory from './routes/deleteCategories.js';
const app = express();

app.use(express.json());

const mongodbUrl = config.MONGODB_URL;

mongoose
    .connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch((error) => console.log(error.reason));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// console.log("h1");
db.once('open', function callback() {
    console.log("Database ready to be connected");
});

app.post("/create-cat-map-sch", async (req, res)=>{
    res.send(await CreateCatSchMap(req.body));
})

app.post("/create-cat", async (req, res)=>{
    let result = await CreateCategory(req.body);
    res.send(result);
});

app.post("/get-cat", async (req, res)=>{
    let result = await GetCategories(req.body.category, req.body.catId, req.body.n);
    res.send(result);
});

app.post("/update-cat", async (req, res)=>{
    let result = false;
    if (typeof req.body.targetSales == 'undefined') {
        result = UpdateCategorySales(req.body.category, req.body.categoryId, true, req.body.currentSales);
    } else if (typeof req.body.currentSales == 'undefined') {
        result = UpdateCategorySales(req.body.category, req.body.categoryId, false, undefined, undefined, true, req.body.targetSales);
    } else {
        result = UpdateCategorySales(req.body.category, req.body.categoryId, true, req.body.currentSales, "", true, req.body.targetSales);
    }

    res.send(result);
});

app.post("/delete-cat", async (req, res)=> {
    let result = await DeleteCategory(req.body.category, req.body.categoryId, req.body.children);
    res.send(result);
})

app.listen(config.PORT, () => {
    console.log(`Server started at http://localhost:${config.PORT}`);
});