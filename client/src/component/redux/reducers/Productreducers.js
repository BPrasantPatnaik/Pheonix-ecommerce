const products=[]

export const getProductsreducer=(state={products},action)=>{
    switch (action.type) {
        case "SUCCEFFULY_GET_PRODUCTS":
            return{products:action.payload}
            break;
            case "FAIL_GET_PRODUCTS":
                return{products:action.payload}
                break;
        default:
            return state;
            break;
    }
}