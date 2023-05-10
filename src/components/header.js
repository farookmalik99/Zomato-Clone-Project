import React from "react";
import Modal from 'react-modal';

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.9)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "30rem"

    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModal: false
        }
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    handleLogout = () => {
        window.open("http://localhost:8900/auth/logout", "_self");
    }

    google = () => {
        window.open("http://localhost:8900/auth/google", "_self");
    }

    render() {
        const { loginModal } = this.state;
        const { user } = this.props;
        return (
            <div>
                <nav class="navbar bg-danger" data-bs-theme="">
                    <div class="container">
                        <div class="navbar-brand text-danger circle">
                            <h2 class="logo">e!</h2>
                        </div>
                        {!user ? (
                            <form class="d-flex nav-form">
                                <button type="button" class="btn btn-danger mx-2"
                                    onClick={() => this.handleModal('loginModal', true)}>Login</button>
                                <button type="button" class="btn btn-outline-light">Create an account</button>
                            </form>
                        ) : (
                            <form class="d-flex nav-form">
                                <button type="button" class="btn btn-danger mx-2"
                                    onClick={this.handleLogout} >Log out</button>
                                <a className="text-white p-2" style={{ fontWeight: "bold", cursor: "pointer", textDecoration: "none" }} >{user.displayName}</a>
                                <img style={{ height: "40px", width: "40px" }} className="img-thumbnail circle" src={user.photos[0].value} alt="Avatar" />
                            </form>
                        )

                        }

                    </div>
                </nav>
                <Modal
                    isOpen={loginModal}
                    style={customStyles}
                >


                    <div style={{ float: "right", marginTop: "-10px", fontSize: "2rem" }} onClick={() => this.handleModal('galleryModal', false)}>
                        <i class="bi bi-x-circle-fill"></i>
                    </div>

                    <h3 className="signup text-secondary mt-4" style={{fontWeight: "bold"}}>LOGIN</h3>

                    <div className="bg-danger bg-gradient text-center text-white p-3 mt-5" style={{ cursor: 'pointer' }} onClick={this.google}>
                        <i className="bi bi-google p-2" ></i>LOGIN WITH GOOGLE
                    </div>

                </Modal>
            </div>
        )
    }
}
export default Header;