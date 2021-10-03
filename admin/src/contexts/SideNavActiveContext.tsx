import React, { createContext, useMemo, useState } from 'react';

interface SideNavActive {
  sideNavActive: boolean;
  setSideNavActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SideNavActiveContext = createContext<SideNavActive>(undefined!);

export const SideNavActiveProvider: React.FC = (props) => {
  const [sideNavActive, setSideNavActive] = useState(true);

  const memoizedReturn = useMemo(
    () => ({ sideNavActive, setSideNavActive }),
    [sideNavActive, setSideNavActive],
  );
  return (
    <SideNavActiveContext.Provider value={memoizedReturn}>
      {props.children}
    </SideNavActiveContext.Provider>
  );
};
