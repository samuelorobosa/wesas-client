import { CircleAlert } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/src/core/components/ui/dialog.jsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/core/components/ui/select.jsx';
import { ClipLoader } from 'react-spinners';
import { Button } from '@/src/core/components/ui/button.jsx';
import { useState } from 'react';

export default function ManageSubscription() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <main className="w-full">
      <h1 className="font-medium text-xl">Manage Subscription</h1>
      <section>
        <p className="mt-3">
          You can manage your subscription here. Please contact support if you
          have any issues.
        </p>
        <div className="p-4 bg-white w-full mt-4 rounded-md h-96 flex flex-col justify-center ">
          <figure className="flex flex-col gap-y-3 justify-center items-center">
            <CircleAlert color="#8B909A" size={100} />
            <p className="text-sm text-grey_03">
              You have no active subscription.
            </p>
            <Dialog>
              <DialogTrigger>
                <p className="cursor-pointer text-blue text-sm">Get Started</p>
              </DialogTrigger>
              <DialogContent className="rounded-md">
                <header className="font-semibold text-base text-center">
                  Subscribe
                </header>
                <div className="flex flex-col gap-y-2">
                  <span className="font-medium text-sm text-grey_03">
                    How many months?
                  </span>
                  <Select>
                    <SelectTrigger className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background text-left placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <SelectValue placeholder="Subscription Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem key="one-month" value="One Month">
                          One Month
                        </SelectItem>
                        <SelectItem key="three-months" value="Three Months">
                          Three Months
                        </SelectItem>
                        <SelectItem key="six-months" value="Six Month">
                          Six Months
                        </SelectItem>
                        <SelectItem key="twelve-months" value="Twelve Month">
                          Twelve Months
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-y-2">
                  <span className="font-medium text-sm text-grey_03">
                    Subscription Type
                  </span>
                  <Select>
                    <SelectTrigger className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background text-left placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <SelectValue placeholder="Subscription Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem key="procurement" value="Procurement">
                          Procurement
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <ClipLoader
                      color="#fff"
                      loading={isLoading}
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    <span>Subscribe</span>
                  )}
                </Button>
              </DialogContent>
            </Dialog>
          </figure>
        </div>
      </section>
    </main>
  );
}
