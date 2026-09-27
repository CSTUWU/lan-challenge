import type { Metadata } from 'next';
import RegisterPage from '@/components/pages/RegisterPage';

export const metadata: Metadata = {
  title: 'SQUAD ENLISTMENT // COD4 LAN CHALLENGE 2026',
  description: 'Register your 5-man collegiate squad for Call of Duty 4 Modern Warfare LAN Challenge at Uva Wellassa University.',
};

export default function Page() {
  return <RegisterPage />;
}
