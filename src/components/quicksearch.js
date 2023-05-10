import react from 'react'
import Quicksearchitem from './quicksearchitem'

class Quicksearch extends react.Component {

    
    render() {

        const { MealtypeData } = this.props

        return (
            <div>
                <div className="container mt-5 mb-5">
                    <div className="row">
                        <h3 className="head1">Quick Searches</h3>
                        <p className="head2">Discover restaurants by type of meal</p>
                    </div>

                    <div className="all-box d-wrap">
                        {
                            MealtypeData.map((items) => {
                                return(
                                    <Quicksearchitem data = { items } />
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        )
    }
}

export default Quicksearch