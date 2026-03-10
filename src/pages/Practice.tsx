import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import questionBank from '../data/questionBank.json';
import { useLevelStore } from '../store/userLevel';

export default function Practice() {
  const { upgradeLevel, downgradeLevel, addCorrectStreak, addWrongStreak, resetStreak } = useLevelStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const question = questionBank[currentIndex];

  const checkAnswer = () => {
    const correct = userAnswer.includes('2') && userAnswer.includes('3');
    setIsCorrect(correct);
    if (correct) {
      addCorrectStreak();
      if (useLevelStore.getState().correctStreak >= 3) upgradeLevel();
    } else {
      addWrongStreak();
      if (useLevelStore.getState().wrongStreak >= 2) downgradeLevel();
    }
    setShowSolution(true);
  };

  const nextQuestion = () => {
    setCurrentIndex((currentIndex + 1) % questionBank.length);
    setUserAnswer('');
    setShowSolution(false);
    setIsCorrect(null);
    resetStreak();
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-text-secondary">专项练习</span>
            <span className="text-sm text-text-secondary">{currentIndex + 1} / {questionBank.length}</span>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-1 rounded text-xs ${
                question.difficulty <= 2 ? 'bg-green-100 text-green-700' :
                question.difficulty <= 4 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {'⭐'.repeat(question.difficulty)}
              </span>
              <span className="text-sm text-text-secondary">{question.chapter} · {question.topic}</span>
            </div>
            <div className="text-xl font-medium mb-6">{question.content}</div>
            <input
              type="text"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              placeholder="输入你的答案..."
              disabled={showSolution}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
            />
          </div>

          <AnimatePresence mode="wait">
            {!showSolution ? (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={checkAnswer}
                className="w-full bg-primary text-white py-3 rounded-xl font-medium"
              >
                提交答案
              </motion.button>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className={`p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="font-medium mb-2">{isCorrect ? '✅ 回答正确' : '❌ 回答错误'}</div>
                  <div className="text-sm text-text-secondary">正确答案：{question.answer}</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <button onClick={() => setShowSolution(!showSolution)} className="text-sm text-primary font-medium mb-3">
                    查看解析步骤 ▼
                  </button>
                  {showSolution && (
                    <ol className="text-sm text-text-secondary space-y-2 list-decimal list-inside">
                      {question.solution_steps.map((step, i) => <li key={i}>{step}</li>)}
                    </ol>
                  )}
                </div>
                <button onClick={nextQuestion} className="w-full bg-primary text-white py-3 rounded-xl font-medium">下一题</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-72 bg-white border-l border-gray-100 p-6">
        <h3 className="font-medium mb-4">本次练习</h3>
        <div className="space-y-4">
          <div><div className="text-sm text-text-secondary mb-1">已完成</div><div className="text-2xl font-semibold">{currentIndex + 1} / {questionBank.length}</div></div>
          <div><div className="text-sm text-text-secondary mb-1">正确率</div><div className="text-2xl font-semibold">{isCorrect === null ? '-' : isCorrect ? '100%' : '0%'}</div></div>
        </div>
      </div>
    </div>
  );
}