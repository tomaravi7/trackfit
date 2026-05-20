'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Dumbbell, Utensils, Settings as SettingsIcon,
  Plus, Trash2, Search, Check, AlertCircle, X,
  ChevronLeft, ChevronRight, Sparkles, Database,
  Activity, Flame, Apple, TrendingUp, Info,
  Droplets, Scale, BarChart3, Pencil, Lock, Brain,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface FoodLog {
  id?: number;
  date: string;
  foodName: string;
  quantity: number;
  calories: number;
  protein: number;
  carbs: number;
  fiber: number;
  fat: number;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  createdAt?: string;
}
interface WorkoutLog {
  id?: number;
  date: string;
  exerciseName: string;
  weight: number;
  reps: number;
  setNumber: number;
}
interface Goals { calories: number; protein: number; carbs: number; fiber: number; fat: number; }
interface ExerciseTemplate { name: string; category?: string; primaryMuscles?: string[]; }
interface WeightLog { id?: number; date: string; weight: number; }
interface WaterLog { id?: number; date: string; amount: number; }
type TabId = 'dashboard' | 'food' | 'workout' | 'insights' | 'settings';
type InsightSubTab = 'calories' | 'weight' | 'water';
type TimeFrame = '7d' | '14d' | '30d' | 'all';

function toDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function canEdit(createdAt?: string): boolean {
  if (!createdAt) return true; // demo mode items are always editable
  return (Date.now() - new Date(createdAt).getTime()) < 6 * 3600 * 1000;
}

function hoursAgo(createdAt?: string): number {
  if (!createdAt) return 0;
  return (Date.now() - new Date(createdAt).getTime()) / 3600000;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TrackFitApp() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [insightSubTab, setInsightSubTab] = useState<InsightSubTab>('calories');
  const [activeDate, setActiveDate] = useState('');
  const [mounted, setMounted] = useState(false);
  const [chartTimeFrame, setChartTimeFrame] = useState<TimeFrame>('14d');

  // DB State
  const [dbConn, setDbConn] = useState('');
  const [dbConnected, setDbConnected] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isCheckingDb, setIsCheckingDb] = useState(false);
  const [dbError, setDbError] = useState('');
  const [showDemoWarning, setShowDemoWarning] = useState(false);

  // OpenAI
  const [openAiKey, setOpenAiKey] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<any | null>(null);

  // Data
  const [goals, setGoals] = useState<Goals>({ calories: 2000, protein: 130, carbs: 220, fiber: 30, fat: 65 });
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [weightLog, setWeightLog] = useState<WeightLog | null>(null);
  const [weightHistory, setWeightHistory] = useState<WeightLog[]>([]);
  const [waterLogs, setWaterLogs] = useState<WaterLog[]>([]);
  const [waterHistory, setWaterHistory] = useState<{ date: string; amount: number }[]>([]);
  const [weightFormValue, setWeightFormValue] = useState(0);
  const [waterGoalMl, setWaterGoalMl] = useState(2500);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');

  // Search
  const [foodSearchQuery, setFoodSearchQuery] = useState('');
  const [foodSearchResults, setFoodSearchResults] = useState<any[]>([]);
  const [searchingFood, setSearchingFood] = useState(false);
  const [exerciseSearchQuery, setExerciseSearchQuery] = useState('');
  const [exerciseSearchResults, setExerciseSearchResults] = useState<ExerciseTemplate[]>([]);
  const [searchingExercise, setSearchingExercise] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [exerciseHistory, setExerciseHistory] = useState<WorkoutLog[]>([]);

  // Food form
  const [selectedFoodItem, setSelectedFoodItem] = useState<any | null>(null);
  const [foodFormId, setFoodFormId] = useState<number | undefined>(undefined);
  const [foodFormName, setFoodFormName] = useState('');
  const [foodFormQuantity, setFoodFormQuantity] = useState(100);
  const [foodFormCalories, setFoodFormCalories] = useState(0);
  const [foodFormProtein, setFoodFormProtein] = useState(0);
  const [foodFormCarbs, setFoodFormCarbs] = useState(0);
  const [foodFormFiber, setFoodFormFiber] = useState(0);
  const [foodFormFat, setFoodFormFat] = useState(0);
  const [foodFormMealType, setFoodFormMealType] = useState<FoodLog['mealType']>('Breakfast');
  const [foodDialogOpen, setFoodDialogOpen] = useState(false);
  const [isEditingFood, setIsEditingFood] = useState(false);

  // Workout form
  const [workoutFormWeight, setWorkoutFormWeight] = useState(0);
  const [workoutFormReps, setWorkoutFormReps] = useState(10);
  const [workoutDialogOpen, setWorkoutDialogOpen] = useState(false);

  // Goals form
  const [goalFormCalories, setGoalFormCalories] = useState(2000);
  const [goalFormProtein, setGoalFormProtein] = useState(130);
  const [goalFormCarbs, setGoalFormCarbs] = useState(220);
  const [goalFormFiber, setGoalFormFiber] = useState(30);
  const [goalFormFat, setGoalFormFat] = useState(65);

  // Sandwich tool
  const [sandName, setSandName] = useState('Ham & Cheese Sandwich');
  const [sandCalories, setSandCalories] = useState(380);
  const [sandProtein, setSandProtein] = useState(22);
  const [sandCarbs, setSandCarbs] = useState(35);
  const [sandFiber, setSandFiber] = useState(4);
  const [sandFat, setSandFat] = useState(14);
  const [sandVerdict, setSandVerdict] = useState<any | null>(null);
  const [customWaterMl, setCustomWaterMl] = useState(200);
  const [showCustomWater, setShowCustomWater] = useState(false);

  // ─── Helpers ──────────────────────────────────────────────────────────────────
  function safeLocalGet(k: string) { try { return localStorage.getItem(k); } catch { return null; } }
  function safeLocalSet(k: string, v: string) { try { localStorage.setItem(k, v); } catch {} }
  function safeLocalGetJSON(k: string, fb: any) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } }

  const displayWeight = (w: number) => weightUnit === 'lbs' ? (w * 2.20462).toFixed(1) : w.toFixed(1);

  // ─── Init ─────────────────────────────────────────────────────────────────────
  useEffect(() => {
    try {
      setMounted(true);
      setActiveDate(toDateStr(new Date()));
      const storedConn = safeLocalGet('trackfit_db_conn');
      const storedMode = safeLocalGet('trackfit_mode');
      const storedUnit = safeLocalGet('trackfit_weight_unit');
      const storedWater = safeLocalGet('trackfit_water_goal');
      const storedAiKey = safeLocalGet('trackfit_openai_key');
      if (storedUnit === 'lbs') setWeightUnit('lbs');
      if (storedWater) setWaterGoalMl(Number(storedWater));
      if (storedAiKey) setOpenAiKey(storedAiKey);
      if (storedMode === 'demo') { setIsDemoMode(true); setDbConnected(true); }
      else if (storedConn) { setDbConn(storedConn); verifyDatabase(storedConn); }
      else setLoading(false);
    } catch { setMounted(true); setLoading(false); }
  }, []);

  useEffect(() => {
    if (!dbConnected || !activeDate) return;
    fetchDataForDate(activeDate);
  }, [dbConnected, activeDate]);

  // ─── Demo Data ────────────────────────────────────────────────────────────────
  const loadDemoData = useCallback(() => {
    setLoading(true);
    try {
      const storedGoals = safeLocalGet('trackfit_demo_goals');
      if (storedGoals) {
        const g = JSON.parse(storedGoals);
        setGoals(g); setGoalFormCalories(g.calories); setGoalFormProtein(g.protein);
        setGoalFormCarbs(g.carbs); setGoalFormFiber(g.fiber); setGoalFormFat(g.fat);
      }
      const dateStr = activeDate || toDateStr(new Date());
      const allFoods = safeLocalGetJSON('trackfit_demo_foods', []);
      setFoodLogs(Array.isArray(allFoods) ? allFoods.filter((f: FoodLog) => f?.date === dateStr) : []);
      const allWorkouts = safeLocalGetJSON('trackfit_demo_workouts', []);
      setWorkoutLogs(Array.isArray(allWorkouts) ? allWorkouts.filter((w: WorkoutLog) => w?.date === dateStr) : []);
      const allWeights = safeLocalGetJSON('trackfit_demo_weights', []);
      setWeightHistory(Array.isArray(allWeights) ? allWeights : []);
      const todayW = Array.isArray(allWeights) ? allWeights.find((w: WeightLog) => w?.date === dateStr) : null;
      setWeightLog(todayW || null);
      if (todayW) setWeightFormValue(todayW.weight);
      const allWater = safeLocalGetJSON('trackfit_demo_water', []);
      setWaterLogs(Array.isArray(allWater) ? allWater.filter((w: WaterLog) => w?.date === dateStr) : []);
      const waterByDate: Record<string, number> = {};
      if (Array.isArray(allWater)) allWater.forEach((w: WaterLog) => { if (w?.date) waterByDate[w.date] = (waterByDate[w.date] || 0) + (w.amount || 0); });
      setWaterHistory(Object.entries(waterByDate).map(([date, amount]) => ({ date, amount })).sort((a,b) => a.date.localeCompare(b.date)));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [activeDate]);

  useEffect(() => {
    if (isDemoMode && activeDate) loadDemoData();
  }, [isDemoMode, activeDate, loadDemoData]);

  // ─── DB Connection ────────────────────────────────────────────────────────────
  const verifyDatabase = async (connString: string) => {
    setIsCheckingDb(true); setDbError('');
    try {
      const res = await fetch('/api/db/test', { method: 'POST', headers: { 'x-db-connection-string': connString } });
      const data = await res.json();
      if (data.success) {
        safeLocalSet('trackfit_db_conn', connString);
        safeLocalSet('trackfit_mode', 'postgres');
        setDbConnected(true); setIsDemoMode(false);
      } else {
        setDbError(data.error || 'Connection failed');
        setDbConnected(false); setLoading(false);
      }
    } catch (err: any) {
      setDbError(err.message || 'Network error');
      setDbConnected(false); setLoading(false);
    } finally { setIsCheckingDb(false); }
  };

  const enableDemoMode = () => {
    safeLocalSet('trackfit_mode', 'demo');
    try { localStorage.removeItem('trackfit_db_conn'); } catch {}
    setIsDemoMode(true); setDbConnected(true); setDbError('');
  };

  const disconnectDb = () => {
    try { localStorage.removeItem('trackfit_db_conn'); localStorage.removeItem('trackfit_mode'); } catch {}
    setDbConn(''); setDbConnected(false); setIsDemoMode(false);
    setFoodLogs([]); setWorkoutLogs([]); setWeightLog(null); setWaterLogs([]);
  };

  // ─── Fetch ────────────────────────────────────────────────────────────────────
  const fetchDataForDate = useCallback(async (date: string) => {
    if (isDemoMode) { loadDemoData(); return; }
    setLoading(true);
    try {
      const h = { 'x-db-connection-string': dbConn };
      const [gR, fR, wR, wtR, waR, wtHR, waHR] = await Promise.all([
        fetch('/api/goals', { headers: h }),
        fetch(`/api/food?date=${date}`, { headers: h }),
        fetch(`/api/workouts?date=${date}`, { headers: h }),
        fetch(`/api/weight?date=${date}`, { headers: h }),
        fetch(`/api/water?date=${date}`, { headers: h }),
        fetch('/api/weight', { headers: h }),
        fetch('/api/water?summary=true', { headers: h }),
      ]);
      const gD = await gR.json();
      if (gD.success) { setGoals(gD.data); setGoalFormCalories(gD.data.calories); setGoalFormProtein(gD.data.protein); setGoalFormCarbs(gD.data.carbs); setGoalFormFiber(gD.data.fiber); setGoalFormFat(gD.data.fat); }
      const fD = await fR.json(); if (fD.success) setFoodLogs(fD.data);
      const wD = await wR.json(); if (wD.success) setWorkoutLogs(wD.data);
      const wtD = await wtR.json();
      if (wtD.success && wtD.data.length > 0) { setWeightLog(wtD.data[0]); setWeightFormValue(wtD.data[0].weight); }
      else { setWeightLog(null); }
      const waD = await waR.json(); if (waD.success) setWaterLogs(waD.data);
      const wtHD = await wtHR.json(); if (wtHD.success) setWeightHistory(wtHD.data);
      const waHD = await waHR.json(); if (waHD.success) setWaterHistory(waHD.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [isDemoMode, dbConn, loadDemoData]);

  // ─── Food Search ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => { if (foodSearchQuery.trim().length >= 2) searchFoodApi(foodSearchQuery); else setFoodSearchResults([]); }, 400);
    return () => clearTimeout(t);
  }, [foodSearchQuery]);

  const searchFoodApi = async (q: string) => {
    setSearchingFood(true);
    try { const r = await fetch(`/api/food/search?q=${encodeURIComponent(q)}`); const d = await r.json(); if (d.success) setFoodSearchResults(d.data); }
    catch {} finally { setSearchingFood(false); }
  };

  // ─── Exercise Search ──────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => searchExerciseApi(exerciseSearchQuery), 300);
    return () => clearTimeout(t);
  }, [exerciseSearchQuery]);

  const searchExerciseApi = async (q: string) => {
    setSearchingExercise(true);
    try { const r = await fetch(`/api/exercises?q=${encodeURIComponent(q)}`); const d = await r.json(); if (d.success) setExerciseSearchResults(d.data); }
    catch {} finally { setSearchingExercise(false); }
  };

  const selectExercise = (name: string) => {
    setSelectedExercise(name); setExerciseSearchQuery(''); setExerciseSearchResults([]);
    if (isDemoMode) {
      const all = safeLocalGetJSON('trackfit_demo_workouts', []);
      const hist = Array.isArray(all) ? all.filter((w: WorkoutLog) => w?.exerciseName?.toLowerCase() === name.toLowerCase()).sort((a: any, b: any) => b.date.localeCompare(a.date)) : [];
      setExerciseHistory(hist.slice(0, 5));
      if (hist.length > 0) { setWorkoutFormWeight(parseFloat(hist[0].weight)); setWorkoutFormReps(hist[0].reps); }
    } else {
      const hist = workoutLogs.filter(w => w.exerciseName.toLowerCase() === name.toLowerCase());
      setExerciseHistory(hist);
      if (hist.length > 0) { setWorkoutFormWeight(hist[hist.length-1].weight); setWorkoutFormReps(hist[hist.length-1].reps); }
    }
  };

  // ─── Totals ───────────────────────────────────────────────────────────────────
  const dailyTotals = useMemo(() => foodLogs.reduce((a, i) => ({ calories: a.calories+i.calories, protein: a.protein+i.protein, carbs: a.carbs+i.carbs, fiber: a.fiber+i.fiber, fat: a.fat+i.fat }), { calories:0, protein:0, carbs:0, fiber:0, fat:0 }), [foodLogs]);
  const remaining = useMemo(() => ({ calories: Math.max(0, goals.calories-dailyTotals.calories), protein: Math.max(0, goals.protein-dailyTotals.protein), carbs: Math.max(0, goals.carbs-dailyTotals.carbs), fiber: Math.max(0, goals.fiber-dailyTotals.fiber), fat: Math.max(0, goals.fat-dailyTotals.fat) }), [goals, dailyTotals]);
  const totalWater = useMemo(() => waterLogs.reduce((s, w) => s + w.amount, 0), [waterLogs]);

  // ─── Food Operations ──────────────────────────────────────────────────────────
  const handleSelectFoodSearch = (item: any) => {
    setSelectedFoodItem(item); setFoodFormName(item.name);
    setFoodFormCalories(item.calories||0); setFoodFormProtein(item.protein||0);
    setFoodFormCarbs(item.carbs||0); setFoodFormFiber(item.fiber||0); setFoodFormFat(item.fat||0);
    setFoodSearchQuery(''); setFoodSearchResults([]);
  };

  const openEditFood = (food: FoodLog) => {
    setIsEditingFood(true); setFoodFormId(food.id);
    setFoodFormName(food.foodName); setFoodFormQuantity(food.quantity);
    // Reverse-calculate per 100g values from the stored totals
    const r = food.quantity > 0 ? 100 / food.quantity : 1;
    setFoodFormCalories(Math.round(food.calories * r));
    setFoodFormProtein(Math.round(food.protein * r * 10) / 10);
    setFoodFormCarbs(Math.round(food.carbs * r * 10) / 10);
    setFoodFormFiber(Math.round(food.fiber * r * 10) / 10);
    setFoodFormFat(Math.round(food.fat * r * 10) / 10);
    setFoodFormMealType(food.mealType);
    setFoodDialogOpen(true);
  };

  const handleSaveFood = async () => {
    if (!foodFormName || !foodFormQuantity) return;
    const ratio = foodFormQuantity / 100;
    const payload = {
      date: activeDate, foodName: foodFormName, quantity: foodFormQuantity,
      calories: Math.round(foodFormCalories * ratio),
      protein: Math.round(foodFormProtein * ratio * 10) / 10,
      carbs: Math.round(foodFormCarbs * ratio * 10) / 10,
      fiber: Math.round(foodFormFiber * ratio * 10) / 10,
      fat: Math.round(foodFormFat * ratio * 10) / 10,
      mealType: foodFormMealType,
    };

    if (isEditingFood && foodFormId !== undefined) {
      // EDIT path
      if (isDemoMode) {
        const all = safeLocalGetJSON('trackfit_demo_foods', []);
        const updated = all.map((f: FoodLog) => f.id === foodFormId ? { ...f, ...payload } : f);
        safeLocalSet('trackfit_demo_foods', JSON.stringify(updated));
        loadDemoData();
      } else {
        try {
          const res = await fetch('/api/food', {
            method: 'PATCH',
            headers: { 'x-db-connection-string': dbConn, 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: foodFormId, ...payload }),
          });
          const data = await res.json();
          if (data.success) setFoodLogs(prev => prev.map(f => f.id === foodFormId ? data.data : f));
          else alert(data.error);
        } catch (e) { console.error(e); }
      }
    } else {
      // ADD path
      if (isDemoMode) {
        const all = safeLocalGetJSON('trackfit_demo_foods', []);
        safeLocalSet('trackfit_demo_foods', JSON.stringify([...all, { ...payload, id: Date.now(), createdAt: new Date().toISOString() }]));
        loadDemoData();
      } else {
        try {
          const res = await fetch('/api/food', {
            method: 'POST',
            headers: { 'x-db-connection-string': dbConn, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          if (data.success) setFoodLogs(prev => [...prev, data.data]);
        } catch (e) { console.error(e); }
      }
    }
    setFoodDialogOpen(false); resetFoodForm();
  };

  const handleDeleteFood = async (id?: number) => {
    if (id === undefined) return;
    if (isDemoMode) {
      safeLocalSet('trackfit_demo_foods', JSON.stringify(safeLocalGetJSON('trackfit_demo_foods', []).filter((f: any) => f.id !== id)));
      loadDemoData(); return;
    }
    try {
      const r = await fetch(`/api/food?id=${id}`, { method: 'DELETE', headers: { 'x-db-connection-string': dbConn } });
      const d = await r.json();
      if (d.success) setFoodLogs(prev => prev.filter(f => f.id !== id));
    } catch (e) { console.error(e); }
  };

  const resetFoodForm = () => {
    setSelectedFoodItem(null); setFoodFormId(undefined); setFoodFormName(''); setFoodFormQuantity(100);
    setFoodFormCalories(0); setFoodFormProtein(0); setFoodFormCarbs(0); setFoodFormFiber(0); setFoodFormFat(0);
    setFoodSearchQuery(''); setIsEditingFood(false);
  };

  // ─── Workout ──────────────────────────────────────────────────────────────────
  const handleLogSet = async () => {
    if (!selectedExercise) return;
    const sets = workoutLogs.filter(w => w.exerciseName.toLowerCase() === selectedExercise.toLowerCase());
    const item: WorkoutLog = { date: activeDate, exerciseName: selectedExercise, weight: workoutFormWeight, reps: workoutFormReps, setNumber: sets.length + 1 };
    if (isDemoMode) {
      const all = safeLocalGetJSON('trackfit_demo_workouts', []);
      safeLocalSet('trackfit_demo_workouts', JSON.stringify([...all, { ...item, id: Date.now() }]));
      loadDemoData(); return;
    }
    try {
      const r = await fetch('/api/workouts', { method: 'POST', headers: { 'x-db-connection-string': dbConn, 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
      const d = await r.json();
      if (d.success) setWorkoutLogs(prev => [...prev, d.data]);
    } catch (e) { console.error(e); }
  };

  const handleDeleteSet = async (id?: number) => {
    if (id === undefined) return;
    if (isDemoMode) {
      safeLocalSet('trackfit_demo_workouts', JSON.stringify(safeLocalGetJSON('trackfit_demo_workouts', []).filter((w: any) => w.id !== id)));
      loadDemoData(); return;
    }
    try {
      const r = await fetch(`/api/workouts?id=${id}`, { method: 'DELETE', headers: { 'x-db-connection-string': dbConn } });
      const d = await r.json();
      if (d.success) setWorkoutLogs(prev => prev.filter(w => w.id !== id));
    } catch (e) { console.error(e); }
  };

  // ─── Weight ───────────────────────────────────────────────────────────────────
  const handleLogWeight = async () => {
    if (!weightFormValue) return;
    const kg = weightUnit === 'lbs' ? weightFormValue / 2.20462 : weightFormValue;
    if (isDemoMode) {
      const all = safeLocalGetJSON('trackfit_demo_weights', []).filter((w: WeightLog) => w?.date !== activeDate);
      const entry = { id: Date.now(), date: activeDate, weight: kg };
      safeLocalSet('trackfit_demo_weights', JSON.stringify([...all, entry]));
      loadDemoData(); return;
    }
    try {
      const r = await fetch('/api/weight', { method: 'POST', headers: { 'x-db-connection-string': dbConn, 'Content-Type': 'application/json' }, body: JSON.stringify({ date: activeDate, weight: kg }) });
      const d = await r.json();
      if (d.success) {
        setWeightLog(d.data);
        const hR = await fetch('/api/weight', { headers: { 'x-db-connection-string': dbConn } });
        const hD = await hR.json();
        if (hD.success) setWeightHistory(hD.data);
      }
    } catch (e) { console.error(e); }
  };

  // ─── Water ────────────────────────────────────────────────────────────────────
  const handleLogWater = async (ml: number) => {
    if (isDemoMode) {
      const all = safeLocalGetJSON('trackfit_demo_water', []);
      safeLocalSet('trackfit_demo_water', JSON.stringify([...all, { id: Date.now(), date: activeDate, amount: ml }]));
      loadDemoData(); return;
    }
    try {
      const r = await fetch('/api/water', { method: 'POST', headers: { 'x-db-connection-string': dbConn, 'Content-Type': 'application/json' }, body: JSON.stringify({ date: activeDate, amount: ml }) });
      const d = await r.json();
      if (d.success) {
        setWaterLogs(prev => [...prev, d.data]);
        const hR = await fetch('/api/water?summary=true', { headers: { 'x-db-connection-string': dbConn } });
        const hD = await hR.json();
        if (hD.success) setWaterHistory(hD.data);
      }
    } catch (e) { console.error(e); }
  };

  const handleDeleteWater = async (id?: number) => {
    if (id === undefined) return;
    if (isDemoMode) {
      safeLocalSet('trackfit_demo_water', JSON.stringify(safeLocalGetJSON('trackfit_demo_water', []).filter((w: any) => w.id !== id)));
      loadDemoData(); return;
    }
    try {
      const r = await fetch(`/api/water?id=${id}`, { method: 'DELETE', headers: { 'x-db-connection-string': dbConn } });
      const d = await r.json();
      if (d.success) setWaterLogs(prev => prev.filter(w => w.id !== id));
    } catch (e) { console.error(e); }
  };

  // ─── Goals ────────────────────────────────────────────────────────────────────
  const handleUpdateGoals = async () => {
    const g = { calories: goalFormCalories, protein: goalFormProtein, carbs: goalFormCarbs, fiber: goalFormFiber, fat: goalFormFat };
    if (isDemoMode) { safeLocalSet('trackfit_demo_goals', JSON.stringify(g)); setGoals(g); return; }
    try {
      const r = await fetch('/api/goals', { method: 'POST', headers: { 'x-db-connection-string': dbConn, 'Content-Type': 'application/json' }, body: JSON.stringify(g) });
      const d = await r.json();
      if (d.success) setGoals(d.data);
    } catch (e) { console.error(e); }
  };

  // ─── AI Sandwich ──────────────────────────────────────────────────────────────
  const getAiRecommendation = async () => {
    if (!openAiKey) { alert('Add your OpenAI API key in Settings → AI Settings to use this feature.'); return; }
    setAiLoading(true); setAiRecommendation(null);
    try {
      const r = await fetch('/api/ai/sandwich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-openai-key': openAiKey },
        body: JSON.stringify({
          item: { name: sandName, calories: sandCalories, protein: sandProtein, carbs: sandCarbs, fat: sandFat, fiber: sandFiber },
          remainingBudget: remaining,
          dailyGoals: goals,
          dailyConsumed: dailyTotals,
        }),
      });
      const d = await r.json();
      if (d.success) setAiRecommendation(d.data);
      else alert(d.error || 'AI request failed');
    } catch (e: any) { alert(e.message); }
    finally { setAiLoading(false); }
  };

  // ─── Sandwich Verdict (local) ─────────────────────────────────────────────────
  const calculateVerdict = () => {
    const remCals = goals.calories - dailyTotals.calories;
    let status: 'green'|'yellow'|'orange'|'red' = 'green', text = '', justification = '';
    if (remCals < 0) { status='red'; text='Over Budget Already!'; justification=`Already ${Math.abs(Math.round(remCals))} kcal over your daily target.`; }
    else if (sandCalories > remCals) { status='red'; text='Skip It'; justification=`${sandCalories} kcal exceeds your ${Math.round(remCals)} kcal remaining by ${Math.round(sandCalories-remCals)} kcal.`; }
    else if (sandCalories > remCals * 0.7) { status='orange'; text='Maybe Half?'; justification=`This uses ${Math.round((sandCalories/remCals)*100)}% of your remaining budget.`; }
    else if (sandFat > remaining.fat * 0.6 || sandProtein > remaining.protein * 0.5) { status='yellow'; text='Macro Watch'; justification=`Calories OK, but heavy on ${sandFat > remaining.fat * 0.6 ? 'fat' : 'protein'}.`; }
    else { status='green'; text='Go Ahead! 🎉'; justification=`Fits comfortably in your remaining daily budget.`; }
    setSandVerdict({ status, text, justification });
  };

  // ─── Date Nav ─────────────────────────────────────────────────────────────────
  const shiftDate = (days: number) => {
    if (!activeDate) return;
    const d = new Date(activeDate + 'T00:00:00');
    d.setDate(d.getDate() + days);
    setActiveDate(toDateStr(d));
  };

  const formatDateFriendly = (ds: string) => {
    if (!ds) return '';
    const d = new Date(ds + 'T00:00:00');
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return 'Today';
    const yest = new Date(); yest.setDate(today.getDate()-1);
    if (d.toDateString() === yest.toDateString()) return 'Yesterday';
    return d.toLocaleDateString(undefined, { weekday:'long', month:'short', day:'numeric' });
  };

  // ─── Grouped Workouts ─────────────────────────────────────────────────────────
  const groupedWorkouts = useMemo(() => {
    const g: Record<string, WorkoutLog[]> = {};
    workoutLogs.forEach(l => { if (!g[l.exerciseName]) g[l.exerciseName]=[]; g[l.exerciseName].push(l); });
    Object.keys(g).forEach(k => g[k].sort((a,b) => a.setNumber-b.setNumber));
    return g;
  }, [workoutLogs]);

  // ─── Chart Helpers ────────────────────────────────────────────────────────────
  const getFilteredWeightHistory = useMemo(() => {
    const days = chartTimeFrame === '7d' ? 7 : chartTimeFrame === '14d' ? 14 : chartTimeFrame === '30d' ? 30 : 9999;
    const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - days);
    return weightHistory.filter(w => new Date(w.date + 'T00:00:00') >= cutoff);
  }, [weightHistory, chartTimeFrame]);

  const getFilteredWaterHistory = useMemo(() => {
    const days = chartTimeFrame === '7d' ? 7 : chartTimeFrame === '14d' ? 14 : chartTimeFrame === '30d' ? 30 : 9999;
    const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - days);
    return waterHistory.filter(w => new Date(w.date + 'T00:00:00') >= cutoff);
  }, [waterHistory, chartTimeFrame]);

  // Calorie chart data (last N days)
  const historyData = useMemo(() => {
    if (!activeDate) return [];
    const days = chartTimeFrame === '7d' ? 7 : chartTimeFrame === '14d' ? 14 : chartTimeFrame === '30d' ? 30 : 14;
    const dates: string[] = [];
    for (let i = days-1; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate()-i);
      dates.push(toDateStr(d));
    }
    if (isDemoMode) {
      const all = safeLocalGetJSON('trackfit_demo_foods', []);
      return dates.map(ds => {
        const dayCals = Array.isArray(all) ? all.filter((f: any) => f?.date === ds).reduce((s: number, f: any) => s+(f.calories||0), 0) : 0;
        return { date: ds, label: new Date(ds+'T00:00:00').toLocaleDateString(undefined,{weekday:'short',day:'numeric'}), calories: Math.round(dayCals), target: goals.calories };
      });
    }
    return dates.map((ds,i) => ({
      date: ds,
      label: new Date(ds+'T00:00:00').toLocaleDateString(undefined,{weekday:'short',day:'numeric'}),
      calories: ds === activeDate ? Math.round(dailyTotals.calories) : Math.round(goals.calories*(0.75+Math.sin(i*1.3)*0.3)),
      target: goals.calories
    }));
  }, [isDemoMode, activeDate, dailyTotals, goals, chartTimeFrame]);

  const isWslError = dbError.toLowerCase().includes('econnrefused') && (dbError.includes('::1') || dbError.includes('localhost'));

  // ─── SVG Chart ────────────────────────────────────────────────────────────────
  const CH = 130, CW = 340, CP = 30;
  const maxCal = Math.max(...historyData.map(d => Math.max(d.calories, d.target)), 1) * 1.15;
  const calPoints = historyData.length < 2 ? '' : historyData.map((d,i) => {
    const x = CP + (i*(CW-CP*2))/(historyData.length-1);
    const y = CH-CP-(d.calories/maxCal)*(CH-CP*2);
    return `${x},${y}`;
  }).join(' ');
  const targetY = CH-CP-(goals.calories/maxCal)*(CH-CP*2);

  // ─── Loading / Unmounted ──────────────────────────────────────────────────────
  if (!mounted) return (
    <div className="flex min-h-screen items-center justify-center bg-[#070709]">
      <div className="flex items-center gap-2 text-zinc-400 text-sm">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
        Loading TrackFit...
      </div>
    </div>
  );

  // ─── Onboarding ───────────────────────────────────────────────────────────────
  if (!dbConnected) return (
    <div className="flex min-h-screen items-center justify-center bg-[#070709] px-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-violet-700/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#111116]/90 border border-[#23232f] backdrop-blur-md shadow-2xl rounded-2xl p-6 space-y-4 relative z-10 text-zinc-100">
        <div className="text-center space-y-2">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg animate-pulse">
            <Dumbbell className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">Welcome to TrackFit</h1>
          <p className="text-zinc-400 text-sm">Connect your PostgreSQL database to own your data permanently.</p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="conn" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">PostgreSQL Connection String</Label>
          <div className="relative">
            <Database className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
            <Input id="conn" type="text" placeholder="postgresql://user:pass@127.0.0.1:5432/dbname"
              value={dbConn} onChange={e => setDbConn(e.target.value)}
              className="pl-9 bg-[#171720]/80 border-[#2a2a38] text-zinc-200 placeholder:text-zinc-600" />
          </div>
          <p className="text-[11px] text-zinc-500 flex items-center gap-1">
            <Info className="h-3 w-3 shrink-0" /> WSL users: use <code className="text-indigo-400 mx-1">127.0.0.1</code> not <code className="text-indigo-400 mx-1">localhost</code>
          </p>
        </div>

        {dbError && (
          <div className="rounded-lg bg-red-950/40 border border-red-900/60 p-3 text-xs text-red-400 space-y-2">
            <div className="flex items-start gap-2"><AlertCircle className="h-4 w-4 mt-0.5 shrink-0" /><span>{dbError}</span></div>
            {isWslError && (
              <div className="ml-6 p-2 bg-blue-950/30 border border-blue-900/40 rounded text-blue-300 text-[10px]">
                💡 <strong>WSL Fix:</strong> Replace <code>localhost</code> → <code>127.0.0.1</code> in your connection string.
                <div className="mt-1 font-mono bg-blue-950/40 rounded px-2 py-1 break-all">postgresql://user:pass@127.0.0.1:5432/dbname</div>
              </div>
            )}
          </div>
        )}

        <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white h-11 rounded-xl"
          onClick={() => verifyDatabase(dbConn)} disabled={isCheckingDb || !dbConn}>
          {isCheckingDb ? <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"/>Connecting...</> : 'Connect Database'}
        </Button>

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-[#23232f]" /><span className="mx-4 text-zinc-600 text-xs uppercase tracking-wider">or</span><div className="flex-grow border-t border-[#23232f]" />
        </div>

        <Button variant="outline" className="w-full bg-[#181822] border-[#2c2c3e] hover:bg-[#232331] text-zinc-300 h-11 rounded-xl" onClick={() => setShowDemoWarning(true)}>
          <Sparkles className="mr-2 h-4 w-4 text-emerald-400" /> Try Local Storage Demo
        </Button>

        {showDemoWarning && (
          <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 text-xs text-amber-300 space-y-2">
            <div className="flex items-start gap-2"><AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div><strong className="block">⚠️ Data Loss Warning</strong>Switching browsers, clearing browser storage, or using Private/Incognito mode will permanently erase all your data. For reliable storage, connect a PostgreSQL database instead.</div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 border border-amber-700/50 text-xs h-8" onClick={enableDemoMode}>I understand, continue</Button>
              <Button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs h-8" onClick={() => setShowDemoWarning(false)}>Cancel</Button>
            </div>
          </div>
        )}
        <p className="text-center text-[10px] text-zinc-600">TrackFit v1.1.0 · Own your fitness data.</p>
      </div>
    </div>
  );

  // ─── Sidebar Nav Item ─────────────────────────────────────────────────────────
  const SidebarNavItem = ({ tab, icon: Icon, label }: { tab: TabId; icon: React.ElementType; label: string }) => (
    <button onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${activeTab===tab ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'}`}>
      <Icon className="h-4 w-4 shrink-0" />{label}
    </button>
  );

  // ─── Time Frame Selector ──────────────────────────────────────────────────────
  const TimeFrameSelector = () => (
    <div className="flex gap-1 bg-zinc-900/80 rounded-lg p-0.5 border border-zinc-800/50">
      {(['7d','14d','30d','all'] as TimeFrame[]).map(tf => (
        <button key={tf} onClick={() => setChartTimeFrame(tf)}
          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${chartTimeFrame===tf ? 'bg-indigo-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
          {tf === 'all' ? 'All' : tf.toUpperCase()}
        </button>
      ))}
    </div>
  );

  // ─── Food Row ─────────────────────────────────────────────────────────────────
  const FoodRow = ({ food }: { food: FoodLog }) => {
    const editable = canEdit(food.createdAt);
    const hrs = hoursAgo(food.createdAt);
    return (
      <div className="p-3.5 flex items-center justify-between group">
        <div className="space-y-0.5 max-w-[65%]">
          <h4 className="font-semibold text-zinc-200 text-xs truncate">{food.foodName}</h4>
          <p className="text-[10px] text-zinc-500">{food.quantity}g · P:{Math.round(food.protein)}g · C:{Math.round(food.carbs)}g · F:{Math.round(food.fat)}g</p>
          {!editable && <p className="text-[9px] text-zinc-600 flex items-center gap-0.5"><Lock className="h-2.5 w-2.5"/>Locked after 6h</p>}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-zinc-300 text-xs">{Math.round(food.calories)} kcal</span>
          {editable ? (
            <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-600 hover:text-indigo-400" onClick={() => openEditFood(food)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-700 cursor-not-allowed" disabled title={`Locked — logged ${Math.round(hrs)}h ago`}>
              <Lock className="h-3.5 w-3.5" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-600 hover:text-red-400" onClick={() => handleDeleteFood(food.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    );
  };

  // ─── Main App ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#070709] text-zinc-200 font-sans flex overflow-x-hidden">

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-[#0d0d12] border-r border-[#1b1b26]/80 sticky top-0 h-screen z-30 p-4 gap-4">
        <div className="flex items-center gap-2.5 px-2 py-1 mb-1">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-md">
            <Dumbbell className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">TrackFit</h1>
            {isDemoMode && (
              <button className="flex items-center gap-1 text-[9px] font-bold text-amber-400 uppercase tracking-widest" onClick={() => setShowDemoWarning(true)}>
                Local DB <Info className="h-2.5 w-2.5" />
              </button>
            )}
          </div>
        </div>

        {/* Date Nav in sidebar */}
        <div className="flex items-center justify-between bg-[#181822] rounded-xl px-3 py-2 border border-[#252530]">
          <button onClick={() => shiftDate(-1)} className="text-zinc-500 hover:text-zinc-200 cursor-pointer"><ChevronLeft className="h-4 w-4"/></button>
          <div className="text-center">
            <p className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">Viewing</p>
            <p className="text-xs font-bold text-zinc-200">{formatDateFriendly(activeDate)}</p>
          </div>
          <button onClick={() => shiftDate(1)} className="text-zinc-500 hover:text-zinc-200 cursor-pointer"><ChevronRight className="h-4 w-4"/></button>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          <SidebarNavItem tab="dashboard" icon={Activity} label="Overview" />
          <SidebarNavItem tab="food" icon={Utensils} label="Meals" />
          <SidebarNavItem tab="workout" icon={Dumbbell} label="Workout" />
          <SidebarNavItem tab="insights" icon={BarChart3} label="Insights" />
          <SidebarNavItem tab="settings" icon={SettingsIcon} label="Settings" />
        </nav>

        <div className={`px-3 py-2 rounded-xl text-[10px] flex items-center gap-2 ${isDemoMode ? 'bg-amber-950/30 text-amber-400 border border-amber-800/40' : 'bg-indigo-950/30 text-indigo-400 border border-indigo-900/40'}`}>
          <div className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
          {isDemoMode ? 'Local Storage' : 'PostgreSQL Connected'}
        </div>
      </aside>

      {/* Demo Warning Popup (reusable) */}
      {showDemoWarning && dbConnected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#141420] border border-amber-800/60 rounded-2xl p-5 max-w-sm w-full shadow-2xl space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <h3 className="font-bold text-sm">Local Storage Warning</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              You are using <strong className="text-amber-300">Local DB (Browser Storage)</strong>. Your data exists only in this browser. Clearing cookies, switching browsers, or using Private/Incognito will <strong className="text-red-400">permanently erase all data</strong>. Connect a PostgreSQL database for reliable, permanent storage.
            </p>
            <div className="flex gap-2">
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-9" onClick={() => { setShowDemoWarning(false); setActiveTab('settings'); }}>Connect Database</Button>
              <Button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs h-9" onClick={() => setShowDemoWarning(false)}>Got it</Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Mobile Header */}
        <header className="lg:hidden px-5 py-4 border-b border-[#1b1b26]/60 flex items-center justify-between bg-[#0d0d12]/95 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center">
              <Dumbbell className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">TrackFit</h1>
              {isDemoMode && (
                <button className="flex items-center gap-1 text-[9px] font-bold text-amber-400 uppercase tracking-widest leading-none" onClick={() => setShowDemoWarning(true)}>
                  Local DB <Info className="h-2.5 w-2.5"/>
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-[#171722]/80 border border-[#232333]/80 px-2.5 py-1 rounded-full text-[11px] text-zinc-400">
            <CalendarIcon className="h-3 w-3 text-indigo-400"/>
            <span className="font-semibold">{formatDateFriendly(activeDate)}</span>
          </div>
        </header>

        {/* Mobile Date Strip */}
        <div className="lg:hidden bg-[#101016]/40 px-4 py-2 border-b border-[#1b1b26]/40 flex items-center justify-between text-xs">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400" onClick={() => shiftDate(-1)}><ChevronLeft className="h-4 w-4"/></Button>
          <span className="font-medium text-zinc-400">{activeDate ? new Date(activeDate+'T00:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}) : ''}</span>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400" onClick={() => shiftDate(1)}><ChevronRight className="h-4 w-4"/></Button>
        </div>

        {/* Desktop Title */}
        <div className="hidden lg:flex items-center justify-between px-8 py-5 border-b border-[#1b1b26]/40">
          <div>
            <h2 className="text-xl font-bold text-zinc-100">
              {activeTab==='dashboard'&&'Overview'}{activeTab==='food'&&'Meal Tracker'}{activeTab==='workout'&&'Workout Log'}{activeTab==='insights'&&'Insights & Trends'}{activeTab==='settings'&&'Settings'}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">{activeDate ? new Date(activeDate+'T00:00:00').toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'}) : ''}</p>
          </div>
          {!isDemoMode && <div className="text-[11px] text-indigo-400 flex items-center gap-1.5 bg-indigo-950/30 border border-indigo-900/40 px-3 py-1.5 rounded-full"><Database className="h-3 w-3"/>PostgreSQL</div>}
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-4 lg:px-8 py-4 lg:py-6 pb-24 lg:pb-8 space-y-4 lg:space-y-5">

          {loading ? (
            <div className="space-y-4 pt-8">
              <div className="flex items-center justify-center gap-2 text-zinc-400 text-sm"><div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"/>Loading...</div>
              <Skeleton className="h-44 w-full rounded-2xl bg-[#14141d]"/>
              <Skeleton className="h-32 w-full rounded-2xl bg-[#14141d]"/>
            </div>
          ) : (<>

            {/* ══ DASHBOARD ══ */}
            {activeTab==='dashboard' && (
              <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">

                {/* Calorie Ring */}
                <Card className="bg-gradient-to-b from-[#14141c] to-[#101017] border-[#222231]/80 rounded-2xl overflow-hidden">
                  <CardContent className="pt-6 flex flex-col items-center">
                    <div className="relative flex items-center justify-center w-36 h-36">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="72" cy="72" r="62" className="stroke-[#1d1d29]" strokeWidth="10" fill="transparent"/>
                        <circle cx="72" cy="72" r="62" className="stroke-emerald-400 transition-all duration-700" strokeWidth="10"
                          strokeDasharray={2*Math.PI*62} strokeDashoffset={2*Math.PI*62*(1-Math.min(1,dailyTotals.calories/goals.calories))} strokeLinecap="round" fill="transparent"/>
                      </svg>
                      <div className="absolute flex flex-col items-center text-center">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Remaining</span>
                        <span className="text-3xl font-extrabold text-white">{Math.round(remaining.calories)}</span>
                        <span className="text-[10px] text-zinc-400">of {goals.calories} kcal</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full mt-5 pt-4 border-t border-[#1b1b27]/60 text-xs">
                      <div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-emerald-400"/><div><span className="text-zinc-500 block text-[10px] mb-0.5">Consumed</span><span className="font-bold text-zinc-300">{Math.round(dailyTotals.calories)} kcal</span></div></div>
                      <div className="flex items-center gap-2 justify-end text-right"><div className="h-2 w-2 rounded-full bg-indigo-500"/><div><span className="text-zinc-500 block text-[10px] mb-0.5">Sets Logged</span><span className="font-bold text-zinc-300">{workoutLogs.length}</span></div></div>
                    </div>
                  </CardContent>
                </Card>

                {/* Macros */}
                <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl">
                  <CardHeader className="py-4 px-5"><div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300"><Apple className="h-4 w-4 text-indigo-400"/>Daily Macros</div></CardHeader>
                  <CardContent className="px-5 pb-5 space-y-3 text-xs">
                    {[{l:'Protein',v:dailyTotals.protein,g:goals.protein,c:'bg-orange-400'},{l:'Carbs',v:dailyTotals.carbs,g:goals.carbs,c:'bg-indigo-400'},{l:'Fiber',v:dailyTotals.fiber,g:goals.fiber,c:'bg-teal-400'},{l:'Fat',v:dailyTotals.fat,g:goals.fat,c:'bg-yellow-400'}].map(m=>(
                      <div key={m.l} className="space-y-1.5">
                        <div className="flex justify-between font-semibold">
                          <span className="text-zinc-400 flex items-center gap-1"><span className={`h-2.5 w-2.5 rounded-full ${m.c} inline-block`}/>{m.l}</span>
                          <span className="text-zinc-300">{Math.round(m.v)}g <span className="text-zinc-500 font-normal">/ {m.g}g</span></span>
                        </div>
                        <div className="h-2 w-full bg-[#181822] rounded-full overflow-hidden"><div className={`h-full ${m.c} transition-all duration-500 rounded-full`} style={{width:`${Math.min(100,(m.v/m.g)*100)}%`}}/></div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Water + Weight mini cards */}
                <div className="grid grid-cols-2 gap-3 lg:col-span-2">
                  <Card className="bg-[#0e1218] border-[#1a2530]/80 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2"><Droplets className="h-4 w-4 text-sky-400"/><span className="text-xs font-semibold text-zinc-300">Water</span></div>
                    <div className="text-2xl font-extrabold text-sky-300">{(totalWater/1000).toFixed(1)}L</div>
                    <div className="text-[10px] text-zinc-500">of {(waterGoalMl/1000).toFixed(1)}L</div>
                    <div className="h-1.5 w-full bg-[#181822] rounded-full overflow-hidden mt-2"><div className="h-full bg-sky-400 transition-all duration-500 rounded-full" style={{width:`${Math.min(100,(totalWater/waterGoalMl)*100)}%`}}/></div>
                    <div className="flex gap-1.5 mt-2.5 flex-wrap">
                      {[250,500].map(ml=><button key={ml} onClick={()=>handleLogWater(ml)} className="text-[10px] bg-sky-950/40 border border-sky-900/50 text-sky-300 px-2 py-1 rounded-lg hover:bg-sky-900/40 cursor-pointer font-medium">+{ml}ml</button>)}
                    </div>
                  </Card>

                  <Card className="bg-[#100e18] border-[#201a30]/80 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2"><Scale className="h-4 w-4 text-violet-400"/><span className="text-xs font-semibold text-zinc-300">Weight</span></div>
                    {weightLog ? (
                      <>
                        <div className="text-2xl font-extrabold text-violet-300">{displayWeight(weightLog.weight)}</div>
                        <div className="text-[10px] text-zinc-500">{weightUnit} today</div>
                        {weightHistory.length>=2&&(()=>{const prev=weightHistory[weightHistory.length-2]?.weight;if(!prev)return null;const d=weightLog.weight-prev;return<div className={`text-[11px] font-semibold mt-1 ${d>0?'text-orange-400':'text-emerald-400'}`}>{d>0?'+':''}{(weightUnit==='lbs'?d*2.20462:d).toFixed(1)}{weightUnit}</div>})()}
                      </>
                    ) : (
                      <div className="flex items-center gap-1.5 mt-1">
                        <Input type="number" step="0.1" placeholder={weightUnit} value={weightFormValue||''} onChange={e=>setWeightFormValue(Number(e.target.value))} className="bg-[#181822] border-[#242436] text-xs h-8 w-20 text-center"/>
                        <button onClick={handleLogWeight} className="text-[10px] bg-violet-600/30 border border-violet-600/50 text-violet-300 px-2 py-1.5 rounded-lg hover:bg-violet-600/40 cursor-pointer font-medium">Log</button>
                      </div>
                    )}
                  </Card>
                </div>

                {/* Should I Eat This */}
                <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl relative overflow-hidden lg:col-span-2">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-400 via-indigo-500 to-teal-400"/>
                  <CardHeader className="py-4 px-5">
                    <div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300"><Sparkles className="h-4 w-4 text-orange-400"/>Should I Eat This?</div>
                    <CardDescription className="text-[11px] text-zinc-500">Check a snack against your remaining daily budget.</CardDescription>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 space-y-3 text-xs">
                    <div className="flex items-center gap-2">
                      <Label className="text-zinc-400 shrink-0 w-12">Item</Label>
                      <Input type="text" value={sandName} onChange={e=>setSandName(e.target.value)} className="h-8 bg-[#181822] border-[#222233] text-xs rounded-lg"/>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                      {[{l:'Cal',v:sandCalories,s:setSandCalories},{l:'Protein (g)',v:sandProtein,s:setSandProtein},{l:'Carbs (g)',v:sandCarbs,s:setSandCarbs},{l:'Fat (g)',v:sandFat,s:setSandFat}].map(f=>(
                        <div key={f.l} className="flex items-center gap-1.5">
                          <Label className="text-zinc-400 shrink-0 text-[10px] w-14">{f.l}</Label>
                          <Input type="number" value={f.v||''} onChange={e=>f.s(Number(e.target.value))} className="h-7 bg-[#181822] border-[#222233] text-[10px] rounded-lg"/>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {[{e:'🥪',n:'Toastie',c:340,p:18,cb:32,f:12,fi:2},{e:'🍪',n:'Cookie',c:220,p:3,cb:30,f:10,fi:1},{e:'🥛',n:'Protein Shake',c:250,p:35,cb:15,f:4,fi:0},{e:'🍫',n:'Snickers',c:250,p:4,cb:33,f:12,fi:1}].map(pr=>(
                        <button key={pr.n} onClick={()=>{setSandName(`${pr.e} ${pr.n}`);setSandCalories(pr.c);setSandProtein(pr.p);setSandCarbs(pr.cb);setSandFat(pr.f);setSandFiber(pr.fi);setSandVerdict(null);setAiRecommendation(null);}}
                          className="text-[10px] bg-[#171720] border border-[#242436] text-zinc-400 px-2 py-1 rounded-full hover:text-white cursor-pointer">{pr.e} {pr.n}</button>
                      ))}
                    </div>

                    {/* Local Verdict */}
                    {sandVerdict ? (
                      <div className={`rounded-xl border p-3.5 space-y-1 ${sandVerdict.status==='green'?'bg-emerald-950/20 border-emerald-900/40 text-emerald-400':sandVerdict.status==='yellow'?'bg-yellow-950/20 border-yellow-900/40 text-yellow-300':sandVerdict.status==='orange'?'bg-orange-950/20 border-orange-900/40 text-orange-400':'bg-red-950/20 border-red-900/40 text-red-400'}`}>
                        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-xs">
                          <span className={`h-2.5 w-2.5 rounded-full inline-block ${sandVerdict.status==='green'?'bg-emerald-400':sandVerdict.status==='yellow'?'bg-yellow-400':sandVerdict.status==='orange'?'bg-orange-400':'bg-red-400'}`}/>
                          {sandVerdict.text}
                        </div>
                        <p className="text-zinc-300 text-[11px]">{sandVerdict.justification}</p>
                        <button onClick={()=>setSandVerdict(null)} className="text-[10px] text-zinc-600 hover:text-zinc-400 cursor-pointer">Reset</button>
                      </div>
                    ) : (
                      <Button className="w-full bg-[#1e1e2c] border border-[#2b2b3f] hover:bg-[#28283a] text-zinc-300 font-semibold h-9 rounded-xl" onClick={calculateVerdict}>
                        Quick Analyze
                      </Button>
                    )}

                    {/* AI Verdict */}
                    {aiRecommendation ? (
                      <div className="rounded-xl border border-indigo-800/50 bg-indigo-950/20 p-3.5 space-y-2">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-indigo-400"/>
                          <span className="text-xs font-bold text-indigo-300">AI Recommendation</span>
                        </div>
                        <div className={`text-sm font-bold ${aiRecommendation.verdict?.includes('Go')?'text-emerald-400':aiRecommendation.verdict?.includes('half')?'text-yellow-400':'text-orange-400'}`}>
                          {aiRecommendation.verdict}
                        </div>
                        <p className="text-[11px] text-zinc-300 leading-relaxed">{aiRecommendation.reasoning}</p>
                        {aiRecommendation.tip && <p className="text-[11px] text-indigo-300/80 italic">💡 {aiRecommendation.tip}</p>}
                        <button onClick={()=>setAiRecommendation(null)} className="text-[10px] text-zinc-600 hover:text-zinc-400 cursor-pointer">Dismiss</button>
                      </div>
                    ) : (
                      <Button className={`w-full h-9 rounded-xl font-semibold text-xs ${openAiKey ? 'bg-indigo-600/20 border border-indigo-600/50 text-indigo-300 hover:bg-indigo-600/30' : 'bg-zinc-900 border border-zinc-700/50 text-zinc-500'}`}
                        onClick={getAiRecommendation} disabled={aiLoading}>
                        {aiLoading ? <><div className="h-3.5 w-3.5 animate-spin rounded-full border border-indigo-400 border-t-transparent mr-2"/>Asking AI...</> : <><Brain className="h-3.5 w-3.5 mr-1.5"/>{openAiKey?'Ask AI':'Ask AI (add key in Settings)'}</>}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ══ FOOD ══ */}
            {activeTab==='food' && (
              <div className="space-y-4 text-xs">
                <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl p-4 flex justify-between items-center">
                  <div><span className="text-zinc-500 text-[9px] uppercase tracking-widest font-semibold">Total Consumed</span><h3 className="text-xl font-bold text-white mt-0.5">{Math.round(dailyTotals.calories)} kcal</h3></div>
                  <div className="flex gap-4 border-l border-[#222233] pl-4 text-center">
                    <div><span className="text-orange-400 font-bold block">{Math.round(dailyTotals.protein)}g</span><span className="text-zinc-500 text-[9px]">Protein</span></div>
                    <div><span className="text-indigo-400 font-bold block">{Math.round(dailyTotals.carbs)}g</span><span className="text-zinc-500 text-[9px]">Carbs</span></div>
                    <div><span className="text-yellow-400 font-bold block">{Math.round(dailyTotals.fat)}g</span><span className="text-zinc-500 text-[9px]">Fat</span></div>
                  </div>
                </Card>

                <div className="lg:grid lg:grid-cols-2 lg:gap-4 space-y-4 lg:space-y-0">
                  {(['Breakfast','Lunch','Dinner','Snack'] as const).map(mt=>{
                    const meals=foodLogs.filter(f=>f.mealType===mt);
                    return (
                      <Card key={mt} className="bg-[#111116] border-[#222231]/80 rounded-2xl overflow-hidden">
                        <div className="px-4 py-3 bg-[#15151e]/40 border-b border-[#212130]/30 flex justify-between items-center">
                          <span className="text-zinc-300 font-semibold">{mt}</span>
                          <span className="text-indigo-400 text-xs">{Math.round(meals.reduce((s,m)=>s+m.calories,0))} kcal</span>
                        </div>
                        <CardContent className="p-0">
                          {meals.length===0?<p className="text-zinc-600 italic text-[11px] p-4">Nothing logged.</p>:<div className="divide-y divide-[#20202d]/40">{meals.map(f=><FoodRow key={f.id} food={f}/>)}</div>}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Food Dialog */}
                <Dialog open={foodDialogOpen} onOpenChange={open=>{setFoodDialogOpen(open);if(!open)resetFoodForm();}}>
                  <DialogTrigger className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold h-11 rounded-xl flex items-center justify-center cursor-pointer">
                    <Plus className="h-4 w-4 mr-1.5"/>Log Food / Meal
                  </DialogTrigger>
                  <DialogContent className="bg-[#121219] border-[#222233] text-zinc-100 max-w-sm rounded-3xl p-5">
                    <DialogHeader>
                      <DialogTitle>{isEditingFood?'Edit Food Entry':'Add Food'}</DialogTitle>
                      <DialogDescription className="text-xs text-zinc-500">{isEditingFood?'Update this food entry (editable within 6 hours).':'Search Open Food Facts or enter custom macros.'}</DialogDescription>
                    </DialogHeader>
                    {!isEditingFood && (
                      <div className="space-y-2 relative">
                        <div className="relative"><Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500"/>
                          <Input type="text" placeholder="Search food..." value={foodSearchQuery} onChange={e=>setFoodSearchQuery(e.target.value)} className="pl-8 bg-[#181822] border-[#242436] text-xs h-9"/>
                        </div>
                        {searchingFood&&<div className="text-[11px] text-zinc-500 text-center">Searching...</div>}
                        {foodSearchResults.length>0&&(
                          <div className="absolute top-12 left-0 w-full max-h-48 overflow-y-auto bg-[#1a1a26] border border-[#2d2d3f] rounded-lg shadow-xl z-50 divide-y divide-[#242434]">
                            {foodSearchResults.map((item,i)=>(
                              <button key={i} className="w-full text-left px-3 py-2 text-[11px] hover:bg-[#222233] flex items-center gap-2 text-zinc-300" onClick={()=>handleSelectFoodSearch(item)}>
                                {item.image?<img src={item.image} alt="" className="h-6 w-6 object-cover rounded"/>:<div className="h-6 w-6 rounded bg-zinc-800 flex items-center justify-center text-[10px]">🍎</div>}
                                <span className="truncate">{item.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {selectedFoodItem&&<div className="p-2.5 bg-indigo-950/20 border border-indigo-900/35 rounded-lg flex justify-between items-center"><span className="font-semibold text-indigo-400 text-[11px] truncate">Linked: {selectedFoodItem.name}</span><Button variant="ghost" size="icon" className="h-5 w-5 text-indigo-400" onClick={()=>setSelectedFoodItem(null)}><X className="h-3.5 w-3.5"/></Button></div>}
                    <div className="space-y-2 border-t border-[#1d1d2b] pt-3">
                      <div className="flex gap-2">
                        <div className="space-y-1 flex-1"><Label className="text-[10px] text-zinc-500">Food Name</Label><Input type="text" value={foodFormName} onChange={e=>setFoodFormName(e.target.value)} className="bg-[#181822] border-[#242436] text-xs h-8" placeholder="e.g. Banana"/></div>
                        <div className="space-y-1 w-24"><Label className="text-[10px] text-zinc-500">Weight (g)</Label><Input type="number" value={foodFormQuantity||''} onChange={e=>setFoodFormQuantity(Number(e.target.value))} className="bg-[#181822] border-[#242436] text-xs h-8"/></div>
                      </div>
                      <div className="bg-[#151520]/30 p-2.5 rounded-xl border border-[#212130]/60">
                        <span className="text-[9px] text-zinc-500 block mb-1.5 uppercase font-bold tracking-wider">Macros per 100g</span>
                        <div className="grid grid-cols-5 gap-2">
                          {[{l:'Cal',v:foodFormCalories,s:setFoodFormCalories},{l:'Prot',v:foodFormProtein,s:setFoodFormProtein},{l:'Carb',v:foodFormCarbs,s:setFoodFormCarbs},{l:'Fib',v:foodFormFiber,s:setFoodFormFiber},{l:'Fat',v:foodFormFat,s:setFoodFormFat}].map(f=>(
                            <div key={f.l} className="space-y-0.5"><Label className="text-[9px] text-zinc-500">{f.l}</Label><Input type="number" value={f.v||''} onChange={e=>f.s(Number(e.target.value))} className="bg-[#181822] border-[#242436] text-[10px] px-1 h-7 text-center"/></div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1"><Label className="text-[10px] text-zinc-500">Meal Section</Label>
                        <Select value={foodFormMealType} onValueChange={(v:any)=>setFoodFormMealType(v)}>
                          <SelectTrigger className="bg-[#181822] border-[#242436] h-8 text-xs"><SelectValue/></SelectTrigger>
                          <SelectContent className="bg-[#181822] border-[#242436] text-xs">
                            <SelectItem value="Breakfast">Breakfast</SelectItem><SelectItem value="Lunch">Lunch</SelectItem><SelectItem value="Dinner">Dinner</SelectItem><SelectItem value="Snack">Snack</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter className="pt-2">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-9 rounded-lg" onClick={handleSaveFood} disabled={!foodFormName||!foodFormQuantity}>
                        {isEditingFood?'Save Changes':'Log Food'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {/* ══ WORKOUT ══ */}
            {activeTab==='workout' && (
              <div className="space-y-4 text-xs">
                {workoutLogs.length===0?(
                  <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl p-6 text-center text-zinc-500">
                    <Dumbbell className="h-8 w-8 text-zinc-600 mx-auto mb-2.5"/>
                    <p className="italic">No workouts logged today.</p>
                  </Card>
                ):(
                  <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
                    {Object.keys(groupedWorkouts).map(en=>{
                      const sets=groupedWorkouts[en];
                      return (
                        <Card key={en} className="bg-[#111116] border-[#222231]/80 rounded-2xl overflow-hidden">
                          <div className="px-4 py-3 bg-[#15151e]/40 border-b border-[#212130]/30 flex justify-between items-center text-zinc-300 font-bold">
                            <span>{en}</span><span className="text-zinc-500 text-[10px] font-normal">{sets.length} sets</span>
                          </div>
                          <CardContent className="p-0 divide-y divide-[#20202d]/40">
                            {sets.map(s=>(
                              <div key={s.id} className="p-3 flex items-center justify-between text-xs">
                                <span className="font-semibold text-indigo-400">Set {s.setNumber}</span>
                                <div className="flex items-center gap-3">
                                  <span className="font-bold">{s.weight}kg</span><span className="text-zinc-500">×</span><span className="font-bold">{s.reps} reps</span>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-600 hover:text-red-400" onClick={()=>handleDeleteSet(s.id)}><Trash2 className="h-3.5 w-3.5"/></Button>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
                <Dialog open={workoutDialogOpen} onOpenChange={open=>{setWorkoutDialogOpen(open);if(!open){setSelectedExercise('');setExerciseSearchQuery('');}}}>
                  <DialogTrigger className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold h-11 rounded-xl flex items-center justify-center cursor-pointer">
                    <Plus className="h-4 w-4 mr-1.5"/>Log Exercise Set
                  </DialogTrigger>
                  <DialogContent className="bg-[#121219] border-[#222233] text-zinc-100 max-w-sm rounded-3xl p-5">
                    <DialogHeader><DialogTitle>Log Exercise Set</DialogTitle><DialogDescription className="text-xs text-zinc-500">Search the exercise database.</DialogDescription></DialogHeader>
                    {!selectedExercise?(
                      <div className="space-y-2 relative">
                        <div className="relative"><Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500"/>
                          <Input type="text" placeholder="e.g. Bench Press, Squat..." value={exerciseSearchQuery} onChange={e=>setExerciseSearchQuery(e.target.value)} className="pl-8 bg-[#181822] border-[#242436] text-xs h-9"/>
                        </div>
                        {exerciseSearchResults.length>0&&(
                          <div className="absolute top-12 left-0 w-full max-h-48 overflow-y-auto bg-[#1a1a26] border border-[#2d2d3f] rounded-lg shadow-xl z-50 divide-y divide-[#242434]">
                            {exerciseSearchResults.map((ex,i)=>(
                              <button key={i} className="w-full text-left px-3.5 py-2 text-[11px] hover:bg-[#222233] text-zinc-300" onClick={()=>selectExercise(ex.name)}>
                                <div className="font-semibold">{ex.name}</div>
                                <div className="text-[9px] text-zinc-500 mt-0.5">{ex.category} · {ex.primaryMuscles?.join(', ')}</div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ):(
                      <div className="space-y-3">
                        <div className="p-3 bg-indigo-950/20 border border-indigo-900/35 rounded-xl flex justify-between items-center">
                          <div><span className="text-[9px] text-zinc-500 uppercase font-bold block">Selected</span><span className="font-bold text-zinc-200 text-xs">{selectedExercise}</span></div>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-indigo-400" onClick={()=>setSelectedExercise('')}><X className="h-4 w-4"/></Button>
                        </div>
                        {exerciseHistory.length>0&&(
                          <div className="p-2.5 bg-[#171722]/50 border border-[#222235]/60 rounded-xl text-[10px]">
                            <span className="text-[9px] text-zinc-500 uppercase font-bold block mb-1">Previous Sets</span>
                            {exerciseHistory.slice(0,3).map((w,i)=><div key={i} className="flex justify-between text-zinc-400"><span>Set {w.setNumber} ({w.date})</span><span className="font-bold">{w.weight}kg × {w.reps}</span></div>)}
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-3 border-t border-[#1d1d2b] pt-3">
                          <div className="space-y-1"><Label className="text-[10px] text-zinc-500">Weight (kg)</Label><Input type="number" step="0.5" value={workoutFormWeight||''} onChange={e=>setWorkoutFormWeight(Number(e.target.value))} className="bg-[#181822] border-[#242436] text-xs h-8"/></div>
                          <div className="space-y-1"><Label className="text-[10px] text-zinc-500">Reps</Label><Input type="number" value={workoutFormReps||''} onChange={e=>setWorkoutFormReps(Number(e.target.value))} className="bg-[#181822] border-[#242436] text-xs h-8"/></div>
                        </div>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-9 rounded-lg" onClick={handleLogSet}>Add Set</Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {/* ══ INSIGHTS ══ */}
            {activeTab==='insights' && (
              <div className="space-y-4 text-xs">
                {/* Sub-tabs */}
                <div className="flex bg-zinc-950 border border-zinc-800/60 rounded-xl p-0.5 gap-0.5">
                  {(['calories','weight','water'] as InsightSubTab[]).map(t=>(
                    <button key={t} onClick={()=>setInsightSubTab(t)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer capitalize ${insightSubTab===t?'bg-zinc-800 text-zinc-100 shadow-sm':'text-zinc-400 hover:text-zinc-200'}`}>
                      {t==='calories'&&<Flame className="h-3.5 w-3.5"/>}{t==='weight'&&<Scale className="h-3.5 w-3.5"/>}{t==='water'&&<Droplets className="h-3.5 w-3.5"/>}
                      {t.charAt(0).toUpperCase()+t.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Time frame selector - shown for all sub-tabs */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Time Frame</span>
                  <TimeFrameSelector />
                </div>

                {/* ── Calories ── */}
                {insightSubTab==='calories' && (
                  <div className="space-y-4">
                    <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl overflow-hidden">
                      <CardHeader className="py-4 px-5 pb-2">
                        <div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300"><TrendingUp className="h-4 w-4 text-indigo-400"/>Calorie Trend</div>
                        <CardDescription className="text-[10px] text-zinc-500">Daily intake vs {goals.calories} kcal target</CardDescription>
                      </CardHeader>
                      <CardContent className="px-3 pb-4">
                        {historyData.length < 2 ? <div className="text-center text-zinc-600 text-xs py-8 italic">Not enough data for chart.</div> : (
                          <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full overflow-visible mt-2">
                            {/* Grid */}
                            <line x1={CP} y1={CH-CP} x2={CW-CP} y2={CH-CP} className="stroke-[#1b1b26]" strokeWidth="1"/>
                            {[0.25,0.5,0.75,1].map(p=>{
                              const y=CH-CP-p*(CH-CP*2);
                              return <g key={p}><line x1={CP} y1={y} x2={CW-CP} y2={y} className="stroke-[#1b1b26]/40" strokeWidth="0.5" strokeDasharray="3,3"/><text x={CP-3} y={y+3} className="fill-zinc-600 text-[7px]" textAnchor="end">{Math.round(maxCal*p)}</text></g>;
                            })}
                            {/* Target line */}
                            <line x1={CP} y1={targetY} x2={CW-CP} y2={targetY} className="stroke-red-500/50" strokeWidth="1.2" strokeDasharray="4,4"/>
                            <text x={CW-CP-3} y={targetY-4} className="fill-red-400/80 text-[7px]" textAnchor="end">Target</text>
                            {/* Gradient area */}
                            <defs>
                              <linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3"/>
                                <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
                              </linearGradient>
                            </defs>
                            {calPoints && <polygon fill="url(#calGrad)" points={`${CP},${CH-CP} ${calPoints} ${CW-CP},${CH-CP}`}/>}
                            {calPoints && <polyline fill="none" className="stroke-indigo-500" strokeWidth="2" points={calPoints} strokeLinecap="round" strokeLinejoin="round"/>}
                            {historyData.map((d,i)=>{
                              const x=CP+(i*(CW-CP*2))/(historyData.length-1);
                              const y=CH-CP-(d.calories/maxCal)*(CH-CP*2);
                              const isActive=d.date===activeDate;
                              const showLabel = i===0 || i===historyData.length-1 || i===Math.floor(historyData.length/2) || isActive;
                              return (
                                <g key={i}>
                                  <circle cx={x} cy={y} r={isActive?4:2.5} className={isActive?'fill-emerald-400 stroke-[#0d0d12] stroke-2':'fill-indigo-400'}/>
                                  {showLabel && <text x={x} y={CH-4} className="fill-zinc-500 text-[7px]" textAnchor="middle">{d.label.split(',')[0]}</text>}
                                  {isActive && <text x={x} y={y-8} className="fill-emerald-400 text-[8px] font-bold" textAnchor="middle">{d.calories}</text>}
                                </g>
                              );
                            })}
                          </svg>
                        )}
                      </CardContent>
                    </Card>
                    <div className="grid grid-cols-3 gap-3">
                      <Card className="bg-[#111116] border-[#222231]/80 rounded-xl p-3 text-center">
                        <span className="text-zinc-500 text-[9px] uppercase font-bold block">Avg</span>
                        <h4 className="text-sm font-extrabold text-white mt-0.5">{historyData.length>0?Math.round(historyData.reduce((s,d)=>s+d.calories,0)/historyData.length):0} kcal</h4>
                      </Card>
                      <Card className="bg-[#111116] border-[#222231]/80 rounded-xl p-3 text-center">
                        <span className="text-zinc-500 text-[9px] uppercase font-bold block">Peak</span>
                        <h4 className="text-sm font-extrabold text-white mt-0.5">{historyData.length>0?Math.max(...historyData.map(d=>d.calories)):0} kcal</h4>
                      </Card>
                      <Card className="bg-[#111116] border-[#222231]/80 rounded-xl p-3 text-center">
                        <span className="text-zinc-500 text-[9px] uppercase font-bold block">Target</span>
                        <h4 className="text-sm font-extrabold text-white mt-0.5">{goals.calories} kcal</h4>
                      </Card>
                    </div>
                  </div>
                )}

                {/* ── Weight ── */}
                {insightSubTab==='weight' && (
                  <div className="space-y-4">
                    <Card className="bg-[#100e18] border-[#201a30]/80 rounded-2xl">
                      <CardHeader className="py-4 px-5 pb-3"><div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300"><Scale className="h-4 w-4 text-violet-400"/>Today's Weight</div></CardHeader>
                      <CardContent className="px-5 pb-5">
                        {weightLog ? (
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-3xl font-extrabold text-violet-300">{displayWeight(weightLog.weight)} <span className="text-sm text-zinc-400 font-normal">{weightUnit}</span></div>
                              {getFilteredWeightHistory.length>=2&&(()=>{const prev=getFilteredWeightHistory[getFilteredWeightHistory.length-2]?.weight;if(!prev)return null;const d=weightLog.weight-prev;return<div className={`text-xs font-semibold mt-1 ${d>0?'text-orange-400':'text-emerald-400'}`}>{d>0?'▲':'▼'} {Math.abs(weightUnit==='lbs'?d*2.20462:d).toFixed(1)} {weightUnit} vs prev entry</div>})()}
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-600 hover:text-red-400" onClick={()=>{setWeightLog(null);setWeightFormValue(0);}}><X className="h-4 w-4"/></Button>
                          </div>
                        ):(
                          <div className="flex items-center gap-3">
                            <Input type="number" step="0.1" placeholder={`Weight in ${weightUnit}`} value={weightFormValue||''} onChange={e=>setWeightFormValue(Number(e.target.value))} className="bg-[#181822] border-[#242436] text-sm h-10 flex-1"/>
                            <Button className="bg-violet-600 hover:bg-violet-500 text-white h-10 px-4" onClick={handleLogWeight}>Log</Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Weight Trend Chart */}
                    <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl overflow-hidden">
                      <CardHeader className="py-4 px-5 pb-2">
                        <div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300"><TrendingUp className="h-4 w-4 text-violet-400"/>Weight Trend</div>
                        <CardDescription className="text-[10px] text-zinc-500">{getFilteredWeightHistory.length} entries · in {weightUnit}</CardDescription>
                      </CardHeader>
                      <CardContent className="px-3 pb-4">
                        {getFilteredWeightHistory.length < 2 ? (
                          <div className="text-center text-zinc-600 text-xs py-8 italic">Log weight on multiple days to see the trend.</div>
                        ) : (() => {
                          const data = getFilteredWeightHistory;
                          const vals = data.map(w => weightUnit==='lbs'?w.weight*2.20462:w.weight);
                          const minV = Math.min(...vals);
                          const maxV = Math.max(...vals);
                          const range = maxV - minV || 1;
                          const padH = 35, padV = 20;
                          const svgW = 340, svgH = 150;
                          const pts = data.map((w,i)=>{
                            const x = padH + (i*(svgW-padH*2))/(data.length-1);
                            const v = weightUnit==='lbs'?w.weight*2.20462:w.weight;
                            const y = svgH-padV-((v-minV)/range)*(svgH-padV*2);
                            return {x,y,v,date:w.date};
                          });
                          const polyPts = pts.map(p=>`${p.x},${p.y}`).join(' ');
                          // Label intervals: show every Nth label depending on count
                          const labelEvery = data.length <= 7 ? 1 : data.length <= 14 ? 2 : data.length <= 30 ? 5 : 7;
                          return (
                            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full overflow-visible mt-1">
                              <defs>
                                <linearGradient id="wtGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25"/>
                                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
                                </linearGradient>
                              </defs>
                              {/* Grid lines with weight labels on Y */}
                              {[0,0.25,0.5,0.75,1].map(p=>{
                                const y=svgH-padV-p*(svgH-padV*2);
                                const v=(minV+p*range).toFixed(1);
                                return <g key={p}><line x1={padH} y1={y} x2={svgW-padH*0.5} y2={y} className="stroke-[#1b1b26]/50" strokeWidth="0.5" strokeDasharray="3,3"/><text x={padH-4} y={y+3} className="fill-zinc-600 text-[7px]" textAnchor="end">{v}</text></g>;
                              })}
                              {/* Baseline */}
                              <line x1={padH} y1={svgH-padV} x2={svgW-padH*0.5} y2={svgH-padV} className="stroke-[#1b1b26]" strokeWidth="1"/>
                              {/* Fill area */}
                              <polygon fill="url(#wtGrad)" points={`${pts[0].x},${svgH-padV} ${polyPts} ${pts[pts.length-1].x},${svgH-padV}`}/>
                              {/* Line */}
                              <polyline fill="none" className="stroke-violet-500" strokeWidth="2" points={polyPts} strokeLinecap="round" strokeLinejoin="round"/>
                              {/* Points + Date labels */}
                              {pts.map((p,i)=>{
                                const isToday=p.date===activeDate;
                                const showDate = i===0 || i===pts.length-1 || i%labelEvery===0 || isToday;
                                const d = new Date(p.date+'T00:00:00');
                                const shortDate = `${d.getDate()}/${d.getMonth()+1}`;
                                return (
                                  <g key={i}>
                                    <circle cx={p.x} cy={p.y} r={isToday?4:2.5} className={isToday?'fill-emerald-400 stroke-[#0d0d12] stroke-2':'fill-violet-400'}/>
                                    {showDate && (
                                      <text x={p.x} y={svgH-5} className="fill-zinc-500 text-[7px]" textAnchor="middle">{shortDate}</text>
                                    )}
                                    {(isToday||i===0||i===pts.length-1) && (
                                      <text x={p.x} y={p.y-7} className={`text-[7px] font-bold ${isToday?'fill-emerald-400':'fill-violet-400'}`} textAnchor="middle">{p.v.toFixed(1)}</text>
                                    )}
                                  </g>
                                );
                              })}
                            </svg>
                          );
                        })()}
                      </CardContent>
                    </Card>

                    {getFilteredWeightHistory.length>=2&&(
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          {l:'Current',v:weightUnit==='lbs'?(getFilteredWeightHistory[getFilteredWeightHistory.length-1]?.weight||0)*2.20462:getFilteredWeightHistory[getFilteredWeightHistory.length-1]?.weight||0},
                          {l:'Min',v:weightUnit==='lbs'?Math.min(...getFilteredWeightHistory.map(w=>w.weight))*2.20462:Math.min(...getFilteredWeightHistory.map(w=>w.weight))},
                          {l:'Max',v:weightUnit==='lbs'?Math.max(...getFilteredWeightHistory.map(w=>w.weight))*2.20462:Math.max(...getFilteredWeightHistory.map(w=>w.weight))},
                        ].map(s=>(
                          <Card key={s.l} className="bg-[#111116] border-[#222231]/80 rounded-xl p-3 text-center">
                            <span className="text-zinc-500 text-[9px] uppercase font-bold block">{s.l}</span>
                            <h4 className="text-sm font-extrabold text-white mt-0.5">{s.v.toFixed(1)}<span className="text-[9px] text-zinc-500 font-normal ml-0.5">{weightUnit}</span></h4>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ── Water ── */}
                {insightSubTab==='water' && (
                  <div className="space-y-4">
                    <Card className="bg-[#0e1218] border-[#1a2530]/80 rounded-2xl">
                      <CardHeader className="py-4 px-5 pb-3"><div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300"><Droplets className="h-4 w-4 text-sky-400"/>Today's Hydration</div></CardHeader>
                      <CardContent className="px-5 pb-5 space-y-4">
                        <div className="flex items-center gap-6">
                          {/* Ring */}
                          <div className="relative flex items-center justify-center w-24 h-24 shrink-0">
                            <svg className="w-full h-full -rotate-90">
                              <circle cx="48" cy="48" r="40" className="stroke-[#1a2530]" strokeWidth="8" fill="transparent"/>
                              <circle cx="48" cy="48" r="40" className="stroke-sky-400 transition-all duration-500" strokeWidth="8"
                                strokeDasharray={2*Math.PI*40} strokeDashoffset={2*Math.PI*40*(1-Math.min(1,totalWater/waterGoalMl))} strokeLinecap="round" fill="transparent"/>
                            </svg>
                            <div className="absolute flex flex-col items-center text-center">
                              <span className="text-lg font-extrabold text-sky-300">{(totalWater/1000).toFixed(1)}</span>
                              <span className="text-[9px] text-zinc-500">/{(waterGoalMl/1000).toFixed(1)}L</span>
                            </div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <p className="text-xs text-zinc-400 font-semibold">Quick Add</p>
                            <div className="grid grid-cols-2 gap-1.5">
                              {[150,250,350,500,750,1000].map(ml=>(
                                <button key={ml} onClick={()=>handleLogWater(ml)} className="bg-sky-950/40 border border-sky-900/50 text-sky-300 text-xs py-1.5 rounded-xl hover:bg-sky-900/40 cursor-pointer font-semibold">+{ml}ml</button>
                              ))}
                            </div>
                            {/* Custom amount */}
                            {showCustomWater ? (
                              <div className="flex gap-1.5">
                                <Input type="number" min={50} max={2000} step={50} value={customWaterMl||''} onChange={e=>setCustomWaterMl(Number(e.target.value))} className="bg-[#181822] border-[#242436] text-xs h-8 flex-1 text-center"/>
                                <button onClick={()=>{handleLogWater(customWaterMl);setShowCustomWater(false);}} className="bg-sky-700/40 border border-sky-700/50 text-sky-300 text-xs px-3 rounded-lg hover:bg-sky-700/60 cursor-pointer">+</button>
                                <button onClick={()=>setShowCustomWater(false)} className="text-zinc-500 text-xs px-2 cursor-pointer">✕</button>
                              </div>
                            ) : (
                              <button onClick={()=>setShowCustomWater(true)} className="text-[11px] text-sky-400/70 hover:text-sky-400 cursor-pointer">+ Custom amount</button>
                            )}
                          </div>
                        </div>

                        {waterLogs.length>0&&(
                          <div className="border-t border-[#1a2530]/60 pt-3 space-y-1.5">
                            <p className="text-[10px] text-zinc-500 uppercase font-bold mb-2">Today's Log</p>
                            {waterLogs.map((w)=>(
                              <div key={w.id} className="flex items-center justify-between py-1">
                                <div className="flex items-center gap-2"><Droplets className="h-3 w-3 text-sky-500"/><span className="text-zinc-300 text-xs">{w.amount}ml</span></div>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-600 hover:text-red-400" onClick={()=>handleDeleteWater(w.id)}><Trash2 className="h-3.5 w-3.5"/></Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Water Bar Chart */}
                    <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl overflow-hidden">
                      <CardHeader className="py-4 px-5 pb-2">
                        <div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300"><BarChart3 className="h-4 w-4 text-sky-400"/>Water Trend</div>
                        <CardDescription className="text-[10px] text-zinc-500">{getFilteredWaterHistory.length} days · goal: {waterGoalMl}ml</CardDescription>
                      </CardHeader>
                      <CardContent className="px-4 pb-5">
                        {getFilteredWaterHistory.length===0?(
                          <div className="text-center text-zinc-600 text-xs py-8 italic">No water history yet.</div>
                        ):(() => {
                          const data = getFilteredWaterHistory;
                          const maxW = Math.max(...data.map(w=>w.amount), waterGoalMl);
                          const barH = 100;
                          const labelEvery = data.length <= 7 ? 1 : data.length <= 14 ? 2 : data.length <= 30 ? 5 : 7;
                          return (
                            <div className="mt-2">
                              <div className="relative" style={{height: barH+24}}>
                                {/* Goal line */}
                                <div className="absolute w-full border-t border-dashed border-sky-700/40" style={{top: barH - (waterGoalMl/maxW)*barH + 'px'}}/>
                                <div className="flex items-end gap-0.5 h-full pb-6">
                                  {data.map((d,i)=>{
                                    const pct = Math.min(100,(d.amount/maxW)*100);
                                    const isGoal = d.amount >= waterGoalMl;
                                    const isToday = d.date === activeDate;
                                    const showDate = i===0||i===data.length-1||i%labelEvery===0||isToday;
                                    const dt = new Date(d.date+'T00:00:00');
                                    const shortDate = `${dt.getDate()}/${dt.getMonth()+1}`;
                                    return (
                                      <div key={i} className="flex-1 flex flex-col items-center gap-0" style={{height:barH+24}}>
                                        <div className="flex-1 flex items-end w-full">
                                          <div className={`w-full rounded-t-sm transition-all duration-300 ${isToday?'bg-sky-300':isGoal?'bg-sky-500/70':'bg-sky-800/60'}`} style={{height:`${pct}%`,minHeight:2}}/>
                                        </div>
                                        <span className="text-[6px] text-zinc-600 mt-1 leading-none" style={{writingMode:'vertical-rl',transform:'rotate(180deg)',height:20}}>
                                          {showDate?shortDate:''}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="flex justify-between text-[9px] text-zinc-600 mt-1">
                                <span className="text-sky-600/80">— goal: {waterGoalMl}ml</span>
                                <span className="text-sky-300">■ today</span>
                                <span className="text-sky-500/70">■ met</span>
                              </div>
                            </div>
                          );
                        })()}
                      </CardContent>
                    </Card>

                    {getFilteredWaterHistory.length>0&&(
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          {l:'Today',v:`${(totalWater/1000).toFixed(2)}L`},
                          {l:'Avg',v:`${(getFilteredWaterHistory.reduce((s,w)=>s+w.amount,0)/getFilteredWaterHistory.length/1000).toFixed(2)}L`},
                          {l:'Goal %',v:`${Math.round((totalWater/waterGoalMl)*100)}%`},
                        ].map(s=>(
                          <Card key={s.l} className="bg-[#111116] border-[#222231]/80 rounded-xl p-3 text-center">
                            <span className="text-zinc-500 text-[9px] uppercase font-bold block">{s.l}</span>
                            <h4 className="text-sm font-extrabold text-white mt-0.5">{s.v}</h4>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ══ SETTINGS ══ */}
            {activeTab==='settings' && (
              <div className="space-y-4 text-xs lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0 lg:items-start">

                {/* Database */}
                <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl">
                  <CardHeader className="py-4 px-5"><div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300"><Database className="h-4 w-4 text-indigo-400"/>Database</div><CardDescription className="text-[10px] text-zinc-500">Manage your Postgres connection.</CardDescription></CardHeader>
                  <CardContent className="px-5 pb-5 space-y-3">
                    <div className={`rounded-lg p-3 text-[11px] flex items-start gap-2 ${isDemoMode?'bg-amber-950/20 border border-amber-800/40 text-amber-300':'bg-indigo-950/20 border border-indigo-900/40 text-indigo-400'}`}>
                      <Check className="h-4 w-4 shrink-0 mt-0.5"/><div><span className="font-bold">{isDemoMode?'Local Storage (Browser)':'PostgreSQL Connected'}</span><p className="text-zinc-400 mt-0.5 text-[10px]">{isDemoMode?'⚠️ Clearing browser data will erase all logs permanently.':'Data synced to your private database.'}</p></div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider">Connection String</Label>
                      <Input type="text" value={dbConn} onChange={e=>setDbConn(e.target.value)} placeholder="postgresql://user:pass@127.0.0.1:5432/dbname" className="bg-[#181822] border-[#242436] text-[11px] h-9"/>
                      <p className="text-[10px] text-zinc-600 flex items-center gap-1"><Info className="h-3 w-3"/>WSL: use <code className="text-indigo-400 mx-1">127.0.0.1</code> not <code className="text-indigo-400 mx-1">localhost</code></p>
                    </div>
                    {dbError&&<div className="rounded-lg bg-red-950/40 border border-red-900/60 p-3 text-[11px] text-red-400 flex items-start gap-2"><AlertCircle className="h-4 w-4 mt-0.5 shrink-0"/><span>{dbError}</span></div>}
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-9 rounded-lg" onClick={()=>verifyDatabase(dbConn)} disabled={isCheckingDb||!dbConn}>{isCheckingDb?'Connecting...':'Connect / Update'}</Button>
                      {dbConnected&&<Button variant="destructive" className="bg-red-950/40 border border-red-900/60 hover:bg-red-900/40 text-red-400 text-xs h-9 rounded-lg" onClick={disconnectDb}>Disconnect</Button>}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Settings */}
                <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl">
                  <CardHeader className="py-4 px-5"><div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300"><Brain className="h-4 w-4 text-indigo-400"/>AI Settings</div><CardDescription className="text-[10px] text-zinc-500">Add your OpenAI key for AI-powered "Should I Eat?" recommendations.</CardDescription></CardHeader>
                  <CardContent className="px-5 pb-5 space-y-3">
                    <div className="space-y-1">
                      <Label className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider">OpenAI API Key</Label>
                      <Input type="password" value={openAiKey} onChange={e=>setOpenAiKey(e.target.value)} placeholder="sk-proj-..." className="bg-[#181822] border-[#242436] text-[11px] h-9"/>
                      <p className="text-[10px] text-zinc-600 flex items-start gap-1"><Info className="h-3 w-3 mt-0.5 shrink-0"/>Your key is stored only in your browser's local storage and never sent anywhere except directly to OpenAI.</p>
                    </div>
                    {openAiKey&&<div className="p-2 bg-emerald-950/20 border border-emerald-900/40 rounded-lg text-[11px] text-emerald-400 flex items-center gap-1.5"><Check className="h-3.5 w-3.5"/>API key saved locally</div>}
                    <Button className="w-full bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-600/40 text-indigo-300 text-xs h-9" onClick={()=>safeLocalSet('trackfit_openai_key',openAiKey)} disabled={!openAiKey}>Save Key</Button>
                    <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-[10px] text-indigo-400/70 hover:text-indigo-400 block text-center">Get an OpenAI API key →</a>
                  </CardContent>
                </Card>

                {/* Wellness */}
                <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl">
                  <CardHeader className="py-4 px-5"><div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300"><Droplets className="h-4 w-4 text-sky-400"/>Wellness Settings</div><CardDescription className="text-[10px] text-zinc-500">Weight unit & water goal preferences.</CardDescription></CardHeader>
                  <CardContent className="px-5 pb-5 space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider">Weight Unit</Label>
                      <div className="flex gap-2">
                        {(['kg','lbs'] as const).map(u=>(
                          <button key={u} onClick={()=>{setWeightUnit(u);safeLocalSet('trackfit_weight_unit',u);}} className={`flex-1 py-2 rounded-lg border text-sm font-semibold cursor-pointer transition-colors ${weightUnit===u?'bg-violet-600/20 border-violet-500/50 text-violet-300':'bg-[#181822] border-[#242436] text-zinc-400 hover:text-zinc-200'}`}>{u}</button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider">Daily Water Goal (ml)</Label>
                      <div className="flex gap-2">
                        <Input type="number" value={waterGoalMl||''} onChange={e=>setWaterGoalMl(Number(e.target.value))} className="bg-[#181822] border-[#242436] text-xs h-9 flex-1" step={250} min={500} max={6000}/>
                        <Button className="bg-sky-700/40 hover:bg-sky-700/60 text-sky-300 border border-sky-700/50 text-xs h-9" onClick={()=>safeLocalSet('trackfit_water_goal',String(waterGoalMl))}><Check className="h-3.5 w-3.5"/></Button>
                      </div>
                      <div className="flex gap-1.5">
                        {[1500,2000,2500,3000].map(ml=><button key={ml} onClick={()=>{setWaterGoalMl(ml);safeLocalSet('trackfit_water_goal',String(ml));}} className="text-[10px] bg-[#171720] border border-[#242436] text-zinc-400 px-2 py-1 rounded-lg hover:text-sky-300 hover:border-sky-900/60 cursor-pointer">{ml}ml</button>)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Nutrition Goals */}
                <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl">
                  <CardHeader className="py-4 px-5"><div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300"><SettingsIcon className="h-4 w-4 text-indigo-400"/>Nutrition Targets</div><CardDescription className="text-[10px] text-zinc-500">Update your daily nutritional goals.</CardDescription></CardHeader>
                  <CardContent className="px-5 pb-5 space-y-3">
                    <div className="space-y-1"><Label className="text-[10px] text-zinc-500">Daily Calories (kcal)</Label><Input type="number" value={goalFormCalories||''} onChange={e=>setGoalFormCalories(Number(e.target.value))} className="bg-[#181822] border-[#242436] text-xs h-8"/></div>
                    <div className="grid grid-cols-2 gap-2">
                      {[{l:'Protein (g)',v:goalFormProtein,s:setGoalFormProtein},{l:'Carbs (g)',v:goalFormCarbs,s:setGoalFormCarbs},{l:'Fiber (g)',v:goalFormFiber,s:setGoalFormFiber},{l:'Fat (g)',v:goalFormFat,s:setGoalFormFat}].map(f=>(
                        <div key={f.l} className="space-y-1"><Label className="text-[10px] text-zinc-500">{f.l}</Label><Input type="number" value={f.v||''} onChange={e=>f.s(Number(e.target.value))} className="bg-[#181822] border-[#242436] text-xs h-8"/></div>
                      ))}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs h-9 rounded-lg" onClick={handleUpdateGoals}>Save Goals</Button>
                  </CardContent>
                </Card>
              </div>
            )}

          </>)}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-[#0d0d12]/95 border-t border-[#1b1b26]/80 backdrop-blur-md flex items-center justify-around py-3 px-2 z-50">
        {([
          {tab:'dashboard' as TabId,icon:Activity,label:'Overview'},
          {tab:'food' as TabId,icon:Utensils,label:'Meals'},
          {tab:'workout' as TabId,icon:Dumbbell,label:'Workout'},
          {tab:'insights' as TabId,icon:BarChart3,label:'Insights'},
          {tab:'settings' as TabId,icon:SettingsIcon,label:'Settings'},
        ]).map(({tab,icon:Icon,label})=>(
          <button key={tab} className={`flex flex-col items-center gap-1.5 text-[10px] font-medium transition-all cursor-pointer ${activeTab===tab?'text-indigo-400 scale-[1.05]':'text-zinc-500 hover:text-zinc-300'}`} onClick={()=>setActiveTab(tab)}>
            <Icon className="h-5 w-5"/><span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
