document.getElementById("searchBtn").addEventListener("click", () => {
  const country = document.getElementById("countryInput").value.trim();

  if (country === "") {
    alert("Please enter a country name!");
    return;
  }

  fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    .then(res => res.json())
    .then(data => {
      const countryInfo = data[0];

      const languages = countryInfo.languages
        ? Object.values(countryInfo.languages).join(", ")
        : "N/A";

      const currencies = countryInfo.currencies
        ? Object.values(countryInfo.currencies)
            .map(cur => `${cur.name} (${cur.symbol})`)
            .join(", ")
        : "N/A";

      // Update all elements
      document.getElementById("countryName").innerText = countryInfo.name.common;
      document.getElementById("flagImage").innerHTML = `
        <img src="${countryInfo.flags.png}" alt="Flag of ${countryInfo.name.common}" width="300">
      `;
      document.getElementById("capital").innerText = countryInfo.capital ? countryInfo.capital[0] : "N/A";
      document.getElementById("region").innerText = countryInfo.region || "N/A";
      document.getElementById("subregion").innerText = countryInfo.subregion || "N/A";
      document.getElementById("population").innerText = countryInfo.population.toLocaleString();
      document.getElementById("area").innerText = `${countryInfo.area.toLocaleString()} km²`;
      document.getElementById("languages").innerText = languages;
      document.getElementById("currencies").innerText = currencies;
      document.getElementById("timezones").innerText = countryInfo.timezones.join(", ");
      document.getElementById("continent").innerText = countryInfo.continents.join(", ");
      document.getElementById("mapLink").innerHTML = `
        <a href="${countryInfo.maps.googleMaps}" target="_blank">View on Google Maps</a>
      `;
    })
    .catch(error => {
      alert("Country not found. Please try again.");
    });
});
