'use client';

import React from 'react';

interface MuscleGroup {
  id: string;
  name: string;
  exerciseNames: string[];
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  side: 'front' | 'back';
  category: 'upper' | 'lower';
}

const muscleGroups: MuscleGroup[] = [
  { id: 'shoulders', name: 'Shoulders', exerciseNames: ['shoulder', 'delt', 'overhead press', 'lateral raise'], x: 105, y: 50, width: 90, height: 22, rx: 6, side: 'front', category: 'upper' },
  { id: 'chest', name: 'Chest', exerciseNames: ['bench', 'chest', 'fly', 'pushup', 'push-up', 'incline', 'decline'], x: 115, y: 78, width: 70, height: 28, rx: 6, side: 'front', category: 'upper' },
  { id: 'biceps', name: 'Biceps', exerciseNames: ['bicep', 'curl', 'hammer curl', 'preacher'], x: 82, y: 80, width: 22, height: 38, rx: 5, side: 'front', category: 'upper' },
  { id: 'abs', name: 'Abs', exerciseNames: ['ab', 'crunch', 'plank', 'core', 'sit-up', 'cable crunch', 'leg raise'], x: 128, y: 112, width: 44, height: 42, rx: 6, side: 'front', category: 'upper' },
  { id: 'forearms', name: 'Forearms', exerciseNames: ['wrist', 'forearm', 'grip', 'reverse curl'], x: 78, y: 124, width: 20, height: 34, rx: 5, side: 'front', category: 'upper' },
  { id: 'quads', name: 'Quads', exerciseNames: ['squat', 'leg press', 'lunge', 'leg extension', 'quad', 'front squat', 'hack squat'], x: 112, y: 160, width: 76, height: 52, rx: 6, side: 'front', category: 'lower' },
  { id: 'calves', name: 'Calves', exerciseNames: ['calf', 'raise', 'seated calf'], x: 120, y: 218, width: 60, height: 42, rx: 6, side: 'front', category: 'lower' },
  { id: 'traps', name: 'Traps', exerciseNames: ['shrug', 'trap', 'upright row', 'face pull'], x: 120, y: 48, width: 60, height: 22, rx: 6, side: 'back', category: 'upper' },
  { id: 'lats', name: 'Lats', exerciseNames: ['lat', 'pull-up', 'pull down', 'row', 'deadlift', 't-bar row', 'cable row'], x: 105, y: 76, width: 90, height: 42, rx: 6, side: 'back', category: 'upper' },
  { id: 'triceps', name: 'Triceps', exerciseNames: ['tricep', 'dip', 'skull crusher', 'pushdown', 'overhead extension'], x: 82, y: 80, width: 22, height: 38, rx: 5, side: 'back', category: 'upper' },
  { id: 'lower-back', name: 'Lower Back', exerciseNames: ['deadlift', 'good morning', 'back extension', 'hyperextension', 'rack pull'], x: 126, y: 124, width: 48, height: 28, rx: 6, side: 'back', category: 'upper' },
  { id: 'glutes', name: 'Glutes', exerciseNames: ['glute', 'hip thrust', 'bridge', 'deadlift', 'kickback', 'cable pull-through'], x: 115, y: 158, width: 70, height: 30, rx: 6, side: 'back', category: 'lower' },
  { id: 'hamstrings', name: 'Hamstrings', exerciseNames: ['hamstring', 'leg curl', 'rdl', 'romanian', 'nordic curl'], x: 112, y: 194, width: 76, height: 44, rx: 6, side: 'back', category: 'lower' },
];

interface BodyHeatmapProps {
  workoutLogs: any[];
}

export function BodyHeatmap({ workoutLogs }: BodyHeatmapProps) {
  const muscleScores = muscleGroups.map(mg => {
    const matchingLogs = workoutLogs.filter(log =>
      mg.exerciseNames.some(name => log.exerciseName.toLowerCase().includes(name))
    );
    const totalSets = matchingLogs.length;
    const totalVolume = matchingLogs.reduce((sum, log) => sum + (log.weight * log.reps), 0);
    const exercises = matchingLogs.map(l => l.exerciseName).filter((v, i, a) => a.indexOf(v) === i);
    const score = Math.min(10, totalSets * 0.8 + (totalVolume > 0 ? Math.log10(totalVolume) * 1.5 : 0));
    return { ...mg, score, totalSets, totalVolume, exercises };
  });

  const maxScore = Math.max(...muscleScores.map(m => m.score), 1);

  function getHeatFill(score: number) {
    const intensity = score / maxScore;
    if (intensity === 0) return { base: 'rgba(31, 31, 46, 0.4)', glow: 'rgba(63, 63, 80, 0.2)' };
    if (intensity < 0.2) return { base: 'rgba(6, 78, 59, 0.55)', glow: 'rgba(16, 185, 129, 0.15)' };
    if (intensity < 0.4) return { base: 'rgba(4, 120, 87, 0.6)', glow: 'rgba(16, 185, 129, 0.2)' };
    if (intensity < 0.6) return { base: 'rgba(161, 98, 7, 0.65)', glow: 'rgba(234, 179, 8, 0.2)' };
    if (intensity < 0.8) return { base: 'rgba(194, 65, 12, 0.7)', glow: 'rgba(249, 115, 22, 0.25)' };
    return { base: 'rgba(220, 38, 38, 0.75)', glow: 'rgba(239, 68, 68, 0.3)' };
  }

  const [selectedMuscle, setSelectedMuscle] = React.useState<string | null>(null);
  const [hoveredMuscle, setHoveredMuscle] = React.useState<string | null>(null);

  const frontMuscles = muscleScores.filter(m => m.side === 'front');
  const backMuscles = muscleScores.filter(m => m.side === 'back');
  const selectedData = muscleScores.find(m => m.id === selectedMuscle);

  function handleMuscleClick(id: string) {
    setSelectedMuscle(prev => prev === id ? null : id);
  }

  function MuscleSVG({ muscles, label, sizeClass }: { muscles: typeof muscleScores; label: string; sizeClass: string }) {
    return (
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-semibold dark:text-zinc-400 text-gray-500 uppercase tracking-wider">{label}</span>
        <svg viewBox="0 0 300 280" className={sizeClass}>
          <defs>
            {muscles.map(m => {
              const fill = getHeatFill(m.score);
              return (
                <linearGradient key={`desk-grad-${m.id}`} id={`desk-grad-${m.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={fill.glow} />
                  <stop offset="30%" stopColor="rgba(255,255,255,0.08)" />
                  <stop offset="100%" stopColor={fill.base} />
                </linearGradient>
              );
            })}
          </defs>

          <ellipse cx="150" cy="26" rx="18" ry="22" fill="rgba(113, 113, 122, 0.15)" />
          <path d="M122 46 Q135 40 150 38 Q165 40 178 46 L182 56 L176 62 L176 96 L182 104 L182 162 L174 168 L174 224 L166 258 L160 278 L154 278 L150 260 L146 278 L140 278 L134 258 L126 224 L126 168 L118 162 L118 104 L124 96 L124 62 L118 56 Z" fill="rgba(113, 113, 122, 0.1)" />

          {muscles.map(m => {
            const isSelected = selectedMuscle === m.id;
            const isHovered = hoveredMuscle === m.id;
            const showLabel = isHovered || isSelected;
            return (
              <g key={m.id}>
                <rect
                  x={m.x}
                  y={m.y}
                  width={m.width}
                  height={m.height}
                  rx={m.rx || 6}
                  fill={`url(#desk-grad-${m.id})`}
                  stroke={isSelected ? 'rgba(99, 102, 241, 0.7)' : isHovered ? 'rgba(99, 102, 241, 0.4)' : 'rgba(63, 63, 80, 0.25)'}
                  strokeWidth={isSelected ? 1.5 : isHovered ? 1 : 0.5}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => handleMuscleClick(m.id)}
                  onMouseEnter={() => setHoveredMuscle(m.id)}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  style={{
                    filter: showLabel ? 'brightness(1.25) drop-shadow(0 0 6px rgba(99,102,241,0.3))' : undefined,
                  }}
                />
                {showLabel && (
                  <g>
                    <rect x={m.x + m.width / 2 - 32} y={m.y - 22} width="64" height="18" rx="5" fill="rgba(24, 24, 36, 0.95)" stroke="rgba(63, 63, 80, 0.4)" strokeWidth="0.5" />
                    <text x={m.x + m.width / 2} y={m.y - 10} textAnchor="middle" fill="white" fontSize="8" fontWeight="600">
                      {m.name} ({m.totalSets})
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Desktop: side by side, Mobile: toggle */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8">
        <MuscleSVG muscles={frontMuscles} label="Front" sizeClass="w-full max-w-[220px]" />
        <MuscleSVG muscles={backMuscles} label="Back" sizeClass="w-full max-w-[220px]" />
      </div>

      {/* Mobile: toggle */}
      <div className="lg:hidden">
        <MobileBodyView muscles={muscleScores} getHeatFill={getHeatFill} selectedMuscle={selectedMuscle} handleMuscleClick={handleMuscleClick} />
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-2 text-xs dark:text-zinc-500 text-gray-500">
        <span>Less</span>
        <div className="flex gap-0.5">
          {['#1f1f2e', '#064e3b', '#047857', '#a16207', '#c2410c', '#dc2626'].map((c, i) => (
            <div key={i} className="w-5 h-3 rounded-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span>More</span>
      </div>

      {/* Selected muscle exercises - smooth transition */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${selectedData ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
        {selectedData && (
          <div className="p-4 dark:bg-[#151520]/50 bg-gray-50/50 border dark:border-[#212130]/50 border-gray-200/50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: getHeatFill(selectedData.score).base }} />
              <span className="text-sm font-semibold dark:text-zinc-200 text-gray-800">{selectedData.name}</span>
              <span className="text-xs dark:text-zinc-500 text-gray-500 ml-auto">{selectedData.totalSets} sets · {selectedData.totalVolume > 0 ? Math.round(selectedData.totalVolume).toLocaleString() : 0} kg</span>
            </div>
            {selectedData.exercises.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedData.exercises.map((ex, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 dark:bg-indigo-950/40 bg-indigo-50/40 border dark:border-indigo-800/40 border-indigo-200/40 dark:text-indigo-300 text-indigo-600 rounded-full">
                    {ex}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs dark:text-zinc-600 text-gray-400 italic">No exercises logged for this muscle group yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Muscle breakdown */}
      {(['upper', 'lower'] as const).map(cat => {
        const catMuscles = muscleScores.filter(m => m.category === cat).sort((a, b) => b.totalSets - a.totalSets);
        return (
          <div key={cat} className="space-y-2">
            <span className="text-xs font-semibold dark:text-zinc-500 text-gray-500 uppercase tracking-wider">{cat === 'upper' ? 'Upper Body' : 'Lower Body'}</span>
            <div className="w-full grid grid-cols-2 gap-2">
              {catMuscles.map(m => (
                <button
                  key={m.id}
                  onClick={() => handleMuscleClick(m.id)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all duration-200 btn-press ${
                    selectedMuscle === m.id
                      ? 'dark:bg-[#1a1a2e] bg-indigo-50 dark:border-indigo-700/50 border-indigo-300/50 ring-1 ring-indigo-500/20'
                      : 'dark:bg-[#151520]/30 bg-gray-50/30 dark:border-[#212130]/40 border-gray-200/40 hover:dark:bg-[#1a1a28] bg-gray-100'
                  }`}
                >
                  <div className="w-3.5 h-3.5 rounded-sm shrink-0" style={{ backgroundColor: getHeatFill(m.score).base }} />
                  <div className="min-w-0 flex-1 text-left">
                    <span className="text-xs font-medium dark:text-zinc-300 text-gray-700">{m.name}</span>
                    <span className="text-[11px] dark:text-zinc-500 text-gray-500 ml-1">{m.totalSets} sets</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MobileBodyView({ muscles, getHeatFill, selectedMuscle, handleMuscleClick }: {
  muscles: any[];
  getHeatFill: (s: number) => { base: string; glow: string };
  selectedMuscle: string | null;
  handleMuscleClick: (id: string) => void;
}) {
  const [view, setView] = React.useState<'front' | 'back'>('front');
  const visibleMuscles = muscles.filter(m => m.side === view);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2 dark:dark:bg-zinc-900/80 bg-gray-100/80 bg-gray-100/80 rounded-lg p-0.5 border dark:dark:border-zinc-800/50 border-gray-200/50 border-gray-200/50">
        <button onClick={() => setView('front')} className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer btn-press ${view === 'front' ? 'dark:bg-indigo-600 dark:text-white bg-indigo-500 text-white' : 'dark:text-zinc-500 text-gray-500 hover:dark:text-zinc-300 text-gray-700'}`}>Front</button>
        <button onClick={() => setView('back')} className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer btn-press ${view === 'back' ? 'dark:bg-indigo-600 dark:text-white bg-indigo-500 text-white' : 'dark:text-zinc-500 text-gray-500 hover:dark:text-zinc-300 text-gray-700'}`}>Back</button>
      </div>
      <svg viewBox="0 0 300 280" className="w-52 h-52 sm:w-60 sm:h-60">
        <defs>
          {visibleMuscles.map(m => {
            const fill = getHeatFill(m.score);
            return (
              <linearGradient key={`mob-grad-${m.id}`} id={`mob-grad-${m.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={fill.glow} />
                <stop offset="30%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="100%" stopColor={fill.base} />
              </linearGradient>
            );
          })}
        </defs>
        <ellipse cx="150" cy="26" rx="18" ry="22" fill="rgba(113, 113, 122, 0.12)" />
        <path d="M122 46 Q135 40 150 38 Q165 40 178 46 L182 56 L176 62 L176 96 L182 104 L182 162 L174 168 L174 224 L166 258 L160 278 L154 278 L150 260 L146 278 L140 278 L134 258 L126 224 L126 168 L118 162 L118 104 L124 96 L124 62 L118 56 Z" fill="rgba(113, 113, 122, 0.08)" />
        {visibleMuscles.map(m => (
          <g key={m.id}>
            <rect
              x={m.x}
              y={m.y}
              width={m.width}
              height={m.height}
              rx={m.rx || 6}
              fill={`url(#mob-grad-${m.id})`}
              stroke={selectedMuscle === m.id ? 'rgba(99, 102, 241, 0.7)' : 'rgba(63, 63, 80, 0.25)'}
              strokeWidth={selectedMuscle === m.id ? 1.5 : 0.5}
              className="cursor-pointer transition-all duration-300"
              onClick={() => handleMuscleClick(m.id)}
              style={{
                filter: selectedMuscle === m.id ? 'brightness(1.25) drop-shadow(0 0 6px rgba(99,102,241,0.3))' : undefined,
              }}
            />
            {selectedMuscle === m.id && (
              <g>
                <rect x={m.x + m.width / 2 - 32} y={m.y - 22} width="64" height="18" rx="5" fill="rgba(24, 24, 36, 0.95)" stroke="rgba(63, 63, 80, 0.4)" strokeWidth="0.5" />
                <text x={m.x + m.width / 2} y={m.y - 10} textAnchor="middle" fill="white" fontSize="8" fontWeight="600">{m.name} ({m.totalSets})</text>
              </g>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
