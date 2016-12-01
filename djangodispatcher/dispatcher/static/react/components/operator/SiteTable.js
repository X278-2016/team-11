var SiteTable = React.createClass ({

    render: function() {
		var header = [];
		var site_list = [];
		if(this.props.sites != undefined){
			for(var ii=0;ii<this.props.sites.titles.length;ii++){
				header.push(<th>{this.props.sites.titles[ii]}</th>);
			}
			for(var ii=0;ii<this.props.sites.data.length;ii++){
				var sub_list = [];
				for(var jj=0;jj<this.props.sites.data[ii].length;jj++){
					sub_list.push(<td>{this.props.sites.data[ii][jj]}</td>);
				}
				site_list.push(<tr className="text-center">{sub_list}</tr>)
			}
		}
		return (
			<div className="panel panel-default">
			  <div className="panel-body">
				<h3 className="panel-title text-center">Sensor Job Data</h3>
			  </div>
			  <table className="table table-bordered">
			  <thead>
			  <tr>{header}</tr>
			  </thead>
			  		<tbody>{site_list}</tbody>
				</table>
			</div>
		);
	    }
});

export default SiteTable