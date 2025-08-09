import User from '#types/models/User';
import getFieldError from '#utils/getFieldError';
import { useAuth } from '@guoyunhe/react-auth';
import { Save as SaveIcon } from '@mui/icons-material';
import { Alert, Box, Button, Card, CardContent, CardHeader, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import xior from 'xior';

export default function ProfileCard() {
  const { t } = useTranslation();
  const { user, setUser } = useAuth<User>();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);

  const nameError = getFieldError(errors, 'name');
  const usernameError = getFieldError(errors, 'username');
  const emailError = getFieldError(errors, 'email');

  const submit = () => {
    setLoading(true);
    xior
      .put('/user', { name, username, email })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setErrors(err?.response?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setUsername(user?.username || '');
  }, [user]);

  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardHeader title={t('Profile')} />
      <CardContent>
        <Box sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
          {typeof errors === 'string' && <Alert severity="error">{errors}</Alert>}
          <TextField
            label={t('Name')}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            error={!!nameError}
            helperText={nameError}
            sx={{ mb: 2 }}
          />
          <TextField
            label={t('Username')}
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value?.replace(/[^A-Za-z0-9_]/g, ''));
            }}
            error={!!usernameError}
            helperText={usernameError}
            sx={{ mb: 2 }}
          />
          <TextField
            label={t('Email')}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={!!emailError}
            helperText={emailError}
            sx={{ mb: 2 }}
          />
          <Button variant="outlined" loading={loading} onClick={submit} startIcon={<SaveIcon />}>
            {t('Save')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
