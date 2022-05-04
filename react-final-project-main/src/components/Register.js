/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
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
  const [selectedValue, setSelectedValue] = useState([]);

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
        <meta name="description" content="Member of spotify?" />
      </Helmet>

      <Suggest>Sign up for free to start listening.</Suggest>

      <FormGroup controlId="registerForm.email">
        <FormLabel>What's your email?</FormLabel>
        <FormInput
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
        <FormLabel>What should we call you?</FormLabel>
        <FormInput
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
        <FormLabel>Create a password</FormLabel>
        <FormInput
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
        <FormLabel>Confirm your password</FormLabel>
        <FormInput
          type="password"
          isInvalid={isConfirmPasswordInvalid}
          {...register('confirmPassword')}
          onBlur={(e) => setValue('confirmPassword', e.target.value.trim())}
        />
        <FormFeedback type="invalid" role="alert">
          {errors?.confirmPassword?.message}
        </FormFeedback>
      </FormGroup>

      <FormGroup controlId="registerForm.dob">
        <FormLabel>What's your date of birth?</FormLabel>
        <FormInput
          type="date"
          onBlur={(e) => setValue('confirmPassword', e.target.value.trim())}
        />
        {/* <FormFeedback type="invalid" role="alert">
          {errors?.confirmPassword?.message}
        </FormFeedback> */}
      </FormGroup>

      <FormGroupGen>
        {["Male", "Female", "Non-binary"].map((value) => (
          <FormCheck
            key={value.id}
            checked={value === selectedValue}
            onChange={() => setSelectedValue(value)}
            type="radio"
            label={`${value}`}
            id={`${value}`}
          />
        ))}
      </FormGroupGen>

      <FormGroup controlId="registerForm.confirmShare">
        <FormCheckBox
          label={`Share my registration data with Spotify's content providers for marketing purposes.`}
        />
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
      
      <OldAccount>
        <Ask>Already have an account?</Ask>  
        <Signup to="/login">LOG IN</Signup>
      </OldAccount>
      
    </RegisterForm>
  );
}

const RegisterForm = styled.form`
  min-height: 100%;
  width: var(--card-width);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  padding: 20px;
  font-family: spotify-circular, Helvetica, Arial, sans-serif;
`;

const Suggest = styled.h2`
  font-weight: 900;
  font-size: 1.5rem;
  border-bottom: 1px solid rgb(217, 218, 220);
  width: 100%;
  max-width: 450px;
  text-align: center;
  padding: 10px 0;
`;

const FormGroup = styled(Form.Group)`
  display: block;
  max-width: 450px;
  width: 100%;
`;

const FormLabel = styled(Form.Label)`
  font-size: 0.875rem;
  line-height: 1.5rem;
  font-weight: 600;
`;

const FormInput = styled(Form.Input)`
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 14px;
  min-height: 54px;
  outline: 1px solid black;

  &:focus{
    border: 3px solid #555;
  }
`;

const FormFeedback = styled(Form.Feedback)`
  font-size: var(--font-size);
`;

const FormGroupGen = styled(Form.Group)`
  display: flex;
  max-width: 450px;
  width: 100%;
`;

const FormCheck = styled(Form.Check)`
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-right: 20px;
`;
const FormCheckBox = styled(Form.Check)`
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const RegisterButton = styled(Button)`
  line-height: 1.25rem;
  font-weight: 700;
  background-color: var(--background-base,#1ed760);
  border: none;
  color: var(--text-base,#000000);
  border-radius: 500px;
  font-size: inherit;
  padding: 14px 32px;
`;

const OldAccount = styled.div`
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
export default Register;
