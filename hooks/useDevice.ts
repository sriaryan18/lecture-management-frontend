import { useMemo } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export const useDevice = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const isLargeDesktop = useMediaQuery('(min-width: 1280px)');
  const isXLargeDesktop = useMediaQuery('(min-width: 1536px)');
  const isXXLargeDesktop = useMediaQuery('(min-width: 1920px)');
  const isXXXLargeDesktop = useMediaQuery('(min-width: 2560px)');
  const isXXXXLargeDesktop = useMediaQuery('(min-width: 3840px)');
  const device = useMemo(() => {
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    if (isDesktop) return 'desktop';
    if (isLargeDesktop) return 'largeDesktop';
    if (isXLargeDesktop) return 'xLargeDesktop';
    if (isXXLargeDesktop) return 'xxLargeDesktop';
    if (isXXXLargeDesktop) return 'xxxLargeDesktop';
    if (isXXXXLargeDesktop) return 'xxxxLargeDesktop';
  }, [
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isXLargeDesktop,
    isXXLargeDesktop,
    isXXXLargeDesktop,
    isXXXXLargeDesktop,
  ]);

  const isSmallScreen = useMemo(() => {
    return device === 'mobile' || device === 'tablet';
  }, [device]);

  return {
    device,
    isSmallScreen,
  };
};
