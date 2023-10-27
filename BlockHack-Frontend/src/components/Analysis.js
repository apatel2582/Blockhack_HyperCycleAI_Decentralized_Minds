import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Code, Container, Flex, Heading, Progress, Spacer } from "@chakra-ui/react";
import "./Analysis.css"

function Analysis({ analysis, file }) {
  const navigate = useNavigate();
  console.log(analysis)

  return (
    <Box margin="20px">
      <Heading textAlign="center" >Analysis</Heading>
      <Flex>
        <Box width="50%">
          <div className="overall-wrapper">
            <Heading size='md'>Overall Rating : {analysis.finalRating + "/100"}</Heading>
            <Progress m='2' hasStripe="true" /*isAnimated="false"*/ colorScheme="green" value={analysis.finalRating} />
            <h4><b>Feedback</b></h4>
            <p>{analysis.overallFeedback}</p>
          </div>
          <div className="section-wrapper">
            {analysis.sections.map((section, i) => (
              <div className="sub-section-wrapper" key={i}>
                <Heading size="md">{section.name}</Heading>
                <Container  margin="0"  textAlign="left">{section.overallRating+"%"}</Container>
                <div>{section.subsections.map((subSection, i) => (
                  <Accordion key={i} allowMultiple>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" width="100%" textAlign='left'>
                            <Flex justifyContent="space-between">
                              <Box>{subSection.name}</Box>
                              <Spacer/>
                              <Box>{subSection.rating+"%"}</Box>
                            </Flex>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        {subSection.feedback}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                ))}</div>
              </div>
            ))}
          </div>
        </Box>
        <Box width="50%">
          <Code>{file}</Code>
        </Box>
      </Flex>
    </Box>
  );
}

export default Analysis;
