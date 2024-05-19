import './NavDrawerItem.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectNewItem } from '../../state/nav-drawer-slice';
import { ChevronDown } from 'lucide-react';

export default function NavDrawerItem({ title, itemKey, icon, links }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedItemKey } = useSelector((state) => state.navDrawer);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  function handleLinkClick() {
    if (selectedItemKey != itemKey) dispatch(selectNewItem(itemKey));
  }

  return (
    <div className="nav-drawer-item">
      <button
        onClick={handleClick}
        className={`clickable ${selectedItemKey === itemKey && 'isActive'}`}
      >
        <IconContext.Provider
          value={{ className: 'leading-icon', size: '17px' }}
        >
          {icon}
        </IconContext.Provider>
        <p className="title">{title}</p>
        <div className={`trailing-icon-wrapper ${isOpen && 'open'}`}>
          <ChevronDown />
        </div>
      </button>
      <section className={`links ${isOpen && 'open'}`}>
        <ul className="links-list">
          {links.map(({ title, path }) => (
            <li onClick={handleLinkClick} key={crypto.randomUUID()}>
              <NavLink
                className={({ isActive }) => (isActive ? 'link-active' : '')}
                to={path}
              >
                <button className="link-btn">
                  <div className="selection-circle" />
                  <p className="link-title">{title}</p>
                </button>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
