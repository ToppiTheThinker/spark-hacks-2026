// gameData.js - All game content and configuration

// responses indicate what the chatbot will reply with after you complete your task


export const GAME_CONFIG = {
  totalDays: 6
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
          withAI: "Your email is now polished and ready to send!"
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
          noAI: "All good! Let me know if you need anything!",
          withAI: "Done! That wasn't too hard!"
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
          noAI: "Good luck! Remember I'm here if you need any help!😊",
          withAI: "Your presentation is ready! It looks great!"
        }
      }
    ],
    
    news: {
      headline: "BREAKING NEWS: AI causing Water Scarcity",
      content: "\"Cooling is central to data-center operations. Servers generate significant heat as they process data, and most facilities rely on water — directly for cooling or indirectly through electricity use — to maintain safe operating temperatures. The International Energy Agency (IEA) estimates that global data-center water use is roughly 560 billion liters per year, potentially rising to 1.2 trillion liters by 2030, equivalent to the annual consumption of more than four million U.S. households. This scale of demand has made water availability a critical operational — and, increasingly, reputational — issue. Hotter and drier conditions could limit supply in key regions, while communities and regulators are placing greater scrutiny on industrial water use.5 For data-center operators, managing consumption is not only an environmental priority but also a business necessity\"",
      summary: "The International Energy Agency (IEA) estimates that global data-center water use is roughly 560 billion liters per year, potentially rising to 1.2 trillion liters by 2030, equivalent to the annual consumption of more than four million U.S. households. This scale of demand has made water availability a critical operational — and, increasingly, reputational — issue."
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
          noAI: "No worrie!s! Let me know if you need any help with them!😊",
          withAI: "Appointments are scheduled! That was a breeze!"
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
          noAI: "Sure. Let me know if there's anything I can do to help!🚀",
          withAI: "You can count on me!😊 I'll get this done in a jiffy!"
        }
      },
    ],
    
    ending: {
      noAI: "You built genuine connections!",
      lowAI: "Balanced approach today.",
      highAI: "AI sure is handy!"
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
          withAI: "Here are some points from our previous conversations that you should bring up to your manager!"
        }
      },
    ],
    
    news:{
      headline: "MIT Study shows AI causes decrease in cognitive activity.",
      content: "\"The study by MIT’s Media Lab tested the cognitive functions of different groups of students divided up according to how much they used AI tools like ChatGPT to accomplish key tasks — such as writing essays — over a period of several months. The study looked to find out how people’s brains responded to using AI tools over time. And according to the study, the answer to that question is: not great. Participants who exclusively used the AI to help write essays showed weaker brain connectivity, lower memory retention and a fading sense of ownership over their work. Basically, their brains got lazy. And even when they stopped using AI tools later on, the effects lingered.\"",
      summary: "The study by MIT’s Media Lab tested cognitive functions of different groups of students divided up according to how much they used AI tools like ChatGPT. Participants in the study who exclusively used AI to help write essays showed weaker brain connectivity, lower memory retention and a fading sense of ownership over their work."
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
      headline: "Telling ChatGPT ‘Please’ and ‘Thank You’ Costs OpenAI Millions, CEO Claims",
      content: "\"Being polite to artificial intelligence can be quite expensive. OpenAI CEO Sam Altman said on social media last week that saying \"please\" and \"thank you\" to ChatGPT has cost the company quite a bit of money. Altman responded to a user on X, the platform formerly known as Twitter, who was curious how much money OpenAI has lost in electricity costs from people showing good manners to their AI models. \"Tens of millions of dollars well spent--you never know,\" was the CEO's response.” Generative AI is widely seen as a heavy consumer of energy, particularly when it comes to training models.\"",
      summary: "OpenAI CEO Sam Altman reveals that expressing gratitude to or showing consideration for ChatGPT has cost the company “tens of millions of dollars”. Because ChatGPT is a large language model (LLM), even the smallest prompts consume energy."
    },
    
    ending: {
      noAI: "What a bountiful day! get some proper rest",
      lowAI: "Nice way to balance out the day.",
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
          withAI: "From our previous conversations, hope these talking points get you a promotion!"
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