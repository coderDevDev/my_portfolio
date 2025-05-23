'use client';

import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Terminal,
  FileCode,
  Zap,
  SkipForward,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Audio refs for sound effects
  const audioContextRef = useRef<AudioContext | null>(null);
  const progressSoundRef = useRef<HTMLAudioElement | null>(null);
  const completeSoundRef = useRef<HTMLAudioElement | null>(null);

  // Pre-generated positions to avoid hydration mismatch
  const [particlePositions] = useState(() => {
    if (typeof window === 'undefined') return [];
    return Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight
    }));
  });

  const [symbolPositions] = useState(() => {
    if (typeof window === 'undefined') return [];
    return ['<', '>', '{', '}', '(', ')', ';', '='].map((symbol, i) => ({
      symbol,
      x: Math.random() * (window.innerWidth || 1000),
      y: Math.random() * (window.innerHeight || 1000),
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 2
    }));
  });

  const loadingSteps = [
    { text: 'Initializing VS Code Environment...', icon: Terminal, delay: 500 },
    { text: 'Loading React Components...', icon: Code, delay: 800 },
    { text: 'Compiling TypeScript...', icon: FileCode, delay: 600 },
    { text: 'Optimizing Performance...', icon: Zap, delay: 700 },
    { text: 'Ready to showcase amazing work!', icon: Code, delay: 500 }
  ];

  // Set client flag after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize audio context and sounds
  useEffect(() => {
    if (!isClient) return;

    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => setShowSkip(true), 2000);

    // Create audio context for sound effects
    if (soundEnabled) {
      try {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();

        // Create progress sound (subtle beep)
        progressSoundRef.current = new Audio();
        progressSoundRef.current.volume = 0.1;

        // Create completion sound (success chime)
        completeSoundRef.current = new Audio();
        completeSoundRef.current.volume = 0.2;
      } catch (error) {
        console.log('Audio not supported');
      }
    }

    return () => clearTimeout(skipTimer);
  }, [soundEnabled, isClient]);

  // Generate sound programmatically
  const playProgressSound = () => {
    if (!soundEnabled || !audioContextRef.current) return;

    try {
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        400,
        ctx.currentTime + 0.1
      );

      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (error) {
      console.log('Sound generation failed');
    }
  };

  const playCompleteSound = () => {
    if (!soundEnabled || !audioContextRef.current) return;

    try {
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Success chord progression
      oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C
      oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E
      oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.5);
    } catch (error) {
      console.log('Sound generation failed');
    }
  };

  const handleSkip = () => {
    setProgress(100);
    setTimeout(onComplete, 300);
  };

  useEffect(() => {
    if (!isClient) return;

    // Show logo after initial delay
    const logoTimer = setTimeout(() => setShowLogo(true), 300);

    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;

        // Play sound every 10% progress
        if (newProgress % 10 === 0 && newProgress !== prev) {
          playProgressSound();
        }

        if (newProgress >= 100) {
          clearInterval(progressTimer);
          playCompleteSound();
          setTimeout(onComplete, 800);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    // Step progression
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, [onComplete, isClient]);

  // Don't render animated elements until client-side
  if (!isClient) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] overflow-hidden">
        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          <div className="mb-8">
            <div className="relative mx-auto w-24 h-24 mb-4">
              <div className="absolute inset-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Code className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
              Dexter Miranda
            </h1>
            <p className="text-gray-300 text-lg">Full Stack Developer</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] overflow-hidden">
      {/* Control Buttons */}
      <div className="absolute top-6 right-6 flex space-x-2 z-20">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="text-white/70 hover:text-white hover:bg-white/10">
          {soundEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </Button>

        <AnimatePresence>
          {showSkip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-white/70 hover:text-white hover:bg-white/10">
                <SkipForward className="w-4 h-4 mr-1" />
                Skip
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            initial={{ x: particle.x, y: particle.y }}
            animate={{ x: particle.targetX, y: particle.targetY }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Animated Logo */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 1,
                ease: [0.68, -0.55, 0.265, 1.55] // Custom back ease
              }}
              className="mb-8">
              <div className="relative mx-auto w-24 h-24 mb-4">
                {/* Outer rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear'
                  }}
                  className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"
                />

                {/* Middle ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear'
                  }}
                  className="absolute inset-1 border-2 border-transparent border-l-pink-500 border-b-cyan-500 rounded-full"
                />

                {/* Inner pulsing core */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.5)',
                      '0 0 40px rgba(147, 51, 234, 0.8)',
                      '0 0 20px rgba(59, 130, 246, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Code className="w-8 h-8 text-white" />
                </motion.div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                Dexter Miranda
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-gray-300 text-lg">
                Full Stack Developer
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Steps */}
        <div className="mb-8 h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {loadingSteps[currentStep] && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear'
                  }}>
                  {React.createElement(loadingSteps[currentStep].icon, {
                    className: 'w-5 h-5 text-blue-400'
                  })}
                </motion.div>
                <span className="text-gray-300 text-sm font-mono">
                  {loadingSteps[currentStep].text}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}>
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear'
                }}
              />
            </motion.div>
          </div>

          {/* Progress percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-3 text-center">
            <motion.span
              key={progress}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {progress}%
            </motion.span>
          </motion.div>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-1 mt-6">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute top-8 left-8">
        <div className="w-16 h-16 border-l-4 border-t-4 border-blue-500 rounded-tl-lg" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
        className="absolute top-8 right-8">
        <div className="w-16 h-16 border-r-4 border-t-4 border-purple-500 rounded-tr-lg" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
        className="absolute bottom-8 left-8">
        <div className="w-16 h-16 border-l-4 border-b-4 border-pink-500 rounded-bl-lg" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.1, duration: 1 }}
        className="absolute bottom-8 right-8">
        <div className="w-16 h-16 border-r-4 border-b-4 border-cyan-500 rounded-br-lg" />
      </motion.div>

      {/* Floating code symbols */}
      <div className="absolute inset-0 pointer-events-none">
        {symbolPositions.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl font-mono text-blue-400 opacity-20"
            initial={{
              x: item.x,
              y: item.y,
              rotate: 0
            }}
            animate={{
              y: [null, -20, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: item.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: item.delay
            }}>
            {item.symbol}
          </motion.div>
        ))}
      </div>

      {/* Easter Egg - Konami Code hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3 }}
        className="absolute bottom-4 left-4 text-xs text-gray-500 font-mono">
        Try: ↑↑↓↓←→←→BA
      </motion.div>
    </motion.div>
  );
}
