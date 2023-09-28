import List from '@components/List';
import PaymentListItem from './components/PaymentListItem';

// constants
import { DATABASE_RESOURCES } from '@constants/services';

type PaymentListProps = {
  keyword: string;
};

const PaymentList = (props: PaymentListProps) => {
  const { keyword } = props;

  // the request will be called automatically every time this url changes
  const url = `${process.env.API_GATEWAY}/${DATABASE_RESOURCES.PAYMENTS}?_expand=student&?_sort=createdAt&_order=desc&q=${keyword}`;

  return <List ItemComponent={PaymentListItem} url={url}></List>;
};

export default PaymentList;
