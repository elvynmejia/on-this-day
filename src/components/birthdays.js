import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const logger = console;

// ### Requirements
//
// - Initially there must be a button. Data is fetched and displayed after the button is clicked.
// - Entries should be ordered by their year.
// - "Loading" message/UI component must be shown while data is fetched.
// - Error modal must be shown when data fetch fails.

const fetchBirthdays = async (page) => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  // const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`;

  const url = [
    process.env.REACT_APP_ON_THIS_DAY_API_URL,
    "births",
    month,
    day,
  ].join("/");
  console.log({ url });
  try {
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    logger.error(`Error fetching data from: url ${url}, error: ${e}`);
    throw e;
  }
};

const Birthdays = () => {
  const [shouldGetBirthdays, getBirthdays] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["GET_BIRTHDAYS", shouldGetBirthdays],
    queryFn: fetchBirthdays,
    enabled: shouldGetBirthdays, // disabled as long as shouldGetBirthdays is false
  });

  const discoverTodaysBirthdays = (e) => {
    e.preventDefault();
    getBirthdays(true);
  };

  const births = data?.births.sort((a, b) => a.year - b.year) || [];
  return (
    <>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onClick={discoverTodaysBirthdays} variant="outlined">
          Discover today's birthdays
        </Button>
      </Box>
      <List dense>
        {shouldGetBirthdays && isLoading && <CircularProgress />}
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
