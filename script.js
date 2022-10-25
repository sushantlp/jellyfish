(async function () {
  /* Fetching Data from OpenWeatherMap API */
  let weather = {
    apiKey: "aba6ff9d6de967d5eac6fd79114693cc",
    fetchWeather: function (lat, lon) {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?exclude=alerts,hourly,minutely,current&lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const rain = "wi wi-icon-520";
      const cloud = "wi wi-icon-802";
      const thunderstorm = "wi wi-icon-200";
      const drizzle = "wi wi-icon-300";
      const snow = "wi wi-icon-600";
      const clear = "wi wi-icon-800";

      const { daily } = data;
      const current = document.getElementById("current");
      const currentSpan = document.getElementById("current-span");
      const table = document.getElementById("table");
      const tr1 = document.createElement("tr");
      const tr2 = document.createElement("tr");
      const iTag = document.createElement("i");
      const span = document.createElement("span");
      const divTag = document.createElement("div");
      for (let i = 0; i < daily.length; i++) {
        if (i === 4) break;

        if (i === 0) {
          if (daily[i].weather[0].main === "Rain") {
            current.classList.add.apply(current.classList, rain.split(" "));
            currentSpan.innerText = parseInt(daily[i].temp.max, 10);
          } else if (daily[i].weather[0].main === "Clouds") {
            current.classList.add.apply(current.classList, cloud.split(" "));
            currentSpan.innerText = parseInt(daily[i].temp.max, 10);
          } else if (daily[i].weather[0].main === "Thunderstorm") {
            current.classList.add.apply(
              current.classList,
              thunderstorm.split(" ")
            );
            currentSpan.innerText = parseInt(daily[i].temp.max, 10);
          } else if (daily[i].weather[0].main === "Drizzle") {
            current.classList.add.apply(current.classList, drizzle.split(" "));
            currentSpan.innerText = parseInt(daily[i].temp.max, 10);
          } else if (daily[i].weather[0].main === "Snow") {
            current.classList.add.apply(current.classList, snow.split(" "));
            currentSpan.innerText = parseInt(daily[i].temp.max, 10);
          } else {
            current.classList.add.apply(current.classList, clear.split(" "));
            currentSpan.innerText = parseInt(daily[i].temp.max, 10);
          }

          continue;
        }

        const th = document.createElement("th");
        const td = document.createElement("td");

        const unixTimestamp = daily[i].dt;
        const milliseconds = unixTimestamp * 1000;
        const dateObject = new Date(milliseconds);

        th.innerHTML = dateObject.toLocaleString("en-US", { weekday: "short" });
        tr1.appendChild(th);

        console.log(daily[i]);
        if (daily[i].weather[0].main === "Rain") {
          iTag.classList.add.apply(iTag.classList, rain.split(" "));
          span.innerText = parseInt(daily[i].temp.max, 10);
        } else if (daily[i].weather[0].main === "Clouds") {
          iTag.classList.add.apply(iTag.classList, cloud.split(" "));
          span.innerText = parseInt(daily[i].temp.max, 10);
        } else if (daily[i].weather[0].main === "Thunderstorm") {
          iTag.classList.add.apply(iTag.classList, thunderstorm.split(" "));
          span.innerText = parseInt(daily[i].temp.max, 10);
        } else if (daily[i].weather[0].main === "Drizzle") {
          iTag.classList.add.apply(iTag.classList, drizzle.split(" "));
          span.innerText = parseInt(daily[i].temp.max, 10);
        } else if (daily[i].weather[0].main === "Snow") {
          iTag.classList.add.apply(iTag.classList, snow.split(" "));
          span.innerText = parseInt(daily[i].temp.max, 10);
        } else {
          iTag.classList.add.apply(iTag.classList, clear.split(" "));
          span.innerText = parseInt(daily[i].temp.max, 10);
        }

        divTag.appendChild(span);

        td.appendChild(iTag);
        td.appendChild(divTag);
        tr2.appendChild(td);

        table.appendChild(tr1);
        table.appendChild(tr2);
      }
    },
  };

  let response = await fetch("./cities-fr.json");
  let parsed = await response.json();
  let city = document.getElementById("city");
  let citySelect = document.getElementById("select-city");
  const table = document.getElementById("table");

  for (let i = 0; i < parsed.length; i++) {
    let option = document.createElement("option");
    if (i === 0) {
      citySelect.innerText = parsed[i].nm;
      weather.fetchWeather(parsed[i].lat, parsed[i].lon);
    }
    option.text = parsed[i].nm;
    option.value = parsed[i].nm;
    city.add(option);
  }

  // Event Listener For Select Option
  document.getElementById("city").addEventListener("click", function (e) {
    for (let i = 0; i < parsed.length; i++) {
      if (parsed[i].nm === e.target.value) {
        table.innerHTML = "";
        weather.fetchWeather(parsed[i].lat, parsed[i].lon);
        break;
      }
    }
    citySelect.innerText = e.target.value;
  });
})();
