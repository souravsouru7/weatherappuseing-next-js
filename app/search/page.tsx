'use client';

import { useState } from 'react';
import axios from 'axios';

interface WeatherData {
  name: string;
  temp: number;
  description: string;
}

export default function Search() {
    const [city, setCity] = useState<string>('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchWeather = async () => {
        if (!city.trim()) {
            setError('Please enter a city name');
            return;
        }
        
        const apiKey = "21b56c146ec9479a6489cb270711abda"; // Direct API key
        
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
            );
            setWeather({
                name: response.data.name,
                temp: response.data.main.temp,
                description: response.data.weather[0].description,
            });
        } catch (err: any) {
            if (err.response?.status === 401) {
                setError('Invalid API key. Please check your configuration.');
            } else if (err.response?.status === 404) {
                setError('City not found. Please check the city name.');
            } else {
                setError('An error occurred while fetching weather data.');
            }
            setWeather(null);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Weather Search
                </h1>
                
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
                        placeholder='Enter city name'
                        className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                    <button 
                        onClick={fetchWeather}
                        disabled={loading}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>

                {error && (
                    <div className="text-red-500 text-center mt-4 p-3 bg-red-50 rounded-lg">
                        {error}
                    </div>
                )}

                {weather && (
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-center text-gray-800">
                            {weather.name}
                        </h2>
                        <div className="mt-4 text-center">
                            <p className="text-5xl font-bold text-blue-600">
                                {Math.round(weather.temp)}°C
                            </p>
                            <p className="text-gray-600 capitalize mt-2 text-lg">
                                {weather.description}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 