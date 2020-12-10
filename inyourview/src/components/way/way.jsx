import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./way.module.css";

class Way extends Component {
  render() {
    return (
      <section className={styles.way}>
        <Header />
        <div className={styles.hello}>
          <Map
            google={this.props.google}
            zoom={17}
            initialCenter={{
              lat: "037.595800542221255",
              lng: "127.13749995175745",
            }}
          >
            <Marker
              position={{
                lat: "037.595800542221255",
                lng: "127.13749995175745",
              }}
            />
          </Map>
          <Footer />
        </div>
      </section>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB0Psee7H4aoCqnZZVE1MRRBnG3jdgOZ9s",
})(Way);
