import React, { useState } from 'react';
import './TextToSpeech.css';
import { useSpeechSynthesis } from 'react-speech-kit';

const TextToSpeech = ({ data, voices }) => {
  const [text, setText] = useState(data);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voiceIndex, setVoiceIndex] = useState(21);
  const { speak, cancel, speaking, supported } = useSpeechSynthesis();

  const voice = voices[voiceIndex] || '';

  return (
    <div>
      <form className='text-to-speech-wrapper'>
        {!supported && (
          <p>
            Oh no, it looks like your browser doesn&#39;t support Speech
            Synthesis.
          </p>
        )}
        {supported && (
          <>
            <div className='select-options'>
              <label htmlFor='voice'>Voice</label>
              <select
                id='voice'
                name='voice'
                value={voiceIndex}
                onChange={(event) => {
                  setVoiceIndex(event.target.value);
                }}
              >
                <option value={7}>Paulina</option>
                <option value={21}>Anna</option>
                <option value={6}>Adam</option>
              </select>
            </div>

            <div className='select-rate'>
              <div>
                <label htmlFor='rate'>Rate: </label>
                <div className='rate-value'>{rate}</div>
              </div>
              <input
                type='range'
                min='0.5'
                max='2'
                defaultValue='1'
                step='0.1'
                id='rate'
                onChange={(event) => {
                  setRate(event.target.value);
                }}
              />
            </div>
            <div className='select-pitch'>
              <div>
                <label htmlFor='pitch'>Pitch: </label>
                <div className='pitch-value'>{pitch}</div>
              </div>
              <input
                type='range'
                min='0'
                max='2'
                defaultValue='1'
                step='0.1'
                id='pitch'
                onChange={(event) => {
                  setPitch(event.target.value);
                }}
              />
            </div>

            <div className='btn-speak'>
              {speaking ? (
                <button type='button' onClick={cancel}>
                  Stop
                </button>
              ) : (
                <button
                  type='button'
                  onClick={() => speak({ text, voice, rate, pitch })}
                >
                  Speak
                </button>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default TextToSpeech;
