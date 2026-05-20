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
  side: 'front' | 'back';
}

const muscleGroups: MuscleGroup[] = [
  // Front body
  { id: 'chest', name: 'Chest', exerciseNames: ['bench', 'chest', 'fly', 'pushup', 'push-up'], x: 120, y: 65, width: 60, height: 35, side: 'front' },
  { id: 'shoulders', name: 'Shoulders', exerciseNames: ['shoulder', 'delt', 'overhead press', 'lateral raise'], x: 80, y: 55, width: 140, height: 25, side: 'front' },
  { id: 'biceps', name: 'Biceps', exerciseNames: ['bicep', 'curl', 'hammer curl'], x: 65, y: 95, width: 25, height: 40, side: 'front' },
  { id: 'abs', name: 'Abs', exerciseNames: ['ab', 'crunch', 'plank', 'core', 'sit-up'], x: 135, y: 105, width: 30, height: 50, side: 'front' },
  { id: 'forearms', name: 'Forearms', exerciseNames: ['wrist', 'forearm', 'grip'], x: 60, y: 140, width: 20, height: 35, side: 'front' },
  { id: 'quads', name: 'Quads', exerciseNames: ['squat', 'leg press', 'lunge', 'leg extension', 'quad'], x: 115, y: 165, width: 70, height: 60, side: 'front' },
  { id: 'calves', name: 'Calves', exerciseNames: ['calf', 'raise'], x: 125, y: 230, width: 50, height: 40, side: 'front' },

  // Back body
  { id: 'traps', name: 'Traps', exerciseNames: ['shrug', 'trap', 'upright row'], x: 120, y: 55, width: 60, height: 25, side: 'back' },
  { id: 'lats', name: 'Lats', exerciseNames: ['lat', 'pull-up', 'pull down', 'row', 'deadlift'], x: 105, y: 80, width: 90, height: 45, side: 'back' },
  { id: 'triceps', name: 'Triceps', exerciseNames: ['tricep', 'dip', 'skull crusher', 'pushdown'], x: 65, y: 95, width: 25, height: 40, side: 'back' },
  { id: 'lower-back', name: 'Lower Back', exerciseNames: ['deadlift', 'good morning', 'back extension', 'hyperextension'], x: 130, y: 130, width: 40, height: 30, side: 'back' },
  { id: 'glutes', name: 'Glutes', exerciseNames: ['glute', 'hip thrust', 'bridge', 'deadlift'], x: 120, y: 160, width: 60, height: 30, side: 'back' },
  { id: 'hamstrings', name: 'Hamstrings', exerciseNames: ['hamstring', 'leg curl', 'rdl', 'romanian'], x: 115, y: 195, width: 70, height: 45, side: 'back' },
];

interface BodyHeatmapProps {
  workoutLogs: any[];
}

export function BodyHeatmap({ workoutLogs }: BodyHeatmapProps) {
  const muscleScores = muscleGroups.map(mg => {
    const matchingLogs = workoutLogs.filter(log =>
      mg.exerciseNames.some(name =>
        log.exerciseName.toLowerCase().includes(name)
      )
    );
    const totalSets = matchingLogs.length;
    const totalVolume = matchingLogs.reduce((sum, log) => sum + (log.weight * log.reps), 0);
    const score = Math.min(10, totalSets * 0.8 + (totalVolume > 0 ? Math.log10(totalVolume) * 1.5 : 0));
    return { ...mg, score, totalSets, totalVolume };
  });

  const maxScore = Math.max(...muscleScores.map(m => m.score), 1);

  function getHeatColor(score: number) {
    const intensity = score / maxScore;
    if (intensity === 0) return 'fill-zinc-800/40';
    if (intensity < 0.2) return 'fill-emerald-900/60';
    if (intensity < 0.4) return 'fill-emerald-700/60';
    if (intensity < 0.6) return 'fill-yellow-600/60';
    if (intensity < 0.8) return 'fill-orange-600/60';
    return 'fill-red-600/70';
  }

  function getHeatColorInline(score: number) {
    const intensity = score / maxScore;
    if (intensity === 0) return '#1f1f2e';
    if (intensity < 0.2) return '#064e3b';
    if (intensity < 0.4) return '#047857';
    if (intensity < 0.6) return '#a16207';
    if (intensity < 0.8) return '#c2410c';
    return '#dc2626';
  }

  const [view, setView] = React.useState<'front' | 'back'>('front');
  const [hoveredMuscle, setHoveredMuscle] = React.useState<string | null>(null);

  const visibleMuscles = muscleScores.filter(m => m.side === view);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2 bg-zinc-900/80 rounded-lg p-0.5 border border-zinc-800/50">
        <button
          onClick={() => setView('front')}
          className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${view === 'front' ? 'bg-indigo-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Front
        </button>
        <button
          onClick={() => setView('back')}
          className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${view === 'back' ? 'bg-indigo-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Back
        </button>
      </div>

      <div className="relative">
        <svg viewBox="0 0 300 300" className="w-64 h-64 sm:w-72 sm:h-72">
          {/* Body silhouette */}
          <ellipse cx="150" cy="30" rx="22" ry="28" className="fill-zinc-700/30" />
          <path d="M120 55 Q150 50 180 55 L185 70 L175 75 L175 100 L185 105 L185 165 L175 170 L175 230 L165 270 L155 270 L150 235 L145 270 L135 270 L125 230 L125 170 L115 165 L115 105 L125 100 L125 75 L115 70 Z" className="fill-zinc-700/20" />

          {/* Muscle groups */}
          {visibleMuscles.map(m => (
            <g key={m.id}>
              <rect
                x={m.x}
                y={m.y}
                width={m.width}
                height={m.height}
                rx="6"
                className={`cursor-pointer transition-all duration-300 ${getHeatColor(m.score)} ${hoveredMuscle === m.id ? 'stroke-white stroke-2' : 'stroke-transparent'}`}
                onMouseEnter={() => setHoveredMuscle(m.id)}
                onMouseLeave={() => setHoveredMuscle(null)}
                style={{
                  fill: hoveredMuscle === m.id ? getHeatColorInline(m.score) : undefined,
                  filter: hoveredMuscle === m.id ? 'brightness(1.3)' : undefined,
                }}
              />
              {hoveredMuscle === m.id && (
                <g>
                  <rect x={m.x + m.width / 2 - 30} y={m.y - 22} width="60" height="18" rx="4" className="fill-zinc-900/90" />
                  <text x={m.x + m.width / 2} y={m.y - 10} textAnchor="middle" className="fill-white text-[8px] font-semibold">
                    {m.name} ({m.totalSets})
                  </text>
                </g>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 text-[10px] text-zinc-500">
        <span>Less</span>
        <div className="flex gap-0.5">
          {['#1f1f2e', '#064e3b', '#047857', '#a16207', '#c2410c', '#dc2626'].map((c, i) => (
            <div key={i} className="w-4 h-3 rounded-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span>More</span>
      </div>

      {/* Muscle breakdown */}
      <div className="w-full grid grid-cols-2 gap-2">
        {visibleMuscles.sort((a, b) => b.totalSets - a.totalSets).map(m => (
          <div key={m.id} className="flex items-center gap-2 p-2 bg-[#151520]/30 rounded-lg border border-[#212130]/40">
            <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: getHeatColorInline(m.score) }} />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-medium text-zinc-300">{m.name}</span>
              <span className="text-[9px] text-zinc-500 ml-1">{m.totalSets} sets</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
