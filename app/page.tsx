import axios from "axios";

interface City {
  name: string;
  temperature: number;
  description: string;
}

async function getPopularCities() {
  const cities: string[] = ['New York', 'London', 'Tokyo'];
  const apiKey = "21b56c146ec9479a6489cb270711abda";
  
  try {
    const response = await Promise.all(cities.map((city) => (
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    )));
    
    return response.map((res) => ({
      name: res.data.name,
      temperature: res.data.main.temp,
      description: res.data.weather[0].description,
    }));
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return [];
  }
}

export default async function Home() {
  const popularCities = await getPopularCities();

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Popular Cities Weather
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularCities.map((city: City) => (
          <a href={`/weather/${city.name}`} key={city.name}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{city.name}</h2>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-blue-600">
                  {Math.round(city.temperature)}°C
                </p>
                <p className="text-gray-600 capitalize">
                  {city.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
