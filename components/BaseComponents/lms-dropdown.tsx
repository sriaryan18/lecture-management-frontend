import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const LMSDropdown = ({
  renderTrigger,
  renderContent,
}: {
  renderTrigger: () => React.ReactNode;
  renderContent: () => React.ReactNode;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger >{renderTrigger()}</DropdownMenuTrigger>
      <DropdownMenuContent asChild>{renderContent()}</DropdownMenuContent>
    </DropdownMenu>
  );
};
