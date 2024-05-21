import userProfile from '../../../core/assets/images/user_profile.svg';

export default function EventHistoryPage() {
  return (
    <main className="w-full">
      <h1 className="font-medium text-xl">Event History</h1>
      <section className="bg-white rounded-md p-4 mt-4">
        {Array.from({ length: 10 }).map((_, index, arr) => (
          <div
            className={`flex gap-x-3 items-center py-3 ${index !== arr.length - 1 && 'border-b border-grey_02'}`}
          >
            <figure className="w-24 h-24">
              <img
                className="w-full h-full object-cover"
                src={userProfile}
                alt="User Profile"
              />
            </figure>
            <aside className="flex flex-col gap-y-2">
              <p>
                Zaynab Azzahra recommended this online store to buy electronics
              </p>
              <span>1 minutes ago • Electronics</span>
            </aside>
          </div>
        ))}
      </section>
    </main>
  );
}
