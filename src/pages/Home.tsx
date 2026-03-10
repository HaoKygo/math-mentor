import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <section className="h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-5xl font-bold text-text mb-4">MathMentor</h1>
        <p className="text-xl text-text-secondary mb-8">高中数学智能交互学习平台</p>
        <Link to="/onboarding" className="bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 transition">
          开始学习
        </Link>
      </section>
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">自适应学习</h3>
            <p className="text-text-secondary">AI 实时感知你的水平，动态调节难度</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">AI 导师</h3>
            <p className="text-text-secondary">苏格拉底式引导，不给答案只给思路</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">即时反馈</h3>
            <p className="text-text-secondary">每步操作都有反馈，降低等待焦虑</p>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8">适合各类学生</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center"><div className="text-lg font-medium">L1 基础重建</div><div className="text-sm text-text-secondary mt-1">基础薄弱</div></div>
            <div className="p-4 border rounded-lg text-center"><div className="text-lg font-medium">L2 稳步提升</div><div className="text-sm text-text-secondary mt-1">中等水平</div></div>
            <div className="p-4 border rounded-lg text-center"><div className="text-lg font-medium">L3 融会贯通</div><div className="text-sm text-text-secondary mt-1">优秀生</div></div>
            <div className="p-4 border rounded-lg text-center"><div className="text-lg font-medium">L4 竞赛冲刺</div><div className="text-sm text-text-secondary mt-1">竞赛生</div></div>
          </div>
        </div>
      </section>
    </div>
  );
}