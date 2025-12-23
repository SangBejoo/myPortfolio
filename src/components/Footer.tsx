import SocialLinks from './SocialLinks';

const Footer = () => {
    return (
      <footer>
        <div className="wrapper">
          <h3>AYUB SUBAGIYA</h3>
          <p>©{new Date().getFullYear()} • ayubsubagiya@gmail.com</p>
          <SocialLinks />
        </div>
      </footer>
    )
  }

export default Footer;
