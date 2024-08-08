import { TriangleAlertIcon } from 'lucide-react';
import { Button } from '@/src/core/components/ui/button.jsx';

export default function Error500() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <TriangleAlertIcon className="mx-auto h-12 w-12 text-blue" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, something went wrong!
        </h1>
        <p className="mt-4 text-muted-foreground">
          We&apos;re sorry, but an unexpected error has occurred on our end.
          Please try again later or contact us if the issue persists.
        </p>
        <div className="mt-6">
          <Button
            onClick={() => window.location.reload()}
            className="inline-flex items-center rounded-md bg-blue px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-blue/90"
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
