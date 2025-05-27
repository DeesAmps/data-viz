import React, { useEffect, useState } from 'react';

interface CountryData {
  date: string;
  location: string;
  [key: string]: string | number;
}

const API_BASE = 'http://localhost:5000/api';

export default function App() {
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [data, setData] = useState<CountryData[]>([]);
  const [metric, setMetric] = useState<string>('new_cases');

  useEffect(() => {
    fetch(`${API_BASE}/countries`)
      .then(res => res.json())
      .then(json => setCountries(json.countries));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`${API_BASE}/data?country=${encodeURIComponent(selectedCountry)}&metric=${metric}`)
        .then(res => res.json())
        .then(json => setData(json));
    }
  }, [selectedCountry, metric]);

  return (
    <div style={{ padding: 24 }}>
      <h1>COVID-19 Data Dashboard</h1>
      <label>
        Country:
        <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
          <option value="">Select a country</option>
          {countries.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
      <label style={{ marginLeft: 16 }}>
        Metric:
        <select value={metric} onChange={e => setMetric(e.target.value)}>
          <option value="new_cases">New Cases</option>
          <option value="new_deaths">New Deaths</option>
          <option value="total_cases">Total Cases</option>
          <option value="total_deaths">Total Deaths</option>
        </select>
      </label>
      <div style={{ marginTop: 32 }}>
        {data.length > 0 ? (
          <table border={1} cellPadding={4}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Country</th>
                <th>{metric.replace('_', ' ').toUpperCase()}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.location}</td>
                  <td>{row[metric]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Select a country to view data.</p>
        )}
      </div>
    </div>
  );
}
