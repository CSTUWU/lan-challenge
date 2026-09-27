import type { Metadata } from 'next';
import AboutPage from '@/components/pages/AboutPage';

export const metadata: Metadata = {
  title: 'ABOUT THE ARENA // COD4 LAN CHALLENGE 2026',
  description: 'Learn about the Call of Duty 4 LAN Challenge organized by the Computer Science & Technology Degree Program, Uva Wellassa University.',
};

export default function Page() {
  return <AboutPage />;
}
