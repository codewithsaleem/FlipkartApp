import React, { Component } from "react";
import http from "./httpServiceFlipkart.js";
import Navbar from "./flipkartNavbar.jsx";
class Pincode extends Component {
    state = {
        pinForm: { pincode: "" },
        newPincode: '',
        deliveryStatus: "",
        errorMsgs: '',
        product: {},
        reviews: {}
    }
    async postData(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        this.props.history.push("/home/cart");
    }
    handleAddToCart = () => {
        let { product } = this.state;
        this.postData("/cart", product);
    }
    handleBuy = () => {
        this.props.history.push("/home/cart/placeOrder");
    }
    handlePincode = () => {
        let { pincode } = this.state.pinForm;
        this.setState({ newPincode: pincode })
        this.fetchData();
    }
    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.pinForm[input.name] = input.value;
        this.setState(s1);
    }

    async fetchData() {
        let { category, brand, id } = this.props.match.params;
        let { newPincode } = this.state;
        let response = null;
        try {
            if (newPincode && id) {
                response = await http.get(`/pincode/${newPincode}/${id}`);
                let { data } = response;
                this.setState({ deliveryStatus: data });
            }
        }
        catch (ex) {
            if (ex.response && ex.response.status === 500) {
                this.setState({ errorMsgs: ex.response.data });
            }
        }
    }
    async fetchData1() {
        let { category, brand, id } = this.props.match.params;
        let response = await http.get(`/productsid/${id}`);
        let { data } = response;
        this.setState({ product: data });
    }
    async fetchData2() {
        let { category, brand, id } = this.props.match.params;
        let response = await http.get(`/reviews/${id}`);
        let { data } = response;
        this.setState({ reviews: data });
    }
    componentDidMount() {
        this.fetchData();
        this.fetchData1();
        this.fetchData2();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchData();
            this.fetchData1();
            this.fetchData2();
        }
    }

    render() {
        let { pincode } = this.state.pinForm;
        let { deliveryStatus, errorMsgs, product, reviews } = this.state;
        let dataRev = reviews.ratings;

        return (
            <React.Fragment>
                <hr />
                <div className="row bg-light text-secondary text-center">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <i class="fa-solid fa-location-dot text-primary"></i>
                        <input
                            type="text"
                            name="pincode"
                            value={pincode}
                            placeholder="Search for pincode"
                            onChange={this.handleChange}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                borderBottom: '1px solid #000000',
                            }}
                        />

                        <button className="btn btn-sm btn-dark text-white" onClick={() => this.handlePincode()}>
                            Check pincode
                        </button>
                    </div>

                    <h3 className="text-center">{errorMsgs ? <span className="text-danger">Not Available</span> : <span className="text-success">{deliveryStatus}</span>}</h3>
                </div>

                <div className="container mt-2">
                    <div className="jumbotron">
                        <div className="row text-secondary">
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <div className="card p-2 rounded-4" style={{ width: '14rem' }}>
                                    <img className="card-img-top rounded-4" src={product.img} alt="Card image cap" style={{ height: '350px' }} />
                                </div>
                                <div className="form-group text-center mt-3">
                                    <button onClick={() => this.handleAddToCart()} className="btn font-weight-bold text-white mt-2 rounded-pill bg-primary">
                                        <span style={{ cursor: "pointer" }}>
                                            <i className="mr-2 fa-sharp fa-solid fa-cart-shopping"></i>
                                        </span>ADD TO CART
                                    </button>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4">
                                <h3>{product.name}</h3>
                                <h5>{product.brand}</h5>
                                <div className="row">
                                    <div className="col-2">
                                        <p className="bg-success text-white text-center">{product.rating}<i className="fa-sharp fa-solid fa-star"></i></p>
                                    </div>
                                    <div className="col-10">{product.ratingDesc}</div>
                                </div>

                                <ul>
                                    {product.offers && product.offers.map((ele, index) => (
                                        <li key={index}>
                                            <img src={ele.img} alt="" />
                                            {ele.type}
                                            {ele.detail}
                                        </li>
                                    ))}
                                    {/* {product.details && product.details.map((ele, index) => (
                                <li key={index}>{ele}</li>
                            ))} */}
                                </ul>

                            </div>
                            <div className="col-1"></div>
                            <div className="col-2 mt-3">
                                <h3>Rs. {product.price}</h3>
                                <p className="text-danger text-decoration-line-through">Rs. {product.prevPrice}</p>
                                <b className="text-primary">{product.discount}% off</b>
                            </div>
                            <div className="col-1 mt-3">
                                {product.assured === true && (
                                    <img src="https://i.ibb.co/t8bPSBN/fa-8b4b59.png" alt="" style={{ width: '100px' }} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mb-3">
                    <div className="row bg-light text-secondary">
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-1">
                                <p className="bg-success text-white text-center">{product.rating}<i className="fa-sharp fa-solid fa-star"></i></p>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-11">{product.ratingDesc}</div>
                        </div>
                        <div className="col-12">
                            <ul>
                                {dataRev && dataRev.map((ele, index) => (
                                    <React.Fragment>
                                        <li><b>Star: </b>{ele.star}</li>
                                        <li><b>Title: </b>{ele.title}</li>
                                        <li><b>Description: </b>{ele.description}</li>
                                    </React.Fragment>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Pincode;