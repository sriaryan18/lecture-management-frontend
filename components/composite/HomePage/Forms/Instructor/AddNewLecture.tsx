'use client';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { BaseInput } from '@/components/BaseComponents/Input';
import { Textarea } from '@/components/ui/textarea';
import MultiInput from '@/components/BaseComponents/multi-input';
import { addLectureFormSchema } from '@/models/add-new-lecture';
import { Select, SelectValue } from '@/components/ui/select';
import { SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ApolloError } from '@apollo/client';

export default function AddNewLecture({
  classroomId,
  instructorId,
  handleSaveLecture,
  classrooms,
  loading,
  error,
}: Readonly<{
  classroomId: string;
  instructorId: string;
  handleSaveLecture: (data: z.infer<typeof addLectureFormSchema>) => void;
  classrooms: { name: string; id: string }[];
  loading: boolean;
  error: ApolloError;
}>) {
  const handleSubmit = (data: z.infer<typeof addLectureFormSchema>) => {
    handleSaveLecture(data);
  };
  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Add New Lecture</DialogTitle>
        <DialogDescription>Add a new lecture to the course</DialogDescription>
      </DialogHeader>
      <AddLectureForm
        classroomId={classroomId}
        instructorId={instructorId}
        onSubmit={handleSubmit}
        classrooms={classrooms}
        loading={loading}
        error={error}
      />
    </DialogContent>
  );
}

const AddLectureForm = ({
  classroomId = '',
  instructorId,
  onSubmit,
  classrooms,
  loading,
  error,
}: {
  classroomId?: string;
  instructorId: string;
  onSubmit: (data: z.infer<typeof addLectureFormSchema>) => void;
  classrooms: { name: string; id: string }[];
  loading: boolean;
  error: ApolloError;
}) => {
  const form = useForm<z.infer<typeof addLectureFormSchema>>({
    resolver: zodResolver(addLectureFormSchema),
    defaultValues: {
      lectureName: '',
      lectureDescription: '',
      instructorId,
      classroomId,
      topics: [],
    },
  });

  return (
    <Form {...form}>
      <form id="add-lecture-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="lectureName"
            render={({ field }) => (
              <BaseInput
                {...field}
                label="Lecture Name"
                placeholder="Enter lecture name..."
                error={form.formState.errors.lectureName?.message}
              />
            )}
          />
          <FormField
            control={form.control}
            name="topics"
            render={({ field }) => (
              <MultiInput
                {...field}
                value={field.value}
                onChange={field.onChange}
                label="Topics"
                error={form.formState.errors.topics?.message}
                placeholder="Enter topics and press enter"
              />
            )}
          />
          <FormField
            control={form.control}
            name="instructorId"
            render={({ field }) => (
              <BaseInput
                {...field}
                label="Instructor ID"
                disabled
                error={form.formState.errors.instructorId?.message}
              />
            )}
          />

          <FormField
            control={form.control}
            name="classroomId"
            render={({ field }) => (
              <div className="w-full flex flex-col gap-2 ">
                <Label className="text-sm font-medium">Classroom</Label>
                <Select {...field} onValueChange={field.onChange} {...form}>
                  <SelectTrigger className="w-full flex items-center flex-row justify-between">
                    <SelectValue placeholder="Select a classroom" />
                  </SelectTrigger>
                  <p className="text-xs text-red-500">
                    {form.formState.errors.classroomId?.message}
                  </p>

                  {classrooms?.length > 0 && (
                    <SelectContent className=" bg-white text-black ">
                      {classrooms?.map((classroom) => (
                        <SelectItem key={classroom.id} value={classroom.id}>
                          {classroom.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  )}
                </Select>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="lectureDescription"
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder="Enter lecture description..."
                className="min-h-[100px] "
                error={form.formState.errors.lectureDescription?.message}
                label="Lecture Description"
              />
            )}
          />
        </div>
      </form>
      <Button type="submit" form="add-lecture-form" disabled={loading} isLoading={loading}>
        Save
      </Button>
    </Form>
  );
};
