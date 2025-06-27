'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import Link from 'next/link';
import MuiLink from '@mui/material/Link';

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

const xBarInitial = keyframes`
  0% { transform: translate(-50%, -50%) rotate(45deg) scale(0); opacity: 0; }
  100% { transform: translate(-50%, -50%) rotate(45deg) scale(2 ); opacity: 1; width: 10px; height: 10px; }
`;

const xBarFinalRotateScale = keyframes`
  from { width: 10px; height: 10px; opacity: 1; }
  to { width: 300px; height: 10px; opacity: 1; }
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

const circularButtonReveal = keyframes`
  0% { width: 0; height: 0; opacity: 0; background-color: #000; border-radius: 5px; transform: scale(0); }
  40% { width: 120px; height: 40px; opacity: 1; background-color: #000; border-radius: 5px; transform: scale(1); }
  70% { background-color: #fff; border-color: #000; border-radius: 50px; color: transparent; transform: scale(1); }
  100% { width: 120px; height: 40px; padding: 0.8rem 1.2rem; opacity: 1; background-color: #fff; color: #000; border: 1px solid #000; border-radius: 50px; transform: scale(1); }
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

const ScrollDownIndicator = styled(Box)`
  position: absolute;
  right: 2%;
  bottom: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: rotate(90deg);
  transform-origin: bottom right;
  font-size: 0.9rem;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 2px;
  z-index: 2;
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards 1.5s;

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;

const ScrollArrow = styled('span')({
  display: 'block',
  width: '2px',
  height: '20px',
  backgroundColor: '#000',
  marginTop: '10px',
  position: 'relative',
  '&::after': { content: '""', position: 'absolute', width: '8px', height: '2px', backgroundColor: '#000', transform: 'rotate(-45deg)', top: '18px', left: '-3px', },
  '&::before': { content: '""', position: 'absolute', width: '8px', height: '2px', backgroundColor: '#000', transform: 'rotate(45deg)', top: '18px', left: '-3px', },
});

const TextWrapper = styled(Box)({
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
  position: absolute; background-color: #000; height: 10px;
  left: 50%; top: 50%; transform-origin: center center; /* Rotation origin */
`;

const XBarOneStyled = styled(XBarBase)`
  animation: ${xBarInitial} 0.3s ease-out forwards 0.2s,
             ${xBarFinalRotateScale} 0.7s ease-out forwards 0.4s;
  transform: translate(-50%, -50%) rotate(-45deg); /* Final rotation */
`;

const XBarTwoStyled = styled(XBarBase)`
  animation: ${xBarInitial} 0.3s ease-out forwards 0.2s,
             ${xBarFinalRotateScale} 0.7s ease-out forwards 0.5s;
  transform: translate(-50%, -50%) rotate(45deg); /* Final rotation */
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
    ${statueFloat} 2s ease-in-out infinite alternate 2s; /* Apply float after entrance */
  z-index: 0;
`;

const NavAnchor = styled(MuiLink)(({ theme }) => ({
  color: '#555', textDecoration: 'none', cursor: 'pointer', position: 'relative', overflow: 'hidden',
  display: 'inline-block', paddingBottom: '2px',
  '&::before': { content: '""', position: 'absolute', left: 0, bottom: 0, height: '1px', backgroundColor: '#000', width: 0, },
  '&:hover': { textDecoration: 'none', color: '#555', '&::before': { animation: `${socialLineReveal} 0.3s forwards`, }, },
  '&:not(:hover)': { '&::before': { animation: `${socialLineRetract} 0.3s forwards`, }, },
}));

const WorksButton = styled(Button)`
  position: relative; overflow: hidden; margin-top: 2rem;
  padding: 0.8rem 1.2rem; font-size: 0.9rem; font-weight: 500; text-transform: uppercase;
  border: 1px solid #000; border-radius: 50px; color: #000; background-color: #fff;
  width: 0; height: 0; opacity: 0; /* Starts collapsed */
  animation: ${circularButtonReveal} 1.2s ease-out forwards 0.8s;
  cursor: pointer; display: flex; alignItems: center; justifyContent: center;
  min-width: 100px; max-width: 160px;

  &::after { content: '→'; margin-left: 0.5rem; display: inline-block; transition: transform 0.3s ease; }
  &:hover { background-color: #000; color: #fff; '&::after': { transform: translateX(5px); } }
`;


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
    <HeroContainer>
      <LeftContent>
        {/* Main Heading */}
        <Typography variant="h3" component="h1" fontWeight="bold" sx={{mb: 2, fontSize: { xs: '2.5rem', md: '3.8rem' }}}>
          <RevealText delay={200}>Javascript developer.</RevealText>
        </Typography>

        {/* Intro Text */}
        <Typography variant="body1" sx={{mb: 4, color: '#555', fontSize: { xs: '0.9rem', md: '1.1rem' }}}>
          <RevealText delay={600}>Hi I'm Mukund Hirpara, a passionate Full Stack Developer </RevealText>
          <br />
          <RevealText delay={700}> & Designer based in the India.</RevealText>
        </Typography>

        {/* See My Works Button */}
        <Link href="/works" passHref legacyBehavior>
          <WorksButton variant="outlined" sx={{ animationPlayState: animate ? 'running' : 'paused' }}>
            SEE MY WORKS
          </WorksButton>
        </Link>

        {/* Social Links */}
        <Box sx={{mt: 8, display: 'flex', gap: 2, color: '#555', fontSize: { xs: '0.8rem', md: '0.9rem' }}}>
          <Link href="https://dribbble.com" passHref legacyBehavior>
            <NavAnchor><RevealText delay={1000}>Dribble</RevealText></NavAnchor>
          </Link>
          <Typography component="span">/</Typography>
          <Link href="https://behance.net" passHref legacyBehavior>
            <NavAnchor><RevealText delay={1100}>Behance</RevealText></NavAnchor>
          </Link>
          <Typography component="span">/</Typography>
          <Link href="https://github.com" passHref legacyBehavior>
            <NavAnchor><RevealText delay={1200}>GitHub</RevealText></NavAnchor>
          </Link>
        </Box>
      </LeftContent>
        <CircleElement sx={{ animationPlayState: animate ? 'running' : 'paused'}} />
      {/* Right Content - Background Animated Elements */}
      <RightContent>
        {/* Large Animated Circle */}
        

        {/* The X Shape (two bars) */}
        <XBarOneStyled sx={{ animationPlayState: animate ? 'running' : 'paused' }} />
        <XBarTwoStyled sx={{ animationPlayState: animate ? 'running' : 'paused' }} /> {/* FIXED: Uncommented */}

        {/* Statue Bust */}
        {/* IMPORTANT: Ensure /statue.png exists in your public folder with this exact name and extension */}
        <StatueImage src="/statue" alt="Statue Bust" sx={{ animationPlayState: animate ? 'running' : 'paused' ,scale: { xs: 0.8, md: 1.8 } }} />
      </RightContent>

      {/* Scroll Down Indicator */}
      <ScrollDownIndicator sx={{ animationPlayState: animate ? 'running' : 'paused' }}>
        <Typography variant="caption">Scroll Down</Typography>
        <ScrollArrow />
      </ScrollDownIndicator>
    </HeroContainer>
  );
};

export default HeroSection;