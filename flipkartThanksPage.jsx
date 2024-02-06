import React, { Component } from "react";
class Thx extends Component {
    handleShopNow = () => {
        this.props.history.push("/home");
    }
    render() {
        return (
            <div className="container text-center text-secondary">
                <div class="jumbotron">
                    <h4>Thanks for shopping here.Have a nice day...</h4>

                    <div className="form-group mt-4">
                        <button className="rounded-pill btn btn-primary font-weight-bold" onClick={() => this.handleShopNow()}><i className="mr-2 fa-solid fa-cart-shopping"></i>SHOP NOW</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Thx;