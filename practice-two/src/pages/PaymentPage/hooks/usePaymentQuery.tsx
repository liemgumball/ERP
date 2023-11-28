import { PAYMENTS_URL } from '@constants/services';
import api from '@services/apiRequest';
import { useQuery } from 'react-query';
import { TPayment } from 'src/types';

type PaymentQueryOptions = {
  query: string;
};

const usePaymentQuery = (options: PaymentQueryOptions) => {
  const { query } = options;

  const {
    data: payments,
    isError,
    error,
    isLoading,
  } = useQuery<TPayment[], Error>(
    ['payments', query],
    async () => (await api.get(PAYMENTS_URL + query)) as TPayment[]
  );

  return { payments, isError, error, isLoading };
};

export default usePaymentQuery;