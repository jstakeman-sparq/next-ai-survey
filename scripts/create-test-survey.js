// Test script to create a survey record for testing
// Run this in the browser console on the survey page to create a test survey

const testSurvey = {
  title: "AI Readiness Assessment Test",
  shortCode: "TEST123",
  createdBy: "test@example.com",
  createdFor: "testclient@example.com", 
  companyName: "Test Company Inc"
};

console.log("Creating test survey with data:", testSurvey);
console.log("Navigate to /survey?code=TEST123 to test the survey flow");