import React from 'react';
import './KanbanTable.css';

const KanbanTable = ({ item, column }) => {
  return (
    <>
      {column.name === 'Nowe słowa' && (
        <>
          <table>
            <tbody>
              <tr>
                <td>{item.content.present.ja}</td>
                <td>{item.content.present.ty}</td>
                <td>{item.content.present.on_ona_ono}</td>
              </tr>
              <tr>
                <td>{item.content.present.my}</td>
                <td>{item.content.present.wy}</td>
                <td>{item.content.present.oni_one}</td>
              </tr>
            </tbody>
          </table>
          <div className='card-image'>
            {item.content.link && (
              <img
                src={item.content.link.url}
                alt='img'
                height='150'
                width='200'
              />
            )}
          </div>
        </>
      )}
      {column.name === 'Niedoskonała przyszłość' && (
        <table>
          <tbody>
            <tr>
              <td className='feminine'>{item.content.past.ja_fem}</td>
              <td className='masculine'>{item.content.past.ja_masc}</td>
            </tr>
            <tr>
              <td className='feminine-alt'>{item.content.past.ty_fem}</td>
              <td className='masculine-alt'>{item.content.past.ty_masc}</td>
            </tr>
            <tr>
              <td className='feminine'>{item.content.past.ona}</td>
              <td className='masculine'>{item.content.past.on}</td>
            </tr>
            <tr>
              <td className='neuter'>{item.content.past.ono}</td>
              <td className='masculine-alt'>{item.content.past.my_masc}</td>
            </tr>
            <tr>
              <td className='feminine'>{item.content.past.my_fem}</td>
              <td className='masculine'>{item.content.past.wy_masc}</td>
            </tr>
            <tr>
              <td className='feminine-alt'>{item.content.past.wy_fem}</td>
              <td className='masculine-alt'>{item.content.past.oni}</td>
            </tr>
            <tr>
              <td className='feminine'>{item.content.past.one}</td>
              <td>{item.content.english}</td>
            </tr>
          </tbody>
        </table>
      )}
      {column.name === 'Czas przyszły' && (
        <table>
          <tbody>
            <tr>
              <td>{item.content.imp_future.ja || 'Advanced, maybe later?'}</td>
              <td>{item.content.imp_future.ty}</td>
            </tr>
            <tr>
              <td>{item.content.imp_future.on_ona_ono}</td>
              <td>{item.content.imp_future.my}</td>
            </tr>
            <tr>
              <td>{item.content.imp_future.wy}</td>
              <td>{item.content.imp_future.oni_one}</td>
            </tr>
            <tr>
              <td className='feminine'>{item.content.future_fem.ja}</td>
              <td className='masculine'>{item.content.future_masc.ja}</td>
            </tr>
            <tr>
              <td className='feminine-alt'>{item.content.future_fem.ty}</td>
              <td className='masculine-alt'>{item.content.future_masc.ty}</td>
            </tr>
            <tr>
              <td className='feminine'>{item.content.future_fem.ona}</td>
              <td className='masculine'>{item.content.future_masc.on}</td>
            </tr>
            <tr>
              <td className='feminine-alt'>{item.content.future_fem.my}</td>
              <td className='masculine-alt'>{item.content.future_masc.my}</td>
            </tr>
            <tr>
              <td className='feminine'>{item.content.future_fem.wy}</td>
              <td className='masculine'>{item.content.future_masc.wy}</td>
            </tr>
            <tr>
              <td className='feminine-alt'>{item.content.future_fem.oni}</td>
              <td className='masculine-alt'>{item.content.future_masc.oni}</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default KanbanTable;
