import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationsThunk } from '@/src/modules/profile/net/profileThunks.js';
import TimeAgo from 'react-timeago';
import { CircleAlert } from 'lucide-react';
import { createAvatar } from '@dicebear/core';
import { shapes } from '@dicebear/collection';

export default function EventHistoryPage() {
  const dispatch = useDispatch();
  const { data: notifications } = useSelector(
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
      <h1 className="font-medium text-xl">Event History</h1>
      <section className="bg-white rounded-md p-4 mt-4">
        {notifications.data && notifications.data.length > 0 ? (
          notifications?.data.map((notification, index, arr) => (
            <div
              key={notification?.id}
              className={`flex gap-x-3 items-center py-3 ${index !== arr.length - 1 && 'border-b border-grey_02'}`}
            >
              <figure className="w-24 h-24">
                <img
                  className="w-full h-full object-cover"
                  src={generateAvatar(notification?.id)}
                  alt="User Profile"
                />
              </figure>
              <aside className="flex flex-col gap-y-2">
                <p>{notification?.narration}</p>
                <span>
                  <TimeAgo date={notification.createdAt} /> •{' '}
                  {notification?.subject}
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
