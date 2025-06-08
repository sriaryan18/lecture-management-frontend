import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getInitials } from '@/utils/labels';import Link from 'next/link';
import { Section } from './lecture';

export default function InfoCard({
  instructorId,
  topics,
  createdAt,
  gotoSection,
}: Readonly<{
  instructorId: string;
  topics: string[];
  createdAt: string;
  gotoSection: (section: Section) => void;
}>) {
  const instructorName = 'John Doe';

  return (
    <div className="flex flex-col gap-4 w-[90%] lg:w-1/2">
      <Card className="bg-gray-800 ">
        <CardHeader className="flex flex-row gap-2 items-center justify-center">
          <CardHeaderContent title="Lecture Summary" />
        </CardHeader>
        <CardContent className="flex flex-col gap-10 items-center justify-center">
          <InsturctorAvatar firstName={instructorName} lastName={instructorName} />
          <LectureInfo
            instructorName={instructorName}
            topics={topics}
            createdAt={createdAt}
            instructorId={instructorId}
          />
        </CardContent>
        <CardFooter className="flex items-center justify-center ">
          <GotoSectiom gotoSection={gotoSection} />
        </CardFooter>
      </Card>
    </div>
  );
}

const CardHeaderContent = (props: { title: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <CardTitle>{props.title}</CardTitle>
    </div>
  );
};

const InsturctorAvatar = ({ firstName, lastName }: { firstName: string; lastName: string }) => {
  return (
    <Avatar className="h-20 w-20">
      <AvatarFallback className="bg-slate-300 text-gray-800 text-2xl ">
        {getInitials(firstName, lastName)}
      </AvatarFallback>
    </Avatar>
  );
};

const LectureInfo = ({
  instructorName,
  topics,
  createdAt,
  instructorId,
}: {
  instructorName: string;
  topics: string[];
  createdAt: string;
  instructorId: string;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p>
        Instructor Name : <span className="font-bold">{instructorName}</span>
      </p>
      <p>Instructor Id : {instructorId}</p>
      <LectureTopics topics={topics} />
      <p>CreatedAt : {new Date(createdAt).toLocaleDateString()}</p>
    </div>
  );
};
const LectureTopics = ({ topics }: { topics: string[] }) => {
  return (
    <div className="gap-2">
      Topics:{' '}
      {topics.map((topic) => (
        <Badge key={topic} variant="outline" className="bg-gray-700 text-gray-300">
          {topic}
        </Badge>
      ))}
    </div>
  );
};

const GotoSectiom = ({ gotoSection }: { gotoSection: (section: Section) => void }) => {
  return (
    <div className="space-x-8">
      <Button onClick={() => gotoSection('notes')}>Notes</Button>
      <Button onClick={() => gotoSection('tests')}>Tests</Button>
    </div>
  );
};
