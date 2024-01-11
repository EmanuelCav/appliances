
export const getCategoriesApi = async () => {

    const response = await fetch('http://localhost:4000/categories', {
        method: 'GET'
    })
    
    const data = await response.json()

    return data

}