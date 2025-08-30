import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import HelplineButton from '@/components/HelplineButton';
import { 
  saveMood, 
  getMoods, 
  moodToColor, 
  formatDateLabel, 
  suggestForMood,
  type MoodEntry 
} from '@/lib/mental-health-utils';
import { useToast } from '@/hooks/use-toast';

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [moodHistory, setMoodHistory] = useState<(MoodEntry | null)[]>([]);
  const [suggestion, setSuggestion] = useState<any>(null);
  const { toast } = useToast();

  const moods = [
    { emoji: '😄', label: 'Happy', value: 'happy' },
    { emoji: '😌', label: 'Calm', value: 'calm' },
    { emoji: '😐', label: 'Neutral', value: 'neutral' },
    { emoji: '😟', label: 'Worried', value: 'worried' },
    { emoji: '😢', label: 'Sad', value: 'sad' }
  ];

  useEffect(() => {
    loadMoodHistory();
  }, []);

  const loadMoodHistory = () => {
    const history = getMoods(7);
    setMoodHistory(history);
  };

  const handleMoodSubmit = () => {
    if (!selectedMood) return;

    const today = new Date().toISOString().split('T')[0];
    const moodEntry: MoodEntry = {
      dateISO: today,
      mood: selectedMood as any
    };

    saveMood(moodEntry);
    loadMoodHistory();
    
    const newSuggestion = suggestForMood(selectedMood);
    setSuggestion(newSuggestion);
    
    toast({
      title: "Mood saved!",
      description: "Your mood has been recorded for today.",
    });
    
    setSelectedMood('');
  };

  const handleResetHistory = () => {
    localStorage.removeItem('mentalHealth_moods');
    loadMoodHistory();
    toast({
      title: "History cleared",
      description: "Your mood history has been reset.",
    });
  };

  const renderSuggestion = () => {
    if (!suggestion) return null;

    if (suggestion.type === 'breathing') {
      return (
        <Card className="p-6 bg-calm/20">
          <h3 className="font-bold mb-3 flex items-center">
            🌬️ Breathing Exercise
          </h3>
          <p className="mb-4">{suggestion.payload}</p>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full breathing-animation flex items-center justify-center mb-4">
              <span className="text-3xl">🫁</span>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>• Inhale for 4 counts</p>
              <p>• Hold for 7 counts</p>
              <p>• Exhale for 8 counts</p>
              <p>• Repeat 3-4 times</p>
            </div>
          </div>
        </Card>
      );
    }

    if (suggestion.type === 'affirmation') {
      return (
        <Card className="p-6 bg-happy/20">
          <h3 className="font-bold mb-3 flex items-center">
            💝 Positive Affirmation
          </h3>
          <p className="text-lg italic text-center">{suggestion.payload}</p>
        </Card>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="hero-gradient rounded-xl p-6 mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Mood Check-in</h1>
          <p className="text-muted-foreground">How are you feeling today? Your emotions matter.</p>
        </div>

        {/* Mood Picker */}
        <Card className="mood-card mb-6">
          <h2 className="text-xl font-bold mb-4">Select Your Mood</h2>
          <div className="grid grid-cols-5 gap-4 mb-6">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`mood-emoji ${selectedMood === mood.value ? 'bg-primary/20 scale-110' : ''}`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <span className="text-sm font-medium">{mood.label}</span>
                </div>
              </button>
            ))}
          </div>
          <Button 
            onClick={handleMoodSubmit} 
            disabled={!selectedMood}
            className="w-full"
          >
            Save Today's Mood
          </Button>
        </Card>

        {/* Suggestion Card */}
        {suggestion && (
          <div className="mb-6">
            {renderSuggestion()}
          </div>
        )}

        {/* 7-Day Emotion Heatmap */}
        <Card className="mood-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">7-Day Mood Tracker</h2>
            <Button variant="outline" size="sm" onClick={handleResetHistory}>
              Reset History
            </Button>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {moodHistory.map((entry, index) => {
              const date = new Date();
              date.setDate(date.getDate() - index);
              const dateISO = date.toISOString().split('T')[0];
              
              return (
                <div key={index} className="text-center">
                  <div className="text-xs mb-1 font-medium">
                    {formatDateLabel(dateISO)}
                  </div>
                  <div 
                    className="mood-grid-cell"
                    style={{ backgroundColor: moodToColor(entry?.mood || null) }}
                    title={entry ? `${entry.mood} on ${formatDateLabel(entry.dateISO)}` : 'No data'}
                  >
                    {entry && moods.find(m => m.value === entry.mood)?.emoji}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-4 text-xs">
            {moods.map((mood) => (
              <div key={mood.value} className="flex items-center space-x-1">
                <div 
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: moodToColor(mood.value) }}
                />
                <span>{mood.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <HelplineButton />
    </div>
  );
};

export default Mood;