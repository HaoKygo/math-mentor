import { Link } from 'react-router-dom';
import { useLevelStore } from '../store/userLevel';

const knowledgeMap = [
  { name: '集合与逻辑', progress: 75 },
  { name: '函数', progress: 45 },
  { name: '三角函数', progress: 60 },
  { name: '数列', progress: 30 },
  { name: '立体几何', progress: 80 },
  { name: '解析几何', progress: 25 },
  { name: '概率统计', progress: 55 },
  { name: '导数', progress: 40 },
];

export default function Dashboard() {
  const { level } = useLevelStore();
  
  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-white border-r border-gray-100 p-6">
        <div className="mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium mb-3">
            {level}
          </div>
          <div className="font-medium">学生用户</div>
          <div className="text-sm text-text-secondary">当前档位：{level}</div>
        </div>
        
        <nav className="space-y-2">
          {[
            { name: '学习主控台', path: '/dashboard', active: true },
            { name: 'AI 对话学习', path: '/chat', active: false },
            { name: '专项练习', path: '/practice', active: false },
            { name: '错题本', path: '/review', active: false },
            { name: '学习报告', path: '/progress', active: false },
          ].map(item => (
            <Link key={item.path} to={item.path} className={`block px-4 py-2 rounded-lg ${item.active ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'}`}>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold">学习主控台</h1>
            <span className="text-sm text-text-secondary">连续学习 3 天 🔥</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-sm text-text-secondary mb-1">今日目标</div>
              <div className="text-2xl font-semibold">2/5 题</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-sm text-text-secondary mb-1">累计学习</div>
              <div className="text-2xl font-semibold">12 天</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-sm text-text-secondary mb-1">平均正确率</div>
              <div className="text-2xl font-semibold">78%</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="font-medium mb-4">知识点掌握度</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {knowledgeMap.map(topic => (
                <div key={topic.name} className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm mb-2">{topic.name}</div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500"
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                  <div className="text-xs text-text-secondary mt-1">{topic.progress}%</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-medium mb-4">最近错题</h2>
            <div className="space-y-3">
              {[
                { title: '二次函数顶点坐标', date: '今天', type: '函数' },
                { title: '正弦定理应用', date: '昨天', type: '三角函数' },
                { title: '等差数列求和', date: '3天前', type: '数列' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-text-secondary">{item.type} · {item.date}</div>
                  </div>
                  <Link to="/review" className="text-primary text-sm">重做 →</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}