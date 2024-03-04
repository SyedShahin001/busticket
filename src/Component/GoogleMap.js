import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends React.Component {
  render() {
    const { google, source, destination } = this.props;

    return (
      <Map
        google={google}
        zoom={14}
        initialCenter={{ lat: (source.lat + destination.lat) / 2, lng: (source.lng + destination.lng) / 2 }}
      >
        {source && (
          <Marker
            title={source.name}
            name="Source"
            position={{ lat: source.lat, lng: source.lng }}
          />
        )}
        {destination && (
          <Marker
            title={destination.name}
            name="Destination"
            position={{ lat: destination.lat, lng: destination.lng }}
          />
        )}
      </Map>
    );
  }
}

class App extends React.Component {
  render() {
    const sourceLocation = { name: "Source Name", lat: 37.7749, lng: -122.4194 }; // Example source location with name
    const destinationLocation = { name: "Destination Name", lat: 34.0522, lng: -118.2437 }; // Example destination location with name

    return (
      <div>
        <h1>Map Example</h1>
        <MapContainer
          source={sourceLocation}
          destination={destinationLocation}
          google={this.props.google}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBuFMMnTb8W1sBr1FmpB8JeB36p_5JDh9o" // Replace with your Google Maps API key
})(App);
