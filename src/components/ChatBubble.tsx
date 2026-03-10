import { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { motion } from 'framer-motion';
import { Copy, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

function renderWithLatex(text: string) {
  const parts: Array<{ type: 'text' | 'inline' | 'block'; content: string }> = [];
  const blockRegex = /\$\$([\s\S]*?)\$\$/g;
  const blockMatches: Array<{ start: number; end: number; content: string }> = [];
  let match;
  while ((match = blockRegex.exec(text)) !== null) {
    blockMatches.push({ start: match.index, end: match.index + match[0].length, content: match[1].trim() });
  }
  if (blockMatches.length === 0) {
    const inlineRegex = /\$([^\$\n]+?)\$/g;
    const inlineMatches: Array<{ start: number; end: number; content: string }> = [];
    let inlineMatch;
    while ((inlineMatch = inlineRegex.exec(text)) !== null) {
      inlineMatches.push({ start: inlineMatch.index, end: inlineMatch.index + inlineMatch[0].length, content: inlineMatch[1].trim() });
    }
    let currentPos = 0;
    for (const m of inlineMatches) {
      if (m.start > currentPos) parts.push({ type: 'text', content: text.slice(currentPos, m.start) });
      parts.push({ type: 'inline', content: m.content });
      currentPos = m.end;
    }
    if (currentPos < text.length) parts.push({ type: 'text', content: text.slice(currentPos) });
  } else {
    let currentPos = 0;
    for (const m of blockMatches) {
      if (m.start > currentPos) {
        const inlineRegex = /\$([^\$\n]+?)\$/g;
        const inlineMatches: Array<{ start: number; end: number; content: string }> = [];
        let inlineMatch;
        while ((inlineMatch = inlineRegex.exec(text.slice(currentPos, m.start))) !== null) {
          inlineMatches.push({ start: currentPos + inlineMatch.index, end: currentPos + inlineMatch.index + inlineMatch[0].length, content: inlineMatch[1].trim() });
        }
        let inlinePos = currentPos;
        for (const im of inlineMatches) {
          if (im.start > inlinePos) parts.push({ type: 'text', content: text.slice(inlinePos, im.start) });
          parts.push({ type: 'inline', content: im.content });
          inlinePos = im.end;
        }
        if (inlinePos < m.start) parts.push({ type: 'text', content: text.slice(inlinePos, m.start) });
      }
      parts.push({ type: 'block', content: m.content });
      currentPos = m.end;
    }
    if (currentPos < text.length) {
      const inlineRegex = /\$([^\$\n]+?)\$/g;
      const inlineMatches: Array<{ start: number; end: number; content: string }> = [];
      let inlineMatch;
      while ((inlineMatch = inlineRegex.exec(text.slice(currentPos))) !== null) {
        inlineMatches.push({ start: currentPos + inlineMatch.index, end: currentPos + inlineMatch.index + inlineMatch[0].length, content: inlineMatch[1].trim() });
      }
      let inlinePos = currentPos;
      for (const m of inlineMatches) {
        if (m.start > inlinePos) parts.push({ type: 'text', content: text.slice(inlinePos, m.start) });
        parts.push({ type: 'inline', content: m.content });
        inlinePos = m.end;
      }
      if (inlinePos < text.length) parts.push({ type: 'text', content: text.slice(inlinePos) });
    }
  }
  return parts;
}

export default function ChatBubble({ role, content, isStreaming }: ChatBubbleProps) {
  const [copied, setCopied] = useState(false);
  const parts = renderWithLatex(content);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const isUser = role === 'user';
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] md:max-w-[85%] rounded-2xl px-4 py-3 ${isUser ? 'bg-[#E8F0FE] rounded-br-4' : 'bg-white border border-[#E0E0E0] rounded-bl-4'}`}>
        {parts.map((part, i) => (
          <span key={i} className="inline">
            {part.type === 'text' && part.content}
            {part.type === 'inline' && <InlineMath math={part.content} />}
            {part.type === 'block' && <div className="my-2"><BlockMath math={part.content} /></div>}
          </span>
        ))}
        {isStreaming && (
          <span className="inline-flex ml-1">
            <span className="animate-bounce w-1 h-1 bg-gray-400 rounded-full mx-0.5"></span>
            <span className="animate-bounce w-1 h-1 bg-gray-400 rounded-full mx-0.5" style={{ animationDelay: '0.1s' }}></span>
            <span className="animate-bounce w-1 h-1 bg-gray-400 rounded-full mx-0.5" style={{ animationDelay: '0.2s' }}></span>
          </span>
        )}
        {!isUser && (
          <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={handleCopy} className="p-1 hover:bg-gray-100 rounded" title="复制">
              {copied ? <span className="text-xs text-green-500">已复制</span> : <Copy size={14} />}
            </button>
            <button className="p-1 hover:bg-gray-100 rounded" title="有帮助"><ThumbsUp size={14} /></button>
            <button className="p-1 hover:bg-gray-100 rounded" title="没帮助"><ThumbsDown size={14} /></button>
            <button className="p-1 hover:bg-gray-100 rounded" title="重新生成"><RefreshCw size={14} /></button>
          </div>
        )}
      </div>
    </motion.div>
  );
}