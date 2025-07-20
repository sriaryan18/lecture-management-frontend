'use client';

import { GET_LECTURE_BY_ID } from '@/garphql/students/queries/lectures';
import { ApolloError, useMutation, useQuery } from '@apollo/client';

import Pending from '@/app/home/classroom/[classroomId]/lecture/[lectureId]/pending';
import Error from '@/app/home/classroom/[classroomId]/lecture/[lectureId]/error';
import InfoCard from './info-card';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { UPDATE_STUDENT_NOTES } from '@/garphql/students/mutation/notes';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { usePermission } from '@/hooks/permissions/usePermission';
import usePermissionsTsx from '@/hooks/permissions/usePermissionsTsx';
import { LMSDropdown } from '@/components/BaseComponents/lms-dropdown';

export type Section = 'info' | 'notes' | 'tests';

export default function Lecture({
  customerType,
  lectureData,
  lectureLoading,
  lectureError,
  notesToShow,
  switchToMyNotes,
  isNotesEditable,
  saveNotes,
}: {
  customerType: string;
  lectureData: any;
  lectureLoading: boolean;
  lectureError: ApolloError;
  notesToShow: any;
  switchToMyNotes?: () => void;
  isNotesEditable: boolean;
  saveNotes: (notes: string) => void;
}) {
  const [section, setSection] = useState<Section>('info');

  const [notes, setMyNotes] = useState(notesToShow);

  useEffect(() => {
    setMyNotes(notesToShow);
  }, [notesToShow]);

  const gotoSection = (section: Section) => {
    setSection(section);
  };

  const activeSection = useMemo(() => {
    switch (section) {
      case 'info':
        return (
          <InfoCard
            instructorId={lectureData?.instructorId}
            topics={lectureData?.topics}
            createdAt={lectureData?.createdAt}
            gotoSection={gotoSection}
          />
        );
      case 'notes':
        return (
          <NotesWithWrapper
            notes={notes}
            isEditable={isNotesEditable}
            toggleNotesContent={switchToMyNotes}
            saveNotes={() => saveNotes(notes)}
            isLoading={false}
            onChange={(notes) => setMyNotes(notes)}
          />
        );
      case 'tests': 
        return <div>Tests</div>;
    }
  }, [section, lectureData, notes, isNotesEditable, switchToMyNotes, saveNotes]);
  // const [saveNotes, { loading: saveNotesLoading }] = useMutation(UPDATE_STUDENT_NOTES, {
  //   variables: {
  //     studentId: user?.id,
  //     lectureId: lectureId,
  //     classroomId: classroomId,
  //     notes: myNotes,
  //   },
  //   onCompleted: () => {
  //     toast.success('Notes saved successfully');
  //   },
  //   onError: () => {
  //     toast.error('Failed to save notes');
  //   },
  // });
  // If showMyNotes is true, show the notes of the student
  // If showMyNotes is false, show the notes of the instructor
  // const notesToShow = useMemo(() => {
  //   if (showMyNotes) {
  //     return studentNotes?.notes;
  //   }
  //   return lectureData?.notes;
  // }, [showMyNotes, studentNotes?.notes, lectureData?.notes]);

  // const isNotesEditable = useMemo(() => {
  //   return showMyNotes && customerType === 'student';
  // }, [showMyNotes, customerType]);

  // useEffect(() => {
  //   setMyNotes(notesData?.getStudentNotes?.notes ?? '');
  // }, [notesData]);

  if (lectureLoading) {
    return <div>Loading...</div>;
  }

  if (lectureError) {
    return <Error error={lectureError} />;
  }

  if (lectureData?.status === 'pending') {
    return <Pending />;
  }

  return (
    <div className="flex flex-col gap-4 flex-grow  ">
      <div className="fixed bottom-10 right-4 z-50">
        <SectionSelector section={section} setSection={setSection} />
      </div>
      <div className="flex flex-col gap-4 items-center justify-center flex-grow  ">
        {activeSection}
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
  <LMSDropdown
    renderTrigger={() => <SectionSelectorButton />}
    renderContent={() => (
      <div className="flex flex-col gap-2">
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
      </div>
    )}
  />
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
  toggleNotesContent?: () => void;
  saveNotes: () => void;
  isLoading: boolean;
  onChange: (notes: string) => void;
}) => {
  const { If } = usePermissionsTsx();

  return (
    <div className="flex flex-col  w-full flex-grow ">
      <div className="flex flex-row gap-2 mt-2 mb-2  items-center justify-center self-end mr-4">
        <If condition={!!toggleNotesContent}>
          <Switch
            checked={isEditable}
            onCheckedChange={toggleNotesContent}
            className="bg-blue-500"
          />
          <Label className="flex flex-row gap-2 items-center justify-center">My Notes</Label>
        </If>
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
        {isEditable && (
          <Notes initialValue={notes} isEditable={isEditable} onChange={onChange} key={1} />
        )}
        {!isEditable && <Notes initialValue={notes} isEditable={isEditable} key={2} />}
      </div>
    </div>
  );
};
