import { Link } from 'react-router-dom';
import { MessageCircle, Activity, BookOpen, Heart, Brain, Smile, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import HelplineButton from '@/components/HelplineButton';

const Index = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Chat Support",
      description: "Talk to our empathetic AI companion anytime you need someone to listen",
      link: "/chat",
      gradient: "bg-gradient-to-br from-primary/20 to-accent/20"
    },
    {
      icon: Activity,
      title: "Mood Check-in",
      description: "Track your daily emotions and get personalized wellness suggestions", 
      link: "/mood",
      gradient: "bg-gradient-to-br from-happy/20 to-calm/20"
    },
    {
      icon: TrendingUp,
      title: "Emotion Heatmap",
      description: "Visualize your mental health journey with a 7-day mood tracker",
      link: "/mood",
      gradient: "bg-gradient-to-br from-neutral/20 to-worried/20"
    },
    {
      icon: BookOpen,
      title: "Mental Health Resources",
      description: "Access helplines, breathing exercises, and wellness tips for students",
      link: "/resources", 
      gradient: "bg-gradient-to-br from-accent/20 to-primary/20"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Heart className="w-16 h-16 text-primary animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Digital Mental Health Companion
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Safe, supportive, and anonymous help for students. Your mental wellness journey starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/chat">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Chat
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/mood">
                  <Smile className="w-5 h-5 mr-2" />
                  Mood Check-in
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/resources">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Resources
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Mental Wellness Toolkit
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed specifically for students to support mental health and emotional wellbeing
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="mood-card group cursor-pointer">
                <Link to={feature.link} className="block">
                  <div className={`p-6 rounded-lg mb-4 ${feature.gradient} transition-all group-hover:scale-105`}>
                    <feature.icon className="w-12 h-12 text-foreground mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Features Section */}
      <section className="calm-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Makes MindfulSpace Special
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="mood-card text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Smart Crisis Detection</h3>
              <p className="text-sm text-muted-foreground">
                Automatically detects concerning language and provides immediate support resources
              </p>
            </Card>

            <Card className="mood-card text-center">
              <div className="w-16 h-16 bg-happy/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-happy" />
              </div>
              <h3 className="text-lg font-bold mb-2">Mood-Based Suggestions</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized breathing exercises, music, and affirmations based on your current mood
              </p>
            </Card>

            <Card className="mood-card text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">Visual Progress Tracking</h3>
              <p className="text-sm text-muted-foreground">
                See your emotional patterns with beautiful heatmaps and gain insights into your mental health trends
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Card className="mood-card max-w-2xl mx-auto p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of students who are taking control of their mental health with MindfulSpace.
            </p>
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/chat">
                Begin Your Journey
              </Link>
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-primary mr-2" />
            <span className="font-bold">MindfulSpace</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            A mental health support tool designed for students
          </p>
          <p className="text-xs text-muted-foreground">
            This is a support tool, not a substitute for professional medical advice. 
            If experiencing a crisis, please contact emergency services immediately.
          </p>
        </div>
      </footer>

      <HelplineButton />
    </div>
  );
};

export default Index;
