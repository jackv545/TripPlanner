import React, { Component } from 'react';
import { LinearProgress } from '@material-ui/core';

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false
        }
    }

    componentDidMount() {
        setTimeout(function() { 
            this.setState({render: true}) 
        }.bind(this), 1000)
    }

    render() {
        return(
            this.state.render && <LinearProgress variant="indeterminate"/>
        );
    }
}
