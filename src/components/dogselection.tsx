import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DogSelection = ({onDogBreedsUpdate}) => {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');

  const { email, name } = useParams();

  useEffect(() => {
    loginAndFetchDogBreeds();
  }, [email, name]);

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
        const dogBreedsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
          method: 'GET',
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


  const handleBreedSelect = (event) => {
    setSelectedBreed(event.target.value);
    onDogBreedsUpdate([event.target.value]);
  };

  return (
    <div>
      <label htmlFor="dogSelect">Select a dog breed:</label>
      <select id="dogSelect" value={selectedBreed} onChange={handleBreedSelect}>
  <option value="">Select Breed</option>
  {dogBreeds.map((breed, index) => (
    <option key={index} value={breed}>
      {breed}
    </option>
  ))}
</select>
      <div> {selectedBreed}</div>
    </div>
  );
};

export default DogSelection;
