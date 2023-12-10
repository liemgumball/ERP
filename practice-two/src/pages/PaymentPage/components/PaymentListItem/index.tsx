import Button from '@components/Button';
import { formatDate, formatAmount } from '@services/format';
import { TPayment } from 'src/types';
import eye from '@assets/eye.svg';
import { NOTIFIES_MSG } from '@constants/messages';

type PaymentListItemProps = {
  payment: TPayment;
};

const PaymentListItem = ({ payment }: PaymentListItemProps) => {
  const { id, student, billNumber, paid, paidAmount, balance, createdAt } =
    payment;

  const viewDetailClick = () => {
    alert(NOTIFIES_MSG.FUTURE_FEATURE);
  };

  return (
    <li data-id={id} className="payment-list-item relative group">
      <p className="truncate">{student?.name}</p>
      <p className="truncate">{paid ? 'Paid' : 'Not yet'}</p>
      <p className="truncate">{billNumber}</p>
      <p className="truncate uppercase">inr {formatAmount(paidAmount)}</p>
      <p className="truncate uppercase">inr {formatAmount(balance)}</p>
      <p className="truncate">{formatDate(createdAt)}</p>
      <div className="action-group flex gap-x-2 justify-end">
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
