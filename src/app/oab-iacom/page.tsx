"use client";

import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// --- 1. Componente Bio ---
const Bio = () => (
  <div className="flex min-h-screen items-center justify-center bg-white p-6 w-full animate-in fade-in duration-1000">
    <div className="flex flex-col items-center text-center max-w-sm">
      <div className="relative w-48 h-48 mb-6 overflow-hidden rounded-full border-2 border-gray-100 shadow-sm">
        <Image src="/bio.png" alt="Foto Advogado" fill className="object-cover" priority />
      </div>
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">rodney rinaldi</h1>
      <h2 className="text-sm font-medium text-amber-700 tracking-[0.2em] uppercase mb-4">Direito Digital & Estratégico</h2>
      <p className="text-gray-600 leading-relaxed italic">Onde a lei encontra o código</p>
    </div>
  </div>
);

// --- 2. Componente Terminal ---
const TerminalPrompt = () => {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullMessage = "toc toc...";

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor(prev => !prev), 500);
    
    const typingTimeout = setTimeout(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        setText(fullMessage.slice(0, i + 1));
        i++;
        if (i === fullMessage.length) clearInterval(typingInterval);
      }, 150);
    }, 2000);

    return () => {
      clearInterval(cursorInterval);
      clearTimeout(typingTimeout);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-black p-10 font-mono text-[#33ff33] text-2xl">
      <div className="flex items-start">
        <span className="mr-2">C:\&gt;</span>
        <span>{text}</span>
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} ml-1 bg-[#33ff33] w-3 h-7 inline-block align-middle`}></span>
      </div>
    </div>
  );
};

// --- 3. Componente Matrix ---
const MatrixEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const columns = Math.floor(width / 10);
    const drops = Array(columns).fill(1);

    const frases = [
      "acorde advogado",       
      "código está em tudo",
      "buscando a verdade na fonte: rag",
      "reprogramando o conhecimento: fine-tuning",
      "colher não existe: contexts",
      "chaves são as ideias: prompts",      
      "pilula vermelha: ai power and knowledge",
      "ciclo reiniciando: new zion of law",
    ];

    let currentIndex = 0;
    let messageTimer: NodeJS.Timeout;

    const showNextMessage = () => {
      if (msgRef.current) {
        msgRef.current.innerText = frases[currentIndex];
        msgRef.current.style.display = 'block';
        messageTimer = setTimeout(() => {
          if (msgRef.current) msgRef.current.style.display = 'none';
          currentIndex = (currentIndex + 1) % frases.length;
          messageTimer = setTimeout(showNextMessage, 2000);
        }, 4000);
      }
    };

    const initialTimer = setTimeout(showNextMessage, 4000);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#0F0';
      ctx.font = '10px Arial';
      drops.forEach((y, x) => {
        const textChar = String.fromCharCode(0x30a0 + Math.random() * 96);
        ctx.fillText(textChar, x * 10, y * 10);
        if (y * 10 > height && Math.random() > 0.975) drops[x] = 0;
        drops[x]++;
      });
    };

    const matrixInterval = setInterval(draw, 33);

    return () => {
      clearInterval(matrixInterval);
      clearTimeout(initialTimer);
      if (messageTimer) clearTimeout(messageTimer);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex justify-center items-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div ref={msgRef} className="absolute bg-black p-4 border border-[#0a9204] text-2xl text-white hidden z-10 font-mono" />
    </div>
  );
};

// --- 4. Componente Principal (Lógica de Tempo) ---
export default function OabIacom() {
  const [step, setStep] = useState<'bio' | 'terminal' | 'matrix'>('bio');

  useEffect(() => {
    // Timer 1: De Bio para Terminal (2 minutos)
    const toTerminal = setTimeout(() => {
      setStep('terminal');

      // Timer 2: De Terminal para Matrix (10 segundos)
      const toMatrix = setTimeout(() => {
        setStep('matrix');

        // Timer 3: De Matrix volta para Bio (15 minutos)
        const backToBio = setTimeout(() => {
          setStep('bio');
        }, 15 * 60 * 1000);

        return () => clearTimeout(backToBio);
      }, 10 * 1000);

      return () => clearTimeout(toMatrix);
    }, 2 * 60 * 1000);

    return () => clearTimeout(toTerminal);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black overflow-hidden">
      <Head>
        <title>rraas services</title>
      </Head>

      <main className="w-full h-full">
        {step === 'bio' && <Bio />}
        {step === 'terminal' && <TerminalPrompt />}
        {step === 'matrix' && <MatrixEffect />}
      </main>
    </div>
  );
}