/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Loader } from '@ahaui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Helmet } from 'react-helmet';
import * as Toast from 'components/common/Toast';
import validationSchema from 'utils/schemas/registerSchema';
import { register as registerThunk } from 'store/authSlice';

function Register() {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const isUserNameInvalid = !!errors.userName;
  const isPasswordInvalid = !!errors.password;
  const isConfirmPasswordInvalid = !!errors.confirmPassword;
  const isEmailInvalid = !!errors.email;

  const handleRegister = (registerInfo) => {
    dispatch(registerThunk(registerInfo))
      .unwrap()
      .then(() => {
        Toast.success('Register success');
        navigate('/home');
      })
      .catch(console.error);
  };

  return (
    <RegisterForm
      onSubmit={handleSubmit(handleRegister)}
      data-testid="register-page"
    >
      <Helmet>
        <title>Register for Spotify</title>
        <meta name="description" content="Want to be a part of Leo?" />
      </Helmet>
      <FormGroup controlId="registerForm.email">
        <Form.Label>Email</Form.Label>
        <Form.Input
          type="text"
          isInvalid={isEmailInvalid}
          {...register('email')}
          onBlur={(e) => setValue('email', e.target.value.trim())}
        />
        <FormFeedback type="invalid" role="alert">
          {errors?.email?.message}
        </FormFeedback>
      </FormGroup>
      <FormGroup controlId="registerForm.userName">
        <Form.Label>User name</Form.Label>
        <Form.Input
          type="text"
          isInvalid={isUserNameInvalid}
          {...register('userName')}
          onBlur={(e) => setValue('userName', e.target.value.trim())}
        />
        <FormFeedback type="invalid" role="alert">
          {errors?.userName?.message}
        </FormFeedback>
      </FormGroup>
      <FormGroup controlId="registerForm.password">
        <Form.Label>Password</Form.Label>
        <Form.Input
          type="password"
          isInvalid={isPasswordInvalid}
          {...register('password')}
          onBlur={(e) => setValue('password', e.target.value.trim())}
        />
        <FormFeedback type="invalid" role="alert">
          {errors?.password?.message}
        </FormFeedback>
      </FormGroup>
      <FormGroup controlId="registerForm.confirmPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Input
          type="password"
          isInvalid={isConfirmPasswordInvalid}
          {...register('confirmPassword')}
          onBlur={(e) => setValue('confirmPassword', e.target.value.trim())}
        />
        <FormFeedback type="invalid" role="alert">
          {errors?.confirmPassword?.message}
        </FormFeedback>
      </FormGroup>
      <RegisterButton size="small" variant="primary">
        <Button.Label>
          {isLoading ? (
            <Loader aria-label="Loading" size="small" />
          ) : (
            'Register'
          )}
        </Button.Label>
      </RegisterButton>
    </RegisterForm>
  );
}

const RegisterForm = styled.form`
  min-height: 100%;
  width: var(--card-width);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid;
  margin: 40px auto;
  padding: 60px;
`;

const FormGroup = styled(Form.Group)`
  width: var(--field-responsive-width);
`;

const FormFeedback = styled(Form.Feedback)`
  font-size: var(--font-size);
`;

const RegisterButton = styled(Button)`
  width: max(10%, 70px);
`;

export default Register;
