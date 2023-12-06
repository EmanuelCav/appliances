
export const users = async () => {
    const response = await fetch('http://localhost:4000')
    const data = response.json()
    return data
}