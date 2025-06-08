import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormLabel, FormItem, FormMessage } from '@/components/ui/form';
import { shareClassroomInviteSchema } from '@/models/share-classroom-invite';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { BaseInput } from '@/components/BaseComponents/Input';
import { Button } from '@/components/ui/button';

export default function LectureInvite({
  classroomId,
  allClassrooms,
  createInvite,
}: Readonly<{
  classroomId: string;
  allClassrooms: { id: string; name: string }[];
  createInvite: (data: z.infer<typeof shareClassroomInviteSchema>) => void;
}>) {
  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Create Invite link</DialogTitle>
      </DialogHeader>
      <LectureInviteForm
        classroomId={classroomId}
        allClassrooms={allClassrooms}
        onSubmit={createInvite}
      />
    </DialogContent>
  );
}

const LectureInviteForm = ({
  classroomId = '',
  allClassrooms,
  onSubmit,
}: Readonly<{
  classroomId?: string;
  allClassrooms: { id: string; name: string }[];
  onSubmit: (data: z.infer<typeof shareClassroomInviteSchema>) => void;
}>) => {
  const form = useForm<z.infer<typeof shareClassroomInviteSchema>>({
    resolver: zodResolver(shareClassroomInviteSchema),
    defaultValues: {
      classroomId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
    },
  });
  return (
    <Form {...form}>
      <form id="add-classroom-form" className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
                <p className="text-xs text-red-500">{form.formState.errors.classroomId?.message}</p>
                {allClassrooms?.length > 0 && (
                  <SelectContent className=" bg-white text-black ">
                    {allClassrooms?.map((classroom) => (
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
          name="expiresAt"
          render={({ field }) => (
            <div className="w-full flex flex-col gap-2 ">
              <BaseInput
                placeholder="Expires At"
                label="Expires At "
                type="text"
                disabled
                {...field}
                error={form.formState.errors.expiresAt?.message}
              />
            </div>
          )}
        />
      </form>
      <Button type="submit" form="add-classroom-form">
        Create Invite Link
      </Button>
    </Form>
  );
};
