import { MouseEvent } from 'react';

export type ListProps = {
  className?: string;
  isError?: boolean;
  error?: Error;
  isLoading?: boolean;
  onClick?: (event: MouseEvent) => void;
  children?: React.ReactNode;
};

const List: React.FC<ListProps> = (props) => {
  const { isError, error, isLoading, onClick, children, className } = props;

  // loading
  if (isLoading)
    return (
      <p className="animate-bounce text-center text-custom-dark-gray">
        Loading...
      </p>
    );

  // show error
  if (isError)
    return (
      <p role="alert" className="text-center font-600 text-red-500">
        {error?.message || 'Unexpected error'}
      </p>
    );

  // fetch successfully
  return (
    <ul className={className} onClick={onClick}>
      {children}
    </ul>
  );
};

export default List;
