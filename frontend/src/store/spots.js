import { csrfFetch } from './csrf';

const GETALLSPOTS = 'spots/GETALL';
const GETONESPOT = 'spots/GETONE'
const GETTOPSPOTS = 'spots/GETTOP'

const load = array => ({
    type: GETALLSPOTS,
    payload: array
});

const loadOne = spot => ({
    type: GETONESPOT,
    payload: spot
});

const loadTop = spots => ({
    type: GETTOPSPOTS,
    payload: spots
});

export const getTopSpots = () => async dispatch => {
    const res = await csrfFetch(`/api/spots/top`);
  
    if (res.ok) {
        const list = await res.json();
        dispatch(loadTop(list.topSpots));
    }
};

export const getSpots = () => async dispatch => {
    const res = await csrfFetch(`/api/spots`);
  
    if (res.ok) {
        const list = await res.json();
        dispatch(load(list.spots));
    }
};

export const getSingleSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const response = await res.json();
        dispatch(loadOne(response.spot))
    }
}

const initialState = { list: null, topSpots: null, currentCastle: null };

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GETALLSPOTS:
        newState = Object.assign({}, state);
        newState.list = action.payload;
        return newState;
    case GETONESPOT:
        newState = Object.assign({}, state);
        newState.currentCastle = action.payload;
        return newState;
    case GETTOPSPOTS:
        newState = Object.assign({}, state);
        newState.topSpots = action.payload;
        return newState;
    default:
      return state;
  }
};

export default spotsReducer;