import { useEffect, useState } from "react";
import { Country } from "country-state-city";

const CountrySelect = ({ selectedCountry, setSelectedCountry }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  return (
    <div className="my-2">
      <label htmlFor="country" className="font-semibold">Country</label>
      <select
        id="country"
        value={selectedCountry?.name || ""}
        onChange={(e) => {
          const country = countries.find((country) => country.name === e.target.value);
          setSelectedCountry(country);
        }}
        className="input"
      >
        <option value="">{selectedCountry?.name || "Select Country"}</option>
        {countries.map((country) => (
          <option key={country.isoCode} value={country.name}>{country.name}</option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelect;
