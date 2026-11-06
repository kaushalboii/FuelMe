import CreatorProfileClient from './CreatorProfileClient';
import { INITIAL_CREATORS } from '@/lib/data';

export function generateStaticParams() {
  return INITIAL_CREATORS.map((c) => ({
    username: c.username,
  }));
}

export default function CreatorProfilePage() {
  return <CreatorProfileClient />;
}
