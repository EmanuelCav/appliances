'use client'

import { useReducer, createContext, ReactNode } from 'react'

import { IReducerProduct } from '@/interface/Product'

import { productsValue } from '../values/products.value'
import productsReducer from '../reducers/products.reducer'

export const ProductContext = createContext<IReducerProduct>(productsValue)

const ProductContextGlobal = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(productsReducer as any, productsValue)

  return (
    <ProductContext.Provider value={state as IReducerProduct}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContextGlobal