// gameData.js - All game content and configuration

// responses indicate what the chatbot will reply with after you complete your task


export const GAME_CONFIG = {
  totalDays: 2,
  tasksPerDay: 3,
};

export const DIALOGUE = {
  day0: {
    start: "Welcome to your first day!",
    
    aiMessages: {
      intro: [
        "Welcome to your first day as an assistant! My name is spArkI and I'm your assigned AI chatbot.😊",
        "I'm here to help you with any tasks you need assistance with. Just let me know if you'd like me to handle anything!"
      ]
    },
    
    tasks: [
      {
        id: 1,
        prompt: "Proofread email",
        clicksRequired: 20,
        aiPrompt: "Where should we start?",
        userOptions: {
          useAI: "Could you proofread this email for me?",
          noAI: "I'll do it myself."
        },
        responses: {
          noAI: "Great job doing it yourself!",
          withAI: "AI helped, but it felt generic."
        }
      }
    ],
    
    news: {
      headline: "BREAKING: AI Growth Explodes!",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, focusing on the key developments in the industry. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    
    ending: {
      noAI: "You built genuine connections!",
      lowAI: "Balanced approach today.",
      highAI: "AI sure is handy!"
    }
  },
  
  day1: {
    start: "Welcome to day 2!",
    
    aiMessages: {
      intro: [
        "Good morning! Ready for another day? I'm here to help with whatever you need!😊"
      ]
    },
    
    tasks: [
      {
        id: 1,
        prompt: "Proofread email",
        clicksRequired: 30,
        aiPrompt: "I see you have an email to send. Need a hand?",
        userOptions: {
          useAI: "Could you proofread this email for me?",
          noAI: "I'll handle it myself."
        },
        responses: {
          noAI: "Great attention to detail!",
          withAI: "AI helped, but it felt generic."
        }
      },
      {
        id: 2,
        prompt: "Create presentation",
        clicksRequired: 30,
        aiPrompt: "I can whip up a presentation in no time!",
        userOptions: {
          useAI: "Could you generate a presentation for me?",
          noAI: "I'll create it myself."
        },
        responses: {
          noAI: "Your unique perspective shines!",
          withAI: "AI slides lack personal touch."
        }
      }
    ],
    
    news: {
      headline: "More News Coming Soon",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit with new developments. Excepteur sint occaecat cupidatat non proident in the latest updates."
    },
    
    ending: {
      noAI: "You built genuine connections!",
      lowAI: "Balanced approach today.",
      highAI: "AI helped, but at what cost?"
    }
  }
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