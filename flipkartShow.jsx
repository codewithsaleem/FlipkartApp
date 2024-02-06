import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "./httpServiceFlipkart.js";
import auth from "./httpServiceFlipkartAuth.js";
import queryString from "query-string";
import Navbar from "./flipkartNavbar.jsx";
class ShowPage extends Component {
    state = {
        products: [],
        pageInfo: {},
    }
    handleEdit = (id) => {
        this.props.history.push(`/home/${id}/edit`);
    }
    async deleteProd(url, obj) {
        let response = await http.deleteApi(url, obj);
        let { data } = response;
        this.props.history.push("/home")
    }
    handleRemove = (id) => {
        let prod = this.state.products.find((ele) => ele.id === id)
        this.deleteProd(`/deleteproducts/${id}`, prod);
    }
    handleProductsImages = (category, brand, id) => {
        this.props.history.push(`/home/${category}/${brand}/${id}`);
    }
    handleClickRealMe = () => {
        this.props.history.push("/home/Mobiles/RealMe/M17");
    }
    handleClickRealMe5s = () => {
        this.props.history.push("/home/Mobiles/RealMe/M20");
    }
    // handleOptionChange = (option) => {
    //     this.callURL("/home", option)
    // }

    async fetchData() {
        let queryParams = queryString.parse(this.props.location.search);
        let searchString = this.makeSearchString(queryParams);
        let { category, brand } = this.props.match.params;
        console.log(category, brand)
        let response = null;
        if (searchString && category && brand) {
            response = await http.get(`/products/${category}/${brand}?${searchString}`);
        } else if (searchString) {
            response = await http.get(`/products?${searchString}`);
        } else if (category && brand) {
            response = await http.get(`/products/${category}/${brand}?page=1`);
        } else {
            response = await http.get("/products?page=1");
        }
        let { data, pageInfo } = response.data;
        this.setState({ products: data, pageInfo: pageInfo });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchData();
    }

    handlePage = (num) => {
        let queryParams = queryString.parse(this.props.location.search);
        let { page = "1" } = queryParams;
        let newPage = +page + num;
        queryParams.page = newPage;
        this.callURL("/home", queryParams);
    }

    callURL = (url, options) => {
        let searchStr = this.makeSearchString(options);
        this.props.history.push({
            pathname: url,
            search: searchStr,
        })
    }

    makeSearchString = (options) => {
        let { assured, q, ram, rating, price, sort, page } = options;
        let searchStr = "";
        searchStr = this.addToQueryString(searchStr, "page", page);
        searchStr = this.addToQueryString(searchStr, "assured", assured);
        searchStr = this.addToQueryString(searchStr, "q", q);
        searchStr = this.addToQueryString(searchStr, "ram", ram);
        searchStr = this.addToQueryString(searchStr, "rating", rating);
        searchStr = this.addToQueryString(searchStr, "price", price);
        searchStr = this.addToQueryString(searchStr, "sort", sort);
        return searchStr;
    }

    addToQueryString = (str, paramName, paramValue) =>
        paramValue ? str ? `${str}&${paramName}=${paramValue}` : `${paramName}=${paramValue}` : str;

    render() {
        let user = auth.getUser();
        let { products, pageInfo } = this.state;
        let { pageNumber, numberOfPages, numOfItems, totalItemCount } = this.state.pageInfo;
        let queryParams = queryString.parse(this.props.location.search);

        // Calculate the start and end page numbers for the current range
        let size = 4;
        let startIndex = (pageNumber - 1) * size + 1;
        let endIndex;
        if (pageNumber * size > totalItemCount) {
            endIndex = totalItemCount;
        } else {
            endIndex = pageNumber * size;
        }
        return (
            <React.Fragment>
                {/* //Carousel link:---------- */}
                <React.Fragment>
                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" style={{ objectFit: 'contain !important' }}>
                        <div className="carousel-inner" style={{ maxHeight: '350px' }}>

                            <div className="carousel-item active">
                                <img className="d-block w-100" src="https://i.ibb.co/tq9j6V7/4dfdf0c59f26c4a1.jpg" alt="First slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="https://i.ibb.co/vQZhcvT/68af1ae7331acd1c.jpg" alt="Second slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="https://i.ibb.co/qxHzVsp/30d7dffe1a1eae09.jpg" alt="Third slide" />
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </React.Fragment>

                {/* //selling all products:--- */}
                <div className="container mt-2">
                    <div className="jumbotron">
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12">
                                <div className="row">
                                    {products.map((ele, index) => (
                                        <div className="col-sm-12 col-md-6 col-lg-3 text-center" key={index}>
                                            <div className="card p-2 mb-2 rounded-4" style={{ width: '16rem', maxHeight: "560px" }}>
                                                <img className="card-img-top rounded-4" src={ele.img} alt="Card image cap" style={{ height: '350px' }} onClick={() => this.handleProductsImages(ele.category, ele.brand, ele.id)} />
                                                <div className="card-body text-center text-secondary">
                                                    <p className="card-text font-weight-bold" onClick={() => this.handleProductsImages(ele.category, ele.brand, ele.id)}>{ele.name}</p>
                                                    <p className="card-text font-weight-bold" onClick={() => this.handleProductsImages(ele.category, ele.brand, ele.id)}>Brand : {ele.brand}</p>
                                                    <button className="btn btn-primary rounded-pill text-white font-weight-bold" onClick={() => this.handleProductsImages(ele.category, ele.brand, ele.id)}>More Details</button>
                                                    {user && user.role === 'admin' && (
                                                        <React.Fragment>
                                                            <div className="row text-center fs-4 mt-2">
                                                                <div className="col-3"></div>
                                                                <div className="col-6">
                                                                    <i className="mr-2 fa-sharp fa-solid fa-pen-to-square" onClick={() => this.handleEdit(ele.id)}></i>
                                                                    <i className="mr-2 fa-sharp fa-solid fa-trash" onClick={() => this.handleRemove(ele.id)}></i>
                                                                </div>
                                                                <div className="col-3"></div>
                                                            </div>
                                                        </React.Fragment>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="row">
                                    <div className="col-sm-6 col-md-6 col-lg-1">
                                        {startIndex > 1 ? (<button className=" btn btn-sm btn-success text-white mt-2" onClick={() => this.handlePage(-1)}>Prev</button>) : ""}
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-2">
                                        {endIndex < totalItemCount ? (<button className=" btn btn-sm btn-success text-white mt-2" onClick={() => this.handlePage(1)}>Next</button>) : ""}
                                    </div>
                                </div>
                                <div className="row text-secondary mt-3">
                                    <span><b>Page : </b>{startIndex} to {endIndex} of {totalItemCount}</span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <div className="card" onClick={() => this.handleClickRealMe5s()}>
                                <img className="card-img-top" src="https://i.ibb.co/dPVHZGW/d5db30a716f82657.jpg" alt="Card image cap" />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <div className="card">
                                <img className="card-img-top" src="https://i.ibb.co/Lzz36zB/31efaad41a3e4208.jpg" alt="Card image cap" />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <div className="card">
                                <img className="card-img-top" src="https://i.ibb.co/fGX7sFh/4e219998fadcbc70.jpg" alt="Card image cap" />
                            </div>
                        </div>
                    </div>

                    <div className="row bg-light mt-3 text-secondary" style={{ fontFamily: 'sans-serif' }}>
                        <h4 className="mt-3">Flipkart: The One-stop Shopping Destination</h4>
                        <p>
                            E-commerce is revolutionizing the way we all shop in India. Why do you want to hop from one store to another in
                            search of the latest phone when you can find it on the Internet in a single click? Not only mobiles. Flipkart
                            houses everything you can possibly imagine, from trending electronics like laptops, tablets, smartphones, and
                            mobile accessories to in-vogue fashion staples like shoes, clothing and lifestyle accessories; from modern
                            furniture like sofa sets, dining tables, and wardrobes to appliances that make your life easy like washing
                            machines, TVs, ACs, mixer grinder juicers and other time-saving kitchen and small appliances; from home
                            furnishings like cushion covers, mattresses and bedsheets to toys and musical instruments, we got them all
                            covered. You name it, and you can stay assured about finding them all here. For those of you with erratic working
                            hours, Flipkart is your best bet. Shop in your PJs, at night or in the wee hours of the morning. This e-commerce
                            never shuts down.
                        </p>

                        <h4>Flipkart Plus</h4>
                        <p>
                            A world of limitless possibilities awaits you - Flipkart Plus was kickstarted as a loyalty reward programme for
                            all its regular customers at zero subscription fee. All you need is 500 supercoins to be a part of this service.
                            For every 100 rupees spent on Flipkart order, Plus members earns 4 supercoins & non-plus members earn 2 supercoins.
                            Free delivery, early access during sales and shopping festivals, exchange offers and priority customer service
                            are the top benefits to a Flipkart Plus member. In short, earn more when you shop more! What's more, you can even
                            use the Flipkart supercoins for a number of exciting services, like: An annual Zomato Gold membership An annual
                            Hotstar Premium membership 6 months Gaana plus subscription Rupees 550 instant discount on flights on ixigo Check
                            out https://www.flipkart.com/plus/all-offers for the entire list. Terms and conditions apply.
                        </p>

                        <h4>No Cost EMI</h4>
                        <p>
                            In an attempt to make high-end products accessible to all, our No Cost EMI plan enables you to shop with us under
                            EMI, without shelling out any processing fee. Applicable on select mobiles, laptops, large and small appliances,
                            furniture, electronics and watches, you can now shop without burning a hole in your pocket. If you've been eyeing
                            a product for a long time, chances are it may be up for a no cost EMI. Take a look ASAP! Terms and conditions
                            apply.
                        </p>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}
export default ShowPage;