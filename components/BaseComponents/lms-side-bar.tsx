import { Sidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export const LMSSideBar = ({
  isVisible,
  children,
}: {
  isVisible: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn(isVisible ? 'block' : 'hidden')}>
      {/* <Sidebar
        collapsible="icon"
        variant="sidebar"
        className="top-14 left-0 w-64 overflow-y-auto h-full bg-red-400 text-wrap"
      >
        {children}
      </Sidebar> */}
    </div>
  );
};
