import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Send, Camera, Mic } from 'lucide-react';
import ChatBubble from '../components/ChatBubble';
import { useClaudeStream } from '../hooks/useClaudeStream';
import { useChatHistoryStore } from '../store/chatHistory';
import { useLevelStore } from '../store/userLevel';
import { detectEmotion, getEmotionResponse } from '../utils/emotionDetector';

export default function Chat() {
  const { messages, addMessage } = useChatHistoryStore();
  const { level } = useLevelStore();
  const [input, setInput] = useState('');
  const [tempMessage, setTempMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { stream } = useClaudeStream();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, tempMessage]);

  const handleSend = async () => {
    if (!input.trim()) return;
    addMessage('user', input);
    setInput('');
    const emotion = detectEmotion(input);
    const response = getEmotionResponse(emotion);
    
    stream([...messages, { role: 'user', content: input }], {
      onUpdate: (text: string) => setTempMessage(prev => prev + text),
      onComplete: () => {
        addMessage('assistant', tempMessage);
        setTempMessage('');
      },
      onError: () => setTempMessage(''),
    });

    if (response) setTimeout(() => addMessage('assistant', response), 500);
  };

  const allMessages = [...messages, ...(tempMessage ? [{ id: 'temp', role: 'assistant' as const, content: tempMessage, timestamp: Date.now() }] : [])];
  const topics = ['函数', '三角', '数列', '几何', '概率', '导数'];

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-white border-r border-gray-100 p-6 hidden md:block">
        <div className="mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium mb-3">{level}</div>
          <div className="font-medium">学生用户</div>
        </div>
        <nav className="space-y-2">
          {[
            { name: '学习主控台', path: '/dashboard', active: false },
            { name: 'AI 对话学习', path: '/chat', active: true },
            { name: '专项练习', path: '/practice', active: false },
            { name: '错题本', path: '/review', active: false },
            { name: '学习报告', path: '/progress', active: false },
          ].map(item => (
            <Link key={item.path} to={item.path} className={`block px-4 py-2 rounded-lg ${item.active ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'}`}>{item.name}</Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 p-4 border-b border-gray-100 bg-white">
          {topics.map(topic => (
            <button key={topic} className="px-3 py-1 text-sm bg-gray-100 hover:bg-primary hover:text-white rounded-full transition">{topic}</button>
          ))}
        </div>
        <div className="flex-1 overflow-auto p-4 space-y-4">
          <AnimatePresence>
            {allMessages.map(msg => (
              <ChatBubble key={msg.id} role={msg.role} content={msg.content} isStreaming={msg.id === 'temp'} />
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto flex items-end gap-2">
            <button className="p-3 hover:bg-gray-100 rounded-xl"><Camera size={20} /></button>
            <button className="p-3 hover:bg-gray-100 rounded-xl"><Mic size={20} /></button>
            <div className="flex-1">
              <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="输入数学问题..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary resize-none" rows={1} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }} />
            </div>
            <button onClick={handleSend} disabled={!input.trim()} className="p-3 bg-primary text-white rounded-xl disabled:opacity-50"><Send size={20} /></button>
          </div>
        </div>
      </main>
    </div>
  );
}