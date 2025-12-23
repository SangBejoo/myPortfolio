
import React, { useState } from 'react';
import SocialLinks from './SocialLinks';

// Contact Component
const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [statusMessage, setStatusMessage] = useState('')
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setSubmitStatus('loading')
  
      try {
        // Using Formspree - emails go directly to ayubsubagiya@gmail.com
        const response = await fetch('https://formspree.io/f/xeovqkqe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        })
  
        if (response.ok) {
          setSubmitStatus('success')
          setStatusMessage('✓ Email berhasil dikirim! Saya akan segera membalas pesan Anda.')
          setFormData({ name: '', email: '', message: '' })
          setTimeout(() => setSubmitStatus('idle'), 5000)
        } else {
          setSubmitStatus('error')
          setStatusMessage('✗ Gagal mengirim email. Silakan coba lagi atau hubungi langsung via WhatsApp.')
          setTimeout(() => setSubmitStatus('idle'), 5000)
        }
      } catch (error) {
        setSubmitStatus('error')
        setStatusMessage('✗ Terjadi error. Silakan hubungi via WhatsApp: 089697979954')
        setTimeout(() => setSubmitStatus('idle'), 5000)
      }
    }
  
    return (
      <section id="contact">
        <div className="container">
          <div className="heading-wrapper">
            <div className="heading">
              <h2 className="title section-title fade-in-up">Get In Touch</h2>
              <p className="separator fade-in-up"></p>
              <p className="subtitle fade-in-up">
                Have a project in mind or just want to chat? I'd love to hear from you.
                Send me a message and let's discuss how we can work together.
              </p>
            </div>
            <div className="contact-info-wrapper">
              <SocialLinks />
              <div className="contact-details">
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <p className="contact-label">Phone</p>
                    <a href="https://wa.me/6289697979954" target="_blank" rel="noopener noreferrer">
                      +62 896 9797 9954
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <p className="contact-label">Email</p>
                    <a href="mailto:ayubsubagiya@gmail.com">ayubsubagiya@gmail.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <p className="contact-label">Location</p>
                    <p>Bekasi, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form id="contact-form" onSubmit={handleSubmit}>
            <input 
              placeholder="Name" 
              name="name" 
              type="text" 
              value={formData.name}
              onChange={handleInputChange}
              required 
            />
            <input 
              placeholder="Email" 
              name="email" 
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
            <textarea 
              placeholder="Message" 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            <div className="form-actions">
              <input 
                className="button" 
                id="submit" 
                name="submit" 
                type="submit" 
                value={submitStatus === 'loading' ? 'Sending...' : 'Submit'}
                disabled={submitStatus === 'loading'}
              />
              {submitStatus === 'success' && <p className="success-message">{statusMessage}</p>}
              {submitStatus === 'error' && <p className="error-message">{statusMessage}</p>}
            </div>
          </form>
        </div>
      </section>
    )
}

export default Contact;
