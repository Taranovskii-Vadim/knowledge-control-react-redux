import { useCallback, useEffect, useRef } from 'react';
import { STATUS } from 'src/store/constants';
import { Status } from 'src/store/types';

interface UseChangeProps {
  onDone?: () => void;
  onError?: () => void;
}

export const useChangeStatus = (status: Status, { onDone, onError }: UseChangeProps): void => {
  useEffect(() => {
    if (status !== STATUS.initial) {
      if (status === STATUS.done && onDone) {
        onDone();
      }
      if (status === STATUS.error && onError) {
        onError();
      }
    }
  }, [status]);
};

export const useDebounce = <T extends (...args: any) => void>(callback: T, delay: number) => {
  const timer = useRef<number>();

  const debouncedCallback = useCallback(
    (...args: any) => {
      if (timer.current) {
        window.clearTimeout(timer.current);
      }
      timer.current = window.setTimeout(() => callback(...args), delay);
    },
    [callback, delay],
  );

  return debouncedCallback as T;
};
