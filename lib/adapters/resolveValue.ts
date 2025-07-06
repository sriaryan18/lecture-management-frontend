import _ from 'lodash';

export const resolveValue = (
  dataTemplate: Record<string, string>,
  scope: unknown,
  result: unknown = {},
  path: string = '',
) => {
  Object.entries(dataTemplate).forEach(([key, value]) => {
    const currentPath = path ? `${path}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      resolveValue(value, scope, result, currentPath);
    } else {
      const resolvedValue = _.get(scope, value);
      _.set(result, currentPath, resolvedValue);
    }
  });

  return result;
};
