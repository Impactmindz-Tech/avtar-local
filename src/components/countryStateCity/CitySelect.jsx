import { useEffect, useState } from "react";
import { City } from "country-state-city";

const CitySelect = ({ selectedCountry, selectedState, selectedCity, setSelectedCity }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode));
    } else {
      setCities([]);
    }
  }, [selectedState]);

  return (
    <div className="my-2">
      <label htmlFor="city" className="font-semibold">City</label>
      <select
        id="city"
        value={selectedCity?.name || ""}
        onChange={(e) => {
          const city = cities.find((city) => city.name === e.target.value);
          setSelectedCity(city);
        }}
        disabled={!selectedState}
        className="input"
      >
        <option value="">{selectedCity?.name || "Select City"}</option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>{city.name}</option>
        ))}
      </select>
    </div>
  );
};

export default CitySelect;
