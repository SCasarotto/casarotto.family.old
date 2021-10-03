import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 170px);
`;
export const Title = styled.h1`
  margin-top: 0px;
  margin-bottom: 10px;
  text-align: center;
  color: ${(props) => props.theme.primary};
  font-size: 50px;
`;
export const Subtitle = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
  text-align: center;
  font-size: 22px;
  font-weight: 300;
`;
