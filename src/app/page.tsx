'use client'
 
import { useCompletion } from 'ai/react';
 
export default function SloganGenerator() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion();
 
  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full flex">
        <textarea
          className="w-full max-w-md border border-gray-300 rounded mb-8 shadow-xl p-2 text-gray-800 placeholder-gray-700::placeholder"
          value={input}
          placeholder="Describe your business..."
          onChange={handleInputChange}
        />
        <button className="bg-white ml-2 mb-8 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">送信</button>
      </form>
      <div className="whitespace-pre-wrap my-6">{completion}</div>
    </div>
  );
}