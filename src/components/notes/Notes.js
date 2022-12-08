import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import TextToSpeech from '../textToSpeech/TextToSpeech';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import './Notes.css';

const Notes = ({ columns, setColumns }) => {
  const location = useLocation();
  const { item } = location.state;
  const { user, getAccessTokenSilently } = useAuth0();

  const [dataToRender, setDataToRender] = useState(item);
  const [stringToTranslate, setStringToTranslate] = useState('');
  const [translatedString, setTranslatedString] = useState('');
  const [transEngPlPlEng, setTransEngPlPlEng] = useState('');
  const { voices } = useSpeechSynthesis();
  const [sourceTarget, setSourceTarget] = useState(
    '"source":"en","target":"pl"'
  );
  const [isFetching, setIsFetching] = useState(false);

  const axios = require('axios');

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/position`)
  //     .then(function (response) {
  //       setColumns(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  // const postToDb = () => {
  //   axios
  //     .post(`http://localhost:8000/position`, columns)
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const handleChangeTextField = (event) => {
    const { name, value } = event.target;

    setDataToRender({
      ...dataToRender,
      [name]: value,
    });
  };

  const putToExpressApp = async () => {
    try {
      const token = await getAccessTokenSilently();

      await fetch(
        `${process.env.REACT_APP_BASE_URL}/protected/kanban/${user.sub}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(columns),
        }
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateNotes = async (event) => {
    event.preventDefault();

    item.notes = `${item.notes}${'\n'}${translatedString}`;

    const columnClone = Object.assign({}, columns);

    if (columnClone.column_D?.items) {
      const itemsArray = columnClone.column_D.items;

      itemsArray.forEach((el, index) => {
        if (el.id === item.id) itemsArray[index] = dataToRender;
      });
      await setColumns(columnClone);
      putToExpressApp();
    }

    setStringToTranslate('');
    setTranslatedString('');
  };

  const handleTranslation = (event) => {
    event.preventDefault();
    setIsFetching(true);

    if (stringToTranslate) {
      const options = {
        method: 'POST',
        url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
          'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host,
        },

        data: `{"q":"${stringToTranslate}",${transEngPlPlEng}}`,
      };

      axios
        .request(options)
        .then(function (response) {
          setTranslatedString(response.data.data.translations.translatedText);
          setIsFetching(false);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  const handleChangeTranslationField = (event) => {
    const { value } = event.target;
    setStringToTranslate(value);
  };

  const handleTranslationLanguage = (value) => {
    setSourceTarget(value);
    setTransEngPlPlEng(value);
  };

  return (
    <>
      <ChakraProvider>
        <div className='notes-wrapper'>
          <Box w='100%' h='250px' p={4}>
            <Tabs isFitted variant='soft-rounded'>
              <TabList mb='1em'>
                <Tab>Present Tense</Tab>
                <Tab>Past Masculine</Tab>
                <Tab>Past Feminine</Tab>
              </TabList>
              <TabList mb='1em'>
                <Tab>Future Masculine</Tab>
                <Tab>Future Feminine</Tab>
                <Tab>Future Imperfect</Tab>
              </TabList>
              <TabList mb='1em'>
                <Tab>Conditional Masculine</Tab>
                <Tab>Conditional Feminine</Tab>
                <Tab>Imperative</Tab>
              </TabList>
              <TabPanels>
                <TabPanel padding={0}>
                  <div className='wrapper-present'>
                    <ul className='polish-word-list'>
                      <li>{dataToRender.present.present_ja}</li>
                      <li>{dataToRender.present.present_ty}</li>
                      <li>{dataToRender.present.present_on_ona_ono}</li>
                      <li>{dataToRender.present.present_my}</li>
                      <li>{dataToRender.present.present_wy}</li>
                      <li>{dataToRender.present.present_oni_one}</li>
                    </ul>
                  </div>
                </TabPanel>
                <TabPanel padding={0}>
                  <div className='wrapper-past-masculine'>
                    <ul className='polish-word-list'>
                      <li> {dataToRender.past.past_ja_masc}</li>
                      <li> {dataToRender.past.past_ty_masc}</li>
                      <li> {dataToRender.past.past_on_masc}</li>
                      <li> {dataToRender.past.past_my_masc}</li>
                      <li>{dataToRender.past.past_wy_masc}</li>
                      <li> {dataToRender.past.past_oni_masc}</li>
                    </ul>
                  </div>
                </TabPanel>
                <TabPanel padding={0}>
                  <div className='wrapper-past-feminine'>
                    <ul className='polish-word-list'>
                      <li> {dataToRender.past.past_ja_fem}</li>
                      <li>{dataToRender.past.past_ty_fem}</li>
                      <li> {dataToRender.past.past_ona_fem}</li>
                      <li> {dataToRender.past.past_my_fem}</li>
                      <li> {dataToRender.past.past_wy_fem}</li>
                      <li> {dataToRender.past.past_one_fem}</li>
                    </ul>
                  </div>
                </TabPanel>
                <TabPanel padding={0}>
                  <div className='wrapper-future-masculine'>
                    <ul className='polish-word-list'>
                      <li> {dataToRender.future_masc.future_masc_ja} </li>
                      <li>{dataToRender.future_masc.future_masc_ty}</li>
                      <li> {dataToRender.future_masc.future_masc_on}</li>
                      <li> {dataToRender.future_masc.future_masc_my}</li>
                      <li> {dataToRender.future_masc.future_masc_wy} </li>
                      <li> {dataToRender.future_masc.future_masc_oni}</li>
                    </ul>
                  </div>
                </TabPanel>
                <TabPanel padding={0}>
                  <div className='wrapper-future-feminine'>
                    <ul className='polish-word-list'>
                      <li> {dataToRender.future_fem.future_fem_ja} </li>
                      <li>{dataToRender.future_fem.future_fem_ty}</li>
                      <li> {dataToRender.future_fem.future_fem_ona}</li>
                      <li> {dataToRender.future_fem.future_fem_my} </li>
                      <li> {dataToRender.future_fem.future_fem_wy}</li>
                      <li> {dataToRender.future_fem.future_fem_one} </li>
                    </ul>
                  </div>
                </TabPanel>
                <TabPanel padding={0}>
                  <div className='wrapper-future-imperfect'>
                    <ul className='polish-word-list'>
                      <li>{dataToRender.imp_future.imp_future_ja} </li>
                      <li>{dataToRender.imp_future.imp_future_ty}</li>
                      <li>{dataToRender.imp_future.imp_future_on_ona_ono} </li>
                      <li>{dataToRender.imp_future.imp_future_my} </li>
                      <li>{dataToRender.imp_future.imp_future_wy} </li>
                      <li>{dataToRender.imp_future.imp_future_oni_one} </li>
                    </ul>
                  </div>
                </TabPanel>
                <TabPanel padding={0}>
                  <div className='wrapper-conditional-masculine'>
                    <ul className='polish-word-list'>
                      <li>
                        {
                          dataToRender.conditional_masculine
                            .conditional_masculine_ja
                        }
                      </li>
                      <li>
                        {
                          dataToRender.conditional_masculine
                            .conditional_masculine_ty
                        }
                      </li>
                      <li>
                        {
                          dataToRender.conditional_masculine
                            .conditional_masculine_on
                        }{' '}
                      </li>
                      <li>
                        {
                          dataToRender.conditional_masculine
                            .conditional_masculine_my
                        }{' '}
                      </li>
                      <li>
                        {
                          dataToRender.conditional_masculine
                            .conditional_masculine_wy
                        }{' '}
                      </li>
                      <li>
                        {
                          dataToRender.conditional_masculine
                            .conditional_masculine_oni
                        }{' '}
                      </li>
                    </ul>
                  </div>
                </TabPanel>
                <TabPanel padding={0}>
                  <div className='wrapper-conditional-feminine'>
                    <ul className='polish-word-list'>
                      <li>
                        {
                          dataToRender.conditional_feminine
                            .conditional_feminine_ja
                        }
                      </li>
                      <li>
                        {
                          dataToRender.conditional_feminine
                            .conditional_feminine_ty
                        }
                      </li>
                      <li>
                        {
                          dataToRender.conditional_feminine
                            .conditional_feminine_ona
                        }
                      </li>
                      <li>
                        {
                          dataToRender.conditional_feminine
                            .conditional_feminine_my
                        }
                      </li>
                      <li>
                        {
                          dataToRender.conditional_feminine
                            .conditional_feminine_wy
                        }
                      </li>
                      <li>
                        {
                          dataToRender.conditional_feminine
                            .conditional_feminine_one
                        }
                      </li>
                    </ul>
                  </div>
                </TabPanel>
                <TabPanel padding={0}>
                  <div className='wrapper-imperative'>
                    <ul className='polish-word-list'>
                      <li>{dataToRender.imperative.imperative_ja} </li>
                      <li>{dataToRender.imperative.imperative_ty}</li>
                      <li>{dataToRender.imperative.imperative_on_ona_oni} </li>
                      <li>{dataToRender.imperative.imperative_my} </li>
                      <li>{dataToRender.imperative.imperative_wy} </li>
                      <li>{dataToRender.imperative.imperative_oni} </li>
                    </ul>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          <div className='user-notes-input'>
            <form>
              <div className='translation'>
                <div className='card-button-wrapper'>
                  <div className='card-image-notes'>
                    {dataToRender.word_image.image_url && (
                      <img
                        src={dataToRender.word_image.image_url}
                        alt='img'
                        height='150'
                        width='125'
                      />
                    )}
                  </div>
                </div>

                <div className='text-to-translate'>
                  <textarea
                    onChange={handleChangeTranslationField}
                    placeholder='Tekst do przetłumaczenia'
                    name='english'
                    value={stringToTranslate}
                    fontFamily='Work sans'
                    fontSize='28px'
                  ></textarea>
                </div>

                <div className='translation-radio-buttons'>
                  <RadioGroup onChange={handleTranslationLanguage}>
                    <Stack direction='column'>
                      <Radio
                        id='eng-pl'
                        name='eng-pl'
                        value={'"source":"en","target":"pl"'}
                      >
                        Eng-Pol
                      </Radio>
                      <Radio
                        id='pl-eng'
                        name='pl-eng'
                        value={'"source":"pl","target":"en"'}
                        checked={true}
                      >
                        Pol-Eng
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <div className='spinner'>{isFetching && <Spinner />}</div>
                  <div className='translation-button'>
                    <Button
                      colorScheme='blue'
                      border={'2px solid black'}
                      size='sm'
                      onClick={handleTranslation}
                    >
                      Translate
                    </Button>
                  </div>
                  <div className='updateNotesButton'>
                    <Button
                      colorScheme='blue'
                      border={'2px solid black'}
                      size='sm'
                      id='submit-verb-button'
                      type='submit'
                      onClick={updateNotes}
                    >
                      Update notes
                    </Button>
                  </div>
                </div>

                <div className='translated-text'>
                  <textarea
                    name='polish'
                    placeholder='Przetłumaczony tekst'
                    fontFamily='Work sans'
                    defaultValue={translatedString}
                    fontSize='28px'
                  ></textarea>
                </div>

                <textarea
                  className='user-notes'
                  fontFamily='Work sans'
                  fontSize='28px'
                  id='notes'
                  name='notes'
                  rows='4'
                  cols='25'
                  value={dataToRender.notes}
                  onChange={handleChangeTextField}
                ></textarea>
              </div>

              <div className='update-notes-play-voice'>
                <TextToSpeech data={dataToRender.notes} voices={voices} />
              </div>
            </form>
          </div>
        </div>
      </ChakraProvider>
    </>
  );
};

export default Notes;
