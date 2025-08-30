import { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import HelplineButton from '@/components/HelplineButton';
import { detectCrisis, suggestForMood, saveJournalEntry, getRandomAffirmation, HELPLINES } from '@/lib/mental-health-utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  suggestion?: {
    type: 'music' | 'breathing' | 'affirmation';
    payload: string;
  };
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi 👋 Welcome to MindfulSpace! How are you feeling today? I'm here to listen and support you.",
      isUser: false
    }
  ]);
  const [input, setInput] = useState('');
  const [isVentMode, setIsVentMode] = useState(false);
  const [ventText, setVentText] = useState('');
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { text: "I feel stressed", mood: "worried" },
    { text: "I'm feeling anxious", mood: "worried" },
    { text: "I'm okay today", mood: "calm" },
    { text: "I feel really sad", mood: "sad" },
    { text: "I'm happy!", mood: "happy" }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (text: string, isUser: boolean, suggestion?: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      suggestion
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    addMessage(input, true);

    // Check for crisis
    if (detectCrisis(input)) {
      setShowCrisisModal(true);
    }

    // Generate response
    generateResponse(input);
    setInput('');
  };

  const generateResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    let response = "";
    let suggestion = null;

    // Mood detection and response
    if (lowerInput.includes('stressed') || lowerInput.includes('stress')) {
      response = "I hear that you're feeling stressed. That's completely normal, and I'm here to help you through it.";
      suggestion = suggestForMood('worried');
    } else if (lowerInput.includes('anxious') || lowerInput.includes('anxiety')) {
      response = "Anxiety can be overwhelming. Let's take this one step at a time together.";
      suggestion = suggestForMood('worried');
    } else if (lowerInput.includes('sad') || lowerInput.includes('depressed')) {
      response = "I'm sorry you're feeling sad. Your feelings are valid, and you don't have to go through this alone.";
      suggestion = suggestForMood('sad');
    } else if (lowerInput.includes('happy') || lowerInput.includes('good') || lowerInput.includes('great')) {
      response = "I'm so glad to hear you're feeling positive! It's wonderful when we can appreciate these moments.";
      suggestion = suggestForMood('happy');
    } else if (lowerInput.includes('okay') || lowerInput.includes('fine')) {
      response = "Thank you for sharing. Sometimes feeling 'okay' is enough, and that's perfectly fine.";
      suggestion = suggestForMood('calm');
    } else {
      // General supportive responses
      const responses = [
        "Thank you for sharing that with me. How can I support you today?",
        "I appreciate you opening up. Your feelings matter.",
        "I'm here to listen. Would you like to tell me more about how you're feeling?",
        "That sounds important. I'm glad you felt comfortable sharing it with me."
      ];
      response = responses[Math.floor(Math.random() * responses.length)];
    }

    setTimeout(() => {
      addMessage(response, false, suggestion);
    }, 1000);
  };

  const handleQuickPrompt = (prompt: { text: string; mood: string }) => {
    addMessage(prompt.text, true);
    
    const suggestion = suggestForMood(prompt.mood);
    const responses = {
      worried: "I understand you're feeling stressed. Let's work through this together.",
      sad: "I'm here with you. It's okay to feel sad sometimes.",
      happy: "That's wonderful to hear! I'm happy you're feeling good.",
      calm: "It sounds like you're in a peaceful place today. That's great."
    };
    
    const response = responses[prompt.mood as keyof typeof responses] || "Thank you for sharing how you're feeling.";
    
    setTimeout(() => {
      addMessage(response, false, suggestion);
    }, 1000);
  };

  const handleVentSave = () => {
    if (!ventText.trim()) return;
    
    saveJournalEntry(ventText);
    setVentText('');
    setIsVentMode(false);
    
    const empathyResponses = [
      "Thank you for trusting me with your thoughts. Writing can be very healing.",
      "I've saved your thoughts safely. You've taken a brave step by expressing yourself.",
      "Your feelings are heard and valid. I'm proud of you for sharing.",
      "That took courage to write. Your emotional honesty is a strength."
    ];
    
    const response = empathyResponses[Math.floor(Math.random() * empathyResponses.length)];
    addMessage(response, false);
  };

  const renderSuggestion = (suggestion: any) => {
    if (suggestion.type === 'breathing') {
      return (
        <div className="mt-3 p-4 bg-calm/20 rounded-lg">
          <h4 className="font-medium mb-2">🌬️ Breathing Exercise</h4>
          <p className="text-sm text-muted-foreground mb-3">Try the 4-7-8 technique:</p>
          <div className="space-y-1 text-sm">
            <p>• Inhale for 4 counts</p>
            <p>• Hold for 7 counts</p>
            <p>• Exhale for 8 counts</p>
          </div>
          <div className="w-16 h-16 mx-auto mt-3 bg-primary/20 rounded-full breathing-animation flex items-center justify-center">
            <span className="text-2xl">🫁</span>
          </div>
        </div>
      );
    }

    if (suggestion.type === 'affirmation') {
      return (
        <div className="mt-3 p-4 bg-happy/20 rounded-lg">
          <h4 className="font-medium mb-2">💝 Affirmation</h4>
          <p className="italic">{suggestion.payload}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="hero-gradient rounded-xl p-6 mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Safe Space Chat</h1>
          <p className="text-muted-foreground">Express yourself freely. I'm here to listen and support you.</p>
        </div>

        {/* Chat Messages */}
        <Card className="h-96 overflow-y-auto p-4 mb-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={message.isUser ? 'chat-bubble-user' : 'chat-bubble-bot'}>
                  <p>{message.text}</p>
                  {message.suggestion && renderSuggestion(message.suggestion)}
                </div>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </Card>

        {/* Quick Prompts */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickPrompt(prompt)}
              className="text-xs"
            >
              {prompt.text}
            </Button>
          ))}
        </div>

        {/* Vent Mode Toggle */}
        <div className="flex justify-between items-center mb-4">
          <Button
            variant={isVentMode ? "default" : "outline"}
            onClick={() => setIsVentMode(!isVentMode)}
          >
            {isVentMode ? 'Exit Vent Mode' : 'Vent Mode'}
          </Button>
        </div>

        {/* Input Area */}
        {isVentMode ? (
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-medium mb-2">Private Vent Space</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Write freely about your thoughts and feelings. This is your safe space.
              </p>
              <Textarea
                value={ventText}
                onChange={(e) => setVentText(e.target.value)}
                placeholder="Express whatever is on your mind..."
                className="min-h-32"
              />
              <div className="flex justify-end mt-3">
                <Button onClick={handleVentSave}>Save to Journal</Button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share how you're feeling..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Crisis Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-destructive mr-2" />
              <h3 className="text-lg font-bold">You're Not Alone</h3>
            </div>
            <p className="mb-4">I'm concerned about what you shared. Please know that you matter and there are people who want to help.</p>
            <div className="space-y-2 mb-4">
              {HELPLINES.slice(0, 2).map((helpline, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm">{helpline.name}</span>
                  <a href={`tel:${helpline.number}`} className="text-sm font-medium text-primary">
                    {helpline.number}
                  </a>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setShowCrisisModal(false)} variant="outline" className="flex-1">
                Continue Chat
              </Button>
              <Button onClick={() => window.location.href = '/resources'} className="flex-1">
                Get Resources
              </Button>
            </div>
          </Card>
        </div>
      )}

      <HelplineButton />
    </div>
  );
};

export default Chat;