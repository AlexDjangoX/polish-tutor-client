import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth0 } from '@auth0/auth0-react';
import './RadioButtons.css';

function RadioButtons({ items, setItems }) {
  const { user, getAccessTokenSilently } = useAuth0();

  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = items
    .map((item) => item.category)
    .filter((category, index, self) => self.indexOf(category) === index);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const getFromExpressApp = async () => {
    try {
      const token = await getAccessTokenSilently();

      if (selectedCategory) {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/protected/verb/category/${user.sub}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category: selectedCategory }),
          }
        );

        const returnFromGetRequest = await response.json();
        const dataToRender = returnFromGetRequest.data;
        setItems(dataToRender);

        console.log('Data to Render : ', dataToRender);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getFromExpressApp();
  }, [selectedCategory]);

  return (
    <div>
      {categories.map((category) => (
        <div key={category} className='input-div'>
          <input
            key={uuidv4()}
            type='radio'
            value={category}
            checked={selectedCategory === category}
            onChange={handleChange}
            className='radio-button'
          />
          {category}
        </div>
      ))}
    </div>
  );
}

export default RadioButtons;
