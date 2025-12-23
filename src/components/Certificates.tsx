
import { useState } from 'react';
import sertifikatBangkit from '../assets/image/sertifikat/sertifikat bangkit.png'
import sertifikatCcit from '../assets/image/sertifikat/sertifikat ccit.jpg'
import sertifikatAlibaba from '../assets/image/sertifikat/sertifikat-alibaba-cloud.jpg'
import sertifikatToeic from '../assets/image/sertifikat/sertifikat-toeic.jpg'

const CertificateModal = ({ isOpen, imageSrc, imageAlt, onClose }: { isOpen: boolean, imageSrc: string, imageAlt: string, onClose: () => void }) => {
    if (!isOpen) return null
  
    return (
      <div className="certificate-modal-backdrop" onClick={onClose}>
        <div className="certificate-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
          <img src={imageSrc} alt={imageAlt} className="modal-image" />
        </div>
      </div>
    )
}

const Certificates = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState('')
    const [selectedAlt, setSelectedAlt] = useState('')
  
    const openModal = (imageSrc: string, imageAlt: string) => {
      setSelectedImage(imageSrc)
      setSelectedAlt(imageAlt)
      setModalOpen(true)
    }
  
    const closeModal = () => {
      setModalOpen(false)
    }
  
    return (
      <section id="certificates">
        <CertificateModal isOpen={modalOpen} imageSrc={selectedImage} imageAlt={selectedAlt} onClose={closeModal} />
        <div className="certificates-container">
          <div className="heading fade-in-up">
            <h3 className="title section-title fade-in-up">Certificates</h3>
            <p className="separator fade-in-up"></p>
            <p className="subtitle fade-in-up">
              Here are some of my professional certifications that demonstrate my commitment to continuous learning and expertise in various technologies.
            </p>
          </div>
          <div className="certificates-wrapper">
            <div className="certificate-item scale-in stagger-1">
              <img
                src={sertifikatBangkit}
                alt="Bangkit Certificate"
                onClick={() => openModal(sertifikatBangkit, 'Bangkit Certificate')}
                style={{ cursor: 'pointer' }}
              />
              <p>Bangkit Academy</p>
            </div>
            <div className="certificate-item scale-in stagger-2">
              <img
                src={sertifikatCcit}
                alt="CCIT Certificate"
                onClick={() => openModal(sertifikatCcit, 'CCIT Certificate')}
                style={{ cursor: 'pointer' }}
              />
              <p>CCIT Certification</p>
            </div>
            <div className="certificate-item scale-in stagger-3">
              <img
                src={sertifikatAlibaba}
                alt="Alibaba Cloud Certificate"
                onClick={() => openModal(sertifikatAlibaba, 'Alibaba Cloud Certificate')}
                style={{ cursor: 'pointer' }}
              />
              <p>Alibaba Cloud</p>
            </div>
            <div className="certificate-item scale-in stagger-4">
              <img
                src={sertifikatToeic}
                alt="TOEIC Certificate"
                onClick={() => openModal(sertifikatToeic, 'TOEIC Certificate')}
                style={{ cursor: 'pointer' }}
              />
              <p>TOEIC</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

export default Certificates;
