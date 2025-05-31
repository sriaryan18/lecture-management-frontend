import Header from "@/components/composite/HomePage/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ClassroomsLectures from "@/components/composite/HomePage/Content/classrooms-lectures";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
  
      <Header />
     
      <div className=" ">{children}</div>
    </div>
  );
}
