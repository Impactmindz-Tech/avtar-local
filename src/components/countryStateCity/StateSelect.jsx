import { useEffect, useState } from "react";
import { State } from "country-state-city";

const StateSelect = ({ selectedCountry, selectedState, setSelectedState }) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry.isoCode));
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  return (
    <div className="my-2">
      <label htmlFor="state" className="font-semibold">State</label>
      <select
        id="state"
        value={selectedState?.name || ""}
        onChange={(e) => {
          const state = states.find((state) => state.name === e.target.value);
          setSelectedState(state);
        }}
        disabled={!selectedCountry}
        className="input"
      >
        <option value="">{selectedState?.name || "Select State"}</option>
        {states.map((state) => (
          <option key={state.isoCode} value={state.name}>{state.name}</option>
        ))}
      </select>
    </div>
  );
};

export default StateSelect;
