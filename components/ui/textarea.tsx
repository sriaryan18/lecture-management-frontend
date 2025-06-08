import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'> & {
    label?: string;
    error?: string | null;
  }
>(({ className, ...props }, ref) => {
  return (
    <div className="space-y-1 ">
      {props.label && <Label className="ml-1 ">{props.label}</Label>}
      <textarea
        className={cn(
          'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder:text-muted-foreground placeholder:opacity-30',
          className,
        )}
        ref={ref}
        {...props}
      />
      {props.error && <p className="text-red-500 text-xs mt-1">{props.error}</p>}
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
