import axios from 'axios';

const fetchBirthdays = async (logger) => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const url = [
    process.env.REACT_APP_ON_THIS_DAY_API_URL,
    'births',
    month,
    day,
  ].join('/');

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    logger.error(`Error fetching data from: url ${url}, error: ${e}`);
    throw e;
  }
};

export default fetchBirthdays;
