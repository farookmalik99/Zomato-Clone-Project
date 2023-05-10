import react from 'react';
import '../Styles/details.css'
import axios from 'axios';
import queryString from 'query-string';
import { Tabs, Tab, TabPanel, TabList } from 'react-tabs';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,.8)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
};


class Details extends react.Component {

    constructor() {
        super()
        this.state = {
            restaurant: [],
            galleryModal: false,
            menuModal: false,
            resId: undefined,
            menuItems: [],
            subtotal: 0
        }
    }

    componentDidMount() {
        const qs = queryString.parse(window.location.search)
        const { restaurant } = qs
        console.log(restaurant);
        axios({
            url: `http://localhost:8900/Restaurants/${restaurant}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON' }
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, resId: restaurant })
            })
            .catch((err => console.log(err)))
    }

    handleModal = (state, value) => {
        const { resId } = this.state
        console.log(resId);
        if (state == "menuModal" && value == true) {
            axios({
                url: `http://localhost:8900/menu/${resId}`,
                method: 'GET',
                headers: { 'Content-Type': 'application/JSON' }
            })
                .then(res => {
                    this.setState({ menuItems: res.data.menuitems })
                })
                .catch((err => console.log(err)))
        }

        this.setState({ [state]: value })
    }

    additems = (index, operationType) => {
        let total = 0
        const items = [...this.state.menuItems]
        const item = items[index]

        if (operationType == 'add') {
            item.qty += 1
        } else {
            item.qty -= 1
        }
        items[index] = item

        items.map((x) => {
            total += x.qty * x.price
        })

        this.setState({ menuItems: items, subtotal: total })
    }


    initPayment = (data) => {
        const options = {
            key: "rzp_test_g7iXAJDKbFBg3J",
            amount: data.amount,
            currency: data.currency,
            description: "Test Transaction",
            order_id: data.id,

            handler: async (response) => {
                try {
                    const verifyUrl = "http://localhost:8900/api/payment/verify";
                    const { data } = await axios.post(verifyUrl, response);
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    }
    handlePayment = async () => {
        const { subtotal } = this.state;

        try {
            const orderUrl = "http://localhost:8900/api/payment/orders";
            const { data } = await axios.post(orderUrl, { amount: subtotal });

            console.log(data);
            this.initPayment(data.data);
        } catch (error) {
            console.log(error);
        }

    }

    render() {

        const { restaurant, galleryModal, menuModal, menuItems, formModal, subtotal } = this.state

        return (
            <div>
                {/* <nav className="navbar bg-danger" data-bs-theme="">
                    <div className="container">
                        <div className="navbar-brand text-danger circle">
                            <h2 className="logo">e!</h2>
                        </div>
                        <form className="d-flex navform">
                            <button type="button" className="login">Login</button>
                            <button type="button" className="acc ms-3">Create an account</button>
                        </form>
                    </div>
                </nav> */}
                {console.log(restaurant)}


                <div className="container-fluid mt-5">
                    <div className="container">
                        <div className="imgpart">
                            <img src={restaurant.thumb} className="detailsimg" />

                        </div>
                        <button className="button" onClick={() => this.handleModal('galleryModal', true)}>Click to see Image Gallery</button>

                        <div className="resheadpart mt-5 d-flex">
                            <h2 className="heading">{restaurant.name}</h2>
                            <button className="onlineorder" onClick={() => this.handleModal('menuModal', true)}>Place Online Order</button>
                        </div>

                        <div className="rescontentpart mt-5">
                            <Tabs className="resinfopart">
                                <TabList className='tablist'>
                                    <Tab className="tab Overview">Overview</Tab>
                                    <Tab className="tab contact">Contact</Tab>
                                </TabList>
                                <hr className="tabline" />
                                <TabPanel className="details mt-5">
                                    <h2 className='about'>About the Place</h2>
                                    <h4 className='head mt-5'>Cuisine</h4>
                                    <p className='value mt-3'>{restaurant && restaurant.Cuisine && restaurant.Cuisine.map(cuisine => `${cuisine.name} `)}</p>
                                    <h4 className='head mt-5'>Average Cost</h4>
                                    <p className='value mt-3'>₹ {restaurant.cost} for two people(approx)</p>
                                </TabPanel>
                                <TabPanel className="details mt-5">
                                    <h4 className='Phone mt-5'>Phone Number</h4>
                                    <p className='number'>+91 {restaurant.contact_number}</p>
                                    <h4 className='resname mt-5'>{restaurant.name}</h4>
                                    <p className='address'>{restaurant.address}</p>
                                </TabPanel>
                            </Tabs>

                        </div>
                        <Modal
                            isOpen={galleryModal}
                            style={customStyles}
                        >
                            <div className='icon' style={{ float: "right", marginBottom: "5px", marginRight: '-1rem' }} onClick={() => this.handleModal('galleryModal', false)}><i className='bi bi-x-circle-fill'></i></div>

                            <Carousel showThumbs={false} showStatus={false}>
                                <div className='bannerImg'>
                                    <img src={restaurant.thumb} />
                                </div>
                            </Carousel>
                        </Modal>


                        <Modal
                            isOpen={menuModal}
                            style={customStyles}
                        >
                            <div>
                                <div className='bigdiv'>
                                    <div className='icon' style={{ float: "right", marginBottom: "5px" }} onClick={() => this.handleModal('menuModal', false)}><i className='bi bi-x-circle-fill'></i></div>
                                    <div className=''>
                                        <br />
                                        <h3 className='restaurantname mx-2' style={{ color: '#192F60', fontWeight: 'bold', fontSize: '30px' }}>{restaurant.name}</h3>


                                        {menuItems?.map((item, index) => {

                                            return <div
                                                style={{ width: '44rem', marginTop: '28px', marginBottom: '10px', borderBottom: '2px solid red' }}>

                                                <div className=''
                                                    style={{ width: '44rem', margin: '' }}>
                                                    <div className="row"
                                                        style={{ paddingLeft: '10px', paddingBottom: '10px' }}>

                                                        <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9' style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                                            <span className='cardbody'>
                                                                <h5 className="itemname">{item.name}</h5>
                                                                <h5 className="itemprice">&#8377;{item.price}</h5>
                                                                <p className="itemdes">{item.description}</p>
                                                            </span>
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
                                                            <img className='card-img-center title-img' src={`./img/${item.image}`} style={{
                                                                height: '90px',
                                                                width: '90px',
                                                                borderRadius: '5px',
                                                                marginTop: '2px',
                                                                marginLeft: '58px'
                                                            }} />

                                                            {item.qty == 0 ? <div>
                                                                <button className='addbtn px-3' onClick={() => this.additems(index, 'add')}>Add</button>
                                                            </div> :
                                                                <div className='addnumber d-flex align-items-center'>
                                                                    <button className='addmin' onClick={() => this.additems(index, 'sub')}>-</button>
                                                                    <span className='qty'>{item.qty}</span>
                                                                    <button className='addmin' onClick={() => this.additems(index, 'add')}>+</button>
                                                                </div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                        <div className="total d-flex align-items-center mt-4">
                                            <h3 className='itemtotal' style={{ color: '#292C40', fontWeight: '500' }}>Subtotal: {subtotal} </h3>
                                            <button className='btn btn-danger paybtn' onClick={() => {
                                                this.handleModal('menuModal', false);
                                                this.handleModal('formModal', true);
                                            }}>Pay Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Modal>


                        <Modal
                            isOpen={formModal}
                            style={customStyles}
                        >
                            <div className='icon mx-4' style={{ float: "right", marginTop: "-10px" }} onClick={() => this.handleModal('formModal', false)}><i className='bi bi-x-circle-fill'></i></div>

                            <h2 className='mt-3 px-4' style={{ color: '#192F60', fontWeight: 'bold' }}>{restaurant.name}</h2>
                            <div className="infocon mt-5 px-4">
                                <div>
                                    <label style={{ color: '#192F60', fontSize: '16px', fontWeight: '600' }}>Name</label>
                                    <input type="text" className='form-control' style={{ width: '400px', borderRadius: 'none', fontSize: '16px' }} placeholder='Enter your name' />
                                </div>
                                <div className='mt-4'>
                                    <label style={{ color: '#192F60', fontSize: '16px', fontWeight: '600' }}>Mobile Number</label>
                                    <input type="text" className='form-control' style={{ width: '400px', borderRadius: 'none', fontSize: '16px' }} placeholder='Enter mobile number' />
                                </div>
                                <div className='mt-4'>
                                    <label style={{ color: '#192F60', fontSize: '16px', fontWeight: '600' }}>Address</label>
                                    <textarea type="text" className='form-control' style={{ width: '400px', borderRadius: 'none', fontSize: '16px' }} placeholder='Enter your address' />
                                </div>
                            </div>
                            <button className='btn btn-danger mt-5 mx-4 px-4' style={{ float: 'right', marginTop: '20px' }} onClick={this.handlePayment} >Proceed</button>
                        </Modal>
                    </div>
                </div >
            </div >

        )
    }
}
export default Details