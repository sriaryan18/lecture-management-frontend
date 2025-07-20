import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDevice } from '@/hooks/useDevice';

export const LMSDialog = ({
  isVisible,
  onClose,
  title,
  renderHeader,
  renderFooter,
  renderContent,
  className,
}: {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  renderHeader?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  renderContent: () => React.ReactNode;
  className?: string;
}) => {
  const { isSmallScreen } = useDevice();
  return (
    <Dialog open={isVisible} onOpenChange={onClose} modal={true}>
      <DialogContent className={`${isSmallScreen ? 'h-full' : ''} ${className}`}>
        <DialogHeader className="flex flex-col ">
          <DialogTitle>{title}</DialogTitle>
          {renderHeader && renderHeader()}
        </DialogHeader>
        {renderContent && renderContent()}
        {renderFooter && renderFooter()}
      </DialogContent>
    </Dialog>
  );
};
