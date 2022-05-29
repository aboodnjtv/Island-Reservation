import React, { Component } from "react";
import {GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./CurrentLocation";

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };


  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (

      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
          <Marker onClick={this.onMarkerClick} name={"Current Location"} />
          <Marker
            position={{ lat: 22.0964, lng: -159.5261 }}
            onClick={this.onMarkerClick}
            name={
              "Kauai, Rating = 1.48" +
              "\n" +
              "Details: Beautiful Island with great tropic scenery"
            }
          />
          <Marker
            position={{ lat: 21.4389, lng: -158.0001 }}
            onClick={this.onMarkerClick}
            ame={"O'ahu, Rating = 2.19"}
          />
          <Marker
            position={{ lat: 13.338761, lng: -81.37294 }}
            onClick={this.onMarkerClick}
            name={"Providence Cialis Island, Rating = 1.48"}
          />
          <Marker
            position={{ lat: 20.7984, lng: -156.3319 }}
            onClick={this.onMarkerClick}
            name={"Maui, Hawaii = 4.53"}
          />
          <Marker
            position={{ lat: 36.3932, lng: 25.4615 }}
            onClick={this.onMarkerClick}
            name={"Santorini, Greece, Rating = 3.92"}
          />
          <Marker
            position={{ lat: 32.7607, lng: -16.9595 }}
            onClick={this.onMarkerClick}
            name={"Madeira, Portugal, Rating = 1.86"}
          />
          <Marker
            position={{ lat: -17.5263888889, lng: -149.8180555556 }}
            onClick={this.onMarkerClick}
            name={"Moorea-Maiao, Rating = 4.55"}
          />
          <Marker
            position={{ lat: -16.499701, lng: -151.770538 }}
            onClick={this.onMarkerClick}
            name={"Bora Bora, Rating = 3.53"}
          />
          <Marker
            position={{ lat: -0.777259, lng: -91.142578 }}
            onClick={this.onMarkerClick}
            name={"Galapagos Islands, Rating = 4"}
          />
          <Marker
            position={{ lat: 9.740696, lng: 118.730072 }}
            onClick={this.onMarkerClick}
            name={"Palawan, Rating = 3.5"}
          />
          <Marker
            position={{ lat: 39.710358, lng: 2.995148 }}
            onClick={this.onMarkerClick}
            name={"Majorca, Rating = 2.57"}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
          </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBSwfjL3VFjn1vAE2t0wfRi4Y8b5S1aYy0",
})(MapContainer);
