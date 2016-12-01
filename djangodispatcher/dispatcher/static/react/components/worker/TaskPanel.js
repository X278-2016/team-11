var TaskPanel = React.createClass ({
	completeTask: function(evt) {
            var data = {
                taskId: this.props.tasks[evt.target.id].taskId,
            };
            this.props.completeTask(data);
    },
    render: function() {
		var task_list = [];
		var header = [];
		if(this.props.tasks != undefined){
			if(this.props.type=="Active"){
			if(this.props.tasks.length>0){
				header.push(<tr key={1}>
					<th>Task</th>
					<th>Sensor</th>
					<th>Start Date</th>
					<th>Complete</th>
				</tr>);
				}
				for(var ii = 0; ii<this.props.tasks.length; ii++){
					var myDate = new Date(this.props.tasks[ii].date);
					task_list.push(<tr key={ii} className="text-center">
									<td>{this.props.tasks[ii].name}</td>
									<td>{this.props.tasks[ii].sensor}</td>
									<td>{myDate.toLocaleString()}</td>
									<td><button className="btn btn-success btn-xs" onClick={this.completeTask} id={ii}>Complete</button></td>
									</tr>)
				}
			} else {
				if(this.props.tasks.length>0){
					header.push(<tr key={1}>
					<th>Task</th>
					<th>Sensor</th>
					<th>End Date</th>
					<th>Hours Open</th>
					</tr>)
				}
				for(var ii = 0; ii<this.props.tasks.length; ii++){
					var myDate = new Date(this.props.tasks[ii].dateCompleted);
					task_list.push(<tr key={ii} className="text-center">
					<td>{this.props.tasks[ii].name}</td>
					<td>{this.props.tasks[ii].sensor}</td>
					<td>{myDate.toLocaleString()}</td>
					<td>{this.props.tasks[ii].hoursOpen}</td>
					</tr>)
				}
			}
		}
		if(task_list.length == 0){
			task_list.push(<tr key={1} className="text-center">No {this.props.type} Tasks</tr>)
		}
		return (
			<div className="panel panel-default">
			  <div className="panel-body">
				<h3 className="panel-title text-center">{this.props.type} Tasks</h3>
			  </div>
			  <table className="table table-bordered">
			  <thead>
			  {header}
			  </thead>
			  		<tbody>
					   {task_list}
					   </tbody>
				</table>
			</div>
		);
	    }
});

export default TaskPanel
/*
var root = document.getElementById('sample');
if(root != null && root != undefined){
    ReactDOM.render(<Sample name="Sam"/>,root);
}*/