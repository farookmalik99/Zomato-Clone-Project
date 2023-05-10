import react from 'react'
import axios from 'axios'
import navHook from './nav'

class Banner extends react.Component {

    constructor() {
        super()
        this.state = {
            restaurant: [],
            inputText: undefined,
            suggestion: []
        }
    }

    handleLocationChange = (e) => {
        const locationId = e.target.value;
        sessionStorage.setItem('locationId', locationId)

        axios({
            url: `http://localhost:8900/restaurant/${locationId}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants })
            })
            .catch((err => console.log(err)))
    }

    handleInputChange = (event) => {
        const { restaurant } = this.state
        const inputText = event.target.value

        let suggestion = []

        suggestion = restaurant.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()))
        this.setState({ inputText, suggestion })

    }

    selectRestaurant = (s) => {
        this.props.navigate(`/details?restaurant=${s}`)
    }

    showSuggestion = () => {

        const { suggestion, inputText } = this.state;

        if (suggestion.length == 0 && inputText == undefined) {
            return null
        }

        if (suggestion.length > 0 && inputText == '') {
            return null
        }

        if (suggestion.length == 0 && inputText) {
            return <li className='noresult'>No Search Results Found</li>
        }

        return (
            suggestion.map((data, index) => (
                <li key={index} onClick={() => this.selectRestaurant(data._id)} >
                    <img src={data.thumb} className='sugimg' />
                    <div className="rescontent">
                        <span className='resname'>{`${data.name}`}</span>
                        <span className='resadd'>{`${data.locality}`}</span>
                    </div>
                </li>
            ))
        )
    }





    render() {

        const { LocationData } = this.props

        return (
            <div>
                <div className="bgcover homeimg d-flex">
                    <div className="container mt-3">
                        {/* <div className="row logrow">
                            <div className="col text-end">
                                <button type="button" className="login">Login</button>
                                <button type="button" className="acc ms-3">Create an account</button>
                            </div>
                        </div> */}

                        <div className="row mt-5">
                            <div className="col d-flex justify-content-center">
                                <div className="text-danger circle1">
                                    <h2 className="homelogo1">e!</h2>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col d-flex justify-content-center">
                                <h3 className="text-light text-center maintext">Find the best restaurants, cafés, and bars</h3>
                            </div>
                        </div>

                        <div className="row mt-3 d-flex justify-content-center align-items-center search">
                            <div className="col sel-loc">
                                <select className="form-control input1 py-2" onChange={this.handleLocationChange}>
                                    <option value="0" disabled selected>Please type a location</option>
                                    {
                                        LocationData.map((item) => {
                                            return (
                                                <option value={item.city_id}>{`${item.name}`}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col inputgrp srhbar d-flex align-items-center">
                                <i className="bi bi-search input2"></i>
                                <input type="text" className="form-control input2 py-2" placeholder="Search for restaurants" onChange={this.handleInputChange} />
                                <ul className='suggestion'>{this.showSuggestion()}</ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default navHook(Banner)