import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { selectNewItem } from '@/src/modules/dashboard/state/navDrawerSlice.js';

export default function NavDrawerItem({ title, itemKey, icon, links }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedItemKey } = useSelector((state) => state.navDrawer);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  function handleLinkClick() {
    if (selectedItemKey !== itemKey) dispatch(selectNewItem(itemKey));
  }

  return (
    <div className="w-[250px]">
      <div
        onClick={handleClick}
        className={`clickable ${selectedItemKey === itemKey && 'border-l-[3px] border-l-blue'} flex items-center p-2`}
      >
        <span className="text-sidebarColor inline-block mr-2">{icon}</span>
        <p className="flex-1 text-sm">{title}</p>
        <div
          className={`transition-all duration-200 cursor-pointer ${isOpen && 'rotate-180'}`}
        >
          <ChevronDown size={20} />
        </div>
      </div>
      <section className={`bg-sidebarColorLight ${isOpen && 'max-h-[400px]'}`}>
        <ul
          className={`${isOpen ? 'block' : 'hidden'} py-2 transition-all duration-500`}
        >
          {links.map(({ title, path }) => (
            <li onClick={handleLinkClick} key={crypto.randomUUID()}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'text-white' : 'text-sidebarColor'
                }
                to={path}
              >
                <button className="flex items-center w-full py-1 pl-8 gap-x-2">
                  <div className="w-[17px] h-[17px] border border-sidebarColor rounded-full" />
                  <p className="text-sm">{title}</p>
                </button>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
