import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import KanbanTable from '../drag&drop/KanbanTable';
import './Profile.css';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [flipCard, setFlipCard] = useState(false);

  let data = {
    category: {
      color: '#ff2233',
      tag: 'Biernik',
    },
    word: 'Tworzyć',
    present: {
      ja: 'tworzę',
      ty: 'tworzysz',
      on_ona_ono: 'tworzy',
      my: 'tworzymy',
      wy: 'tworzycie',
      oni_one: 'tworzą',
    },
    past: {
      ja_masc: 'tworzyłem',
      ja_fem: 'tworzyłam',
      ty_masc: 'tworzyłeś',
      ty_fem: 'tworzyłaś',
      on: 'tworzył',
      ona: 'tworzyła',
      ono: 'tworzyło',
      my_masc: 'tworzyliśmy',
      my_fem: 'tworzyłyśmy',
      wy_masc: 'tworzyliście',
      wy_fem: 'tworzyłyście',
      oni: 'tworzyli',
      one: 'tworzyły',
    },

    link: {
      url: 'url',
      text: 'Image link',
    },
  };

  return (
    <>
      {isAuthenticated && <div>{JSON.stringify(user, null, 2)}</div>}

      <div className='card-item'>
        <div className='card-item-content'>
          <span
            className='card-item-tag'
            style={{ background: data.category.color }}
          >
            {data.category.tag}
          </span>
          <p>{data.text}</p>
          <KanbanTable data={data} flipCard={flipCard} />
          {data.link && (
            <a href={data.link.url} target='_blank' rel='noopener noreferrer'>
              {data.link.text}
            </a>
          )}
          <button onClick={() => setFlipCard(!flipCard)}>Flip card</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
