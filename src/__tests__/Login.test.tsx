// Login.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login';

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    // Add assertions based on your component's structure
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('submits form on button click', async () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    // Add assertions for the expected behavior after form submission
    await waitFor(() => {
      // Add assertions based on the behavior you expect after form submission
    });
  });
});
