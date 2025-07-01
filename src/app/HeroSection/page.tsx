'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import Link from 'next/link';
import MuiLink from '@mui/material/Link';
import { ComponentSelector, Keyframes, SerializedStyles, CSSObject } from '@emotion/react';
import { ArrayCSSInterpolation } from '@emotion/serialize';

// 1. Keyframes for Animations

const textReveal = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(101%); }
`;

const circleExpandOutlined = keyframes`
  0% {
    width: 0px; height: 0px; opacity: 0; border-radius: 50%;
    background-color: #fff; /* Start as tiny white dot */
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    width: 300px; height: 300px; opacity: 1;
     border-radius: 50%;
    background-color: transparent; /* Directly go to transparent background */
    border:none;
    background-color: #fff;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    width: 400px; height: 400px; opacity: 1; 
    border: none;
    background-color: transparent; /* No fill - for outlined circle */
    border-radius: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const xBarScaleUp = keyframes`
  from {
    transform: translate(-50%, -50%) scaleY(0);
  }
  to {
    transform: translate(-50%, -50%) scaleY(1);
  }
`;

const xBarRotate = (rotation: string | number | boolean | ComponentSelector | Keyframes | SerializedStyles | CSSObject | ArrayCSSInterpolation | null | undefined) => keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(${rotation}deg);
  }
`;

const statueEntrance = keyframes`
  0% { opacity: 0; transform: translate(-50%, -45%) scale(0.8); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(2); } /* End scaled 2x */
`;

const statueFloat = keyframes`
  0% { transform: translate(-50%, -50%) scale(2); }
  50% { transform: translate(-50%, -70%) scale(2); }
  100% { transform: translate(-50%, -50%) scale(2); }
`;

const CircleBackground = styled(Box)`
  position: absolute;
  top: 2;
  left: 0;
  height: 80%;
  width: 45px;  /* Start as a circle with a fixed width */
  background-color: #e0e0e0; /* Light gray color */
  border-radius: 999px; /* Keep it fully rounded */
  z-index: 0; /* Places the circle behind the text */
  
  /* The animation for the width change */
  transition: width 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const ButtonContent = styled(Box)`
  position: relative;
  z-index: 1; /* Ensures content is on top of the circle */
  display: flex;
  align-items: center;
  gap: 1.5rem; /* Space between text and arrow */
  padding: 1rem 1.5rem; /* Inner padding for the text/arrow content */
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
`;


const WorksButtonWrapper = styled(MuiLink)`
  /* Positioning and Layout */
  position: relative;
  display: inline-flex;
  align-items: center;
  /* Remove padding from wrapper, it will be on the content */
  padding: 0; 
  border-radius: 999px;
  
  /* Important for the effect */
  overflow: hidden; 
  
  /* Text Styles */
  color: black;
  text-decoration: none;
  cursor: pointer;

  /* On hover, target the child with className="circle-bg" and expand its width */
  &:hover .circle-bg {
    width: 100%;
  }

  /* ADD THIS BLOCK to slide the text content on hover */
  &:hover ${ButtonContent} {
    transform: translateX(8px); /* Adjust this value for more/less movement */
  }
`;

// This component holds the text and arrow to ensure they appear above the circle.

const ButtonText = styled(Typography)`
  font-weight: 600;
  white-space: nowrap; /* Prevent text from wrapping */
`;

const ArrowIcon = styled('span')`
  font-size: 1.5rem;
  line-height: 1;
`;

const socialLineReveal = keyframes`
  from { width: 0; left: 0; background-color: #000; }
  to { width: 100%; left: 0; background-color: #000; }
`;

const socialLineRetract = keyframes`
  from { width: 100%; left: 0; background-color: #000; }
  to { width: 0; left: 100%; background-color: #000; }
`;


// 2. Styled Components for Layout and Elements

const HeroContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '0 8%',
  position: 'relative',
  backgroundColor: '#f8f8f8',
  overflow: 'hidden',
  paddingTop: '6rem',
}));

const LeftContent = styled(Box)({
  zIndex: 2,
  maxWidth: '550px',
  flexShrink: 0,
});

// FIXED: Simplified RightContent positioning for better centering on the right side
const RightContent = styled(Box)({
  position: 'absolute',
  right: '8%', // Aligns its right edge with the 8% padding of HeroContainer
  top: '50%',
  transform: 'translateY(-50%)', // Vertically centers RightContent
  zIndex: 1,
  width: '450px', // Container size for central elements
  height: '450px', // Container size
  display: 'flex',
  justifyContent: 'center', // Centers children (Circle, X, Statue) horizontally within RightContent
  alignItems: 'center', // Centers children vertically within RightContent
});
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ScrollDownIndicator = styled(Box)`
  position: absolute;
  right: 3%;
  bottom: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;



// MODIFIED: Arrow now points down naturally
const VerticalText = styled(Typography)`
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  text-transform: uppercase;
  color: #333; /* A slightly softer black */
  font-size: 0.8rem; /* Larger for readability */
  font-weight: 600;
  letter-spacing: 4px; /* More space between letters */
  margin-bottom: 20px; /* Space between text and arrow */
`;

// ADJUSTED: Arrow created with a cleaner border technique
const ScrollArrow = styled('span')({
  display: 'block',
  width: '1.5px',
  height: '30px',
  backgroundColor: '#333',
  position: 'relative',

  // The arrowhead is now created from the borders of a single pseudo-element
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    bottom: '0',
    width: '14px', // Controls the size of the arrowhead
    height: '14px',// Controls the size of the arrowhead
    
    // Create two sides of a square with borders
    borderBottom: '1.5px solid #333',
    borderRight: '1.5px solid #333',
    
    // Rotate the entire square by 45 degrees to make the borders form a 'V'
    transform: 'translateX(-50%) rotate(45deg)',
  },
});


const TextWrapper = styled('span')({
  position: 'relative', overflow: 'hidden', display: 'inline-block', verticalAlign: 'top',
});

const TextOverlay = styled(Box)`
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background-color: #000; zIndex: 10;
  animation: ${textReveal} 0.8s ease-out forwards;
`;

const AnimatedTypography = styled(Typography)`
  color: #000000; /* Force text color to black */
  line-height: 1.1; /* Tighter line height for headings */
  white-space: nowrap; /* Prevent line breaks within the animated reveal span */
`;

const CircleElement = styled(Box)`
  position: absolute; border-radius: 50%; background-color: transparent;
  left: 50%; top: 50%; transform: translate(-50%, -50%); /* Centers within RightContent */
  z-index: 0; width: 0; height: 0; opacity: 0;
  animation: ${circleExpandOutlined} 1.5s ease-out forwards 0.2s;
`;

const XBarBase = styled(Box)`
  position: absolute;
  background-color: #000;
  height: 90%;
  width: 8%;
  left: 50%;
  top: 50%;
  transform-origin: center;
  /* Start invisible, scaled to 0 height */
  transform: translate(-50%, -50%) scaleY(0); 
`;

const XBarOneStyled = styled(XBarBase)`
  animation: 
    ${xBarScaleUp} 0.5s ease-out forwards 0.4s,
    ${xBarRotate(45)} 0.7s ease-in-out forwards 0.9s;
`;

const XBarTwoStyled = styled(XBarBase)`
  animation:
    ${xBarScaleUp} 0.5s ease-out forwards 0.4s,
    ${xBarRotate(-45)} 0.7s ease-in-out forwards 0.9s;
`;

const StatueImage = styled('img')`
  position: absolute;
  left: 50%; /* Centered within RightContent */
  top: 50%; /* Centered within RightContent */
  width: 125px; /* Base width before scaling */
  height: auto;
  opacity: 0; /* Starts hidden */
  animation:
    ${statueEntrance} 0.8s ease-out forwards 1.2s, /* Entrance animation */
    ${statueFloat} 3s ease-in-out infinite alternate 2s; /* Float animation */
  z-index: 0;
`;

const NavAnchor = styled(MuiLink)(({ theme }) => ({
  color: '#555', textDecoration: 'none', cursor: 'pointer', position: 'relative', overflow: 'hidden',
  display: 'inline-block', paddingBottom: '2px',
  '&::before': { content: '""', position: 'absolute', left: 0, bottom: 0, height: '1px', backgroundColor: '#000', width: 0, },
  '&:hover': { textDecoration: 'none', color: '#555', '&::before': { animation: `${socialLineReveal} 0.3s forwards`, }, },
  '&:not(:hover)': { '&::before': { animation: `${socialLineRetract} 0.3s forwards`, }, },
}));



// Helper for Text Reveal (Wrap text in this)
const RevealText: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <TextWrapper>
      <AnimatedTypography as="span" variant="inherit">
        {children}
      </AnimatedTypography>
      <TextOverlay style={{ animationDelay: `${delay}ms` }} />
    </TextWrapper>
  );
};


const HeroSection: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => { setAnimate(true); }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HeroContainer sx={{ padding: '0% 15% 0 15%'  }}  >
      <LeftContent>
        {/* Main Heading */}
        <Typography variant="h3" component="h1" fontWeight="bold" sx={{mb: 2, fontSize: { xs: '2.5rem', md: '3.8rem' }}}>
          <RevealText delay={200}>Javascript developer.</RevealText>
        </Typography>

        {/* Intro Text */}
        <Typography variant="body1" component="div" sx={{mb: 4, color: '#555', fontSize: { xs: '0.9rem', md: '1.1rem' }}}>
          <RevealText delay={600}>Hi I'm Mukund Hirpara, a passionate Full Stack Developer </RevealText>
          <br />
          <RevealText delay={700}> & Designer based in the India.</RevealText>
        </Typography>

        {/* See My Works Button */}
          {/* <Box>
          <WorksButtonWrapper href="/" onClick={(e) => e.preventDefault()}>
            <CircleBackground className="circle-bg" />
            <ButtonContent>
              <ButtonText>
                SEE MY WORKS
              </ButtonText>
              <ArrowIcon>
                →
              </ArrowIcon>
            </ButtonContent>
          </WorksButtonWrapper>
          </Box> */}
        

        {/* Social Links */}
        <Box sx={{mt: 8, display: 'flex', gap: 2, color: '#555', fontSize: { xs: '0.8rem', md: '0.9rem' }}}>
          <Link href="https://dribbble.com" >
            <RevealText delay={1000}>Dribble</RevealText>
          </Link>
          <Typography component="span">/</Typography>
          <Link href="https://behance.net" >
            <RevealText delay={1100}>Behance</RevealText>
          </Link>
          <Typography component="span">/</Typography>
          <Link href="https://github.com" >
            <RevealText delay={1200}>GitHub</RevealText>
          </Link>
        </Box>
      </LeftContent>
        <CircleElement sx={{ animationPlayState: animate ? 'running' : 'paused'}} />
      {/* Right Content - Background Animated Elements */}
      <RightContent>
        {/* Large Animated Circle */}
        

        {/* The X Shape (two bars) */}
        <XBarOneStyled sx={{ animationPlayState: animate ? 'running' : 'paused' }} />
        <XBarTwoStyled sx={{ animationPlayState: animate ? 'running' : 'paused' }} /> 
      

        {/* Statue Bust */}
        {/* IMPORTANT: Ensure /statue.png exists in your public folder with this exact name and extension */}
        <StatueImage src="/statue" alt="Statue Bust" sx={{ animationPlayState: animate ? 'running' : 'paused' ,scale: { xs: 0.8, md: 1.8 } }} />
      </RightContent>

      {/* Scroll Down Indicator */}
      <ScrollDownIndicator sx={{ animationPlayState: animate ? 'running' : 'paused' }}>
        <VerticalText variant="caption">Scroll Down</VerticalText>
        <ScrollArrow />
      </ScrollDownIndicator>
    </HeroContainer>
  );
};

export default HeroSection;

