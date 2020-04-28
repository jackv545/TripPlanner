import React, { Component } from 'react';
import { MenuItem, Button, Menu, Tooltip } from '@material-ui/core';

let dataSets = {
    coloradoCities: 'Colorado Cities',
    coloradoBrews: 'Colorado Breweries',
    usAirports: 'US Airports'
}

export function setPlaces(dataSet) {
    let coloradoCities = require('../../data/simple.json');
    let coloradoBrews = require('../../data/coloradoBrews.json');
    let usAirports = require('../../data/100airports.json');
    let file;

    switch(dataSet) {
        case 'coloradoCities': file = coloradoCities['places']
            break;
        case 'coloradoBrews': file = coloradoBrews['places']
            break;
        case 'usAirports': file = usAirports['places']
            break;
        default: file = coloradoCities['places']
    }

    this.setState({
        optimization: 'none',
        places: file,
        savePlaces: file
    }, () => {
        this.sendServerRequest('trip', this.createTripRequest(), this.setTripState)
    });
}

export default class LoadData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            dataSet: ''
        };
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = (value) => {
        this.props.setPlaces(value);
        this.setState({dataSet: value});
        this.handleClose();
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        return(
            <>
            <Tooltip title="Select an example trip" aria-label="select an example trip">
                <Button style={{ 'marginLeft': 1 }} variant='outlined' onClick={this.handleClick}>
                        Data
                </Button>
            </Tooltip>
            <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
            >
                {Object.keys(dataSets).map((value, i) => (
                    <MenuItem
                        key={i}
                        value={value}
                        selected={value === this.state.dataSet}
                        onClick={() => this.handleMenuItemClick(value)}
                    >
                        {dataSets[value]}
                    </MenuItem>
                ))}
            </Menu>
            </>
        );
    }
}
