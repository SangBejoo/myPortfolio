
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TechIcon from './TechIcon';

// Project Component
const Project = ({ img, title, tech, repo, link, images = [], demoLinks, children }: { img: string, title: string, tech: string, repo?: string, link?: string, images?: string[], demoLinks?: {label: string, url: string}[], children: React.ReactNode }) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    }
  
    return (
      <div>
        <div className="project">
          <a className="project-link" href={link || '#'} target="_blank" rel="noopener noreferrer">
            <img className="project-image" src={img} alt={`Screenshot of ${title}`} />
          </a>
          <div className="project-details">
            <div className="project-tile">
              <p className="icons">
                {tech.split(' ').map((t: string) => (
                  <TechIcon key={t} tech={t} />
                ))}
              </p>
              {title}
            </div>
            {children}
            <div className="buttons">
              {repo && repo !== '#' && (
                <a href={repo} target="_blank" rel="noopener noreferrer">
                  View source <i className="fas fa-external-link-alt"></i>
                </a>
              )}
              {link && link !== '#' && (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Try it Live <i className="fas fa-external-link-alt"></i>
                </a>
              )}
              {demoLinks && demoLinks.map((demo, index) => (
                <a key={index} href={demo.url} target="_blank" rel="noopener noreferrer">
                  {demo.label} <i className="fas fa-external-link-alt"></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        {images.length > 0 && (
          <div className="project-slideshow">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index} className="slide-image">
                  <img src={image} alt={`${title} screenshot ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    )
}

export default Project;
