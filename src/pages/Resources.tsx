import { useState } from 'react';
import { Phone, RefreshCw, Heart, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import HelplineButton from '@/components/HelplineButton';
import { HELPLINES, getRandomAffirmation } from '@/lib/mental-health-utils';

const Resources = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState(getRandomAffirmation());
  const [showBreathing, setShowBreathing] = useState(false);

  const studyTips = [
    "Take regular breaks using the Pomodoro technique (25 min study, 5 min break)",
    "Create a dedicated study space free from distractions",
    "Set realistic daily goals and celebrate small achievements", 
    "Practice mindfulness before exams to reduce anxiety",
    "Connect with friends and family for emotional support during stressful periods"
  ];

  const handleNewAffirmation = () => {
    setCurrentAffirmation(getRandomAffirmation());
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="hero-gradient rounded-xl p-6 mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Mental Health Resources</h1>
          <p className="text-muted-foreground">Tools and support for your mental wellness journey</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Emergency Helplines */}
          <Card className="mood-card">
            <div className="flex items-center mb-4">
              <Phone className="w-6 h-6 text-destructive mr-2" />
              <h2 className="text-xl font-bold">24/7 Helplines</h2>
            </div>
            <div className="space-y-3">
              {HELPLINES.map((helpline, index) => (
                <div key={index} className="p-3 bg-accent/30 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-sm">{helpline.name}</h3>
                    <a 
                      href={`tel:${helpline.number}`}
                      className="text-primary font-bold hover:underline"
                    >
                      {helpline.number}
                    </a>
                  </div>
                  <p className="text-xs text-muted-foreground">{helpline.description}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              🇮🇳 India-based helplines available 24/7
            </p>
          </Card>

          {/* Breathing Exercise */}
          <Card className="mood-card">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-primary mr-2" />
              <h2 className="text-xl font-bold">Breathing Exercise</h2>
            </div>
            
            {!showBreathing ? (
              <div className="text-center">
                <p className="mb-4 text-muted-foreground">
                  Quick 4-7-8 breathing technique to reduce stress and anxiety
                </p>
                <Button onClick={() => setShowBreathing(true)} className="w-full">
                  Start Breathing Exercise
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full breathing-animation flex items-center justify-center mb-4">
                  <span className="text-4xl">🫁</span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="font-medium">Follow the rhythm:</p>
                  <div className="space-y-1 text-sm">
                    <p>🔵 Inhale through nose for <strong>4 counts</strong></p>
                    <p>⏸️ Hold breath for <strong>7 counts</strong></p>
                    <p>🔴 Exhale through mouth for <strong>8 counts</strong></p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setShowBreathing(false)} className="flex-1">
                    Stop
                  </Button>
                  <Button onClick={() => setShowBreathing(true)} className="flex-1">
                    Restart
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Positive Affirmations */}
          <Card className="mood-card">
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-happy mr-2" />
              <h2 className="text-xl font-bold">Daily Affirmation</h2>
            </div>
            <div className="text-center">
              <div className="bg-happy/20 p-6 rounded-lg mb-4">
                <p className="text-lg italic font-medium">{currentAffirmation}</p>
              </div>
              <Button onClick={handleNewAffirmation} variant="outline" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                New Affirmation
              </Button>
            </div>
          </Card>

          {/* Study Stress Tips */}
          <Card className="mood-card">
            <h2 className="text-xl font-bold mb-4">Student Wellness Tips</h2>
            <div className="space-y-3">
              {studyTips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Important Disclaimer */}
        <Card className="mood-card mt-6 bg-muted/50">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Important:</strong> This is a support tool, not a substitute for professional medical advice.
            </p>
            <p>
              If you're experiencing a mental health crisis, please contact emergency services or the helplines above immediately.
            </p>
          </div>
        </Card>
      </div>

      <HelplineButton />
    </div>
  );
};

export default Resources;