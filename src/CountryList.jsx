import Country from './Country';

export default function CountryList({ countries, onSelectCountry }) {
  return (
    <ul className="container list list-countries">
      {countries.map((country) => (
        <Country
          country={country}
          key={country.cca3}
          onSelectCountry={onSelectCountry}
        />
      ))}
    </ul>
  );
}
