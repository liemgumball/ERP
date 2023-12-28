import useDebounce from '@hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import useReportQuery from './hooks/useReportQuery';
import { useMemo } from 'react';
import List from '@components/List';
import ReportListItem from './components/ReportListItem';

const ReportPage = () => {
  // Debounce the search query change
  const [searchParams] = useSearchParams({ q: '' });
  const debouncedSearchQuery = useDebounce(searchParams.get('q') || '');

  // Get reports
  const query = `?_expand=student&q=${debouncedSearchQuery}/`;

  const { reports, isError, error, isLoading } = useReportQuery({
    query: query,
  });
  return (
    <article className="min-w-min px-8">
      <header className="flex items-center justify-between border-b bg-white py-3">
        <h1 className="text-3xl font-700">reports list</h1>
      </header>
      <hr />
      <div className="reports py-3">
        <div className="report-list-heading grid whitespace-nowrap font-600 text-custom-medium-gray">
          <span>name</span>
          <span>title</span>
          <span>content</span>
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
    </article>
  );
};

export default ReportPage;
