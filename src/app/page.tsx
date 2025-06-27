'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Landing from './Leanding/page'; // Ensure this path is correct: usually './landing/page' (lowercase) or '../landing/page'

const name = "MUKUND HIRPARA";

// Component that houses the main content (your Landing page)
const NextPageContent = () => (
  <div style={{
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // Background color of this container should ideally be transparent
    // so Landing's background (f8f8f8) shows through directly.
    // However, if you want a brief solid background during the fade-in, #333 is fine.
    // For a seamless transition, match the background of Landing:
    backgroundColor: '#f8f8f8', // Match HeroSection's background for smooth transition
    color: 'white', // This text color won't be visible as Landing has its own text
    fontSize: '2rem', // This font size won't be visible
    zIndex: 3, // Ensure it's above the split panels
  }}>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      style={{
        width: '100%', // Allow Landing to take full width
        height: '100%', // Allow Landing to take full height
      }}
    >
      <Landing/>
    </motion.div>
  </div>
);

export default function Home() {
  const [currentPage, setCurrentPage] = useState('intro'); // State to manage current page view
  const [triggerSplit, setTriggerSplit] = useState(false); // State to trigger the split animation

  useEffect(() => {
    // Calculate when the split screen animation should begin
    // Longest animation duration determines the trigger point for the next phase.
    // Name animation ends: delay (0.2s) + duration (2s) = 2.2 seconds
    // Line animation ends: delay (0.7s) + duration (3s) = 3.7 seconds
    const startSplitAfter = 3.7 + 0.5; // Start split screen 0.5 seconds after line animation finishes

    const timer = setTimeout(() => {
      setTriggerSplit(true); // Trigger the split animation
    }, startSplitAfter * 1000); // Convert to milliseconds

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  // Function to handle the completion of the split animation
  const handleSplitAnimationComplete = () => {
    // After the split panels animate to cover the screen, transition to the next page
    setCurrentPage('next');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black', // The initial background color
        color: 'white',
        fontFamily: 'Inter, sans-serif',
        position: 'relative', // Necessary for positioning the absolute split panels
        overflow: 'hidden', // Ensures the split panels don't visually overflow during animation
      }}
    >
      {/* Render intro content only if current page is 'intro' */}
      {currentPage === 'intro' && (
        <>
          <motion.h1
            initial={{ opacity: 0, scale: 2.3 }}
            animate={{ opacity: [0, 0, 0, 1], scale: [2.3, 1] }}
            transition={{
              duration: 2,
              ease: "easeOut",
              delay: 0.2,
              times: [0, 0.4, 0.7, 1]
            }}
            style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '0.2em', zIndex: 1 }} // Z-index to keep name above initial background
          >
            {name}
          </motion.h1>

          <motion.div
            style={{
              height: '2px',
              background: 'white',
              marginTop: '16px',
              borderRadius: '1px',
              transformOrigin: 'center',
              zIndex: 1, // Z-index to keep line above initial background
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: 1,
              scaleX: 1,
              width: '97vw',
            }}
            transition={{
              duration: 3,
              ease: "linear",
              delay: 0.7,
            }}
          />
        </>
      )}

      {/* Split Screen Panels - render only when triggered and current page is intro */}
      {triggerSplit && currentPage === 'intro' && (
        <>
          {/* Top Split Panel */}
          <motion.div
            initial={{ height: '0%', top: '50%' }} // Start at center, zero height
            animate={{ height: '50%', top: '0%' }} // Expand to cover top half
            transition={{ duration: 1, ease: "easeOut" }} // Duration for the split animation
            onAnimationComplete={handleSplitAnimationComplete} // Trigger next page after one panel completes
            style={{
              position: 'absolute',
              left: 0,
              width: '100%',
              backgroundColor: 'black', // Color of the splitting panels
              zIndex: 2, // Place above name and line
            }}
          />
          {/* Bottom Split Panel */}
          <motion.div
            initial={{ height: '0%', bottom: '50%' }} // Start at center, zero height
            animate={{ height: '50%', bottom: '0%' }} // Expand to cover bottom half
            transition={{ duration: 1, ease: "easeOut" }} // Duration for the split animation
            style={{
              position: 'absolute',
              left: 0,
              width: '100%',
              backgroundColor: 'black', // Color of the splitting panels
              zIndex: 2, // Place above name and line
            }}
          />
        </>
      )}

      {/* Render the next page content when currentPage is 'next' */}
      {currentPage === 'next' && <NextPageContent />}
    </div>
  );
}