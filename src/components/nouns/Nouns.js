import React, { useEffect, useState, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from '@mui/material';
import { Button } from '../button/Button.js';
import Atom from '../spinner/Atom.js';
import NounsForm from './NounsForm.js';
import './Nouns.css';
import { dummyNounData } from '../../utils/dummyNounData.js';

const Nouns = () => {
  const { isAuthenticated } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(dummyNounData);
  const [showDetails, setShowDetails] = useState(
    Array(dummyNounData.length).fill(false)
  );

  const toggleDetails = (index) => {
    const newShowDetails = [...showDetails];
    newShowDetails[index] = !newShowDetails[index];
    setShowDetails(newShowDetails);
  };

  const onDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    console.log(newItems);
    setItems(newItems);
  };

  const modal = useMemo(() => {
    return (
      isAuthenticated && (
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
      )
    );
  }, [isAuthenticated, open]);

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
            style={{ display: showDetails[index] ? 'none' : 'block' }}
          />
          {showDetails[index] && (
            <div
              className='noun-description'
              onClick={() => toggleDetails(index)}
            >
              <p className='polish-english-word'>
                {item.polish_word} : {item.english_word}
              </p>

              <p className='short-sentence'>{item.notes}</p>

              <button onClick={() => onDelete(item.id)}>Delete</button>
            </div>
          )}
        </li>
      );
    });
  }, [items, showDetails]);

  return (
    <>
      {modal}
      {!isAuthenticated && (
        <h3 className='kanban-log-in-prompt'>Log in to add nouns</h3>
      )}
      {loadingIndicator}
      <ul className='unordered-list-nouns'>{nounListItems}</ul>
    </>
  );
};

export default Nouns;
