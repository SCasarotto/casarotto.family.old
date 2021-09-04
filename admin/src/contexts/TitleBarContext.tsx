import React, { createContext, useMemo, useState } from 'react';

interface TitleBarContextData {
  barTitle: string;
  setBarTitle: React.Dispatch<React.SetStateAction<string>>;
}
export const TitleBarContext = createContext<TitleBarContextData>(undefined!);

export const TitleBarProvider: React.FC = (props) => {
  const [barTitle, setBarTitle] = useState('');

  const memoizedReturn = useMemo(
    () => ({ barTitle, setBarTitle }),
    [barTitle, setBarTitle],
  );

  return (
    <TitleBarContext.Provider value={memoizedReturn}>
      {props.children}
    </TitleBarContext.Provider>
  );
};
