var Sample = React.createClass ({

    render() {
    	if(this.props.user == undefined){
            return(<div>Loading</div>)
        } else {
        	var task_list = [];
        	if(this.props.user.tasks != undefined){
				for(var ii = 0; ii<this.props.user.tasks.length; ii++){
					task_list.push(<li key={ii}>
						{this.props.user.tasks[ii].name+" "+this.props.user.tasks[ii].date}
					</li>)
				}
	        }
	        return (
	        <div className="col-md-6">
				<div className="panel panel-default">
				  <div className="panel-heading">
				    <h3 className="panel-title">{this.props.user.firstName+" "+this.props.user.lastName} Tasks</h3>
				  </div>
				  <div className="panel-body">
					  	<ul>
						{task_list}
					  	</ul>
				  </div>
				</div>
			</div>
	        );
	    }
            }
});

export default Sample
/*
var root = document.getElementById('sample');
if(root != null && root != undefined){
	console.log("found");
    ReactDOM.render(<Sample name="Sam"/>,root);
}*/