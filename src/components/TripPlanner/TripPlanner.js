import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Grid, AppBar, Toolbar, Tooltip, IconButton } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import LeafletMap from './LeafletMap';
import Itinerary, { addPlace, deletePlace, editPlace } from './Itinerary';
import LoadData, { setPlaces } from './LoadData';
import MapControls, { toggleMapOptions } from './MapControls';
import Optimization, { changeOptimization } from './Optimization';
import { createTripRequest, setTripState, sendServerRequest } from '../../api/restfulAPI';
import LatLngError, { toggleError } from './LatLngError';
import Footer from './Footer';
import Loading from './Loading';

export default class TripPlanner extends Component {
    constructor(props) {
        super(props);

        this.setPlaces = setPlaces.bind(this);
        this.addPlace = addPlace.bind(this);
        this.deletePlace = deletePlace.bind(this);
        this.editPlace = editPlace.bind(this);
        this.toggleError = toggleError.bind(this);
        this.changeOptimization = changeOptimization.bind(this);
        this.toggleMapOptions = toggleMapOptions.bind(this);

        //API function binds
        this.createTripRequest = createTripRequest.bind(this);
        this.setTripState = setTripState.bind(this);
        this.sendServerRequest = sendServerRequest.bind(this);

        this.state = {
            places: [], savePlaces: [],
            distances: [],
            optimization: 'none',
            latlngError: false,
            mapOptions: {
                showRoute: true, showMarkers: false
            },
            loadingTrip: false
        };
    }

    componentDidMount() {
        document.title = 'Trip Planner'
    }

    render() {
        return (
            <>
                <AppBar position="static" color="inherit">
                    <Toolbar>
                        <Grid container justify="space-between" alignItems="baseline">
                            <Grid item>
                                <Tooltip title="Home" aria-label="home">
                                    <Link to="/">
                                        <IconButton><Home/></IconButton>
                                    </Link>
                                </Tooltip>
                                <LoadData setPlaces={this.setPlaces}/>
                                <MapControls 
                                    mapOptions={this.state.mapOptions}
                                    toggleMapOptions={this.toggleMapOptions}
                                />
                                <Optimization 
                                    optimization={this.state.optimization}
                                    changeOptimization={this.changeOptimization}
                                />
                            </Grid>
                            <Grid item>
                                {this.props.darkModeButton()}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Grid container>
                    <Grid item xs={12}>
                        <LeafletMap 
                            places={this.state.places}
                            mapOptions={this.state.mapOptions}
                            prefersDarkMode={this.props.prefersDarkMode}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LatLngError
                            toggleError={this.toggleError} 
                            latlngError={this.state.latlngError}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.loadingTrip && <Loading/>}
                    </Grid>
                    <Grid item xs={12}>
                        <Itinerary 
                            places={this.state.places}
                            distances={this.state.distances}
                            addPlace={this.addPlace}
                            deletePlace={this.deletePlace}
                            editPlace={this.editPlace}
                            toggleError={this.toggleError}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Footer/>
                    </Grid>
                </Grid>
            </>
        );
    }
}
