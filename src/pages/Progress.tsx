import { Link } from 'react-router-dom';

export default function Progress() {
  const weeklyData = [
    { day: '周一', time: 45 },
    { day: '周二', time: 60 },
    { day: '周三', time: 30 },
    { day: '周四', time: 75 },
    { day: '周五', time: 50 },
    { day: '周六', time: 90 },
    { day: '周日', time: 40 },
  ];

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
            { name: '错题本', path: '/review', active: false },
            { name: '学习报告', path: '/progress', active: true },
          ].map(item => (
            <Link key={item.path} to={item.path} className={`block px-4 py-2 rounded-lg ${item.active ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'}`}>{item.name}</Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold mb-8">学习报告</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-sm text-text-secondary mb-1">本周学习时长</div>
              <div className="text-3xl font-semibold">6.5h</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-sm text-text-secondary mb-1">完成题目</div>
              <div className="text-3xl font-semibold">32 题</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-sm text-text-secondary mb-1">平均正确率</div>
              <div className="text-3xl font-semibold">78%</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="font-medium mb-4">每日学习时长</h2>
            <div className="flex items-end gap-2 h-40">
              {weeklyData.map(d => (
                <div key={d.day} className="flex-1 flex flex-col items-center">
                  <div className="text-xs text-text-secondary mb-1">{d.time}m</div>
                  <div className="w-full bg-primary/20 rounded-t-lg" style={{ height: `${(d.time / 90) * 100}%` }}></div>
                  <div className="text-xs mt-2">{d.day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
