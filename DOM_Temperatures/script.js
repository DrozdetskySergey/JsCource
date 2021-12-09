(function () {
    var celsiusTemperature = document.querySelector(".celsius_temperature");
    var kelvinTemperature = document.querySelector(".kelvin_temperature");
    var fahrenheitTemperature = document.querySelector(".fahrenheit_temperature");
    var calcButton = document.querySelector(".calc_button");

    function translateTemperature() {
        var minCelsiusTemperature = -273.15;
        var inputString = celsiusTemperature.value;

        var celsiusTemperatureValue = inputString === "" ? NaN : Number(inputString);

        if (isNaN(celsiusTemperatureValue) || celsiusTemperatureValue < minCelsiusTemperature) {
            celsiusTemperature.classList.add("invalid");
            kelvinTemperature.textContent = "?";
            fahrenheitTemperature.textContent = "?";

            if (celsiusTemperatureValue < minCelsiusTemperature) {
                alert("По Цльсию минимальное значение = -273.15. Введите корректное значение.");
            } else {
                alert("Введите числовое значение температуры в градусах по Цельсию.");
            }
        } else {
            celsiusTemperature.classList.remove("invalid");
            kelvinTemperature.textContent = (celsiusTemperatureValue + 273.15).toFixed(2);
            fahrenheitTemperature.textContent = (celsiusTemperatureValue * 9 / 5 + 32).toFixed(2);
        }
    }

    calcButton.addEventListener("click", translateTemperature);

    celsiusTemperature.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            translateTemperature();
        }
    });
})();