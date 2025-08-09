import getFieldError from '#utils/getFieldError';
import { useRegister } from '@guoyunhe/react-auth';
import { Alert, Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function RegisterPage() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { submit, loading, errors } = useRegister({
    name,
    username,
    email,
    password,
    passwordConfirm,
  });

  const nameError = getFieldError(errors, 'name');
  const usernameError = getFieldError(errors, 'username');
  const emailError = getFieldError(errors, 'email');
  const passwordError = getFieldError(errors, 'password');
  const passwordConfirmError = getFieldError(errors, 'passwordConfirm');

  return (
    <Stack spacing={3} p={3}>
      {typeof errors === 'string' && <Alert severity="error">{errors}</Alert>}
      <TextField
        label={t('Name')}
        type="text"
        name="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        error={!!nameError}
        helperText={nameError}
      />
      <TextField
        label={t('Username')}
        type="text"
        name="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value?.replace(/[^A-Za-z0-9_]/g, ''));
        }}
        error={!!usernameError}
        helperText={usernameError}
      />
      <TextField
        label={t('Email')}
        type="email"
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        label={t('Password')}
        type="password"
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        error={!!passwordError}
        helperText={passwordError}
      />
      <TextField
        label={t('Confirm password')}
        type="password"
        name="passwordConfirm"
        value={passwordConfirm}
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}
        error={!!passwordConfirmError}
        helperText={passwordConfirmError}
      />
      <Button variant="contained" loading={loading} onClick={submit}>
        {t('Register')}
      </Button>
    </Stack>
  );
}
