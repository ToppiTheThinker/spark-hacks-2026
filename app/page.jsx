'use client';
import { Bahianita } from "next/font/google";

const bahianita = Bahianita({
  weight: "400",
  subsets: ["latin"],
});

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GAME_CONFIG, DIALOGUE, getDialogue } from './gameData';

export default function Home() {
  const [day, setDay] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const [aiLevel, setAiLevel] = useState(0);
  const [position, setPosition] = useState(0); // Track promotion level: 0 = Assistant, 1 = Admin Assistant, 2 = Senior Admin Assistant
  const [justPromoted, setJustPromoted] = useState(false); // Track if promotion happened this congratulations stage
  const [stage, setStage] = useState('start'); // start, task-selection, task, clicking, response, congratulations, news, ending, supervisor-scene, final-scene, rest
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
  const [userMessages, setUserMessages] = useState([]); // Track which messages are from the user

  const currentDayData = DIALOGUE[`day${day}`];
  const currentTaskId = taskOrder[taskIndex];
  const currentTask = currentDayData?.tasks.find(t => t.id === currentTaskId);
  
  // Get congratulations message based on current position
  const getCongratulationsMessage = () => {
    if (justPromoted && position === 2) {
      return {
        title: 'Congratulations!',
        message: 'Management is extremely impressed with your efficiency and you have been promoted to Senior Administrative Assistant!'
      };
    } else if (justPromoted && position === 1) {
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
  
  // Get final scene message based on AI level
  const getFinalSceneMessage = () => {
    if (aiLevel === 0) {
      return {
        title: 'Congratulations!',
        message: 'Thanks to your hard work you have become one of the company\'s elite employees! Your hard work and passion for the company makes you well respected. If others succeed to follow your path negative outcomes could be prevented'
      };
    } else if (aiLevel < 5) {
      return {
        title: 'Not Bad',
        message: 'Your efforts were acknowledged and you have become a source of guidance in the office, as long as you continue on this path you will continue to develop professionally. '
      };
    } else if (aiLevel < 10) {
      return {
        title: 'Could Be Better',
        message: 'You had an attempt however some decisons hindered your potential success. Some crucial changes could lead to a better outcome.'
      };
    } else {
      return {
        title: 'Game Over',
        message: 'Management had decided that your actions no longer reflect the candidate they chose for this role. Many poor choices have led to these consequences. Do better.'
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
    setUserMessages(prev => [...prev, userMessage]); // Track that this is a user message
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
    setUserMessages(prev => [...prev, userMessage]); // Track that this is a user message
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
      // All tasks done for this day, check for promotions
      let promoted = false;
      if (position === 1 && (aiLevel >= 5 || day >= 6)) {
        setPosition(2);
        promoted = true;
      } else if (position === 0 && (aiLevel >= 3 || day >= 3)) {
        setPosition(1);
        promoted = true;
      }
      setJustPromoted(promoted);
      // Show congratulations
      setStage('congratulations');
    }
  };

  const handleCongratulationsNext = () => {
    // Check if this is the end of day 6 (day index 5)
    if (day === 5) {
      setStage('final-scene');
      return;
    }
    
    // Check if current day has news, if not skip to rest/ending
    if (currentDayData?.news) {
      setStage('news');
    } else {
      // No news for this day, check if we need to show supervisor scene
      if (day === 3) { // Day 4 (index 3)
        setStage('supervisor-scene');
      } else if (day + 1 < GAME_CONFIG.totalDays) {
        setStage('rest');
      } else {
        setStage('ending');
      }
    }
  };

  const handleNewsNext = () => {
    if (day === 5) { // Day 6 (index 5)
      setStage('final-scene');
    } else if (day === 3) { // Day 4 (index 3)
      setStage('supervisor-scene');
    } else if (day + 1 < GAME_CONFIG.totalDays) {
      // Move to rest stage before next day
      setStage('rest');
    } else {
      // All days complete
      setStage('ending');
    }
  };

  const handleSupervisorSceneNext = () => {
    if (day + 1 < GAME_CONFIG.totalDays) {
      setStage('rest');
    } else {
      setStage('ending');
    }
  };

  const handleFinalSceneNext = () => {
    setStage('ending');
  };

  const handleStartNextDay = () => {
    // Move to next day from rest
    setDay(day + 1);
    setTaskIndex(0);
    setTaskOrder([]);
    setCompletedTasks([]);
    setShowNewsSummary(false);
    setShowSummaryChoice(false);
    setShowSparky(false);
    setJustPromoted(false); // Reset promotion flag for new day
    setStage('start');
  };

  const handleReset = () => {
    setDay(0);
    setTaskIndex(0);
    setAiLevel(0);
    setPosition(0);
    setJustPromoted(false);
    setStage('start');
    setDisplayedMessages([]);
    setUserMessages([]); // Reset user messages tracking
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
        
        {/* AI Sidebar - only show when showSparky is true and not in rest stage */}
        {(showSparky && stage !== 'rest') ? (
        <div className="w-1/3 flex flex-col rounded-3xl p-6 m-6 relative" style={{ backgroundColor: '#EEE2DF' }}>
          {/* Sparky Banner */}
          <div className="absolute -top-3 left-0 right-0 bg-blue-500 rounded-3xl py-4 px-6 shadow-lg z-10 flex items-center gap-4">
            {/* Profile Picture */}
            <div className="w-14 h-14 rounded-full bg-white flex-shrink-0 flex items-center justify-center overflow-hidden">
              <Image 
                src="/flame.png" 
                alt="Spark.AI" 
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            {/* Name and Description */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">Spark.AI</h2>
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
              const isUserMessage = userMessages.includes(message);
              
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
        /* Placeholder Window when Sparky is hidden (including during rest) */
        <div className="w-1/3 flex flex-col rounded-3xl p-6 m-6 relative overflow-hidden" style={{ backgroundColor: stage === 'rest' ? '#5B61B2' : '#BBBEE8' }}>
          <div className="flex-1 flex items-center justify-center" style={{ marginTop: '-240px' }}>
            {/* Window - changes color during rest */}
            <div className="w-64 h-80 rounded-2xl border-8 border-white relative" style={{ backgroundColor: stage === 'rest' ? '#001B30' : '#ADDCFF' }}>
              {/* Horizontal divider line across the middle */}
              <div className="absolute left-0 right-0 top-1/2 h-2 bg-white transform -translate-y-1/2"></div>
              {/* Vertical divider line down the middle */}
              <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-white transform -translate-x-1/2"></div>
            </div>
          </div>
          {/* Desk */}
          <div className="absolute bottom-0 left-0 right-0 w-full h-48" style={{ backgroundColor: '#EEE2DF', borderRadius: '1.5rem 1.5rem 1.5rem 1.5rem' }}></div>
        </div>
        )}
        
        {/* Main Area */}
        <div className="flex flex-1 pr-8 m-6">
          <main className="flex flex-1 flex-col items-center rounded-3xl relative overflow-hidden" style={{ backgroundColor: stage === 'rest' ? '#5B61B2' : '#BBBEE8' }}>
            
            {/* Desktop with Overlay */}
            <div className="relative flex-1 w-full flex items-center justify-center py-8 px-8">
              <div className="relative z-10">
                <Image 
                  src="/desktop1.png" 
                  alt="desktop" 
                  width={800} 
                  height={600} 
                  className="object-contain" 
                  style={{ transform: 'scale(1.5)' }} 
                />
                
                {/* Rest Stage Overlay - show "Enjoy your rest!" message */}
                {stage === 'rest' && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ top: '-145px' }}>
                    <div className="flex flex-col items-center justify-center">
                      <h2 className="text-4xl font-bold text-gray-800 mb-8">Enjoy your rest!</h2>
                      <button onClick={handleStartNextDay} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl">
                        Start Day {day + 2}
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Dialogue Box - only show when showDialogue is true and not in rest */}
                {(showDialogue && stage !== 'rest') && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none rounded-l" style={{ top: '-180px', scale: '1.39' }}>
                    <div className="w-3/4 max-w-md pointer-events-auto backdrop-blur-sm p-8 flex flex-col" style={{ minHeight: '32vh', maxHeight: '32vh', backgroundColor: '#EEE2DF' }}>
                  
                  {/* START STAGE */}
                  {stage === 'start' && (
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <h1 className={`${bahianita.className} text-6xl font-bold text-black mb-8`}>Day {day + 1}</h1>
                      <button onClick={handleStart} className={`${bahianita.className} text-l bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl`}>
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
                      <p className="text-gray-600 text-sm italic">Choose an option in the Spark.AI chat!</p>
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
                      <h2 className={`${bahianita.className} text-4xl font-bold text-black mb-3 flex-shrink-0`}>{currentDayData.news.headline}</h2>
                      <div className="flex-1 overflow-y-auto pr-2 mb-4 min-h-0">
                        <p className="text-xs text-black whitespace-pre-line leading-relaxed">
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

                  {/* SUPERVISOR SCENE STAGE */}
                  {stage === 'supervisor-scene' && (
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <h2 className="text-2xl font-bold text-black mb-4">
                        {position === 2 ? 'Oh no!' : 'Great work!'}
                      </h2>
                      <p className="text-black text-lg mb-6 text-center">
                        {position === 2 
                          ? 'Reprimanded by supervisor for submitting data that doesn\'t exist.' 
                          : 'Your manager applauds your work ethic!'}
                      </p>
                      <button onClick={handleSupervisorSceneNext} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl">
                        Continue
                      </button>
                    </div>
                  )}

                  {/* FINAL SCENE STAGE */}
                  {stage === 'final-scene' && (
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <h2 className="text-2xl font-bold text-black mb-4">
                        {getFinalSceneMessage().title}
                      </h2>
                      <p className="text-black text-lg mb-6 text-center">
                        {getFinalSceneMessage().message}
                      </p>
                      <button onClick={handleReset} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl">
                        Play Again
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
      {/* <div className="mx-6 mb-6 p-6 bg-white rounded-3xl">
        <p className="text-black">Debugging: Day {day} | Stage: {stage} | AI Level: {aiLevel}</p>
      </div> */}
    </div>
  );
}