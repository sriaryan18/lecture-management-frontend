import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormField } from '@/components/ui/form';
import { addClassRoomFormSchema } from '@/models/add-new-classroom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { BaseInput } from '@/components/BaseComponents/Input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ApolloError } from '@apollo/client';

export default function AddNewClassroom({
  onSubmit,
  loading,
  error,
}: Readonly<{
  onSubmit: (data: z.infer<typeof addClassRoomFormSchema>) => void;
  loading: boolean;
  error: ApolloError;
}>) {
  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Add New Classroom</DialogTitle>
        <DialogDescription>Add a new classroom to the course</DialogDescription>
      </DialogHeader>
      <AddClassroomForm onSubmit={onSubmit} loading={loading} error={error} />
    </DialogContent>
  );
}

const AddClassroomForm = ({
  onSubmit,
  loading,
  error,
}: Readonly<{
  onSubmit: (data: z.infer<typeof addClassRoomFormSchema>) => void;
  loading: boolean;
  error: ApolloError;
}>) => {
  const form = useForm<z.infer<typeof addClassRoomFormSchema>>({
    resolver: zodResolver(addClassRoomFormSchema),
    defaultValues: {
      classroomName: '',
      description: '',
    },
  });
  return (
    <Form {...form}>
      <form id="add-classroom-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="classroomName"
            render={({ field }) => (
              <BaseInput
                placeholder="Classroom Name"
                label="Classroom Name"
                {...field}
                error={form.formState.errors.classroomName?.message}
              />
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <Textarea
                className="mt-2"
                placeholder="Description"
                label="Description"
                {...field}
                error={form.formState.errors.description?.message}
              />
            )}
          />
        </div>
      </form>
      <Button type="submit" form="add-classroom-form" disabled={loading} isLoading={loading}>
        Add Classroom
      </Button>
    </Form>
  );
};
