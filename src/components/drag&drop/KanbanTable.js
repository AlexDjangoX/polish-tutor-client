import React from 'react';
import './KanbanTable.css';

const KanbanTable = ({ item, column }) => {
  return (
    <>
      {column.name === 'Nowe słowa' && (
        <>
          <div className='table-wrapper'>
            <table>
              <tbody>
                <tr>
                  <td>{item.present_ja}</td>
                  <td>{item.present_ty}</td>
                  <td>{item.present_on_ona_ono}</td>
                </tr>
                <tr>
                  <td>{item.present_my}</td>
                  <td>{item.present_wy}</td>
                  <td>{item.present_oni_one}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='card-image'>
            {item.link_url && (
              <img src={item.link_url} alt='img' height='150' width='200' />
            )}
          </div>
        </>
      )}
      {column.name === 'Czas przeszły niedokonany' && (
        <div className='table-wrapper'>
          <table>
            <tbody>
              <tr>
                <td className='feminine'>{item.past_ja_fem}</td>
                <td className='masculine'>{item.past_ja_masc}</td>
              </tr>
              <tr>
                <td className='feminine-alt'>{item.past_ty_fem}</td>
                <td className='masculine-alt'>{item.past_ty_masc}</td>
              </tr>
              <tr>
                <td className='feminine'>{item.past_ona}</td>
                <td className='masculine'>{item.past_on}</td>
              </tr>
              <tr>
                <td className='neuter'>{item.past_ono}</td>
                <td className='masculine-alt'>{item.past_my_masc}</td>
              </tr>
              <tr>
                <td className='feminine'>{item.past_my_fem}</td>
                <td className='masculine'>{item.past_wy_masc}</td>
              </tr>
              <tr>
                <td className='feminine-alt'>{item.past_wy_fem}</td>
                <td className='masculine-alt'>{item.past_oni}</td>
              </tr>
              <tr>
                <td className='feminine'>{item.past_one}</td>
                <td>{item.english_word}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {column.name === 'Czas przyszły niedokonany' && (
        <div className='table-wrapper'>
          <table>
            <tbody>
              <tr>
                <td>{item.imp_future_ja || 'Nie ma'}</td>
                <td>{item.imp_future_ty || 'Nie ma'}</td>
              </tr>
              <tr>
                <td>{item.imp_future_on_ona_ono || 'Nie ma'}</td>
                <td>{item.imp_future_my || 'Nie ma'}</td>
              </tr>
              <tr>
                <td>{item.imp_future_wy || 'Nie ma'}</td>
                <td>{item.imp_future_oni_one || 'Nie ma'}</td>
              </tr>
              <tr>
                <td className='feminine'>{item.future_fem_ja}</td>
                <td className='masculine'>{item.future_masc_ja}</td>
              </tr>
              <tr>
                <td className='feminine-alt'>{item.future_fem_ty}</td>
                <td className='masculine-alt'>{item.future_masc_ty}</td>
              </tr>
              <tr>
                <td className='feminine'>{item.future_fem_ona}</td>
                <td className='masculine'>{item.future_masc_on}</td>
              </tr>
              <tr>
                <td className='feminine-alt'>{item.future_fem_my}</td>
                <td className='masculine-alt'>{item.future_masc_my}</td>
              </tr>
              <tr>
                <td className='feminine'>{item.future_fem_wy}</td>
                <td className='masculine'>{item.future_masc_wy}</td>
              </tr>
              <tr>
                <td className='feminine-alt'>{item.future_fem_oni}</td>
                <td className='masculine-alt'>{item.future_masc_on}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default KanbanTable;
