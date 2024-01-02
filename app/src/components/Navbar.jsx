export const Navbar = () => {
  return (
    <nav>
      <div>
        <ul className="d-flex flex-row list-unstyled gap-3">
          <li>
            <a href="/">Explore</a>
          </li>
          <li>
            <a href="/search">Search</a>
          </li>
          <li>
            <a href="/backlog">Backlog</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
