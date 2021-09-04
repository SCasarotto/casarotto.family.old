import { useContext, useEffect } from 'react';

import { TitleBarContext } from 'contexts';

export const useBarTitle = (title = '', resetValue = '') => {
	const { setBarTitle } = useContext(TitleBarContext);
	useEffect(() => {
		setBarTitle(title);
		return () => setBarTitle(resetValue);
	}, [title, resetValue, setBarTitle]);
};
