
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import Link from 'next/link';

// 1. Keyframes for Animations
const textReveal = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(101%); }
`;
const circleExpandOutlined = keyframes`
  0% { width: 0px; height: 0px; opacity: 0; border-radius: 50%; background-color: #fff; transform: translate(-50%, -50%) scale(0); }
  50% { width: 300px; height: 300px; opacity: 1; border-radius: 50%; background-color: #fff; transform: translate(-50%, -50%) scale(1); }
  100% { width: 400px; height: 400px; opacity: 1; border-radius: 50%; background-color: #fff; transform: translate(-50%, -50%) scale(1); }
`;
const xBarScaleUp = keyframes`
  from { transform: translate(-50%, -50%) scaleY(0); }
  to { transform: translate(-50%, -50%) scaleY(1); }
`;
const xBarRotate = (rotation: number) => keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(${rotation}deg); }
`;
const statueEntrance = keyframes`
  0% { opacity: 0; transform: translate(-50%, -45%) scale(0.8); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(2); }
`;
const statueFloat = keyframes`
  0% { transform: translate(-50%, -50%) scale(2); }
  50% { transform: translate(-50%, -70%) scale(2); }
  100% { transform: translate(-50%, -50%) scale(2); }
`;
const socialLineReveal = keyframes`
  from { width: 0; left: 0; background-color: #000; }
  to { width: 100%; left: 0; background-color: #000; }
`;
const socialLineRetract = keyframes`
  from { width: 100%; left: 0; background-color: #000; }
  to { width: 0; left: 100%; background-color: #000; }
`;

// 2. Styled Components
const HeroContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '0 15%',
    position: 'relative',
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
    paddingTop: '6rem',
});

const LeftContent = styled(Box)({ zIndex: 2, maxWidth: '550px', flexShrink: 0 });

const RightContent = styled(Box)({
  position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)', zIndex: 1,
  width: '450px', height: '450px', display: 'flex', justifyContent: 'center', alignItems: 'center'
});

const VerticalText = styled(Typography)({
  writingMode: 'vertical-rl', transform: 'rotate(180deg)', textTransform: 'uppercase', color: '#333',
  fontSize: '0.8rem', fontWeight: 600, letterSpacing: '4px', marginBottom: '20px'
});

const ScrollArrow = styled('span')({
  display: 'block', width: '1.5px', height: '30px', backgroundColor: '#333', position: 'relative',
  '&::after': {
    content: '""', position: 'absolute', left: '50%', bottom: '0', width: '14px', height: '14px',
    borderBottom: '1.5px solid #333', borderRight: '1.5px solid #333', transform: 'translateX(-50%) rotate(45deg)'
  }
});

const ScrollDownIndicator = styled(Box)({ position: 'absolute', right: '3%', bottom: '12%', display: 'flex', flexDirection: 'column', alignItems: 'center' });

const TextWrapper = styled('span')({ position: 'relative', overflow: 'hidden', display: 'inline-block', verticalAlign: 'top' });

const TextOverlay = styled(Box)`
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background-color: #000; zIndex: 10;
  animation: ${textReveal} 0.8s ease-out forwards;
`;

const AnimatedTypography = styled(Typography)({ color: '#000000', lineHeight: 1.1, whiteSpace: 'nowrap' });

const CircleElement = styled(Box)`
  position: absolute; border-radius: 50%;
  left: 50%; top: 50%; transform: translate(-50%, -50%);
  z-index: 0; width: 0; height: 0; opacity: 0;
  animation: ${circleExpandOutlined} 1.5s ease-out forwards 0.2s;
`;

const XBarBase = styled(Box)({
  position: 'absolute', backgroundColor: '#000', height: '90%', width: '8%',
  left: '50%', top: '50%', transformOrigin: 'center', transform: 'translate(-50%, -50%) scaleY(0)'
});

const XBarOneStyled = styled(XBarBase)`
  animation: ${xBarScaleUp} 0.5s ease-out forwards 0.4s, ${xBarRotate(45)} 0.7s ease-in-out forwards 0.9s;
`;

const XBarTwoStyled = styled(XBarBase)`
  animation: ${xBarScaleUp} 0.5s ease-out forwards 0.4s, ${xBarRotate(-45)} 0.7s ease-in-out forwards 0.9s;
`;

const StatueImage = styled('img')`
  position: absolute; left: 50%; top: 50%;
  width: 125px; height: auto;
  opacity: 0;
  animation: ${statueEntrance} 0.8s ease-out forwards 1.2s, ${statueFloat} 3s ease-in-out infinite alternate 2s;
  z-index: 0;
`;


const NavAnchor = styled(Box)({
  color: '#555',
  textDecoration: 'none',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  display: 'inline-block',
  paddingBottom: '2px',
  // ADDED: A transition for the transform property to make the slide smooth
  transition: 'transform 0.3s ease-out',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: '1px',
    backgroundColor: '#000',
    width: 0,
    animation: `${socialLineRetract} 0.3s forwards`
  },
  '&:hover': {
    // ADDED: The transform to move the link to the right on hover
    transform: 'translateX(5px)',
    '&::before': {
      animation: `${socialLineReveal} 0.3s forwards`,
    }
  },
});

const CircleBackground = styled(Box)({
  position: 'absolute', top: '10%', left: 0, height: '80%', width: '45px',
  backgroundColor: '#e0e0e0', borderRadius: '999px', zIndex: 0,
  transition: 'width 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)'
});

const ButtonContent = styled(Box)({
  position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center',
  gap: '1.5rem', padding: '1rem 1.5rem',
  border: '0',
  transition: 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)'
  
});

const ButtonText = styled(Typography)({ fontWeight: 600, whiteSpace: 'nowrap' });
const ArrowIcon = styled('span')({ fontSize: '1.5rem', lineHeight: 1 });

// FIXED: Changed to be based on Box and use a class selector for hover effect to resolve compiler error.
const WorksButtonWrapper = styled(Box)({
  position: 'relative', display: 'inline-flex', alignItems: 'center', padding: 0,
  borderRadius: '999px', overflow: 'hidden', color: 'black', textDecoration: 'none',
  cursor: 'pointer', border: '1px solid #ccc',
  // On hover, target the child with className="circle-bg" and expand its width
  '&:hover .circle-bg': {
    width: '100%',
  },
  // On hover, target the child with className="button-content" and slide it
  '&:hover .button-content': {
    transform: 'translateX(8px)',
  },
});

const RevealText: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <TextWrapper>
    <AnimatedTypography as="span" variant="inherit">{children}</AnimatedTypography>
    <TextOverlay style={{ animationDelay: `${delay}ms` }} />
  </TextWrapper>
);

const HeroSection: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => { setAnimate(true); }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HeroContainer>
      <LeftContent>
        <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 2, fontSize: { xs: '2.5rem', md: '3.8rem' } }}>
          <RevealText delay={200}>Javascript developer.</RevealText>
        </Typography>

        {/* FIXED: Added component="div" to prevent <p> from containing a <div> */}
        <Typography variant="body1" component="div" sx={{ mb: 4, color: '#555', fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
          <RevealText delay={600}>Hi I'm Mukund Hirpara, a passionate Full Stack Developer </RevealText>
          <br />
          <RevealText delay={700}> & Designer based in the India.</RevealText>
        </Typography>

        {/* FIXED: Wrapped button in <Link> and removed invalid props from child */}
        <Link href="/works">
          <WorksButtonWrapper>
            <CircleBackground className="circle-bg" />
            {/* FIXED: Added a class name here to be targeted by the hover effect */}
            <ButtonContent className="button-content">
              <ButtonText>SEE MY WORKS</ButtonText>
              <ArrowIcon>→</ArrowIcon>
            </ButtonContent>
          </WorksButtonWrapper>
        </Link>
        
        <Box sx={{ mt: 8, display: 'flex', gap: 2, color: '#555', fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
          {/* FIXED: Corrected social links to use NavAnchor for proper styling and modern <Link> */}
          <Link href="https://dribbble.com">
            <NavAnchor>
                <RevealText delay={1000}>Dribble</RevealText>
            </NavAnchor>
          </Link>
          <Typography component="span">/</Typography>
          <Link href="https://behance.net">
            <NavAnchor>
                <RevealText delay={1100}>Behance</RevealText>
            </NavAnchor>
          </Link>
          <Typography component="span">/</Typography>
          <Link href="https://github.com">
            <NavAnchor>
                <RevealText delay={1200}>GitHub</RevealText>
            </NavAnchor>
          </Link>
        </Box>
      </LeftContent>
      <CircleElement sx={{ animationPlayState: animate ? 'running' : 'paused' }} />
      <RightContent>
        <XBarOneStyled sx={{ animationPlayState: animate ? 'running' : 'paused' }} />
        <XBarTwoStyled sx={{ animationPlayState: animate ? 'running' : 'paused' }} />
        {/* FIXED: Corrected image path */}
        <StatueImage src="https://portfolio-behance-final.vercel.app/images/ceasar-bust.c2bf68cb3b24b5361c95d04c445511a8.png" alt="Statue Bust" sx={{ animationPlayState: animate ? 'running' : 'paused', scale: { xs: 0.8, md: 1.8 } }} />
      </RightContent>
      <ScrollDownIndicator sx={{ animationPlayState: animate ? 'running' : 'paused' }}>
        <VerticalText variant="caption">Scroll Down</VerticalText>
        <ScrollArrow />
      </ScrollDownIndicator>
    </HeroContainer>
  );
};

export default HeroSection;