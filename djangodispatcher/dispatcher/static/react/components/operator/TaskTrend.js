var TaskTrend = React.createClass ({
    render: function() {
		return(<div className="panel panel-default text-center">
				  <div className="panel-body">
				  	<h3>{this.props.number}</h3>
					<h3>{this.props.title}</h3>
				  </div>
				</div>)
    }
});

export default TaskTrend