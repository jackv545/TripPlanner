import React, { Component } from 'react';
import MaterialTable from 'material-table';
import Coordinates from 'coordinate-parser';

function coordinatesAreValid(coord) {
    //Make sure coord converter correctly worked, if keys don't exist conversion failed
    if (!("latitude" in coord && "longitude" in coord)) {
        return false;
    }
    //Make sure coords are within range of the earth
    if (coord["latitude"] < -90 || coord["latitude"] > 90) {
        return false
    }
    if (coord["longitude"] < -180 || coord["longitude"] > 180) {
        return false
    }
    return true;
}

function convertCoordinates(coord, isString = false) {
    try {
        let convertedCoord;
        if(isString) {
            convertedCoord = new Coordinates(coord);
            return ({
                'latitude': convertedCoord.getLatitude().toFixed(3),
                'longitude': convertedCoord.getLongitude().toFixed(3)
            })
        } else {
            let combinedCoords = coord.latitude + " " + coord.longitude;
            convertedCoord = new Coordinates(combinedCoords);
            coord.latitude = convertedCoord.getLatitude().toFixed(3);
            coord.longitude = convertedCoord.getLongitude().toFixed(3);
            return coord;
        }
    } catch (Exception) {
        return ({});
    }
}

export function addPlace(place) {
    this.setState({
        places: [...this.state.places, place],
        savePlaces: [...this.state.savePlaces, place],
        optimization: 'none'
    }, () => {
        this.sendServerRequest('trips', this.createTripRequest(), this.setTripState);
    });
}

export function deletePlace(place) {
    let oldPlaces = [...this.state.places];
    let index = oldPlaces.findIndex(i => i.name === place.name);
    oldPlaces.splice(index, 1);
    this.setState({
        places: oldPlaces,
        savePlaces: oldPlaces
    }, () => {
        this.sendServerRequest('trips', this.createTripRequest(), this.setTripState);
    });
}

export function editPlace(oldPlace, newPlace) {
    let oldPlaces = [...this.state.places];
    let index = oldPlaces.findIndex(i => i.name === oldPlace.name);
    oldPlaces[index] = newPlace;
    this.setState({
        places: oldPlaces,
        savePlaces: oldPlaces
    }, () => {
        this.sendServerRequest('trips', this.createTripRequest(), this.setTripState);
    });
}

function createTableData(places, distances) {
    let cumulativeDistance = 0;

    for (let i = 0; i < places.length; i++) {
        cumulativeDistance += distances[i];
        if(!isNaN(distances[i])) {
            places[i].distance = 
                `${commasInNumber(distances[i])} (${commasInNumber(cumulativeDistance)})`;
        }
        
        places[i].latitude = parseFloat(places[i].latitude).toFixed(2);
        places[i].longitude = parseFloat(places[i].longitude).toFixed(2);
    }
    return places;
}

function commasInNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export default class Itinerary extends Component {
    render() {
        let placesClone = JSON.parse(JSON.stringify(this.props.places));
        let distancesClone = JSON.parse(JSON.stringify(this.props.distances));
        let tableData = createTableData(placesClone, this.props.distances);
        let totalDistance = 
            commasInNumber(distancesClone.reduce(function(a, b){ return a + b; }, 0));

        return(
            <MaterialTable
                style={{padding: 5, 'borderRadius': 0, 'boxShadow': '0px 0px'}}
                columns={[
                    { title: "Place", field: "name", sorting: false },
                    { title: "Latitude", field: "latitude", sorting: false },
                    { title: "Longitude", field: "longitude", sorting: false },
                    { title: "Distance (mi)", field: "distance", editable: 'never', 
                        searchable: false, sorting: false }
                ]}
                data={tableData}
                title={<span>{`Total distance: ${totalDistance} miles`}</span>}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            if(!coordinatesAreValid(convertCoordinates(newData, false))) {
                                this.props.toggleError();
                            } else {
                                this.props.addPlace(newData);
                            }
                            resolve();
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            if(!coordinatesAreValid(convertCoordinates(newData, false))) {
                                this.props.toggleError();
                            } else if (oldData) {
                                this.props.editPlace(oldData, newData);
                            }
                            resolve();
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            this.props.deletePlace(oldData);
                            resolve();
                        })
                }}
                localization={{
                    body: {
                        emptyDataSourceMessage: 'Add a location or select an example trip from the "Data" menu.'
                    }
                }}
            />
        );
    }
}
