import React from 'react';
import { Box } from '@chakra-ui/react';

function Navbar() {
    return (
      <Box 
        bg="blue.700" 
        color="white" 
        p={5} 
        textAlign="center" 
        shadow="lg" 
        position="sticky" 
        top="0" 
        zIndex="10"
        fontSize="2xl"  // Increased font size here
      >
        Chat GBC
      </Box>
    );
  }

export default Navbar;

