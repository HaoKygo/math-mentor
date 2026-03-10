import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLevelStore } from '../store/userLevel';

export default function Onboarding() {
  const navigate = useNavigate();
  const { setLevel } = useLevelStore();
  const [step, setStep] = useState(0);
  const [grade, setGrade] = useState<'高一' | '高二' | '高三'>('高一');
  const [goal, setGoal] = useState<'补基础' | '备考' | '竞赛'>('备考');

  const startDiagnosis = () => setStep(1);
  
  const finishDiagnosis = () => {
    const level = step === 1 ? 'L2' : step === 2 ? 'L3' : step === 3 ? 'L4' : 'L1';
    setLevel(level as any);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold mb-6">水平诊断</h1>
        {step === 0 ? (
          <>
            <div className="mb-6">
              <label className="block text-sm text-text-secondary mb-2">年级</label>
              <div className="flex gap-2">
                {(['高一', '高二', '高三'] as const).map(g => (
                  <button key={g} onClick={() => setGrade(g)}
                    className={`px-4 py-2 rounded-lg border ${grade === g ? 'bg-primary text-white' : 'border-gray-200'}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm text-text-secondary mb-2">学习目标</label>
              {(['补基础', '备考', '竞赛'] as const).map(g => (
                <button key={g} onClick={() => setGoal(g)}
                  className={`w-full px-4 py-3 rounded-lg border text-left mb-2 ${goal === g ? 'border-primary' : 'border-gray-200'}`}>
                  {g}
                </button>
              ))}
            </div>
            <button onClick={startDiagnosis} className="w-full bg-primary text-white py-3 rounded-xl">开始诊断</button>
          </>
        ) : (
          <>
            <div className="mb-4 text-sm text-text-secondary">题目 {step} / 3</div>
            <div className="mb-6 p-4 bg-gray-50 rounded-xl text-center font-medium">
              {step === 1 && '若 $x^2 - 5x + 6 = 0$，求 $x$ 的值。'}
              {step === 2 && '已知 $\\sin A = 3/5$，求 $\\sin 2A$。'}
              {step === 3 && '求抛物线 $y = x^2 - 4x + 3$ 的顶点坐标。'}
            </div>
            <input type="text" placeholder="输入答案..." className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4" />
            <button onClick={finishDiagnosis} className="w-full bg-primary text-white py-3 rounded-xl">下一题</button>
          </>
        )}
      </div>
    </div>
  );
}