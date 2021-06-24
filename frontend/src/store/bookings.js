import { csrfFetch } from './csrf';

const BOOK = 'spots/BOOK'
const ERROR = 'spots/ERROR'

const book = bookings => ({
    type: BOOK,
    payload: bookings
})

const error = error => ({
    type: ERROR,
    payload: error
})

// window.store.dispatch(window.spotsActions.getUserBookings(1));

export const getUserBookings = userId => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/bookings`);

    if (res.ok) {
        const data = await res.json();
        dispatch(book(data.bookings))
    }
}

// window.store.dispatch(window.spotsActions.createBooking({
//     spotId: 1, 
//     userId: 1, 
//     start: 2021-06-23, 
//     end: 2021-06-24
// }));

export const createBooking = ({spotId, userId, selectedStart, selectedEnd}) => async dispatch => {
    // const { spotId, userId, selectedStart, selectedEnd } = booking;

    const res = await csrfFetch(`/api/spots/${spotId}/book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, start: selectedStart, end: selectedEnd })
    })

    const data = await res.json();
    console.log(data.errors)
        if(data.errors !== undefined) {
            dispatch(error(data.errors));
            return;
        }

        dispatch(book(data.bookings))
}

const initialState = {errors: null, userBookings: null}

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case BOOK:
            return {...state, errors: null, userBookings: action.payload}
        case ERROR:
            return {...state, errors: [action.payload]}
      default:
        return state;
    }
};

export default bookingsReducer;