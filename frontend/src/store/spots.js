import { csrfFetch } from './csrf';

const GETALLSPOTS = 'spots/GETALL'

const load = array => ({
    type: GETALLSPOTS,
    payload: array
})

export const getSpots = () => async dispatch => {
    const res = await csrfFetch(`/api/spots`);
  
    if (res.ok) {
        const list = await res.json();
        dispatch(load(list.spots));
    }
};

const initialState = { list: null };

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GETALLSPOTS:
        newState = Object.assign({}, state);
        newState.list = action.payload;
        return newState;
    default:
      return state;
  }
};

export default spotsReducer;