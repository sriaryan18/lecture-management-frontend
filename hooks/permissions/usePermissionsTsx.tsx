import React from 'react';

const usePermissionsTsx = () => {
  const If: React.FC<{ condition: boolean; children: React.ReactNode }> = ({
    condition,
    children,
  }) => {
    return condition ? <>{children}</> : null;
  };

  const IfRenderProps: React.FC<{ condition: boolean; children: () => React.ReactNode }> = ({
    condition,
    children,
  }) => {
    return condition ? children() : null;
  };

  return { If, IfRenderProps };
};

export default usePermissionsTsx;
