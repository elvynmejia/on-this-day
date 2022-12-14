import { useDispatch } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import ErrorModal from './error';
import { open as openModal } from '../reducers';
import { onThisDayApi } from '../apis';

// ### Requirements
//
// - Initially there must be a button. Data is fetched and displayed after the button is clicked.
// - Entries should be ordered by their year.
// - "Loading" message/UI component must be shown while data is fetched.
// - Error modal must be shown when data fetch fails.

const Birthdays = () => {
  const defaultData = {
    births: []
  };

  const dispatch = useDispatch();
  const lazyQuery = onThisDayApi.endpoints.getBirthdays.useLazyQuery();

  const [trigger, response] = lazyQuery;

  const { isLoading, data = defaultData } = response;

  const discoverTodaysBirthdays = async (e) => {
    e.preventDefault();

    const { isError } = await trigger();

    if (isError) {
      dispatch(openModal());
    }
  };

  const births = [
    ...data.births
  ].sort((a, b) => a.year - b.year);

  return (
    <>
      <ErrorModal
        message="Error retreiving today's birthdays. Try again"
      />
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button onClick={discoverTodaysBirthdays} variant="outlined">
          Discover today's birthdays
        </Button>
      </Box>
      <List dense>
        {isLoading && <CircularProgress />}
        {births.map(({ text, year, pages }) => {
          const pageUrl = pages[0].content_urls.desktop.page;
          return (
            <ListItem
              key={text}
              button
              component="a"
              href={pageUrl}
              target="_blank"
            >
              <ListItemText primary={`${year} - ${text}`} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default Birthdays;
