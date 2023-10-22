import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Input, VStack, Button, Flex } from '@chakra-ui/react';


function Main({ onUpload }) {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalysisDone, setIsAnalysisDone] = useState(false); // New state
  
    const handleFile = async (e) => {
    e.preventDefault();
    console.log(e)
    console.log(e.target.files)
      const file = e.target.files[0];
      console.log(file)
      if (!file.name.endsWith('.sol')) {
        alert('Only .sol files are allowed!');
        e.target.value = null;
        return;
      }
      
  
      // Read file content
      const reader = new FileReader();
      reader.onload = async (event) => {
        const fileContent = event.target.result;
        
        try {
        //   const response = await fetch('/api/analyze', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ contract: fileContent })
        //   });
  
        //   const data = await response.json();

        const data = {
            success: "true",
            analysis: "Blockchain technology, often hailed as the backbone of the new age internet, emerged from the cryptographic advances of the late 20th century. It was in 2008 that an individual or group under the pseudonym Satoshi Nakamoto introduced Bitcoin, the first decentralized cryptocurrency. The underlying architecture of Bitcoin was a public ledger that recorded all transactions across a network of computers, ensuring transparency, immutability, and security. This ledger came to be known as a blockchain. Over the past decade, the applications of blockchain have expanded far beyond cryptocurrencies. Many industries, from finance to healthcare, from supply chain management to entertainment, have recognized its potential to revolutionize traditional systems. What sets blockchain apart is its decentralized nature, which ensures that no single entity has control over the entire network. This decentralization offers resistance to censorship and a higher degree of security against malicious attacks. Furthermore, smart contracts, self-executing contracts with the terms of the agreement directly written into code, have paved the way for decentralized applications and organizations. As blockchain continues to evolve, it challenges established norms, pushes the boundaries of trust, and offers a glimpse into a future where intermediaries might become obsolete and transactions, whether monetary or data-driven, can be conducted seamlessly and transparently."
        }
  
          if (data.success) {
            onUpload(data.analysis);
            navigate('/analysis');
          } else {
            console.error("Error analyzing the contract:", data.message);
          }
        } catch (error) {
          console.error("Failed to analyze the contract:", error);
        }
      };
  
      reader.readAsText(file);
    };

  
    return (
      <VStack align="center" justify="center" height="80vh" spacing={6}>
        <Box p={6} border="1px" borderColor="gray.300" rounded="lg" shadow="lg" bg="gray.50" width={["90%", "80%", "60%", "40%"]}>
          <Heading mb={4} color="blue.700">Chat GBC Smart Contract Analysis Tool</Heading>
          <Text mb={4}>Upload your .sol file for analysis:</Text>
          <Flex direction="column" align="center">
            <Button as="label" colorScheme="blue" htmlFor="file-input" mb={2}>
              Choose File
            </Button>
            <Input 
              id="file-input"
              type="file" 
              onChange={handleFile} 
              p={2} 
              borderRadius="md"
              border="1px solid" 
              borderColor="gray.400"
              _focus={{ boxShadow: "0 0 0 2px blue.200" }}
              _hover={{ borderColor: "blue.500" }}
              hidden
            />
            {selectedFile && <Text mt={2}>{selectedFile.name}</Text>}
            {isAnalysisDone && (  // Conditionally render the "Back" button
              <Button mt={4} colorScheme="teal" onClick={() => navigate(-1)}>
                Back
              </Button>
            )}
          </Flex>
        </Box>
      </VStack>
    );
  }
  
  export default Main;