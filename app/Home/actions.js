import {getHome} from '../reducers';
import {Actions} from 'react-native-router-flux';
import Authorization from '../common/Authorization';
import { REQUEST_HOME_URL } from '../private/constants';

function itemsHasErrored(bool) {
    return {
        type: 'FETCHING_DATA_FAILURE',
        error: bool
    };
}
function itemsIsLoading(bool) {
    return {
        type: 'FETCHING_DATA',
        isFetching: bool
    };
}
function itemsFetchDataSuccess(items) {
    return {
        type: 'FETCHING_DATA_SUCCESS',
        items
    };
}

function errorAfterFiveSeconds() {
    // We return a function instead of an action object
    return (dispatch) => {
        setTimeout(() => {
            // This function is able to dispatch other action creators
            dispatch(itemsHasErrored(true));
        }, 5000);
    };
}

export function itemsFetchData(url) {
    let authorization = JSON.parse(Authorization.generate());

    return (dispatch) => {
        fetch(REQUEST_HOME_URL, {
                                          method: 'GET',
                                          headers: {
                                            'DateTime': authorization.DateTime,
                                            'RequestToken': authorization.RequestToken
                                          }
                                    })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}