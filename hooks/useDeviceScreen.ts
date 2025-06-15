import { useWindowSize } from 'usehooks-ts';

export function useDeviceScreen() {
  const { width } = useWindowSize();

  return { isMobile: width < 768, isTablet: width < 1024, isDesktop: width > 1024 };
}
