import { Link } from 'react-router-dom';
import { PanelWrapper as TecPanelWrapper, Panel as TecPanel } from 'react-tec';
import styled from 'styled-components';

export const PanelWrapper = styled(TecPanelWrapper)`
  align-items: center;
  justify-content: center;
  background-size: cover;
  padding-top: 150px;
`;
export const Panel = styled(TecPanel)`
  max-width: 700px;
  padding: 60px 40px;
`;
export const ActionWrapper = styled.div`
  text-align: center;
`;
export const ActionTitle = styled.p`
  color: ${(props) => props.theme.primary};
  margin-bottom: 1.25rem;
  font-weight: 600;
`;
export const ActionLink = styled(Link)`
  border: 1px solid ${(props) => props.theme.primay};
  border-radius: 5px;
  padding: 8px 20px;
  color: ${(props) => props.theme.primary};
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
`;
