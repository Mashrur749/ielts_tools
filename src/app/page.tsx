import WordCounterTimer from "./components/WordCounter";

export default function Home() {
  return (
    <div className="w-full h-screen bg-gray-200 flex">
      <div className="sm:w-2/5 w-full bg-blue-500 h-full">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Question
        </label>
        <textarea
          id="message"
          rows={20}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        />
      </div>
      <div className="sm:w-4/5 w-full bg-green-500 h-full">
        <WordCounterTimer />
      </div>
    </div>
  );
}
