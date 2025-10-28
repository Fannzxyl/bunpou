import React, { useState, useEffect, useMemo } from 'react';
import { grammarData } from '../data/grammar';

interface FillInTheBlankQuizProps {
  onBack: () => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const FillInTheBlankQuiz: React.FC<FillInTheBlankQuizProps> = ({ onBack }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const QUIZ_LENGTH = 10;

  const generateQuestions = useMemo(() => {
    return () => {
      const particlePoints = grammarData.filter(p => p.part.includes('BAGIAN 1') && p.reading && p.hiragana);
      const allParticleReadings = particlePoints.map(p => p.reading!);
      
      let potentialQuestions: any[] = [];
      particlePoints.forEach(point => {
        point.examples.forEach(example => {
          const particleHiragana = point.hiragana!;
          const particleReading = point.reading!;
          // Try to replace particle surrounded by spaces, or at the end of a word (like 5-jiに)
          // This is a simplified approach and might not catch all edge cases.
          const questionText = example.japanese.replace(` ${particleHiragana} `, ' [___] ').replace(`${particleHiragana} `, '[___] ');

          if (questionText !== example.japanese) { // If a replacement was made
            const wrongOptions = shuffleArray(allParticleReadings.filter(p => p !== particleReading)).slice(0, 3);
            const options = shuffleArray([...wrongOptions, particleReading]);
            
            potentialQuestions.push({
              question: questionText,
              translation: example.translation,
              options,
              answer: particleReading
            });
          }
        });
      });
      
      return shuffleArray(potentialQuestions).slice(0, QUIZ_LENGTH);
    }
  }, []);

  useEffect(() => {
    setQuestions(generateQuestions());
  }, [generateQuestions]);

  const handleAnswer = (option: string) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(option);
    const correct = option === questions[currentQuestionIndex].answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(i => i + 1);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setQuestions(generateQuestions());
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setIsFinished(false);
  };

  if (questions.length === 0) {
    return <div className="text-center p-8">Membuat kuis... Jika tidak muncul, mungkin tidak ada contoh kalimat yang cocok.</div>;
  }

  if (isFinished) {
    return (
      <div className="text-center p-8 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
        <h2 className="text-3xl font-bold text-white mb-4">Kuis Selesai!</h2>
        <p className="text-xl text-cyan-400 mb-6">Skor Akhir Kamu: {score} / {questions.length}</p>
        <div className="flex justify-center gap-4">
            <button onClick={restartQuiz} className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-6 rounded-lg">
            Ulangi Kuis
            </button>
            <button onClick={onBack} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg">
            Kembali
            </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const getButtonClass = (option: string) => {
    if (selectedAnswer === null) {
      return "bg-slate-700 hover:bg-slate-600";
    }
    if (option === currentQuestion.answer) {
      return "bg-green-600";
    }
    if (option === selectedAnswer && !isCorrect) {
      return "bg-red-600";
    }
    return "bg-slate-700 opacity-50";
  };

  return (
    <div className="p-4 md:p-8 bg-slate-800 rounded-lg shadow-lg border border-slate-700 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-teal-300">Lengkapi Kalimat</h2>
        <p className="text-lg font-semibold text-white">{currentQuestionIndex + 1} / {questions.length}</p>
      </div>
      <div className="mb-8 text-center">
        <p className="text-slate-400 mb-2">Pilih partikel yang tepat:</p>
        <p className="text-2xl md:text-3xl font-bold text-white font-serif">{currentQuestion.question}</p>
        <p className="text-slate-400 italic mt-2">"{currentQuestion.translation}"</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            className={`w-full p-4 rounded-lg text-white font-semibold transition-all duration-300 text-lg md:text-xl ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
       <div className="mt-8 text-center">
          <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors">
            Keluar dari Kuis
          </button>
        </div>
    </div>
  );
};

export default FillInTheBlankQuiz;
