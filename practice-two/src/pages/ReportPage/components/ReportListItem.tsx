import Button from '@components/Button';
import { TReport } from 'src/types';
import eye from '@assets/eye.svg';
import { NOTIFIES_MSG } from '@constants/messages';

type ReportListItemProps = {
  report: TReport;
};

const ReportListItem = ({ report }: ReportListItemProps) => {
  const { id, description, title, student } = report;

  const viewDetailClick = () => {
    alert(NOTIFIES_MSG.FUTURE_FEATURE);
  };

  return (
    <li data-id={id} className="report-list-item group relative">
      <p className="truncate">{student?.name}</p>
      <p className="truncate capitalize">{title}</p>
      <p className="truncate normal-case"> {description}</p>
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

export default ReportListItem;
