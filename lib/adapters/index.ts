import { resolveValue } from './resolveValue';

const allAdapters = {
  resolveValues: (dataTemplate: Record<string, string>, scope: unknown) =>
    resolveValue(dataTemplate, scope),
  //   processWithFunction: (
  //     prevData: unknown,
  //     dataTemplate: Record<string, string>,
  //     scope: unknown,
  //     functionToCall: (
  //       data: unknown,
  //       dataTemplate: Record<string, string>,
  //       scope: unknown,
  //     ) => unknown,
  //   ) => {
  //     return functionToCall(prevData, dataTemplate, scope);
  //   },
};

export default allAdapters;
