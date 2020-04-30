export function sendServerRequestWithBody(requestType, requestBody) {
    const restfulAPI = `https://secret-forest-91548.herokuapp.com/api/${requestType}`;
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(requestBody)
    };

    return processRestfulAPI(restfulAPI, requestOptions);
}

async function processRestfulAPI(restfulAPI, requestOptions) {
    try {
        let response = await fetch(restfulAPI, requestOptions);
        return {
            statusCode: response.status,
            statusText: response.statusText,
            body: await response.json()
        };
    }
    catch(err) {
        console.error(err);
        return { statusCode: 0, statusText: 'Client failure', body: null };
    }
}

export function createTripRequest() {
    return {
        'options': {
            'optimization': this.state.optimization
        },
        'places': this.state.places
    };
}

export function setTripState(response) {
    this.setState({
        places: response.body.places,
        distances: response.body.distances,
        loadingTrip: false
    })
}

export function sendServerRequest(type, request, setStateFunction) {
    this.setState({loadingTrip: true}, () => {
        sendServerRequestWithBody(type, request).then((response => {
            if (response.statusCode >= 200 && response.statusCode <= 299) {
                setStateFunction(response);
            } else {
                console.error("Response code: ", response.statusCode, response.statusText);
            }
        }));
    });
}
