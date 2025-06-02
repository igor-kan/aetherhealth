
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, MessageCircle, Mic, MicOff, Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

const Consultation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      content: "Hello! I'm your AI healthcare assistant. What brings you in today? You can type your response or use voice input.",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      content: message,
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: "ai",
        content: "Thank you for sharing that information. Can you tell me more about when these symptoms started and their severity level?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would integrate with speech-to-text API
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white/95 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">AI Consultation</h1>
                  <p className="text-sm text-blue-600">Secure & HIPAA Compliant</p>
                </div>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              Session Active
            </Badge>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="h-[600px] flex flex-col border-blue-100">
          {/* Chat Header */}
          <div className="p-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-full">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Dr. Aether AI</h3>
                  <p className="text-sm text-gray-600">Healthcare Assistant</p>
                </div>
              </div>
              <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
                <MessageCircle className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-blue-100 bg-gray-50">
            <div className="flex space-x-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your symptoms..."
                className="min-h-[60px] resize-none border-blue-200 focus:border-blue-400"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={toggleRecording}
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  className="px-3"
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 px-3"
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              All conversations are encrypted and HIPAA compliant. Press Enter to send.
            </p>
          </div>
        </Card>

        {/* Progress Indicator */}
        <Card className="mt-6 p-4 border-blue-100">
          <h3 className="font-semibold text-gray-900 mb-3">Consultation Progress</h3>
          <div className="flex items-center space-x-4">
            <Badge className="bg-blue-100 text-blue-700">Step 1: Symptom Collection</Badge>
            <Badge variant="outline" className="text-gray-500">Step 2: AI Analysis</Badge>
            <Badge variant="outline" className="text-gray-500">Step 3: Treatment Plan</Badge>
            <Badge variant="outline" className="text-gray-500">Step 4: Provider Review</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Consultation;
