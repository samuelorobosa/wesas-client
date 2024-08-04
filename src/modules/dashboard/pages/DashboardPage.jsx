import NavDrawer from '@/src/modules/dashboard/components/NavDrawer.jsx';
import { Outlet } from 'react-router-dom';
import AuthGuard from '@/src/modules/dashboard/components/AuthGuard.jsx';
import { Fragment } from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

export default function DashboardPage() {
  return (
    <Fragment>
      <TawkMessengerReact
        propertyId={import.meta.env.VITE_TAWK_TO_PROPERTY_ID}
        widgetId={import.meta.env.VITE_TAWKTO_WIDGET_ID}
      />
      <AuthGuard>
        <section className="flex h-screen">
          <NavDrawer />
          <main className="p-3 flex-1 flex bg-grey-00 max-h-full overflow-auto">
            <Outlet />
          </main>
        </section>
      </AuthGuard>
    </Fragment>
  );
}
