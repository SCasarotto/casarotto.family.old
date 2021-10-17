import React, { useState } from 'react';

import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { usePopups } from 'react-tec';

import { signInUser } from './requests';
import {
  PanelWrapper,
  Panel,
  Form,
  Title,
  Input,
  ButtonContainer,
  Button,
} from './styledComponents';

interface Props extends RouteComponentProps {}
export const SignIn: React.FC<Props> = (props) => {
  const { history } = props;

  const popupFunctions = usePopups();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignInSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email,
      password,
      history,
      popupFunctions,
    };
    signInUser(data);
  };

  return (
    <PanelWrapper>
      <Panel>
        <Form onSubmit={handleSignInSubmit}>
          <Title>Sign In</Title>
          <Input
            labelForKey='email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            labelForKey='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <ButtonContainer>
            <Button type='submit'>Sign In</Button>
            <Link to='/forgot-password'>Forgot Password?</Link>
          </ButtonContainer>
        </Form>
      </Panel>
    </PanelWrapper>
  );
};
