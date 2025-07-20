'use client';
import { Toolbar } from '@/components/composite/HomePage/Toolbar';

import { useAuth } from '@/hooks/store/useAuth';
import { useParams } from 'next/navigation';
import {} from '@/hooks/classrooms/useClassroomsMutation';
import { useLectureMutation } from '@/hooks/lecture/useLectureMutation';
import { ApolloError } from '@apollo/client';

export default function Home() {
  return <div className="flex flex-col">ANALYTICS</div>;
}
