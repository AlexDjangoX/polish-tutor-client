import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../button/Button.js';
import './NounsForm.css';

const initialNounFormData = {
  polish_word: '',
  english_word: '',
  image_url: '',
  notes: '',
};

const NounsForm = () => {
  const [noun, setNoun] = useState(initialNounFormData);
  const [nounsArray, setNounsArray] = useState([]);
  const [currentNoun, setCurrentNoun] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef();

  const focusOnNounEntry = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    focusOnNounEntry();
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setNoun({ ...noun, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    nounsArray.push(noun);
    console.log(nounsArray);
    setNoun({ ...initialNounFormData });
  };

  return (
    <>
      <form>
        <div className='submit-button'>
          <Button
            buttonStyle='btn--add-new-verb'
            buttonSize='btn--medium'
            id='submit-verb-button'
            type='submit'
            onClick={handleSubmit}
          >
            {!isEditing ? 'Submit' : 'Update'}
          </Button>
        </div>
        <div className='close-modal-button'>
          <Button
            buttonStyle='btn--add-new-verb'
            buttonSize='btn--medium'
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        </div>

        <label htmlFor='word'>Word</label>
        <input
          ref={inputRef}
          placeholder='Nouns'
          id='word'
          type='text'
          name='word'
          required
          onChange={handleChange}
          defaultValue={isEditing ? currentNoun.word : noun.word}
        />
        <label htmlFor='image_url'>Word</label>
        <input
          ref={inputRef}
          placeholder='Image URL'
          id='image_url'
          type='text'
          name='image_url'
          required
          onChange={handleChange}
          defaultValue={isEditing ? currentNoun.image_url : noun.image_url}
        />

        <div className='notes'>
          <label htmlFor='Notes'>Your notes</label>
          <textarea
            id='notes'
            name='notes'
            rows='4'
            cols='50'
            placeholder='What would you like to say ?'
            fontFamily='Work sans'
            fontSize='28px'
            onChange={handleChange}
            defaultValue={isEditing ? currentNoun.notes : noun.notes}
          />
        </div>
      </form>
    </>
  );
};

export default NounsForm;
