import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class Mapping extends Component {
  constructor(props) {
    super(props);
    this.state = { matches: window.matchMedia("(min-width: 27.5rem)").matches };
  }

  componentDidMount() {
    const handler = (e) => this.setState({ matches: e.matches });
    window.matchMedia("(min-width: 27.5rem)").addListener(handler);
  }

  render() {
    const mapStyles = {
      width: "50%",
      height: "100%",
    };
    const smallMapStyles = {
      width: "100%",
      height: "100%",
    };
    return (
      <div>
        {this.state.matches && (
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
        )}
        {!this.state.matches && (
          <Map
            google={this.props.google}
            zoom={15}
            style={smallMapStyles}
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
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB0Psee7H4aoCqnZZVE1MRRBnG3jdgOZ9s",
})(Mapping);
// export default GoogleApiWrapper({
//   apiKey: process.env.GOOGLE_API_KEY,
// })(Mapping);
