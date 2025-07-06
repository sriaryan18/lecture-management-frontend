'use client';
import ClassroomsLectures from '@/components/composite/HomePage/Content/classrooms-lectures';
import InstructorToolbar from '@/components/composite/HomePage/Toolbar/Insructor';
import OrganizationHead from '@/components/composite/HomePage/Toolbar/OrganizationHead';
import StudentToolbar from '@/components/composite/HomePage/Toolbar/Student';
import Header from '@/components/composite/Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/store/useAuth';
import { useMemo } from 'react';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const role = useMemo(() => user?.role, [user]);

  const Toolbar = useMemo(() => {
    if (role === 'TEACHER') return <InstructorToolbar />;
    if (role === 'ADMIN') return <OrganizationHead />;
    if (role === 'STUDENT') return <StudentToolbar />;
  }, [role]);
  return (
    <div className=" flex flex-col space-x-2">
      <Header />
      <SidebarProvider>
        <ClassroomsLectures />
        <div className=" w-full flex-grow flex flex-col">
          <div className="flex flex-col overflow-y-auto w-full border-b border-gray-200 ">
            <div>{Toolbar}</div>
          </div>
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
