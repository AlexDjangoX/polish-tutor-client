import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Radio } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

function RadioButtons({ verbArray, setItems }) {
  const { user, getAccessTokenSilently } = useAuth0();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = new Set();
  verbArray.forEach((item) => categories.add(item.category));

  const getFromExpressApp = async () => {
    try {
      const token = await getAccessTokenSilently();

      console.log(selectedCategory);

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
    <div style={{ display: 'grid', color: 'black' }} padding={120}>
      {[...categories].map((category) => (
        <>
          <ChakraProvider>
            <Radio
              key={uuidv4()}
              value={category}
              onChange={() => setSelectedCategory(category)}
              className='radio-button'
              style={{ gridRow: 'auto' }}
              name='categories'
              color={'purple'}
            >
              {category}
            </Radio>
          </ChakraProvider>
        </>
      ))}
    </div>
  );
}

export default RadioButtons;
