import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

interface RestTimerCardProps {
  resetKey?: string | number;
  compact?: boolean;
}

const PRESET_SECONDS = [30, 60, 90] as const;

export function RestTimerCard({ resetKey, compact = false }: RestTimerCardProps) {
  const [duration, setDuration] = useState<number>(60);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (resetKey !== undefined) {
      setIsRunning(false);
      setTimeLeft(duration);
    }
  }, [resetKey, duration]);

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft <= 0) {
      setIsRunning(false);
      return;
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((prev) => {
        const next = Math.max(0, prev - 1);
        if (next === 0) {
          setIsRunning(false);
        }
        return next;
      });
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes < 10 ? `0${minutes}` : `${minutes}`}:${
    seconds < 10 ? `0${seconds}` : `${seconds}`
  }`;

  const progress = duration > 0 ? timeLeft / duration : 0;
  const radius = compact ? 44 : 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const handleToggle = () => {
    if (timeLeft === 0) {
      setTimeLeft(duration);
      setIsRunning(true);
    } else {
      setIsRunning((prev) => !prev);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const handleSelectPreset = (sec: number) => {
    setIsRunning(false);
    setDuration(sec);
    setTimeLeft(sec);
  };

  return (
    <div className="rounded-xl bg-white border border-slate-200 p-5 flex flex-col items-center gap-4">
      <div className="w-full flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Timer Istirahat
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {timeLeft === 0
              ? "Waktu istirahat selesai"
              : isRunning
                ? "Sedang menghitung mundur"
                : "Siap untuk set berikutnya"}
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100">
          {PRESET_SECONDS.map((sec) => (
            <button
              key={sec}
              type="button"
              onClick={() => handleSelectPreset(sec)}
              className={`min-h-[32px] px-2.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B45A6] ${
                duration === sec
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {sec}d
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex items-center justify-center my-1">
        <svg
          width={compact ? 112 : 136}
          height={compact ? 112 : 136}
          viewBox={compact ? "0 0 112 112" : "0 0 136 136"}
          className="-rotate-90"
          aria-hidden="true"
        >
          <circle
            cx={compact ? 56 : 68}
            cy={compact ? 56 : 68}
            r={radius}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="8"
          />
          <circle
            cx={compact ? 56 : 68}
            cy={compact ? 56 : 68}
            r={radius}
            fill="none"
            stroke={timeLeft === 0 ? "#16A34A" : "#5B45A6"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-[stroke-dashoffset] duration-300 ease-out"
          />
        </svg>
        <div
          aria-live="polite"
          className={`absolute font-timer font-semibold tracking-tight text-slate-900 ${
            compact ? "text-2xl" : "text-3xl"
          }`}
        >
          {formattedTime}
        </div>
      </div>

      <div className="w-full flex items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={handleToggle}
          className="flex-1 min-h-[44px] px-4 py-2 rounded-lg bg-[#5B45A6] hover:bg-[#4B388E] text-white text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B45A6] focus-visible:ring-offset-2"
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" aria-hidden="true" />
              <span>Jeda</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" aria-hidden="true" />
              <span>Mulai</span>
            </>
          )}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="min-h-[44px] px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B45A6] focus-visible:ring-offset-2"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
