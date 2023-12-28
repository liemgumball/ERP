import Button from '@components/Button';
import { formatDate, formatAmount } from '@services/format';
import uuid from 'react-uuid';
import eye from '@assets/eye.svg';

type PaymentListItemProps = {
  payment: any;
};

const PaymentListItem = ({ payment }: PaymentListItemProps) => {
  const { id, student, course, paid, amount, paid_at } = payment;

  const viewDetailClick = async () => {
    const endpoint = `${import.meta.env.VITE_API_URL}/payments/payment/`;
    const requestBody = {
      order_id: uuid(),
      order_type: 'pay',
      amount: amount,
      order_desc: id.toString(),
      bank_code: 'NCB',
      language: 'vn',
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    window.location.href = data['payment_url'];
  };

  return (
    <li data-id={id} className="payment-list-item group relative">
      <p className="truncate">{id}</p>
      <p className="truncate normal-case">{student?.name}</p>
      <p className="truncate">{course?.name}</p>
      <p className="truncate normal-case">{paid ? 'Paid' : 'Not yet'}</p>
      <p className="truncate uppercase">inr {formatAmount(amount)}</p>
      <p className="truncate uppercase">{formatDate(paid_at)}</p>
      <div className="action-group flex justify-end gap-x-2">
        <Button
          disabled={paid}
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
