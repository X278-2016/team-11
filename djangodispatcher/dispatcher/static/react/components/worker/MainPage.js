import { connect } from 'react-redux'
import { fetchCurrentUser, fetchCurrentUserTasks, fetchCompletedUserTasks,
 completeTask} from '../../actions'
import TaskPanel from './TaskPanel'

var MainPage = React.createClass({
    componentDidMount: function(){
        this.props.fetchCurrentUser();
        this.props.fetchCurrentUserTasks();
        this.props.fetchCompletedUserTasks();
    },
    render: function() {
        return(<div>
                <h1 className="text-center">{this.props.user.firstName+" "+this.props.user.lastName}
                <span className="logout-btn"><a className="btn btn-warning" href="/accounts/logout/">Logout</a></span></h1>
                <div className="col-md-6">
                    <TaskPanel tasks={this.props.user.active_tasks} type="Active" completeTask={this.props.completeTask}/>
                </div>
                <div className="col-md-6">
                    <TaskPanel tasks={this.props.user.completed_tasks} type="Completed"/>
                </div>
            </div>);
    }
});

const mapStateToProps = (state) => {
    //updateCompany
    console.log(state.getCurrentUser)
    return {
        user: state.getCurrentUser,
        active_tasks: state.getCurrentUser.active_tasks,
        completed_tasks: state.getCurrentUser.completedTasks
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
        },
        fetchCompletedUserTasks:() => {
            dispatch(fetchCompletedUserTasks());
        },
        completeTask:(data)=>{
            dispatch(completeTask(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)