import { useClassrooms } from '@/hooks/query/useClassrooms';
import { useAuth } from '@/hooks/store/useAuth';

export default function StudentToolbar() {
  const { user } = useAuth();

  const {
    handleCreateClassroom,
    loading: classroomLoading,
    error: classroomError,
  } = useClassrooms('STUDENT');
  return <div>StudentToolbar</div>;
}
