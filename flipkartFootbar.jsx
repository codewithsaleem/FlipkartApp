import React, { Component } from "react";
class FootBar extends Component {
    render() {
        return (
            <div className="row bg-dark">
                <div className="col-3"></div>
                <div className="col-6 text-center">
                    <div className="row mt-3 text-secondary" style={{ fontFamily: 'fantasy' }}>
                        <div className="col-12 col-md-6 col-lg-2 mt-3">Home</div>
                        <div className="col-12 col-md-6 col-lg-2 mt-3">Contact Us</div>
                        <div className="col-12 col-md-6 col-lg-2 mt-3">About Us</div>
                        <div className="col-12 col-md-6 col-lg-2 mt-3">News</div>
                        <div className="col-12 col-md-6 col-lg-2 mt-3">Our Team</div>
                        <div className="col-12 col-md-6 col-lg-2 mt-3">Help</div>
                    </div>
                    <hr className="text-white" />
                    <div className="row mt-3 text-secondary">
                        <p>Copyright &copy; 2024; Designed by Saleem</p>
                    </div>
                </div>
                <div className="col-3"></div>
            </div>
        )
    }
}
export default FootBar;