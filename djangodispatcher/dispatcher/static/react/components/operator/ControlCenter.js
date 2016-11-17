import { connect } from 'react-redux'
import { fetchCurrentUser, fetchAllUsers} from '../../actions'
import UserPanel from './UserPanel'

var ControlCenter = React.createClass({
    componentDidMount: function(){
        this.props.fetchCurrentUser();
        this.props.fetchAllUsers();
    },
    render: function() {
        var userlist = [];
        if(this.props.allUsers!=undefined){
            for(var ii=0;ii<this.props.allUsers.length;ii++){
                userlist.push(<div className="col-md-4"><UserPanel user = {this.props.allUsers[ii]} key={ii}/></div>);
            }
        }
        return(<div>
                <h1 className="text-center">{this.props.user.firstName+" "+this.props.user.lastName}
                <span className="close"><a className="btn btn-default" href="/accounts/logout/">Logout</a></span></h1>
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active"><a href="#users" aria-controls="home" role="tab" data-toggle="tab">All Users</a></li>
                    <li role="presentation"><a href="#map" aria-controls="profile" role="tab" data-toggle="tab">Sensor Map</a></li>
                    <li role="presentation"><a href="#job" aria-controls="messages" role="tab" data-toggle="tab">Add Job</a></li>
                  </ul>
                  <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="users">
                    <br/><br/>
                    {userlist}
                    </div>

                    <div role="tabpanel" className="tab-pane" id="map">Sensor Map</div>
                    <div role="tabpanel" className="tab-pane" id="job">Add Job</div>
                  </div>
            </div>);
    }
});

const mapStateToProps = (state) => {
    console.log(state);
    return {
        user: state.getCurrentUser,
        allUsers: state.operatorData.users,
    };
};

//in this method, call the action method
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentUser:() => {
            dispatch(fetchCurrentUser());
        },
        fetchAllUsers:() => {
            dispatch(fetchAllUsers());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlCenter)