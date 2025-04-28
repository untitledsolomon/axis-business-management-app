import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../components/sidebar';
import StatCard from '@/components/StatCard';
// Removed MyCard import as we are creating new dashboard elements

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the dashboard page on component mount
    router.replace('/dashboard');
  }, [router]);

  // Optionally, render a loading state or null while redirecting
  return null;
}
