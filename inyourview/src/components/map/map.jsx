import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class Mapping extends Component {
  render() {
    const mapStyles = {
      width: "50%",
      height: "100%",
    };
    return (
      <Map
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        initialCenter={{
          lat: "37.55889815180675",
          lng: "126.83050591366025",
        }}
      >
        <Marker
          position={{
            lat: "37.55889815180675",
            lng: "126.83050591366025",
          }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB0Psee7H4aoCqnZZVE1MRRBnG3jdgOZ9s",
})(Mapping);
