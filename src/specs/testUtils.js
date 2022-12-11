import { rest } from 'msw';
import { setupServer } from 'msw/node';

const today = new Date();
const month = today.getMonth() + 1;
const day = today.getDate();
const apiUrl = [
  process.env.REACT_APP_ON_THIS_DAY_API_URL,
  'births',
  month,
  day,
].join('/');

const server = setupServer(
  rest.get(apiUrl, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        births: [{
          text: 'Dottie and Gee Gee',
          year: 2020,
          pages: [{
            content_urls: {
              desktop: {
                page: 'url'
              }
            }
          }]
        }]
      })
    )
  })
);

export { apiUrl, server };
