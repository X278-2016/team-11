var Sample = React.createClass ({

    render() {
    	if(this.props.user == undefined){
            return(<div>Loading</div>)
        } else {
            //var commit_list = [];
	        /*for(var ii = 0; ii<this.props.commitData.length; ii++){
	            commit_list.push(<li key={ii}>
	                {this.props.commitData[ii].commit.message}
	            </li>)
	        }*/
	        return (
	        <div className="col-md-6">
				<div className="panel panel-default">
				  <div className="panel-heading">
				    <h3 className="panel-title">User Name</h3>
				  </div>
				  <div className="panel-body">
					  	{this.props.user.firstName+" "+this.props.user.lastName}
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