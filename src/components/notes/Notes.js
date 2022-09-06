import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../button/Button';

import './Notes.css';

const Notes = ({ columns, setColumns }) => {
  const location = useLocation();
  const { item } = location.state;
  const [data, setData] = useState(item);
  const axios = require('axios');

  useEffect(() => {
    axios
      .get(`http://localhost:8000/position`)
      .then(function (response) {
        setColumns(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleChangeTextField = (event) => {
    const { name, value } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const postToDb = () => {
    axios
      .post(`http://localhost:8000/position`, columns)
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (columns.columnFour?.items) {
      const itemsArray = columns.columnFour.items;

      itemsArray.forEach((el, index) => {
        if (el.id === item.id) itemsArray[index] = data;
      });

      postToDb();
    }
  };

  return (
    <>
      <div className='notes-wrapper'>
        <div className='table-wrapper-present'>
          <table>
            <tbody>
              <tr>
                <td>{data.word_image.english_word}</td>
                <td>{data.present.present_ja}</td>
                <td>{data.present.present_ty}</td>
                <td>{data.present.present_on_ona_ono}</td>
                <td>{data.present.present_my}</td>
                <td>{data.present.present_wy}</td>
                <td>{data.present.present_oni_one}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='card-image'>
          {data.word_image.image_url && (
            <img
              src={data.word_image.image_url}
              alt='img'
              height='150'
              width='200'
            />
          )}
        </div>
        <div className='table-wrapper-past'>
          <table>
            <tbody>
              <tr>
                <td className='masculine'>{data.past.past_ja_masc}</td>
                <td className='masculine-alt'>{data.past.past_ty_masc}</td>
                <td className='masculine'>{data.past.past_on_masc}</td>
                <td className='masculine-alt'>{data.past.past_my_masc}</td>
                <td className='masculine'>{data.past.past_wy_masc}</td>
                <td className='masculine-alt'>{data.past.past_oni_masc}</td>
              </tr>
              <tr>
                <td className='feminine'>{data.past.past_ja_fem}</td>
                <td className='feminine-alt'>{data.past.past_ty_fem}</td>
                <td className='feminine'>{data.past.past_ona_fem}</td>
                <td className='feminine'>{data.past.past_my_fem}</td>
                <td className='feminine-alt'>{data.past.past_wy_fem}</td>
                <td className='feminine'>{data.past.past_one_fem}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='table-wrapper-future'>
          <table>
            <tbody>
              <tr>
                <td>{data.imp_future.imp_future_ja}</td>
                <td>{data.imp_future.imp_future_ty}</td>
                <td>{data.imp_future.imp_future_on_ona_ono}</td>
                <td>{data.imp_future.imp_future_my}</td>
                <td>{data.imp_future.imp_future_wy}</td>
                <td>{data.imp_future.imp_future_oni_one}</td>
              </tr>
              <tr>
                <td className='masculine'>{data.future_masc.future_masc_ja}</td>
                <td className='masculine-alt'>
                  {data.future_masc.future_masc_ty}
                </td>
                <td className='masculine'>{data.future_masc.future_masc_on}</td>
                <td className='masculine-alt'>
                  {data.future_masc.future_masc_my}
                </td>
                <td className='masculine'>{data.future_masc.future_masc_wy}</td>
                <td className='masculine-alt'>
                  {data.future_masc.future_masc_oni}
                </td>
              </tr>
              <tr>
                <td className='feminine'>{data.future_fem.future_fem_ja}</td>

                <td className='feminine-alt'>
                  {data.future_fem.future_fem_ty}
                </td>
                <td className='feminine'>{data.future_fem.future_fem_ona}</td>

                <td className='feminine-alt'>
                  {data.future_fem.future_fem_my}
                </td>

                <td className='feminine'>{data.future_fem.future_fem_wy}</td>

                <td className='feminine-alt'>
                  {data.future_fem.future_fem_one}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='user-notes-input'>
        <form>
          <p>
            <label className='user-notes-input-label' htmlFor='notes'>
              Notatki
            </label>
          </p>
          <div className='submit-button-notes'>
            <Button
              buttonStyle='btn-add-new-verb'
              buttonSize='btn--medium'
              id='submit-verb-button'
              type='submit'
              onClick={handleSubmit}
            >
              Update notes
            </Button>
          </div>
          <textarea
            id='notes'
            name='notes'
            rows='4'
            cols='25'
            value={data.notes}
            onChange={handleChangeTextField}
          >
            {data.notes}
          </textarea>
        </form>
      </div>
    </>
  );
};

export default Notes;
