import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { portfolioData } from '../../data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';

export const ProfileSticker: React.FC = () => {
  const { openApp } = useStore();
  const [isActive, setIsActive] = useState(false);

  // The transparent cutout image
  const cutoutImage = "/images/masud_cutout.png";

  // Spring animation config (more wobbly/bouncy to match reference)
  const springConfig = { type: "spring" as const, stiffness: 400, damping: 15, mass: 0.8 };

  // Floating animation for badges
  const floatingAnimation = {
    y: [-4, 4, -4],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  // Badge animation variants
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0, y: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        scale: { ...springConfig, delay },
        opacity: { duration: 0.1, delay }
      }
    }),
    exit: { opacity: 0, scale: 0, transition: { duration: 0.1 } }
  };

  // Text/Button animation
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { ...springConfig, delay: 0.2 }
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.15 } }
  };

  return (
    <>
      {/* Backdrop Blur Overlay (Active only when hovered) */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 backdrop-blur-[7px] bg-black/10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Main Sticker Container */}
      <div 
        className="relative z-50 flex flex-col items-center select-none"
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      >
        {/* Interaction Buffer: Expands to cover the full area of the stickers to prevent flickering */}
        <div 
            className={`absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-300 ${isActive ? 'w-[400px] h-[500px] -top-10' : 'w-[120px] h-[120px]'}`}
            onClick={() => openApp('about')}
        />
        
        {/* === IDLE STATE: Circle Photo + Label === */}
        <AnimatePresence>
            {!isActive && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center cursor-pointer pointer-events-none"
            >
                {/* Circle Photo */}
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-gray-100 shadow-lg ring-4 ring-white/20">
                <img 
                    src={portfolioData.bio.avatar} 
                    alt="Masud" 
                    className="w-full h-full object-cover"
                    draggable={false}
                />
                </div>
                {/* Label */}
                <span className="mt-3 text-sm font-medium text-white drop-shadow-md bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                Collab with Masud
                </span>
            </motion.div>
            )}
        </AnimatePresence>

        {/* === EXPANDED STATE: Photo Sticker with Badges, Text, Button === */}
        <AnimatePresence>
          {isActive && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={springConfig}
              className="relative flex flex-col items-center mt-4 pointer-events-none"
            >
              {/* === LAYERS: BACK (Behind Person) === */}
              
              {/* Badge 1: Top Right - "Should designers code?" (BEHIND) */}
              <motion.div
                custom={0.05}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute -top-4 -right-20 z-0" 
                style={{ transform: 'rotate(5deg)' }}
              >
                <div className="w-[120px]">
                   <motion.div animate={floatingAnimation}>
                      <img src="/images/stickers/should_designers_code.webp" alt="Should designers code?" draggable={false} className="w-full h-auto" />
                   </motion.div>
                </div>
              </motion.div>

              {/* Badge 2: Top Left - "Export SVG" (BEHIND) */}
              <motion.div
                custom={0.1}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-20 -left-24 z-0"
                style={{ transform: 'rotate(-5deg)' }}
              >
                <div className="w-[90px]">
                   <motion.div animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 0.5 } }}>
                      <img src="/images/stickers/export_svg.webp" alt="Export SVG" draggable={false} className="w-full h-auto" />
                   </motion.div>
                </div>
              </motion.div>


              {/* === MIDDLE LAYER: PERSON === */}
              
              {/* Main Photo with White Sticker Outline */}
              <div 
                className="relative z-10 mx-auto"
                style={{ 
                  filter: 'drop-shadow(0 0 0 4px white) drop-shadow(0 10px 20px rgba(0,0,0,0.2))'
                }}
              >
                <img 
                  src={cutoutImage} 
                  alt="Masud" 
                  className="w-[220px] h-auto object-contain block" // Slightly larger to dominate
                  draggable={false}
                />
              </div>


              {/* === FRONT LAYER: STICKERS ON PERSON === */}

              {/* Badge 3: Bottom Left - "Detach component" (IN FRONT) */}
              <motion.div
                custom={0.15}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute bottom-32 -left-20 z-20"
                style={{ transform: 'rotate(-2deg)' }}
              >
                 <div className="w-[110px] shadow-lg rounded-lg"> {/* Added shadow for pop */}
                   <motion.div animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}>
                      <img src="/images/stickers/detach_component.webp" alt="Detach component" draggable={false} className="w-full h-auto" />
                   </motion.div>
                 </div>
              </motion.div>

              {/* Smiley Sticker (IN FRONT) */}
              <motion.div
                custom={0.2}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute bottom-28 right-0 z-20"
              >
                <div className="w-[45px] drop-shadow-md">
                  <img src="/images/stickers/smiley.webp" alt="Smiley" draggable={false} className="w-full h-auto" />
                </div>
              </motion.div>

              {/* Handwritten Text */}
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-2 text-center relative z-20"
              >
                <p 
                  className="text-[20px] font-normal text-white leading-snug drop-shadow-md whitespace-nowrap"
                  style={{ 
                    fontFamily: 'Caveat, cursive',
                    transform: 'rotate(-2deg)'
                  }}
                >
                  Code is my bread and butter. 🍞<br/>
                  Each idea deserves a unique solution.
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.button
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => { e.stopPropagation(); openApp('about'); }}
                className="mt-3 px-5 py-2 rounded-full text-xs font-semibold transition-all shadow-sm hover:shadow-md active:scale-95 pointer-events-auto"
                style={{
                  backgroundColor: 'rgba(235, 235, 235, 0.85)',
                  color: '#1a1a1a',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Read about me
              </motion.button>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
