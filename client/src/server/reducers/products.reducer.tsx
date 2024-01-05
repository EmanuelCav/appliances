import { IReducerProduct } from "@/interface/Product";
import { IAction } from "@/interface/Reducer";

import * as productsConstants from "../constants/products.const";

import { productsValue } from "../values/products.value";

const productsReducer = (state: IReducerProduct = productsValue, action: IAction) => {

    switch (action.type) {
        case productsConstants.CATEGORIES:
            state.categories = action.payload
            break;
    
        default:
            break;
    }

}

export default productsReducer