import React from 'react';
import './KanbanTable.css';

const KanbanTable = ({ data, flipCard, item }) => {
  return (
    <div>
      {!flipCard ? (
        <table>
          <caption>Tworzyć</caption>
          <tbody>
            <tr>
              <th>ja</th>
              <th>ty</th>
              <th>on/ona/ono</th>
              <th>my</th>
              <th>wy</th>
              <th>oni/one</th>
            </tr>
            <tr>
              <td>{item.content.present.ja}</td>
              <td>{item.content.present.ty}</td>
              <td>{item.content.present.on_ona_ono}</td>
              <td>{item.content.present.my}</td>
              <td>{item.content.present.wy}</td>
              <td>{item.content.present.oni_one}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>ja</th>
              <th>ja</th>
              <th>ty</th>
              <th>ty</th>
              <th>on</th>
              <th>ona</th>
              <th>ono</th>
            </tr>
            <tr>
              <td>{item.content.past.ja_masc}</td>
              <td>{item.content.past.ja_fem}</td>
              <td>{item.content.past.ja_masc}</td>
              <td>{item.content.past.ja_fem}</td>
              <td>{item.content.past.on}</td>
              <td>{item.content.past.ona}</td>
              <td>{item.content.past.ono}</td>
            </tr>
            <tr>
              <th>my</th>
              <th>my</th>
              <th>wy</th>
              <th>wy</th>
              <th>oni</th>
              <th>one</th>
            </tr>
            <tr>
              <td>{item.content.past.my_masc}</td>
              <td>{item.content.past.my_fem}</td>
              <td>{item.content.past.wy_masc}</td>
              <td>{item.content.past.wy_fem}</td>
              <td>{item.content.past.oni}</td>
              <td>{item.content.past.one}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default KanbanTable;
