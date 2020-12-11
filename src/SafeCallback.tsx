import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { createTrigger, Trigger } from './Trigger';

export type SafeCallbackTrigger = Trigger;

export function useSafeCallback(callback?: () => void): SafeCallbackTrigger {
  // wrap in ref to avoid triggering
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  // track unmounted status (using layout effect for exact timing)
  const unmountedRef = useRef(false);
  useLayoutEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  // use state + effect to run the actual callback to isolate errors
  // @todo consider effects on stack trace usefulness though
  // @todo consider true async invocation?
  const [activationCount, setActivationCount] = useState(0);
  useEffect(() => {
    if (activationCount > 0 && callbackRef.current) {
      callbackRef.current();
    }
  }, [activationCount]);

  // trigger wrapper component, etc
  const trigger = useMemo(
    () =>
      createTrigger(() => {
        if (unmountedRef.current) {
          return;
        }

        setActivationCount((prev) => prev + 1);
      }),
    []
  );

  return trigger;
}
