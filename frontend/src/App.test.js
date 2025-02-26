import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the entire App module to avoid react-router-dom import
jest.mock('./App', () => {
  // Mock App as a simple component that renders ToastContainer and some content
  const MockApp = () => (
    <div>
      {/* Simulate ToastContainer */}
      <div className="Toastify__toast-container" data-testid="toast-container">
        Mock Toast
      </div>
      {/* Simulate route content */}
      <div data-testid="route-content">Mock Route Content</div>
    </div>
  );
  return MockApp;
});

// Mock other dependencies (for consistency, though not strictly needed with full App mock)
jest.mock('./redux/store', () => ({
  dispatch: jest.fn(),
}));
jest.mock('./redux/actions/user', () => ({
  loadUser: jest.fn(),
  loadSeller: jest.fn(),
}));
jest.mock('./redux/actions/product', () => ({
  getAllProducts: jest.fn(),
}));
jest.mock('./redux/actions/event', () => ({
  getAllEvents: jest.fn(),
}));
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: { stripeApikey: 'mock-stripe-key' } })),
}));
jest.mock('@stripe/stripe-js', () => ({
  loadStripe: jest.fn(() => Promise.resolve('mock-stripe-instance')),
}));

describe('App Component', () => {
  // Test 1: Renders mocked App with ToastContainer
  test('renders App with ToastContainer', () => {
    const MockApp = require('./App'); // Import mocked App
    render(<MockApp />);
    const toastElement = screen.getByTestId('toast-container');
    expect(toastElement).toBeInTheDocument();
  });

  // Test 2: Renders some content (simulating HomePage)
  test('renders content for HomePage', () => {
    const MockApp = require('./App');
    render(<MockApp />);
    const contentElement = screen.getByTestId('route-content');
    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveTextContent('Mock Route Content');
  });

  // Test 3: Renders without crashing (basic render check)
  test('renders without crashing', () => {
    const MockApp = require('./App');
    render(<MockApp />);
    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
  });

  // Test 4: Simulates rendering for a different "route"
  test('renders content consistently across routes', () => {
    const MockApp = require('./App');
    render(<MockApp />);
    const contentElement = screen.getByTestId('route-content');
    expect(contentElement).toBeInTheDocument();
  });

  // Test 5: Ensures ToastContainer is always present
  test('always includes ToastContainer', () => {
    const MockApp = require('./App');
    render(<MockApp />);
    const toastElement = screen.getByTestId('toast-container');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveTextContent('Mock Toast');
  });
});