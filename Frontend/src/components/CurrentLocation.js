import React from "react";
import ReactDOM from "react-dom";

// Styling for the map
const mapStyles = {
  map: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "calc(100vh - 86px)",
  },
};

// Component for the map with current location
export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng,
      },
    };
  }

  // Reload map if current location changes
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  // Helper function that recenters map if current location changes
  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;
    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  // Whenever component mounts, get location and update state
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
          });
        });
      }
    }
    this.loadMap();
  }

  // Helper function that loads the map
  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;
      
      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);

      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
          streetViewControl: false,
          fullscreenControl: false,
        }
      );

      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }

  // Function that obly renders map if props are defined
  renderChildren() {
    const { children } = this.props;
    if (!children) return;
    return React.Children.map(children, (c) => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation,
      });
    });
  }

  // Render the map with current location
  render() {
    const style = Object.assign({}, mapStyles.map);
    return (
      <div id="map_canvas" style={{width: '100%', height: '100%'}}>
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}

// Define default props, set initial center to Santa Cruz
CurrentLocation.defaultProps = {
  zoom: 3,
  initialCenter: {
    lat: 36.9990,
    lng: -109.0452,
  },
  centerAroundCurrentLocation: true,
  visible: true,
};

export default CurrentLocation;
