import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../button/Button.js';
import './NounsForm.css';

const initialNounFormData = {
  id: '',
  category: '',
  polish_word: '',
  english_word: '',
  image_url: '',
  notes: '',
};

const NounsForm = ({
  currentNoun,
  isEditing,
  setIsEditing,
  allNounsById,
  getFromExpressApp,
  setOpen,
}) => {
  const [noun, setNoun] = useState(initialNounFormData);
  const [editedNoun, setEditedNoun] = useState({});
  const [nounsArray, setNounsArray] = useState([]);

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

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

    if (isEditing) {
      allNounsById.forEach((el) => {
        if (el.id === currentNoun.id) {
          setEditedNoun({ ...el, [name]: value });
        } else {
          return;
        }
      });
    } else {
      setNoun({ ...noun, [name]: value });
    }
  };

  const putToExpressApp = async () => {
    try {
      const token = await getAccessTokenSilently();

      await fetch(
        `${process.env.REACT_APP_BASE_URL}/protected/nouns/noun/${user.sub}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedNoun),
        }
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const createNewNoun = (event) => {
    event.preventDefault();
    nounsArray.push(noun);
    setNoun({ ...initialNounFormData });
  };

  const updateNoun = () => {
    putToExpressApp();
    setOpen(false);
    setEditedNoun(initialNounFormData);
    setIsEditing(false);
    getFromExpressApp();
  };

  return (
    <>
      <div className='form-wrapper'>
        <form>
          {!isEditing && (
            <div className='submit-button'>
              <Button
                buttonStyle='btn--add-new-verb'
                buttonSize='btn--medium'
                id='submit-verb-button'
                type='submit'
                onClick={createNewNoun}
              >
                Create Noun
              </Button>
            </div>
          )}

          {isEditing && (
            <div className='close-modal-button'>
              <Button
                buttonStyle='btn--add-new-verb'
                buttonSize='btn--medium'
                onClick={updateNoun}
              >
                {isEditing ? 'Update Noun' : 'Editing'}
              </Button>
            </div>
          )}

          <label htmlFor='english_word'>English</label>
          <input
            ref={inputRef}
            placeholder='English'
            id='english_word'
            type='text'
            name='english_word'
            required
            onChange={handleChange}
            defaultValue={isEditing ? currentNoun.english_word : noun.word}
          />
          <label htmlFor='polish_word'>Polish</label>
          <input
            ref={inputRef}
            placeholder='Polish'
            id='polish_word'
            type='text'
            name='polish_word'
            required
            onChange={handleChange}
            defaultValue={isEditing ? currentNoun.polish_word : noun.word}
          />
          <label htmlFor='image_url'>Image URL</label>
          <input
            placeholder='Image URL'
            id='image_url'
            type='text'
            name='image_url'
            required
            onChange={handleChange}
            defaultValue={isEditing ? currentNoun.image_url : noun.image_url}
          />

          <div className='notes'>
            <label htmlFor='notes'>Your notes</label>
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
      </div>
    </>
  );
};

export default NounsForm;
