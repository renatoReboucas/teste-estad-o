import {ButtonHTMLAttributes} from 'react'
import Loading from './Loading';
import clsx from 'clsx';

type Variants = 'destroy' | 'disabled'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variants
  isLoading?: boolean
}
export default function Button({
  variant,
  children,
  isLoading,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button 
    className={clsx(
      'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
      {
        "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900": variant === 'destroy',
        "text-gray-400 bg-gray-200 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:text-gray-400": variant === 'disabled',
      },
      className
    )}
    {...rest}
    >
      {isLoading ? <Loading /> : children}
    </button>
  );
}