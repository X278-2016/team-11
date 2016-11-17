import { connect } from 'react-redux'
import { fetchCurrentUser, fetchCurrentUserTasks, fetchCompletedUserTasks,
 completeTask} from '../../actions'

var ControlCenter = React.createClass({
    componentDidMount: function(){
        this.props.fetchCurrentUser();
    },
    render: function() {
        return(<div>
                <h1 className="text-center">{this.props.user.firstName+" "+this.props.user.lastName}
                <span className="close"><a className="btn btn-default" href="/accounts/logout/">Logout</a></span></h1>
                <div className="col-md-6">
                    Map
                </div>
                <div className="col-md-6">
                    All Users
                </div>
            </div>);
    }
});

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(ControlCenter)