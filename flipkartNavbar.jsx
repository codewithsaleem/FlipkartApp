import React, { Component } from "react";
import { Link } from "react-router-dom";
import http from "./httpServiceFlipkart.js";
import auth from "./httpServiceFlipkartAuth.js";

class Navbar extends Component {
    state = {
        cart: []
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
    handleChange = (e) => {
        let { currentTarget: input } = e;
        let option = { ...this.props.options };
        option[input.name] = input.value;
        this.props.onOptionChange(option);
    }
    render() {
        let mobilesDropdown = ["Mi", "RealMe", "Samsung", "OPPO", "Apple"];
        let laptopsDropdown = ["Apple", "HP", "Acer", "Dell"];
        let cameraDropdown = ["Nikon", "Canon", "Sony"];
        let moreDropdown = ["Notifications", "Sell on Flipkart", "24X7 Customer Care", "Advertise"];
        let { cart } = this.state;
        let accountsUser = ["Logout"];
        let accountsAdmin = ["Logout"];
        let user = auth.getUser();

        return (
            <React.Fragment>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ fontFamily: 'sans-serif' }}>
                        <div className="container-fluid">
                            <Link className="navbar-brand fs-3 ms-2 fst-italic font-weight-bold" to="/">Flipkart</Link>

                            <button className="navbar-toggler mr-3" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse ms-2" id="navbarNav">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link active fs-5" aria-current="page" to="/home">Home</Link>
                                    </li>

                                    {user && user.role === "admin" &&
                                        <li className="nav-item">
                                            <Link className="nav-link active fs-5" aria-current="page" to="/home/Add New Product">Add New Product</Link>
                                        </li>
                                    }
                                </ul>


                                <div className="d-flex">
                                    <React.Fragment>
                                        <Link className="btn bg-white text-primary mr-2 font-weight-bold" to="/home/cart">
                                            <i className="me-1 fa-sharp fa-solid fa-cart-shopping"></i>
                                            Cart {cart.length > 0 && <b className="text-warning bg-white p-1 rounded-circle">{cart.length}</b>}
                                        </Link>


                                        {!user && <Link className="btn bg-white text-primary mr-2 font-weight-bold" to="/home/register">Register</Link>}

                                        {!user && <Link to="/home/login" className="btn bg-white text-primary mr-2 font-weight-bold">Login</Link>}


                                        {user && user.role === "user" &&
                                            <ul className="navbar-nav">
                                                <li className="nav-item dropdown">
                                                    <a href="#" className="nav-link dropdown-toggle text-white" data-toggle="dropdown">
                                                        <i className="mr-2 fa-regular fa-circle-user"></i>{user.email}
                                                    </a>
                                                    <div className="dropdown-menu">
                                                        {accountsUser.map((ele, index) => (
                                                            <Link to={`/home/${ele}`} key={index} className="dropdown-item">
                                                                {index === 0 && <i className="mr-2 fa-solid fa-right-to-bracket"></i>}
                                                                {ele}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </li>
                                            </ul>}

                                        {user && user.role === "admin" && (
                                            <ul className="navbar-nav">
                                                <li className="nav-item dropdown">
                                                    <a href="#" className="nav-link dropdown-toggle text-white" data-toggle="dropdown">
                                                        <i className="mr-2 fa-regular fa-circle-user"></i>{user.email}
                                                    </a>
                                                    <div className="dropdown-menu">
                                                        {accountsAdmin.map((ele, index) => (
                                                            <Link to={`/home/${ele}`} key={index} className="dropdown-item">
                                                                {index === 0 && <i className="mr-2 fa-solid fa-right-to-bracket"></i>}
                                                                {ele}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </li>
                                            </ul>
                                        )}
                                    </React.Fragment>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>


                <div class="container mt-3 mb-3 text-center">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                        Mobiles
                                    </a>
                                    <div className="dropdown-menu">
                                        {mobilesDropdown.map((brand, index) => (
                                            <Link to={`/home/Mobiles/${brand}?page=1`} key={index} className="dropdown-item">{brand}</Link>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                        Laptops
                                    </a>
                                    <div className="dropdown-menu">
                                        {laptopsDropdown.map((ele, index) => (
                                            <Link to={`/home/Laptops/${ele}`} key={index} className="dropdown-item">{ele}</Link>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                        Camera
                                    </a>
                                    <div className="dropdown-menu">
                                        {cameraDropdown.map((ele, index) => (
                                            <Link to={`/home/Camera/${ele}`} key={index} className="dropdown-item">{ele}</Link>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div >
            </React.Fragment>
        )
    }
}
export default Navbar;