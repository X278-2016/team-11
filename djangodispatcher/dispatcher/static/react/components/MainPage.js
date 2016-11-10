import { connect } from 'react-redux'
import { fetchCurrentUser, fetchCurrentUserTasks } from '../actions'
import Sample from './sample'

var MainPage = React.createClass({
    componentDidMount: function(){
        this.props.fetchCurrentUser();
        this.props.fetchCurrentUserTasks();
    },
    render: function() {
        return(<div>
            <Sample user={this.props.user}/>
            </div>);
    }
});

const mapStateToProps = (state) => {
    //updateCompany
    console.log(state.getCurrentUser)
    return {
        user: state.getCurrentUser
    };
};

//in this method, call the action method
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentUser:() => {
            dispatch(fetchCurrentUser());
        },
        fetchCurrentUserTasks:() => {
            dispatch(fetchCurrentUserTasks());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)