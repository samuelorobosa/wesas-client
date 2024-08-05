import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationsThunk } from '@/src/modules/profile/net/profileThunks.js';
import TimeAgo from 'react-timeago';
import { CircleAlert } from 'lucide-react';
import { createAvatar } from '@dicebear/core';
import { shapes } from '@dicebear/collection';
import { LoadingStates } from '@/src/core/utils/LoadingStates.js';
import { Card, CardContent } from '@/src/core/components/ui/card.jsx';
import { RxHamburgerMenu } from 'react-icons/rx';
import { toggleCollapse } from '@/src/modules/dashboard/state/navDrawerSlice.js';
import useWindowSize from '@/src/core/utils/useWindowSize.js';

export default function EventHistoryPage() {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const handleNavDrawerToggle = () => {
    dispatch(toggleCollapse());
  };
  const { data: notifications, loading } = useSelector(
    (state) => state.profile.get_notifications,
  );
  useEffect(() => {
    dispatch(getNotificationsThunk());
  }, []);

  function generateAvatar(seed) {
    return createAvatar(shapes, {
      seed: seed,
    }).toDataUriSync();
  }

  return (
    <main className="w-full">
      <aside className="flex items-center gap-x-2">
        {width <= 768 ? (
          <RxHamburgerMenu
            className="cursor-pointer"
            onClick={handleNavDrawerToggle}
          />
        ) : null}
        <h1 className="font-medium text-xl">Event History</h1>
      </aside>
      <section className="bg-white rounded-md p-4 mt-4">
        {loading === LoadingStates.pending ? (
          <div className="flex-1 overflow-y-auto p-6 grid gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="grid grid-cols-[1fr_auto] items-center gap-4 pt-6 h-32">
                  <div className="flex gap-y-2 flex-col">
                    <div className="animate-pulse bg-gray-300 h-4 w-1/2 rounded-md"></div>
                    <div className="animate-pulse bg-gray-300 h-4 w-1/4 rounded-md"></div>
                  </div>
                  <div className="animate-pulse bg-gray-300 h-4 w-1/4 rounded-md"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : notifications.data && Object.keys(notifications.data).length > 0 ? (
          Object.keys(notifications?.data).map((key, index, arr) => (
            <div
              key={notifications.data[key]?.id}
              className={`flex gap-x-3 items-center py-3 ${index !== arr.length - 1 && 'border-b border-grey_02'}`}
            >
              <figure className="w-24 h-24">
                <img
                  className="w-full h-full object-cover"
                  src={generateAvatar(notifications.data[key]?.id)}
                  alt="User Profile"
                />
              </figure>
              <aside className="flex flex-col gap-y-2">
                <p>{notifications.data[key]?.narration}</p>
                <span>
                  <TimeAgo date={notifications.data[key]?.createdAt} /> •{' '}
                  {notifications.data[key]?.subject}
                </span>
              </aside>
            </div>
          ))
        ) : (
          <div className={`flex gap-x-3 justify-center items-center py-3 `}>
            <CircleAlert color="#8B909A" size={50} />
            <p className="text-xl text-sidebar">No new notifications</p>
          </div>
        )}
      </section>
    </main>
  );
}
