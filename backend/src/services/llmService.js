// We are running the backend in mock mode as requested.
// const { GoogleGenAI } = require('@google/genai');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Analyzes an array of raw feedback items, categorizes, groups them, and determines if human review is needed.
 * @param {Array<string>} feedbackItems 
 * @returns {Promise<Object>}
 */
async function analyzeFeedbackWithLLM(feedbackItems) {
    console.log("Using strictly mocked backend analysis...");
    
    // Simulate LLM processing time (2 seconds)
    await delay(2000);
    
    return getMockAnalysisResponse(feedbackItems.length);
}

/**
 * Generates a structured PRD based on grouped feedback.
 * @param {Array<Object>} groupedFeedback 
 * @returns {Promise<string>}
 */
async function generatePRDWithLLM(groupedFeedback) {
    console.log("Using strictly mocked backend PRD generation...");
    
    // Simulate LLM processing time (2 seconds)
    await delay(2000);
    
    return getMockPRDResponse();
}

// --- Mock Responses ---

function getMockAnalysisResponse(totalCount) {
    return {
        summary: {
            totalItems: totalCount || 25,
            bugs: 5,
            featureRequests: 12,
            complaints: 5,
            praise: 3
        },
        groupedFeedback: [
            {
                id: "g1",
                category: "Feature Request",
                topic: "Dark Mode UI",
                description: "Users are requesting a dark mode theme for better nighttime visibility.",
                priority: "High",
                count: 12
            },
            {
                id: "g2",
                category: "Bug",
                topic: "Login Button Unresponsive",
                description: "The login button sometimes requires double clicks to work.",
                priority: "High",
                count: 5
            },
            {
                id: "g3",
                category: "Complaint",
                topic: "Slow Dashboard Loading",
                description: "The main dashboard takes too long to load data.",
                priority: "Medium",
                count: 5
            },
            {
                id: "g4",
                category: "Praise",
                topic: "New Search Feature",
                description: "Users really love how fast the new search functionality works.",
                priority: "Low",
                count: 3
            }
        ],
        humanReviewRequired: [
            {
                originalText: "It just doesn't feel right sometimes when I use it.",
                reason: "Extremely vague description, unable to identify specific issue or category."
            }
        ]
    };
}

function getMockPRDResponse() {
    return `# Product Requirements Document

## 1. Executive Summary
Based on recent customer feedback, this PRD outlines critical updates required for the platform. The primary focus is on resolving high-priority login issues, improving overall performance, and introducing highly requested features such as Dark Mode.

## 2. Key Objectives
* Resolve user login friction.
* Increase user satisfaction by implementing Dark Mode.
* Decrease dashboard load times by at least 30%.

## 3. Features & Enhancements
* **Dark Mode UI**: Implement a system-wide dark theme toggle.

## 4. Bug Fixes
* **Login Button**: Fix the event listener bug causing the login button to require multiple clicks.

## 5. User Pain Points
* **Dashboard Performance**: Users find the dashboard too slow, directly impacting their workflow.

## 6. Success Metrics
* 0% bug reports related to login after deployment.
* 40% adoption rate of Dark Mode within the first week.
* Average dashboard load time under 2 seconds.`;
}

module.exports = {
    analyzeFeedbackWithLLM,
    generatePRDWithLLM
};
