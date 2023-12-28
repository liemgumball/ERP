import Button from '@components/Button';
import { formatDate, formatAmount } from '@services/format';
import { TPayment } from 'src/types';
import eye from '@assets/eye.svg';
import { NOTIFIES_MSG } from '@constants/messages';

type PaymentListItemProps = {
  payment: any;
};

const PaymentListItem = ({ payment }: PaymentListItemProps) => {
  const { id, student, course, paid, amount, paid_at } = payment;

  console.log(payment);

  const viewDetailClick = () => {
    alert(NOTIFIES_MSG.FUTURE_FEATURE);
  };

  return (
    <li data-id={id} className="payment-list-item group relative">
      <p className="truncate">{id}</p>
      <p className="truncate normal-case">{student?.name}</p>
      <p className="truncate">{course?.name}</p>
      <p className="truncate normal-case">{paid ? 'Paid' : 'Not yet'}</p>
      <p className="truncate uppercase">inr {formatAmount(amount)}</p>
      <p className="truncate uppercase">{paid_at}</p>
      <div className="action-group flex justify-end gap-x-2">
        <Button
          className="view-details-btn group-hover:bg-custom-light-pink group-hover:hover:bg-white"
          onClick={viewDetailClick}
        >
          <img src={eye} alt="eye" loading="eager" />
        </Button>
      </div>
    </li>
  );
};

export default PaymentListItem;
