(function () {
    var people = [
        {age: 28, name: "Oleg"},
        {age: 31, name: "Aleksandra"},
        {age: 25, name: "Svetlana"},
        {age: 53, name: "Vladimir"},
        {age: 14, name: "Anna"},
        {age: 27, name: "Julia"},
        {age: 46, name: "Aleksandra"},
        {age: 24, name: "Oleg"},
        {age: 20, name: "Valentin"},
        {age: 19, name: "Aleksandra"}
    ];

    console.log(people);

    var agesSum = _.reduce(people, function (sum, person) {
        return sum + person.age;
    }, 0);

    var middleAge = agesSum / people.length;

    console.log("Средний возраст этих людей: " + middleAge);

    var group = _.chain(people)
        .filter(function (person) {
            return person.age >= 20 && person.age <= 30;
        })
        .sortBy("age")
        .value();

    console.log(group);

    var names = _.chain(group)
        .pluck("name")
        .uniq()
        .value()
        .sort(function (n1, n2) {
            var lowerCaseName1 = n1.toLowerCase();
            var lowerCaseName2 = n2.toLowerCase();

            return lowerCaseName1 === lowerCaseName2 ? 0 : lowerCaseName1 < lowerCaseName2 ? 1 : -1;
        });

    console.log(names);

    var namesWithCountObject = _.countBy(people, "name");

    console.log(namesWithCountObject);
})();