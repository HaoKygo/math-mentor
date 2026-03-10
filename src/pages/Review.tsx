import { useState } from 'react';
import { Link } from 'react-router-dom';

const mockWrongQuestions = [
  { id: '1', content: '若 $x^2 - 5x + 6 = 0$，求 $x$ 的值。', answer: '2 或 3', chapter: '函数', date: '2026-03-09', times: 2 },
  { id: '2', content: '已知 $\\sin A = 3/5$，求 $\\sin 2A$。', answer: '24/25', chapter: '三角函数', date: '2026-03-08', times: 1 },
  { id: '3', content: '求抛物线 $y = x^2 - 4x + 3$ 的顶点坐标。', answer: '(2, -1)', chapter: '解析几何', date: '2026-03-07', times: 3 },
];

export default function Review() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unmastered'>('all');
  const questions = filter === 'unmastered' ? mockWrongQuestions.filter(q => q.times > 2) : mockWrongQuestions;

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-white border-r border-gray-100 p-6 hidden md:block">
        <div className="mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium mb-3">L2</div>
          <div className="font-medium">学生用户</div>
        </div>
        <nav className="space-y-2">
          {[
            { name: '学习主控台', path: '/dashboard', active: false },
            { name: 'AI 对话学习', path: '/chat', active: false },
            { name: '专项练习', path: '/practice', active: false },
            { name: '错题本', path: '/review', active: true },
            { name: '学习报告', path: '/progress', active: false },
          ].map(item => (
            <Link key={item.path} to={item.path} className={`block px-4 py-2 rounded-lg ${item.active ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'}`}>{item.name}</Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold">错题本</h1>
            <div className="flex gap-2">
              <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100'}`}>全部</button>
              <button onClick={() => setFilter('unmastered')} className={`px-4 py-2 rounded-lg ${filter === 'unmastered' ? 'bg-primary text-white' : 'bg-gray-100'}`}>未掌握</button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              {questions.map(q => (
                <div key={q.id} onClick={() => setSelectedId(q.id)} className={`p-4 bg-white rounded-xl cursor-pointer transition ${selectedId === q.id ? 'ring-2 ring-primary' : 'shadow-sm'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded">{q.chapter}</span>
                    <span className="text-xs text-text-secondary">{q.date}</span>
                  </div>
                  <div className="font-medium mb-1">{q.content}</div>
                  <div className="text-sm text-text-secondary">错误次数: {q.times}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-8">
              {selectedId ? (() => { const q = mockWrongQuestions.find(x => x.id === selectedId); if (!q) return null; return (
                <>
                  <h3 className="font-medium mb-4">题目详情</h3>
                  <div className="p-4 bg-gray-50 rounded-lg mb-4">{q.content}</div>
                  <div className="mb-4"><span className="text-sm text-text-secondary">正确答案：</span><span className="font-medium">{q.answer}</span></div>
                  <div className="mb-6"><button className="w-full bg-primary text-white py-3 rounded-xl font-medium">重新作答</button></div>
                </>
              ); })() : ( <div className="text-center text-text-secondary py-12">选择一道错题查看详情</div> )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
