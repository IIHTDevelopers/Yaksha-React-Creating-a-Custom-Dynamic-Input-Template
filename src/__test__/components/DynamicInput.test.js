import { render, screen, fireEvent } from '@testing-library/react';
import DynamicInput from '../../components/DynamicInput';
import '@testing-library/jest-dom'; // Import jest-dom matchers

describe('boundary', () => {

    test('DynamicInputComponent boundary renders text input', () => {
        const config = { type: 'text', label: 'Full Name', name: 'fullName', required: true };
        render(<DynamicInput config={config} value="" onChange={() => { }} />);
        const input = screen.getByLabelText('Full Name');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');
    });

    test('DynamicInputComponent boundary renders email input', () => {
        const config = { type: 'email', label: 'Email', name: 'email', required: true };
        render(<DynamicInput config={config} value="" onChange={() => { }} />);
        const input = screen.getByLabelText('Email');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'email');
    });

    test('DynamicInputComponent boundary renders checkbox input', () => {
        const config = { type: 'checkbox', label: 'Accept Terms', name: 'acceptTerms', required: true };
        render(<DynamicInput config={config} value={false} onChange={() => { }} />);
        const checkbox = screen.getByLabelText('Accept Terms');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveAttribute('type', 'checkbox');
    });

    test('DynamicInputComponent boundary renders dropdown input', () => {
        const config = { type: 'dropdown', label: 'Gender', name: 'gender', options: ['Male', 'Female'], required: true };
        render(<DynamicInput config={config} value="" onChange={() => { }} />);
        const select = screen.getByLabelText('Gender');
        expect(select).toBeInTheDocument();
        expect(select).toHaveAttribute('name', 'gender');
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(3); // including the default option
    });

    test('DynamicInputComponent boundary displays error message when invalid', () => {
        const config = { type: 'text', label: 'Full Name', name: 'fullName', required: true };
        render(<DynamicInput config={config} value="" onChange={() => { }} error="Full Name is required." />);
        const errorMessage = screen.getByText('Full Name is required.');
        expect(errorMessage).toBeInTheDocument();
    });
});
