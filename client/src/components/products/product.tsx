import Image from 'next/image';

import { IProduct } from '@/interface/Product'

const Product = ({ product }: { product: IProduct }) => {
  return (
    <div className='text-center border-solid border-indigo-300 border p-12 rounded-lg cursor-pointer hover:border-indigo-600'>
      <Image src={product.images[0].image} alt='images' height={200} width={200} className='w-full' />
      <p className='text-2xl'>{product.title}</p>
      <p className='text-lg'>{product.description}</p>
      <p className='text-xl font-semibold text-indigo-500'>${product.price}</p>
    </div>
  )
}

export default Product