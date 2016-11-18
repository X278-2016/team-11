var Map = React.createClass( {
    getInitialState: function() {
       return {sensorMarkers: []}
    },
  componentDidMount: function() {
    var nashville = {lat: 36.1627, lng: -86.7816};
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 9,
      center: nashville
    });
  },
  componentWillReceiveProps: function(newProps){
    this.removeAllMarkers();
    if(newProps.sensors!=undefined){
        for(var i=0;i<newProps.sensors.length;i++){
            var sensor = {lat: parseFloat(newProps.sensors[i].lat), lng: parseFloat(newProps.sensors[i].long)};
            var marker = new google.maps.Marker({
              position: sensor,
              map: this.map,
              label: newProps.sensors[i].sensor
            });
            this.state.sensorMarkers.push(marker)
        }
    }
  },
  removeAllMarkers: function(){
    for (var i = 0; i < this.state.sensorMarkers.length; i++) {
          this.state.sensorMarkers[i].setMap(null);
        }
  },
  render: function() {
    const mapStyle = {
      width: '84%',
      height: 400,
      border: '1px solid black'
    };

    return (
      <div className="text-center">
        <div ref="map" style={mapStyle} className="col-md-offset-1">I should be a map!</div>
      </div>
    );
  }
});

export default Map