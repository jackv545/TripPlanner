import React, { Component } from 'react';
import Navigation from './Navigation';
import TripPlannerCard from './TripPlannerCard';

export default class Portfolio extends Component {
    componentDidMount() {
        document.title = 'Jack Visser | Porfolio'
    }

    render() {
        return(
            <>
            <Navigation prefersDarkMode={this.props.prefersDarkMode}/>
            <TripPlannerCard/>
            </>
        );
    }
}