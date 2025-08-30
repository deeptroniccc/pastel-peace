export interface MoodEntry {
  dateISO: string;
  mood: 'happy' | 'calm' | 'neutral' | 'worried' | 'sad';
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  timestamp: number;
}

export interface MoodSuggestion {
  type: 'music' | 'breathing' | 'affirmation';
  payload: string;
}

// Crisis detection keywords
const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'hopeless', 'end it', 'can\'t go on',
  'worthless', 'hate myself', 'want to die', 'no point', 'give up'
];

// Affirmations for mental wellness
const AFFIRMATIONS = [
  "You are stronger than you know.",
  "This feeling is temporary, you are permanent.",
  "Your mental health matters, and so do you.",
  "It's okay to not be okay. You're not alone.",
  "You have survived difficult days before, you can do it again.",
  "Your feelings are valid, and seeking help is brave.",
  "One step at a time is still progress.",
  "You deserve kindness, especially from yourself.",
  "Your story isn't over yet. Keep writing.",
  "You are worthy of love and support."
];

// Save mood entry to localStorage
export function saveMood(entry: MoodEntry): void {
  const moods = getMoods(30); // Keep 30 days of history
  const existingIndex = moods.findIndex(m => m?.dateISO === entry.dateISO);
  
  if (existingIndex !== -1) {
    moods[existingIndex] = entry;
  } else {
    moods.unshift(entry);
  }
  
  localStorage.setItem('mentalHealth_moods', JSON.stringify(moods.slice(0, 30)));
}

// Get mood entries for the last N days
export function getMoods(days = 7): (MoodEntry | null)[] {
  const stored = localStorage.getItem('mentalHealth_moods');
  const moods: MoodEntry[] = stored ? JSON.parse(stored) : [];
  
  const result: (MoodEntry | null)[] = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateISO = date.toISOString().split('T')[0];
    
    const mood = moods.find(m => m.dateISO === dateISO);
    result.push(mood || null);
  }
  
  return result;
}

// Convert mood to color for visualization
export function moodToColor(mood: string | null): string {
  const colors = {
    happy: 'hsl(var(--happy))',
    calm: 'hsl(var(--calm))',
    neutral: 'hsl(var(--neutral))',
    worried: 'hsl(var(--worried))',
    sad: 'hsl(var(--sad))',
  };
  
  return mood && mood in colors ? colors[mood as keyof typeof colors] : '#e5e5e5';
}

// Detect crisis keywords in text
export function detectCrisis(text: string): boolean {
  const lowerText = text.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

// Get suggestion based on mood
export function suggestForMood(mood: string): MoodSuggestion {
  const suggestions = {
    happy: {
      type: 'affirmation' as const,
      payload: "Keep that positive energy flowing! You're doing great."
    },
    calm: {
      type: 'affirmation' as const,
      payload: "Your sense of peace is a strength. Embrace this moment."
    },
    neutral: {
      type: 'breathing' as const,
      payload: "Try a quick breathing exercise to center yourself."
    },
    worried: {
      type: 'breathing' as const,
      payload: "Let's calm those worries with some deep breathing."
    },
    sad: {
      type: 'affirmation' as const,
      payload: "Your feelings are valid. Remember, you're not alone in this."
    }
  };
  
  return suggestions[mood as keyof typeof suggestions] || suggestions.neutral;
}

// Format date for display
export function formatDateLabel(dateISO: string): string {
  const date = new Date(dateISO);
  return date.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit' });
}

// Get random affirmation
export function getRandomAffirmation(): string {
  return AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
}

// Save journal entry
export function saveJournalEntry(content: string): void {
  const entries = getJournalEntries();
  const newEntry: JournalEntry = {
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    content,
    timestamp: Date.now()
  };
  
  entries.unshift(newEntry);
  localStorage.setItem('mentalHealth_journal', JSON.stringify(entries.slice(0, 50))); // Keep 50 entries max
}

// Get journal entries
export function getJournalEntries(): JournalEntry[] {
  const stored = localStorage.getItem('mentalHealth_journal');
  return stored ? JSON.parse(stored) : [];
}

// Emergency helplines (India focused)
export const HELPLINES = [
  { name: "KIRAN Mental Health Helpline", number: "1800-599-0019", description: "24/7 Mental Health Support" },
  { name: "iCall Helpline", number: "9152987821", description: "Counseling Support" },
  { name: "NIMHANS Helpline", number: "080-46110007", description: "Mental Health Emergency" },
  { name: "Sneha Foundation", number: "044-24640050", description: "Emotional Support" }
];