import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { AiOutlineTeam } from "react-icons/ai"; // Assuming you're using `react-icons`

function Footer() {
  return (
    <Box
      as="footer"
      bg="teal.700"
      color="white"
      p={4}
      textAlign="center"
      shadow="md"
    >
      <Icon as={AiOutlineTeam} mr={2} />© Decentralized Minds - GBC <br />
        <p>Sufiyan Memon</p>
        <p>Anishkumar Patel</p>
        <p>Umut Yorulmaz </p>
        <p>Kevon Jaggassar</p> 
        <p>Xiaogang Dong</p>
    </Box>
  );
}

export default Footer;
