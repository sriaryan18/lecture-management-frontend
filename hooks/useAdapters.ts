import allAdapters from '@/lib/adapters';

const useAdapters = () => {
  const execute = (adapterChain: { name: string; dataTemplate: unknown }[], scope: any) => {
    const result = adapterChain.reduce((acc, adapter) => {
      if (adapter.name === 'resolveValues') {
        return allAdapters.resolveValues(adapter.dataTemplate as Record<string, string>, scope);
      }
      return acc;
    }, {} as any);
    return result;
  };

  return { execute };
};

export default useAdapters;
