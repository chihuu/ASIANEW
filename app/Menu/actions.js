import {Actions} from 'react-native-router-flux';
import Authorization from '../common/Authorization';
import { REQUEST_MENU_URL } from '../private/constants';

function itemsHasErrored(bool) {
    return {
        type: 'FETCHING_DATA_MENU_FAILURE',
        errorMenu: bool
    };
}
function itemsIsLoading(bool) {
    return {
        type: 'FETCHING_DATA_MENU',
        isFetchingMenu: bool
    };
}
function itemsFetchDataSuccess(items) {
    return {
        type: 'FETCHING_DATA_MENU_SUCCESS',
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

export function itemsFetchDataMenu(url) {
    let authorization = JSON.parse(Authorization.generate());

    return (dispatch) => {
        fetch(REQUEST_MENU_URL, {
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
