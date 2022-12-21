import React, { useState, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from '@mui/material';
import { Button } from '../button/Button.js';
import RadioButtons from './RadioButtons.js';
import Atom from '../spinner/Atom.js';
import NounsForm from './NounsForm.js';
import './Nouns.css';
import { dummyNounData } from '../../utils/dummyNounData.js';

const Nouns = () => {
  const { isAuthenticated } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleDetails = (index) => {
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  const onDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    console.log(newItems);
    setItems(newItems);
  };

  const editNoun = () => {
    return;
  };

  const loadingIndicator = useMemo(() => {
    return (
      isLoading && <Atom size='200' color='#54a8f1' animationDuration='700' />
    );
  }, [isLoading]);

  const nounListItems = useMemo(() => {
    return items.map((item, index) => {
      return (
        <li className='list-item-nouns' key={uuidv4()}>
          <img
            className='noun-image-to-display'
            src={item.image_url}
            alt={item.polish_word}
            onClick={() => toggleDetails(index)}
            style={{ display: activeIndex === index ? 'none' : 'block' }}
          />
          {activeIndex === index && (
            <div
              className='noun-description'
              onClick={() => toggleDetails(index)}
            >
              <div className='wrapper-noun-description'>
                <p className='polish-english-word'>
                  {item.polish_word} &rarr; {item.english_word}
                </p>

                <p className='short-sentence'>{item.notes}</p>
              </div>
              <div className='wrapper-noun-buttons'>
                <div className='noun-buttons'>
                  <Button
                    buttonStyle='btn-delete-noun'
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </Button>
                  <Button buttonStyle='btn-edit-noun' onClick={editNoun}>
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          )}
        </li>
      );
    });
  }, [items, activeIndex]);

  return (
    <>
      {isAuthenticated && (
        <>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby='parent-modal-title'
            aria-describedby='parent-modal-description'
          >
            <div>
              <NounsForm />
            </div>
          </Modal>
          <div className='add-noun-button-wrapper'>
            <Button
              buttonStyle='btn-add-noun'
              buttonSize='btn--medium'
              onClick={() => setOpen(true)}
            >
              Add Noun
            </Button>
          </div>
        </>
      )}

      {!isAuthenticated && (
        <h3 className='kanban-log-in-prompt'>Log in to add nouns</h3>
      )}
      {loadingIndicator}
      <div className='wrapper-list-buttons'>
        <div className='wrapper-image-list'>
          <ul className='unordered-list-nouns'>{nounListItems}</ul>
        </div>
        <div className='wrapper-radio-buttons'>
          <RadioButtons verbArray={dummyNounData} setItems={setItems} />
        </div>
      </div>
    </>
  );
};

export default Nouns;
