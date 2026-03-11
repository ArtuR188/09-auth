'use client';

import { checkSession } from '@/lib/api/clientApi';
import useAuthStore from '@/lib/store/authStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const privateRoutes = ['/notes', '/profile'];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));

    if (!isPrivate) {
      setLoading(false);
      return;
    }

    if (isAuthenticated) {
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const result = await checkSession();
        if (result && (result as { success?: boolean }).success) {
          setLoading(false);
        } else {
          clearIsAuthenticated();
          router.push('/sign-in');
        }
      } catch {
        clearIsAuthenticated();
        router.push('/sign-in');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [pathname, setUser, clearIsAuthenticated, router, isAuthenticated]);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>Loading...</div>;
  }

  return <>{children}</>;
}