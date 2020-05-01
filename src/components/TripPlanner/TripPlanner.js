import React, { Component } from 'react';
import { Grid, AppBar, Toolbar, IconButton, Hidden, Collapse, Box } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import LeafletMap from './LeafletMap';
import Itinerary, { addPlace, deletePlace, editPlace } from './Itinerary';
import LoadData, { setPlaces } from './LoadData';
import MapControls, { toggleMapOptions } from './MapControls';
import Optimization, { changeOptimization } from './Optimization';
import { createTripRequest, setTripState, sendServerRequest } from '../../api/restfulAPI';
import LatLngError, { toggleError } from './LatLngError';
import Footer from './Footer';
import Loading from './Loading';
import { withStyles } from '@material-ui/core/styles';

const useStyles = () => ({
    root: {

    },
    mobile: {
        paddingLeft: 5,
        paddingBottom: 10
    }
});

export class TripPlanner extends Component {
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

        this.toggleCollapse = this.toggleCollapse.bind(this);

        this.state = {
            places: [], savePlaces: [],
            distances: [],
            optimization: 'none',
            latlngError: false,
            mapOptions: {
                showRoute: true, showMarkers: false
            },
            loadingTrip: false,
            collapseOpen: false
        };
    }

    componentDidMount() {
        document.title = 'Trip Planner'
    }

    toggleCollapse() {
        this.setState(prevState => ({
            collapseOpen: !prevState.collapseOpen
        }));
    }

    menu(mobileDisplay = false) {
        const { classes } = this.props;

        return(
            <Box className={mobileDisplay ? classes.mobile : classes.root}>
                <LoadData setPlaces={this.setPlaces}/>
                <MapControls 
                    mapOptions={this.state.mapOptions}
                    toggleMapOptions={this.toggleMapOptions}
                />
                <Optimization 
                    optimization={this.state.optimization}
                    changeOptimization={this.changeOptimization}
                />
            </Box>
        );
    }

    appBar() {
        return(
            <>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Grid container justify="space-between" alignItems="baseline">
                        <Hidden xsDown>
                            <Grid item>
                                {this.menu()}
                            </Grid>
                        </Hidden>
                        <Hidden smUp>
                            <Grid item>
                                <IconButton onClick={this.toggleCollapse}><Menu/></IconButton>
                            </Grid>
                        </Hidden>
                        <Grid item>
                            {this.props.darkModeButton()}
                        </Grid>
                    </Grid>
                </Toolbar>
                <Hidden smUp>
                    <Collapse in={this.state.collapseOpen}>
                        {this.menu(true)}
                    </Collapse>
                </Hidden>
            </AppBar>
            </>
        );
    }

    render() {
        return (
            <>
                {this.appBar()}
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

export default withStyles(useStyles)(TripPlanner);
