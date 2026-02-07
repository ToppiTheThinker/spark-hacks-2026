// gameData.js - All game content and configuration

// responses indicate what the chatbot will reply with after you complete your task


export const GAME_CONFIG = {
  totalDays: 1,
  tasksPerDay: 3,
};

export const DIALOGUE = {
  day0: {
    start: "Welcome to your first day!",
    
    aiMessages: {
      intro: [
        "Welcome to your first day as an assistant! My name is Sparky and I'm your assigned AI chatbot.😊",
        "I'm here to help you with any tasks you need assistance with. Just let me know if you'd like me to handle anything!"
      ],
      taskPrompts: [
        "I can help you write that marketing email if you'd like!",
        "Want me to generate a presentation for you? It'll be quick!",
        "I can draft a response to that customer feedback for you!"
      ]
    },
    
    tasks: [
      {
        id: 1,
        prompt: "Write a marketing email",
        responses: {
          noAI: "Great job doing it yourself!",
          withAI: "AI helped, but it felt generic."
        }
      },
      {
        id: 2,
        prompt: "Create a presentation",
        responses: {
          noAI: "Your unique perspective shines!",
          withAI: "AI slides lack personal touch."
        }
      },
      {
        id: 3,
        prompt: "Respond to customer feedback",
        responses: {
          noAI: "Empathetic and genuine!",
          withAI: "Efficient but impersonal."
        }
      }
    ],
    
    ending: {
      noAI: "You built genuine connections!",
      lowAI: "Balanced approach today.",
      highAI: "AI helped, but at what cost?"
    }
  },
  
  // Add more days here:
  // day1: { ... },
  // day2: { ... },
};

// Helper function to get dialogue based on day and AI level
export function getDialogue(day, section, aiLevel = 0) {
  const dayKey = `day${day}`;
  const dayData = DIALOGUE[dayKey];
  
  if (!dayData) return null;
  
  if (section === 'ending') {
    if (aiLevel === 0) return dayData.ending.noAI;
    if (aiLevel <= 1) return dayData.ending.lowAI;
    return dayData.ending.highAI;
  }
  
  return dayData[section];
}