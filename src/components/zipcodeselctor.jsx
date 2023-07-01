import React, { useState, useEffect } from 'react';
import axios from 'axios';


const DogSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [distance, setDistance] = useState(0);
  const [results, setResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in (e.g., by checking the existence of a cookie)
    const userIsLoggedIn = checkUserLoggedIn();
    setIsLoggedIn(userIsLoggedIn);
    console.log(userIsLoggedIn)
  }, []);

  const checkUserLoggedIn = () => {
    // Implement the logic to check if the user is logged in (e.g., by checking the existence of a cookie)
    // Return true if the user is logged in, false otherwise
    // You can use a library like js-cookie to handle cookies
    // Example:
    // return Cookies.get('authToken') !== undefined;
    // Replace the example implementation with your actual authentication logic
    return false;
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    try {
      // Set the authentication token in the request headers
      const authToken = 'your_auth_token';
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

      const response = await axios.post('https://frontend-take-home-service.fetch.com/locations/search');
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  const filteredResults = results.filter((result) => {
    const { city, state, zip_code } = result;
    const searchRegex = new RegExp(searchQuery, 'i');
    return searchRegex.test(city) || searchRegex.test(state) || searchRegex.test(zip_code);
  });

  const resultsWithinDistance = distance > 0 ? filteredResults.filter((result) => {
    const { latitude, longitude } = result;
    // Replace `userLatitude` and `userLongitude` with the user's actual coordinates
    const userLatitude = 0;
    const userLongitude = 0;
    const distanceInMiles = calculateDistanceInMiles(userLatitude, userLongitude, latitude, longitude);
    return distanceInMiles <= distance;
  }) : filteredResults;

  const calculateDistanceInMiles = (lat1, lon1, lat2, lon2) => {
    // Implementation of distance calculation between two coordinates using the Haversine formula
    // You can replace this with your preferred method for calculating distances

    const earthRadiusInMiles = 3958.8; // Radius of the Earth in miles

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusInMiles * c;

    return distance;
  };

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  return (
    <div>
      <div>
        <label htmlFor="searchQuery">Search by City, State, or ZIP Code:</label>
        <input type="text" id="searchQuery" value={searchQuery} onChange={handleSearchQueryChange} />
      </div>
      <div>
        <label htmlFor="distance">Distance (miles):</label>
        <select id="distance" value={distance} onChange={handleDistanceChange}>
          <option value="0">All</option>
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="15">15 miles</option>
          <option value="20">20 miles</option>
          <option value="25">25 miles</option>
          <option value="30">30 miles</option>
        </select>
      </div>
      <ul>
        {resultsWithinDistance.map((result, index) => (
          <li key={index}>
            <strong>City:</strong> {result.city}, <strong>State:</strong> {result.state}, <strong>ZIP Code:</strong> {result.zip_code}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DogSearch;
