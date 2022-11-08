const Header = ({ title, container = true }) => (
  <header className={container ? 'layout-page-header-container' : ''}>
    <div>
      <p>{title}</p>
    </div>
  </header>
);

export default Header;
