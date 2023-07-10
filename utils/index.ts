export async function fetchCars() {
    const headers = {
        'X-RapidAPI-Key': 'a3965d0ee2mshedbcbe0a389456ap1b0edbjsn422033bf6f44',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const response = await fetch('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla', {
        headers: headers,
    });

    const result = await response.json();

    return result;
}