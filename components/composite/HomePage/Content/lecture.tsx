'use client';

import { GET_LECTURE_BY_ID } from '@/garphql/queries/students/lectures';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import Pending from '@/app/home/classroom/[classroomId]/lecture/[lectureId]/pending';
import Error from '@/app/home/classroom/[classroomId]/lecture/[lectureId]/error';
import InfoCard from './info-card';
import { useState } from 'react';
import Notes from './notes';
import { useAuth } from '@/hooks/store/useAuth';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PanelBottomOpen } from 'lucide-react';

export type Section = 'info' | 'notes' | 'tests';

export default function Lecture() {
  const { lectureId } = useParams();

  const [section, setSection] = useState<Section>('info');

  const { data, loading, error } = useQuery(GET_LECTURE_BY_ID, {
    variables: {
      lectureId: lectureId,
    },
  });
  const { user } = useAuth();

  const customerType = user?.customerType ?? 'student';

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (data?.getLectureById.status === 'pending') {
    return <Pending />;
  }

  const gotoSection = (section: Section) => {
    setSection(section);
  };

  const activeSection = () => {
    switch (section) {
      case 'info':
        return (
          <InfoCard
            instructorId={data?.getLectureById.instructorId}
            topics={data?.getLectureById.topics}
            createdAt={data?.getLectureById.createdAt}
            gotoSection={gotoSection}
          />
        );
      case 'notes':
        return (
          <Notes
            initialValue={data?.getLectureById.notes}
            isEditable={customerType !== 'student'}
          />
        );
      case 'tests':
        return <div>Tests</div>;
    }
  };

  return (
    <div className="flex flex-col gap-4 flex-grow  ">
      <div className="fixed bottom-10 right-4 z-50">
        <SectionSelector section={section} setSection={setSection} />
      </div>
      <div className="flex flex-col gap-4 items-center justify-center flex-grow  ">
        {activeSection()}
      </div>
    </div>
  );
}

const SectionSelector = ({
  section,
  setSection,
}: {
  section: Section;
  setSection: (section: Section) => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <SectionSelectorButton />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuCheckboxItem
        checked={section === 'info'}
        onCheckedChange={() => setSection('info')}
      >
        Info
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={section === 'notes'}
        onCheckedChange={() => setSection('notes')}
      >
        Notes
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={section === 'tests'}
        onCheckedChange={() => setSection('tests')}
      >
        Tests
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const SectionSelectorButton = () => (
  <Avatar>
    <AvatarFallback>
      <PanelBottomOpen />
    </AvatarFallback>
  </Avatar>
);
