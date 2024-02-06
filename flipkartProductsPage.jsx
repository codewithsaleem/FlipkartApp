import React, { Component } from "react";
import LeftPanel from "./flipkartLeftPanel";
import { Link } from "react-router-dom";
import http from "./httpServiceFlipkart.js";
import auth from "./httpServiceFlipkartAuth.js";
import queryString from "query-string";
class ProductsPage extends Component {
    state = {
        products1: [],
        pageInfo1: {},
        view1: -1,
    }
    handleEdit = (id) => {
        this.props.history.push(`/home/${id}/edit`);
    }
    async deleteProd(url, obj) {
        let response = await http.deleteApi(url, obj);
        let { data } = response;
        let { category, brand } = this.props.match.params;
        this.props.history.push(`/home/${category}/${brand}`)
    }
    handleRemove = (id) => {
        let prod = this.state.products1.find((ele) => ele.id === id)
        this.deleteProd(`/deleteproducts/${id}`, prod);
    }
    handleProductsImages = (category, brand, id) => {
        this.props.history.push(`/home/${category}/${brand}/${id}`);
    }
    handleSort = (str) => {
        let { category, brand } = this.props.match.params;
        let queryParams = queryString.parse(this.props.location.search);

        // Reset both price and popularity to avoid having both at the same time
        delete queryParams.price;
        delete queryParams.popularity;

        if (str === 'desc') {
            queryParams.price = str;
            this.setState({ view1: 3 });
        }
        else if (str === 'asc') {
            queryParams.price = str;
            this.setState({ view1: 2 });
        }
        else {
            queryParams.popularity = str;
            this.setState({ view1: 1 });
        }
        this.callURL(`/home/${category}/${brand}`, queryParams);
    }

    handlePage = (num) => {
        let queryParams = queryString.parse(this.props.location.search);
        let { page = "1" } = queryParams;
        let newPage = +page + num;
        queryParams.page = newPage;
        let { category, brand } = this.props.match.params;
        this.callURL(`/home/${category}/${brand}`, queryParams)
    }

    handleOptionChange = (options) => {
        let { category, brand } = this.props.match.params;
        this.callURL(`/home/${category}/${brand}`, options)
    }
    async fetchData() {
        let queryParams = queryString.parse(this.props.location.search);
        let searchString = this.makeSearchString(queryParams);
        let { category, brand } = this.props.match.params;
        let response = null;
        if (searchString) {
            response = await http.get(`/products/${category}/${brand}?${searchString}`);
        }
        else {
            response = await http.get(`/products/${category}/${brand}?page=1`);
        }
        let { data, pageInfo } = response.data;
        this.setState({ products1: data, pageInfo1: pageInfo });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchData();
    }

    callURL = (url, options) => {
        console.log("1111", options)

        let searchStr = this.makeSearchString(options);
        this.props.history.push({
            pathname: url,
            search: searchStr,
        })
    }

    makeSearchString = (options) => {
        let { popularity, desc, asc, assured, q, ram, rating, price, page } = options;
        let searchStr = "";
        searchStr = this.addToQueryString(searchStr, "page", page);
        searchStr = this.addToQueryString(searchStr, "sort", popularity);
        searchStr = this.addToQueryString(searchStr, "sort", desc);
        searchStr = this.addToQueryString(searchStr, "sort", asc);

        searchStr = this.addToQueryString(searchStr, "assured", assured);
        searchStr = this.addToQueryString(searchStr, "q", q);
        searchStr = this.addToQueryString(searchStr, "ram", ram);
        searchStr = this.addToQueryString(searchStr, "rating", rating);
        searchStr = this.addToQueryString(searchStr, "price", price);
        return searchStr;
    }

    addToQueryString = (str, paramName, paramValue) =>
        paramValue ? str ? `${str}&${paramName}=${paramValue}` : `${paramName}=${paramValue}` : str;

    render() {
        let user = auth.getUser();
        let { products1, pageInfo1, view1, view2, view3 } = this.state;
        let { pageNumber, numberOfPages, numOfItems, totalItemCount } = this.state.pageInfo1;
        let queryParams = queryString.parse(this.props.location.search);
        let { category, brand } = this.props.match.params;

        // Calculate the start and end page numbers for the current range
        let size = 4;
        let startIndex = (pageNumber - 1) * size + 1;
        let endIndex;
        if (pageNumber * size > totalItemCount) {
            endIndex = totalItemCount;
        } else {
            endIndex = pageNumber * size;
        }

        return (
            <React.Fragment>
                <hr />
                <div className="container mb-2">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-2 ms-3" style={{ backgroundColor: 'lavender' }}>
                            <LeftPanel options={queryParams} onOptionChange={this.handleOptionChange} />
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-8 bg-light">
                            <div className="row">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><Link to="/home" className="nav-link">Home</Link></li>
                                        <li class="breadcrumb-item"><Link to={`/home/${category}/${brand}`} className="nav-link">{category}</Link></li>
                                        <li class="breadcrumb-item active" aria-current="page">{brand}</li>
                                    </ol>
                                </nav>
                            </div>

                            <div className="row">
                                <div className="col-3"><b>Sort By</b></div>
                                <div className={`col-3 ${view1 === 1 && 'text-primary'}`} onClick={() => this.handleSort('popularity')}>Popularity</div>
                                <div className={`col-3 ${view1 === 3 && 'text-primary'}`} onClick={() => this.handleSort('desc')}>Price High to Low</div>
                                <div className={`col-3 ${view1 === 2 && 'text-primary'}`} onClick={() => this.handleSort('asc')}>Price Low to High</div>
                            </div>

                            <hr />

                            <div className="row">
                                {products1.length > 0 ? (products1.map((ele, index) => (
                                    <div className="col-sm-12 col-md-6 col-lg-4 mt-2" key={index}>
                                        <div className="card p-2 rounded-4" style={{ width: '13rem' }}>
                                            <img className="card-img-top rounded-4" src={ele.img} alt="Card image cap" style={{ height: '250px' }} onClick={() => this.handleProductsImages(ele.category, ele.brand, ele.id)} />
                                            <div className="card-body text-center text-secondary">
                                                <p className="card-text font-weight-bold" onClick={() => this.handleProductsImages(ele.category, ele.brand, ele.id)}>{ele.name}</p>
                                                <p className="card-text font-weight-bold" onClick={() => this.handleProductsImages(ele.category, ele.brand, ele.id)}>Brand : {ele.brand}</p>
                                                {user && user.role === 'admin' && (
                                                    <React.Fragment>
                                                        <div className="row text-center fs-4 mt-2">
                                                            <div className="col-3"></div>
                                                            <div className="col-6">
                                                                <i className="mr-2 fa-sharp fa-solid fa-pen-to-square" onClick={() => this.handleEdit(ele.id)}></i>
                                                                <i className="mr-2 fa-sharp fa-solid fa-trash" onClick={() => this.handleRemove(ele.id)}></i>
                                                            </div>
                                                            <div className="col-3"></div>
                                                        </div>
                                                    </React.Fragment>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))) : <h2 className="text-center text-danger" style={{ fontFamily: 'fantasy' }}>No products found!</h2>}
                            </div>

                            <div className="row mt-2">
                                <div className="col-sm-12 col-md-12 col-lg-1">
                                    {startIndex > 1 ? (<button className=" btn btn-sm btn-success text-white mt-2" onClick={() => this.handlePage(-1)}>Prev</button>) : ""}
                                </div>
                                <div className="col-sm-10"></div>
                                <div className="col-sm-12 col-md-12 col-lg-1">
                                    {endIndex < totalItemCount ? (<button className=" btn btn-sm btn-success text-white mt-2" onClick={() => this.handlePage(1)}>Next</button>) : ""}
                                </div>
                            </div>

                            {products1.length > 0 && <span><b>Page : </b>{startIndex} to {endIndex} of {totalItemCount}</span>}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default ProductsPage;