let express = require("express");
let app = express();
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
    );
    next();
})

var port = process.env.PORT || 2450;
app.listen(port, () => console.log(`Node app listening on port ${port}`));

let { products, pincodeData, revData } = require("./serverNodeFlipkartData.js");
let cart = [];
let loginData = [];

// Task: Register data API endpoint:----------------------------------------------------------------------------------
app.post("/register", function (req, res) {
    let body = req.body;
    loginData.push(body);
    res.send(body)
})
// Task: Login data API endpoint:----------------------------------------------------------------------------------
app.post("/login", function (req, res) {
    let body = req.body;
    let verifyEmailPass = loginData.find((ele) => ele.email === body.email && ele.password === body.password);
    if (verifyEmailPass) {
        res.send(verifyEmailPass);
    } else {
        res.status(404).send("Invalid Credentials. Login again!!!")
    }
})

// Task 1.1: Products data API endpoint with pagination:----------------------------------------------------------------------------------
app.get("/products/:category?/:brand?", function (req, res) {
    let { category, brand } = req.params;
    let { assured, q, ram, rating, price, sort } = req.query;
    let page = +req.query.page;

    let arr = products;

    // Filter by category and brand
    if (category) arr = arr.filter((c1) => c1.category === category);
    if (brand) arr = arr.filter((c1) => c1.brand === brand);

    // Additional filters
    if (assured === 'true') arr = arr.filter((c1) => c1.assured === true);
    if (q) arr = arr.filter((c1) => c1.name.includes(q));

    //Rating filtering
    if (rating === '>4') arr = arr.filter((ele) => ele.rating > 4);
    if (rating === '>3') arr = arr.filter((ele) => ele.rating > 3);
    if (rating === '>2') arr = arr.filter((ele) => ele.rating > 2);
    if (rating === '>1') arr = arr.filter((ele) => ele.rating > 1);

    //Rating filtering
    if (ram === '>=6') arr = arr.filter((ele) => ele.ram >= 6);
    if (ram === '<=4') arr = arr.filter((ele) => ele.ram <= 4);
    if (ram === '<=3') arr = arr.filter((ele) => ele.ram <= 3);
    if (ram === '<=2') arr = arr.filter((ele) => ele.ram <= 2);

    // Price filtering
    if (price === '0-5000') arr = arr.filter((ele) => ele.price > 0 && ele.price <= 5000);
    if (price === '5000-10000') arr = arr.filter((ele) => ele.price > 5000 && ele.price <= 10000);
    if (price === '10000-20000') arr = arr.filter((ele) => ele.price > 10000 && ele.price <= 20000);
    if (price === '>20000') arr = arr.filter((ele) => ele.price > 20000);

    // Sorting logic
    if (sort === 'asc') arr = arr.sort((a1, a2) => (+a1.price) - (+a2.price));
    if (sort === 'desc') arr = arr.sort((a1, a2) => (+a2.price) - (+a1.price));
    if (sort === 'popularity') arr = arr.sort((a1, a2) => (+a1.popularity) - (+a2.popularity));

    //:-----------------------------------------------
    page = page ? page : 1;
    //have to add pagination
    let respArr = pagination(arr, page);
    let len = products.length;
    let quo = Math.floor(len / 4);
    let rem = len % 4;
    let extra = rem === 0 ? 0 : 1;
    let numofpages = quo + extra;
    let pageInfo = {
        pageNumber: page,
        numberOfPages: numofpages,
        numOfItems: 4,
        totalItemCount: arr.length,
    };
    res.json({
        data: respArr,
        pageInfo: pageInfo,
    });
})
function pagination(obj, page) {
    var resArr = obj;
    var pageSize = 4;
    var startIndex = (page - 1) * pageSize;
    var endIndex = startIndex + pageSize;
    resArr = resArr.slice(startIndex, endIndex);
    return resArr;
}


app.post("/products", function (req, res) {
    let body = req.body;
    products.push(body);
    res.send(body)
})
app.put("/products/:id", function (req, res) {
    let id = req.params.id;
    let body = req.body;
    console.log(body)
    let index = products.findIndex((ele) => ele.id === body.id);
    if (index >= 0) {
        let updateProduct = { ...body };
        products[index] = updateProduct;
        res.send(updateProduct);
    } else {
        res.status(404).send("No product found");
    }
});
app.get("/productsid/:productId", function (req, res) {
    console.log(revData.length)
    let productId = req.params.productId;
    let fnd = products.find((ele) => ele.id === productId);
    if (fnd) res.send(fnd);
    else res.status(400).send("Product not found!!")
})
app.delete("/deleteproducts/:id", function (req, res) {
    let id = req.params.id;
    let index = products.findIndex((ele) => ele.id === id);
    if (index !== -1) {
        let deletedProduct = products.splice(products[index], 1);
        res.send(deletedProduct);
    } else {
        res.status(404).send("Product id not found")
    }
})

// Task 1.2: Reviews data API endpoint:----------------------------------------------------------------------------------
app.get("/reviews/:productId", function (req, res) {
    let productId = req.params.productId;
    let index = revData.findIndex((ele) => ele.mobileId === productId);
    console.log(productId, index)
    if (index >= 0) res.send(revData[index]);
    else res.status(400).send("Product not found!!")
})


// Task 1.2: Pincode data API endpoint:----------------------------------------------------------------------------------
app.get("/pincode/:pincode/:productId", function (req, res) {
    let pincode = req.params.pincode;
    let productId = req.params.productId;
    let findPincode = pincodeData.find((ele) => ele.pincode === +pincode);
    let indexProductId = findPincode.mobileList.findIndex((ele) => ele.id === productId);

    let displayData = findPincode.mobileList[indexProductId].display;
    if (findPincode) res.send(displayData);
    else res.status(400).send("Not available");
})


// Task 1.2: Cart data API endpoint:----------------------------------------------------------------------------------
app.post("/cart", function (req, res) {
    let body = req.body;
    let matchingId = cart.length > 0 && cart.find((ele) => ele.id === body.id);
    if (matchingId) { }
    else {
        cart.push(body)
    }
    res.send(body);
})
app.get("/cart", function (req, res) {
    res.send(cart);
})
