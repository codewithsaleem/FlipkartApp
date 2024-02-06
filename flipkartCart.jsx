import React, { Component } from "react";
import http from "./httpServiceFlipkart.js";
import auth from "./httpServiceFlipkartAuth.js";
class Cart extends Component {
    state = {
        cart: []
    }
    handleShopMore = () => {
        this.props.history.push("/home");
    }
    handlePlaceOrder = () => {
        let user = auth.getUser();
        if (user && user.role === 'user') {
            this.props.history.push("/home/cart/placeOrder")
        } else {
            alert("Please login first!!! Only user role can Place the Order not admin role");
            this.props.history.push("/home/login");
        }
    }
    async fetchData() {
        let response = await http.get("/cart");
        let { data } = response;
        this.setState({ cart: data });
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchData();
        }
    }
    handleShop = () => {
        this.props.history.push("/home")
    }
    render() {
        let { cart } = this.state;
        let totalPrice = cart.length > 0 ? cart.reduce((acc, curr) => (acc + curr.price), 0) : 0;

        return (
            <React.Fragment>
                {cart.length > 0 ?
                    <React.Fragment>
                        {cart.map((ele, index) => (
                            <div className="container">
                                <div className="jumbotron">
                                    <div className="row text-secondary" key={index}>
                                        <div className="col-sm-12 col-md-6 col-lg-3">
                                            <div className="card m-2 p-2 rounded-4" style={{ width: '10rem' }}>
                                                <img className="card-img-top rounded-4" src={ele.img} alt="Card image cap" style={{ height: '250px' }} />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 col-lg-5">
                                            <h4>{ele.name}</h4>
                                            <b>{ele.brand}</b>

                                            <ul>
                                                {ele.details.map((ele, index) => (
                                                    <li key={index}>{ele}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="col-sm-12 col-md-6 col-lg-2">
                                            <b className="text-primary">Rs. {ele.price}</b>
                                            <p className="text-danger text-decoration-line-through">Rs. {ele.prevPrice}</p>
                                            <b className="text-primary">{ele.discount}% off</b>
                                        </div>
                                        <div className="col-sm-12 col-md-6 col-lg-1">
                                            {ele.assured === true && (
                                                <img src="https://i.ibb.co/t8bPSBN/fa-8b4b59.png" alt="" style={{ width: '100px' }} />
                                            )}
                                            <img className="mt-4" src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/shield_435391.svg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="container">
                            <div className="jumbotron">
                                <div className="row">
                                    <b>Total Price: <span className="text-danger">Rs. {totalPrice}.00</span></b>
                                </div>
                                <div className="row mt-2">
                                    <b>Total Item: <span className="text-danger">{cart.length}</span></b>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-md-2 col-lg-2 mt-3">
                                        <div className="row">
                                            <button className="btn btn-primary font-weight-bold rounded-pill" onClick={() => this.handleShopMore()}><i className="fa-sharp fa-solid text-white fa-shop-dot mr-2"></i>SHOP MORE</button>
                                        </div>
                                    </div>
                                    <div className="col-8"></div>
                                    <div className="col-sm-6 col-md-2 col-lg-2 mt-3">
                                        <div className="row">
                                            <button className="btn btn-warning font-weight-bold rounded-pill " onClick={() => this.handlePlaceOrder()}><i className="fa-sharp fa-solid text-primary fa-location-dot mr-2"></i>PLACE ORDER</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    <div className="container">
                        <div className="row text-center mt-4 mb-3">
                            <div className="col-3"></div>
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwK2M0BuIqDfnC7DZofpHg7obg_gODtNbuCA&usqp=CAU" alt="" />
                                <h4>Your cart is empty!</h4>
                                <p>Add items to it now.</p>
                                <button className="btn btn-primary btn-lg rounded-pill" onClick={() => this.handleShop()}>SHOP NOW</button>
                            </div>
                            <div className="col-3"></div>
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}
export default Cart;