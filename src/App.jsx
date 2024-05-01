import { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import ScoreBoard from './ScoreBoard';
import CountryList from './CountryList';

// `https://restcountries.com/v3.1/all?fields=cca3,name,flag`

const NUMBER_OF_COUNTRIES = 8;

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  function handleSelectCountry(country) {
    // If country has already been selected, game over and reset relevant state
    if (selectedCountries.includes(country.cca3)) {
      score > highScore && setHighScore(score);
      setIsGameOver(true);
      setCountries([]);
      setSelectedCountries([]);
      setScore(0);
      return;
    }

    // Add country to selected countries array
    setSelectedCountries([...selectedCountries, country.cca3]);
    // Increment score
    setScore((score) => score + 1);

    // If player has won
    if (
      selectedCountries.length === NUMBER_OF_COUNTRIES - 1 &&
      !selectedCountries.includes(country.cca3)
    ) {
      setIsGameOver(true);
      setScore(0);
      setCountries([]);
      score > highScore && setHighScore(NUMBER_OF_COUNTRIES);
    }

    // Shuffle array of countries
    let shuffledCountries = countries
      .map((country) => ({ country, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ country }) => country);

    setCountries(shuffledCountries);
  }

  useEffect(() => {
    async function fetchCountries() {
      try {
        setIsGameOver(false);
        setIsLoading(true);
        const res = await fetch(
          `https://restcountries.com/v3.1/all?fields=cca3,name,flag`
        );

        if (!res.ok)
          throw new Error('Something went wrong with fetching country data');

        const data = await res.json();

        // Create an array of random numbers between 0 and length of array - 1
        let randomArr = [];
        let randomNum = Math.floor(Math.random() * (data.length - 1)) + 1;
        let randomCountries = [];

        for (let i = 0; i < NUMBER_OF_COUNTRIES; i++) {
          while (randomArr.includes(randomNum)) {
            randomNum = Math.floor(Math.random() * (data.length - 1)) + 1;
          }
          randomArr.push(randomNum);
        }

        randomArr.forEach((num) => {
          randomCountries.push(data[num]);
        });

        setCountries(randomCountries);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCountries();
  }, [isGameOver]);

  return (
    <>
      <header className="header">
        <h1>Memory Game</h1>
        <p>
          Score points by clicking on a country, but don't click any country
          more than once!
        </p>
        <ScoreBoard score={score} highScore={highScore} />
      </header>
      <main>
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <CountryList
            countries={countries}
            onSelectCountry={handleSelectCountry}
          />
        )}
        {error && <ErrorMessage message={error} />}
      </main>
      <footer className="footer">
        <p>
          Built by <a href="https://github.com/laurenchamps">Lauren Champs</a>{' '}
          &copy;2024
        </p>
      </footer>
    </>
  );
}

export default App;
