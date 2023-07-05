'use'
import { useState } from 'react';
import ResultsComp from './components/ResultsComp'
import InputeName from './components/InputeName';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <section>
      <h1>
        F1 mania!
      </h1>
      <div>
        <ResultsComp />
        <div>
          Next Race
        </div>
        <div>
          Current Standing
        </div>
      </div>
      <div>
        twitter
      </div>
    </section>
  </main>
  );
}
