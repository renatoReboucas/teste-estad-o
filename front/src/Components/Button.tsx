import {ButtonHTMLAttributes} from 'react'
import Loading from './Loading';
import clsx from 'clsx';

type Variants = 'primary' | 'destroy' | 'disabled' | 'edit'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variants
  isLoading?: boolean
}
export default function Button({
  variant = 'primary',
  children,
  isLoading,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button 
    className={clsx(
      'bg-blue-500 text-white rounded hover:bg-blue-600 p-1 cursor-pointer',
      {
        'px-4 py-2': variant === 'primary',
        "bg-red-500  hover:bg-red-600 ": variant === 'destroy',
        "bg-yellow-500  hover:bg-yellow-600": variant === 'edit',
        "bg-gray-500 hover:bg-gray-600 cursor-not-allowed": variant === 'disabled',
      },
      className
    )}
    {...rest}
    >
      {isLoading ? <Loading /> : children}
    </button>
  );
}