import { BodyContainer as TecBodyContainer } from 'react-tec';
import styled from 'styled-components';

export const BodyContainer = styled(TecBodyContainer)<{
  sideNavActive?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.sideNavActive ? 'calc(100% - 200px)' : '100%')};
  margin-left: ${(props) => (props.sideNavActive ? '200px' : '0px')};
  transition: width 0.25s ease-in-out, margin-left 0.25s ease-in-out;

  @media (max-width: 1000px) {
    width: ${(props) => (props.sideNavActive ? 'calc(100% - 180px)' : '100%')};
    margin-left: ${(props) => (props.sideNavActive ? '180px' : '0px')};
  }
  @media (max-width: 800px) {
    width: ${(props) => (props.sideNavActive ? 'calc(100% - 160px)' : '100%')};
    margin-left: ${(props) => (props.sideNavActive ? '160px' : '0px')};
  }
  @media (max-width: 650px) {
    width: ${(props) => (props.sideNavActive ? 'calc(100% - 140px)' : '100%')};
    margin-left: ${(props) => (props.sideNavActive ? '140px' : '0px')};
  }

  @media print {
    width: 100%;
    margin-left: 0px;
    background-color: #ffffff;
  }
`;
export const AdminContentWrapper = styled.div`
  flex-grow: 1;
`;
