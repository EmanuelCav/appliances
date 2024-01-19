import Product from '@/components/products/product'

import { IProduct } from '@/interface/Product'

import { getProducts } from '@/server/api/product.api'

export default async function Home() {

  const products: IProduct[] = await getProducts()

  return (
    <div className="flex justify-between items-center w-full p-14">
      {
        products.map((product: IProduct) => {
          return <Product product={product} key={product.id} />
        })
      }
    </div>
  )
}
