import {getProductsreducer} from "./Productreducers"
import {combineReducers} from 'redux'

const rootreducers=combineReducers({
    getproductsdata:getProductsreducer //just an another name for getProductsreducer
});

export default rootreducers;