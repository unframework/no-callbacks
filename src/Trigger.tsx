import React, { useLayoutEffect, useRef } from 'react';

export type Trigger = {
  attach: React.FC<{ children: React.ReactElement }>;
};

export function createTrigger(activationCallback: () => void): Trigger {
  return {
    attach: ({ children }) => {
      const elementRef = useRef<HTMLElement>(null);

      // @todo just clone with onClick prop?
      useLayoutEffect(() => {
        const clickable = elementRef.current;
        if (!clickable) {
          return;
        }

        clickable.addEventListener('click', activationCallback);

        return () => {
          clickable.removeEventListener('click', activationCallback);
        };
      }, [children]);

      return children !== null && children !== undefined
        ? React.cloneElement(children, {
            ref: elementRef
          })
        : null;
    }
  };
}
