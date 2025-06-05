import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
dayjs.extend(utc);
dayjs.extend(timezone);
import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class AIService {
  static async getQuestions(req, res) {
    try {
      return {
        json: {
          success: true,
          model: "gpt-4o-mini-2024-07-18",
          timeTaken: 34000,
          usage: {
            prompt_tokens: 498,
            completion_tokens: 1926,
            total_tokens: 2424,
            prompt_tokens_details: {
              cached_tokens: 0,
              audio_tokens: 0,
            },
            completion_tokens_details: {
              reasoning_tokens: 0,
              audio_tokens: 0,
              accepted_prediction_tokens: 0,
              rejected_prediction_tokens: 0,
            },
          },
          questions: [
            {
              question: "What technical skills do you possess?",
              options: [
                "Programming languages (e.g., Python, Java)",
                "Data analysis (e.g., Excel, SQL)",
                "Graphic design (e.g., Adobe Suite)",
                "Project management tools (e.g., Trello, Asana)",
                "None of the above",
              ],
              objective: "To assess the student's current technical skills.",
            },
            {
              question: "Which soft skills do you feel most confident in?",
              options: [
                "Communication",
                "Teamwork",
                "Problem-solving",
                "Time Management",
                "Adaptability",
              ],
              objective: "To identify the student's strong soft skills.",
            },
          ],
        },
      };

      const systemPrompt = `You are a career consultant guiding a student who is unsure about their career path. Create a comprehensive questionnaire that will collect data for all the metrics needed in our career assessment report.

Your questions MUST thoroughly cover ALL of these assessment areas:
1. Skills Analysis - Questions about technical, soft, and transferable skills the student possesses or wants to develop
2. Interests Analysis - Questions to uncover personal and professional interests, passions, and subjects that excite them
3. Personality Traits - Questions to identify work style, communication preferences, and character traits
4. Career Fit - Questions to determine compatibility with different career paths and work environments
5. Industry Trends - Questions about awareness of and interest in current market trends and growing fields
6. Strengths & Weaknesses - Questions for self-assessment of capabilities and areas for improvement
7. Educational Background/Aspirations - Questions about learning style, academic preferences, and future education goals
8. Career Pathways - Questions about specific career interests and understanding of potential paths
9. Work-Life Balance - Questions about lifestyle preferences and priorities regarding work scheduling
10. Growth Potential - Questions about ambition, desired career progression, and long-term goals
11. Resource Needs - Questions about what tools, mentorship, or support would help their career development
12. Competitive Advantage - Questions to identify what unique qualities or skills they bring to employers
13. Skill Development Roadmap - Questions about learning priorities and timeline expectations
14. Action Planning - Questions about immediate next steps they're considering and obstacles they face

Each question must have 5 distinct options that cover a full spectrum of possible preferences. Ensure your questions are varied and not redundant. The questionnaire should have a exactly of 50 questions with an even distribution across all metrics.`;

      let startTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content:
              "Give me list of 50 questions minimum with 5 options for each question.",
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "content_response",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                content: {
                  type: "array",
                  description: `List of 50 questions. It must have 50 items`,
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      question: {
                        type: "string",
                        description: `Question for the student`,
                      },
                      options: {
                        type: "array",
                        description: `List of options for the question (5 options).`,
                        items: {
                          type: "string",
                          description: `Option for the question.`,
                        },
                      },
                      objective: {
                        type: "string",
                        description: `This should represent what the question is trying to understand about the student.`,
                      },
                    },
                    required: ["question", "options", "objective"],
                  },
                },
              },
              required: ["content"],
            },
          },
        },
      });

      let endTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

      let timeTaken = dayjs(endTime).diff(dayjs(startTime), "millisecond");

      let output = aiResponse.choices[0].message.content;
      output = JSON.parse(output);

      return {
        json: {
          success: true,
          model: aiResponse.model,
          timeTaken,
          usage: aiResponse.usage,
          questions: output.content,
        },
      };
    } catch (error) {
      console.error(error);

      return {
        statusCode: 500,
        json: {
          success: false,
          message: "Something went wrong.",
        },
      };
    }
  }

  static async getReport(req, res) {
    try {
      return {
        json: {
          success: true,
          model: "gpt-4o-mini-2024-07-18",
          timeTaken: 24000,
          usage: {
            prompt_tokens: 1122,
            completion_tokens: 1047,
            total_tokens: 2169,
            prompt_tokens_details: {
              cached_tokens: 0,
              audio_tokens: 0,
            },
            completion_tokens_details: {
              reasoning_tokens: 0,
              audio_tokens: 0,
              accepted_prediction_tokens: 0,
              rejected_prediction_tokens: 0,
            },
          },
          report: {
            overview: {
              summary:
                "This report provides a comprehensive analysis of the student's career profile based on their questionnaire responses, focusing on skills, interests, personality traits, potential career pathways, and actionable steps for career advancement.",
              skillsAnalysis: {
                identifiedSkills: [
                  "Programming languages (Python, Java)",
                  "Problem-solving",
                ],
                evaluation:
                  "The student has a strong technical foundation in programming which is complemented by excellent problem-solving skills, positioning them well for various technical roles.",
              },
              interestsAnalysis: {
                primaryInterests: [
                  "Technology",
                  "Problem-solving",
                  "Creative Design",
                ],
                analysis:
                  "The student's interests indicate a preference for roles that involve analytical thinking and creativity, essential in tech and design.",
              },
              personalityTraits: {
                dominantTraits: ["Analytical", "Creative", "Collaborative"],
                workingStyle:
                  "The student prefers working in environments that encourage teamwork while also valuing individual analytical contributions.",
              },
              industryTrends: {
                relevantTrends: [
                  "Increased demand for software developers",
                  "Growth in data analysis roles",
                  "Rising need for problem-solvers in tech industries",
                ],
                marketDemand:
                  "The job market is currently favoring technical skills, especially in programming and data analysis, with a strong demand for problem-solving capabilities.",
              },
            },
            careerFit: [
              {
                career: "Software Developer",
                compatibilityScore: 9,
                justification:
                  "Strong alignment with technical skills in programming and analytical ability.",
                careerPathways: [
                  {
                    pathName: "Frontend Developer",
                    description:
                      "Focuses on building user interfaces and experiences.",
                    fitReasoning:
                      "Leverages creative design interests with technical programming skills.",
                  },
                  {
                    pathName: "Backend Developer",
                    description:
                      "Handles server-side application logic and integration.",
                    fitReasoning:
                      "Utilizes programming skills extensively while solving complex system problems.",
                  },
                ],
              },
              {
                career: "Data Analyst",
                compatibilityScore: 8,
                justification:
                  "Solid fit due to programming and analytical skills.",
                careerPathways: [
                  {
                    pathName: "Data Scientist",
                    description:
                      "Analyzes complex datasets to inform business decisions.",
                    fitReasoning:
                      "Extends problem-solving with technical programming for data initiatives.",
                  },
                  {
                    pathName: "Business Intelligence Analyst",
                    description:
                      "Focuses on data-driven decisions for business strategies.",
                    fitReasoning:
                      "Combines analytical and problem-solving skills.",
                  },
                ],
              },
              {
                career: "Project Manager in Tech",
                compatibilityScore: 7,
                justification:
                  "Adequate fit as project management skills can be developed alongside technical competence.",
                careerPathways: [
                  {
                    pathName: "Agile Coach",
                    description:
                      "Navigates teams through Agile transformation.",
                    fitReasoning:
                      "Integrates problem-solving with teamwork dynamics.",
                  },
                  {
                    pathName: "Technical Project Manager",
                    description: "Oversees technical project developments.",
                    fitReasoning:
                      "Utilizes programming background in managing projects.",
                  },
                ],
              },
            ],
            analysis: {
              strengthsWeaknesses: {
                strengths: [
                  "Strong problem-solving skills",
                  "Proficient in programming",
                  "Ability to collaborate with teams",
                ],
                weaknesses: [
                  "Lack of experience in graphic design",
                  "Limited exposure to project management applications",
                ],
                analysis:
                  "The strengths align well with technology roles, while the weaknesses are areas that can be addressed with targeted training.",
              },
              workLifeBalance: {
                assessment:
                  "The student prefers a balance that allows for both collaborative efforts and independent analytical tasks.",
                recommendations: [
                  "Seek roles that offer flexible hours and remote work opportunities.",
                  "Look for positions that allow creative input alongside technical tasks.",
                ],
              },
              growthPotential: {
                shortTermGrowth:
                  "Immediate opportunity to enhance programming skills and start a junior role in software development or data analysis.",
                longTermGrowth:
                  "Potential to grow into senior developer, data scientist, or project manager roles.",
                opportunities: [
                  "Advanced programming courses",
                  "Certification in data analysis or project management.",
                ],
              },
            },
            education: [
              {
                type: "course",
                name: "Advanced Python Programming",
                reason:
                  "To deepen programming knowledge and enhance job prospects.",
              },
              {
                type: "certification",
                name: "Data Analysis Certifications (e.g., Google Data Analytics)",
                reason: "To formalize data skills and improve employability.",
              },
              {
                type: "degree",
                name: "Bachelor's in Computer Science or related field",
                reason:
                  "To provide formal education in technical skills sought by employers.",
              },
            ],
            skills: {
              skillDevelopmentRoadmap: [
                {
                  stage: "Beginner",
                  skills: ["Basic Python", "Introductory Java"],
                  timeframe: "1-3 months",
                },
                {
                  stage: "Intermediate",
                  skills: ["Data Structures in Python", "SQL Basics"],
                  timeframe: "3-6 months",
                },
                {
                  stage: "Advanced",
                  skills: [
                    "Data Analysis with Python",
                    "Project Management Fundamentals",
                  ],
                  timeframe: "6-12 months",
                },
              ],
              competitiveAdvantages: [
                "Strong analytical and problem-solving capabilities",
                "Proficiency in programming languages",
                "Ability to work collaboratively in a team environment",
              ],
            },
            actionPlan: {
              immediate: [
                "Enroll in an Advanced Python course",
                "Start engaging with coding communities online.",
              ],
              shortTerm: [
                "Obtain a certification in Data Analysis",
                "Participate in team projects to strengthen collaboration skills.",
              ],
              longTerm: [
                "Consider a Bachelor's degree in Computer Science",
                "Pursue internships or co-op positions in relevant fields.",
              ],
            },
            resources: [
              {
                type: "book",
                name: "Clean Code: A Handbook of Agile Software Craftsmanship",
                purpose:
                  "Improves programming practices and software development skills.",
              },
              {
                type: "website",
                name: "Coursera",
                purpose:
                  "Offers courses on programming, data analysis, and project management.",
              },
              {
                type: "community",
                name: "GitHub",
                purpose:
                  "Allows sharing of code and collaboration on software projects.",
              },
            ],
          },
        },
      };

      let answers = req.body.answers;

      const systemPrompt = `You are a professional career consultant analyzing a student's profile based on their questionnaire responses. Using the provided answers, create a comprehensive career report with detailed insights and recommendations.
      
      Your report must include the following sections:
      1. Skills Analysis - Identify and evaluate the student's core skills and competencies
      2. Interests Analysis - Deep dive into their interests and passions
      3. Personality Traits - Profile their working style and personality based on responses
      4. Career Fit Scoring - Score their compatibility with various career paths (scale 1-10)
      5. Industry Trends & Market Demand - Connect their profile to current job market trends
      6. Strengths & Weaknesses Breakdown - Honest assessment of professional strengths/areas for improvement
      7. Educational Recommendations - Suggested courses, certifications, or degrees
      8. Potential Career Pathways - Top 3-5 career options with justification
      9. Work-Life Balance Compatibility - Analysis of their preferences versus career demands
      10. Long-term Growth Potential - Career progression possibilities
      11. Recommended Resources - Books, websites, communities for further exploration
      12. Competitive Advantage Areas - Where they might stand out in the job market
      13. Skill Development Roadmap - Sequential plan for building relevant skills
      14. Action Plan - Concrete next steps (short-term and long-term)
      
      Base your analysis strictly on the questionnaire responses provided. Make your assessment detailed, personalized, and actionable.`;

      let startTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

      const aiResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Please analyze these career assessment answers and generate a comprehensive career report: ${JSON.stringify(
              answers
            )}`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "career_report",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                overview: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    summary: {
                      type: "string",
                      description:
                        "Brief executive summary of the career assessment",
                    },
                    skillsAnalysis: {
                      type: "object",
                      additionalProperties: false,
                      properties: {
                        identifiedSkills: {
                          type: "array",
                          description: "List of identified skills",
                          items: { type: "string" },
                        },
                        evaluation: { type: "string" },
                      },
                      required: ["identifiedSkills", "evaluation"],
                    },
                    interestsAnalysis: {
                      type: "object",
                      additionalProperties: false,
                      properties: {
                        primaryInterests: {
                          type: "array",
                          items: { type: "string" },
                        },
                        analysis: { type: "string" },
                      },
                      required: ["primaryInterests", "analysis"],
                    },
                    personalityTraits: {
                      type: "object",
                      additionalProperties: false,
                      properties: {
                        dominantTraits: {
                          type: "array",
                          items: { type: "string" },
                        },
                        workingStyle: { type: "string" },
                      },
                      required: ["dominantTraits", "workingStyle"],
                    },
                    industryTrends: {
                      type: "object",
                      additionalProperties: false,
                      properties: {
                        relevantTrends: {
                          type: "array",
                          items: { type: "string" },
                        },
                        marketDemand: { type: "string" },
                      },
                      required: ["relevantTrends", "marketDemand"],
                    },
                  },
                  required: [
                    "summary",
                    "skillsAnalysis",
                    "interestsAnalysis",
                    "personalityTraits",
                    "industryTrends",
                  ],
                },
                careerFit: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      career: { type: "string" },
                      compatibilityScore: {
                        type: "number",
                        description: "Compatibility score (1-10)",
                      },
                      justification: { type: "string" },
                      careerPathways: {
                        type: "array",
                        items: {
                          type: "object",
                          additionalProperties: false,
                          properties: {
                            pathName: { type: "string" },
                            description: { type: "string" },
                            fitReasoning: { type: "string" },
                          },
                          required: ["pathName", "description", "fitReasoning"],
                        },
                      },
                    },
                    required: [
                      "career",
                      "compatibilityScore",
                      "justification",
                      "careerPathways",
                    ],
                  },
                },
                analysis: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    strengthsWeaknesses: {
                      type: "object",
                      additionalProperties: false,
                      properties: {
                        strengths: {
                          type: "array",
                          items: { type: "string" },
                        },
                        weaknesses: {
                          type: "array",
                          items: { type: "string" },
                        },
                        analysis: { type: "string" },
                      },
                      required: ["strengths", "weaknesses", "analysis"],
                    },
                    workLifeBalance: {
                      type: "object",
                      additionalProperties: false,
                      properties: {
                        assessment: { type: "string" },
                        recommendations: {
                          type: "array",
                          items: { type: "string" },
                        },
                      },
                      required: ["assessment", "recommendations"],
                    },
                    growthPotential: {
                      type: "object",
                      additionalProperties: false,
                      properties: {
                        shortTermGrowth: { type: "string" },
                        longTermGrowth: { type: "string" },
                        opportunities: {
                          type: "array",
                          items: { type: "string" },
                        },
                      },
                      required: [
                        "shortTermGrowth",
                        "longTermGrowth",
                        "opportunities",
                      ],
                    },
                  },
                  required: [
                    "strengthsWeaknesses",
                    "workLifeBalance",
                    "growthPotential",
                  ],
                },
                education: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      type: {
                        type: "string",
                        description: "Type of recommendation (e.g., course)",
                      },
                      name: {
                        type: "string",
                        description: "Name of the recommended resource",
                      },
                      reason: {
                        type: "string",
                        description: "Reason for the recommendation",
                      },
                    },
                    required: ["type", "name", "reason"],
                  },
                },
                skills: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    skillDevelopmentRoadmap: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                          stage: {
                            type: "string",
                            description: "Development stage (e.g., Beginner)",
                          },
                          skills: {
                            type: "array",
                            items: {
                              type: "string",
                              description: "Skill to develop in detail",
                            },
                          },
                          timeframe: {
                            type: "string",
                            description: "Timeframe for skill development",
                          },
                        },
                        required: ["stage", "skills", "timeframe"],
                      },
                    },
                    competitiveAdvantages: {
                      type: "array",
                      items: {
                        type: "string",
                        description: "Competitive advantage areas",
                      },
                    },
                  },
                  required: [
                    "skillDevelopmentRoadmap",
                    "competitiveAdvantages",
                  ],
                },
                actionPlan: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    immediate: {
                      type: "array",
                      items: { type: "string" },
                    },
                    shortTerm: {
                      type: "array",
                      items: { type: "string" },
                    },
                    longTerm: {
                      type: "array",
                      items: { type: "string" },
                    },
                  },
                  required: ["immediate", "shortTerm", "longTerm"],
                },
                resources: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      type: { type: "string" },
                      name: { type: "string" },
                      purpose: { type: "string" },
                    },
                    required: ["type", "name", "purpose"],
                  },
                },
              },
              required: [
                "overview",
                "careerFit",
                "analysis",
                "education",
                "skills",
                "actionPlan",
                "resources",
              ],
            },
          },
        },
      });

      let endTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      let timeTaken = dayjs(endTime).diff(dayjs(startTime), "millisecond");

      let output = JSON.parse(aiResponse.choices[0].message.content);

      return {
        json: {
          success: true,
          model: aiResponse.model,
          timeTaken,
          usage: aiResponse.usage,
          report: output,
        },
      };
    } catch (error) {
      console.error(error);

      return {
        statusCode: 500,
        json: {
          success: false,
          message: "Failed to generate career report.",
        },
      };
    }
  }
}
