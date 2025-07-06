import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import type { IButtonProps } from "../../types/components/button";
import styles from "./Button.module.scss";

describe('Button Component', () => {
  const defaultProps: IButtonProps = {
    text: 'Test Button',
    onClick: vi.fn(),
  };

  const renderButton = (props: Partial<IButtonProps> = {}) => {
    return render(<Button {...defaultProps} {...props} />);
  };

  it('renders correctly with default props', () => {
    renderButton();
    
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass(styles.button);
    expect(button).toHaveClass(styles.medium);
    expect(button).toHaveClass(styles.black);
    expect(button).not.toBeDisabled();
  });

  it('applies correct size and color classes', () => {
    renderButton({ size: 'small', color: 'red' });
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(styles.small);
    expect(button).toHaveClass(styles.red);
    expect(button).not.toHaveClass(styles.medium);
    expect(button).not.toHaveClass(styles.black);
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    renderButton({ onClick: handleClick });
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    renderButton({ isDisabled: true, onClick: handleClick });
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('does not call onClick when loading', () => {
    const handleClick = vi.fn();
    renderButton({ isLoading: true, onClick: handleClick });
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('shows loading state correctly', () => {
    renderButton({ isLoading: true, loadingText: 'Please wait...' });
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Please wait...');
    expect(button).toHaveClass(styles.loading);
    expect(screen.getByTestId('button-loader')).toBeInTheDocument();
  });

  it('applies disabled styles when disabled', () => {
    renderButton({ isDisabled: true });
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(styles.disabled);
    expect(button).toBeDisabled();
  });

  it('matches snapshot with default props', () => {
    const { asFragment } = renderButton();
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot when loading', () => {
    const { asFragment } = renderButton({ isLoading: true });
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot when disabled', () => {
    const { asFragment } = renderButton({ isDisabled: true });
    expect(asFragment()).toMatchSnapshot();
  });
});