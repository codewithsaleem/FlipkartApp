import React, { Component } from "react";
class LeftPanel extends Component {
    state = {
        isExpandedRam: false,
        isExpandedRating: false,
        isExpandedPrice: false,
    }

    toggleClass = (num) => {
        if (num === 1) this.setState({ isExpandedRam: !this.state.isExpandedRam });
        if (num === 2) this.setState({ isExpandedRating: !this.state.isExpandedRating });
        if (num === 3) this.setState({ isExpandedPrice: !this.state.isExpandedPrice });
    }

    handleChange = (e) => {
        let { currentTarget: input } = e;
        let options = { ...this.props.options };
        if (input.name === "assured" || input.name === "ram" || input.name === "rating" || input.name === "price") {
            options[input.name] = this.updateCBs(options[input.name], input.checked, input.value);
            this.props.onOptionChange(options);
        }
    }
    updateCBs = (inpValues, checked, value) => {
        let newArr = inpValues ? inpValues.split(",") : [];
        if (checked) {
            newArr.push(value);
        }
        else {
            let index = newArr.findIndex((ele) => ele === value);
            if (index >= 0) {
                newArr.splice(index, 1);
            }
        }
        return newArr.join(",");
    }

    makeCheckBoxes = (arr, selectedValues, name) => {
        return (
            <React.Fragment>
                {arr.map((opt) => (
                    <div className="" key={opt.value}>
                        <input
                            className="mr-2"
                            type="checkbox"
                            name={name}
                            value={opt.value}
                            checked={selectedValues.includes(opt.value)}
                            onChange={this.handleChange}
                        />
                        <label className="form-check-label">{opt.display}</label>
                    </div>
                ))}
            </React.Fragment>
        );
    }
    render() {
        let { isExpandedRam, isExpandedRating, isExpandedPrice } = this.state;
        let { assured = "", ram = "", rating = "", price = "" } = this.props.options;

        let assured1 = [
            {display: "", value: true},
        ];

        let ram1 = [
            { display: "6 GB AND MORE", value: ">=6" },
            { display: "4 GB", value: "<=4" },
            { display: "3 GB", value: "<=3" },
            { display: "2 GB", value: "<=2" },
        ];

        let rating1 = [
            { display: "4 ★ & ABOVE", value: ">4" },
            { display: "3 ★ & ABOVE", value: ">3" },
            { display: "2 ★ & ABOVE", value: ">2" },
            { display:  "1 ★ & ABOVE", value: ">1" },
        ];

        let price1 = [
            { display: "0-5000", value: "0-5000" },
            { display: "5000-10000", value: "5000-10000" },
            { display: "10000-20000", value: "10000-20000" },
            { display: "> 20000", value: ">20000" },
        ];
        
        return (
            <React.Fragment>
                <div className="row text-secondary">
                    <div className="row p-2">
                        <h4>Filters</h4>
                    </div>
                    <div className="row p-2">
                        <div className="col-2">
                            {this.makeCheckBoxes(assured1, assured, "assured")}
                        </div>
                        <div className="col-10"><img src="https://i.ibb.co/t8bPSBN/fa-8b4b59.png" alt="" style={{ width: '100px' }} /></div>
                    </div>

                    <div className="row p-2">
                        <div className="col-10">
                            RAM
                            {isExpandedRam === true && (
                                this.makeCheckBoxes(ram1, ram, "ram")
                            )}
                        </div>
                        <div className="col-2">
                            <span
                                className="fa-stack text-secondary"
                                style={{ cursor: "pointer" }}
                                onClick={() => this.toggleClass(1)}
                            >
                                <i className={`fa-solid ${isExpandedRam === true ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            </span>
                        </div>
                    </div>

                    <div className="row p-2">
                        <div className="col-10">
                            CUSTOMER RATING
                            {isExpandedRating === true && (
                                this.makeCheckBoxes(rating1, rating, "rating")
                            )}
                        </div>
                        <div className="col-2">
                            <span
                                className="fa-stack text-secondary"
                                style={{ cursor: "pointer" }}
                                onClick={() => this.toggleClass(2)}
                            >
                                <i className={`fa-solid ${isExpandedRating === true ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            </span>
                        </div>
                    </div>

                    <div className="row p-2">
                        <div className="col-10">
                            PRICE
                            {isExpandedPrice === true && (
                                this.makeCheckBoxes(price1, price, "price")
                            )}
                        </div>
                        <div className="col-2">
                            <span
                                className="fa-stack text-secondary"
                                style={{ cursor: "pointer" }}
                                onClick={() => this.toggleClass(3)}
                            >
                                <i className={`fa-solid ${isExpandedPrice === true ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                            </span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default LeftPanel;