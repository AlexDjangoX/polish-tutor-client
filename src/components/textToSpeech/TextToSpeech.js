import React, { useState } from 'react';
import './TextToSpeech.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSpeechSynthesis } from 'react-speech-kit';

const TextToSpeech = ({ data, voices }) => {
  const [text, setText] = useState(data);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voiceIndex, setVoiceIndex] = useState(7);
  const { speak, cancel, speaking, supported } = useSpeechSynthesis();
  const voice = voices[voiceIndex] || '';

  return (
    <div className='text-to-speech-wrapper'>
      <div className='player-wrapper'>
        {!supported && (
          <p>
            Oh no, it looks like your browser doesn&#39;t support Speech
            Synthesis.
          </p>
        )}
        {supported && (
          <>
            <label htmlFor='voice'></label>
            <select
              id='voice'
              name='voice'
              value={7}
              onChange={(event) => {
                setVoiceIndex(event.target.value);
              }}
            >
              <option value={7}>Paulina</option>
              <option value={21}>Anna</option>
              <option value={6}>Adam</option>
            </select>

            <div className='btn-speak'>
              {speaking ? (
                <button className='play-btn' type='button' onClick={cancel}>
                  <FontAwesomeIcon
                    className='icon-placeholer'
                    icon={regular('circle-pause')}
                  />
                </button>
              ) : (
                <button
                  type='button'
                  onClick={() => speak({ text, voice, rate, pitch })}
                  className='play-btn'
                >
                  <FontAwesomeIcon
                    className='icon-placeholer'
                    icon={regular('circle-play')}
                  />
                </button>
              )}
            </div>

            <label htmlFor='rate'>Rate: </label>
            <p className='span'>{rate}</p>
            <input
              type='range'
              min='0'
              max='9'
              defaultValue='1'
              step='1'
              id='rate'
              onChange={(event) => {
                setRate(event.target.value);
              }}
            />

            {/* <label htmlFor='pitch'>Pitch: </label>
            <p className='span'>{pitch}</p>
            <input
              type='range'
              min='0'
              max='9'
              defaultValue='1'
              step='1'
              id='pitch'
              onChange={(event) => {
                setPitch(event.target.value);
              }}
            /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default TextToSpeech;
