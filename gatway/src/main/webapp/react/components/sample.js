var Sample = React.createClass ({
    render() {
        return (
          <div className="shopping-list">
            <h1>Shopping List for {this.props.name}</h1>
            <ul>
              <li>Instagram</li>
              <li>WhatsApp</li>
              <li>Oculus</li>
            </ul>
          </div>
        );
            }
});

var root = document.getElementById('sample');
if(root != null && root != undefined){
	console.log("found");
    ReactDOM.render(<Sample name="Sam"/>,root);
}