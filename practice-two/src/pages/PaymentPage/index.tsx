import useDebounce from '@hooks/useDebounce';
import List from '@components/List';
import PaymentListItem from './components/PaymentListItem';
import usePaymentQuery from './hooks/usePaymentQuery';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

const PaymentPage = () => {
  // Debounce the search query change
  const [searchParams] = useSearchParams({ q: '' });
  const debouncedSearchQuery = useDebounce(searchParams.get('q') || '');

  // Get payments
  const query = `?_sort=createdAt&_order=desc&student_name_like=${debouncedSearchQuery}`;

  const { payments, isError, error, isLoading } = usePaymentQuery({
    query: query,
  });

  return (
    <article className="min-w-min px-8">
      <header className="flex items-center justify-between border-b bg-white py-3">
        <h1 className="text-3xl font-700">payments list</h1>
      </header>
      <hr />
      <div className="payments py-3">
        <div className="payment-list-heading grid whitespace-nowrap font-600 text-custom-medium-gray">
          <span>id</span>
          <span>student</span>
          <span>course</span>
          <span>paid</span>
          <span>amount</span>
          <span>date</span>
          <span></span>
        </div>
        <List isError={isError} isLoading={isLoading} error={error as Error}>
          {useMemo(
            () =>
              payments?.length ? (
                payments.map((item) => (
                  <PaymentListItem key={item.id} payment={item} />
                ))
              ) : (
                <p className="text-center text-custom-dark-gray">not found</p>
              ),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [payments]
          )}
        </List>
      </div>
    </article>
  );
};

export default PaymentPage;
