import { get } from 'lodash';

export const usePermission = (target: 'TOOLBAR' | 'LECTURE' | 'SIDEBAR', config: any) => {
  const targetConfig = get(config, target, {});
  const permissionConfig = get(targetConfig, 'permissions', {});

  const can = (scope: string) => {
    return get(permissionConfig, scope, false);
  };

  const canAll = (scopes: string[]) => {
    return scopes.every((scope) => can(scope));
  };

  const canAny = (scopes: string[]) => {
    return scopes.some((scope) => can(scope));
  };

  return { can, canAll, canAny };
};
