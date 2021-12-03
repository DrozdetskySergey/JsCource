(function () {
    var celsiusTemperature = document.querySelector(".celsius_temperature");
    var kelvinTemperature = document.querySelector(".kelvin_temperature");
    var fahrenheitTemperature = document.querySelector(".fahrenheit_temperature");
    var calcButton = document.querySelector(".calc_button");

    var translateTemperature = function () {
        var celsiusTemperatureValue = Number(celsiusTemperature.value);

        if (isNaN(celsiusTemperatureValue) || celsiusTemperatureValue < -273) {
            celsiusTemperature.classList.add("invalid");
            kelvinTemperature.textContent = "?";
            fahrenheitTemperature.textContent = "?";
        } else {
            celsiusTemperature.classList.remove("invalid");
            kelvinTemperature.textContent = String(celsiusTemperatureValue + 273);
            fahrenheitTemperature.textContent = String(celsiusTemperatureValue * 9 / 5 + 32);
        }
    };

    calcButton.addEventListener("click", translateTemperature);

    celsiusTemperature.addEventListener("keydown", function (event) {
        if (event.code === "Enter") {
            event.preventDefault();

            translateTemperature();
        }
    });
})();