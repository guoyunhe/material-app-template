import PaginatedResult from '#types/PaginatedResult';
import User from '#types/models/User';
import { Container, List, Pagination, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'wouter';
import xior from 'xior';
import UserCard from './UserCard';

export default function AdminUserListPage() {
  const { t } = useTranslation('admin');
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  const reload = useCallback(() => {
    xior
      .get<PaginatedResult<User>>('/admin/users', {
        params: {
          page,
        },
      })
      .then((res) => {
        setTotal(res.data.meta.total);
        setUsers(res.data.data);
      });
  }, [page]);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" my={3}>
        {t('User Management')}
      </Typography>
      <List>
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={() => {
              reload();
            }}
          />
        ))}
      </List>
      <Pagination
        page={Number(searchParams.get('page'))}
        count={Math.ceil(total / 10)}
        onChange={(e, p) => {
          setSearchParams((prev) => {
            prev.set('page', String(p));
            return prev;
          });
        }}
      />
    </Container>
  );
}
