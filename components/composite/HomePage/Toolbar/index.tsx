import { usePermission } from '@/hooks/permissions/usePermission';
import usePermissionsTsx from '@/hooks/permissions/usePermissionsTsx';
import { useAuth } from '@/hooks/store/useAuth';
import { useLMSQuery } from '@/hooks/useLMSQuery';
import { roleSpecificConfigs } from '@/utils/roleSpecificConfigs';
import { useMemo, useState } from 'react';

export function Toolbar() {
  const P = usePermissionsTsx();
  const auth = useAuth();
  const role = auth.user?.role;
  const config = roleSpecificConfigs[role as keyof typeof roleSpecificConfigs];
  const { can } = usePermission('TOOLBAR', config);
  const [isModalOpen, setIsModalOpen] = useState<
    'lecture' | 'classroom' | 'invite' | 'manageStudents' | null
  >(null);  


  return (
    <>
        <P.If condition={can('')}
    
    </>
  )
}
