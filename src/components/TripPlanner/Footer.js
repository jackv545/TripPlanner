import React, { Component } from 'react';

import { Paper, Grid, Typography, Link } from '@material-ui/core';

function link(href, text, paddingTop = 0) {
    return(
        <Typography style={{'paddingTop': paddingTop}}>
            <Link 
                color="inherit" variant="body2" 
                href={href}
            >
                {text}
            </Link>
        </Typography>
    );
}
export default class LatLngError extends Component {
    render() {
        return(
            <Paper elevation={0} square={true}>
                <Grid 
                    container alignItems="flex-start" spacing={2}
                    style={{'paddingTop': 40, 'paddingBottom': 20}}
                >
                    <Grid item xs={6} sm={3} align="center">
                        <Typography style={{'fontWeight': '500'}}>Frameworks</Typography>
                        {link("https://reactjs.org/", "ReactJS", 5)}
                        {link("http://sparkjava.com/", "Spark Java")}
                    </Grid>
                    <Grid item xs={6} sm={3} align="center">
                        <Typography style={{'fontWeight': '500'}}>Dependencies</Typography>
                        {link("https://material-ui.com/", "Material-UI", 5)}
                        {link("https://react-leaflet.js.org/", "React-Leaflet")}
                        {link("https://www.npmjs.com/package/coordinate-parser", "Coordinate-Parser")}
                    </Grid>
                    <Grid item xs={6} sm={3} align="center">
                        <Typography style={{'fontWeight': '500'}}>Mapping</Typography>
                        {link("https://www.openstreetmap.org/", "OpenStreetMap", 5)}
                        {link("https://www.thunderforest.com/", "Thunderforest")}
                    </Grid>
                    <Grid item xs={6} sm={3} align="center">
                        <Typography style={{'fontWeight': '500'}}>Hosting</Typography>
                        {link("https://www.netlify.com/", "Netlify (front-end)", 5)}
                        {link("https://www.heroku.com/", "Heroku (api)")}
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}