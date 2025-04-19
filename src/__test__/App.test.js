import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this to add extra matchers like `toBeInTheDocument`
import App from '../App';

describe('boundary', () => {

  test('AppComponent boundary renders the dynamic form with inputs', () => {
    render(<App />);
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Accept Terms')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
  });

  test('AppComponent boundary shows validation error for empty required fields', () => {
    render(<App />);
    const submitButton = screen.getByText('Submit');

    fireEvent.click(submitButton);

    expect(screen.getByText('Full Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Age is required.')).toBeInTheDocument();
    expect(screen.getByText('You must accept the terms.')).toBeInTheDocument();
    expect(screen.getByText('Gender is required.')).toBeInTheDocument();
  });

  test('AppComponent boundary allows form submission when all fields are filled correctly', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.click(screen.getByLabelText('Accept Terms'));
    fireEvent.change(screen.getByLabelText('Gender'), { target: { value: 'Male' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(screen.queryByText('Full Name is required.')).not.toBeInTheDocument();
    expect(screen.queryByText('Email is required.')).not.toBeInTheDocument();
    expect(screen.queryByText('Age is required.')).not.toBeInTheDocument();
    expect(screen.queryByText('You must accept the terms.')).not.toBeInTheDocument();
    expect(screen.queryByText('Gender is required.')).not.toBeInTheDocument();
  });
});
