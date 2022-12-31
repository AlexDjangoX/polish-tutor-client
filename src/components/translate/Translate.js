import React, { useState } from 'react';
const axios = require('axios');

const Translate = () => {
  const [stringToTranslate, setStringToTranslate] = useState('');
  const [translatedString, setTranslatedString] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [translationLanguage, setTranslationLanguage] = useState('pl');

  const handleTranslation = (event) => {
    event.preventDefault();
    setIsFetching(true);

    const options = {
      method: 'POST',
      url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
      params: {
        'api-version': '3.0',
        'to[0]': `${translationLanguage}`,
        textType: 'plain',
        profanityAction: 'NoAction',
      },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
        'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host,
      },

      data: `[{"Text":"${stringToTranslate}"}]`,
    };

    axios
      .request(options)
      .then(function (response) {
        setTranslatedString(response.data[0].translations[0].text);
        setStringToTranslate('');
        setIsFetching(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleChangeTranslationField = (event) => {
    const { value } = event.target;
    setStringToTranslate(value);
  };

  return (
    <>
      <div className='text-to-translate'>
        <textarea
          onChange={handleChangeTranslationField}
          placeholder='Tekst do przetłumaczenia'
          name='english'
          value={stringToTranslate}
          fontFamily='Work sans'
          fontSize='28px'
        ></textarea>
      </div>
      <div className='translated-text'>
        <textarea
          name='polish'
          placeholder='Przetłumaczony tekst'
          fontFamily='Work sans'
          defaultValue={translatedString}
          fontSize='28px'
        ></textarea>
      </div>
      <button onClick={handleTranslation}>Translate</button>
    </>
  );
};

export default Translate;
