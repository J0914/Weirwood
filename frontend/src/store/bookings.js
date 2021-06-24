import { csrfFetch } from './csrf';

const BOOK = 'bookings/BOOK'
const GETBOOKS = 'bookings/GETBOOKS'
const ERROR = 'bookings/ERROR'
const CLEARERROR = 'bookings/CLEARERROR'
const CLEARBOOKS = 'bookings/CLEARBOOKS'

const getBooks = bookings => ({
    type: GETBOOKS,
    payload: bookings
})

const book = bookings => ({
    type: BOOK,
    payload: bookings
})

const error = error => ({
    type: ERROR,
    payload: error
})

const clearError = () => ({
    type: CLEARERROR,
    payload: null
})

const clearBookings = () => ({
    type: CLEARBOOKS,
    payload: null
})

export const clearErrors = () => async dispatch => {
    dispatch(clearError());
}

export const clearBooks = () => async dispatch => {
    dispatch(clearBookings());
}

// window.store.dispatch(window.spotsActions.getUserBookings(1));

export const getUserBookings = userId => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/bookings`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getBooks(data.bookings))
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
        if(data.errors !== undefined) {
            dispatch(error(data.errors));
            return;
        }

        dispatch(book(data.bookings))
}

const sucMsg = 'You have successfully booked this castle!'

const initialState = {success: null, errors: null, userBookings: null}

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case BOOK:
            return {...state, success: sucMsg, errors: null, userBookings: action.payload}
        case GETBOOKS:
            return {...state, userBookings: action.payload}
        case ERROR:
            return {...state, errors: action.payload}
        case CLEARERROR:
            return {...state, errors: null, success: null} 
        case CLEARBOOKS:
            return {...state, userBookings: null} 
      default:
        return state;
    }
};

export default bookingsReducer;