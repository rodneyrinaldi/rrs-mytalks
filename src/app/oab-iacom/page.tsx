"use client";

import Head from 'next/head';
import { useEffect, useRef } from 'react';

export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let columns = Math.floor(width / 10);
    let drops = Array(columns).fill(1);

    const frases = [
      "TOC TOC, ACORDE ADVOGADO",
      "O CODIGO ESTÁ EM TUDO",
      "RAG BUSCANDO A VERDADE NA FONTE",
      "FINE-TUNING REPROGRAMANDO A MENTE",
      "CONTEXTS A COLHER NAO EXISTE",
      "PROMPTS AS IDEIAS SÃO A CHAVE",
      "A IA ESCOLHEU A PILULA AZUL?",
      "CICLO SE REINICIA NA MATRIX",
    ];

    let currentIndex = 0;
    let timerId: NodeJS.Timeout;

    const showNextMessage = () => {
      if (msgRef.current) {
        msgRef.current.innerText = frases[currentIndex];
        msgRef.current.style.display = 'block';

        timerId = setTimeout(() => {
          if (msgRef.current) msgRef.current.style.display = 'none';
          currentIndex = (currentIndex + 1) % frases.length;
          timerId = setTimeout(showNextMessage, 2000);
        }, 4000);
      }
    };

    // Atraso inicial
    const initialTimer = setTimeout(showNextMessage, 4000);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#0F0';
      ctx.font = '10px Arial';

      drops.forEach((y, x) => {
        const text = String.fromCharCode(0x30a0 + Math.random() * 96);
        ctx.fillText(text, x * 10, y * 10);

        if (y * 10 > height && Math.random() > 0.975) {
          drops[x] = 0;
        }
        drops[x]++;
      });
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / 10);
      drops = Array(columns).fill(1);
    };

    window.addEventListener('resize', handleResize);

    // Limpeza ao desmontar o componente
    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
      clearTimeout(timerId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ 
      position: 'relative', 
      margin: 0, 
      width: '100%', 
      height: '100vh', 
      overflow: 'hidden', 
      backgroundColor: 'black', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>rraas services</title>
        <meta name="description" content="rodneyrinaldi services" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      
      <div
        ref={msgRef}
        style={{
          position: 'absolute',
          backgroundColor: 'black',
          padding: '10px 15px',
          border: 'solid 1px #0a9204',
          fontSize: '1.5em',
          textAlign: 'center',
          color: '#ffffff',
          display: 'none',
        }}
      />
    </div>
  );
}