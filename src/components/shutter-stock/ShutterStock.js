import React, { useState } from 'react';
// import { CancelableFetch } from '../../utils/CancelableFetch.js';
import './ShutterStock.css';
import { Button } from '../button/Button';

const ShutterStock = () => {
  const [dataApi, setDataApi] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [searchParameter, setSearchParameter] = useState('');
  const [imageType, setImageType] = useState('illustration');

  const fetchData = async () => {
    // const controller = new AbortController();
    // const signal = controller.signal;

    // CancelableFetch(controller);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SHUTTERSTOCK_BASE_URL}/v2/images/search?image_type=${imageType}&per_page=10&query=${searchParameter}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SHUTTERSTOCK_TOKEN}`,
            'Accept-Encoding': 'gzip, deflate, br',
          },
          // signal,
        }
      );
      const data = await response.json();
      console.log(data.data[0].assets.huge_thumb.url);
      console.log(data.data);
      setDataApi(data.data);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Fetch request was aborted');
      } else {
        console.error(error);
      }
    }
  };

  const copyToClipboard = (src) => {
    navigator.clipboard.writeText(src);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
    setSearchParameter('');
  };

  return (
    <div>
      <form className='shutter-form-wrapper' onSubmit={handleSubmit}>
        <input
          className='shutter-form-search-parameter'
          type='text'
          value={searchParameter}
          onChange={(event) => setSearchParameter(event.target.value)}
          placeholder='Search image '
        />
        <select
          className='shutter-form-image-type'
          value={imageType}
          onChange={(event) => setImageType(event.target.value)}
        >
          <option value='illustration'>Illustration</option>
          <option value='vector'>Vector</option>
          <option value='photo'>Photo</option>
        </select>
        <Button
          buttonStyle='btn--add-new-verb'
          buttonSize='btn--medium'
          className='shutter-form-submit-button'
          type='submit'
        >
          Search
        </Button>
      </form>
      {showPopup && <div className='popup'>URL copied to clipboard</div>}
      <ul className='image-grid'>
        {dataApi &&
          dataApi.length > 0 &&
          dataApi.map((item) => (
            <li key={item.id}>
              <img
                src={item.assets.huge_thumb.url}
                alt={item.title}
                onDoubleClick={() =>
                  copyToClipboard(item.assets.huge_thumb.url)
                }
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ShutterStock;
