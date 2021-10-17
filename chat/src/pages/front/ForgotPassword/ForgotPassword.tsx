import React, { useState } from 'react';

import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { usePopups } from 'react-tec';

import { submitForgotPassword } from './requests';
import {
  PanelWrapper,
  Panel,
  Form,
  Title,
  Input,
  ButtonContainer,
  Button,
  SignIn,
} from './styledComponents';

interface Props extends RouteComponentProps {}
export const ForgotPassword: React.FC<Props> = (props) => {
  const { history } = props;

  const popupFunctions = usePopups();
  const [email, setEmail] = useState('');

  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        email,
        history,
        popupFunctions,
      };
      submitForgotPassword(data);
      setEmail('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PanelWrapper>
      <Panel>
        <Form onSubmit={handleSignInSubmit}>
          <Title>Forgot Password</Title>
          <Input
            labelForKey='email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <ButtonContainer>
            <Button type='submit'>Request Password Reset</Button>
          </ButtonContainer>
          <SignIn to='/sign-in'>Return to Sign In</SignIn>
        </Form>
      </Panel>
    </PanelWrapper>
  );
};
