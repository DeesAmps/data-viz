import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, BarChart, Bar, AreaChart, Area, Brush
} from 'recharts';

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
  const [worldData, setWorldData] = useState<CountryData[]>([]);
  const [metric, setMetric] = useState<string>('new_cases');
  const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>('line');

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

  useEffect(() => {
    fetch(`${API_BASE}/data?country=World&metric=${metric}`)
      .then(res => res.json())
      .then(json => setWorldData(json));
  }, [metric]);

  return (
    <div style={{ padding: 24 }}>
      <h1>COVID-19 Data Dashboard</h1>
      <h2>World Summary</h2>
      <div style={{ width: '100%', height: 400, marginBottom: 32 }}>
        <div style={{ marginBottom: 8 }}>
          <label>Chart Type: </label>
          <select value={chartType} onChange={e => setChartType(e.target.value as any)}>
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="area">Area</option>
          </select>
        </div>
        {chartType === 'line' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={worldData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" minTickGap={40} />
              <YAxis tickFormatter={value => value.toLocaleString()} width={100} reversed={false} allowDataOverflow={true} domain={[0, 'auto']} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={metric} stroke="#8884d8" dot={false} />
              <Brush dataKey="date" height={30} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        )}
        {chartType === 'bar' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={worldData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" minTickGap={40} />
              <YAxis tickFormatter={value => value.toLocaleString()} width={100} reversed={false} allowDataOverflow={true} domain={[0, 'auto']} />
              <Tooltip />
              <Legend />
              <Bar dataKey={metric} fill="#82ca9d" />
              <Brush dataKey="date" height={30} stroke="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )}
        {chartType === 'area' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={worldData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" minTickGap={40} />
              <YAxis tickFormatter={value => value.toLocaleString()} width={100} reversed={false} allowDataOverflow={true} domain={[0, 'auto']} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey={metric} stroke="#8884d8" fill="#8884d8" />
              <Brush dataKey="date" height={30} stroke="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
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
          <>
            <div style={{ marginBottom: 8 }}>
              <label>Chart Type: </label>
              <select value={chartType} onChange={e => setChartType(e.target.value as any)}>
                <option value="line">Line</option>
                <option value="bar">Bar</option>
                <option value="area">Area</option>
              </select>
            </div>
            {chartType === 'line' && (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" minTickGap={40} />
                  <YAxis tickFormatter={value => value.toLocaleString()} width={100} reversed={false} allowDataOverflow={true} domain={[0, 'auto']} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey={metric} stroke="#8884d8" dot={false} />
                  <Brush dataKey="date" height={30} stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            )}
            {chartType === 'bar' && (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" minTickGap={40} />
                  <YAxis tickFormatter={value => value.toLocaleString()} width={100} reversed={false} allowDataOverflow={true} domain={[0, 'auto']} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={metric} fill="#82ca9d" />
                  <Brush dataKey="date" height={30} stroke="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            )}
            {chartType === 'area' && (
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" minTickGap={40} />
                  <YAxis tickFormatter={value => value.toLocaleString()} width={100} reversed={false} allowDataOverflow={true} domain={[0, 'auto']} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey={metric} stroke="#8884d8" fill="#8884d8" />
                  <Brush dataKey="date" height={30} stroke="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            )}
            <table border={1} cellPadding={4} style={{ marginTop: 24 }}>
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
          </>
        ) : (
          <p>Select a country to view data.</p>
        )}
      </div>
    </div>
  );
}
