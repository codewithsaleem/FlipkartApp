import React, { Component } from "react";
import http from "./httpServiceFlipkart.js";
import auth from "./httpServiceFlipkartAuth.js";
import { Link } from "react-router-dom";
class Login extends Component {
    state = {
        loginForm: { email: "", password: "" },
        errMsgs: "",
    }

    async login(url, obj) {
        try {
            let response = await http.post(url, obj);
            let { data } = response;
            auth.login(data);
            this.props.history.push("/summary");
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404) {
                this.setState({ errMsgs: ex.response.data });
            }
        }
    }
    handleLogin = (e) => {
        e.preventDefault();
        let { loginForm } = this.state;
        this.login("/login", loginForm);
    }

    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.loginForm[input.name] = input.value;
        this.setState(s1);
    }
    render() {
        let { email, password } = this.state.loginForm;
        let { errMsgs } = this.state;
        <b className="text-danger mt-3">{errMsgs}</b>

        return (
            <div className="container">
                <div className="jumbotron">
                    <h3 className="text-center text-secondary">Login</h3>
                    <form>
                        <div className="form-group mt-4">
                            <label>Email</label>
                            <input
                                className="form-control"
                                type="text"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                className="form-control"
                                type="text"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                            />
                        </div>
            
                        <div className="form-group text-center">
                            <button className="btn btn-primary text-white font-weight-bold rounded-pill mb-3" onClick={this.handleLogin}><i className="mr-2 fa-sharp fa-solid fa-user text-white"></i>Login</button> <br />
                            <Link to="/home/register" className="text-primary font-weight-bold rounded-pill mb-3">New user Create an account</Link> <br />
                            <Link to="/home/register" className="text-primary font-weight-bold rounded-pill">Forgot password</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Login;