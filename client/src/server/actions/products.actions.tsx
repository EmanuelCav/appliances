'use client'

import { useReducer, createContext, ReactNode } from 'react'

import { IReducerProduct } from '@/interface/Product'

import { productsValue } from '../values/products.value'
import productsReducer from '../reducers/products.reducer'
import * as productsApi from '../api/product.api'
import * as productsConstants from '../constants/products.const'
import { IAction } from '@/interface/Reducer'

export const ProductContext = createContext<IReducerProduct>(productsValue)

const ProductContextGlobal = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer<(state: IReducerProduct, actions: IAction) => IReducerProduct>(productsReducer, productsValue)

  const getCategories = async () => {

    try {

      const response = await productsApi.getCategoriesApi()      

      dispatch({
        type: productsConstants.CATEGORIES,
        payload: response
      })

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ProductContext.Provider value={{ state, getCategories } as any}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContextGlobal