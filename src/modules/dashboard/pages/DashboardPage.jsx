import NavDrawer from '@/src/modules/dashboard/components/NavDrawer.jsx';
import { Outlet } from 'react-router-dom';
import AuthGuard from '@/src/modules/dashboard/components/AuthGuard.jsx';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <section className="flex h-screen">
        <NavDrawer />
        <main className="p-3 flex-1 flex bg-grey-00 max-h-full overflow-auto">
          <Outlet />
        </main>
      </section>
    </AuthGuard>
  );
}
