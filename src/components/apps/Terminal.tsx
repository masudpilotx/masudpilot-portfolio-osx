import React, { useState, useEffect, useRef } from 'react';

const SAVAGE_FORTUNES = [
  "You type like you're wearing oven mitts.",
  "I've seen better code in a bowl of alphabet soup.",
  "Are you sure you know what you're doing? Because it doesn't look like it.",
  "Error: User competence not found.",
  "Nice try, but even my grandmother types faster than that.",
  "Your keyboard called, it wants a divorce.",
  "Is that your final answer? Yikes.",
  "I'd explain it to you, but I don't have enough crayons.",
  "404: Brain not found.",
  "You're not the clown, you're the entire circus.",
  "Have you tried turning your brain off and on again?",
  "I bet you think 'Java' is just a type of coffee.",
  "Your logic is as sound as a screen door on a submarine.",
  "Keep typing, maybe eventually you'll make sense.",
  "I'm not saying you're slow, but sticky keys are faster.",
  "Did you learn to type from a cat walking on a keyboard?",
  "Calculating... Nope, still a bad idea.",
  "If stupidity was a currency, you'd be a billionaire.",
  "I’m judging you. Silently.",
  "Your browser history must be... interesting.",
  "Even Internet Explorer is faster than your thought process.",
  "I’d roast you, but my mom said I’m not allowed to burn trash.",
  "You bring everyone so much joy... when you leave the room.",
  "You're the reason they put instructions on shampoo bottles.",
  "Somewhere out there is a tree tirelessly producing oxygen for you. You owe it an apology.",
  "I refuse to have a battle of wits with an unarmed person.",
  "You have something on your chin... no, the 3rd one down.",
  "I'm not insulting you, I'm describing you.",
  "You're like a cloud. When you disappear, it's a beautiful day.",
  "I'd agree with you but then we'd both be wrong.",
  "Don't be ashamed of who you are. That's your parents' job.",
  "You must have been born on a highway because that's where most accidents happen.",
  "If laughter is the best medicine, your face must be curing the world.",
  "You're proof that evolution can go in reverse.",
  "I thought of you today. It reminded me to take out the trash.",
  "You're about as useful as a screen door on a submarine.",
  "Gosh, you have a face only a mother could love.",
  "You're so fake, Barbie is jealous.",
  "I'd smack you, but that would be animal abuse.",
  "You look like something I'd draw with my left hand.",
  "Your secrets are safe with me... I wasn't listening anyway.",
  "I'm busy right now, can I ignore you some other time?",
  "Every time you speak, I hear a toilet flushing.",
  "If I wanted to hear from an idiot, I'd talk to myself.",
  "You're the reason we can't have nice things.",
  "I'm multitasking: I can listen, ignore, and forget at the same time.",
  "Your birth certificate is an apology letter from the condom factory.",
  "You're like a software update. Whenever I see you, I think 'Not now'.",
  "I envy people who haven't met you.",
  "Go ahead, tell me everything you know. It'll only take 10 seconds."
];

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>(["Welcome to SavageTerm v1.0.0", "Type anything for a 'helpful' response...", ""]);
  const [currentLine, setCurrentLine] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = currentLine.trim();
      const newHistory = [...history];
      
      // Add user input
      newHistory.push(`user@macbook-pro:~$ ${currentLine}`);
      
      if (input.toLowerCase() === 'clear') {
        setHistory(["Welcome to SavageTerm v1.0.0"]);
      } else if (input) {
         // Get savage response
         const randomFortune = SAVAGE_FORTUNES[Math.floor(Math.random() * SAVAGE_FORTUNES.length)];
         newHistory.push(randomFortune);
      }
      
      newHistory.push(""); // Spacing
      setHistory(newHistory);
      setCurrentLine("");
    }
  };

  // Keep focus on input
  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
        className="h-full w-full bg-[#1e1e1e]/95 backdrop-blur-md text-[#33ff00] font-mono p-4 overflow-hidden flex flex-col items-stretch text-[13px] leading-5 shadow-inner"
        onClick={handleClick}
        style={{ fontFamily: "'Fira Code', 'Roboto Mono', monospace" }}
    >
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">{line}</div>
        ))}
        
        <div className="flex items-center">
            <span className="mr-2 text-blue-400">user@macbook-pro:~$</span>
            <input 
                ref={inputRef}
                type="text" 
                value={currentLine}
                onChange={(e) => setCurrentLine(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-[#33ff00] caret-[#33ff00]"
                autoFocus
                autoComplete="off"
            />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
