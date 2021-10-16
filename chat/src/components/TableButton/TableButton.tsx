import Tippy from '@tippyjs/react';
import { FaEdit, FaCopy, FaTrashAlt } from 'react-icons/fa';
import { Button as TecButton, ButtonProps } from 'react-tec';
import styled from 'styled-components';

const Tooltip = styled(Tippy)`
  display: block;
  flex: 1;
`;
const Button = styled(TecButton)`
  font-size: 14px;
  padding: 5px 10px;
  display: block;
  flex: 1;
  line-height: 1;
`;
interface Props extends ButtonProps {
  icon?: 'edit' | 'duplicate' | 'delete';
  tooltip?: string;
}
export const TableButton: React.FC<Props> = (props) => {
  const { icon, tooltip, ...rest } = props;

  switch (icon) {
    case 'edit':
      return (
        <Tooltip content={tooltip ? tooltip : 'Edit'} appendTo='parent'>
          <Button {...rest}>
            <FaEdit />
          </Button>
        </Tooltip>
      );
    case 'duplicate':
      return (
        <Tooltip content={tooltip ? tooltip : 'Duplicate'} appendTo='parent'>
          <Button {...rest}>
            <FaCopy />
          </Button>
        </Tooltip>
      );

    case 'delete':
      return (
        <Tooltip content={tooltip ? tooltip : 'Delete'} appendTo='parent'>
          <Button {...rest}>
            <FaTrashAlt />
          </Button>
        </Tooltip>
      );

    default:
      return <Button {...rest} />;
  }
};
