import { FrownIcon } from 'lucide-react';
import { Button } from '@/src/core/components/ui/button.jsx';

export default function Error404() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <FrownIcon className="mx-auto h-12 w-12 text-blue" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, page not found!
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t seem to exist. Check the
          URL or try navigating back to the homepage.
        </p>
        <div className="mt-6">
          <Button
            href={() => window.history.back()}
            className="inline-flex items-center rounded-md bg-blue px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-blue/90"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
