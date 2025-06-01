import ClassroomsLectures from '@/components/composite/HomePage/Content/classrooms-lectures';
import Header from '@/components/composite/HomePage/Header';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" flex flex-col ">
      <Header />
      <SidebarProvider>
        <ClassroomsLectures />
        {/* <SidebarTrigger /> */}
        <div className=" w-full flex-grow flex flex-col ">{children}</div>
      </SidebarProvider>
    </div>
  );
}
