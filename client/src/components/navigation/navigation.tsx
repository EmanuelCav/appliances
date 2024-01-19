import { getCategoriesApi } from '@/server/api/product.api'

import { ICategory } from '@/interface/Product'

const Navigation = async () => {

  const categories: ICategory[] = await getCategoriesApi()

  return (
    <div className='flex justify-around align-center p-2 bg-indigo-200'>
      {
        categories.map((category: ICategory) => {
          return <p className='text-white text-xl select-none cursor-pointer hover:underline active:no-underline' key={category._id}>{category.category}</p>
        })
      }
    </div>
  )
}

export default Navigation