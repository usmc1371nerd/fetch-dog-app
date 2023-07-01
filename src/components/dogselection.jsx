import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';


 
// const DogSelection = () => {
//   const [dogBreeds, setDogBreeds] = useState([]);
//   const { email, name, cookies } = useParams();
//   // const navigate = useNavigate()
  
//   console.log( email,name, cookies)
//   useEffect(() => {
//     loginAndFetchDogBreeds();
//   },[email, name, cookies] );


//   const loginAndFetchDogBreeds = async () => {
//     try {
//       const loginResponse = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, name, cookies }),
//         credentials: 'include',
//       });

//       if (loginResponse.ok) {
//         // Login successful, fetch dog breeds
//         const dogBreedsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
//           method: 'GET',
//           credentials: 'include',
//         },
//         console.log(dogBreedsResponse)
//         );

//         if (dogBreedsResponse.ok) {
//           const breeds = await dogBreedsResponse.json();
//           setDogBreeds(breeds);
          
//         } else {
//           console.log('Error fetching dog breeds');
//         }
//       } else {
//         console.log('Login failed');
//       }
//     } catch (error) {
//       console.log('Error logging in and fetching dog breeds:', error);
//     }
  
//   };
  
 
//   return (
//     <div>
//       <div>Hi {name}</div>
//       <label htmlFor="dogSelect">Select a dog breed:</label>
//       <select id="dogSelect">
//         {dogBreeds.map((breed, index) => (
//           <option key={index} value={breed}>
//             {breed}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };




  const DogSelection = () => {

    const [dogBreeds, setDogBreeds] = useState([]);
    const { email, name } = useParams();
    // const navigate = useNavigate();

    useEffect(() => {
      loginAndFetchDogBreeds();
    }, [email, name]);
  
    const loginAndFetchDogBreeds = async () => {
      try {
        const loginPayLoad = JSON.stringify({email, name});
        console.log(loginPayLoad);

        const loginResponse = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: loginPayLoad,
          credentials: 'include',
        });
  
        if (loginResponse.ok) {
          console.log('Login successful')
          console.log(email, name)
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
  
  return (
    
    <div>




 

    <div>
      <label htmlFor="dogSelect">Select a dog breed:</label>
      <select id="dogSelect">
        {dogBreeds.map((breed, index) => (
          <option key={index} value={breed}>
            {breed}
          </option>
        ))}
      </select>
    </div>
  





    </div>
  )
}



export default DogSelection;

