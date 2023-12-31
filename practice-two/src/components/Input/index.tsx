import { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = {
  inValid?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { inValid, className, ...rest } = props;

  return (
    <input
      aria-invalid={inValid}
      className={twMerge(
        `border p-4 my-2 rounded-md ${inValid ? 'border-red-500' : ''}`,
        className
      )}
      ref={ref}
      {...rest}
    />
  );
});

export default Input;
