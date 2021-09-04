import { useAppContext } from 'hooks';

import { Container, Title, Subtitle } from './styledComponents';

export const Dashboard = () => {
  const { user } = useAppContext();

  return (
    <Container>
      <div>
        <Title>
          Welcome To The
          <br />
          Casarotto Admin Portal
        </Title>
        {user && (
          <Subtitle>
            {user.firstName} {user.lastName} - {user.email}
          </Subtitle>
        )}
      </div>
    </Container>
  );
};
