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
    <div className=" grid-cols-2 gap-2 hidden  lg:grid">
      <span className="text-sm max-w-48">
        Class Name : <Badge className="bg-slate-100 text-gray-800">{className}</Badge>
      </span>
      <span className="text-sm max-w-48">
        Class Code : <Badge className="bg-slate-100 text-gray-800">{classCode}</Badge>
      </span>
    </div>
  );
};
