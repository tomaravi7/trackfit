'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Dumbbell,
  Utensils,
  Calendar as CalendarIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  Plus,
  Trash2,
  Search,
  Check,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Database,
  Activity,
  Flame,
  Apple,
  TrendingUp,
  Info,
  Droplets,
  Scale,
  BarChart3,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
}

interface WorkoutLog {
  id?: number;
  date: string;
  exerciseName: string;
  weight: number;
  reps: number;
  setNumber: number;
}

interface Goals {
  calories: number;
  protein: number;
  carbs: number;
  fiber: number;
  fat: number;
}

interface ExerciseTemplate {
  name: string;
  category?: string;
  primaryMuscles?: string[];
}

interface WeightLog {
  id?: number;
  date: string;
  weight: number;
}

interface WaterLog {
  id?: number;
  date: string;
  amount: number; // ml
}

type TabId = 'dashboard' | 'food' | 'workout' | 'insights' | 'settings';
type InsightSubTab = 'calories' | 'weight' | 'water';

// ─── Helper: today string ─────────────────────────────────────────────────────
function toDateString(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function TrackFitApp() {
  // Navigation & Date State
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [insightSubTab, setInsightSubTab] = useState<InsightSubTab>('calories');
  const [activeDate, setActiveDate] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);

  // Database Connection State
  const [dbConn, setDbConn] = useState<string>('');
  const [dbConnected, setDbConnected] = useState<boolean>(false);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [isCheckingDb, setIsCheckingDb] = useState<boolean>(false);
  const [dbError, setDbError] = useState<string>('');

  // App Core Data State
  const [goals, setGoals] = useState<Goals>({ calories: 2000, protein: 130, carbs: 220, fiber: 30, fat: 65 });
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Weight & Water State
  const [weightLog, setWeightLog] = useState<WeightLog | null>(null);
  const [weightHistory, setWeightHistory] = useState<WeightLog[]>([]);
  const [waterLogs, setWaterLogs] = useState<WaterLog[]>([]);
  const [waterHistory, setWaterHistory] = useState<{ date: string; amount: number }[]>([]);
  const [weightFormValue, setWeightFormValue] = useState<number>(0);
  const [waterGoalMl, setWaterGoalMl] = useState<number>(2500);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');

  // Search State
  const [foodSearchQuery, setFoodSearchQuery] = useState<string>('');
  const [foodSearchResults, setFoodSearchResults] = useState<any[]>([]);
  const [searchingFood, setSearchingFood] = useState<boolean>(false);
  const [exerciseSearchQuery, setExerciseSearchQuery] = useState<string>('');
  const [exerciseSearchResults, setExerciseSearchResults] = useState<ExerciseTemplate[]>([]);
  const [searchingExercise, setSearchingExercise] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [exerciseHistory, setExerciseHistory] = useState<WorkoutLog[]>([]);

  // Form States - Food
  const [selectedFoodItem, setSelectedFoodItem] = useState<any | null>(null);
  const [foodFormName, setFoodFormName] = useState<string>('');
  const [foodFormQuantity, setFoodFormQuantity] = useState<number>(100);
  const [foodFormCalories, setFoodFormCalories] = useState<number>(0);
  const [foodFormProtein, setFoodFormProtein] = useState<number>(0);
  const [foodFormCarbs, setFoodFormCarbs] = useState<number>(0);
  const [foodFormFiber, setFoodFormFiber] = useState<number>(0);
  const [foodFormFat, setFoodFormFat] = useState<number>(0);
  const [foodFormMealType, setFoodFormMealType] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'>('Breakfast');
  const [foodDialogOpen, setFoodDialogOpen] = useState<boolean>(false);

  // Form States - Workout
  const [workoutFormWeight, setWorkoutFormWeight] = useState<number>(0);
  const [workoutFormReps, setWorkoutFormReps] = useState<number>(10);
  const [workoutDialogOpen, setWorkoutDialogOpen] = useState<boolean>(false);

  // Form States - Goals
  const [goalFormCalories, setGoalFormCalories] = useState<number>(2000);
  const [goalFormProtein, setGoalFormProtein] = useState<number>(130);
  const [goalFormCarbs, setGoalFormCarbs] = useState<number>(220);
  const [goalFormFiber, setGoalFormFiber] = useState<number>(30);
  const [goalFormFat, setGoalFormFat] = useState<number>(65);

  // Sandwich Tool State
  const [sandName, setSandName] = useState<string>('Ham & Cheese Sandwich');
  const [sandCalories, setSandCalories] = useState<number>(380);
  const [sandProtein, setSandProtein] = useState<number>(22);
  const [sandCarbs, setSandCarbs] = useState<number>(35);
  const [sandFiber, setSandFiber] = useState<number>(4);
  const [sandFat, setSandFat] = useState<number>(14);
  const [sandVerdict, setSandVerdict] = useState<any | null>(null);

  // ─── Init ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    try {
      setMounted(true);
      setActiveDate(toDateString(new Date()));

      let storedConn: string | null = null;
      let storedMode: string | null = null;
      let storedUnit: string | null = null;
      let storedWaterGoal: string | null = null;

      try {
        storedConn = localStorage.getItem('trackfit_db_conn');
        storedMode = localStorage.getItem('trackfit_mode');
        storedUnit = localStorage.getItem('trackfit_weight_unit');
        storedWaterGoal = localStorage.getItem('trackfit_water_goal');
      } catch (_) {}

      if (storedUnit === 'lbs') setWeightUnit('lbs');
      if (storedWaterGoal) setWaterGoalMl(Number(storedWaterGoal));

      if (storedMode === 'demo') {
        setIsDemoMode(true);
        setDbConnected(true);
        // loadDemoData is called in the date effect
      } else if (storedConn) {
        setDbConn(storedConn);
        verifyDatabase(storedConn);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setMounted(true);
      setLoading(false);
    }
  }, []);

  // Fetch data when date or connection changes
  useEffect(() => {
    if (!dbConnected || !activeDate) return;
    fetchDataForDate(activeDate);
  }, [dbConnected, activeDate]);

  // ─── Demo Mode ───────────────────────────────────────────────────────────────
  const loadDemoData = useCallback(() => {
    setLoading(true);
    try {
      const storedGoals = safeLocalGet('trackfit_demo_goals');
      if (storedGoals) {
        const g = JSON.parse(storedGoals);
        setGoals(g);
        setGoalFormCalories(g.calories);
        setGoalFormProtein(g.protein);
        setGoalFormCarbs(g.carbs);
        setGoalFormFiber(g.fiber);
        setGoalFormFat(g.fat);
      }

      const dateStr = activeDate || toDateString(new Date());

      const allFoods = safeLocalGetJSON('trackfit_demo_foods', []);
      setFoodLogs(Array.isArray(allFoods) ? allFoods.filter((f: FoodLog) => f?.date === dateStr) : []);

      const allWorkouts = safeLocalGetJSON('trackfit_demo_workouts', []);
      setWorkoutLogs(Array.isArray(allWorkouts) ? allWorkouts.filter((w: WorkoutLog) => w?.date === dateStr) : []);

      // Weight history
      const allWeights = safeLocalGetJSON('trackfit_demo_weights', []);
      setWeightHistory(Array.isArray(allWeights) ? allWeights.slice(-30) : []);
      const todayWeight = Array.isArray(allWeights) ? allWeights.find((w: WeightLog) => w?.date === dateStr) : null;
      setWeightLog(todayWeight || null);
      if (todayWeight) setWeightFormValue(todayWeight.weight);

      // Water logs
      const allWater = safeLocalGetJSON('trackfit_demo_water', []);
      setWaterLogs(Array.isArray(allWater) ? allWater.filter((w: WaterLog) => w?.date === dateStr) : []);

      // Water history (aggregate by date)
      const waterByDate: { [date: string]: number } = {};
      if (Array.isArray(allWater)) {
        allWater.forEach((w: WaterLog) => {
          if (w?.date) waterByDate[w.date] = (waterByDate[w.date] || 0) + (w.amount || 0);
        });
      }
      setWaterHistory(Object.entries(waterByDate).map(([date, amount]) => ({ date, amount })).slice(-30));
    } catch (e) {
      console.error('[loadDemoData]', e);
    } finally {
      setLoading(false);
    }
  }, [activeDate]);

  // ─── Safe localStorage helpers ───────────────────────────────────────────────
  function safeLocalGet(key: string): string | null {
    try { return localStorage.getItem(key); } catch { return null; }
  }
  function safeLocalSet(key: string, value: string) {
    try { localStorage.setItem(key, value); } catch {}
  }
  function safeLocalGetJSON(key: string, fallback: any): any {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  }

  // ─── DB Connection ───────────────────────────────────────────────────────────
  const verifyDatabase = async (connString: string) => {
    setIsCheckingDb(true);
    setDbError('');
    try {
      const res = await fetch('/api/db/test', {
        method: 'POST',
        headers: { 'x-db-connection-string': connString },
      });
      const data = await res.json();
      if (data.success) {
        safeLocalSet('trackfit_db_conn', connString);
        safeLocalSet('trackfit_mode', 'postgres');
        setDbConnected(true);
        setIsDemoMode(false);
      } else {
        setDbError(data.error || 'Connection failed');
        setDbConnected(false);
        setLoading(false);
      }
    } catch (err: any) {
      setDbError(err.message || 'Network error');
      setDbConnected(false);
      setLoading(false);
    } finally {
      setIsCheckingDb(false);
    }
  };

  const enableDemoMode = () => {
    safeLocalSet('trackfit_mode', 'demo');
    try { localStorage.removeItem('trackfit_db_conn'); } catch {}
    setIsDemoMode(true);
    setDbConnected(true);
    setDbError('');
  };

  const disconnectDb = () => {
    try { localStorage.removeItem('trackfit_db_conn'); localStorage.removeItem('trackfit_mode'); } catch {}
    setDbConn('');
    setDbConnected(false);
    setIsDemoMode(false);
    setFoodLogs([]);
    setWorkoutLogs([]);
    setWeightLog(null);
    setWaterLogs([]);
  };

  // ─── Data Fetching ───────────────────────────────────────────────────────────
  const fetchDataForDate = useCallback(async (date: string) => {
    if (isDemoMode) { loadDemoData(); return; }

    setLoading(true);
    try {
      const headers = { 'x-db-connection-string': dbConn };

      const [goalsRes, foodRes, workoutRes, weightRes, waterRes, weightHistRes, waterHistRes] = await Promise.all([
        fetch('/api/goals', { headers }),
        fetch(`/api/food?date=${date}`, { headers }),
        fetch(`/api/workouts?date=${date}`, { headers }),
        fetch(`/api/weight?date=${date}`, { headers }),
        fetch(`/api/water?date=${date}`, { headers }),
        fetch('/api/weight', { headers }),
        fetch('/api/water?summary=true', { headers }),
      ]);

      const goalsData = await goalsRes.json();
      if (goalsData.success) {
        setGoals(goalsData.data);
        setGoalFormCalories(goalsData.data.calories);
        setGoalFormProtein(goalsData.data.protein);
        setGoalFormCarbs(goalsData.data.carbs);
        setGoalFormFiber(goalsData.data.fiber);
        setGoalFormFat(goalsData.data.fat);
      }

      const foodData = await foodRes.json();
      if (foodData.success) setFoodLogs(foodData.data);

      const workoutData = await workoutRes.json();
      if (workoutData.success) setWorkoutLogs(workoutData.data);

      const weightData = await weightRes.json();
      if (weightData.success && weightData.data.length > 0) {
        setWeightLog(weightData.data[0]);
        setWeightFormValue(weightData.data[0].weight);
      } else {
        setWeightLog(null);
      }

      const waterData = await waterRes.json();
      if (waterData.success) setWaterLogs(waterData.data);

      const weightHistData = await weightHistRes.json();
      if (weightHistData.success) setWeightHistory(weightHistData.data);

      const waterHistData = await waterHistRes.json();
      if (waterHistData.success) setWaterHistory(waterHistData.data);
    } catch (err) {
      console.error('fetchDataForDate error:', err);
    } finally {
      setLoading(false);
    }
  }, [isDemoMode, dbConn, loadDemoData]);

  // ─── Food Search ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      if (foodSearchQuery.trim().length >= 2) searchFoodApi(foodSearchQuery);
      else setFoodSearchResults([]);
    }, 400);
    return () => clearTimeout(t);
  }, [foodSearchQuery]);

  const searchFoodApi = async (query: string) => {
    setSearchingFood(true);
    try {
      const res = await fetch(`/api/food/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success) setFoodSearchResults(data.data);
    } catch {} finally { setSearchingFood(false); }
  };

  // ─── Exercise Search ─────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => searchExerciseApi(exerciseSearchQuery), 300);
    return () => clearTimeout(t);
  }, [exerciseSearchQuery]);

  const searchExerciseApi = async (query: string) => {
    setSearchingExercise(true);
    try {
      const res = await fetch(`/api/exercises?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success) setExerciseSearchResults(data.data);
    } catch {} finally { setSearchingExercise(false); }
  };

  const selectExerciseForLogging = (exerciseName: string) => {
    setSelectedExercise(exerciseName);
    setExerciseSearchQuery('');
    setExerciseSearchResults([]);
    if (isDemoMode) {
      const all = safeLocalGetJSON('trackfit_demo_workouts', []);
      const history = Array.isArray(all)
        ? all.filter((w: WorkoutLog) => w?.exerciseName?.toLowerCase() === exerciseName.toLowerCase())
            .sort((a: any, b: any) => b.date.localeCompare(a.date))
        : [];
      setExerciseHistory(history.slice(0, 5));
      if (history.length > 0) {
        setWorkoutFormWeight(parseFloat(history[0].weight));
        setWorkoutFormReps(history[0].reps);
      }
    } else {
      const history = workoutLogs.filter(w => w.exerciseName.toLowerCase() === exerciseName.toLowerCase());
      setExerciseHistory(history);
      if (history.length > 0) {
        setWorkoutFormWeight(history[history.length - 1].weight);
        setWorkoutFormReps(history[history.length - 1].reps);
      }
    }
  };

  // ─── Computed Daily Totals ────────────────────────────────────────────────────
  const dailyTotals = useMemo(() =>
    foodLogs.reduce((acc, item) => {
      acc.calories += item.calories;
      acc.protein += item.protein;
      acc.carbs += item.carbs;
      acc.fiber += item.fiber;
      acc.fat += item.fat;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fiber: 0, fat: 0 }),
  [foodLogs]);

  const remainingMacros = useMemo(() => ({
    calories: Math.max(0, goals.calories - dailyTotals.calories),
    protein: Math.max(0, goals.protein - dailyTotals.protein),
    carbs: Math.max(0, goals.carbs - dailyTotals.carbs),
    fiber: Math.max(0, goals.fiber - dailyTotals.fiber),
    fat: Math.max(0, goals.fat - dailyTotals.fat),
  }), [goals, dailyTotals]);

  const totalWaterToday = useMemo(() => waterLogs.reduce((sum, w) => sum + w.amount, 0), [waterLogs]);

  const displayWeight = (w: number) => weightUnit === 'lbs' ? (w * 2.20462).toFixed(1) : w.toFixed(1);

  // ─── Food Operations ─────────────────────────────────────────────────────────
  const handleSelectFoodSearch = (item: any) => {
    setSelectedFoodItem(item);
    setFoodFormName(item.name);
    setFoodFormCalories(item.calories || 0);
    setFoodFormProtein(item.protein || 0);
    setFoodFormCarbs(item.carbs || 0);
    setFoodFormFiber(item.fiber || 0);
    setFoodFormFat(item.fat || 0);
    setFoodSearchQuery('');
    setFoodSearchResults([]);
  };

  const handleAddCustomFood = async () => {
    if (!foodFormName || !foodFormQuantity) return;
    const ratio = foodFormQuantity / 100;
    const item: FoodLog = {
      date: activeDate,
      foodName: foodFormName,
      quantity: foodFormQuantity,
      calories: Math.round(foodFormCalories * ratio),
      protein: Math.round(foodFormProtein * ratio * 10) / 10,
      carbs: Math.round(foodFormCarbs * ratio * 10) / 10,
      fiber: Math.round(foodFormFiber * ratio * 10) / 10,
      fat: Math.round(foodFormFat * ratio * 10) / 10,
      mealType: foodFormMealType,
    };

    if (isDemoMode) {
      const all = safeLocalGetJSON('trackfit_demo_foods', []);
      const newItem = { ...item, id: Date.now() };
      safeLocalSet('trackfit_demo_foods', JSON.stringify([...all, newItem]));
      loadDemoData();
    } else {
      try {
        const res = await fetch('/api/food', {
          method: 'POST',
          headers: { 'x-db-connection-string': dbConn, 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
        const data = await res.json();
        if (data.success) setFoodLogs(prev => [...prev, data.data]);
      } catch (err) { console.error(err); }
    }
    setFoodDialogOpen(false);
    resetFoodForm();
  };

  const handleDeleteFood = async (id: number | undefined) => {
    if (id === undefined) return;
    if (isDemoMode) {
      const all = safeLocalGetJSON('trackfit_demo_foods', []);
      safeLocalSet('trackfit_demo_foods', JSON.stringify(all.filter((f: any) => f.id !== id)));
      loadDemoData();
      return;
    }
    try {
      const res = await fetch(`/api/food?id=${id}`, { method: 'DELETE', headers: { 'x-db-connection-string': dbConn } });
      const data = await res.json();
      if (data.success) setFoodLogs(prev => prev.filter(f => f.id !== id));
    } catch (err) { console.error(err); }
  };

  const resetFoodForm = () => {
    setSelectedFoodItem(null); setFoodFormName(''); setFoodFormQuantity(100);
    setFoodFormCalories(0); setFoodFormProtein(0); setFoodFormCarbs(0);
    setFoodFormFiber(0); setFoodFormFat(0); setFoodSearchQuery('');
  };

  // ─── Workout Operations ───────────────────────────────────────────────────────
  const handleLogSet = () => {
    if (!selectedExercise) return;
    const exerciseSets = workoutLogs.filter(w => w.exerciseName.toLowerCase() === selectedExercise.toLowerCase());
    const item: WorkoutLog = {
      date: activeDate, exerciseName: selectedExercise,
      weight: workoutFormWeight, reps: workoutFormReps,
      setNumber: exerciseSets.length + 1,
    };
    saveWorkoutLog(item);
  };

  const saveWorkoutLog = async (item: WorkoutLog) => {
    if (isDemoMode) {
      const all = safeLocalGetJSON('trackfit_demo_workouts', []);
      const newItem = { ...item, id: Date.now() };
      safeLocalSet('trackfit_demo_workouts', JSON.stringify([...all, newItem]));
      loadDemoData();
      return;
    }
    try {
      const res = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'x-db-connection-string': dbConn, 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      if (data.success) setWorkoutLogs(prev => [...prev, data.data]);
    } catch (err) { console.error(err); }
  };

  const handleDeleteWorkoutSet = async (id: number | undefined, exerciseName: string) => {
    if (id === undefined) return;
    if (isDemoMode) {
      const all = safeLocalGetJSON('trackfit_demo_workouts', []);
      safeLocalSet('trackfit_demo_workouts', JSON.stringify(all.filter((w: any) => w.id !== id)));
      loadDemoData();
      return;
    }
    try {
      const res = await fetch(`/api/workouts?id=${id}`, { method: 'DELETE', headers: { 'x-db-connection-string': dbConn } });
      const data = await res.json();
      if (data.success) setWorkoutLogs(prev => prev.filter(w => w.id !== id));
    } catch (err) { console.error(err); }
  };

  // ─── Weight Operations ────────────────────────────────────────────────────────
  const handleLogWeight = async () => {
    if (!weightFormValue) return;
    const kgValue = weightUnit === 'lbs' ? weightFormValue / 2.20462 : weightFormValue;
    if (isDemoMode) {
      const all = safeLocalGetJSON('trackfit_demo_weights', []);
      const filtered = all.filter((w: WeightLog) => w?.date !== activeDate);
      const newEntry = { id: Date.now(), date: activeDate, weight: kgValue };
      safeLocalSet('trackfit_demo_weights', JSON.stringify([...filtered, newEntry]));
      loadDemoData();
      return;
    }
    try {
      const res = await fetch('/api/weight', {
        method: 'POST',
        headers: { 'x-db-connection-string': dbConn, 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: activeDate, weight: kgValue }),
      });
      const data = await res.json();
      if (data.success) {
        setWeightLog(data.data);
        // Refresh history
        const histRes = await fetch('/api/weight', { headers: { 'x-db-connection-string': dbConn } });
        const histData = await histRes.json();
        if (histData.success) setWeightHistory(histData.data);
      }
    } catch (err) { console.error(err); }
  };

  // ─── Water Operations ─────────────────────────────────────────────────────────
  const handleLogWater = async (ml: number) => {
    if (isDemoMode) {
      const all = safeLocalGetJSON('trackfit_demo_water', []);
      const newEntry = { id: Date.now(), date: activeDate, amount: ml };
      safeLocalSet('trackfit_demo_water', JSON.stringify([...all, newEntry]));
      loadDemoData();
      return;
    }
    try {
      const res = await fetch('/api/water', {
        method: 'POST',
        headers: { 'x-db-connection-string': dbConn, 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: activeDate, amount: ml }),
      });
      const data = await res.json();
      if (data.success) {
        setWaterLogs(prev => [...prev, data.data]);
        // Refresh history
        const histRes = await fetch('/api/water?summary=true', { headers: { 'x-db-connection-string': dbConn } });
        const histData = await histRes.json();
        if (histData.success) setWaterHistory(histData.data);
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteWater = async (id: number | undefined) => {
    if (id === undefined) return;
    if (isDemoMode) {
      const all = safeLocalGetJSON('trackfit_demo_water', []);
      safeLocalSet('trackfit_demo_water', JSON.stringify(all.filter((w: any) => w.id !== id)));
      loadDemoData();
      return;
    }
    try {
      const res = await fetch(`/api/water?id=${id}`, { method: 'DELETE', headers: { 'x-db-connection-string': dbConn } });
      const data = await res.json();
      if (data.success) setWaterLogs(prev => prev.filter(w => w.id !== id));
    } catch (err) { console.error(err); }
  };

  // ─── Goals Update ─────────────────────────────────────────────────────────────
  const handleUpdateGoals = async () => {
    const newGoals = { calories: goalFormCalories, protein: goalFormProtein, carbs: goalFormCarbs, fiber: goalFormFiber, fat: goalFormFat };
    if (isDemoMode) {
      safeLocalSet('trackfit_demo_goals', JSON.stringify(newGoals));
      setGoals(newGoals);
      return;
    }
    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'x-db-connection-string': dbConn, 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoals),
      });
      const data = await res.json();
      if (data.success) setGoals(data.data);
    } catch (err) { console.error(err); }
  };

  // ─── Date Navigation ──────────────────────────────────────────────────────────
  const shiftDate = (days: number) => {
    if (!activeDate) return;
    const d = new Date(activeDate);
    d.setDate(d.getDate() + days);
    setActiveDate(toDateString(d));
  };

  // ─── Sandwich Tool ────────────────────────────────────────────────────────────
  const calculateVerdict = () => {
    const remCals = goals.calories - dailyTotals.calories;
    const remPro = goals.protein - dailyTotals.protein;
    const remCarb = goals.carbs - dailyTotals.carbs;
    const remFib = goals.fiber - dailyTotals.fiber;
    const remFat = goals.fat - dailyTotals.fat;

    let status: 'green' | 'yellow' | 'orange' | 'red' = 'green';
    let text = '';
    let justification = '';

    if (remCals < 0) {
      status = 'red'; text = 'Over Budget Already!';
      justification = `You are already over your daily calorie target by ${Math.abs(Math.round(remCals))} kcal.`;
    } else if (sandCalories > remCals) {
      status = 'red'; text = 'Better Skip It';
      justification = `This item is ${sandCalories} kcal, exceeding your remaining ${Math.round(remCals)} kcal by ${Math.round(sandCalories - remCals)} kcal.`;
    } else if (sandCalories > remCals * 0.7) {
      status = 'orange'; text = 'Proceed with Caution';
      justification = `This uses ${Math.round((sandCalories / remCals) * 100)}% of your remaining budget. Consider a smaller portion.`;
    } else if (sandProtein > remPro * 0.5 || sandFat > remFat * 0.6) {
      status = 'yellow'; text = 'Macro Watch';
      justification = `Calories OK, but this item is heavy on ${sandProtein > remPro * 0.5 ? 'protein' : 'fat'}. Adjust your next meals accordingly.`;
    } else {
      status = 'green'; text = 'Go Ahead! 🎉';
      justification = `This fits comfortably in your remaining daily budget. Enjoy it!`;
    }
    setSandVerdict({ status, text, justification, fitScore: { calories: sandCalories <= remCals, protein: sandProtein <= remPro, carbs: sandCarbs <= remCarb, fiber: sandFiber <= remFib, fat: sandFat <= remFat } });
  };

  // ─── Grouped workouts ─────────────────────────────────────────────────────────
  const groupedWorkouts = useMemo(() => {
    const groups: { [key: string]: WorkoutLog[] } = {};
    workoutLogs.forEach(log => {
      if (!groups[log.exerciseName]) groups[log.exerciseName] = [];
      groups[log.exerciseName].push(log);
    });
    Object.keys(groups).forEach(key => groups[key].sort((a, b) => a.setNumber - b.setNumber));
    return groups;
  }, [workoutLogs]);

  // ─── Calorie History Chart ────────────────────────────────────────────────────
  const historyData = useMemo(() => {
    if (!activeDate) return [];
    const dates: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(toDateString(d));
    }
    if (isDemoMode) {
      const allFoods = safeLocalGetJSON('trackfit_demo_foods', []);
      if (!Array.isArray(allFoods)) return [];
      return dates.map(dateStr => {
        const dayFoods = allFoods.filter((f: any) => f?.date === dateStr);
        const dayCals = dayFoods.reduce((sum: number, f: any) => sum + (f.calories || 0), 0);
        return { date: dateStr, label: new Date(dateStr + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'short' }), calories: Math.round(dayCals), target: goals.calories };
      });
    }
    return dates.map((dateStr, idx) => ({
      date: dateStr,
      label: new Date(dateStr + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'short' }),
      calories: dateStr === activeDate ? Math.round(dailyTotals.calories) : Math.round(goals.calories * (0.75 + Math.sin(idx * 1.3) * 0.3)),
      target: goals.calories,
    }));
  }, [isDemoMode, activeDate, dailyTotals, goals]);

  const chartHeight = 120;
  const chartWidth = 340;
  const chartPadding = 25;
  const maxChartCal = Math.max(...historyData.map(d => Math.max(d.calories, d.target)), 1000) * 1.15;

  const chartPoints = useMemo(() => {
    if (historyData.length < 2) return '';
    return historyData.map((d, i) => {
      const x = chartPadding + (i * (chartWidth - chartPadding * 2)) / (historyData.length - 1);
      const y = chartHeight - chartPadding - (d.calories / maxChartCal) * (chartHeight - chartPadding * 2);
      return `${x},${y}`;
    }).join(' ');
  }, [historyData, maxChartCal]);

  const targetLineY = useMemo(() =>
    chartHeight - chartPadding - (goals.calories / maxChartCal) * (chartHeight - chartPadding * 2),
  [goals, maxChartCal]);

  // ─── Weight Chart ─────────────────────────────────────────────────────────────
  const weightChartPoints = useMemo(() => {
    if (weightHistory.length < 2) return '';
    const vals = weightHistory.map(w => w.weight);
    const minV = Math.min(...vals) * 0.99;
    const maxV = Math.max(...vals) * 1.01;
    return weightHistory.map((w, i) => {
      const x = chartPadding + (i * (chartWidth - chartPadding * 2)) / (weightHistory.length - 1);
      const y = chartHeight - chartPadding - ((w.weight - minV) / (maxV - minV)) * (chartHeight - chartPadding * 2);
      return `${x},${y}`;
    }).join(' ');
  }, [weightHistory]);

  // ─── Helpers ──────────────────────────────────────────────────────────────────
  const formatDateFriendly = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return 'Today';
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
  };

  const isWslError = dbError.toLowerCase().includes('econnrefused') && (dbError.includes('::1') || dbError.includes('localhost'));

  // ─── Loading/Unmounted States ─────────────────────────────────────────────────
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070709] px-4 text-zinc-100 font-sans">
        <div className="flex items-center gap-2 text-zinc-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          Loading TrackFit...
        </div>
      </div>
    );
  }

  // ─── Onboarding ───────────────────────────────────────────────────────────────
  if (!dbConnected) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070709] px-4 text-zinc-100 font-sans relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-violet-700/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#111116]/80 border border-[#23232f] backdrop-blur-md shadow-2xl relative z-10 rounded-2xl p-6 space-y-4">
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 shadow-lg shadow-indigo-500/25 mb-4 animate-pulse">
              <Dumbbell className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Welcome to TrackFit
            </h1>
            <p className="text-zinc-400 text-sm">
              A private fitness tracker. Connect your PostgreSQL database to get started.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="conn-str" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              PostgreSQL Connection String
            </Label>
            <div className="relative">
              <Database className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                id="conn-str"
                type="text"
                placeholder="postgresql://user:pass@host:5432/dbname"
                value={dbConn}
                onChange={(e) => setDbConn(e.target.value)}
                className="pl-9 bg-[#171720]/80 border-[#2a2a38] text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
              />
            </div>
            <p className="text-[11px] text-zinc-500 flex items-start gap-1">
              <Info className="h-3 w-3 mt-0.5 shrink-0" />
              We auto-create all tables. For WSL/local Postgres, use <code className="text-indigo-400 mx-1">127.0.0.1</code> instead of <code className="text-indigo-400 mx-1">localhost</code>.
            </p>
          </div>

          {dbError && (
            <div className="rounded-lg bg-red-950/40 border border-red-900/60 p-3 text-xs text-red-400 flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{dbError}</span>
              </div>
              {isWslError && (
                <div className="ml-6 p-2.5 bg-blue-950/30 border border-blue-900/40 rounded-lg text-blue-300 text-[11px]">
                  <strong>💡 WSL Fix:</strong> Replace <code className="text-blue-200">localhost</code> with <code className="text-blue-200">127.0.0.1</code> in your connection string. PostgreSQL in WSL listens on IPv4, but Windows resolves localhost as IPv6 (::1).
                  <div className="mt-1.5 font-mono bg-blue-950/40 rounded px-2 py-1 text-[10px] break-all">
                    postgresql://user:pass@127.0.0.1:5432/dbname
                  </div>
                </div>
              )}
            </div>
          )}

          <Button
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium h-11 rounded-xl"
            onClick={() => verifyDatabase(dbConn)}
            disabled={isCheckingDb || !dbConn}
          >
            {isCheckingDb ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Testing & Migrating Schema...
              </div>
            ) : 'Connect Database'}
          </Button>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-[#23232f]"></div>
            <span className="mx-4 text-zinc-600 text-xs font-semibold uppercase tracking-wider">or</span>
            <div className="flex-grow border-t border-[#23232f]"></div>
          </div>

          <Button
            variant="outline"
            className="w-full bg-[#181822] border-[#2c2c3e] hover:bg-[#232331] text-zinc-300 font-medium h-11 rounded-xl"
            onClick={enableDemoMode}
          >
            <Sparkles className="mr-2 h-4 w-4 text-emerald-400" />
            Try Demo Mode (Local Storage)
          </Button>
          <p className="text-center text-[10px] text-zinc-600">TrackFit v1.1.0 — Own your data.</p>
        </div>
      </div>
    );
  }

  // ─── Sidebar Nav Item ─────────────────────────────────────────────────────────
  const SidebarNavItem = ({ tab, icon: Icon, label }: { tab: TabId; icon: React.ElementType; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        activeTab === tab
          ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
          : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </button>
  );

  // ─── Main App UI ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#070709] text-zinc-200 font-sans flex overflow-x-hidden">

      {/* ── Desktop Sidebar (lg+) ── */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-[#0d0d12] border-r border-[#1b1b26]/80 sticky top-0 h-screen z-30 p-4 gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-2 py-1 mb-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-md">
            <Dumbbell className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">TrackFit</h1>
            {isDemoMode && <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest block leading-none">Demo</span>}
          </div>
        </div>

        {/* Date Navigator */}
        <div className="flex items-center justify-between bg-[#181822] rounded-xl px-3 py-2 border border-[#252530]">
          <button onClick={() => shiftDate(-1)} className="text-zinc-500 hover:text-zinc-200 transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="text-center">
            <p className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">Viewing</p>
            <p className="text-xs font-bold text-zinc-200">{formatDateFriendly(activeDate)}</p>
          </div>
          <button onClick={() => shiftDate(1)} className="text-zinc-500 hover:text-zinc-200 transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          <SidebarNavItem tab="dashboard" icon={Activity} label="Overview" />
          <SidebarNavItem tab="food" icon={Utensils} label="Meals" />
          <SidebarNavItem tab="workout" icon={Dumbbell} label="Workout" />
          <SidebarNavItem tab="insights" icon={BarChart3} label="Insights" />
          <SidebarNavItem tab="settings" icon={SettingsIcon} label="Settings" />
        </nav>

        {/* Status */}
        <div className="mt-auto">
          <div className={`px-3 py-2 rounded-xl text-[10px] flex items-center gap-2 ${isDemoMode ? 'bg-emerald-950/30 text-emerald-400 border border-emerald-900/40' : 'bg-indigo-950/30 text-indigo-400 border border-indigo-900/40'}`}>
            <div className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            {isDemoMode ? 'Local Demo Mode' : 'PostgreSQL Connected'}
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Mobile Header */}
        <header className="lg:hidden px-5 py-4 border-b border-[#1b1b26]/60 flex items-center justify-between bg-[#0d0d12]/95 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center">
              <Dumbbell className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">TrackFit</h1>
              {isDemoMode && <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest block leading-none">Demo Mode</span>}
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-[#171722]/80 border border-[#232333]/80 px-2.5 py-1 rounded-full text-[11px] text-zinc-400">
            <CalendarIcon className="h-3 w-3 text-indigo-400" />
            <span className="font-semibold">{formatDateFriendly(activeDate)}</span>
          </div>
        </header>

        {/* Mobile Date Strip */}
        <div className="lg:hidden bg-[#101016]/40 px-4 py-2.5 border-b border-[#1b1b26]/40 flex items-center justify-between shrink-0 text-xs">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400" onClick={() => shiftDate(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium text-zinc-400">
            {activeDate ? new Date(activeDate + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
          </span>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400" onClick={() => shiftDate(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Desktop Page Title */}
        <div className="hidden lg:flex items-center justify-between px-8 py-5 border-b border-[#1b1b26]/40">
          <div>
            <h2 className="text-xl font-bold text-zinc-100">
              {activeTab === 'dashboard' && 'Overview'}
              {activeTab === 'food' && 'Meal Tracker'}
              {activeTab === 'workout' && 'Workout Log'}
              {activeTab === 'insights' && 'Insights & Trends'}
              {activeTab === 'settings' && 'Settings'}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {new Date(activeDate + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          {!isDemoMode && (
            <div className="text-[11px] text-indigo-400 flex items-center gap-1.5 bg-indigo-950/30 border border-indigo-900/40 px-3 py-1.5 rounded-full">
              <Database className="h-3 w-3" /> PostgreSQL Connected
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-4 lg:px-8 py-4 lg:py-6 pb-24 lg:pb-8 space-y-4 lg:space-y-6">

          {loading ? (
            <div className="space-y-4 pt-8">
              <div className="flex items-center justify-center gap-2 text-zinc-400 text-sm">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                Loading...
              </div>
              <Skeleton className="h-36 w-full rounded-2xl bg-[#14141d]" />
              <Skeleton className="h-44 w-full rounded-2xl bg-[#14141d]" />
            </div>
          ) : (
            <>
              {/* ══ TAB: DASHBOARD ══ */}
              {activeTab === 'dashboard' && (
                <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">

                  {/* Calorie Ring */}
                  <Card className="bg-gradient-to-b from-[#14141c] to-[#101017] border-[#222231]/80 rounded-2xl overflow-hidden">
                    <CardContent className="pt-6 flex flex-col items-center">
                      <div className="relative flex items-center justify-center w-36 h-36">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="72" cy="72" r="62" className="stroke-[#1d1d29]" strokeWidth="10" fill="transparent" />
                          <circle
                            cx="72" cy="72" r="62"
                            className="stroke-emerald-400 transition-all duration-500"
                            strokeWidth="10"
                            strokeDasharray={2 * Math.PI * 62}
                            strokeDashoffset={2 * Math.PI * 62 * (1 - Math.min(1, dailyTotals.calories / goals.calories))}
                            strokeLinecap="round" fill="transparent"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center text-center">
                          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Remaining</span>
                          <span className="text-3xl font-extrabold text-white">{remainingMacros.calories}</span>
                          <span className="text-[10px] text-zinc-400">of {goals.calories} kcal</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 w-full mt-5 pt-4 border-t border-[#1b1b27]/60 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-400" />
                          <div>
                            <span className="text-zinc-500 block leading-none text-[10px] mb-0.5">Consumed</span>
                            <span className="font-bold text-zinc-300">{Math.round(dailyTotals.calories)} kcal</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 justify-end text-right">
                          <div className="h-2 w-2 rounded-full bg-indigo-500" />
                          <div>
                            <span className="text-zinc-500 block leading-none text-[10px] mb-0.5">Sets Logged</span>
                            <span className="font-bold text-zinc-300">{workoutLogs.length}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Macronutrients */}
                  <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl">
                    <CardHeader className="py-4 px-5">
                      <div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300">
                        <Apple className="h-4 w-4 text-indigo-400" /> Daily Macros
                      </div>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 space-y-3.5 text-xs">
                      {[
                        { label: 'Protein', val: dailyTotals.protein, goal: goals.protein, color: 'bg-orange-400' },
                        { label: 'Carbs', val: dailyTotals.carbs, goal: goals.carbs, color: 'bg-indigo-400' },
                        { label: 'Fiber', val: dailyTotals.fiber, goal: goals.fiber, color: 'bg-teal-400' },
                        { label: 'Fat', val: dailyTotals.fat, goal: goals.fat, color: 'bg-yellow-400' },
                      ].map(m => (
                        <div key={m.label} className="space-y-1.5">
                          <div className="flex justify-between font-semibold">
                            <span className="text-zinc-400 flex items-center gap-1">
                              <span className={`h-2.5 w-2.5 rounded-full ${m.color} inline-block`} />{m.label}
                            </span>
                            <span className="text-zinc-300">{Math.round(m.val)}g <span className="text-zinc-500 font-normal">/ {m.goal}g</span></span>
                          </div>
                          <div className="h-2 w-full bg-[#181822] rounded-full overflow-hidden">
                            <div className={`h-full ${m.color} transition-all duration-500 rounded-full`} style={{ width: `${Math.min(100, (m.val / m.goal) * 100)}%` }} />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Water & Weight mini cards */}
                  <div className="grid grid-cols-2 gap-3 lg:col-span-2">
                    <Card className="bg-[#0e1218] border-[#1a2530]/80 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Droplets className="h-4 w-4 text-sky-400" />
                        <span className="text-xs font-semibold text-zinc-300">Water</span>
                      </div>
                      <div className="text-2xl font-extrabold text-sky-300">{(totalWaterToday / 1000).toFixed(1)}L</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">of {(waterGoalMl / 1000).toFixed(1)}L goal</div>
                      <div className="h-1.5 w-full bg-[#181822] rounded-full overflow-hidden mt-3">
                        <div className="h-full bg-sky-400 transition-all duration-500 rounded-full" style={{ width: `${Math.min(100, (totalWaterToday / waterGoalMl) * 100)}%` }} />
                      </div>
                      <div className="flex gap-1.5 mt-3 flex-wrap">
                        {[250, 500].map(ml => (
                          <button
                            key={ml}
                            onClick={() => handleLogWater(ml)}
                            className="text-[10px] bg-sky-950/40 border border-sky-900/50 text-sky-300 px-2 py-1 rounded-lg hover:bg-sky-900/40 transition-colors cursor-pointer font-medium"
                          >
                            +{ml}ml
                          </button>
                        ))}
                      </div>
                    </Card>

                    <Card className="bg-[#100e18] border-[#201a30]/80 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Scale className="h-4 w-4 text-violet-400" />
                        <span className="text-xs font-semibold text-zinc-300">Weight</span>
                      </div>
                      {weightLog ? (
                        <>
                          <div className="text-2xl font-extrabold text-violet-300">{displayWeight(weightLog.weight)}</div>
                          <div className="text-[10px] text-zinc-500 mt-0.5">{weightUnit} logged today</div>
                          {weightHistory.length >= 2 && (() => {
                            const prev = weightHistory[weightHistory.length - 2]?.weight;
                            const curr = weightLog.weight;
                            const delta = curr - prev;
                            return (
                              <div className={`text-[11px] font-semibold mt-2 ${delta > 0 ? 'text-orange-400' : 'text-emerald-400'}`}>
                                {delta > 0 ? '+' : ''}{(weightUnit === 'lbs' ? delta * 2.20462 : delta).toFixed(1)} {weightUnit} vs yesterday
                              </div>
                            );
                          })()}
                        </>
                      ) : (
                        <>
                          <div className="text-sm text-zinc-500 italic mb-3">Not logged yet</div>
                          <div className="flex gap-1.5">
                            <Input
                              type="number"
                              step="0.1"
                              placeholder={weightUnit}
                              value={weightFormValue || ''}
                              onChange={(e) => setWeightFormValue(Number(e.target.value))}
                              className="bg-[#181822] border-[#242436] text-xs h-7 w-20 text-center"
                            />
                            <button
                              onClick={handleLogWeight}
                              className="text-[10px] bg-violet-600/30 border border-violet-600/50 text-violet-300 px-2 rounded-lg hover:bg-violet-600/40 cursor-pointer font-medium"
                            >Log</button>
                          </div>
                        </>
                      )}
                    </Card>
                  </div>

                  {/* Sandwich Tool */}
                  <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl relative overflow-hidden lg:col-span-2">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-400 via-indigo-500 to-teal-400" />
                    <CardHeader className="py-4 px-5">
                      <div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300">
                        <Sparkles className="h-4 w-4 text-orange-400" /> Should I Eat This?
                      </div>
                      <CardDescription className="text-[11px] text-zinc-500">Check if a snack fits your remaining daily targets.</CardDescription>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 space-y-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Label className="text-zinc-400 shrink-0 w-16">Item</Label>
                        <Input type="text" value={sandName} onChange={(e) => setSandName(e.target.value)} className="h-8 bg-[#181822] border-[#222233] text-zinc-300 text-xs rounded-lg" />
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        {[
                          { label: 'Cal', val: sandCalories, set: setSandCalories },
                          { label: 'Protein (g)', val: sandProtein, set: setSandProtein },
                          { label: 'Carbs (g)', val: sandCarbs, set: setSandCarbs },
                          { label: 'Fat (g)', val: sandFat, set: setSandFat },
                        ].map(f => (
                          <div key={f.label} className="flex items-center gap-1.5">
                            <Label className="text-zinc-400 shrink-0 text-[10px] w-16">{f.label}</Label>
                            <Input type="number" value={f.val || ''} onChange={(e) => f.set(Number(e.target.value))} className="h-7 bg-[#181822] border-[#222233] text-[10px] rounded-lg" />
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {[
                          { emoji: '🥪', name: 'Toastie', cal: 340, p: 18, c: 32, f: 12, fi: 2 },
                          { emoji: '🍪', name: 'Cookie', cal: 220, p: 3, c: 30, f: 10, fi: 1 },
                          { emoji: '🥛', name: 'Protein Shake', cal: 250, p: 35, c: 15, f: 4, fi: 0 },
                          { emoji: '🍫', name: 'Snickers', cal: 250, p: 4, c: 33, f: 12, fi: 1 },
                        ].map(preset => (
                          <button
                            key={preset.name}
                            onClick={() => { setSandName(`${preset.emoji} ${preset.name}`); setSandCalories(preset.cal); setSandProtein(preset.p); setSandCarbs(preset.c); setSandFat(preset.f); setSandFiber(preset.fi); setSandVerdict(null); }}
                            className="text-[10px] bg-[#171720] border border-[#242436] text-zinc-400 px-2 py-1 rounded-full hover:text-white transition-colors cursor-pointer"
                          >
                            {preset.emoji} {preset.name}
                          </button>
                        ))}
                      </div>
                      {sandVerdict ? (
                        <div className={`rounded-xl border p-3.5 space-y-1.5 ${sandVerdict.status === 'green' ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-400' : sandVerdict.status === 'yellow' ? 'bg-yellow-950/20 border-yellow-900/40 text-yellow-300' : sandVerdict.status === 'orange' ? 'bg-orange-950/20 border-orange-900/40 text-orange-400' : 'bg-red-950/20 border-red-900/40 text-red-400'}`}>
                          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-xs">
                            <span className={`h-2.5 w-2.5 rounded-full inline-block ${sandVerdict.status === 'green' ? 'bg-emerald-400' : sandVerdict.status === 'yellow' ? 'bg-yellow-400' : sandVerdict.status === 'orange' ? 'bg-orange-400' : 'bg-red-400'}`} />
                            {sandVerdict.text}
                          </div>
                          <p className="text-zinc-300 text-[11px]">{sandVerdict.justification}</p>
                          <button onClick={() => setSandVerdict(null)} className="text-[10px] text-zinc-600 hover:text-zinc-400 cursor-pointer">Reset</button>
                        </div>
                      ) : (
                        <Button className="w-full bg-[#1e1e2c] border border-[#2b2b3f] hover:bg-[#28283a] text-zinc-300 font-semibold h-9 rounded-xl" onClick={calculateVerdict}>
                          Analyze Budget Impact
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* ══ TAB: FOOD ══ */}
              {activeTab === 'food' && (
                <div className="space-y-4 text-xs">
                  <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <span className="text-zinc-500 uppercase tracking-widest text-[9px] font-semibold">Total Consumed</span>
                      <h3 className="text-xl font-bold text-white mt-0.5">{Math.round(dailyTotals.calories)} kcal</h3>
                    </div>
                    <div className="flex gap-4 border-l border-[#222233] pl-4 text-center">
                      <div><span className="text-orange-400 font-bold block">{Math.round(dailyTotals.protein)}g</span><span className="text-zinc-500 text-[9px]">Protein</span></div>
                      <div><span className="text-indigo-400 font-bold block">{Math.round(dailyTotals.carbs)}g</span><span className="text-zinc-500 text-[9px]">Carbs</span></div>
                      <div><span className="text-yellow-400 font-bold block">{Math.round(dailyTotals.fat)}g</span><span className="text-zinc-500 text-[9px]">Fat</span></div>
                    </div>
                  </Card>

                  <div className="lg:grid lg:grid-cols-2 lg:gap-4 space-y-4 lg:space-y-0">
                    {(['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const).map((mealType) => {
                      const meals = foodLogs.filter(f => f.mealType === mealType);
                      return (
                        <Card key={mealType} className="bg-[#111116] border-[#222231]/80 rounded-2xl overflow-hidden">
                          <div className="px-4 py-3 bg-[#15151e]/40 border-b border-[#212130]/30 flex justify-between items-center font-bold">
                            <span className="text-zinc-300 font-semibold">{mealType}</span>
                            <span className="text-indigo-400 text-xs">{Math.round(meals.reduce((s, m) => s + m.calories, 0))} kcal</span>
                          </div>
                          <CardContent className="p-0">
                            {meals.length === 0 ? (
                              <p className="text-zinc-600 italic text-[11px] p-4">Nothing logged here.</p>
                            ) : (
                              <div className="divide-y divide-[#20202d]/40">
                                {meals.map(food => (
                                  <div key={food.id} className="p-3.5 flex items-center justify-between">
                                    <div className="space-y-0.5 max-w-[75%]">
                                      <h4 className="font-semibold text-zinc-200 text-xs truncate">{food.foodName}</h4>
                                      <p className="text-[10px] text-zinc-500">{food.quantity}g · P:{Math.round(food.protein)}g · C:{Math.round(food.carbs)}g · F:{Math.round(food.fat)}g</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-zinc-300 text-xs">{Math.round(food.calories)} kcal</span>
                                      <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-600 hover:text-red-400" onClick={() => handleDeleteFood(food.id)}>
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <Dialog open={foodDialogOpen} onOpenChange={(open) => { setFoodDialogOpen(open); if (!open) resetFoodForm(); }}>
                    <DialogTrigger className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold h-11 rounded-xl shadow-lg transition-all flex items-center justify-center cursor-pointer">
                      <Plus className="h-4 w-4 mr-1.5" /> Log Food / Meal
                    </DialogTrigger>
                    <DialogContent className="bg-[#121219] border-[#222233] text-zinc-100 max-w-sm rounded-3xl p-5">
                      <DialogHeader>
                        <DialogTitle>Add Food to Log</DialogTitle>
                        <DialogDescription className="text-xs text-zinc-500">Search Open Food Facts or enter custom macros.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-2 relative">
                        <Label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Search Open Food Facts</Label>
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
                          <Input type="text" placeholder="e.g. peanut butter, oats..." value={foodSearchQuery} onChange={(e) => setFoodSearchQuery(e.target.value)} className="pl-8 bg-[#181822] border-[#242436] text-xs h-9" />
                        </div>
                        {searchingFood && <div className="text-[11px] text-zinc-500 text-center">Searching...</div>}
                        {foodSearchResults.length > 0 && (
                          <div className="absolute top-16 left-0 w-full max-h-48 overflow-y-auto bg-[#1a1a26] border border-[#2d2d3f] rounded-lg shadow-xl z-50 divide-y divide-[#242434]">
                            {foodSearchResults.map((item, idx) => (
                              <button key={idx} className="w-full text-left px-3 py-2 text-[11px] hover:bg-[#222233] flex items-center gap-2 text-zinc-300" onClick={() => handleSelectFoodSearch(item)}>
                                {item.image ? <img src={item.image} alt="" className="h-6 w-6 object-cover rounded bg-zinc-800" /> : <div className="h-6 w-6 rounded bg-[#2c2c3e] flex items-center justify-center text-[10px]">🍎</div>}
                                <span className="truncate">{item.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {selectedFoodItem && (
                        <div className="p-2.5 bg-indigo-950/20 border border-indigo-900/35 rounded-lg flex justify-between items-center">
                          <span className="font-semibold text-indigo-400 text-[11px] truncate max-w-[80%]">Linked: {selectedFoodItem.name}</span>
                          <Button variant="ghost" size="icon" className="h-5 w-5 text-indigo-400" onClick={() => setSelectedFoodItem(null)}><X className="h-3.5 w-3.5" /></Button>
                        </div>
                      )}
                      <div className="space-y-2 border-t border-[#1d1d2b] pt-3">
                        <div className="flex gap-2">
                          <div className="space-y-1 flex-1">
                            <Label className="text-[10px] text-zinc-500">Food Name</Label>
                            <Input type="text" value={foodFormName} onChange={(e) => setFoodFormName(e.target.value)} className="bg-[#181822] border-[#242436] text-xs h-8" placeholder="Apples" />
                          </div>
                          <div className="space-y-1 w-24">
                            <Label className="text-[10px] text-zinc-500">Weight (g)</Label>
                            <Input type="number" value={foodFormQuantity || ''} onChange={(e) => setFoodFormQuantity(Number(e.target.value))} className="bg-[#181822] border-[#242436] text-xs h-8" />
                          </div>
                        </div>
                        <div className="bg-[#151520]/30 p-2.5 rounded-xl border border-[#212130]/60">
                          <span className="text-[9px] text-zinc-500 block mb-1.5 uppercase font-bold tracking-wider">Macros per 100g</span>
                          <div className="grid grid-cols-5 gap-2">
                            {[
                              { label: 'Cal', val: foodFormCalories, set: setFoodFormCalories },
                              { label: 'Prot', val: foodFormProtein, set: setFoodFormProtein },
                              { label: 'Carb', val: foodFormCarbs, set: setFoodFormCarbs },
                              { label: 'Fib', val: foodFormFiber, set: setFoodFormFiber },
                              { label: 'Fat', val: foodFormFat, set: setFoodFormFat },
                            ].map(f => (
                              <div key={f.label} className="space-y-0.5">
                                <Label className="text-[9px] text-zinc-500">{f.label}</Label>
                                <Input type="number" value={f.val || ''} onChange={(e) => f.set(Number(e.target.value))} className="bg-[#181822] border-[#242436] text-[10px] px-1 h-7 text-center" />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] text-zinc-500">Meal Section</Label>
                          <Select value={foodFormMealType} onValueChange={(val: any) => setFoodFormMealType(val)}>
                            <SelectTrigger className="bg-[#181822] border-[#242436] h-8 text-xs">
                              <SelectValue placeholder="Select meal type" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#181822] border-[#242436] text-xs">
                              <SelectItem value="Breakfast">Breakfast</SelectItem>
                              <SelectItem value="Lunch">Lunch</SelectItem>
                              <SelectItem value="Dinner">Dinner</SelectItem>
                              <SelectItem value="Snack">Snack</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter className="pt-2">
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-9 rounded-lg" onClick={handleAddCustomFood} disabled={!foodFormName || !foodFormQuantity}>
                          Log Food
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}

              {/* ══ TAB: WORKOUT ══ */}
              {activeTab === 'workout' && (
                <div className="space-y-4 text-xs">
                  {workoutLogs.length === 0 ? (
                    <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl p-6 text-center text-zinc-500">
                      <Dumbbell className="h-8 w-8 text-zinc-600 mx-auto mb-2.5" />
                      <p className="italic">No workouts logged today.</p>
                      <p className="text-[10px] mt-1 text-zinc-600">Search and select exercises below.</p>
                    </Card>
                  ) : (
                    <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
                      {Object.keys(groupedWorkouts).map((exerciseName) => {
                        const sets = groupedWorkouts[exerciseName];
                        return (
                          <Card key={exerciseName} className="bg-[#111116] border-[#222231]/80 rounded-2xl overflow-hidden">
                            <div className="px-4 py-3 bg-[#15151e]/40 border-b border-[#212130]/30 flex justify-between items-center font-bold text-zinc-300">
                              <span>{exerciseName}</span>
                              <span className="text-zinc-500 text-[10px] font-normal">{sets.length} sets</span>
                            </div>
                            <CardContent className="p-0 text-zinc-300 divide-y divide-[#20202d]/40">
                              {sets.map(set => (
                                <div key={set.id} className="p-3 flex items-center justify-between">
                                  <span className="font-semibold text-indigo-400">Set {set.setNumber}</span>
                                  <div className="flex items-center gap-4">
                                    <span className="font-bold">{set.weight} kg</span>
                                    <span className="text-zinc-500">×</span>
                                    <span className="font-bold text-zinc-200">{set.reps} reps</span>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-600 hover:text-red-400" onClick={() => handleDeleteWorkoutSet(set.id, set.exerciseName)}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}

                  <Dialog open={workoutDialogOpen} onOpenChange={(open) => { setWorkoutDialogOpen(open); if (!open) { setSelectedExercise(''); setExerciseSearchQuery(''); } }}>
                    <DialogTrigger className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold h-11 rounded-xl shadow-lg transition-all flex items-center justify-center cursor-pointer">
                      <Plus className="h-4 w-4 mr-1.5" /> Log Exercise Set
                    </DialogTrigger>
                    <DialogContent className="bg-[#121219] border-[#222233] text-zinc-100 max-w-sm rounded-3xl p-5">
                      <DialogHeader>
                        <DialogTitle>Log Exercise Set</DialogTitle>
                        <DialogDescription className="text-xs text-zinc-500">Search the open-source exercise database.</DialogDescription>
                      </DialogHeader>
                      {!selectedExercise ? (
                        <div className="space-y-2 relative">
                          <Label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Search Exercise</Label>
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-500" />
                            <Input type="text" placeholder="e.g. Bench Press, Squat..." value={exerciseSearchQuery} onChange={(e) => setExerciseSearchQuery(e.target.value)} className="pl-8 bg-[#181822] border-[#242436] text-xs h-9" />
                          </div>
                          {exerciseSearchResults.length > 0 && (
                            <div className="absolute top-16 left-0 w-full max-h-48 overflow-y-auto bg-[#1a1a26] border border-[#2d2d3f] rounded-lg shadow-xl z-50 divide-y divide-[#242434]">
                              {exerciseSearchResults.map((ex, idx) => (
                                <button key={idx} className="w-full text-left px-3.5 py-2 text-[11px] hover:bg-[#222233] text-zinc-300" onClick={() => selectExerciseForLogging(ex.name)}>
                                  <div className="font-semibold">{ex.name}</div>
                                  <div className="text-[9px] text-zinc-500 mt-0.5">{ex.category} · {ex.primaryMuscles?.join(', ')}</div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="p-3 bg-indigo-950/20 border border-indigo-900/35 rounded-xl flex justify-between items-center">
                            <div>
                              <span className="text-[9px] text-zinc-500 uppercase tracking-wider block font-bold">Selected</span>
                              <span className="font-bold text-zinc-200 text-xs">{selectedExercise}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-indigo-400" onClick={() => setSelectedExercise('')}><X className="h-4 w-4" /></Button>
                          </div>
                          {exerciseHistory.length > 0 && (
                            <div className="p-2.5 bg-[#171722]/50 border border-[#222235]/60 rounded-xl text-[10px]">
                              <span className="text-[9px] text-zinc-500 uppercase tracking-wider block font-bold mb-1">Previous Sets</span>
                              {exerciseHistory.slice(0, 3).map((w, idx) => (
                                <div key={idx} className="flex justify-between text-zinc-400">
                                  <span>Set {w.setNumber} ({w.date})</span>
                                  <span className="font-bold">{w.weight}kg × {w.reps}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-3.5 border-t border-[#1d1d2b] pt-3">
                            <div className="space-y-1">
                              <Label className="text-[10px] text-zinc-500">Weight (kg)</Label>
                              <Input type="number" step="0.5" value={workoutFormWeight || ''} onChange={(e) => setWorkoutFormWeight(Number(e.target.value))} className="bg-[#181822] border-[#242436] text-xs h-8" />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-[10px] text-zinc-500">Reps</Label>
                              <Input type="number" value={workoutFormReps || ''} onChange={(e) => setWorkoutFormReps(Number(e.target.value))} className="bg-[#181822] border-[#242436] text-xs h-8" />
                            </div>
                          </div>
                          <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-9 rounded-lg" onClick={handleLogSet}>Add Set</Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              )}

              {/* ══ TAB: INSIGHTS ══ */}
              {activeTab === 'insights' && (
                <div className="space-y-4 text-xs">
                  {/* Sub-tab switcher */}
                  <div className="flex bg-zinc-950 border border-zinc-800/60 rounded-xl p-0.5 gap-0.5">
                    {(['calories', 'weight', 'water'] as InsightSubTab[]).map(t => (
                      <button
                        key={t}
                        onClick={() => setInsightSubTab(t)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer capitalize ${insightSubTab === t ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
                      >
                        {t === 'calories' && <Flame className="h-3.5 w-3.5" />}
                        {t === 'weight' && <Scale className="h-3.5 w-3.5" />}
                        {t === 'water' && <Droplets className="h-3.5 w-3.5" />}
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* ── Calories Sub-tab ── */}
                  {insightSubTab === 'calories' && (
                    <div className="space-y-4">
                      <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl overflow-hidden">
                        <CardHeader className="py-4 px-5 pb-2">
                          <div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300">
                            <TrendingUp className="h-4 w-4 text-indigo-400" /> 7-Day Calorie Trend
                          </div>
                          <CardDescription className="text-[10px] text-zinc-500">vs daily target ({goals.calories} kcal)</CardDescription>
                        </CardHeader>
                        <CardContent className="px-3 pb-4">
                          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full overflow-visible mt-2">
                            <line x1={chartPadding} y1={chartHeight - chartPadding} x2={chartWidth - chartPadding} y2={chartHeight - chartPadding} className="stroke-[#1b1b26]" strokeWidth="1" />
                            <line x1={chartPadding} y1={targetLineY} x2={chartWidth - chartPadding} y2={targetLineY} className="stroke-red-500/50" strokeWidth="1.2" strokeDasharray="4,4" />
                            <text x={chartWidth - chartPadding - 5} y={targetLineY - 4} className="fill-red-400/80 text-[8px]" textAnchor="end">Target</text>
                            {chartPoints && <polyline fill="none" className="stroke-indigo-500" strokeWidth="2.5" points={chartPoints} strokeLinecap="round" />}
                            {historyData.map((d, i) => {
                              const x = chartPadding + (i * (chartWidth - chartPadding * 2)) / (historyData.length - 1);
                              const y = chartHeight - chartPadding - (d.calories / maxChartCal) * (chartHeight - chartPadding * 2);
                              const isActive = d.date === activeDate;
                              return (
                                <g key={i}>
                                  <circle cx={x} cy={y} r={isActive ? 4 : 3} className={isActive ? 'fill-emerald-400 stroke-[#0d0d12] stroke-2' : 'fill-indigo-400'} />
                                  <text x={x} y={chartHeight - 6} className="fill-zinc-500 text-[8px]" textAnchor="middle">{d.label}</text>
                                  <text x={x} y={y - 8} className="fill-zinc-400 text-[7px]" textAnchor="middle">{d.calories > 0 ? d.calories : ''}</text>
                                </g>
                              );
                            })}
                          </svg>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-2 gap-3.5">
                        <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl p-4 text-center">
                          <Flame className="h-5 w-5 text-emerald-400 mx-auto mb-1.5" />
                          <span className="text-zinc-500 text-[9px] uppercase tracking-wider block font-bold">7-Day Avg</span>
                          <h4 className="text-base font-extrabold text-white mt-0.5">
                            {Math.round(historyData.reduce((s, d) => s + d.calories, 0) / 7)} kcal
                          </h4>
                        </Card>
                        <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl p-4 text-center">
                          <Activity className="h-5 w-5 text-indigo-400 mx-auto mb-1.5" />
                          <span className="text-zinc-500 text-[9px] uppercase tracking-wider block font-bold">Goal</span>
                          <h4 className="text-base font-extrabold text-white mt-0.5">{goals.calories} kcal</h4>
                        </Card>
                      </div>
                    </div>
                  )}

                  {/* ── Weight Sub-tab ── */}
                  {insightSubTab === 'weight' && (
                    <div className="space-y-4">
                      {/* Log today's weight */}
                      <Card className="bg-[#100e18] border-[#201a30]/80 rounded-2xl">
                        <CardHeader className="py-4 px-5 pb-3">
                          <div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300">
                            <Scale className="h-4 w-4 text-violet-400" /> Today's Weight
                          </div>
                        </CardHeader>
                        <CardContent className="px-5 pb-5">
                          {weightLog ? (
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-3xl font-extrabold text-violet-300">{displayWeight(weightLog.weight)} <span className="text-sm text-zinc-400 font-normal">{weightUnit}</span></div>
                                {weightHistory.length >= 2 && (() => {
                                  const prev = weightHistory[weightHistory.length - 2]?.weight;
                                  if (!prev) return null;
                                  const delta = weightLog.weight - prev;
                                  return (
                                    <div className={`text-xs font-semibold mt-1 ${delta > 0 ? 'text-orange-400' : 'text-emerald-400'}`}>
                                      {delta > 0 ? '▲' : '▼'} {Math.abs(weightUnit === 'lbs' ? delta * 2.20462 : delta).toFixed(1)} {weightUnit} vs yesterday
                                    </div>
                                  );
                                })()}
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-600 hover:text-red-400" onClick={() => { setWeightLog(null); setWeightFormValue(0); }}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <Input
                                type="number" step="0.1"
                                placeholder={`Weight in ${weightUnit}`}
                                value={weightFormValue || ''}
                                onChange={(e) => setWeightFormValue(Number(e.target.value))}
                                className="bg-[#181822] border-[#242436] text-sm h-10 flex-1"
                              />
                              <Button className="bg-violet-600 hover:bg-violet-500 text-white h-10 px-4" onClick={handleLogWeight}>Log</Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Weight Trend Chart */}
                      <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl overflow-hidden">
                        <CardHeader className="py-4 px-5 pb-2">
                          <div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300">
                            <TrendingUp className="h-4 w-4 text-violet-400" /> 30-Day Weight Trend
                          </div>
                          <CardDescription className="text-[10px] text-zinc-500">in {weightUnit}</CardDescription>
                        </CardHeader>
                        <CardContent className="px-3 pb-4">
                          {weightHistory.length < 2 ? (
                            <div className="text-center text-zinc-600 text-xs py-8 italic">Log weight on multiple days to see the trend chart.</div>
                          ) : (
                            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full overflow-visible mt-2">
                              <line x1={chartPadding} y1={chartHeight - chartPadding} x2={chartWidth - chartPadding} y2={chartHeight - chartPadding} className="stroke-[#1b1b26]" strokeWidth="1" />
                              {weightChartPoints && <polyline fill="none" className="stroke-violet-500" strokeWidth="2.5" points={weightChartPoints} strokeLinecap="round" />}
                              {(() => {
                                const vals = weightHistory.map(w => w.weight);
                                const minV = Math.min(...vals) * 0.99;
                                const maxV = Math.max(...vals) * 1.01;
                                return weightHistory.map((w, i) => {
                                  const x = chartPadding + (i * (chartWidth - chartPadding * 2)) / (weightHistory.length - 1);
                                  const y = chartHeight - chartPadding - ((w.weight - minV) / (maxV - minV)) * (chartHeight - chartPadding * 2);
                                  const isToday = w.date === activeDate;
                                  return (
                                    <g key={i}>
                                      <circle cx={x} cy={y} r={isToday ? 4 : 2.5} className={isToday ? 'fill-emerald-400 stroke-[#0d0d12] stroke-2' : 'fill-violet-400'} />
                                      {(i === 0 || i === weightHistory.length - 1 || isToday) && (
                                        <text x={x} y={y - 7} className="fill-zinc-400 text-[7px]" textAnchor="middle">
                                          {displayWeight(w.weight)}
                                        </text>
                                      )}
                                    </g>
                                  );
                                });
                              })()}
                            </svg>
                          )}
                        </CardContent>
                      </Card>

                      {/* Weight stats */}
                      {weightHistory.length >= 2 && (
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { label: 'Current', val: weightHistory[weightHistory.length - 1]?.weight },
                            { label: 'Min (30d)', val: Math.min(...weightHistory.map(w => w.weight)) },
                            { label: 'Max (30d)', val: Math.max(...weightHistory.map(w => w.weight)) },
                          ].map(s => (
                            <Card key={s.label} className="bg-[#111116] border-[#222231]/80 rounded-xl p-3 text-center">
                              <span className="text-zinc-500 text-[9px] uppercase tracking-wider block font-bold">{s.label}</span>
                              <h4 className="text-sm font-extrabold text-white mt-0.5">{s.val ? displayWeight(s.val) : '—'} <span className="text-[9px] text-zinc-500 font-normal">{weightUnit}</span></h4>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Water Sub-tab ── */}
                  {insightSubTab === 'water' && (
                    <div className="space-y-4">
                      {/* Water Progress Ring + Quick Log */}
                      <Card className="bg-[#0e1218] border-[#1a2530]/80 rounded-2xl">
                        <CardHeader className="py-4 px-5 pb-3">
                          <div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300">
                            <Droplets className="h-4 w-4 text-sky-400" /> Today's Hydration
                          </div>
                        </CardHeader>
                        <CardContent className="px-5 pb-5 space-y-4">
                          {/* Ring */}
                          <div className="flex items-center gap-6">
                            <div className="relative flex items-center justify-center w-24 h-24 shrink-0">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="48" cy="48" r="40" className="stroke-[#1a2530]" strokeWidth="8" fill="transparent" />
                                <circle
                                  cx="48" cy="48" r="40"
                                  className="stroke-sky-400 transition-all duration-500"
                                  strokeWidth="8"
                                  strokeDasharray={2 * Math.PI * 40}
                                  strokeDashoffset={2 * Math.PI * 40 * (1 - Math.min(1, totalWaterToday / waterGoalMl))}
                                  strokeLinecap="round" fill="transparent"
                                />
                              </svg>
                              <div className="absolute flex flex-col items-center text-center">
                                <span className="text-lg font-extrabold text-sky-300">{(totalWaterToday / 1000).toFixed(1)}</span>
                                <span className="text-[9px] text-zinc-500">/ {(waterGoalMl / 1000).toFixed(1)}L</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-zinc-400 mb-2">Quick Add</p>
                              <div className="grid grid-cols-2 gap-2">
                                {[150, 250, 350, 500].map(ml => (
                                  <button
                                    key={ml}
                                    onClick={() => handleLogWater(ml)}
                                    className="bg-sky-950/40 border border-sky-900/50 text-sky-300 text-xs py-2 rounded-xl hover:bg-sky-900/40 transition-colors cursor-pointer font-semibold"
                                  >
                                    +{ml}ml
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Today's log list */}
                          {waterLogs.length > 0 && (
                            <div className="border-t border-[#1a2530]/60 pt-3 space-y-1.5">
                              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-2">Today's Log</p>
                              {waterLogs.map((w, i) => (
                                <div key={w.id} className="flex items-center justify-between py-1">
                                  <div className="flex items-center gap-2">
                                    <Droplets className="h-3 w-3 text-sky-500" />
                                    <span className="text-zinc-300">{w.amount}ml</span>
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-600 hover:text-red-400" onClick={() => handleDeleteWater(w.id)}>
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Water Trend Bar Chart */}
                      <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl overflow-hidden">
                        <CardHeader className="py-4 px-5 pb-2">
                          <div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300">
                            <BarChart3 className="h-4 w-4 text-sky-400" /> 30-Day Water Trend
                          </div>
                          <CardDescription className="text-[10px] text-zinc-500">Daily totals in ml</CardDescription>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                          {waterHistory.length === 0 ? (
                            <div className="text-center text-zinc-600 text-xs py-8 italic">No water history yet. Start logging to see your trend!</div>
                          ) : (
                            <div className="flex items-end gap-1 h-24 w-full mt-2">
                              {waterHistory.slice(-20).map((d, i) => {
                                const maxWater = Math.max(...waterHistory.map(w => w.amount), waterGoalMl);
                                const pct = Math.min(100, (d.amount / maxWater) * 100);
                                const isGoalMet = d.amount >= waterGoalMl;
                                const isToday = d.date === activeDate;
                                return (
                                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5 group">
                                    <div
                                      className={`w-full rounded-t-sm transition-all duration-500 ${isToday ? 'bg-sky-300' : isGoalMet ? 'bg-sky-500/70' : 'bg-sky-800/60'}`}
                                      style={{ height: `${pct}%`, minHeight: 2 }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          {waterHistory.length > 0 && (
                            <div className="flex justify-between text-[9px] text-zinc-600 mt-1">
                              <span>{waterHistory.slice(-20)[0]?.date?.slice(5)}</span>
                              <span className="text-sky-600/80">Goal: {waterGoalMl}ml</span>
                              <span>{waterHistory.slice(-20)[waterHistory.slice(-20).length - 1]?.date?.slice(5)}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Water Stats */}
                      {waterHistory.length > 0 && (
                        <div className="grid grid-cols-2 gap-3">
                          <Card className="bg-[#111116] border-[#222231]/80 rounded-xl p-3 text-center">
                            <span className="text-zinc-500 text-[9px] uppercase tracking-wider block font-bold">Today</span>
                            <h4 className="text-base font-extrabold text-white mt-0.5">{(totalWaterToday / 1000).toFixed(2)}L</h4>
                          </Card>
                          <Card className="bg-[#111116] border-[#222231]/80 rounded-xl p-3 text-center">
                            <span className="text-zinc-500 text-[9px] uppercase tracking-wider block font-bold">30d Avg</span>
                            <h4 className="text-base font-extrabold text-white mt-0.5">
                              {(waterHistory.reduce((s, w) => s + w.amount, 0) / waterHistory.length / 1000).toFixed(2)}L
                            </h4>
                          </Card>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ══ TAB: SETTINGS ══ */}
              {activeTab === 'settings' && (
                <div className="space-y-4 text-xs lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0 lg:items-start">

                  {/* Database Settings */}
                  <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl">
                    <CardHeader className="py-4 px-5">
                      <div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300">
                        <Database className="h-4 w-4 text-indigo-400" /> Database
                      </div>
                      <CardDescription className="text-[10px] text-zinc-500">Manage your Postgres connection.</CardDescription>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 space-y-3">
                      <div className={`rounded-lg p-3 text-[11px] flex items-start gap-2 ${isDemoMode ? 'bg-emerald-950/20 border border-emerald-900/40 text-emerald-400' : 'bg-indigo-950/20 border border-indigo-900/40 text-indigo-400'}`}>
                        <Check className="h-4 w-4 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">{isDemoMode ? 'Local Storage Mode' : 'PostgreSQL Connected'}</span>
                          <p className="text-zinc-400 mt-1">{isDemoMode ? 'Data saved in browser sandbox.' : 'Data synced to your private database.'}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Connection String</Label>
                        <Input type="text" value={dbConn} onChange={(e) => setDbConn(e.target.value)} placeholder="postgresql://user:pass@127.0.0.1:5432/dbname" className="bg-[#181822] border-[#242436] text-[11px] h-9" />
                        <p className="text-[10px] text-zinc-600 flex items-center gap-1">
                          <Info className="h-3 w-3" />
                          WSL users: use <code className="text-indigo-400 mx-1">127.0.0.1</code> not <code className="text-indigo-400 mx-1">localhost</code>
                        </p>
                      </div>
                      {dbError && (
                        <div className="rounded-lg bg-red-950/40 border border-red-900/60 p-3 text-[11px] text-red-400 flex flex-col gap-2">
                          <div className="flex items-start gap-2"><AlertCircle className="h-4 w-4 mt-0.5 shrink-0" /><span>{dbError}</span></div>
                          {isWslError && (
                            <div className="ml-6 p-2 bg-blue-950/30 border border-blue-900/40 rounded text-blue-300 text-[10px]">
                              💡 WSL Fix: Replace <code>localhost</code> → <code>127.0.0.1</code>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-9 rounded-lg" onClick={() => verifyDatabase(dbConn)} disabled={isCheckingDb || !dbConn}>
                          {isCheckingDb ? 'Connecting...' : 'Connect / Update'}
                        </Button>
                        {dbConnected && (
                          <Button variant="destructive" className="bg-red-950/40 border border-red-900/60 hover:bg-red-900/40 text-red-400 text-xs h-9 rounded-lg" onClick={disconnectDb}>
                            Disconnect
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Wellness Goals */}
                  <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl">
                    <CardHeader className="py-4 px-5">
                      <div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300">
                        <Droplets className="h-4 w-4 text-sky-400" /> Wellness Settings
                      </div>
                      <CardDescription className="text-[10px] text-zinc-500">Configure water & weight preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 space-y-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Weight Unit</Label>
                        <div className="flex gap-2">
                          {(['kg', 'lbs'] as const).map(unit => (
                            <button
                              key={unit}
                              onClick={() => { setWeightUnit(unit); safeLocalSet('trackfit_weight_unit', unit); }}
                              className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-colors cursor-pointer ${weightUnit === unit ? 'bg-violet-600/20 border-violet-500/50 text-violet-300' : 'bg-[#181822] border-[#242436] text-zinc-400 hover:text-zinc-200'}`}
                            >
                              {unit}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Daily Water Goal (ml)</Label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            value={waterGoalMl || ''}
                            onChange={(e) => setWaterGoalMl(Number(e.target.value))}
                            className="bg-[#181822] border-[#242436] text-xs h-9 flex-1"
                            step={250}
                            min={500}
                            max={6000}
                          />
                          <Button className="bg-sky-700/40 hover:bg-sky-700/60 text-sky-300 border border-sky-700/50 text-xs h-9" onClick={() => safeLocalSet('trackfit_water_goal', String(waterGoalMl))}>
                            <Check className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <div className="flex gap-1.5">
                          {[1500, 2000, 2500, 3000].map(ml => (
                            <button key={ml} onClick={() => { setWaterGoalMl(ml); safeLocalSet('trackfit_water_goal', String(ml)); }} className="text-[10px] bg-[#171720] border border-[#242436] text-zinc-400 px-2 py-1 rounded-lg hover:text-sky-300 hover:border-sky-900/60 transition-colors cursor-pointer">
                              {ml}ml
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Nutrition Goals */}
                  <Card className="bg-[#111116] border-[#222231]/80 rounded-2xl lg:col-span-2">
                    <CardHeader className="py-4 px-5">
                      <div className="text-sm font-semibold flex items-center gap-1.5 text-zinc-300">
                        <SettingsIcon className="h-4 w-4 text-indigo-400" /> Daily Nutrition Targets
                      </div>
                      <CardDescription className="text-[10px] text-zinc-500">Update your nutritional objectives.</CardDescription>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 space-y-3.5">
                      <div className="space-y-1">
                        <Label className="text-[10px] text-zinc-500">Daily Calorie Target (kcal)</Label>
                        <Input type="number" value={goalFormCalories || ''} onChange={(e) => setGoalFormCalories(Number(e.target.value))} className="bg-[#181822] border-[#242436] text-xs h-8" />
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                          { label: 'Protein (g)', val: goalFormProtein, set: setGoalFormProtein },
                          { label: 'Carbohydrates (g)', val: goalFormCarbs, set: setGoalFormCarbs },
                          { label: 'Fiber (g)', val: goalFormFiber, set: setGoalFormFiber },
                          { label: 'Fat (g)', val: goalFormFat, set: setGoalFormFat },
                        ].map(f => (
                          <div key={f.label} className="space-y-1">
                            <Label className="text-[10px] text-zinc-500">{f.label}</Label>
                            <Input type="number" value={f.val || ''} onChange={(e) => f.set(Number(e.target.value))} className="bg-[#181822] border-[#242436] text-xs h-8" />
                          </div>
                        ))}
                      </div>
                      <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs h-9 rounded-lg" onClick={handleUpdateGoals}>
                        Save Daily Goals
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-[#0d0d12]/95 border-t border-[#1b1b26]/80 backdrop-blur-md flex items-center justify-around py-3 px-2 z-50">
        {[
          { tab: 'dashboard' as TabId, icon: Activity, label: 'Overview' },
          { tab: 'food' as TabId, icon: Utensils, label: 'Meals' },
          { tab: 'workout' as TabId, icon: Dumbbell, label: 'Workout' },
          { tab: 'insights' as TabId, icon: BarChart3, label: 'Insights' },
          { tab: 'settings' as TabId, icon: SettingsIcon, label: 'Settings' },
        ].map(({ tab, icon: Icon, label }) => (
          <button
            key={tab}
            className={`flex flex-col items-center gap-1.5 transition-all text-[10px] font-medium ${activeTab === tab ? 'text-indigo-400 scale-[1.05]' : 'text-zinc-500 hover:text-zinc-300'}`}
            onClick={() => setActiveTab(tab)}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
