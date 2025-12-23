
import authorImg from '../assets/image/author/IMG_20210606_145729_903.jpg';

// About Component
const About = () => {
    return (
      <section id="about">
        <div className="wrapper">
          <article>
            <div className="title">
              <h3 className="section-title fade-in-up">Who's this guy?</h3>
              <p className="separator fade-in-up"></p>
            </div>
            <div className="about-content">
              <div className="profile-image-container">
                <img src={authorImg} alt="Ayub Subagiya" className="profile-image" />
                <div className="profile-glow"></div>
              </div>
              <div className="about-text">
                <div className="desc full">
                  <h4 className="subtitle">My name is Ayub Subagiya</h4>
                  <p>Dedicated Back-End Developer with experience in microservices, cloud computing. Proficient in GoLang, PostgreSQL, and cloud technologies. Skilled in problem-solving, system architecture, and agile collaboration.</p>
                </div>
              </div>
            </div>
            <div className="title">
              <h3>What does he do?</h3>
              <p className="separator"></p>
            </div>
            <div className="skills-grid">
              <div className="desc">
                <h4 className="subtitle">I'm a programmer.</h4>
                <p>For the junior 👶 back-end I work with GoLang, PostgreSQL, and cloud technologies like Google Cloud Platform. I also work with Python for various projects.</p>
              </div>
              <div className="desc">
                <h4 className="subtitle">Also a learner.</h4>
                <p>I have experience in geospatial data processing, real-time systems, and collaborative development in agile environments.</p>
              </div>
            </div>
          </article>
        </div>
      </section>
    )
}

export default About;
