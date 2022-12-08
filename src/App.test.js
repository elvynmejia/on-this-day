import {
  render,
  screen,
  within,
  fireEvent,
  getAllByRole,
  waitFor
} from '@testing-library/react';

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

import { rest } from 'msw';
import { setupServer } from 'msw/node'

import userEvent from '@testing-library/user-event'

import App from './App';
import Birthdays from './components/birthdays';

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
    logger: {
        log: console.log,
        warn: console.warn,
        error: () => {},
    }
});

const testClient = createTestQueryClient();

const today = new Date();
const month = today.getMonth() + 1;
const day = today.getDate();

const url = [
  process.env.REACT_APP_ON_THIS_DAY_API_URL,
  'births',
  month,
  day,
].join('/');

const server = setupServer(
  rest.get(url, (req, res, ctx) => {
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
  }),
)

beforeAll(() => server.listen());

afterEach(async () => {
  await testClient.invalidateQueries({ stale: true });
  server.resetHandlers();
});

afterAll(() => server.close());

test('renders application with default state', () => {
  render(<App />);
  const button = screen.getByText(/Discover today's birthdays/i);
  expect(button).toBeInTheDocument();

  const list = screen.getByRole("list");
  const { queryByRole } = within(list);
  const items = queryByRole("listitem");
  expect(items).not.toBeInTheDocument();
});

test('renders a list when button in clicked', async () => {
  render(<App />);

  const button = screen.getByText(/Discover today's birthdays/i);

  expect(button).toBeInTheDocument();

  await userEvent.click(button);

  expect(
    screen.getByRole('progressbar')
  ).toBeInTheDocument();

  await waitFor(() => {
    const links = screen.getAllByRole('link');

    expect(
      screen.getByText(/2020 - Dottie and Gee Gee/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link')
    ).toHaveAttribute('href', 'url');

    expect(links.length).toBe(1);
  });
});

test('shows error modal when data fetch fails', async () => {
  render(<App queryClient={testClient} />);

  server.use(
    rest.get(url, (req, res, ctx) => {
      return res.once(
        ctx.status(500),
        ctx.json({ message: 'Internal server error' }),
      )
    })
  );

  const button = screen.getByText(/Discover today's birthdays/i);

  expect(button).toBeInTheDocument();

  await userEvent.click(button);

  expect(
    screen.getByRole('progressbar')
  ).toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.getByText(/Error retreiving today's birthdays. Try again/i)
    ).toBeInTheDocument();
  });
});
