const placeInput = document.getElementById('place');
const dateInput = document.getElementById('date');
const submitButton = document.getElementById('submit-button');
const infoContainer = document.getElementById('information-container');

const weather_api_key = 'e6d8a005105247e09d7142556241704';
const currency_api_key = 'cur_live_40cUpIHkzLnoQXdxv3xNDLTJxox9MItB1T56X0ws';

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

submitButton.addEventListener('click', () => {
    const place = placeInput.value;
    const placeWithoutDiacritics = removeDiacritics(placeInput.value);

    const date = dateInput.value;
    // console.log(place + "   " + date);

    placeInput.style.borderColor = ''; // Vyčistíme nastavenú farbu okraja placeInputu
    dateInput.style.borderColor = '';

    if (!place || !date) {
        if (!place) {
            placeInput.style.borderColor = 'red'; // Zmeníme farbu okraja placeInputu na červenú
        }
        if (!date) {
            dateInput.style.borderColor = 'red'; // Zmeníme farbu okraja dateInputu na červenú
        }
        return;
    }

    fetch(`https://api.weatherapi.com/v1/current.json?key=${weather_api_key}&q=${placeWithoutDiacritics}&aqi=no`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong.');
            }
            return response.json();
        })
        .then(data => {
            const placeName = data.location.name;
            const country = data.location.country;
            // console.log(country);
            const temperature = data.current.temp_c; // Teplota v stupňoch Celzia
            const weatherCondition = data.current.condition.text; // Popis počasia
            const weatherIconURL = `https:${data.current.condition.icon}`; // URL obrázka ikony počasia
            const windSpeed = data.current.wind_kph; // Rýchlosť vetra v km/h

            fetch(`places_process.php?place=${placeName}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Očakáva sa JSON odpoveď
                })
                .then(numOfDestinationSearches => {
                    $numOfSearches = numOfDestinationSearches.numOfSearches;

                    if($numOfSearches === 0) {
                        fetch(`places_process.php?place=${placeName}&country=${country}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to create record');
                            }
                        })
                        .catch(error => {
                            console.error('There was a problem with creating the record:', error);
                        });
                    } else {
                        fetch(`places_process.php?place=${placeName}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to create record');
                            }
                        })
                        .catch(error => {
                            console.error('There was a problem with creating the record:', error);
                        });
                        
                    }
                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation:', error);
                });


            fetch(`https://restcountries.com/v3.1/name/${country}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const capital = data[0].capital[0];
                    const flagURL = data[0].flags.png;
                    const countryCodeAlpha2 = data[0].cca2;
                    const currencyKeys = Object.keys(data[0].currencies);
                    const currencyCode = currencyKeys[0];

                    const currencyName = data[0].currencies[currencyCode].name;
                    const currencySymbol = data[0].currencies[currencyCode].symbol;

                    const informationHTML = `
                        <div class="weather-info">
                            <h2> ${placeName}</h2>
                            <img src="${weatherIconURL}" alt="Weather Icon">
                        </div>
                        <div class="weather-info">
                            <p><span class="label">Country:</span> ${country}</p>
                            <img src="${flagURL}" alt="Flag Icon" style="width: 2em; margin-left: 1em;">
                        </div>
                        <p><span class="label">Capital city:</span> ${capital}</p>
                        <p><span class="label">Currency:</span> ${currencyName} - ${currencySymbol}</p>
                        <p><span class="label">Temperature:</span> ${temperature} °C</p>
                        <p><span class="label">Weather:</span> ${weatherCondition}</p>
                        <p><span class="label">Wind Speed:</span> ${windSpeed} km/h</p>
                    `;

                    // Nastavenie HTML obsahu do kontajnera
                    infoContainer.innerHTML = informationHTML;
                    infoContainer.style.display = 'block'; // Zobrazenie kontajnera

                    const currentDate = new Date();
                    const currentYear = currentDate.getFullYear();
                    const currentMonth = currentDate.getMonth() + 1; 

                    // Získať mesiac z inputu
                    const selectedDate = new Date(dateInput.value);
                    const selectedMonth = selectedDate.getMonth() + 1; 
                    const selectedYear = selectedDate.getFullYear();
                    const monthName = months[selectedMonth - 1]; // Odpočítame 1, pretože mesiace sú indexované od 0


                    const lastYear = selectedMonth > currentMonth ? currentYear - 1 : currentYear;
                    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);

                    fetch(`https://api.weatherapi.com/v1/history.json?key=${weather_api_key}&q=${placeName}&dt=${lastYear}-${selectedMonth}-01&end_dt=${lastYear}-${selectedMonth}-${daysInMonth}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            let totalTemperature = 0;
                            let days = 0;

                            // Iterujeme cez každý deň v dátach
                            data.forecast.forecastday.forEach(dayData => {
                                // Pridáme teplotu tohto dňa k celkovému súčtu
                                days++;
                                totalTemperature += dayData.day.avgtemp_c;
                            });

                            // Spočítame priemernú teplotu
                            const averageTemperature = totalTemperature / days;
                            const roundedAverageTemperature = averageTemperature.toFixed(1);

                            // Získať existujúci HTML obsah
                            const existingHTML = infoContainer.innerHTML;

                            // Vytvoriť nový HTML obsah, ktorý obsahuje existujúci obsah a priemernú teplotu
                            const newHTML = existingHTML + `
                                <p><span class="label">Average temperature for ${monthName}:</span> ${roundedAverageTemperature} °C</p>
                            `;

                            // Nastaviť nový HTML obsah do kontajnera
                            infoContainer.innerHTML = newHTML;
            
                        })
                        .catch(error => {
                            console.error('There was a problem with your fetch operation:', error);
                        });
                        return currencyCode;
                }) 
                .then ((result) => {
                    fetch(`https://api.currencyapi.com/v3/latest?apikey=cur_live_40cUpIHkzLnoQXdxv3xNDLTJxox9MItB1T56X0ws&currencies=EUR&base_currency=${result}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            const euroValue = data.data.EUR.value;
                            if(result !== 'EUR') {
                                const informationHTML = `
                                    <p>1 <b>${result}</b> is ${euroValue} <b>EUR</b></p>
                                `;
                                const referenceElement = infoContainer.children[4];
                                referenceElement.insertAdjacentHTML('beforebegin', informationHTML);
                            }
                        })
                        .catch(error => {
                            console.error('There was a problem with your fetch operation:', error);
                        });
                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation:', error);
                });
        })
        .catch(error => {
            placeInput.style.borderColor = 'red';
            console.error('There was a problem with your fetch operation:', error);
        });
});


function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

