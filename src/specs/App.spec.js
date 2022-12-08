import {
  render,
  screen,
  within,
  fireEvent,
  getAllByRole,
  waitFor
} from '@testing-library/react';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

import App from '../App';
import { apiUrl as url, server, testQueryClient } from './testUtils';

beforeAll(() => server.listen());

afterEach(async () => {
  await testQueryClient.invalidateQueries({ stale: true });
  server.resetHandlers();
});

afterAll(() => server.close());

describe('App', () => {
  test('renders application with default state', async () => {
    render(<App />);
    const button = screen.getByText(/Discover today's birthdays/i);
    expect(button).toBeInTheDocument();

    await waitFor(() => {
      const links = screen.queryAllByRole('link');
      expect(links.length).toBe(0);
    });
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
    render(<App queryClient={testQueryClient} />);

    server.use(
      rest.get(url, (req, res, ctx) => {
        return res.once(
          ctx.status(400),
          ctx.json({}),
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
});
