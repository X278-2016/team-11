var UserPanel = React.createClass ({
    render: function() {
    	var tasks = [];
    	for(var ii=0;ii<this.props.user.activeTasks.length;ii++){
    		var myDate = new Date(this.props.user.activeTasks[ii].date);
    		tasks.push(<li className="list-group-item" key={ii}>{this.props.user.activeTasks[ii].name} at Sensor {this.props.user.activeTasks[ii].sensor}<br/>
    		Requested at: {myDate.toLocaleString()}</li>);
    	}
    	if(tasks.length == 0)
    		tasks.push(<li className="list-group-item" key="0">No Active Tasks!</li>);
		return(<div className="panel panel-default text-center">
				  <div className="panel-body">
					<h3>{this.props.user.firstName} {this.props.user.lastName}</h3>
					<h5>{this.props.user.profession}</h5>
				  </div>
				  <ul className="list-group">
 					{tasks}
  				</ul>
				</div>)
    }
});

export default UserPanel