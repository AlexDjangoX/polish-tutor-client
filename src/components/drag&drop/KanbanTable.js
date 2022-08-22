import React from 'react';
import './KanbanTable.css';

const KanbanTable = ({ data, flipCard, item }) => {
  return (
    <div>
      {!flipCard ? (
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
      ) : (
        <table>
          <tbody>
            <tr>
              <td>{item.content.past.ja_masc}</td>
              <td>{item.content.past.ja_fem}</td>
            </tr>
            <tr>
              <td>{item.content.past.ty_masc}</td>
              <td>{item.content.past.ty_fem}</td>
            </tr>
            <tr>
              <td>{item.content.past.on}</td>
              <td>{item.content.past.ona}</td>
            </tr>
            <tr>
              <td>{item.content.past.ono}</td>
              <td>{item.content.past.my_masc}</td>
            </tr>
            <tr>
              <td>{item.content.past.my_fem}</td>
              <td>{item.content.past.wy_masc}</td>
            </tr>
            <tr>
              <td>{item.content.past.wy_fem}</td>
              <td>{item.content.past.oni}</td>
            </tr>
            <tr>
              <td>{item.content.past.one}</td>
              <td>{item.content.word}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default KanbanTable;
