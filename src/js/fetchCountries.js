// https://restcountries.com/v3.1/name/{name}

// function fetchCountries(name)-робить HTTP-запит на ресурс name і 
// // повертає проміс з масивом країн - результатом запиту
export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        });
};