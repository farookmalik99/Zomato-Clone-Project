import react from 'react'
import { useNavigate } from 'react-router-dom'

// class quicksearchitem extends react.Component {

const Quicksearchitem = (props) => {
    const { _id, name, content, image } = props.data


    const nav = useNavigate();

    const ShowFilter = () => {
        nav('./filter', { replace: true })
    }

    return (
        <div>
            <div onClick={() => ShowFilter(_id)}>
                <div className="d-flex box mt-4">
                    <div className="boxes">
                        <img src={`./img/${image}`} className="img-fluid img1" style={{ height: "160px;", width: "160px;" }} />
                    </div>
                    <div className="boxcon">
                        <h4 className="cardtitle">{name}</h4>
                        <p className="cardcon">{content}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Quicksearchitem