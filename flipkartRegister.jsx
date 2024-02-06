import React, { Component } from "react";
import http from "./httpServiceFlipkart.js";
import { Link } from "react-router-dom";
class Register extends Component {
    state = {
        newCustomer: { name: "", email: "", password: "", role: "" },
        errors: {},
        errMsgs: ""
    }
    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.newCustomer[input.name] = input.value;
        this.handleFocusValidation(e);
        this.setState(s1);
    }

    async register(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        this.props.history.push("/home/login");
    }

    handleRegister = (e) => {
        e.preventDefault();
        let { newCustomer } = this.state;
        let error = this.validateAll();
        if (this.isValid(error)) {
            this.register("/register", newCustomer);
        } else {
            let s1 = { ...this.state };
            s1.errors = error;
            this.setState(s1);
        }
    }

    isValid = (error) => {
        let key = Object.keys(error);
        let count = key.reduce((acc, curr) => (error[curr] ? acc + 1 : acc), 0);
        return count === 0;
    }

    validateAll = () => {
        let { name, email, password, role } = this.state.newCustomer;
        let errors = {};
        errors.name = this.handleName(name);
        errors.email = this.handleEmail(email);
        errors.password = this.handlePassword(password);
        errors.role = this.handleUser(role);
        return errors;
    }

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };

        switch (input.name) {
            case "name": s1.errors.name = this.handleName(input.value); break;
            case "email": s1.errors.email = this.handleEmail(input.value); break;
            case "password": s1.errors.password = this.handlePassword(input.value); break;
            case "role": s1.errors.role = this.handleUser(input.value); break;
            default: break;
        }
        this.setState(s1);
    }

    handleName = (name) => !name ? "Name is required" : "";
    handleEmail = (email) => !email ? "Email is required" : "";
    handlePassword = (password) => !password ? "Password is required" : "";
    handleUser = (role) => !role ? "Role is required" : "";

    render() {
        let { name, email, password, role } = this.state.newCustomer;
        let { errors } = this.state;

        return (
            <div className="container">
                <div className="jumbotron">
                    <form>
                        <h2 className="text-center mt-3 text-secondary">Register</h2>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={name}
                                placeholder="Enter Name"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.name && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.name}</span>}
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                className="form-control"
                                type="text"
                                name="email"
                                value={email}
                                placeholder="Enter Email"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.email && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Enter Password"
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            {errors.password && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.password}</span>}
                        </div>
                        <div className="form-group">
                            <label>Role</label> <br />
                            {errors.role && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.role}</span>}
                            <input
                                className="form-check-input ml-1"
                                type="radio"
                                name="role"
                                value="user"
                                checked={role === "user"}
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            <label className="ml-4">User</label> <br />
                            <input
                                className="form-check-input ml-1"
                                type="radio"
                                name="role"
                                value="admin"
                                checked={role === "admin"}
                                onChange={this.handleChange}
                                onBlur={this.handleFocusValidation}
                            />
                            <label className="ml-4">Admin</label>
                        </div>
                        <div className="form-group text-center">
                            <button className="btn btn-primary mb-3 font-weight-bold rounded-pill" onClick={this.handleRegister}>Register</button> <br />
                            <Link to="/home/login" className="text-primary font-weight-bold rounded-pill">Already have an account</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Register;