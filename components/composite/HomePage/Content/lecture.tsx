'use client';

import { GET_LECTURE_BY_ID } from '@/garphql/students/queries/lectures';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import Pending from '@/app/home/classroom/[classroomId]/lecture/[lectureId]/pending';
import Error from '@/app/home/classroom/[classroomId]/lecture/[lectureId]/error';
import InfoCard from './info-card';
import { useEffect, useMemo, useState } from 'react';
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
import { GET_STUDENT_NOTES } from '@/garphql/students/queries/notes';
import { UPDATE_STUDENT_NOTES } from '@/garphql/students/mutation/notes';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export type Section = 'info' | 'notes' | 'tests';

export default function Lecture() {
  const { lectureId, classroomId } = useParams();

  const [section, setSection] = useState<Section>('info');
  const [showMyNotes, setShowMyNotes] = useState(false);
  const [myNotes, setMyNotes] = useState('');

  const { user } = useAuth();
  const customerType = user?.customerType ?? 'student';
  const { data, loading, error } = useQuery(GET_LECTURE_BY_ID, {
    variables: {
      lectureId: lectureId,
    },
  });

  const { data: notesData } = useQuery(GET_STUDENT_NOTES, {
    variables: {
      studentId: user?.id,
      lectureId: lectureId,
      classroomId: classroomId,
    },
  });

  const [saveNotes, { loading: saveNotesLoading }] = useMutation(UPDATE_STUDENT_NOTES, {
    variables: {
      studentId: user?.id,
      lectureId: lectureId,
      classroomId: classroomId,
      notes: myNotes,
    },
    onCompleted: () => {
      toast.success('Notes saved successfully');
    },
    onError: () => {
      toast.error('Failed to save notes');
    },
  });
  // If showMyNotes is true, show the notes of the student
  // If showMyNotes is false, show the notes of the instructor
  const notesToShow = useMemo(() => {
    if (showMyNotes) {
      return notesData?.getStudentNotes?.notes;
    }
    return data?.getLectureById?.notes;
  }, [showMyNotes, notesData, data?.getLectureById.notes]);

  const isNotesEditable = useMemo(() => {
    return showMyNotes && customerType === 'student';
  }, [showMyNotes, customerType]);

  useEffect(() => {
    setMyNotes(notesData?.getStudentNotes?.notes ?? '');
  }, [notesData]);

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
          <NotesWithWrapper
            notes={notesToShow}
            isEditable={isNotesEditable}
            toggleNotesContent={() => setShowMyNotes(!showMyNotes)}
            saveNotes={saveNotes}
            isLoading={saveNotesLoading}
            onChange={(notes) => setMyNotes(notes)}
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

const NotesWithWrapper = ({
  notes,
  isEditable,
  toggleNotesContent,
  saveNotes,
  isLoading,
  onChange,
}: {
  notes: string;
  isEditable: boolean;
  toggleNotesContent: () => void;
  saveNotes: () => void;
  isLoading: boolean;
  onChange: (notes: string) => void;
}) => {
  return (
    <div className="flex flex-col  w-full flex-grow ">
      <div className="flex flex-row gap-2 mt-2 mb-2  items-center justify-center self-end mr-4">
        <Switch checked={isEditable} onCheckedChange={toggleNotesContent} className="bg-blue-500" />
        <Label className="flex flex-row gap-2 items-center justify-center">My Notes</Label>
        <Button
          className="bg-green-500 text-white hover:bg-green-600"
          variant="secondary"
          size="sm"
          disabled={!isEditable}
          isLoading={isLoading}
          onClick={saveNotes}
        >
          Save
        </Button>
      </div>
      <div className="flex flex-col gap-4 w-full flex-grow">
        {isEditable && <Notes initialValue={notes} isEditable={isEditable} onChange={onChange} />}
        {!isEditable && <Notes initialValue={notes} isEditable={isEditable} />}
      </div>
    </div>
  );
};
