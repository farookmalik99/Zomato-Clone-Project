import react from 'react';
import axios from 'axios';
import '../Styles/homepage.css'
import Banner from './banner'
import Quicksearch from './quicksearch'

class Home extends react.Component {
constructor(){
    super()
    this.state = {
        locations: [],
        Mealtype: []
    }
}
    componentDidMount(){
        axios({
            url: 'http://localhost:8900/Location',
            method: 'GET',
            headers: {'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({locations: res.data.loc})
        })
        .catch((err => console.log(err)))
    
        axios({
            url: 'http://localhost:8900/Mealtype',
            method: 'GET',
            headers: {'Content-Type': 'application/JSON'}
        })
        .then(res => {
            this.setState({Mealtype: res.data.mealtype})
        })
        .catch((err => console.log(err)))
    }

    render() {
        const { locations, Mealtype } = this.state
        console.log(locations)


        return (
            <div>
                <Banner LocationData = { locations } />
                <Quicksearch MealtypeData = { Mealtype } />
            </div>
        )}}


export default Home