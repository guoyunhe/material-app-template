import { AuthProvider, RequireAuth } from '@guoyunhe/react-auth';
import { CircularProgress } from '@mui/material';
import { MaterialApp } from 'material-app';
import { lazy, Suspense } from 'react';
import { CacheStore, FetchProvider } from 'react-fast-fetch';
import { Route, Switch } from 'wouter';
import xior from 'xior';
import { themes } from './config/theme';
import NotFoundPage from './pages/not-found';

// layouts
const AppLayout = lazy(() => import('./layouts/app'));
const AdminLayout = lazy(() => import('./layouts/admin'));
const LandingLayout = lazy(() => import('./layouts/landing'));

// landing pages
const HomePage = lazy(() => import('./pages/home'));
const AboutPage = lazy(() => import('./pages/about'));
const PrivacyPage = lazy(() => import('./pages/privacy'));
const TermsPage = lazy(() => import('./pages/terms'));

// auth pages
const LoginPage = lazy(() => import('./pages/login'));
const RegisterPage = lazy(() => import('./pages/register'));

// app pages
const DashboardPage = lazy(() => import('./pages/dashboard'));
const SettingsPage = lazy(() => import('./pages/settings'));

// admin pages
const AdminDashboardPage = lazy(() => import('./pages/admin-dashboard'));
const AdminUserListPage = lazy(() => import('./pages/admin-user-list'));
const AdminSettingsPage = lazy(() => import('./pages/admin-settings'));

const store = new CacheStore();
const fetcher = (url: string) => xior.get(url).then((res) => res.data);

export default function App() {
  return (
    <FetchProvider store={store} fetcher={fetcher}>
      <Suspense
        fallback={
          <CircularProgress
            size={48}
            sx={{
              display: 'block',
              position: 'fixed',
              left: '50%',
              top: '50%',
              m: -3,
            }}
          />
        }
      >
        <MaterialApp themes={themes}>
          <AuthProvider>
            <Switch>
              <Route path="/app" nest>
                <RequireAuth>
                  <AppLayout>
                    <Switch>
                      <Route path="/" component={DashboardPage} />
                      <Route path="/settings" component={SettingsPage} />
                      <Route component={NotFoundPage} />
                    </Switch>
                  </AppLayout>
                </RequireAuth>
              </Route>
              <Route path="/admin" nest>
                <RequireAuth>
                  <AdminLayout>
                    <Switch>
                      <Route path="/" component={AdminDashboardPage} />
                      <Route path="/users" component={AdminUserListPage} />
                      <Route path="/settings" component={AdminSettingsPage} />
                      <Route component={NotFoundPage} />
                    </Switch>
                  </AdminLayout>
                </RequireAuth>
              </Route>
              <Route>
                <LandingLayout>
                  <Switch>
                    <Route path="/" component={HomePage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/privacy" component={PrivacyPage} />
                    <Route path="/terms" component={TermsPage} />
                    <Route component={NotFoundPage} />
                  </Switch>
                </LandingLayout>
              </Route>
            </Switch>
          </AuthProvider>
        </MaterialApp>
      </Suspense>
    </FetchProvider>
  );
}
