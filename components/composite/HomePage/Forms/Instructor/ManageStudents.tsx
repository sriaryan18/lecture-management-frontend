import { DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { DialogTitle } from '@/components/ui/dialog';
import { useQuery } from '@apollo/client';
import { GET_CLASSROOM_WITH_STUDENTS_BY_CLASSROOM_ID } from '@/garphql/instructor/queries/classrooms';
import { User } from '@/models/User';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { CheckIcon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';
import { BaseInput } from '@/components/BaseComponents/Input';
import { useClassrooms } from '@/hooks/useClassrooms';
export default function ManageStudents({ classroomId }: { classroomId: string }) {
  const {
    data: classroomWithStudents,
    loading: classroomWithStudentsLoading,
    refetch,
  } = useQuery(GET_CLASSROOM_WITH_STUDENTS_BY_CLASSROOM_ID, {
    variables: { classroomId },
  });
  const { handleAddStudentToClassroom } = useClassrooms();
  const [isNewStudentAdded, setIsNewStudentAdded] = useState(false);
  const newStudent = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    isNew: true,
  };

  const data = useMemo(() => {
    if (isNewStudentAdded) {
      return [newStudent, ...(classroomWithStudents?.getClassroomById?.students || [])];
    } else {
      return classroomWithStudents?.getClassroomById?.students;
    }
  }, [classroomWithStudents, isNewStudentAdded]);

  const handleAddStudent = async (username: string) => {
    setIsNewStudentAdded(false);
    await handleAddStudentToClassroom([username]);
    refetch();
  };

  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Students</DialogTitle>
      </DialogHeader>
      <StudentList
        students={data}
        classroomWithStudentsLoading={classroomWithStudentsLoading}
        handleAddStudent={handleAddStudent}
      />
      <DialogFooter>
        <Button variant="outline" onClick={() => setIsNewStudentAdded(true)}>
          Add Student
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function StudentList({
  students,
  classroomWithStudentsLoading,
  handleAddStudent,
}: {
  students: User['user'][] & { isNew?: boolean };
  classroomWithStudentsLoading: boolean;
  handleAddStudent: (username: string) => void;
}) {
  if (!students) return null;
  const data = students?.map((student) => ({
    username: student?.username,
    firstName: student?.firstName,
    lastName: student?.lastName,
    email: student?.email,
    isNew: student?.isNew,
  }));
  const columns: ColumnDef<Partial<User['user'] & { isNew?: boolean }>>[] = [
    {
      header: 'Username',
      accessorKey: 'username',
      cell: ({ row }) => {
        if (row.original?.isNew) {
          return (
            <BaseInput
              onChange={(e) => {
                row.original.username = e.target.value;
              }}
              placeholder="Enter student ID"
            />
          );
        } else {
          return <div>{row.original?.username}</div>;
        }
      },
    },
    {
      header: 'First Name',
      accessorKey: 'firstName',
      cell: ({ row }) => {
        return <div>{row.original?.firstName}</div>;
      },
    },
    {
      header: 'Last Name',
      accessorKey: 'lastName',
      cell: ({ row }) => {
        return <div>{row.original?.lastName}</div>;
      },
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: ({ row }) => {
        return <div>{row.original?.email}</div>;
      },
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: ({ row }) => {
        console.log(row.original);
        if (row.original?.isNew) {
          return (
            <Button
              variant="outline"
              // disabled={!row.original?.username}
              size="icon"
              onClick={() => {
                row.original.isNew = false;
                handleAddStudent(row.original?.username || '');
              }}
            >
              <CheckIcon />
            </Button>
          );
        }
        return (
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              console.log(row.original);
            }}
          >
            <TrashIcon />
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      <DataTable columns={columns} data={data} isLoading={classroomWithStudentsLoading} />
    </div>
  );
}
