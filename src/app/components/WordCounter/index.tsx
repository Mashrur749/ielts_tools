"use client";
import { useState, useEffect } from "react";
import Stopwatch from "../StopWatch";

function WordCounterTimer() {
  const [text, setText] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          stopTimer();
          return;
        }

        if (seconds === 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, minutes, seconds]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    // Count words in the text
    const words = newText.trim().split(/\s+/);
    setWordCount(words.length);
  };

  const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = parseInt(event.target.value, 10);
    setMinutes(newMinutes);
  };

  const handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSeconds = parseInt(event.target.value, 10);
    setSeconds(newSeconds);
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  return (
    <div>
      <label
        htmlFor="note"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pl-2 py-2"
      >
        Outline
      </label>
      <textarea
        id="note"
        rows={10}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
      />
      <label
        htmlFor="answer"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pl-2 py-2"
      >
        Answer
      </label>
      <textarea
        id="answer"
        rows={20}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
        onChange={handleTextChange}
      ></textarea>
      <h1 className="bg-orange-200 font-bold pl-2 py-2">
        Word Count: {wordCount}
      </h1>

      <Stopwatch />
    </div>
  );
}

export default WordCounterTimer;
