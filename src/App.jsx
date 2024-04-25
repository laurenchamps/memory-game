import { useState } from 'react';
import React from 'react';

const tempCountries = [
  {
    id: 1,
    name: 'Australia',
    abbrev: 'AUS',
  },
  {
    id: 2,
    name: 'Palestine',
    abbrev: 'PAL',
  },
  {
    id: 3,
    name: 'Yemen',
    abbrev: 'YEM',
  },
];

function App() {
  const [countries, setCountries] = useState(tempCountries);

  return (
    <>
      <header className="header">
        <h1>Memory Game</h1>
      </header>
      <main>
        <CountryList countries={countries} />
      </main>
    </>
  );
}

function CountryList({ countries }) {
  return (
    <ul className="container list list-countries">
      {countries.map((country) => (
        <Country country={country} key={country.id} />
      ))}
    </ul>
  );
}

function Country({ country }) {
  return (
    <li className="country">
      <h2>{country.name}</h2>
      <p>{country.abbrev}</p>
    </li>
  );
}

export default App;
