(function () {
    function getCountriesWithCitiesMaxCount(countries) {
        var citiesMaxCount = 0;
        var countriesList = [];

        countries.forEach(function (country) {
            var citiesCount = country.cities.length;

            if (citiesCount >= citiesMaxCount) {
                if (citiesCount > citiesMaxCount) {
                    citiesMaxCount = citiesCount;
                    countriesList = [];
                }

                countriesList.push(country);
            }
        });

        return countriesList;
    }

    function getCountryPopulation(country) {
        return country.cities.reduce(function (sum, city) {
            return sum + city.population;
        }, 0);
    }

    function getCountriesPopulations(countries) {
        var countriesPopulations = {};

        countries.forEach(function (country) {
            countriesPopulations[country.name] = getCountryPopulation(country);
        });

        return countriesPopulations;
    }

    var countries = [
        {
            name: "Country1",
            cities: [
                {name: "City1", population: 800000},
                {name: "City2", population: 340000},
                {name: "City3", population: 400000}
            ]
        },
        {
            name: "Country2",
            cities: [
                {name: "City4", population: 300000},
                {name: "City5", population: 1000000},
                {name: "City6", population: 330000},
                {name: "City7", population: 160000},
                {name: "City8", population: 770000}
            ]
        },
        {
            name: "Country3",
            cities: [
                {name: "City9", population: 700000},
                {name: "City10", population: 260000},
                {name: "City11", population: 860000},
                {name: "City12", population: 600000}
            ]
        },
        {
            name: "Country4",
            cities: [
                {name: "City13", population: 370000},
                {name: "City14", population: 450000},
                {name: "City15", population: 760000},
                {name: "City16", population: 920000},
                {name: "City17", population: 130000}
            ]
        }
    ];

    console.log(countries);

    var countriesWithCitiesMaxCount = getCountriesWithCitiesMaxCount(countries);

    if (countriesWithCitiesMaxCount.length === 0) {
        console.log("Список стран с максимальным количеством городов пуст.");
    } else {
        var citiesCount = countriesWithCitiesMaxCount[0].cities.length;

        var citiesNamesString = countriesWithCitiesMaxCount.map(function (country) {
            return country.name;
        }).join(", ");

        console.log("Максимальное колличество городов: " + citiesCount + " находятся в стране(ах): " + citiesNamesString);
    }

    var countriesPopulations = getCountriesPopulations(countries);

    console.log(countriesPopulations);
})();