import React, { useState } from 'react';
import { Button } from '../button/Button.js';
import './KanbanForm.css';

const KanbanForm = ({ setOpen, columns }) => {
  const [verb, setVerb] = useState();

  const handleChange = (event) => {
    const { value, name } = event.target;
    console.log(value);
    setVerb({
      ...verb,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(columns.columnOne.items);
    console.log('Inside handleSubmit');
    setOpen(false);
  };
  console.log('VERB : ', verb);
  return (
    <>
      <h1 className='heading-kanban'>
        This is a labour of love. Repetition is best way to learn !!!
      </h1>

      <form>
        <div className='add-verb-form-wrapper'>
          <div className='close-modal-button'>
            <Button onClick={() => setOpen(false)}>Exit</Button>
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
              <option value='mianownik'>Mianownik</option>
              <option value='dopełniacz'>Dopełniacz</option>
              <option value='celownik'>Celownik</option>
              <option value='biernik'>Biernik</option>
              <option value='narzędnik'>Narzędnik</option>
              <option value='miejscownik'>Miejscownik</option>
              <option value='wołacz'>Wołacz</option>
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
            />

            <label htmlFor='english_word'>English Verb</label>
            <input
              id='english_word'
              type='text'
              name='english_word'
              required
              onChange={handleChange}
            />
          </div>

          <div className='link-url'>
            <label htmlFor='link_url'>Image URL</label>
            <input
              id='link_url'
              type='text'
              name='link_url'
              onChange={handleChange}
            />
          </div>

          <div className='submit-button'>
            <Button
              id='submit-verb-button'
              type='submit'
              onClick={handleSubmit}
            >
              Submit
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
            />

            <label htmlFor='present_ty'>Ty-present</label>
            <input
              id='present_ty'
              type='text'
              name='present_ty'
              required
              onChange={handleChange}
            />

            <label htmlFor='present_on_ona_ono'>on/ona/ono-present</label>
            <input
              id='present_on_ona_ono'
              type='text'
              name='present_on_ona_ono'
              required
              onChange={handleChange}
            />

            <label htmlFor='present_my'>My-present</label>
            <input
              id='present_my'
              type='text'
              name='present_my'
              required
              onChange={handleChange}
            />

            <label htmlFor='present_wy'>Wy-present</label>
            <input
              id='present_wy'
              type='text'
              name='present_wy'
              required
              onChange={handleChange}
            />

            <label htmlFor='present_oni_one'>Oni-present</label>
            <input
              id='present_oni_one'
              type='text'
              name='present_oni_one'
              required
              onChange={handleChange}
            />
          </div>

          <div className='past-masc-fem-left'>
            <label htmlFor='past_ja_masc'>Ja-past-masc</label>
            <input
              id='past_ja_masc'
              type='text'
              name='past_ja_masc'
              onChange={handleChange}
            />
            <label htmlFor='past_ty_masc'>Ty-past-masc</label>
            <input
              id='past_ty_masc'
              type='text'
              name='past_ty_masc'
              onChange={handleChange}
            />{' '}
            <label htmlFor='past_on'>On-past</label>
            <input
              id='past_on'
              type='text'
              name='past_on'
              onChange={handleChange}
            />
            <label htmlFor='past_ono'>Ono-past</label>
            <input
              id='past_ono'
              type='text'
              name='past_ono'
              onChange={handleChange}
            />
            <label htmlFor='past_my_masc'>My-past-masc</label>
            <input
              id='past_my_masc'
              type='text'
              name='past_my_masc'
              onChange={handleChange}
            />
            <label htmlFor='past_wy_masc'>Wy-past-masc</label>
            <input
              id='past_wy_masc'
              type='text'
              name='past_wy_masc'
              onChange={handleChange}
            />
            <label htmlFor='past_oni'>Oni-past</label>
            <input
              id='past_oni'
              type='text'
              name='past_oni'
              onChange={handleChange}
            />
          </div>

          <div className='past-masc-fem-right'>
            <label htmlFor='past_ja_fem'>Ja-past-fem</label>
            <input
              id='past_ja_fem'
              type='text'
              name='past_ja_fem'
              onChange={handleChange}
            />
            <label htmlFor='past_ty_fem'>Ty-past-fem</label>
            <input
              id='past_ty_fem'
              type='text'
              name='past_ty_fem'
              onChange={handleChange}
            />

            <label htmlFor='past_ona'>Ona-past</label>
            <input
              id='past_ona'
              type='text'
              name='past_ona'
              onChange={handleChange}
            />

            <label htmlFor='past_my_fem'>My-past-fem</label>
            <input
              id='past_my_fem'
              type='text'
              name='past_my_fem'
              onChange={handleChange}
            />

            <label htmlFor='past_wy_fem'>Wy-past-fem</label>
            <input
              id='past_wy_fem'
              type='text'
              name='past_wy_fem'
              onChange={handleChange}
            />

            <label htmlFor='past_one'>One-past</label>
            <input
              id='past_one'
              type='text'
              name='past_one'
              onChange={handleChange}
            />
          </div>

          <div className='imp-fut'>
            <label htmlFor='imp_future_ja'>Ja-imp-fut</label>
            <input
              id='imp_future_ja'
              type='text'
              name='imp_future_ja'
              onChange={handleChange}
            />

            <label htmlFor='imp_future_ty'>Ty-imp-fut</label>
            <input
              id='imp_future_ty'
              type='text'
              name='imp_future_ty'
              onChange={handleChange}
            />

            <label htmlFor='imp_future_on_ona_ono'>On/ona/ono-imp-fut</label>
            <input
              id='imp_future_on_ona_ono'
              type='text'
              name='imp_future_on_ona_ono'
              onChange={handleChange}
            />

            <label htmlFor='imp_future_my'>My-imp-fut</label>
            <input
              id='imp_future_my'
              type='text'
              name='imp_future_my'
              onChange={handleChange}
            />

            <label htmlFor='imp_future_wy'>Wy-imp-fut</label>
            <input
              id='imp_future_wy'
              type='text'
              name='imp_future_wy'
              onChange={handleChange}
            />

            <label htmlFor='imp_future_oni_one'>Oni/one-imp-fut</label>
            <input
              id='imp_future_oni_one'
              type='text'
              name='imp_future_oni_one'
              onChange={handleChange}
            />
          </div>

          <div className='fut-fem'>
            <label htmlFor='future_fem_ja'>Ja-fut-fem</label>
            <input
              id='future_fem_ja'
              type='text'
              name='future_fem_ja'
              onChange={handleChange}
            />

            <label htmlFor='future_fem_ty'>Ty-fut-fem</label>
            <input
              id='future_fem_ty'
              type='text'
              name='future_fem_ty'
              onChange={handleChange}
            />

            <label htmlFor='future_fem_ona'>Ona-fut-fem</label>
            <input
              id='future_fem_ona'
              type='text'
              name='future_fem_ona'
              onChange={handleChange}
            />

            <label htmlFor='future_fem_my'>My-fut-fem</label>
            <input
              id='future_fem_my'
              type='text'
              name='future_fem_my'
              onChange={handleChange}
            />

            <label htmlFor='future_fem_wy'>Wy-fut-fem</label>
            <input
              id='future_fem_wy'
              type='text'
              name='future_fem_wy'
              onChange={handleChange}
            />

            <label htmlFor='future_fem_oni'>Oni-fut-fem</label>
            <input
              id='future_fem_oni'
              type='text'
              name='future_fem_oni'
              onChange={handleChange}
            />
          </div>

          <div className='fut-masc'>
            <label htmlFor='future_masc_ja'>Ja-fut-masc</label>
            <input
              id='future_masc_ja'
              type='text'
              name='future_masc_ja'
              onChange={handleChange}
            />

            <label htmlFor='future_masc_ty'>Ty-fut-masc</label>
            <input
              id='future_masc_ty'
              type='text'
              name='future_masc_ty'
              onChange={handleChange}
            />

            <label htmlFor='future_masc_on'>On-fut-masc</label>
            <input
              id='future_masc_on'
              type='text'
              name='future_masc_ona'
              onChange={handleChange}
            />

            <label htmlFor='future_masc_my'>My-fut-masc</label>
            <input
              id='future_masc_my'
              type='text'
              name='future_masc_my'
              onChange={handleChange}
            />

            <label htmlFor='future_masc_wy'>Wy-fut-masc</label>
            <input
              id='future_masc_wy'
              type='text'
              name='future_masc_wy'
              onChange={handleChange}
            />

            <label htmlFor='future_masc_oni'>Oni-fut-masc</label>
            <input
              id='future_masc_oni'
              type='text'
              name='future_masc_oni'
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default KanbanForm;
