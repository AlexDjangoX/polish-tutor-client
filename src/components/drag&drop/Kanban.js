import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Kanban.css';
import KanbanTable from './KanbanTable';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');

const onDragEnd = (result, columns, setColumns) => {
  const { source, destination } = result;

  if (!result.destination) return;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const Kanban = () => {
  const [columns, setColumns] = useState({});
  const { user, isAuthenticated } = useAuth0();

  const [flipCard, setFlipCard] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/position`)
      .then(function (response) {
        setColumns(response.data);
        console.log(columns);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const postToDb = () => {
    axios
      .post(`http://localhost:8000/position`, columns)
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setTimeout(postToDb, 900);
  }, [columns]);

  return (
    <>
      {isAuthenticated && <h3>.......you are logged in as {user.name} </h3>}
      <div className='kanban-wrapper'>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div className='kanban-columns' key={columnId}>
                <h2 className='kanban-header'>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          className='kanban-droppable'
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? 'lightblue'
                              : 'lightgrey',
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      className='kanban-draggable'
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        backgroundColor: snapshot.isDragging
                                          ? '#263B4A'
                                          : '#456C86',
                                        color: 'white',
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <div className='card-item-content'>
                                        <span
                                          className='card-item-tag'
                                          style={{
                                            background:
                                              item.content.category.color,
                                          }}
                                        >
                                          {item.content.category.tag}
                                        </span>
                                        <p>{item.content.word}</p>
                                        <KanbanTable
                                          item={item}
                                          flipCard={flipCard}
                                        />

                                        <button
                                          onClick={() => setFlipCard(!flipCard)}
                                        >
                                          Flip card
                                        </button>
                                      </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
};

export default Kanban;

// const itemsFromBackend = [
//   { id: uuidv4(), content: 'First task' },
//   { id: uuidv4(), content: 'Second task' },
//   { id: uuidv4(), content: 'Third task' },
//   { id: uuidv4(), content: 'Fourth task' },
//   { id: uuidv4(), content: 'Fifth task' },
// ];

// const columnsFromBackend = {
//   columnOne: {
//     name: 'Requested',
//     items: [],
//   },
//   columnTwo: {
//     name: 'To do',
//     items: [],
//   },
//   columnThree: {
//     name: 'In Progress',
//     items: itemsFromBackend,
//   },
//   columnFour: {
//     name: 'Done',
//     items: [],
//   },
// };
