import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useRouterScroll({
  behavior = 'smooth',
  left = 0,
  top = 0,
  scroll = true,
} = {}) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      if (scroll) {
        window.scrollTo({ top, left, behavior });
      }
    };
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [behavior, left, top]);
}
