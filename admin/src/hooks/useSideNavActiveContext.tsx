import { useContext } from 'react';

import { SideNavActiveContext } from 'contexts';

export const useSideNavActiveContext = () => {
	return useContext(SideNavActiveContext);
};
