import {  REPORTS_URL } from "@constants/services";
import useAuth from "@hooks/useAuth";
import api from "@services/api-request";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { TReport } from "src/types";

type ReportQueryOptions = {
  query: string;
};

const useReportQuery = (options: ReportQueryOptions) => {
  const { query } = options;
  const {auth} = useAuth()

  const {
    data: reports,
    isError,
    error,
    isLoading,
  } = useQuery<TReport[], Error>(
    ['reports', useMemo(() => query, [query])],
    async () => (await api.get(REPORTS_URL + query, auth?.accessToken)) as TReport[]
  );

  return { reports, isError, error, isLoading };
}

export default useReportQuery