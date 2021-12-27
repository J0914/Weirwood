import { csrfFetch } from './csrf';

const GETBOOKS = 'bookings/GETBOOKS'
const CLEARBOOKS = 'bookings/CLEARBOOKS'

const getBooks = bookings => ({
    type: GETBOOKS,
    payload: bookings
})

const clearBookings = () => ({
    type: CLEARBOOKS,
    payload: null
})



export const clearBooks = () => async dispatch => {
    dispatch(clearBookings());
}

// window.store.dispatch(window.spotsActions.getUserBookings(1));

export const getUserBookings = userId => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/bookings`);

    const data = await res.json();
    dispatch(getBooks(data.bookings))
    
}

// window.store.dispatch(window.spotsActions.createBooking({
//     spotId: 1, 
//     userId: 1, 
//     start: 2021-06-23, 
//     end: 2021-06-24
// }));

export const createBooking = ({spotId, userId, selectedStart, selectedEnd}) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, start: selectedStart, end: selectedEnd })
    })

    const data = await res.json();
    dispatch(getBooks(data.bookings))
}


export const editBooking = ({bookingId, spotId, userId, start, end}) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookingId, spotId, userId, start, end})
    })

    const data = await res.json();
    dispatch(getBooks(data.userBookings))
}

export const deleteBooking = (userId, bookingId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId, bookingId})
    })

    const data = await res.json();
    dispatch(getBooks(data.userBookings));
}

const initialState = {userBookings: null}

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETBOOKS:
            return {...state, userBookings: action.payload}
        case CLEARBOOKS:
            return {...state, userBookings: null} 
      default:
        return state;
    }
};

export default bookingsReducer;