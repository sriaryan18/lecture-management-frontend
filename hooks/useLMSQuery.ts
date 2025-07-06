import { IQueryConfig } from '@/utils/roleSpecificConfigs';
import { OperationVariables, useQuery } from '@apollo/client';
import { useMemo, useCallback } from 'react';
import useAdapters from './useAdapters';

export const useLMSQuery = <T = Record<string, unknown>>(
  queryObject: IQueryConfig,
  scope: T,
  options: { skip?: boolean; enabled?: boolean } = {},
) => {
  const { skip = false, enabled = true } = options;

  const adapterChainExecutor = useAdapters();

  const processedVariables = useMemo(() => {
    try {
      const baseVariables =
        typeof queryObject.variables === 'function'
          ? queryObject.variables(scope)
          : queryObject.variables;

      if (!queryObject.preQueryAdaptorChain?.length) {
        return baseVariables;
      }

      return adapterChainExecutor.execute(
        queryObject.preQueryAdaptorChain ?? [],
        baseVariables,
      ) as OperationVariables;
    } catch (error) {
      console.error('Pre-query adaptor chain error:', error);
      return null;
    }
  }, [queryObject.variables, scope, adapterChainExecutor]);

  const {
    data,
    loading,
    error,
    refetch: apolloRefetch,
  } = useQuery(queryObject.name, {
    variables: processedVariables,
    skip: skip || !enabled || !queryObject.name,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const processedData = useMemo(() => {
    if (!data || loading) return data;

    return adapterChainExecutor.execute(queryObject.postQueryAdaptorChain ?? [], data);
  }, [data]);

  const refetch = useCallback(
    (variables?: OperationVariables) => {
      if (!variables) return;

      try {
        const newVariables = adapterChainExecutor.execute(
          queryObject.preQueryAdaptorChain ?? [],
          variables,
          scope,
        ) as OperationVariables;

        return apolloRefetch(newVariables);
      } catch (error) {
        console.error('Refetch adaptor chain error:', error);
        return apolloRefetch(variables);
      }
    },
    [scope],
  );

  return {
    data: processedData,
    loading,
    error,
    refetch,
    hasData: !!processedData && !loading,
    isEmpty: !processedData && !loading && !error,
  };
};
