import { csrfFetch } from './csrf';

const UPDATEREVIEWS = 'reviews/UPDATEREVIEWS'

const updateReviews = reviews => ({
    type: UPDATEREVIEWS,
    payload: reviews
})



////////////GET/////////////
export const getReviews = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    
    const data = await res.json();
    dispatch(updateReviews(data.reviews));
}

////////////CREATE/////////////
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

// window.store.dispatch(window.reviewsActions.createReview({
//     spotId: 1, 
//     userId: 1, 
//     body: 'wow this was great'
// }));


////////////EDIT/////////////

export const editReview = ({reviewId, userId, spotId, body}) => async dispatch => {
    console.log('IN THE THUNK THE REVIEWID IS ', reviewId)
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({reviewId, userId, spotId, body})
    })

    const data = await res.json();
    dispatch(updateReviews(data.reviews));
}

// window.store.dispatch(window.reviewsActions.editReview({
//     reviewId: 1,
//     spotId: 1, 
//     userId: 1, 
//     body: 'OMG I LOVED THIS CASTLE'
// }));


////////////DELETE/////////////

export const deleteReview = (spotId, reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({spotId, reviewId})
    })

    const data = await res.json();
    dispatch(updateReviews(data.reviews));
}

// window.store.dispatch(window.reviewsActions.deleteReview(reviewId));



////////////REDUCER/////////////

const initialState = {spotReviews: null}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATEREVIEWS:
            return {...state, spotReviews: action.payload } 
        default:
                return state;
    }
};
        
        export default reviewsReducer;