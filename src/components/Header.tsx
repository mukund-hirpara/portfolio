import React from 'react';
import Link from 'next/link';
import { AppBar, Box, Toolbar, Typography, useTheme } from '@mui/material';
import MuiLink from '@mui/material/Link';
import { styled, keyframes } from '@mui/material/styles';

// Keyframes (remain the same)
const strikeThrough = keyframes`
  from { width: 0; left: 0; }
  to { width: 100%; left: 0; }
`;

const unStrikeThrough = keyframes`
  0% { width: 100%; left: 0; background-color: #000000; }
  50% { width: 100%; left: 0; background-color: #ffffff; }
  100% { width: 0; left: 100%; background-color: #ffffff; }
`;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%', // Ensure it spans full width
  zIndex: 1100,
  padding: '1rem 0', // Consistent vertical padding for the entire AppBar
}));

const NavAnchor = styled(MuiLink)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    textDecoration: 'none',
  },
}));

const MenuItem = styled(Typography)(({ theme }) => ({
  color: '#757575', // Default light grey
  // Adjusted marginLeft for slightly tighter spacing, but still distinct
  marginLeft: '1.5rem', // From 2rem to 1.5rem, adjust as needed
  transition: 'none', // No color transition
  position: 'relative',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    height: '2px',
    top: 'calc(100% + 5px)', // Line below text
    left: '0',
    backgroundColor: '#000000', // Black line
    width: '0',
    transform: 'translateY(-50%)',
  },

  '&:hover': {
    color: '#757575', // Text color remains light grey on hover
    '&::before': {
      animation: `${strikeThrough} 0.3s forwards`,
      backgroundColor: '#000000',
    },
  },

  '&:not(:hover)': {
    color: '#757575', // Text color remains light grey when not hovering
    '&::before': {
      animation: `${unStrikeThrough} 0.5s forwards`,
    },
  },
}));

const Logo = styled('img')({
  height: '50px', // Matches your desired output
  borderRadius: '50%',
  cursor: 'pointer',
});

const Header: React.FC = () => {
  // theme is imported but not used directly in this component's render, which is fine.

  return (
    <>
      <StyledAppBar>
       
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', paddingX: '8%' }}>
          {/* Logo on the left */}
          <Link href="/" passHref>
            <Logo src="/logo.png" alt="Logo" />
          </Link>

          {/* Menu items on the right */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/about" passHref legacyBehavior>
              <NavAnchor>
                <MenuItem variant="body1">About</MenuItem>
              </NavAnchor>
            </Link>
            <Link href="/works" passHref legacyBehavior>
              <NavAnchor>
                <MenuItem variant="body1">Works</MenuItem>
              </NavAnchor>
            </Link>
            <Link href="/contact" passHref legacyBehavior>
              <NavAnchor>
                <MenuItem variant="body1">Contact</MenuItem>
              </NavAnchor>
            </Link>
          </Box>
        </Toolbar>
      </StyledAppBar>
    </>
  );
};

export default Header;