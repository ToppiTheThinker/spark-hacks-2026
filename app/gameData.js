// gameData.js - All game content and configuration

// responses indicate what the chatbot will reply with after you complete your task


export const GAME_CONFIG = {
  totalDays: 5
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
          noAI: "No worries! Let me know if you need anything!",
          withAI: "On it!"
        }
      }
    ],
     
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
          noAI: "No worries! Let me know if you need anything!",
          withAI: "On it!"
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
      headline: "75% of workers admit to relying on AI for work.",
      content: "CONTENT HERE",
      summary: "summary here"
    },
    
    ending: {
      noAI: "You built genuine connections!",
      lowAI: "Balanced approach today.",
      highAI: "AI sure is handy!"
    }
  },
  
  day2: {
    start: "Welcome to day 3!",
    
    aiMessages: {
      intro: [
        "Good morning! Another day, another opportunity to make your work easier! Let me know what you need help with!😊"
      ]
    },
    
    tasks: [
      {
        id: 1,
        prompt: "Schedule appointments",
        clicksRequired: 35,
        aiPrompt: "I can coordinate all those appointments for you if you'd like!",
        userOptions: {
          useAI: "Could you schedule these appointments for me?",
          noAI: "I'll schedule them myself."
        },
        responses: {
          noAI: "You created a well-organized schedule!",
          withAI: "AI scheduled them, but missed some preferences."
        }
      },
      {
        id: 2,
        prompt: "Call with manager",
        clicksRequired: 40,
        aiPrompt: "I can draft talking points for your manager meeting!",
        userOptions: {
          useAI: "Could you prepare talking points for me?",
          noAI: "I'll prepare on my own."
        },
        responses: {
          noAI: "Your personal insights impressed the manager!",
          withAI: "AI points were helpful but lacked context."
        }
      },
    ],
    
    ending: {
      noAI: "Congratulations! Your dedication and personal touch have earned you a promotion to Administrative Assistant!",
      lowAI: "Great work! Your balanced approach has earned you a promotion to Administrative Assistant!",
      highAI: "You've completed your training! You've been promoted to Administrative Assistant. Remember to bring your own skills to the role!",
      promotion: true
    }
  },

  
  day3: {
    start: "Welcome to day 4!",
    
    aiMessages: {
      intro: [
        "Good morning! New day new assignments, let me know if you need any help!😊"
      ]
    },
    
    tasks: [
      {
        id: 1,
        prompt: "Major meeting with manager ",
        clicksRequired: 55,
        aiPrompt: "I can draft talking points for your manager meeting!",
        userOptions: {
          useAI: "Can you create a list of everything I have done so I can discuss it with my manager?",
          noAI: "I don't need any help right now."
        },
        responses: {
          noAI: "Alright! Let me know if you want any talking points or questions to ask your manager!",
          withAI: "AI remembered past events but struggled to go in depth. They were vague."
        }
      },
    ],
    
    news: {
      headline: "MIT Study suggests that increase use in AI causes long term decrease in cognitive activity",
      content: "CONTENT HERE",
      summary: "summary here"
    },
    
    ending: {
      noAI: "The meeting with the manager went well!",
      lowAI: "Nice way to balance out the day!",
      highAI: "AI is an interesting tool 🙂"
    }
  },

  day4: {
    start: "Welcome to day 5!",
    
    aiMessages: {
      intro: [
        "Good morning! Let me know if there is anything I can assist you with today!😊"
      ]
    },
    
    tasks: [
      {
        id: 1,
        prompt: "Scheduling appointments",
        clicksRequired: 68,
        aiPrompt: "Need some guidance for appointments? leave it to me!",
        userOptions: {
          useAI: "Could you help me schedule some appointments? I'm having a hard time.",
          noAI: "I'll create them myself, shouldn't be too hard."
        },
        responses: {
          noAI: "Let me know if you need help with anything else!",
          withAI: "On it! Here is a schedule of appointments 🚀"
        }
      },
      {
        id: 2,
        prompt: "Create task list",
        clicksRequired: 78,
        aiPrompt: "Need some help creating the task list? I can whip it up right away!",
        userOptions: {
          useAI: "Could you create some task lists for me?",
          noAI: "I'll give it a go myself."
        },
        responses: {
          noAI: "I understand! I'm here to help whenever.😀",
          withAI: "Wonderful! Here is a task list🚀"
        }
      }
    ],
    
    news: {
      headline: "MIT Study suggests that increase use in AI causes long term decrease in cognitive activity",
      content: "CONTENT HERE",
      summary: "summary here"
    },
    
    ending: {
      noAI: "What a bountiful day! get some proper rest",
      lowAI: "Nice way to balance out the day..",
      highAI: "AI sure is handy!"
    }
  },

  day5: {
    start: "Welcome to day 6!",
    
    aiMessages: {
      intro: [
        "Good morning! New day new assignments, let me know if you need any help!😊"
      ]
    },
    
    tasks: [
      {
        id: 1,
        prompt: "Major meeting with manager ",
        clicksRequired: 130,
        aiPrompt: "I can draft talking points for your manager meeting!",
        userOptions: {
          useAI: "Can you create a list of everything I have done so I can discuss it with my manager?",
          noAI: "I don't need any help right now."
        },
        responses: {
          noAI: "Alright! Let me know if you want any talking points or questions to ask your manager!",
          withAI: "AI remembered past events but struggled to go in depth. They were vague."
        }
      },
    ],
    
    ending: {
      noAI: "The meeting with the manager went well!",
      lowAI: "Nice way to balance out the day!",
      highAI: "AI is an interesting tool 🙂"
    }
  },
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