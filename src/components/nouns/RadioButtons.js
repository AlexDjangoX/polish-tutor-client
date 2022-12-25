import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './RadioButtons.css';

function RadioButtons({ selectedCategory, setSelectedCategory, allNounsById }) {
  const categories = allNounsById
    .map((item) => item.category)
    .filter((category, index, self) => self.indexOf(category) === index);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <div className='input-div'>
        <input
          key={uuidv4()}
          type='radio'
          value={'All nouns'}
          checked={selectedCategory === 'All nouns'}
          onChange={handleChange}
          className='radio-button'
        />
        {'All'}
      </div>

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
