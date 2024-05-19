import NavDrawer from '@/src/modules/dashboard/components/NavDrawer.jsx';
import { Outlet } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <section className="flex h-screen">
      <NavDrawer />
      <main className="p-3 flex-1 flex bg-grey-00 max-h-full overflow-auto">
        <Outlet />
      </main>
    </section>
  );
}
