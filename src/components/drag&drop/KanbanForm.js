import React, { useState } from 'react';
import { Button } from '../button/Button.js';
import './KanbanForm.css';

const KanbanForm = ({ setOpen, open }) => {
  return (
    <>
      <h1 className='heading-kanban'>
        This is a labour of love. Repetition is best way to learn !!!
      </h1>

      <form method='POST' action='/submit' encType='multipart/form-data'>
        <div className='add-verb-form-wrapper'>
          <div className='close-modal-button'>
            <Button onClick={() => setOpen(false)}>Close Modal</Button>
          </div>
          <div className='gram-case'>
            <label htmlFor='grammatical-case'>
              What grammatical case is the verb?
            </label>
            <select id='grammatical-case' name='grammatical-case'>
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
            <label htmlFor='polish-word'>Polish Verb</label>
            <input id='polish-word' type='text' name='polish-word' required />

            <label htmlFor='english-word'>English Verb</label>
            <input id='english-word' type='text' name='english-word' required />
          </div>

          <div className='submit-button'>
            <Button type='submit'>Submit</Button>
          </div>

          <div className='pres-ten'>
            <label htmlFor='present-ja'>Ja-present</label>
            <input id='present-ja' type='text' name='present-ja' required />

            <label htmlFor='present-ty'>Ty-present</label>
            <input id='present-ty' type='text' name='present-ty' required />

            <label htmlFor='present-on_ona_ono'>on/ona/ono-present</label>
            <input
              id='present-on_ona_ono'
              type='text'
              name='present-on_ona_ono'
              required
            />

            <label htmlFor='present-my'>My-present</label>
            <input id='present-my' type='text' name='present-my' required />

            <label htmlFor='present-wy'>Wy-present</label>
            <input id='present-wy' type='text' name='present-wy' required />

            <label htmlFor='present-oni_one'>Oni</label>
            <input
              id='present-oni_one'
              type='text'
              name='present-oni_one'
              required
            />
          </div>

          <div className='past-masc-fem-left'>
            <label htmlFor='past-ja_masc'>Ja-past-masc</label>
            <input id='past-ja_masc' type='text' name='past-ja_masc' required />

            <label htmlFor='past-ja_fem'>Ja-past-fem</label>
            <input id='past-ja_fem' type='text' name='past-ja_fem' required />

            <label htmlFor='past-ty_masc'>Tu-past-masc</label>
            <input id='past-ty_masc' type='text' name='past-ty_masc' required />

            <label htmlFor='past-ty_fem'>Ty-past-fem</label>
            <input id='past-ty_fem' type='text' name='past-ty_fem' required />

            <label htmlFor='past-on'>On-past</label>
            <input id='past-on' type='text' name='past-on' required />

            <label htmlFor='past-ona'>Ona-past</label>
            <input id='past-ona' type='text' name='past-ona' required />
          </div>
          <div className='past-masc-fem-right'>
            <label htmlFor='past-ono'>Ono-past</label>
            <input id='past-ono' type='text' name='past-ono' required />

            <label htmlFor='past-my_masc'>My-past-masc</label>
            <input id='past-my_masc' type='text' name='past-my_masc' required />

            <label htmlFor='past-my_fem'>My-past-fem</label>
            <input id='past-my_fem' type='text' name='past-my_fem' required />

            <label htmlFor='past-wy_masc'>Wy-past-masc</label>
            <input id='past-wy_masc' type='text' name='past-wy_masc' required />

            <label htmlFor='past-wy_fem'>Wy-past-fem</label>
            <input id='past-wy_fem' type='text' name='past-wy_fem' required />

            <label htmlFor='past-oni'>Oni-past</label>
            <input id='past-oni' type='text' name='past-oni' required />

            <label htmlFor='past-one'>One-past</label>
            <input id='past-one' type='text' name='past-one' required />
          </div>

          <div className='imp-fut'>
            <label htmlFor='imp_future-ja'>Ja-imp-fut</label>
            <input id='imp_future-ja' type='text' name='imp_future-ja' />

            <label htmlFor='imp_future-ty'>Ty-imp-fut</label>
            <input id='imp_future-ty' type='text' name='imp_future-ty' />

            <label htmlFor='imp_future-on_ona_ono'>On/ona/ono-imp-fut</label>
            <input
              id='imp_future-on_ona_ono'
              type='text'
              name='imp_future-on_ona_ono'
            />

            <label htmlFor='imp_future-my'>My-imp-fut</label>
            <input id='imp_future-my' type='text' name='imp_future-my' />

            <label htmlFor='imp_future-wy'>Wy-imp-fut</label>
            <input id='imp_future-wy' type='text' name='imp_future-wy' />

            <label htmlFor='imp_future-oni_one'>Oni/one-imp-fut</label>
            <input
              id='imp_future-oni_one'
              type='text'
              name='imp_future-oni_one'
            />
          </div>

          <div className='fut-fem'>
            <label htmlFor='future_fem-ja'>Ja-fut-fem</label>
            <input id='future_fem-ja' type='text' name='future_fem-ja' />

            <label htmlFor='future_fem-ty'>Ty-fut-fem</label>
            <input id='future_fem-ty' type='text' name='future_fem-ty' />

            <label htmlFor='future_fem-ona'>Ona-fut-fem</label>
            <input id='future_fem-ona' type='text' name='future_fem-ona' />

            <label htmlFor='future_fem-my'>My-fut-fem</label>
            <input id='future_fem-my' type='text' name='future_fem-my' />

            <label htmlFor='future_fem-wy'>Wy-fut-fem</label>
            <input id='future_fem-wy' type='text' name='future_fem-wy' />

            <label htmlFor='future_fem-oni'>Oni-fut-fem</label>
            <input id='future_fem-oni' type='text' name='future_fem-oni' />
          </div>

          <div className='fut-masc'>
            <label htmlFor='future_masc-ja'>Ja-fut-masc</label>
            <input id='future_masc-ja' type='text' name='future_masc-ja' />

            <label htmlFor='future_masc-ty'>Ty-fut-masc</label>
            <input id='future_masc-ty' type='text' name='future_masc-ty' />

            <label htmlFor='future_masc-on'>On-fut-masc</label>
            <input id='future_masc-on' type='text' name='future_masc-ona' />

            <label htmlFor='future_masc-my'>My-fut-masc</label>
            <input id='future_masc-my' type='text' name='future_masc-my' />

            <label htmlFor='future_masc-wy'>Wy-fut-masc</label>
            <input id='future_masc-wy' type='text' name='future_masc-wy' />

            <label htmlFor='future_masc-oni'>Oni-fut-masc</label>
            <input id='future_masc-oni' type='text' name='future_masc-oni' />
          </div>
        </div>
      </form>
    </>
  );
};

export default KanbanForm;
