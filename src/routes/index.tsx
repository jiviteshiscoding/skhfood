import { createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATHS } from './route-paths';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';
import { NotFound } from '@/components/common/NotFound';

import { LandingView } from '@/views/public/LandingView';
import { LoginView } from '@/views/public/LoginView';
import { PublicTraceView } from '@/views/public/PublicTraceView';
import { DashboardHomeView } from '@/views/protected/DashboardHomeView';
import { UnauthorizedView } from '@/views/protected/UnauthorizedView';

export const router = createBrowserRouter([
  // Public Routes (Accessible without session)
  {
    element: <PublicLayout />,
    children: [
      {
        path: ROUTE_PATHS.HOME,
        element: <LandingView />,
      },
      {
        path: ROUTE_PATHS.PUBLIC_TRACE,
        element: <PublicTraceView />,
      },
      {
        element: <PublicOnlyRoute />,
        children: [
          {
            path: ROUTE_PATHS.LOGIN,
            element: <LoginView />,
          },
        ],
      },
    ],
  },

  // Protected Routes (Session Required)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: ROUTE_PATHS.DASHBOARD,
            element: <DashboardHomeView />,
          },
          {
            path: ROUTE_PATHS.BATCHES,
            element: <DashboardHomeView />,
          },
          {
            path: ROUTE_PATHS.EVENTS,
            element: <DashboardHomeView />,
          },
          {
            path: ROUTE_PATHS.LINEAGE,
            element: <DashboardHomeView />,
          },
          {
            path: ROUTE_PATHS.RECALLS,
            element: <DashboardHomeView />,
          },
          {
            path: ROUTE_PATHS.SETTINGS,
            element: <DashboardHomeView />,
          },
          {
            path: ROUTE_PATHS.UNAUTHORIZED,
            element: <UnauthorizedView />,
          },
        ],
      },
    ],
  },

  // Fallback Catch-All
  {
    path: ROUTE_PATHS.NOT_FOUND,
    element: <NotFound />,
  },
]);
