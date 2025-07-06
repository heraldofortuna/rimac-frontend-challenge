import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from './Loader';
import styles from './Loader.module.scss';

describe('Loader Component', () => {
  it('renders without crashing', () => {
    render(<Loader />);
    const loaderContainer = screen.getByTestId('loader-container');
    expect(loaderContainer).toBeInTheDocument();
  });

  it('has the correct container class', () => {
    render(<Loader />);
    const loaderContainer = screen.getByTestId('loader-container');
    expect(loaderContainer).toHaveClass(styles.loaderContainer);
  });

  it('contains the loader element with correct class', () => {
    render(<Loader />);
    const loaderElement = screen.getByTestId('loader-element');
    expect(loaderElement).toHaveClass(styles.loader);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Loader />);
    expect(asFragment()).toMatchSnapshot();
  });
});