const fetchBirthdays = async (logger) => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const url = [
    process.env.REACT_APP_ON_THIS_DAY_API_URL,
    'births',
    month,
    day
  ].join('/');

  const response = await fetch(url);

  if (!response.ok) {
    logger.error(`Error fetching data from: url ${url}, error: ${response.error}`);
    throw new Error('Error');
  }

  return response.json();
};

export default fetchBirthdays;
