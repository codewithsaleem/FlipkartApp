import React, { Component } from "react";
import http from "./httpServiceFlipkart.js";
import { Formik, FieldArray, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

const validationProducts = yup.object().shape({
    id: yup.string().required("Id is required"),
    category: yup.string().required("Category is required"),
    brand: yup.string().required("Brand is required"),
    name: yup.string().required("Product Name is required"),
    img: yup.string().required("Image link is required"),
    rating: yup.number("Must be number").required("Rating is required"),
    ratingDesc: yup.string().required("Rating Desc is required"),
    details: yup.array().required("Details is required"),
    price: yup.number("Must be number").required("Price is required"),
    prevPrice: yup.number("Must be number").required("Prev Price is required"),
    discount: yup.number("Must be number").required("Discount is required"),
    emi: yup.string().required("EMI is required"),
    exchange: yup.string().required("Exchange is required"),
    ram: yup.number("Must be number").required("RAM is required"),
    popularity: yup.number("Must be number").required("Popularity is required"),
})

class ProductForm extends Component {
    state = {
        product: {}
    }
    async postProduct(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        // this.props.history.push("/home");
    }
    async putProduct(url, obj) {
        let response = await http.put(url, obj);
        let { data } = response;
        // this.props.history.push("/home");
    }
    handleSubmitProduct = (prod) => {
        let fnd = this.state.product ? this.state.product.id === prod.id : {}
        if (fnd) this.putProduct(`/products/${prod.id}`, prod)
        else this.postProduct("/products", prod)
    }
    async fetchData() {
        let { id } = this.props.match.params;
        if (id) {
            let response = await http.get(`/productsid/${id}`);
            let { data } = response;
            this.setState({ product: data });
        }
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchData();
        }
    }
    render() {
        let { product } = this.state;
        let categories = ["Mobiles", "Laptops", "Camera"];
        let brands = ["Mi", "RealMe", "Samsung", "OPPO", "Apple", "HP", "Acer", "Dell", "Nikon", "Canon", "Sony"];
        let ratings = ['1.0', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9',
            '2.0', '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9',
            '3.0', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8', '3.9',
            '4.0', '4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8', '4.9', '5.0'];
        let rams = ["6", "4", "3", "2"];
        let pr = product ? product : {}
        return (
            <Formik enableReinitialize initialValues={{
                id: pr.id || "",
                category: pr.category || "",
                brand: pr.brand || "",
                name: pr.name || "",
                img: pr.img || "",
                rating: pr.rating || "",
                ratingDesc: pr.ratingDesc || "",
                details: pr.details || [],
                price: pr.price || "",
                assured: pr.assured || false,
                prevPrice: pr.prevPrice || "",
                discount: pr.discount || "",
                emi: pr.emi || "",
                exchange: pr.exchange || "",
                ram: pr.ram || "",
                popularity: pr.popularity || "",
                offers: pr.offers || []
            }}
                validationSchema={validationProducts}
                onSubmit={(values) => {
                    this.handleSubmitProduct(values);
                    this.props.history.push("/home");
                }}

            >
                {({ values, errors }) => (
                    <div className="container">
                        <div className="jumbotron">
                        <Form>
                                <h3 className="text-secondary text-center" style={{fontFamily: 'fantasy'}}>{product.id ? "Edit the Product" : "Details of New Product"}</h3>

                                <div className="form-group">
                                    <label>Id</label>
                                    <Field className="form-control" name="id" type="text" />
                                    <div className="text-danger"><ErrorMessage name="id" /></div>
                                </div>

                                <div className="form-group">
                                    <label>Category</label>
                                    <Field className="form-control" name="category" as="select">
                                        <option value="">Select Category</option>
                                        {categories.map((ele, index) => (
                                            <option value={ele} key={index}>{ele}</option>
                                        ))}
                                    </Field>
                                    <div className="text-danger"><ErrorMessage name="category" /></div>
                                </div>

                                <div className="form-group">
                                    <label>Brand</label>
                                    <Field className="form-control" name="brand" as="select">
                                        <option value="">Select Brand</option>
                                        {brands.map((ele, index) => (
                                            <option value={ele} key={index}>{ele}</option>
                                        ))}
                                    </Field>
                                    <div className="text-danger"><ErrorMessage name="brand" /></div>
                                </div>

                                <div className="form-group">
                                    <label>Product Name</label>
                                    <Field className="form-control" name="name" type="text" />
                                    <div className="text-danger"><ErrorMessage name="name" /></div>
                                </div>

                                <div className="form-group">
                                    <label>Image Link</label>
                                    <Field className="form-control" name="img" type="text" />
                                    <div className="text-danger"><ErrorMessage name="img" /></div>
                                </div>

                                <div className="form-group">
                                    <label>Rating</label>
                                    <Field className="form-control" name="rating" as="select">
                                        <option value="">Select Rating</option>
                                        {ratings.map((ele, index) => (
                                            <option value={ele} key={index}>{ele}</option>
                                        ))}
                                    </Field>
                                    <div className="text-danger"><ErrorMessage name="rating" /></div>
                                </div>

                                <div className="form-group">
                                    <label>Rating Desc</label>
                                    <Field className="form-control" name="ratingDesc" type="text" />
                                    <div className="text-danger"><ErrorMessage name="ratingDesc" /></div>
                                </div>




                                <FieldArray
                                    name="details"
                                    render={(arrayHelpers) => (
                                        <div>
                                            {values.details.map((ele, index) => (
                                                <div className="row mb-2" key={index}>
                                                    <div className="col-8">
                                                        <Field name={`details[${index}]`} type="text" placeholder={`Enter details ${index + 1}`} className="form-control" />
                                                    </div>
                                                    <div className="col-2 align-middle">
                                                        <button type="button" className="btn btn-sm btn-warning mr-2" onClick={() => arrayHelpers.remove(index)}>Delete</button>
                                                    </div>
                                                </div>
                                            ))}
                                            <button type="button" className="btn btn-success mb-2 rounded-pill" onClick={() => arrayHelpers.push("")}>Add Details</button>
                                            <div className="text-danger"><ErrorMessage name="details" /></div>
                                        </div>
                                    )}
                                />





                                <div className="form-group">
                                    <label>Price</label>
                                    <Field className="form-control" name="price" type="text" />
                                    <div className="text-danger"><ErrorMessage name="price" /></div>
                                </div>

                                <div className="form-group">
                                    <label>Assured</label> <br />
                                    <Field type="checkbox" name="assured" checked={values.assured} />
                                </div>

                                <div className="form-group">
                                    <label>PrevPrice</label>
                                    <Field className="form-control" name="prevPrice" type="text" />
                                    <div className="text-danger"><ErrorMessage name="prevPrice" /></div>
                                </div>

                                <div className="form-group">
                                    <label>Discount</label>
                                    <Field className="form-control" name="discount" type="text" />
                                    <div className="text-danger"><ErrorMessage name="discount" /></div>
                                </div>

                                <div className="form-group">
                                    <label>EMI</label>
                                    <Field className="form-control" name="emi" type="text" />
                                    <div className="text-danger"><ErrorMessage name="EMI" /></div>
                                </div>

                                <div className="form-group">
                                    <label>Exchange</label>
                                    <Field className="form-control" name="exchange" type="text" />
                                    <div className="text-danger"><ErrorMessage name="exchange" /></div>
                                </div>

                                <div className="form-group">
                                    <label>RAM</label>
                                    <Field className="form-control" name="ram" as="select">
                                        <option value="">Select RAM</option>
                                        {rams.map((ele, index) => (
                                            <option value={ele} key={index}>{ele}</option>
                                        ))}
                                    </Field>
                                    <div className="text-danger"><ErrorMessage name="ram" /></div>
                                </div>

                                <div className="form-group">
                                    <label>Popularity</label>
                                    <Field className="form-control" name="popularity" type="text" />
                                    <div className="text-danger"><ErrorMessage name="popularity" /></div>
                                </div>

                                <div className="form-group mt-3">
                                    <button className="form-control btn btn-primary font-weight-bold rounded-pill" type="submit">{product.id ? "Update Product" : "Add Product"}</button>
                                </div>
                            </Form>

                        </div>
                    </div>
                )}
            </Formik>
        )
    }
}
export default ProductForm;