import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Alert,
  AlertIcon,
  Input,
  List,
  ListItem,
} from "@chakra-ui/react";

function Analysis() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [rawResponse, setRawResponse] = useState("");
  const [parsedResponse, setParsedResponse] = useState(null);
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [isCostConfirmed, setIsCostConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const parseRawResponse = (response) => {
    const sections = response
      .split("[")
      .slice(1)
      .map((section) => {
        const splitSection = section.split("]:");
        return {
          title: splitSection[0].trim(),
          content: splitSection[1].trim(),
        };
      });
    return sections;
  };

  async function fetchEstimatedCost() {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("sol_file", file);

      const response = await fetch("http://localhost:3000/analyze-contract", {
        /*localhost if not using DOCKERFILE*/ method: "POST",
        headers: { cost_only: "true" },
        body: formData,
      });
      const data = await response.json();
      setEstimatedCost(data.estimated_costs);
      setIsLoading(false);
    } catch (err) {
      setError("Error fetching estimated cost.");
      setIsLoading(false);
    }
  }

  async function fetchAnalysis() {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("sol_file", file);

      const response = await fetch("http://localhost:3000/analyze-contract", {
        /*localhost if not using DOCKERFILE*/ method: "POST",
        headers: { "user-confirmed": "true" },
        body: formData,
      });
      const data = await response.text(); // Get the raw text response
      setRawResponse(data);
      const parsed = parseRawResponse(data);
      setParsedResponse(parsed);
      setIsLoading(false);
    } catch (err) {
      setError("Error fetching analysis.");
      setIsLoading(false);
    }
  }

  return (
    <VStack align="center" justify="center" height="80vh" spacing={6}>
      <Box
        p={6}
        border="1px"
        borderColor="gray.300"
        rounded="lg"
        shadow="lg"
        bg="gray.50"
        width={["90%", "80%", "60%", "40%"]}
        maxHeight="calc(100vh - 150px)" // Calculate the height based on total viewport height minus the combined estimated heights of your header and footer
        overflowY="auto"
      >
        <Heading mb={4} color="blue.700">
          Analysis Results
        </Heading>

        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {!isCostConfirmed && !estimatedCost && (
          <>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              mb={4}
            />
            <Button colorScheme="teal" onClick={fetchEstimatedCost}>
              Get Estimated Cost
            </Button>
          </>
        )}

        {!isCostConfirmed && estimatedCost ? (
          <>
            <Text mb={4}>
              Estimated cost for analysis: ${estimatedCost.usd.toFixed(2)}
            </Text>
            <Button
              colorScheme="teal"
              onClick={() => {
                setIsCostConfirmed(true);
                fetchAnalysis();
              }}
            >
              Confirm & Proceed
            </Button>
          </>
        ) : (
          <>
            {parsedResponse &&
              parsedResponse.map((section, idx) => (
                <Box key={idx} mt={4}>
                  <Heading size="md" mb={2}>
                    {section.title}
                  </Heading>
                  {section.title === "Function details" ||
                  section.title === "Vulnerabilities" ? (
                    <List spacing={2} pl={4}>
                      {section.content.split(",").map((item, i) => (
                        <ListItem key={i}>{item.trim()}</ListItem>
                      ))}
                    </List>
                  ) : (
                    <Text>{section.content}</Text>
                  )}
                </Box>
              ))}
          </>
        )}
      </Box>
    </VStack>
  );
}

export default Analysis;
