export const GET_INIT_TOURS = 'GET_INITL_TOURS'
export const GET_ONE_TOUR = 'GET_ONE_TOUR'

const getInitialTours = (tours) => ({
    type: GET_INIT_TOURS,
  	tours
})
const getOneTourById = (tour) => ({
    type: GET_ONE_TOUR,
  	tour
})
export function fetchInitialTours() {
    return function (dispatch) {
        return fetch('/api/tours') // fetch from Express.js server
        .then((res) => {
            res.json().then((data) => {
                dispatch(getInitialTours(data))
            })
        })
        
    }
}
export function fetchOneTourById(id) {
    return function (dispatch) {
        return fetch(`/api/tour/${id}`) // fetch from Express.js server
        .then((res) => {
            res.json().then((data) => {
                dispatch(getOneTourById(data))
            })
        })
    };
}