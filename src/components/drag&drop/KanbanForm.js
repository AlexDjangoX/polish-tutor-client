import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../button/Button.js';
import { v4 as uuidv4 } from 'uuid';
import './KanbanForm.css';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';

const initialData = {
  id: uuidv4(),
  delete: false,
  notes: '',
  word_image: { polish_word: '', english_word: '', image_url: '' },
  gram_case: {
    case: '',
    aspect: '',
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
    imp_future_ja: 'będę ',
    imp_future_ty: 'będziesz ',
    imp_future_on_ona_ono: 'będzie ',
    imp_future_my: 'będziemy ',
    imp_future_wy: 'będziecie ',
    imp_future_oni_one: 'będą ',
  },
  future_fem: {
    future_fem_ja: 'będę ',
    future_fem_ty: 'będziesz ',
    future_fem_ona: 'będzie ',
    future_fem_my: 'będziemy ',
    future_fem_wy: 'będziecie ',
    future_fem_one: 'będą ',
  },
  future_masc: {
    future_masc_ja: 'będę ',
    future_masc_ty: 'będziesz ',
    future_masc_on: 'będzie ',
    future_masc_my: 'będziemy ',
    future_masc_wy: 'będziecie ',
    future_masc_oni: 'będą ',
  },
};

const KanbanForm = ({
  setOpen,
  columns,
  currentVerb,
  setCurrentVerb,
  isEditing,
  setIsEditing,
}) => {
  const resetState = Object.assign({}, initialData);
  const [verb, setVerb] = useState({ ...resetState, id: uuidv4() });
  const { user, getAccessTokenSilently } = useAuth0();

  const handleChange = (event) => {
    const { value, name } = event.target;
    const initialDataKeys = Object.keys(initialData).slice(1);

    initialDataKeys.forEach((el) => {
      if (Object.keys(initialData[el]).includes(name)) {
        setVerb((previous) => {
          const newVerb = JSON.parse(JSON.stringify({ ...previous }));
          newVerb[el][name] = value;
          return newVerb;
        });
      }
    });

    if (isEditing) {
      initialDataKeys.forEach((el) => {
        if (Object.keys(initialData[el]).includes(name)) {
          setCurrentVerb((previous) => {
            const newVerb = { ...previous };
            newVerb[el][name] = value;
            return newVerb;
          });
        }
      });
    }
  };

  // const postToDb = () => {
  //   axios
  //     .post(`http://localhost:8000/position`, columns)
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (!isEditing) {
  //     columns.columnOne.items.push(verb);
  //   }
  //   setVerb({ ...resetState });

  //   postToDb();
  //   setOpen(false);
  // };

  // useEffect(() => {
  //   setTimeout(postToDb, 900);
  // }, [columns]);

  const postToExpressApp = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `http://localhost:4000/protected/kanban/${user.sub}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(columns),
        }
      );

      console.log('PUT to express app', response.status);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isEditing) {
      columns.column_A.items.push(verb);
    }
    setVerb({ ...resetState });

    postToExpressApp();
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(postToExpressApp, 900);
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

      <form>
        <div>
          <ChakraProvider>
            <Box borderRadius='lg' border='1px' borderColor='gray.200'>
              <Grid
                templateColumns='repeat(6, 1fr) '
                gap={65}
                bg='blue.400'
                pl={25}
              >
                <GridItem>
                  <RadioGroup className='radio-buttons'>
                    <Stack direction='column'>
                      <Radio
                        type='radio'
                        id='dokonany'
                        name='aspect'
                        value='Dokonany'
                        checked={
                          isEditing
                            ? currentVerb.gram_case.aspect === 'Dokonany'
                            : verb.gram_case.aspect === 'Dokonany'
                        }
                        onChange={handleChange}
                      >
                        Dokonany
                      </Radio>
                      <Radio
                        type='radio'
                        id='niedokonany'
                        name='aspect'
                        value='Niedokonany'
                        checked={
                          isEditing
                            ? currentVerb.gram_case.aspect === 'Niedokonany'
                            : verb.gram_case.aspect === 'Niedokonany'
                        }
                        onChange={handleChange}
                      >
                        Niedokonany
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </GridItem>
                <GridItem>
                  <div className='gram-case'>
                    <label htmlFor='gram_case'>Case</label>
                    <select
                      id='gram_case'
                      name='case'
                      onChange={handleChange}
                      value={
                        isEditing
                          ? currentVerb.gram_case.case
                          : verb.gram_case.case
                      }
                    >
                      <option value='Mianownik'>Mianownik</option>
                      <option value='Dopełniacz'>Dopełniacz</option>
                      <option value='Celownik'>Celownik</option>
                      <option value='Biernik'>Biernik</option>
                      <option value='Narzędnik'>Narzędnik</option>
                      <option value='Miejscownik'>Miejscownik</option>
                      <option value='Wołacz'>Wołacz</option>
                    </select>
                  </div>
                </GridItem>
                <GridItem>
                  <div className='pol-eng-infin'>
                    <label htmlFor='polish_word'>Polish Verb</label>
                    <input
                      placeholder=''
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
                      placeholder=''
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
                </GridItem>
                <GridItem>
                  <div className='image_url'>
                    <label htmlFor='image_url'>Image URL</label>
                    <input
                      placeholder=''
                      id='image_url'
                      type='text'
                      name='image_url'
                      onChange={handleChange}
                      value={
                        isEditing
                          ? currentVerb.word_image.image_url
                          : verb.word_image.image_url
                      }
                    />
                  </div>
                </GridItem>
                <GridItem>
                  <div className='submit-button'>
                    <Button
                      buttonStyle='btn--add-new-verb'
                      buttonSize='btn--medium'
                      id='submit-verb-button'
                      type='submit'
                      onClick={handleSubmit}
                    >
                      {!isEditing ? 'Submit' : 'Update'}
                    </Button>
                  </div>
                </GridItem>
                <GridItem>
                  <div className='close-modal-button'>
                    <Button
                      buttonStyle='btn--add-new-verb'
                      buttonSize='btn--medium'
                      onClick={() => exitEditForm()}
                    >
                      Exit
                    </Button>
                  </div>
                </GridItem>
              </Grid>
              <Box bg='blue.200' w='100%' p={4}>
                <Tabs isFitted variant='soft-rounded' colorScheme='blue'>
                  <TabList mb='1em'>
                    <Tab>Present Tense</Tab>
                    <Tab>Past Masculine</Tab>
                    <Tab>Past Feminine</Tab>
                    <Tab>Future Masculine</Tab>
                    <Tab>Future Feminine</Tab>
                    <Tab>Future Imperfect</Tab>

                    {/* <Tab>Conditional Feminine</Tab>
                    <Tab>Conditional Perfect Feminine</Tab>
                    <Tab>Conditional Masculine</Tab>
                    <Tab>Conditional Perfect Masculine</Tab> */}
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <div className='present-tense'>
                        <div className='table-entry'>
                          <label htmlFor='present_ja'>Czas teraźniejszy</label>
                          <input
                            placeholder='Ja jestem'
                            id='present_ja'
                            type='text'
                            name='present_ja'
                            required
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.present.present_ja
                                : verb.present.present_ja
                            }
                          />
                        </div>
                        <div className='table-entry'>
                          <label htmlFor='present_ty'>Czas teraźniejszy</label>
                          <input
                            placeholder='Ty jesteś'
                            id='present_ty'
                            type='text'
                            name='present_ty'
                            required
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.present.present_ty
                                : verb.present.present_ty
                            }
                          />
                        </div>
                        <div className='table-entry'>
                          <label htmlFor='present_on_ona_ono'>
                            Czas teraźniejszy
                          </label>
                          <input
                            placeholder='On jest'
                            id='present_on_ona_ono'
                            type='text'
                            name='present_on_ona_ono'
                            required
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.present.present_on_ona_ono
                                : verb.present.present_on_ona_ono
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='present_my'>Czas teraźniejszy</label>
                          <input
                            placeholder='My jesteśmy'
                            id='present_my'
                            type='text'
                            name='present_my'
                            required
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.present.present_my
                                : verb.present.present_my
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='present_wy'>Czas teraźniejszy</label>
                          <input
                            placeholder='Wy jesteście'
                            id='present_wy'
                            type='text'
                            name='present_wy'
                            required
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.present.present_wy
                                : verb.present.present_wy
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='present_oni_one'>
                            Czas teraźniejszy
                          </label>
                          <input
                            placeholder='Oni/one są'
                            id='present_oni_one'
                            type='text'
                            name='present_oni_one'
                            required
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.present.present_oni_one
                                : verb.present.present_oni_one
                            }
                          />
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className='past-masculine'>
                        <div className='table-entry'>
                          <label htmlFor='past_ja_masc'>Przeszłość męska</label>
                          <input
                            placeholder='Ja byłem'
                            id='past_ja_masc'
                            type='text'
                            name='past_ja_masc'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.past.past_ja_masc
                                : verb.past.past_ja_masc
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='past_ty_masc'>Przeszłość męska</label>
                          <input
                            placeholder='Ty byłeś'
                            id='past_ty_masc'
                            type='text'
                            name='past_ty_masc'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.past.past_ty_masc
                                : verb.past.past_ty_masc
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='past_on_masc'>Przeszłość męska</label>
                          <input
                            placeholder='On był'
                            id='past_on_masc'
                            type='text'
                            name='past_on_masc'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.past.past_on_masc
                                : verb.past.past_on_masc
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='past_my_masc'>Przeszłość męska</label>
                          <input
                            placeholder='My byliśmy'
                            id='past_my_masc'
                            type='text'
                            name='past_my_masc'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.past.past_my_masc
                                : verb.past.past_my_masc
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='past_wy_masc'>Przeszłość męska</label>
                          <input
                            placeholder='Wy byliście'
                            id='past_wy_masc'
                            type='text'
                            name='past_wy_masc'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.past.past_wy_masc
                                : verb.past.past_wy_masc
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='past_oni_masc'>
                            Przeszłość męska
                          </label>
                          <input
                            placeholder='Oni byli'
                            id='past_oni_masc'
                            type='text'
                            name='past_oni_masc'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.past.past_oni_masc
                                : verb.past.past_oni_masc
                            }
                          />
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className='past-feminine'>
                        <div className='table-entry'>
                          <label htmlFor='past_ja_fem'>Przeszłość żeński</label>
                          <input
                            placeholder='Ja byłam'
                            id='past_ja_fem'
                            type='text'
                            name='past_ja_fem'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.past.past_ja_fem
                                : verb.past.past_ja_fem
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='past_ty_fem'>Przeszłość żeński</label>
                          <input
                            placeholder='Ty byłaś'
                            id='past_ty_fem'
                            type='text'
                            name='past_ty_fem'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.past.past_ty_fem
                                : verb.past.past_ty_fem
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='past_ona_fem'>
                            Przeszłość żeński
                          </label>
                          <input
                            placeholder='Ona była'
                            id='past_ona_fem'
                            type='text'
                            name='past_ona_fem'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.past.past_ona_fem
                                : verb.past.past_ona_fem
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='past_my_fem'>Przeszłość żeński</label>
                          <input
                            placeholder='My byłyśmy'
                            id='past_my_fem'
                            type='text'
                            name='past_my_fem'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.past.past_my_fem
                                : verb.past.past_my_fem
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='past_wy_fem'>Przeszłość żeński</label>
                          <input
                            placeholder='Wy byłyście'
                            id='past_wy_fem'
                            type='text'
                            name='past_wy_fem'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.past.past_wy_fem
                                : verb.past.past_wy_fem
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='past_one_fem'>
                            Przeszłość żeński
                          </label>
                          <input
                            placeholder='One były'
                            id='past_one_fem'
                            type='text'
                            name='past_one_fem'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.past.past_one_fem
                                : verb.past.past_one_fem
                            }
                          />
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className='future-masculine'>
                        <div className='table-entry'>
                          <label htmlFor='future_masc_ja'>Przyszły męski</label>
                          <input
                            placeholder='Ja będę'
                            id='future_masc_ja'
                            type='text'
                            name='future_masc_ja'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.future_masc.future_masc_ja
                                : verb.future_masc.future_masc_ja
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='future_masc_ty'>Przyszły męski</label>
                          <input
                            placeholder='Ty będziesz'
                            id='future_masc_ty'
                            type='text'
                            name='future_masc_ty'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.future_masc.future_masc_ty
                                : verb.future_masc.future_masc_ty
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='future_masc_on'>Przyszły męski</label>
                          <input
                            placeholder='On będzie'
                            id='future_masc_on'
                            type='text'
                            name='future_masc_on'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.future_masc.future_masc_on
                                : verb.future_masc.future_masc_on
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='future_masc_my'>Przyszły męski</label>
                          <input
                            placeholder='My będziemy'
                            id='future_masc_my'
                            type='text'
                            name='future_masc_my'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.future_masc.future_masc_my
                                : verb.future_masc.future_masc_my
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='future_masc_wy'>Przyszły męski</label>
                          <input
                            placeholder='Wy będziecie'
                            id='future_masc_wy'
                            type='text'
                            name='future_masc_wy'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.future_masc.future_masc_wy
                                : verb.future_masc.future_masc_wy
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='future_masc_oni'>
                            Przyszły męski
                          </label>
                          <input
                            placeholder='Oni będą'
                            id='future_masc_oni'
                            type='text'
                            name='future_masc_oni'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.future_masc.future_masc_oni
                                : verb.future_masc.future_masc_oni
                            }
                          />
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className='future-feminine'>
                        <div className='table-entry'>
                          <label htmlFor='future_fem_ja'>Przyszły żeński</label>
                          <input
                            placeholder='Ja będę'
                            id='future_fem_ja'
                            type='text'
                            name='future_fem_ja'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.future_fem.future_fem_ja
                                : verb.future_fem.future_fem_ja
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          {' '}
                          <label htmlFor='future_fem_ty'>Przyszły żeński</label>
                          <input
                            placeholder='Ty będziesz'
                            id='future_fem_ty'
                            type='text'
                            name='future_fem_ty'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.future_fem.future_fem_ty
                                : verb.future_fem.future_fem_ty
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='future_fem_ona'>
                            Przyszły żeński
                          </label>
                          <input
                            placeholder='Ona będzie'
                            id='future_fem_ona'
                            type='text'
                            name='future_fem_ona'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.future_fem.future_fem_ona
                                : verb.future_fem.future_fem_ona
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          {' '}
                          <label htmlFor='future_fem_my'>Przyszły żeński</label>
                          <input
                            placeholder='My będziemy'
                            id='future_fem_my'
                            type='text'
                            name='future_fem_my'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.future_fem.future_fem_my
                                : verb.future_fem.future_fem_my
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='future_fem_wy'>Przyszły żeński</label>
                          <input
                            placeholder='Wy będziecie'
                            id='future_fem_wy'
                            type='text'
                            name='future_fem_wy'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.future_fem.future_fem_wy
                                : verb.future_fem.future_fem_wy
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='future_fem_one'>
                            Przyszły żeński
                          </label>
                          <input
                            placeholder='Oni będą'
                            id='future_fem_one'
                            type='text'
                            name='future_fem_one'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.future_fem.future_fem_one
                                : verb.future_fem.future_fem_one
                            }
                          />
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className='future-imperfect'>
                        <div className='table-entry'>
                          {' '}
                          <label htmlFor='imp_future_ja'>
                            Przyszły niedoskonały
                          </label>
                          <input
                            placeholder=''
                            id='imp_future_ja'
                            type='text'
                            name='imp_future_ja'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.imp_future.imp_future_ja
                                : verb.imp_future.imp_future_ja
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          {' '}
                          <label htmlFor='imp_future_ty'>
                            Przyszły niedoskonały
                          </label>
                          <input
                            placeholder=''
                            id='imp_future_ty'
                            type='text'
                            name='imp_future_ty'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.imp_future.imp_future_ty
                                : verb.imp_future.imp_future_ty
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='imp_future_on_ona_ono'>
                            Przyszły niedoskonały
                          </label>
                          <input
                            placeholder=''
                            id='imp_future_on_ona_ono'
                            type='text'
                            name='imp_future_on_ona_ono'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.imp_future.imp_future_on_ona_ono
                                : verb.imp_future.imp_future_on_ona_ono
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='imp_future_my'>
                            Przyszły niedoskonały
                          </label>
                          <input
                            placeholder=''
                            id='imp_future_my'
                            type='text'
                            name='imp_future_my'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.imp_future.imp_future_my
                                : verb.imp_future.imp_future_my
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='imp_future_wy'>
                            Przyszły niedoskonały
                          </label>
                          <input
                            placeholder=''
                            id='imp_future_wy'
                            type='text'
                            name='imp_future_wy'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.imp_future.imp_future_wy
                                : verb.imp_future.imp_future_wy
                            }
                          />
                        </div>

                        <div className='table-entry'>
                          <label htmlFor='imp_future_oni_one'>
                            Przyszły niedoskonały
                          </label>
                          <input
                            placeholder=''
                            id='imp_future_oni_one'
                            type='text'
                            name='imp_future_oni_one'
                            onChange={handleChange}
                            value={
                              isEditing
                                ? currentVerb.imp_future.imp_future_oni_one
                                : verb.imp_future.imp_future_oni_one
                            }
                          />
                        </div>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>
          </ChakraProvider>
        </div>
      </form>
    </>
  );
};

export default KanbanForm;
