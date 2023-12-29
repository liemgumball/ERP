import useDebounce from '@hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import useReportQuery from './hooks/useReportQuery';
import { useMemo, useState } from 'react';
import List from '@components/List';
import ReportListItem from './components/ReportListItem';
import Button from '@components/Button';
import useAuth from '@hooks/useAuth';
import ReportForm from './components/ReportForm';

const ReportPage = () => {
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  // Debounce the search query change
  const [searchParams] = useSearchParams({ q: '' });
  const debouncedSearchQuery = useDebounce(searchParams.get('q') || '');

  // Get reports
  const query = `?student_name_like=${debouncedSearchQuery}`;

  const { reports, isError, error, isLoading } = useReportQuery({
    query: query,
  });
  return (
    <article className="min-w-min px-8">
      <header className="flex items-center justify-between border-b bg-white py-3">
        <h1 className="text-3xl font-700">reports list</h1>
        {auth && (
          <Button
            className="mx-3 uppercase"
            primary
            onClick={() => setIsOpen(true)}
          >
            add new report
          </Button>
        )}
      </header>
      <hr />
      <div className="reports py-3">
        <div className="report-list-heading grid whitespace-nowrap font-600 text-custom-medium-gray">
          <span>student</span>
          <span>title</span>
          <span>description</span>
          <span></span>
        </div>
        <List isError={isError} isLoading={isLoading} error={error as Error}>
          {useMemo(
            () =>
              reports?.length ? (
                reports.map((item) => (
                  <ReportListItem key={item.id} report={item} />
                ))
              ) : (
                <p className="text-center text-custom-dark-gray">not found</p>
              ),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [reports]
          )}
        </List>
      </div>
      {isOpen && <ReportForm close={() => setIsOpen(false)} />}
    </article>
  );
};

export default ReportPage;
