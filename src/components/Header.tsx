
// Header Component
const Header = () => {
    return (
      <header id="welcome-section">
        <div className="container">
          <h1>
            <span className="line">Hello, I am</span>
            <span className="line gradient-text">Ayub Subagiya</span>
            <span className="line">
              <span className="color">&</span> Back End Developer
            </span>
          </h1>
          <div className="buttons">
            <a href="#projects">my portfolio</a>
            <a href="#contact" className="cta">get in touch</a>
          </div>
        </div>
      </header>
    )
}

export default Header;
