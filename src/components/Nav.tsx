export function Nav() {
  return (
    <nav>
      <div className="nav-inner">
        <div className="brand">
          Saralya<span className="brand-dot"></span>
        </div>
        <div className="nav-links">
          <a href="#persona">Who it's for</a>
          <a href="#demo">Live demo</a>
          <a href="#arch">Architecture</a>
          <a href="#compliance">Compliance</a>
        </div>
        <div className="nav-btns">
          <button className="btn btn-o">Sign in</button>
          <button className="btn btn-f">Book demo</button>
        </div>
      </div>
    </nav>
  )
}
