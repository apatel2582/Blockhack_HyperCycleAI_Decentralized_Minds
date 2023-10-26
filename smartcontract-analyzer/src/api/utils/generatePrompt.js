const getPrompt = (code) => {
    const contractCode = code.buffer.toString("utf-8");
    const prompt =  `
    Given a smart contract codebase, conduct a detailed evaluation. For each applicable subsection, provide a rating out of 100 based on adherence to best practices, potential vulnerabilities, and the robustness of the code. Compute the section ratings as an average of its relevant subsections. Finally, provide an overall contract rating based on the weighted average of all section ratings.Return the results in the following JSON format:{
   "sections":[
      {
         "name":"SECTION_NAME",
         "subsections":[
            {
               "name":"SUBSECTION_NAME",
               "rating":RATING,
               "feedback":"FEEDBACK_TEXT"
            },
            //... other subsections as applicable
         ],
         "overallRating":AVERAGE_OF_SUBSECTIONS
      },
      //... other sections as applicable
   ],
   "finalRating":AVERAGE_OF_SECTIONS,
   "overallFeedback":"GENERAL_OVERALL_FEEDBACK"
}

1. Security Checks:
    * Reentrancy:
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
    * Integer Overflow and Underflow:
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
    * Unchecked External Calls:
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
    * Denial of Service:
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
    * Gas Limitations:
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
    * Timestamp Manipulation:
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
    * Front Running:
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
Overall Security Rating: [Calculated based on the average of the above relevant subsections]
2. Design Logic Verification:
    * Correctness:
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
    * Race Conditions:
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
    * Token Standards Compliance:
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
    * Upgrade Mechanisms:
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
Overall Design Logic Rating: [Calculated based on the average of the above relevant subsections]3. Access Control Checks:
    * Ownership Privileges:
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
    * Role-Based Access:
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
    * Emergency Mechanisms (e.g., pausing the contract):
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
Overall Access Control Rating: [Calculated based on the average of the above relevant subsections]
4. Data Integrity Checks:
    * Data Privacy (ensuring sensitive data is protected):
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
    * Data Availability (ensuring data remains accessible and unalterable unless intended):
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
Overall Data Integrity Rating: [Calculated based on the average of the above relevant subsections]
5. Efficiency Evaluations:
    * Optimal Gas Consumption (efficiency of operations in terms of gas costs):
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
    * Redundant Code (checking for unnecessary or repetitive code that doesn't serve a purpose):
    * Rating: [Based on code evaluation]
    * Feedback: [Insights on the evaluation]
Overall Efficiency Rating: [Calculated based on the average of the above relevant subsections]

Final Overall Contract Rating:
Compute this as the average of all section ratings, ensuring you account for sections omitted due to irrelevance. Provide this overall contract rating out of 100 along with feedback summarizing the overall evaluation.
    ${contractCode}
    `

    return prompt
}

module.exports = { getPrompt }