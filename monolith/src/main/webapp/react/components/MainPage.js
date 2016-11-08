import { connect } from 'react-redux'
import { fetchCurrentUser } from '../actions'
import Sample from './sample'

var MainPage = React.createClass({
    componentDidMount: function(){
        this.props.fetchCurrentUser();
    },
    render: function() {
        return(<div>
            <Sample user={this.props.user}/>
            </div>);
    }
});

const mapStateToProps = (state) => {
    //updateCompany
    return {
        user: state.getCurrentUser
    };
};

//in this method, call the action method
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentUser:() => {
            dispatch(fetchCurrentUser());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)