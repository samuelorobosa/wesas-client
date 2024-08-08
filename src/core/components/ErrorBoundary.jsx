import { useRouteError } from 'react-router-dom';
import Error500 from '@/src/core/components/Error500.jsx';

export default function CustomErrorBoundary() {
  let error = useRouteError();
  console.error(error);

  return <Error500 />;
}
