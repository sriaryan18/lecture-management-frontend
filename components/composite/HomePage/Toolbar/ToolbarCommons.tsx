import { Badge } from '@/components/ui/badge';

export default function ToolbarCommons(props: any) {
  return <div>{props.children}</div>;
}

interface ClassroomInfoProps {
  className: string;
  classCode: string;
}

ToolbarCommons.ClassroomInfo = function ClassroomInfo({
  className,
  classCode,
}: ClassroomInfoProps) {
  return (
    <div className="grid grd-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2">
      <div className="text-sm min-w-fit ">
        Class Name : <Badge className="bg-slate-100 text-gray-800">{className}</Badge>
      </div>
      <div className="text-sm min-w-fit">
        Class Code : <Badge className="bg-slate-100 text-gray-800">{classCode}</Badge>
      </div>
    </div>
  );
};
