import { Radio, useState, useEffect } from '@chakra-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

function RadioButtons(props) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { data } = props;
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = new Set();
  data.forEach((item) => categories.add(item.category));

  const getFromExpressApp = async () => {
    try {
      const token = await getAccessTokenSilently();

      if (selectedCategory) {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/protected/verb/category/${user.sub}`,
          {
            method: 'GET',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            body: JSON.stringify({ category: selectedCategory }),
          }
        );

        const returnFromGetRequest = await response.json();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {}, [selectedCategory]);

  return (
    <div className='radio-buttons' style={{ display: 'grid' }}>
      {[...categories].map((category) => (
        <Radio
          key={category}
          value={category}
          onChange={() => setSelectedCategory(category)}
          className='radio-button'
          style={{ gridRow: 'auto' }}
        >
          {category}
        </Radio>
      ))}
    </div>
  );
}

export default RadioButtons;
