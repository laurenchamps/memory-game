import { useState, useEffect } from 'react';
import React from 'react';

// `https://restcountries.com/v3.1/all?fields=cca3,name,flags`

const tempCountries = [
  {
    id: 1,
    name: 'Australia',
    cca3: 'AUS',
  },
  {
    id: 2,
    name: 'Palestine',
    cca3: 'PAL',
  },
  {
    id: 3,
    name: 'Yemen',
    cca3: 'YEM',
  },
];

const NUMBER_OF_COUNTRIES = 8;

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      const res = await fetch(
        `https://restcountries.com/v3.1/all?fields=cca3,name,flag`
      );

      const data = await res.json();

      console.log(data);

      let selectedCountries = [];

      for (let i = 0; i < NUMBER_OF_COUNTRIES; i++) {
        const randomNum = Math.floor(Math.random() * 250) + 1;
        selectedCountries.push(data[randomNum]);
      }

      setCountries(selectedCountries);
    }
    fetchCountries();
  }, []);

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
        <Country country={country} key={country.cca3} />
      ))}
    </ul>
  );
}

function Country({ country }) {
  return (
    <li className="country">
      <div className="country-name">
        <h2>{country.name.common}</h2>
        <p>{country.cca3}</p>
      </div>
      <p className="flag">{country.flag}</p>
    </li>
  );
}

export default App;
