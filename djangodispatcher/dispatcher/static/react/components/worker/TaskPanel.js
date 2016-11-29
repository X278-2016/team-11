var TaskPanel = React.createClass ({
	completeTask: function(evt) {
            var data = {
                taskId: this.props.tasks[evt.target.id].taskId,
            };
            this.props.completeTask(data);
    },
    render: function() {
		var task_list = [];
		if(this.props.tasks != undefined){
			if(this.props.type=="Active"){
				for(var ii = 0; ii<this.props.tasks.length; ii++){
					var myDate = new Date(this.props.tasks[ii].date);
					task_list.push(<tr key={ii}>
									<td>{this.props.tasks[ii].name}</td>
									<td>{myDate.toLocaleString()}</td>
									<td className="text-right"><button className="btn btn-success" onClick={this.completeTask} id={ii}>Complete</button></td>
									</tr>)
				}
			} else {
				for(var ii = 0; ii<this.props.tasks.length; ii++){
					var myDate = new Date(this.props.tasks[ii].date);
					task_list.push(<tr key={ii}>
					<td>{this.props.tasks[ii].name}</td>
					<td>{myDate.toLocaleString()}</td>
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
					   {task_list}
				</table>
			</div>
		);
	    }
});

export default TaskPanel
/*
var root = document.getElementById('sample');
if(root != null && root != undefined){
	console.log("found");
    ReactDOM.render(<Sample name="Sam"/>,root);
}*/