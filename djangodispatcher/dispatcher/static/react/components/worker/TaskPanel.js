var TaskPanel = React.createClass ({
	completeTask: function(evt) {
            var data = {
                taskId: this.props.tasks[evt.target.id].taskId,
            };
            this.props.completeTask(data);
    },
    render: function() {
    	if(this.props.tasks == undefined){
            return(<div>Loading</div>)
        } else {
        	var task_list = [];
        	if(this.props.tasks != undefined){
        		if(this.props.type=="Active"){
        			for(var ii = 0; ii<this.props.tasks.length; ii++){
						task_list.push(<div className="list-group-item" key={ii}>
							<button className="btn btn-success" onClick={this.completeTask} id={ii}>complete</button>
							{this.props.tasks[ii].name+" "+this.props.tasks[ii].date}
						</div>)
					}
        		} else {
        			for(var ii = 0; ii<this.props.tasks.length; ii++){
						task_list.push(<div className="list-group-item" key={ii}>
							{this.props.tasks[ii].name+" "+this.props.tasks[ii].date}
						</div>)
					}
        		}
	        }
	        return (
				<div className="panel panel-default">
				  <div className="panel-heading">
				    <h3 className="panel-title">{this.props.type} Tasks</h3>
				  </div>
				  <div className="panel-body">
				  		<div class="list-group">
						   {task_list}
						</div>
				  </div>
				</div>
	        );
	    }
            }
});

export default TaskPanel
/*
var root = document.getElementById('sample');
if(root != null && root != undefined){
	console.log("found");
    ReactDOM.render(<Sample name="Sam"/>,root);
}*/