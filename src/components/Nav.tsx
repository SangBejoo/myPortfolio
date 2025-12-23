import { useEffect, useState } from 'react';

// Nav Component
const Nav = ({ toggleMenu, showMenu }: { toggleMenu: () => void, showMenu: string }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-wrapper">
          <p className="brand">ayub<strong>subagiya</strong></p>
          <button
            onClick={toggleMenu}
            className={`menu-button ${showMenu === 'active' ? 'active' : ''}`}
            aria-label="Toggle Menu"
          >
            <span></span>
          </button>
        </div>
      </nav>
    )
  }

export default Nav;
