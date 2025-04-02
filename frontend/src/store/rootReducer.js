import { combineReducers } from 'redux'
import theme from './slices/themeSlice'
import auth from './slices/authSlice'
import roomCategory from './slices/roomCategoriesSlice'
import rooms from './slices/roomsSlice';
import registerHotelPage from './slices/registerHotelPageSlice'


const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        theme,
        auth,
        roomCategory,
        rooms,
        registerHotelPage,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
