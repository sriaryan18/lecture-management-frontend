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
    <div className="grid grid-cols-2 gap-2">
      <h1>
        Class Name : <Badge className="bg-slate-100 text-gray-800">{className}</Badge>
      </h1>
      <h1>
        Class Code : <Badge className="bg-slate-100 text-gray-800">{classCode}</Badge>
      </h1>
    </div>
  );
};
