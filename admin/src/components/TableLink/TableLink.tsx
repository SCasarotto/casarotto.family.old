import Tippy from '@tippyjs/react';
import { FaInfoCircle } from 'react-icons/fa';
import { Link as L, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

const Tooltip = styled(Tippy)`
  display: block;
  flex: 1;
`;
const Link = styled(L)`
  border: 1px solid ${(props) => props.theme.lightGray};
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  display: block;
  flex: 1;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.darkerGray};
  background-color: ${(props) => props.theme.white};

  transition: color 0.2s ease-in, background-color 0.2s ease-in;

  :active {
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.primary};
  }
  :hover {
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme.primary};
  }
`;

//TODO: Improve types to correctly pass generic
interface Props extends LinkProps<any> {
  icon?: 'details';
  tooltip?: string;
}

export const TableLink: React.FC<Props> = (props) => {
  const { icon, tooltip, ...rest } = props;

  switch (icon) {
    case 'details':
      return (
        <Tooltip content={tooltip ? tooltip : 'View Details'} appendTo='parent'>
          <Link {...rest}>
            <FaInfoCircle />
          </Link>
        </Tooltip>
      );
    default:
      return <Link {...rest} />;
  }
};
