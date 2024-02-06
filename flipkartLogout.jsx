import React, {Component} from "react";
import auth from "./httpServiceFlipkartAuth.js";
class Logout extends Component {
    componentDidMount () {
        auth.logout();
        this.props.history.push("/home/login");
    }

    render () {
        return ""
    }
}
export default Logout;