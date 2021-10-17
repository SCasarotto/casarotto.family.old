import { Input } from 'react-tec';
import styled from 'styled-components';

import searchIcon from 'assets/images/searchIcon.png';

export const FilterInput = styled(Input)`
  padding: 0.4rem;
  background-image: url(${searchIcon});
  background-position: calc(100% - 3px) 50%;
  background-repeat: no-repeat;
  background-size: auto calc(100% - 6px);
`;
