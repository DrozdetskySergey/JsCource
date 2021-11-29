(function () {
    function Country(name, cities) {
        this.name = name;
        this.cities = cities;
    }

    function City(name, population) {
        this.name = name;
        this.population = population;
    }

    function showCountriesWithCitiesCountMaximum(countries) {
        var citiesCountMaximum = 0;
        var countriesList;

        countries.forEach(function (country) {
            var citiesCount = country.cities.length;

            if (citiesCount >= citiesCountMaximum) {
                if (citiesCount > citiesCountMaximum) {
                    citiesCountMaximum = citiesCount;
                    countriesList = [];
                }

                countriesList.push(country.name);
            }
        });

        if (citiesCountMaximum === 0) {
            console.log("В этих странах нет городов.");
        }

        console.log("Максимальное колличество городов: " + citiesCountMaximum + " находятся в странах: " + countriesList.join(", "));
    }

    function getCountryPopulation(country) {
        return country.cities.reduce(function (sum, city) {
            return sum + city.population;
        }, 0);
    }

    var countries = [];

    countries.push(new Country("Country1", [
        new City("City1", 800000),
        new City("City2", 340000),
        new City("City3", 400000)]));

    countries.push(new Country("Country2", [
        new City("City4", 300000),
        new City("City5", 1000000),
        new City("City6", 330000),
        new City("City7", 160000),
        new City("City8", 770000)]));

    countries.push(new Country("Country3", [
        new City("City9", 70000),
        new City("City10", 260000),
        new City("City11", 860000),
        new City("City12", 600000)]));

    countries.push(new Country("Country4", [
        new City("City13", 370000),
        new City("City14", 450000),
        new City("City15", 760000),
        new City("City16", 920000),
        new City("City17", 130000)]));

    console.log(countries);

    showCountriesWithCitiesCountMaximum(countries);

    var countriesPopulation = {};

    countries.forEach(function (country) {
        countriesPopulation[country.name] = getCountryPopulation(country);
    });

    console.log(countriesPopulation);
})();