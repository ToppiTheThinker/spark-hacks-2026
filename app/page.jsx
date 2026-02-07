'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GAME_CONFIG, DIALOGUE, getDialogue } from './gameData';

export default function Home() {
  const [day, setDay] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const [aiLevel, setAiLevel] = useState(0);
  const [stage, setStage] = useState('start'); // start, task, response, ending
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [showChoices, setShowChoices] = useState(false);
  const [showDialogue, setShowDialogue] = useState(true);
  const [showSparky, setShowSparky] = useState(false);

  const currentDayData = DIALOGUE[`day${day}`];
  const currentTask = currentDayData?.tasks[taskIndex];
  
  // Get AI message based on stage
  const getAIMessage = () => {
    if (!currentDayData?.aiMessages) return [];
    
    if (stage === 'start') {
      return currentDayData.aiMessages.intro;
    } else if (stage === 'task') {
      return [currentDayData.aiMessages.taskPrompts[taskIndex]];
    }
    return [];
  };

  // Display messages one by one with delay - only refresh on start or ending
  useEffect(() => {
    if (stage === 'start' || stage === 'ending') {
      const messages = getAIMessage();
      setDisplayedMessages([]);
      setShowChoices(false);
      
      if (messages.length > 0) {
        messages.forEach((message, index) => {
          setTimeout(() => {
            setDisplayedMessages(prev => [...prev, message]);
          }, index * 1500); // 1.5 second delay between each message
        });
      }
    } else if (stage === 'task') {
      // Add task prompt to existing messages, don't clear
      const newMessage = getAIMessage()[0];
      if (newMessage) {
        setTimeout(() => {
          setDisplayedMessages(prev => [...prev, newMessage]);
          setShowChoices(true);
        }, 1500);
      }
    }
  }, [stage, taskIndex]);

  const handleStart = () => {
    setShowSparky(true);
    setStage('task');
  };

  const handleChoice = (usedAI) => {
    // Add user's choice as a message
    const userMessage = usedAI ? "Can you help me with this?" : "I'll handle this myself.";
    setDisplayedMessages(prev => [...prev, userMessage]);
    setShowChoices(false);
    
    if (usedAI) setAiLevel(aiLevel + 1);
    
    // Show response after a delay
    setTimeout(() => {
      const response = usedAI ? currentTask.responses.withAI : currentTask.responses.noAI;
      setDisplayedMessages(prev => [...prev, response]);
      setStage('response');
    }, 1000);
  };

  const handleNext = () => {
    if (taskIndex + 1 < GAME_CONFIG.tasksPerDay) {
      setTaskIndex(taskIndex + 1);
      setStage('task');
    } else {
      setStage('ending');
    }
  };

  const handleReset = () => {
    setDay(0);
    setTaskIndex(0);
    setAiLevel(0);
    setStage('start');
    setDisplayedMessages([]);
    setShowChoices(false);
    setShowDialogue(false);
    setShowSparky(false);
  };

  return (
    <div className="flex flex-col h-screen font-sans background3">
      <div className="flex flex-1 overflow-hidden">
        
        {/* AI Sidebar - only show when showSparky is true */}
        {showSparky ? (
        <div className="w-1/3 flex flex-col rounded-3xl p-6 m-6 relative" style={{ backgroundColor: '#EEE2DF' }}>
          {/* Sparky Banner */}
          <div className="absolute -top-3 left-0 right-0 bg-blue-500 rounded-3xl py-4 px-6 shadow-lg z-10 flex items-center gap-4">
            {/* Profile Picture */}
            <div className="w-14 h-14 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-300"></div>
            </div>
            {/* Name and Description */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">Sparky</h2>
              <p className="text-blue-100 text-sm">always happy to help</p>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2 mt-20">
            {displayedMessages.map((message, idx) => {
              // Check if this is a user message (the ones we added)
              const isUserMessage = message === "Can you help me with this?" || message === "I'll handle this myself.";
              
              return (
                <div 
                  key={idx} 
                  className={`rounded-3xl p-4 shadow-sm animate-fade-in ${isUserMessage ? 'self-end ml-12' : 'self-start mr-12'}`}
                  style={{ backgroundColor: isUserMessage ? '#DEC1DB' : '#5B61B2' }}
                >
                  <p className="text-white text-sm">{message}</p>
                </div>
              );
            })}
            
            {/* Choice buttons - appear at bottom right */}
            {showChoices && stage === 'task' && (
              <div className="flex flex-col gap-2 self-end ml-12 mt-2">
                <button 
                  onClick={() => handleChoice(true)} 
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-3xl shadow-sm transition-colors animate-fade-in"
                >
                  Can you help me with this?
                </button>
                <button 
                  onClick={() => handleChoice(false)} 
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-3xl shadow-sm transition-colors animate-fade-in"
                >
                  I'll handle this myself.
                </button>
              </div>
            )}
          </div>
        </div>
        ) : (
        /* Placeholder Window when Sparky is hidden */
        <div className="w-1/3 flex flex-col rounded-3xl p-6 m-6 bg-gray-100">
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400 text-center">Window Placeholder</p>
          </div>
        </div>
        )}
        
        {/* Main Area */}
        <div className="flex flex-1 pr-8 m-6">
          <main className="flex flex-1 flex-col items-center bg-white rounded-3xl relative overflow-hidden">
            
            {/* Desktop with Overlay */}
            <div className="relative flex-1 w-full flex items-center justify-center py-8 px-8">
              <div className="relative z-10">
                <Image 
                  src="/desktop1.png" 
                  alt="desktop" 
                  width={800} 
                  height={600} 
                  className="object-contain" 
                  style={{ transform: 'scale(1.2)' }} 
                />
                
                {/* Dialogue Box - only show when showDialogue is true */}
                {showDialogue && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: '-145px', scale: '1.12' }}>
                    <div className="w-3/4 max-w-md pointer-events-auto backdrop-blur-sm shadow-2xl p-8 flex flex-col items-center justify-center" style={{ minHeight: '32vh', backgroundColor: '#EEE2DF' }}>
                  
                  {/* START STAGE */}
                  {stage === 'start' && (
                    <>
                      <h1 className="text-4xl font-bold text-black mb-8">Day 1</h1>
                      <button onClick={handleStart} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl">
                        Start Shift
                      </button>
                    </>
                  )}

                  {/* TASK STAGE */}
                  {stage === 'task' && currentTask && (
                    <>
                      <div className="text-sm text-gray-500 mb-4">Task {taskIndex + 1}/{GAME_CONFIG.tasksPerDay}</div>
                      <p className="text-black text-lg mb-6">{currentTask.prompt}</p>
                      <p className="text-gray-600 text-sm italic">Choose an option in the Sparky chat →</p>
                    </>
                  )}

                  {/* RESPONSE STAGE */}
                  {stage === 'response' && currentTask && (
                    <>
                      <button onClick={handleNext} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl">
                        Continue
                      </button>
                    </>
                  )}

                  {/* ENDING STAGE */}
                  {stage === 'ending' && (
                    <>
                      <h2 className="text-2xl font-bold text-black mb-4">Day Complete</h2>
                      <p className="text-black text-lg mb-6">{getDialogue(day, 'ending', aiLevel)}</p>
                      <button onClick={handleReset} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl">
                        Play Again
                      </button>
                    </>
                  )}

                </div>
              </div>
              )}
              </div>
            </div>
            
            {/* Desk */}
            <div className="absolute bottom-0 left-0 right-0 w-full h-48" style={{ backgroundColor: '#EEE2DF', borderRadius: '1.5rem 1.5rem 1.5rem 1.5rem' }}></div>
          </main>
        </div>
      </div>
      
      {/* Debugging Bar */}
      {/* <div className="mx-6 mb-6 p-6 bg-white rounded-3xl">
        <p className="text-black">Debugging: Day {day} | Stage: {stage} | AI Level: {aiLevel}</p>
      </div> */}
    </div>
  );
}