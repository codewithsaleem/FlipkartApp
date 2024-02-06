import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import http from "./httpServiceFlipkart.js";
import Navbar from "./flipkartNavbar";
import FootBar from "./flipkartFootbar";
import ShowPage from "./flipkartShow";
import ProductsPage from "./flipkartProductsPage";
import Pincode from "./filpkartProductIdPincode";
import Cart from "./flipkartCart";
import Login from "./flipkartLogin";
import Register from "./flipkartRegister.jsx";
import Logout from "./flipkartLogout";
import ProductForm from "./flipkartFormikAddProduct";
import PlaceOrder from "./flipkartPlaceOrderForm.jsx";
import Thx from "./flipkartThanksPage.jsx";
class MainComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Switch>
                    <Route
                        path="/home/Add New Product"
                        render={(props) => (<ProductForm {...props} />)}
                    />
                    <Route
                        path="/home/:id/edit"
                        render={(props) => (<ProductForm {...props} />)}
                    />
                    <Route path="/home/thxdone" render={(props) => <Thx {...props} />} />
                    <Route path="/home/cart/placeOrder" render={(props) => <PlaceOrder {...props} />} />
                    <Route path="/home/Logout" render={(props) => <Logout {...props} />} />
                    <Route path="/home/register" render={(props) => <Register {...props} />} />
                    <Route path="/home/login" render={(props) => <Login {...props} />} />
                    <Route path="/home/cart" render={(props) => <Cart {...props} />} />
                    <Route path="/home/:category/:brand/:id" render={(props) => <Pincode {...props} />} />
                    <Route path="/home/:category/:brand" render={(props) => <ProductsPage {...props} />} />
                    <Route path="/home" render={(props) => <ShowPage {...props} />} />

                    <Redirect from="/" to="/home" />
                </Switch>
                <FootBar />
            </React.Fragment>
        )
    }
}
export default MainComponent;