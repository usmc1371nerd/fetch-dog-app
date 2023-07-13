import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DogSelection from './dogselection.tsx';
import './search.css'

const DogSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [dogBreeds, setDogBreeds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(25);


  const { email, name } = useParams();

  useEffect(() => {
    loginAndFetchLocations();
    loginAndFetchDogBreeds();
  }, [email, name]);

  const loginAndFetchLocations = async () => {
    try {
      const loginPayload = JSON.stringify({ email, name });

      const loginResponse = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: loginPayload,
        credentials: 'include',
      });

      if (loginResponse.ok) {
        console.log('Login successful');
        console.log(email, name);
        const searchResults = await fetch('https://frontend-take-home-service.fetch.com/locations/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: loginPayload,
          credentials: 'include',
        });

        if (searchResults.ok) {
          const data = await searchResults.json();
          const results = data.results;
          setSearchResults(results);
          console.log(results);
        } else {
          console.log('Error fetching locations');
        }
      } else {
        const errorText = await loginResponse.text();
        console.log('Login failed', errorText);
      }
    } catch (error) {
      console.log('Error logging in and fetching locations:', error);
    }
  };

  const loginAndFetchDogBreeds = async () => {
    try {
      const loginPayload = JSON.stringify({ email, name });

      const loginResponse = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: loginPayload,
        credentials: 'include',
      });

      if (loginResponse.ok) {
        console.log('Login successful');
        console.log(email, name);
        const dogBreedsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (dogBreedsResponse.ok) {
          const breeds = await dogBreedsResponse.json();
          setDogBreeds(breeds);
        } else {
          console.log('Error fetching dog breeds');
        }
      } else {
        const errorText = await loginResponse.text();
        console.log('Login failed', errorText);
      }
    } catch (error) {
      console.log('Error logging in and fetching dog breeds:', error);
    }
  };

  useEffect(() => {
    const filteredResults = searchResults.filter((result) => {
      const { city, state, zip_code } = result;
      const searchRegex = new RegExp(searchQuery, 'i');
      return searchRegex.test(city) || searchRegex.test(state) || searchRegex.test(zip_code);
    });

    setFilteredResults(filteredResults);
  }, [searchResults, searchQuery]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleDogBreedsUpdate = (breeds) => {
    setDogBreeds(breeds);
  };

  const generateRandomBreed = () => {
    const randomIndex = Math.floor(Math.random() * dogBreeds.length);
    return dogBreeds[randomIndex];
  };

  const handleSearchSubmit = () => {
    let selectedBreed = dogBreeds[0];
    if (dogBreeds.length > 0) {
      selectedBreed = generateRandomBreed();
    }

    let selectedDog;
    if (!selectedLocation) {
      const randomDogs = [];
      for (let i = 0; i < 50; i++) {
        const breed = generateRandomBreed();
        const name = generateRandomName();
        const age = generateRandomAge();
        const location = filteredResults[Math.floor(Math.random() * filteredResults.length)].city;

        const dogInfo = `Dog Breed: ${breed}`;
        const dogName = `Dog Name: ${name}`;
        const dogAge = `Dog Age: ${age}`;
        const dogLocation = `Location: ${location}`;

        randomDogs.push([dogInfo, dogName, dogAge, dogLocation]);
      }

      setDisplayedResults(randomDogs);
    } else {
      const randomName = generateRandomName();
      const randomAge = generateRandomAge();

      selectedDog = {
        breed: selectedBreed,
        name: randomName,
        age: randomAge,
        location: selectedLocation,
      };

      const dogInfo = `Dog Breed: ${selectedDog.breed}`;
      const dogName = `Dog Name: ${selectedDog.name}`;
      const dogAge = `Dog Age: ${selectedDog.age}`;
      const dogLocation = `Location: ${selectedDog.location}`;

      setDisplayedResults([dogInfo, dogName, dogAge, dogLocation]);
    }
  };

  const generateRandomName = () => {
    // Generate random names as per your requirement
    const names = ['Buddy', 'Max', 'Charlie', 'Cooper', 'Rocky'];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  };

  const generateRandomAge = () => {
    // Generate random ages as per your requirement
    const minAge = 1;
    const maxAge = 10;
    return Math.floor(Math.random() * (maxAge - minAge + 1) + minAge);
  };
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = displayedResults.slice(indexOfFirstResult, indexOfLastResult);

  const totalPages = Math.ceil(displayedResults.length / resultsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <label htmlFor="locationSelect">Select location:</label>
      <select id="locationSelect" value={selectedLocation} onChange={handleLocationChange}>
        <option value="">Please select a location</option>
        {filteredResults.map((result, index) => (
          <option key={index} value={result.city}>
            {result.city}
          </option>
        ))}
      </select>
      <div>{selectedLocation}</div>
      <DogSelection onDogBreedsUpdate={handleDogBreedsUpdate} dogBreeds={dogBreeds} />
      <button type="button" onClick={handleSearchSubmit}>Submit</button>
      <div className='displayedResults'>
        {currentResults.map((result, index) => (
          <div key={index}>{result}</div>
        ))}
      </div>
      <div className='pagination'>
        <button type="button" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button type="button" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};


export default DogSearch;
