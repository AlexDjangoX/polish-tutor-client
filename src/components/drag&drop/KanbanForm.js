import React, { useState, useEffect } from 'react';
import { Button } from '../button/Button.js';
import { v4 as uuidv4 } from 'uuid';
import './KanbanForm.css';

const initialData = {
  id: uuidv4(),
  word_image: { polish_word: '', english_word: '', image_url: '' },
  gram_case: {
    case: '',
    color: '#ff2233',
  },
  present: {
    present_ja: '',
    present_ty: '',
    present_on_ona_ono: '',
    present_my: '',
    present_wy: '',
    present_oni_one: '',
  },
  past: {
    past_ja_masc: '',
    past_ja_fem: '',
    past_ty_masc: '',
    past_ty_fem: '',
    past_on_masc: '',
    past_ona_fem: '',
    past_my_masc: '',
    past_my_fem: '',
    past_wy_masc: '',
    past_wy_fem: '',
    past_oni_masc: '',
    past_one_fem: '',
  },
  imp_future: {
    imp_future_ja: '',
    imp_future_ty: '',
    imp_future_on_ona_ono: '',
    imp_future_my: '',
    imp_future_wy: '',
    imp_future_oni_one: '',
  },
  future_fem: {
    future_fem_ja: '',
    future_fem_ty: '',
    future_fem_ona: '',
    future_fem_my: '',
    future_fem_wy: '',
    future_fem_one: '',
  },
  future_masc: {
    future_masc_ja: '',
    future_masc_ty: '',
    future_masc_on: '',
    future_masc_my: '',
    future_masc_wy: '',
    future_masc_oni: '',
  },
};

const KanbanForm = ({
  setOpen,
  columns,
  currentVerb,
  isEditing,
  setIsEditing,
}) => {
  const [verb, setVerb] = useState(initialData);

  const axios = require('axios');

  const handleChange = (event) => {
    const { value, name } = event.target;
    const initialDataKeys = Object.keys(initialData).slice(1);

    initialDataKeys.forEach((el) => {
      if (Object.keys(initialData[el]).includes(name)) {
        setVerb((previous) => {
          const newVerb = { ...previous };
          newVerb[el][name] = value;
          return newVerb;
        });
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isEditing) {
      columns.columnOne.items.push(verb);
    }
    if (isEditing) {
      console.log(currentVerb.id);
    }

    setOpen(false);
  };

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

  const exitEditForm = () => {
    setIsEditing(false);
    setOpen(false);
  };

  return (
    <>
      <h1 className='heading-kanban'>
        Pattern recognition, association and iconisation
      </h1>
      {}

      <form>
        <div className='add-verb-form-wrapper'>
          <div className='close-modal-button'>
            <Button
              buttonStyle='btn-add-new-verb'
              buttonSize='btn--medium'
              onClick={() => exitEditForm()}
            >
              Exit
            </Button>
          </div>

          <div className='radio-buttons' onChange={handleChange}>
            <div className='radio-buttons-dokonany'>
              <input
                type='radio'
                id='dokonany'
                name='dokonany_niedokonany'
                value='Dokonany'
              />
              <label htmlFor='dokonany'>Dokonany</label>
            </div>
            <div className='radio-buttons-niedokonany'>
              <input
                type='radio'
                id='niedokonany'
                name='dokonany_niedokonany'
                value='Niedokonany'
              />
              <label htmlFor='niedokonany'>Niedokonany</label>
            </div>
            <div className='radio-buttons-niewiem'>
              <input
                type='radio'
                id='niewiem'
                name='dokonany_niedokonany'
                value='Nie wiem'
                defaultChecked={true}
              />
              <label htmlFor='niewiem'>Nie wiem</label>
            </div>
          </div>

          <div className='gram-case'>
            <label htmlFor='gram_case'>
              What grammatical case is the verb?
            </label>
            <select id='gram_case' name='gram_case' onChange={handleChange}>
              <option value='Mianownik'>Mianownik</option>
              <option value='Dopełniacz'>Dopełniacz</option>
              <option value='Celownik'>Celownik</option>
              <option value='Biernik'>Biernik</option>
              <option value='Narzędnik'>Narzędnik</option>
              <option value='Miejscownik'>Miejscownik</option>
              <option value='Wołacz'>Wołacz</option>
            </select>
          </div>

          <div className='pol-eng-infin'>
            <label htmlFor='polish_word'>Polish Verb</label>
            <input
              id='polish_word'
              type='text'
              name='polish_word'
              required
              onChange={handleChange}
              value={
                isEditing
                  ? currentVerb.word_image.polish_word
                  : verb.word_image.polish_word
              }
            />

            <label htmlFor='english_word'>English Verb</label>
            <input
              id='english_word'
              type='text'
              name='english_word'
              required
              onChange={handleChange}
              value={
                isEditing
                  ? currentVerb.word_image.english_word
                  : verb.word_image.english_word
              }
            />
          </div>

          <div className='image_url'>
            <label htmlFor='image_url'>Image URL</label>
            <input
              id='image_url'
              type='text'
              name='image_url'
              onChange={handleChange}
              value={columns.columnOne.items.link_url}
            />
          </div>

          <div className='submit-button'>
            <Button
              buttonStyle='btn-add-new-verb'
              buttonSize='btn--medium'
              id='submit-verb-button'
              type='submit'
              onClick={handleSubmit}
            >
              {!isEditing ? 'Submit' : 'Update'}
            </Button>
          </div>

          <div className='pres-ten'>
            <label htmlFor='present_ja'>Ja-present</label>
            <input
              id='present_ja'
              type='text'
              name='present_ja'
              required
              onChange={handleChange}
              value={columns.columnOne.items.present_ja}
            />

            <label htmlFor='present_ty'>Ty-present</label>
            <input
              id='present_ty'
              type='text'
              name='present_ty'
              required
              onChange={handleChange}
              value={columns.columnOne.items.present_ty}
            />

            <label htmlFor='present_on_ona_ono'>on/ona/ono-present</label>
            <input
              id='present_on_ona_ono'
              type='text'
              name='present_on_ona_ono'
              required
              onChange={handleChange}
              value={columns.columnOne.items.present_on_ona_ono}
            />

            <label htmlFor='present_my'>My-present</label>
            <input
              id='present_my'
              type='text'
              name='present_my'
              required
              onChange={handleChange}
              value={columns.columnOne.items.present_my}
            />

            <label htmlFor='present_wy'>Wy-present</label>
            <input
              id='present_wy'
              type='text'
              name='present_wy'
              required
              onChange={handleChange}
              value={columns.columnOne.items.present_wy}
            />

            <label htmlFor='present_oni_one'>Oni-present</label>
            <input
              id='present_oni_one'
              type='text'
              name='present_oni_one'
              required
              onChange={handleChange}
              value={columns.columnOne.items.present_oni_one}
            />
          </div>

          <div className='past-masc'>
            <label htmlFor='past_ja_masc'>Ja-past-masc</label>
            <input
              id='past_ja_masc'
              type='text'
              name='past_ja_masc'
              onChange={handleChange}
              value={columns.columnOne.items.past_ja_masc}
            />
            <label htmlFor='past_ty_masc'>Ty-past-masc</label>
            <input
              id='past_ty_masc'
              type='text'
              name='past_ty_masc'
              onChange={handleChange}
              value={columns.columnOne.items.past_ty_masc}
            />{' '}
            <label htmlFor='past_on_masc'>On-past</label>
            <input
              id='past_on_masc'
              type='text'
              name='past_on_masc'
              onChange={handleChange}
              value={columns.columnOne.items.past_on_masc}
            />
            {/* <label htmlFor='past_ono'>Ono-past</label>
            <input
              id='past_ono'
              type='text'
              name='past_ono'
              onChange={handleChange}
            /> */}
            <label htmlFor='past_my_masc'>My-past-masc</label>
            <input
              id='past_my_masc'
              type='text'
              name='past_my_masc'
              onChange={handleChange}
              value={columns.columnOne.items.past_my_masc}
            />
            <label htmlFor='past_wy_masc'>Wy-past-masc</label>
            <input
              id='past_wy_masc'
              type='text'
              name='past_wy_masc'
              onChange={handleChange}
              value={columns.columnOne.items.past_wy_masc}
            />
            <label htmlFor='past_oni_masc'>Oni-past</label>
            <input
              id='past_oni_masc'
              type='text'
              name='past_oni_masc'
              onChange={handleChange}
              value={columns.columnOne.items.past_oni}
            />
          </div>

          <div className='past-fem'>
            <label htmlFor='past_ja_fem'>Ja-past-fem</label>
            <input
              id='past_ja_fem'
              type='text'
              name='past_ja_fem'
              onChange={handleChange}
              value={columns.columnOne.items.past_ja_fem}
            />
            <label htmlFor='past_ty_fem'>Ty-past-fem</label>
            <input
              id='past_ty_fem'
              type='text'
              name='past_ty_fem'
              onChange={handleChange}
              value={columns.columnOne.items.past_ty_fem}
            />

            <label htmlFor='past_ona_fem'>Ona-past</label>
            <input
              id='past_ona_fem'
              type='text'
              name='past_ona_fem'
              onChange={handleChange}
              value={columns.columnOne.items.past_ona_fem}
            />

            <label htmlFor='past_my_fem'>My-past-fem</label>
            <input
              id='past_my_fem'
              type='text'
              name='past_my_fem'
              onChange={handleChange}
              value={columns.columnOne.items.past_my_fem}
            />

            <label htmlFor='past_wy_fem'>Wy-past-fem</label>
            <input
              id='past_wy_fem'
              type='text'
              name='past_wy_fem'
              onChange={handleChange}
              value={columns.columnOne.items.past_wy_fem}
            />

            <label htmlFor='past_one_fem'>One-past</label>
            <input
              id='past_one_fem'
              type='text'
              name='past_one_fem'
              onChange={handleChange}
              value={columns.columnOne.items.past_one}
            />
          </div>

          <div className='imp-fut'>
            <label htmlFor='imp_future_ja'>Ja-imp-fut</label>
            <input
              id='imp_future_ja'
              type='text'
              name='imp_future_ja'
              onChange={handleChange}
              defaultValue='będą '
              value={columns.columnOne.items.imp_future_ja}
            />

            <label htmlFor='imp_future_ty'>Ty-imp-fut</label>
            <input
              id='imp_future_ty'
              type='text'
              name='imp_future_ty'
              onChange={handleChange}
              defaultValue='będziesz '
              value={columns.columnOne.items.imp_future_ty}
            />

            <label htmlFor='imp_future_on_ona_ono'>On/ona/ono-imp-fut</label>
            <input
              id='imp_future_on_ona_ono'
              type='text'
              name='imp_future_on_ona_ono'
              onChange={handleChange}
              defaultValue='będzie '
              value={columns.columnOne.items.imp_future_on_ona_ono}
            />

            <label htmlFor='imp_future_my'>My-imp-fut</label>
            <input
              id='imp_future_my'
              type='text'
              name='imp_future_my'
              onChange={handleChange}
              defaultValue='będziemy '
              value={columns.columnOne.items.imp_future_my}
            />

            <label htmlFor='imp_future_wy'>Wy-imp-fut</label>
            <input
              id='imp_future_wy'
              type='text'
              name='imp_future_wy'
              onChange={handleChange}
              defaultValue='będziecie '
              value={columns.columnOne.items.imp_future_wy}
            />

            <label htmlFor='imp_future_oni_one'>Oni/one-imp-fut</label>
            <input
              id='imp_future_oni_one'
              type='text'
              name='imp_future_oni_one'
              onChange={handleChange}
              defaultValue='będą '
              value={columns.columnOne.items.imp_future_oni_one}
            />
          </div>

          <div className='fut-fem'>
            <label htmlFor='future_fem_ja'>Ja-fut-fem</label>
            <input
              id='future_fem_ja'
              type='text'
              name='future_fem_ja'
              onChange={handleChange}
              defaultValue='będę '
              value={columns.columnOne.items.future_fem_ja}
            />

            <label htmlFor='future_fem_ty'>Ty-fut-fem</label>
            <input
              id='future_fem_ty'
              type='text'
              name='future_fem_ty'
              onChange={handleChange}
              defaultValue='będziesz '
              value={columns.columnOne.items.future_fem_ty}
            />

            <label htmlFor='future_fem_ona'>Ona-fut-fem</label>
            <input
              id='future_fem_ona'
              type='text'
              name='future_fem_ona'
              onChange={handleChange}
              defaultValue='będzie '
              value={columns.columnOne.items.future_fem_ona}
            />

            <label htmlFor='future_fem_my'>My-fut-fem</label>
            <input
              id='future_fem_my'
              type='text'
              name='future_fem_my'
              onChange={handleChange}
              defaultValue='będziemy '
              value={columns.columnOne.items.future_fem_my}
            />

            <label htmlFor='future_fem_wy'>Wy-fut-fem</label>
            <input
              id='future_fem_wy'
              type='text'
              name='future_fem_wy'
              onChange={handleChange}
              defaultValue='będziecie '
              value={columns.columnOne.items.future_fem_wy}
            />

            <label htmlFor='future_fem_one'>Oni-fut-fem</label>
            <input
              id='future_fem_one'
              type='text'
              name='future_fem_one'
              onChange={handleChange}
              defaultValue='będą '
              value={columns.columnOne.items.future_fem_one}
            />
          </div>

          <div className='fut-masc'>
            <label htmlFor='future_masc_ja'>Ja-fut-masc</label>
            <input
              id='future_masc_ja'
              type='text'
              name='future_masc_ja'
              onChange={handleChange}
              defaultValue='będę '
              value={columns.columnOne.items.future_masc_ja}
            />

            <label htmlFor='future_masc_ty'>Ty-fut-masc</label>
            <input
              id='future_masc_ty'
              type='text'
              name='future_masc_ty'
              onChange={handleChange}
              defaultValue='będziesz '
              value={columns.columnOne.items.future_masc_ty}
            />

            <label htmlFor='future_masc_on'>On-fut-masc</label>
            <input
              id='future_masc_on'
              type='text'
              name='future_masc_on'
              onChange={handleChange}
              defaultValue='będzie '
              value={columns.columnOne.items.future_masc_on}
            />

            <label htmlFor='future_masc_my'>My-fut-masc</label>
            <input
              id='future_masc_my'
              type='text'
              name='future_masc_my'
              onChange={handleChange}
              defaultValue='będziemy '
              value={columns.columnOne.items.future_masc_my}
            />

            <label htmlFor='future_masc_wy'>Wy-fut-masc</label>
            <input
              id='future_masc_wy'
              type='text'
              name='future_masc_wy'
              onChange={handleChange}
              defaultValue='będziecie '
              value={columns.columnOne.items.future_masc_wy}
            />

            <label htmlFor='future_masc_oni'>Oni-fut-masc</label>
            <input
              id='future_masc_oni'
              type='text'
              name='future_masc_oni'
              onChange={handleChange}
              defaultValue='będą '
              value={columns.columnOne.items.future_masc_oni}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default KanbanForm;
