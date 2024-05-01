export default function Country({ country, onSelectCountry }) {
  return (
    <li className="country" onClick={() => onSelectCountry(country)}>
      <div className="country-name">
        <h2>{country.name.common}</h2>
        <p>{country.cca3}</p>
      </div>
      <p className="flag">{country.flag}</p>
    </li>
  );
}
