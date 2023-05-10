import react from 'react';
import axios from 'axios';
import '../Styles/filter.css'
import navHook from './nav'

class Filter extends react.Component {

    constructor() {
        super()
        this.state = {
            locations: [],
            restaurant: [],
            location: undefined,
            cuisine: [],
            sort: 1,
            page: 1,
            lcost: undefined,
            hcost: undefined
        }
    }

    componentDidMount() {
        axios({
            url: 'http://localhost:8900/Location',
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(res => {
                this.setState({ locations: res.data.loc })
            })
            .catch((err => console.log(err)))

        axios({
            url: 'http://localhost:8900/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants })
            })
            .catch((err => console.log(err)))
    }

    handlelocationchange = (event) => {
        const location = event.target.value
        const { lcost, hcost, sort, page } = this.state

        const filterObj = {
            location: location,
            sort,
            page,
            lcost,
            hcost
        }
        axios({
            url: 'http://localhost:8900/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, location })
            })
            .catch((err => console.log(err)))
    }

    handleSortChange = (sort) => {
        const { location, page, lcost, hcost } = this.state

        const filterObj = {
            location: location,
            page,
            lcost,
            hcost,
            sort
        }
        axios({
            url: 'http://localhost:8900/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, sort })
            })
            .catch((err => console.log(err)))

    }
    handlePageChange = (page) => {
        const { location, sort, lcost, hcost } = this.state

        const filterObj = {
            location: location,
            sort,
            lcost,
            hcost,
            page
        }
        axios({
            url: 'http://localhost:8900/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, page })
            })
            .catch((err => console.log(err)))

    }

    handleCostchange = (lcost, hcost) => {
        const { location, sort, page } = this.state

        const filterObj = {
            location: location,
            sort,
            page,
            lcost,
            hcost
        }
        axios({
            url: 'http://localhost:8900/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, lcost, hcost })
            })
            .catch((err => console.log(err)))
    }

    handleCuisineChange = (cuisine) => {
        const { location, sort, page, lcost, hcost } = this.state

        const filterObj = {
            location: location,
            sort,
            page,
            lcost,
            hcost,
            cuisine: cuisine
        }
        axios({
            url: 'http://localhost:8900/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: filterObj
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, cuisine })
            })
            .catch((err => console.log(err)))
    }

    handleNavigate = (res) => {
        this.props.navigate(`/details?restaurant=${res}`)
    }

    render() {

        const { locations, restaurant } = this.state

        return (
            <div>
                {/* <nav className="navbar bg-danger" data-bs-theme="">
                    <div className="container">
                        <div className="navbar-brand text-danger circle">
                            <h2 className="logo">e!</h2>
                        </div>
                        <div className="d-flex">
                            <button type="button" className="login">Login</button>
                            <button type="button" className="acc ms-3">Create an account</button>
                        </div>
                    </div>
                </nav> */}
                <div className="container my-4">
                    <h2 className="filterhead mt-3">Breakfast Places in Mumbai</h2>
                </div>
                <div className="container containerboth mt-4 d-flex">

                    <div className="filterbox mt-2 px-4 py-2">
                        <h5 className="filterhead1 mt-2">Filters</h5>
                        <p className="filterhead2">Select Location</p>

                        <select className="form-control selloc" onChange={this.handlelocationchange}>
                            <option value="0" disabled selected>Select location</option>
                            {
                                locations.map((item, index) => {
                                    return (
                                        <option key={index} value={item.city_id}>{`${item.name}`}</option>
                                    )
                                })
                            }
                        </select>


                        <div className="cuisinesbox d-flex ">
                            <p className="filterhead2 mt-4">Cuisines</p>

                            <div className="cuisineinput d-flex">

                                <div className="input d-flex">
                                    <input type="checkbox" id="North Indian" onChange={() => this.handleCuisineChange(1)} name="Cuisines" value="less than 500" /> <label htmlFor="North Indian" className="check " style={{ marginLeft: "12px" }}> North Indian </label>
                                </div>
                                <div className="input">
                                    <input type="checkbox" id="South Indian" onChange={() => this.handleCuisineChange(2)} name="Cuisines" value="500 to 1000" /> <label htmlFor="South Indian" className="rcheck"> South Indian </label>
                                </div>
                                <div className="input">
                                    <input type="checkbox" id=" Chinese" onChange={() => this.handleCuisineChange(3)} name="Cuisines" value="1000 to 1500" /> <label
                                        htmlFor="Chinese" className="check">
                                        Chinese </label>
                                </div>
                                <div className="input">
                                    <input type="checkbox" id="Fast Food" onChange={() => this.handleCuisineChange(4)} name="Cuisines" value="1500 to 2000" /> <label
                                        htmlFor="Fast Food" className="check">
                                        Fast Food </label>
                                </div>
                                <div className="input">
                                    <input type="checkbox" id="Street Food" onChange={() => this.handleCuisineChange(5)} name="Cuisines" value="2000+" /> <label
                                        htmlFor="Street Food" className="check">
                                        Street Food </label>
                                </div>
                            </div>
                        </div>

                        <div className="costfortwobox d-flex">
                            <p className="filterhead2 mt-4">Cost for Two</p>

                            <div className="costfortwoinput d-flex">

                                <div className="input d-flex">
                                    <input type="radio" id="500" name="costfortwo" onChange={() => this.handleCostchange(1, 500)} /> <label htmlFor="500" className="radio"> Less than ₹500 </label>
                                </div>
                                <div className="input d-flex">
                                    <input type="radio" id="1000" name="costfortwo" onChange={() => this.handleCostchange(500, 1000)} /> <label htmlFor="1000" className="radio"> ₹500 to ₹1000 </label>
                                </div>
                                <div className="input d-flex">
                                    <input type="radio" id="1500" name="costfortwo" onChange={() => this.handleCostchange(1000, 1500)} /> <label htmlFor="1500" className="radio"> ₹1000 to ₹1500 </label>
                                </div>
                                <div className="input d-flex">
                                    <input type="radio" id="2000" name="costfortwo" onChange={() => this.handleCostchange(1500, 2000)} />
                                    <label htmlFor="2000" className="radio"> ₹1500 to ₹2000 </label>
                                </div>
                                <div className="input d-flex">
                                    <input type="radio" id="2000++" name="costfortwo" onChange={() => this.handleCostchange(2000, 5000)} /> <label htmlFor="2000+" className="radio"> ₹2000+</label>

                                </div>
                            </div>
                        </div>

                        <h5 className="filterhead1 mt-4">Sort</h5>

                        <div className="input d-flex">
                            <input type="radio" id="lh" name="sort" onChange={() => this.handleSortChange(1)} />
                            <label htmlFor="lh" className="filtercheck"> Price low to high </label>
                        </div>
                        <div className="input d-flex">
                            <input type="radio" id="hl" name="sort" onChange={() => this.handleSortChange(-1)} />
                            <label htmlFor="hl" className="filtercheck"> Price high to low</label>
                        </div>
                    </div>

                    <div className="resultbox mx-5 mt-2">

                        {
                            restaurant.length != 0 ?
                                restaurant.map((each, index) => {
                                    return (
                                        <div className="results mb-5" key={index} onClick={() => this.handleNavigate(each._id)}>
                                            <div className="d-flex imgcon pt-4">
                                                <div className="ltbox">
                                                    <img src={each.thumb} className="img-fluid img" style={{ height: "120px" }} />
                                                </div>

                                                <div className="rt-box">
                                                    <h4 className="resulthead">{each.name}</h4>
                                                    <p className="resulthead2">{each.city_name}</p>
                                                    <p className="resulttext">{each.address}</p>
                                                </div>
                                            </div>

                                            <hr style={{ color: "grey;" }} />

                                            <div className="d-flex content">
                                                <div className="llbox">
                                                    <p className="resulttext">CUISINES:</p>
                                                    <p className="resulttext">COST FOR TWO:</p>
                                                </div>
                                                <div className="rlbox">
                                                    <p className="resulttextblue">{each.Cuisine.map((r) =>
                                                        `${r.name} `
                                                    )}</p>
                                                    <p className="resulttextblue">₹ {each.cost}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                ) : <div className='noresults d-flex align-items-center justify-content-center'>Sorry, No Results Found...</div>
                        }

                        <div className="mt-5">

                            <ul className="pagination justify-content-center">
                                <li className="page-item mx-1 border border-1 border-secondary">
                                    <a href="#" className="page-link"><span> {"<"} </span></a>
                                </li>
                                <li className="page-item mx-1 border border-1 border-secondary">
                                    <a href="#" className="page-link" onClick={() => this.handlePageChange(1)}>1</a>
                                </li>
                                <li className="page-item mx-1 border border-1 border-secondary">
                                    <a href="#" className="page-link" onClick={() => this.handlePageChange(2)}>2</a>
                                </li>
                                <li className="page-item mx-1 border border-1 border-secondary">
                                    <a href="#" className="page-link" onClick={() => this.handlePageChange(3)}>3</a>
                                </li>
                                <li className="page-item mx-1 border border-1 border-secondary">
                                    <a href="#" className="page-link" onClick={() => this.handlePageChange(4)}>4</a>
                                </li>
                                <li className="page-item mx-1 border border-1 border-secondary">
                                    <a href="#" className="page-link" onClick={() => this.handlePageChange(5)}>5</a>
                                </li>
                                <li className="page-item mx-1 border border-1 border-secondary">
                                    <a href="#" className="page-link"><span> {">"} </span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default navHook(Filter)