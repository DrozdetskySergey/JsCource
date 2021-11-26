(function f() {
    function getEvenNumbersSumInArray(numbers) {
        return numbers
            .filter(n => n % 2 === 0)
            .reduce((sum, n) => sum + n, 0);
    }

    function getEvenNumbersSquaresListInArray(numbers) {
        return numbers
            .filter(function (n) {
                return n % 2 === 0;
            })
            .map(function (n) {
                return n * n;
            });
    }

    var numbers = [5, 6, 7, 8, 4, 3, 2, 1, 8, 9, 10, 11];
    console.log(numbers.join(", "));

    numbers.sort(function (n1, n2) {
        return n2 - n1;
    });
    console.log(numbers.join(", "));

    console.log(numbers.slice(0, 5).join(", "));

    console.log(numbers.slice(numbers.length - 5, numbers.length).join(", "));

    console.log(getEvenNumbersSumInArray(numbers));

    console.log("--------------------------------------");

    numbers.length = 100;

    for (var i = 0; i < 100; i++) {
        numbers[i] = i + 1;
    }

    console.log(numbers.join(", "));

    console.log(getEvenNumbersSquaresListInArray(numbers).join(", "));
})();