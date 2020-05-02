import React, { Component } from 'react';
import { MenuItem, Button, Menu, Tooltip } from '@material-ui/core';

export function changeOptimization(level) {
    if(['short', 'shorter'].includes(this.state.optimization)) {
        this.setState({
            places: this.state.savePlaces
        })
    }
    this.setState({
        optimization: level
    }, () => {
        if(Object.keys(this.state.places).length > 0) {
            this.sendServerRequest('trip', this.createTripRequest(), this.setTripState);
        }
    });
}

let optimizationLevels = {
    none: 'None',
    short: 'Nearest Neighbor',
    shorter: '2-opt'
}

export default class LoadData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null
        };
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = (value) => {
        this.props.changeOptimization(value);
        this.handleClose();
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        return(
            <>
            <Tooltip 
                title="Select an algorithm to find shortest trip"
                aria-label="select an algorithm to find shortest trip"
            >
                <Button style={{ 'marginLeft': 1 }} variant='outlined' onClick={this.handleClick}>
                        Optimization
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
                {Object.keys(optimizationLevels).map((value, i) => (
                    <MenuItem
                        key={i}
                        value={value}
                        selected={value === this.props.optimization}
                        onClick={() => this.handleMenuItemClick(value)}
                    >
                        {optimizationLevels[value]}
                    </MenuItem>
                ))}
            </Menu>
            </>
        );
    }

}
