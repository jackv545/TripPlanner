import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { Map, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import L from 'leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

//returns an array of L.latlng objects representing the places statevar
function createLines(places) {
    let tripLines = [];
    for (let i = 0; i < places.length; i++) {
        let latitude = places[i].latitude;
        let longitude = places[i].longitude;
        tripLines.push([latitude, longitude]);
    }

    return tripLines;
}

//returns a Leaflet polyline component
function createTripRoute(places, showRoute, prefersDarkMode) {
    let tripLines = [];

    if(showRoute) {
        tripLines = createLines(places);

        if(places.length > 2){
            tripLines.push([places[0].latitude, places[0].longitude]);
        }
    }
    return (<Polyline color={prefersDarkMode ? '#e0e0e0' : '#3f51b5'} positions={tripLines}/>);
}

function createIcon(prefersDarkMode) {
    return (
        new L.Icon({
            iconUrl: require(`../../images/map-marker-${prefersDarkMode ? 'yellow' : 'red'}.png`),
            iconAnchor: [18, 34],
            popupAnchor: [0, -32],
            shadowUrl: null
        })
    );
}

function createTripMarkers(places, showMarkers, prefersDarkMode) {
    let lines = createLines(places, places.length);
    
    return lines.map((coordinate, i) => (
        showMarkers && 
        <Marker key={i} icon={createIcon(prefersDarkMode)} position={coordinate}>
            <Popup>
                {places[i].name}
            </Popup>
        </Marker>
    ));
}

function createMarkerCluster(places, showMarkers, prefersDarkMode, createClusterFunction) {
    return(
        <MarkerClusterGroup 
            iconCreateFunction={createClusterFunction}
            polygonOptions={{weight: 4, color:  '#7986cb', fill: true, fillOpacity: 0.5}}
        >
            {createTripMarkers(places, showMarkers, prefersDarkMode)}
        </MarkerClusterGroup>
    );
}

/* Given the places statevar and a cardinal direction in all lowercase,
 * returns the furthest latitude or longitude in the corresponding direction
 *
 * Used for setting map boundaries around the trip
 */

function greatest(places, direction) {
    let latitudes = places.map(a => parseFloat(a.latitude));
    let longitudes = places.map(a => parseFloat(a.longitude));

    switch (direction) {
        case "north":
            let latitude = Math.max(...latitudes);

            //add more space to view marker
            if (latitude < 89.9) {
                latitude += 0.1;
            }
            return latitude;
        case "south":
            return Math.min(...latitudes);
        case "east":
            return Math.max(...longitudes);
        case "west":
            return Math.min(...longitudes);
        default:
            return -90;
    }
}

function mapBoundaries(places) {
    let numPlaces = Object.keys(places).length;

    if (numPlaces <= 1) {
        // Fort Collins
        return [
            [40.62, -105.05],
            [40.5, -105.03]
        ];
    } else {
        let bound1 = [
            greatest(places, "north"),
            greatest(places, "west")
        ];
        let bound2 = [
            greatest(places, "south"),
            greatest(places, "east")
        ];
        return [bound1, bound2];
    }
}

function tileLayer(prefersDarkMode) {
    let apiKey = 'ef139e34362944cea36485ebc2293d9b';
    if(prefersDarkMode) {
        return(
            <TileLayer
                url = {`https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=${apiKey}`}
            />
        );
    } else {
        return(
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        );
    }
}

export default class LeafletMap extends Component {
    createCluster = cluster => {
        return L.divIcon({
            html: `<span>${cluster.getChildCount()}</span>`,
            className: `marker-cluster ${this.props.prefersDarkMode ? 'dark' : 'light'}`,
            iconSize: L.point(40, 40, true),
        });
    }

    render() {
        return(
            <Map
                attributionControl={false}
                bounds={mapBoundaries(this.props.places)}
                style={{ height: 500, maxwidth: 700 }}
            >
                {tileLayer(this.props.prefersDarkMode)}
                {createTripRoute(
                    this.props.places, this.props.mapOptions.showRoute, this.props.prefersDarkMode)}
                {this.props.mapOptions.showClusters 
                    ? createMarkerCluster(
                        this.props.places, this.props.mapOptions.showMarkers, 
                        this.props.prefersDarkMode, this.createCluster)
                    : createTripMarkers(this.props.places, this.props.mapOptions.showMarkers, 
                        this.props.prefersDarkMode)
                }
            </Map>
        );
    }
}
