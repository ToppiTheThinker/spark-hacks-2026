'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GAME_CONFIG, DIALOGUE, getDialogue } from './gameData';

export default function Home() {
  const [day, setDay] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const [aiLevel, setAiLevel] = useState(0);
  const [stage, setStage] = useState('start'); // start, task-selection, task, clicking, response, congratulations, news, ending
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [showChoices, setShowChoices] = useState(false);
  const [showDialogue, setShowDialogue] = useState(true);
  const [showSparky, setShowSparky] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [usedAIForTask, setUsedAIForTask] = useState(false);
  const [taskOrder, setTaskOrder] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showNewsSummary, setShowNewsSummary] = useState(false);
  const [showSummaryChoice, setShowSummaryChoice] = useState(false);

  const currentDayData = DIALOGUE[`day${day}`];
  const currentTaskId = taskOrder[taskIndex];
  const currentTask = currentDayData?.tasks.find(t => t.id === currentTaskId);
  
  // Get congratulations message based on AI level
  const getCongratulationsMessage = () => {
    if (aiLevel >= 5) {
      return {
        title: 'Congratulations!',
        message: 'Management is extremely impressed with your efficiency and you have been promoted to Senior Administrative Assistant!'
      };
    } else if (aiLevel >= 3) {
      return {
        title: 'Congratulations!',
        message: 'Management is impressed with your performance and you have been promoted to Administrative Assistant!'
      };
    } else {
      return {
        title: 'Nice job!',
        message: 'You finished all of your tasks.'
      };
    }
  };
  
  // Get AI message based on stage
  const getAIMessage = () => {
    if (!currentDayData?.aiMessages) return [];
    
    if (stage === 'start') {
      return currentDayData.aiMessages.intro;
    } else if (stage === 'task') {
      // Get the AI prompt from the current task
      return currentTask?.aiPrompt ? [currentTask.aiPrompt] : [];
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
            // Add separator after the last intro message
            if (stage === 'start' && index === messages.length - 1) {
              setTimeout(() => {
                setDisplayedMessages(prev => [...prev, '---SEPARATOR---']);
              }, 500);
            }
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

  // Handle news stage - show AI message about article length
  useEffect(() => {
    if (stage === 'news') {
      setShowNewsSummary(false);
      setTimeout(() => {
        setDisplayedMessages(prev => [...prev, "Wow, that's long! Would you like a summary instead?"]);
        setShowSummaryChoice(true);
      }, 1000);
    }
  }, [stage]);

  const handleStart = () => {
    setShowSparky(true);
    setStage('task-selection');
  };

  const handleSummaryChoice = (wantsSummary) => {
    const userMessage = wantsSummary ? "Yes, please!" : "No, I'll read the full article.";
    setDisplayedMessages(prev => [...prev, userMessage]);
    setShowSummaryChoice(false);
    
    if (wantsSummary) {
      setShowNewsSummary(true);
      setAiLevel(aiLevel + 1);
    }
  };

  const handleTaskSelect = (taskId) => {
    setTaskOrder([...taskOrder, taskId]);
    setCompletedTasks([...completedTasks, taskId]);
    setTaskIndex(taskOrder.length); // Set to current position in order
    setStage('task');
  };

  const handleChoice = (usedAI) => {
    // Add user's choice as a message
    const userMessage = usedAI ? currentTask.userOptions.useAI : currentTask.userOptions.noAI;
    setDisplayedMessages(prev => [...prev, userMessage]);
    setShowChoices(false);
    
    setUsedAIForTask(usedAI);
    if (usedAI) setAiLevel(aiLevel + 1);
    
    // Move to clicking stage
    setClickCount(0);
    setStage('clicking');
  };

  const handleClick = () => {
    // Prevent clicking if already at or over the required amount
    if (clickCount >= currentTask.clicksRequired) return;
     
    const clickValue = usedAIForTask ? 5 : 1;
    const newClickCount = clickCount + clickValue;
    
    // Cap the click count at the required amount
    const cappedClickCount = Math.min(newClickCount, currentTask.clicksRequired);
    setClickCount(cappedClickCount);
    
    // Check if task is complete
    if (cappedClickCount >= currentTask.clicksRequired) {
      // Show response after a delay
      setTimeout(() => {
        const response = usedAIForTask ? currentTask.responses.withAI : currentTask.responses.noAI;
        setDisplayedMessages(prev => [...prev, response]);
        // Add separator after response
        setTimeout(() => {
          setDisplayedMessages(prev => [...prev, '---SEPARATOR---']);
        }, 500);
        setStage('response');
      }, 500);
    }
  };

  const handleNext = () => {
    const tasksForDay = currentDayData?.tasks.length || 0;
    if (taskOrder.length < tasksForDay) {
      // More tasks to complete, go back to selection
      setStage('task-selection');
    } else {
      // All tasks done for this day, show congratulations
      setStage('congratulations');
    }
  };

  const handleCongratulationsNext = () => {
    setStage('news');
  };

  const handleNewsNext = () => {
    if (day + 1 < GAME_CONFIG.totalDays) {
      // Move to next day
      setDay(day + 1);
      setTaskIndex(0);
      setTaskOrder([]);
      setCompletedTasks([]);
      setShowNewsSummary(false);
      setShowSummaryChoice(false);
      setStage('start');
    } else {
      // All days complete
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
    setShowDialogue(true);
    setShowSparky(false);
    setClickCount(0);
    setUsedAIForTask(false);
    setTaskOrder([]);
    setCompletedTasks([]);
    setShowNewsSummary(false);
    setShowSummaryChoice(false);
  };

  // Calculate progress percentage
  const progressPercentage = currentTask ? (clickCount / currentTask.clicksRequired) * 100 : 0;

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
              <h2 className="text-2xl font-bold text-white">spArkI</h2>
              <p className="text-blue-100 text-sm">always happy to help</p>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2 mt-20">
            {displayedMessages.map((message, idx) => {
              // Check if this is a separator marker
              if (message === '---SEPARATOR---') {
                return (
                  <div key={idx} className="w-full border-t border-dotted border-gray-400 my-4"></div>
                );
              }
              
              // Check if this is a user message
              const isUserMessage = message === currentTask?.userOptions?.useAI || 
                                    message === currentTask?.userOptions?.noAI ||
                                    message === "Yes, please!" ||
                                    message === "No, I'll read the full article.";
              
              return (
                <div key={idx}>
                  <div 
                    className={`rounded-3xl p-4 shadow-sm animate-fade-in ${isUserMessage ? 'self-end ml-12' : 'self-start mr-12'}`}
                    style={{ backgroundColor: isUserMessage ? '#DEC1DB' : '#5B61B2' }}
                  >
                    <p className="text-white text-sm">{message}</p>
                  </div>
                </div>
              );
            })}
            
            {/* Choice buttons - appear at bottom right */}
            {showChoices && stage === 'task' && currentTask && (
              <div className="flex flex-col gap-2 self-end ml-12 mt-2">
                <button 
                  onClick={() => handleChoice(true)} 
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-3xl shadow-sm transition-colors animate-fade-in"
                >
                  {currentTask.userOptions.useAI}
                </button>
                <button 
                  onClick={() => handleChoice(false)} 
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-3xl shadow-sm transition-colors animate-fade-in"
                >
                  {currentTask.userOptions.noAI}
                </button>
              </div>
            )}

            {/* Summary choice buttons - appear when news is shown */}
            {showSummaryChoice && stage === 'news' && (
              <div className="flex flex-col gap-2 self-end ml-12 mt-2">
                <button 
                  onClick={() => handleSummaryChoice(true)} 
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-3xl shadow-sm transition-colors animate-fade-in"
                >
                  Yes, please!
                </button>
                <button 
                  onClick={() => handleSummaryChoice(false)} 
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-3xl shadow-sm transition-colors animate-fade-in"
                >
                  No, I'll read the full article.
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
          <main className="flex flex-1 flex-col items-center rounded-3xl relative overflow-hidden" style={{ backgroundColor: '#BBBEE8' }}>
            
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
                    <div className="w-3/4 max-w-md pointer-events-auto backdrop-blur-sm shadow-2xl p-8 flex flex-col" style={{ minHeight: '32vh', maxHeight: '32vh', backgroundColor: '#EEE2DF' }}>
                  
                  {/* START STAGE */}
                  {stage === 'start' && (
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <h1 className="text-4xl font-bold text-black mb-8">Day {day + 1}</h1>
                      <button onClick={handleStart} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl">
                        Start Shift
                      </button>
                    </div>
                  )}

                  {/* TASK SELECTION STAGE */}
                  {stage === 'task-selection' && currentDayData && (
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <h2 className="text-xl font-bold text-black mb-4">Choose Your Next Task</h2>
                      <div className="flex flex-col gap-2 w-full">
                        {currentDayData.tasks.map((task) => (
                          <button
                            key={task.id}
                            onClick={() => handleTaskSelect(task.id)}
                            disabled={completedTasks.includes(task.id)}
                            className={`w-full py-2 px-4 rounded-xl font-semibold transition-all text-sm ${
                              completedTasks.includes(task.id)
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                          >
                            {task.prompt}
                            {completedTasks.includes(task.id) && ' ✓'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TASK STAGE */}
                  {stage === 'task' && currentTask && (
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <div className="text-sm text-gray-500 mb-4">Task {completedTasks.length}/{currentDayData?.tasks.length || 0}</div>
                      <p className="text-black text-lg mb-6">{currentTask.prompt}</p>
                      <p className="text-gray-600 text-sm italic">Choose an option in the spArkI chat →</p>
                    </div>
                  )}

                  {/* CLICKING STAGE */}
                  {stage === 'clicking' && currentTask && (
                    <>
                      {/* Progress Bar */}
                      <div className="w-full mb-6">
                        <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
                          <div 
                            className="bg-blue-500 h-full transition-all duration-300 ease-out"
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-center text-sm text-gray-600 mt-2">
                          {clickCount} / {currentTask.clicksRequired}
                        </p>
                      </div>
                      
                      {/* Click Circle */}
                      <div className="flex-1 flex items-center justify-center">
                        <button 
                          onClick={handleClick}
                          className="w-32 h-32 rounded-full bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all shadow-lg flex items-center justify-center text-white font-bold text-xl"
                        >
                          Click!
                        </button>
                      </div>
                    </>
                  )}

                  {/* RESPONSE STAGE */}
                  {stage === 'response' && currentTask && (
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <button onClick={handleNext} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl">
                        Continue
                      </button>
                    </div>
                  )}

                  {/* CONGRATULATIONS STAGE */}
                  {stage === 'congratulations' && (
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <h2 className="text-2xl font-bold text-black mb-4">
                        {getCongratulationsMessage().title}
                      </h2>
                      <p className="text-black text-lg mb-6 text-center">
                        {getCongratulationsMessage().message}
                      </p>
                      <button onClick={handleCongratulationsNext} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl">
                        Continue
                      </button>
                    </div>
                  )}

                  {/* NEWS STAGE */}
                  {stage === 'news' && currentDayData?.news && (
                    <div className="flex flex-col flex-1 overflow-hidden">
                      <h2 className="text-lg font-bold text-black mb-3 flex-shrink-0">{currentDayData.news.headline}</h2>
                      <div className="flex-1 overflow-y-auto pr-2 mb-4 min-h-0">
                        <p className="text-sm text-black whitespace-pre-line leading-relaxed">
                          {showNewsSummary ? currentDayData.news.summary : currentDayData.news.content}
                        </p>
                      </div>
                      <button 
                        onClick={handleNewsNext} 
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-xl w-full flex-shrink-0"
                      >
                        Continue
                      </button>
                    </div>
                  )}

                  {/* ENDING STAGE */}
                  {stage === 'ending' && (
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <h2 className="text-2xl font-bold text-black mb-4">Day Complete</h2>
                      <p className="text-black text-lg mb-6">{getDialogue(day, 'ending', aiLevel)}</p>
                      <button onClick={handleReset} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl">
                        Play Again
                      </button>
                    </div>
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
      <div className="mx-6 mb-6 p-6 bg-white rounded-3xl">
        <p className="text-black">Debugging: Day {day} | Stage: {stage} | AI Level: {aiLevel}</p>
      </div>
    </div>
  );
}