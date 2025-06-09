import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export default function MoreMenu() {
  return (
    <div>
      <PopoverContent className="w-40 mt-3 p-2">
        <Button variant="ghost" >
          Manage Students
        </Button>
      </PopoverContent>
    </div>
  );
}
