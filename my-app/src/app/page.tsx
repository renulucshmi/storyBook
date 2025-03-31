// app/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PolaroidPhotoAlbum() {
  const [selectedImage, setSelectedImage] = useState<{ id: number; src: string; alt: string; rotation: number; yOffset: number } | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Generate array of 100 images
  const images = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    src: `/images/${i + 1}.png`,
    alt: `Ghibli moment ${i + 1}`,
    // Random rotation for hanging effect (-5 to 5 degrees)
    rotation: Math.floor(Math.random() * 11) - 5,
    // Smaller vertical position variation (0-15px) to reduce gaps
    yOffset: Math.floor(Math.random() * 15)
  }));

  useEffect(() => {
    // Set images as loaded after component mounts
    setImagesLoaded(true);
    
    // Add confetti effect
    const createConfetti = () => {
      const confettiContainer = document.getElementById('confetti-container');
      if (!confettiContainer) return;
      
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const animDuration = Math.random() * 3 + 2;
        const animDelay = Math.random() * 5;
        const colors = ['#FFD700', '#FF6347', '#4682B4', '#9ACD32', '#FF69B4'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.left = `${left}%`;
        confetti.style.backgroundColor = color;
        confetti.style.animationDuration = `${animDuration}s`;
        confetti.style.animationDelay = `${animDelay}s`;
        
        confettiContainer.appendChild(confetti);
      }
    };
    
    createConfetti();
  }, []);

  const openLightbox = (image: { id: number; src: string; alt: string; rotation: number; yOffset: number }) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-pink-50 relative overflow-hidden">
      {/* Confetti Container */}
      <div id="confetti-container" className="fixed inset-0 pointer-events-none z-10"></div>
      
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Hearts */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={`heart-${i}`} 
            className="absolute text-pink-200"
            style={{
              fontSize: `${Math.random() * 30 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.7,
              transform: `rotate(${Math.random() * 360}deg)`,
              zIndex: 1
            }}
          >
            ❤️
          </div>
        ))}
        
        {/* Balloons */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={`balloon-${i}`} 
            className="absolute text-indigo-300 animate-bounce"
            style={{
              fontSize: `${Math.random() * 40 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              opacity: 0.6,
              animationDuration: `${Math.random() * 3 + 2}s`,
              zIndex: 1
            }}
          >
            🎈
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="py-8 bg-pink-100 relative z-20 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl text-center font-serif text-pink-800">
            Our Ghibli Journey 🌿
          </h1>
          <p className="text-center mt-4 text-xl text-pink-700 font-medium">
            Happy Birthday, Love ❤️
          </p>
        </div>
      </header>

      {/* String Lights and Photos */}
      <main className="container mx-auto px-4 py-12 relative z-20">
        {imagesLoaded ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: Math.ceil(images.length / 6) }).map((_, stringIndex) => (
              <div key={`string-${stringIndex}`} className="relative">
                {/* Vertical LED String */}
                <div className="absolute h-full w-1 bg-yellow-100 left-1/2 transform -translate-x-1/2 z-10"></div>
                
                {/* LED Bulbs */}
                {Array.from({ length: 12 }).map((_, bulbIndex) => (
                  <div 
                    key={`bulb-${stringIndex}-${bulbIndex}`}
                    className="absolute w-4 h-4 rounded-full bg-yellow-300 left-1/2 transform -translate-x-1/2 z-20 animate-pulse"
                    style={{
                      top: `${(bulbIndex * 8.3)}%`,
                      boxShadow: '0 0 10px 2px rgba(255, 255, 0, 0.5)'
                    }}
                  />
                ))}

                {/* Polaroid Photos on this string */}
                {images.slice(stringIndex * 6, (stringIndex + 1) * 6).map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="relative bg-white rounded p-3 pt-3 pb-12 shadow-lg mx-auto mb-8 cursor-pointer"
                    style={{
                      width: '85%',
                      maxWidth: '300px',
                      transform: `rotate(${image.rotation}deg)`,
                      // Reduced spacing between photos
                      marginTop: `${image.yOffset + index * 120}px`,
                      zIndex: 30
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => openLightbox(image)}
                    whileHover={{ scale: 1.05, rotate: 0 }}
                  >
                    {/* String connecting to the vertical string */}
                    <div 
                      className="absolute w-1 bg-gray-300 left-1/2 transform -translate-x-1/2 -top-8" 
                      style={{ height: '30px' }}
                    />
                    
                    {/* Picture Area */}
                    <div className="relative w-full aspect-square mb-2 overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="300px"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Polaroid Caption */}
                    <p className="text-center text-sm font-handwriting text-gray-700">
                      Memory #{image.id}
                    </p>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-pink-700">Hanging up your magical moments...</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 bg-pink-100 mt-8 relative z-20">
        <p className="text-center text-pink-700">
          Created with love, inspired by Studio Ghibli ✨
        </p>
      </footer>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-4xl max-h-screen"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <button
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg"
              onClick={closeLightbox}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="bg-white bg-opacity-70 px-4 py-2 rounded-full text-gray-800">
                Memory #{selectedImage.id}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CSS for the confetti animation */}
      <style jsx global>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          animation: confettiFall linear infinite;
        }
        
        @font-face {
          font-family: 'Handwriting';
          src: local('Comic Sans MS');
          font-weight: normal;
          font-style: normal;
        }
        
        .font-handwriting {
          font-family: 'Handwriting', cursive;
        }
      `}</style>
    </div>
  );
}