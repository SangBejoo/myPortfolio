
// Floating Particles Component
const FloatingParticles = () => {
    const particles = Array.from({ length: 50 }, (_, i) => i);
  
    return (
      <div className="floating-particles" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {particles.map((particle) => {
          const size = Math.random() * 4 + 1; // 1px to 5px
          return (
            <div
              key={particle}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`, // Distribute initially to avoid empty gaps
                width: `${size}px`,
                height: `${size}px`,
                opacity: Math.random() * 0.5 + 0.1,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${20 + Math.random() * 20}s`,
              }}
            />
          );
        })}
      </div>
    );
};

export default FloatingParticles;
