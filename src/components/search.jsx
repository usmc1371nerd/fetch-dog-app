
// example I found using gpt will need to change it to fit the UI I want

import React, { useState } from 'react';
import DogSelection from './dogselection';
import ZipCodeSelector from './zipcodeselctor';


const Search = () => {
  const [dogBreed, setDogBreed] = useState('');
  const [zipCode, setZipCode] = useState('');
  const email = useState('');
  const name = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Perform the search using dogBreed and zipCode values
    console.log('Performing search with dogBreed:', dogBreed, 'and zipCode:', zipCode);
    // ... your search logic here
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <ZipCodeSelector onSelectBreed={setZipCode} />
        <DogSelection email={email} name={name} onSelectBreed={setDogBreed} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;


// const Search = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(25);
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     // Fetch search results when currentPage or pageSize changes
//     fetchSearchResults();
//   }, [currentPage, pageSize]);

//   const fetchSearchResults = async () => {
//     try {
//       const response = await fetch(
//         `/dogs/search?from=${(currentPage - 1) * pageSize}&size=${pageSize}`
//       );
//       const data = await response.json();
//       setSearchResults(data.resultIds);
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   return (
//     <div>
//       {/* Render search results */}
//       {searchResults.map((result) => (
//         <div key={result.id}>{/* Render each search result */}</div>
//       ))}

//       {/* Pagination controls */}
//       <button onClick={handlePreviousPage}>Previous</button>
//       <span>Page {currentPage}</span>
//       <button onClick={handleNextPage}>Next</button>
//     </div>
//   );
// };

// export default Search;
