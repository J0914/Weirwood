import { csrfFetch } from './csrf';

const POSTREVIEW = 'reviews/POSTREVIEW'
const ERROR = 'reviews/ERROR'
const CLEARERROR = 'review/CLEARERROR'

const updateReviews = reviews => ({
    type: POSTREVIEW,
    payload: reviews
})

const error = error => ({
    type: ERROR,
    payload: error
})

const clearError = () => ({
    type: CLEARERROR,
    payload: null
})

// window.store.dispatch(window.reviewsActions.createReview({
//     spotId: 1, 
//     userId: 1, 
//     body: 'wow this was great'
// }));


export const createReview = ({ spotId, userId, body }) => async dispatch => {
    console.log('USERID IS **********', userId)
    console.log('BODY is **********', body)
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userId, body: body })
    })

    const data = await res.json();
    if (data.errors !== undefined) {
        dispatch(error(data.errors));
        return;
    }
    
    dispatch(updateReviews(data.reviews));
}









const initialState = {spotReviews: null, errors: null}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case POSTREVIEW:
            return {...state, spotReviews: action.payload }
        case ERROR:
            return {...state, errors: action.payload}
        case CLEARERROR:
            return {...state, errors: null} 
        default:
        return state;
    }
};

export default reviewsReducer;