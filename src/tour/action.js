import fetchTour from '../utils/fetchTour'
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
        fetchTour.list().once('value')
        .then(tours => {
            dispatch(getInitialTours(tours.val()))
        })
        .catch(error => console.log(error))
    };
}
export function fetchOneTourById(id) {
    return function (dispatch) {
        fetchTour.byId(id).once('value')
        .then(tour => {
            dispatch(getOneTourById(tour.val()))
        })
        .catch(error => console.log(error))
    };
}