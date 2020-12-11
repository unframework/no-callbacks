import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { createTrigger, TriggerComponent } from './Trigger';

export type SafeCallbackTriggerComponent = TriggerComponent;

export function useSafeCallback(
  callback?: () => void
): SafeCallbackTriggerComponent {
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
  const [wasClicked, setWasClicked] = useState(false);
  useEffect(() => {
    if (wasClicked && callbackRef.current) {
      callbackRef.current();
    }
  }, [wasClicked]);

  // trigger wrapper component
  const triggerComponent = useMemo(
    () =>
      createTrigger(() => {
        if (unmountedRef.current) {
          return;
        }

        setWasClicked(true);
      }),
    []
  );

  return triggerComponent;
}
