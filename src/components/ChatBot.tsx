import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const quickReplies = [
  'How can I grow in faith? 🙏',
  'Dealing with anxiety 💭',
  'Need prayer support 🤲',
  'Struggling with doubt 💫',
  'Feeling depressed 💙',
  'Career guidance 🎯'
];

// Enhanced AI responses for faith, discipleship, and mental health
const getIntelligentResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // Faith & Discipleship Topics
  if (message.includes('faith') || message.includes('grow') || message.includes('spiritual')) {
    return "Growing in faith is a beautiful journey! 🌱 Here are some ways:\n\n📖 Daily Bible reading - Start with John's Gospel\n🙏 Prayer time - Even 5 minutes makes a difference\n🤝 Join a Circle for accountability\n💬 Share your testimony on The Wall\n\nRemember: Faith grows in community and through consistent practice. Which would you like to start with?";
  }
  
  if (message.includes('prayer') || message.includes('pray')) {
    return "Prayer is powerful! 🙏\n\nPractical tips:\n• Start simple: 'God, I need you today'\n• Use the ACTS model: Adoration, Confession, Thanksgiving, Supplication\n• Join our prayer circles for support\n• Share prayer requests on The Wall\n\nRemember: God hears every prayer, no matter how small. Would you like me to pray with you?";
  }
  
  if (message.includes('bible') || message.includes('scripture') || message.includes('verse')) {
    return "The Bible is God's love letter to you! 📖\n\nGetting started:\n• Check our Daily Verse each morning\n• Try Faith Paths for guided study\n• Use a reading plan (YouVersion is great)\n• Join a Bible study Circle\n\nRecommended for beginners:\n📘 Psalms for comfort\n📗 Proverbs for wisdom\n📙 John for Jesus's story\n\nWhat area interests you most?";
  }
  
  if (message.includes('doubt') || message.includes('question') || message.includes('confused')) {
    return "Doubts are part of the journey - even the disciples had them! 💭\n\nHere's the truth:\n✅ Questions show you're thinking deeply\n✅ God welcomes honest conversations\n✅ Many believers struggle with doubts\n\n'Lord, I believe; help my unbelief!' (Mark 9:24)\n\nLet's talk about it. What specific doubts are you facing? You're safe here.";
  }
  
  if (message.includes('discipleship') || message.includes('mentor') || message.includes('guidance')) {
    return "Discipleship transforms lives! 🌟\n\nOur approach:\n1️⃣ Find a mentor in Circles\n2️⃣ Follow structured Faith Paths\n3️⃣ Engage with community on The Wall\n4️⃣ Practice what you learn\n\n'As iron sharpens iron, so one person sharpens another.' - Proverbs 27:17\n\nWould you like help finding a mentor or joining a discipleship circle?";
  }
  
  // Mental Health Topics
  if (message.includes('anxiety') || message.includes('anxious') || message.includes('worry')) {
    return "I hear you, and your feelings are valid. Anxiety is tough. 💙\n\n🤲 Spiritual practices:\n• 'Cast all your anxiety on Him' (1 Peter 5:7)\n• Pray specifically about your worries\n• Meditate on Philippians 4:6-7\n\n🧠 Practical steps:\n• Deep breathing exercises\n• Talk to someone you trust\n• Professional counseling is wise and Biblical\n• Check our Safe Spaces map for resources\n\nYou're not alone. Want to join a mental health support Circle?";
  }
  
  if (message.includes('depress') || message.includes('sad') || message.includes('hopeless') || message.includes('dark')) {
    return "Thank you for trusting me with this. Depression is real, and you deserve support. 💙\n\n⚠️ IMPORTANT: If you're having thoughts of self-harm, please:\n📞 Kenya Mental Health Helpline: 0800 720 820\n🏥 Visit nearest hospital immediately\n\n🙏 Spiritual comfort:\n• God is close to the brokenhearted (Psalm 34:18)\n• Share anonymously on The Wall\n• Join a prayer circle\n\n💚 Next steps:\n• See a counselor (it's not weakness!)\n• Check Safe Spaces for Christian counseling\n• Connect with supportive Circles\n\nYou matter deeply. How can I help right now?";
  }
  
  if (message.includes('lonely') || message.includes('alone') || message.includes('isolated')) {
    return "Loneliness hurts, but you're not alone here. 🤗\n\nImmediate connections:\n🤝 Join a Circle - find your tribe\n💬 Post on The Wall - share your heart\n📅 Check Events Map for meetups\n🙏 Request prayer support\n\n'God places the lonely in families' - Psalm 68:6\n\nOur community is here for you. Would you like me to help you find a Circle or event nearby?";
  }
  
  if (message.includes('stress') || message.includes('overwhelm') || message.includes('pressure')) {
    return "Feeling overwhelmed is exhausting. Let's take this one step at a time. 🌊\n\n⏸️ Pause right now:\n• Take 3 deep breaths\n• 'Come to me, all who are weary' (Matthew 11:28)\n\n🛠️ Practical relief:\n1. List what you CAN control\n2. Break tasks into tiny steps\n3. Say no to what's not essential\n4. Get 7-8 hours sleep\n\n🤲 Spiritual practices:\n• Give your burdens to God in prayer\n• Join a support Circle\n• Practice Sabbath rest\n\nWhat's the biggest source of stress right now?";
  }
  
  if (message.includes('self-esteem') || message.includes('worth') || message.includes('not good enough')) {
    return "Your worth isn't based on performance - it's based on whose you are. ✨\n\nTruth about you:\n💎 You're made in God's image\n👑 You're chosen and loved\n🎯 You have unique purpose\n💪 You're capable of more than you know\n\n'I praise you because I am fearfully and wonderfully made' - Psalm 139:14\n\nActions:\n• Read Psalm 139 daily\n• List 3 things you did well today\n• Join a Circle for affirmation\n• Explore your gifts in Learn & Earn\n\nWhat makes you feel most 'not good enough'?";
  }
  
  // Relationship & Life Topics
  if (message.includes('relationship') || message.includes('dating') || message.includes('marriage')) {
    return "Godly relationships are worth the wait and work! 💕\n\nBiblical principles:\n✝️ Put God first (Matthew 6:33)\n💑 Honor over lust (1 Thessalonians 4:3-5)\n🤝 Serve one another in love\n🙏 Pray together\n\n📚 Resources:\n• Faith Paths on relationships\n• Join a relationships Circle\n• Read 'The 5 Love Languages'\n\nWhat specific relationship question do you have?";
  }
  
  if (message.includes('purpose') || message.includes('calling') || message.includes('direction')) {
    return "Discovering your purpose is an exciting journey! 🎯\n\nSteps to clarity:\n1️⃣ Pray for wisdom (James 1:5)\n2️⃣ Identify your gifts & passions\n3️⃣ Where does need meet your ability?\n4️⃣ Try things! (action brings clarity)\n5️⃣ Get mentorship in Circles\n\n'For I know the plans I have for you' - Jeremiah 29:11\n\n💡 Explore:\n• Learn & Earn skills\n• Marketplace opportunities\n• Events for networking\n\nWhat are you naturally good at?";
  }
  
  if (message.includes('job') || message.includes('career') || message.includes('work')) {
    return "Work is worship when done for God's glory! 💼\n\nCareer guidance:\n📚 Learn & Earn: Free skills training\n🤝 Network in Circles\n🛍️ Marketplace: Gig opportunities\n📅 Events: Professional meetups\n\n🙏 Spiritual perspective:\n• 'Work with all your heart' (Colossians 3:23)\n• Integrity over income\n• Your work matters to God\n\nWhat field interests you? I can point you to resources!";
  }
  
  if (message.includes('money') || message.includes('financial') || message.includes('broke')) {
    return "Financial challenges are stressful. Let's find solutions together. 💰\n\n🙏 Biblical wisdom:\n• 'God will supply all your needs' (Phil 4:19)\n• Tithe & give (it's counter-intuitive but works)\n• Contentment is key\n\n💡 Practical help:\n• Learn & Earn: Income opportunities\n• Marketplace: Freelance gigs\n• Budget accountability Circle\n• Skills for financial stability\n\nRemember: Your worth ≠ your wallet. Need specific help?";
  }
  
  // Community & Support
  if (message.includes('circle') || message.includes('group') || message.includes('community')) {
    return "Community is where transformation happens! 🤝\n\nAvailable Circles:\n🙏 Prayer Partners\n📖 Bible Study Groups\n💙 Mental Health Support\n💼 Career & Skills\n🎨 Creative Fellowship\n👥 Youth Leadership\n\n'Better together than alone' - Ecclesiastes 4:9-10\n\nNavigate to the Circles tab to find your tribe. What kind of group are you looking for?";
  }
  
  if (message.includes('event') || message.includes('meetup') || message.includes('gathering')) {
    return "Connecting in person builds lasting bonds! 📅\n\nCheck out:\n🗺️ Events Map: Upcoming Christian gatherings\n🏢 Safe Spaces: Meet for coffee & prayer\n🎓 Workshops: Skills & faith combined\n⛪ Church Services: Find your local family\n\nNavigate to the Resource Map to see what's happening near you. Want me to show you?";
  }
  
  // Default supportive responses
  const supportiveResponses = [
    "I'm listening. Tell me more about what's on your heart. 💙",
    "That's important to you, and it matters to God too. Can you help me understand better?",
    "Thank you for sharing. I want to support you well - what would be most helpful right now?",
    "I hear you. Let's explore this together. What's the main thing troubling you?",
    "Your feelings are valid. Would it help to:\n• Talk through it more?\n• Find a relevant Faith Path?\n• Connect with a Circle?\n• See nearby support resources?",
  ];
  
  return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI spiritual companion on TheCircle. 🤗\n\nTheCircle is Africa's Christian super-app connecting faith, community, and opportunity. I'm here to support you with:\n\n✝️ Faith & discipleship growth\n💙 Mental health & emotional wellness\n🙏 Prayer support & Bible guidance\n🎯 Purpose discovery & career direction\n🤝 Community connections & mentorship\n\nI combine Biblical wisdom with practical mental health support. I'm here to listen without judgment. What's on your heart today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Generate intelligent bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getIntelligentResponse(messageText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all z-50 btn-hover"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    );
  }

  return (
    <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col glass border-primary/20 animate-fadeIn">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium">Spiritual Guide</p>
            <p className="text-xs opacity-90">Always here for you</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-muted text-foreground rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground p-3 rounded-lg rounded-bl-none">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-foreground/50 rounded-full animate-pulse-custom"></span>
                <span className="w-2 h-2 bg-foreground/50 rounded-full animate-pulse-custom" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-foreground/50 rounded-full animate-pulse-custom" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply)}
              className="text-xs px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button
            onClick={() => handleSend()}
            size="icon"
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
