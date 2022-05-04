/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { Form, Button, Loader } from '@ahaui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import validationSchema from 'utils/schemas/loginSchema';
import { login } from 'store/authSlice';
import * as Toast from 'components/common/Toast';

function Login() {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEmailInvalid = !!errors.email;
  const isPasswordInvalid = !!errors.password;

  const handleLogin = (loginInfo) => {
    dispatch(login(loginInfo))
      .unwrap()
      .then(() => {
        Toast.success('Login success');
        navigate('/home');
      })
      .catch(console.error);
  };

  return (
    <LoginForm onSubmit={handleSubmit(handleLogin)} data-testid="login-page">
      <Helmet>
        <title>Login to Spotify</title>
        <meta name="description" content="Login to Leo's shopping store" />
      </Helmet>

      <Suggest>To continue, log in to Spotify.</Suggest>

      <FormGroup controlId="loginForm.email">
        <FormLabel sizeLabel="small">Email address</FormLabel>
        <FormInput
          type="text"
          isInvalid={isEmailInvalid}
          {...register('email')}
          onBlur={(e) => setValue('email', e.target.value.trim())}
          placeholder="Email address"
        />
        <FormFeedback type="invalid" role="alert">
          {errors?.email?.message}
        </FormFeedback>
      </FormGroup>

      <FormGroup controlId="loginForm.password">
        <FormLabel sizeLabel="small">Password</FormLabel>
        <FormInput
          type="password"
          isInvalid={isPasswordInvalid}
          {...register('password')}
          onBlur={(e) => setValue('password', e.target.value.trim())}
          placeholder="Password"
        />
        <FormFeedback type="invalid" role="alert">
          {errors?.password?.message}
        </FormFeedback>
      </FormGroup>

      <Direct>
        <Forgot to="/forgot">Forgot your password?</Forgot>
        <LoginButton size="big" variant="primary">
          <Button.Label>
            {isLoading ? <Loader aria-label="Loading" size="big" /> : 'Log in'}
          </Button.Label>
        </LoginButton>
      </Direct>

      <NewAccount>
        <Ask>Don't have an account?</Ask>  
        <Signup to="/register">SIGN UP FOR SPOTIFY</Signup>
      </NewAccount>
      
    </LoginForm>
  );
}

const LoginForm = styled.form`
  min-height: 100%;
  width: var(--card-width);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  padding: 20px;
`;

const Suggest = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-family: spotify-circular, Helvetica, Arial, sans-serif;
  font-weight: 900;
  border-bottom: 1px solid rgb(217, 218, 220);
  width: 100%;
  max-width: 450px;
  text-align:center;
  padding: 10px 0;
`;

const FormGroup = styled(Form.Group)`
  display: block;
  max-width: 450px;
  width: 100%;
`;

const FormFeedback = styled(Form.Feedback)`
  font-size: var(--font-size);
`;
const FormLabel = styled(Form.Label)`
  font-family: spotify-circular, Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  line-height: 1.5rem;
  font-weight: 600;
`;
const FormInput = styled(Form.Input)`
  font-family: spotify-circular, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 14px;
  min-height: 54px;
  outline: 1px solid black;

  &:focus{
    border: 3px solid #555;
  }
`;

const Direct = styled.div`
  width: 100%;
  max-width: 450px;
  display:flex;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(217, 218, 220);
  margin-bottom: 10px;
`;

const Forgot = styled(Link)`
  font-family: spotify-circular, Helvetica, Arial, sans-serif;
  &:hover{
    text-decoration: underline;
  }
  margin-bottom: 10px; 
`;

const LoginButton = styled(Button)`
  font-family: spotify-circular, Helvetica, Arial, sans-serif;
  line-height: 1.25rem;
  font-weight: 700;
  background-color: var(--background-base,#1ed760);
  border: none;
  letter-spacing: 2px;
  color: var(--text-base,#000000);
  border-radius: 500px;
  font-size: inherit;
  padding: 14px 32px;
`;

const NewAccount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  width: 100%;
  max-width: 450px;
`;
const Ask = styled.p`
  font-family: spotify-circular, Helvetica, Arial, sans-serif;
  font-size: 1.125rem;
  line-height: 1.5rem;
  color: inherit;
  font-weight: 900;
`;
const Signup = styled(Link)`
  font-family: spotify-circular, Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: var(--text-subdued,#6a6a6a);
  font-weight: 900;
  background-color: -internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59));
  border-radius: 500px;
  border: 1px solid black;
  width: 100%;
  text-align: center;
  padding: 10px;
`;

export default Login;
