import { csrfFetch } from './csrf';

const GETREVIEWS = 'reviews/POSTREVIEW'

const updateReviews = reviews => ({
    type: GETREVIEWS,
    payload: reviews
})


// window.store.dispatch(window.reviewsActions.createReview({
//     spotId: 1, 
//     userId: 1, 
//     body: 'wow this was great'
// }));


export const createReview = ({ spotId, userId, body }) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userId, body: body })
    })

    const data = await res.json();
    
    dispatch(updateReviews(data.reviews));
}

export const getReviews = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

    const data = await res.json();
    dispatch(updateReviews(data.reviews));
}

const initialState = {spotReviews: null}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETREVIEWS:
            return {...state, spotReviews: action.payload } 
        default:
        return state;
    }
};

export default reviewsReducer;