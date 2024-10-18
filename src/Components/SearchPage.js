// SearchPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../App.css'; 

const SearchPage = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate(); // For navigation

  const UNSPLASH_ACCESS_KEY = '2dAgWRg0V1uiwtdePJaKTg_dC65CaewPi81a4n9o1i4'; 

  const fetchImages = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query, per_page: 12 }, 
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });
      setImages(response.data.results);
    } catch (error) {
      console.error('Error fetching images from Unsplash:', error);
    }
  };

  const handleAddCaptionClick = (imageUrl) => {
    console.log('Navigating with image URL:', imageUrl); 
    navigate('/add-caption', { state: { imageUrl } }); // Pass image URL to AddCaptionPage
  };

  return (
    <div>
      <h2>Name: Sunny Rastogi</h2>
      <p>Email: ersunnyrastogi22@gmail.com</p>
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchImages();
        }}
      >
        <input
          type="text"
          placeholder="Enter your search term"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="image-grid">
        {images.map((img) => (
          <div key={img.id} className="image-card">
            <img src={img.urls.small} alt={img.alt_description || 'Image'} />
            <button onClick={() => handleAddCaptionClick(img.urls.small)}>Add Caption</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
