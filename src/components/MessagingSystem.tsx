import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { 
  Search, 
  MessageCircle, 
  Send, 
  Smile, 
  Paperclip, 
  Mic,
  MoreVertical,
  ArrowLeft,
  Phone,
  Video,
  Info,
  Check,
  CheckCheck
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isSent: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  isTyping: boolean;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Grace M.',
    avatar: '🙏',
    lastMessage: 'Thank you for your prayers! God came through',
    timestamp: '2m ago',
    unreadCount: 2,
    isOnline: true,
    isTyping: false,
    messages: [
      {
        id: 'm1',
        senderId: '1',
        senderName: 'Grace M.',
        content: 'Hi! I saw your prayer request on The Wall',
        timestamp: '10:30 AM',
        isRead: true,
        isSent: false
      },
      {
        id: 'm2',
        senderId: 'me',
        senderName: 'You',
        content: 'Thank you for reaching out! 🙏',
        timestamp: '10:32 AM',
        isRead: true,
        isSent: true
      },
      {
        id: 'm3',
        senderId: '1',
        senderName: 'Grace M.',
        content: 'Thank you for your prayers! God came through',
        timestamp: '2m ago',
        isRead: false,
        isSent: false
      }
    ]
  },
  {
    id: '2',
    name: 'Tech for Good Circle',
    avatar: '💻',
    lastMessage: 'John: Meeting at 3 PM tomorrow',
    timestamp: '1h ago',
    unreadCount: 0,
    isOnline: false,
    isTyping: false,
    messages: [
      {
        id: 'm4',
        senderId: '2',
        senderName: 'John',
        content: 'Meeting at 3 PM tomorrow',
        timestamp: '1h ago',
        isRead: true,
        isSent: false
      }
    ]
  },
  {
    id: '3',
    name: 'Pastor James',
    avatar: '📖',
    lastMessage: 'Great question! Let me share some resources...',
    timestamp: '3h ago',
    unreadCount: 0,
    isOnline: false,
    isTyping: false,
    messages: [
      {
        id: 'm5',
        senderId: 'me',
        senderName: 'You',
        content: 'I have a question about today\'s sermon',
        timestamp: '3h ago',
        isRead: true,
        isSent: true
      },
      {
        id: 'm6',
        senderId: '3',
        senderName: 'Pastor James',
        content: 'Great question! Let me share some resources...',
        timestamp: '3h ago',
        isRead: true,
        isSent: false
      }
    ]
  },
  {
    id: '4',
    name: 'Sarah K. (Mentor)',
    avatar: '🌟',
    lastMessage: 'Your progress has been amazing!',
    timestamp: 'Yesterday',
    unreadCount: 1,
    isOnline: true,
    isTyping: false,
    messages: [
      {
        id: 'm7',
        senderId: '4',
        senderName: 'Sarah K.',
        content: 'Your progress has been amazing!',
        timestamp: 'Yesterday',
        isRead: false,
        isSent: false
      }
    ]
  }
];

export default function MessagingSystem() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: 'me',
      senderName: 'You',
      content: messageInput,
      timestamp: 'Just now',
      isRead: false,
      isSent: true
    };

    setConversations(conversations.map(conv =>
      conv.id === selectedConversation.id
        ? {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: messageInput,
            timestamp: 'Just now'
          }
        : conv
    ));

    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage]
    });

    setMessageInput('');
    toast.success('Message sent! ✉️');
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="flex flex-col h-screen bg-background">
      {selectedConversation ? (
        /* Chat Interface */
        <div className="flex flex-col h-full">
          {/* Chat Header */}
          <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setSelectedConversation(null)}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xl">
                  {selectedConversation.avatar}
                </div>
                {selectedConversation.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm text-foreground truncate">{selectedConversation.name}</h3>
                {selectedConversation.isTyping ? (
                  <p className="text-xs text-primary">typing...</p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation.isOnline ? 'Online' : 'Offline'}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Info className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${message.senderId === 'me' ? 'order-1' : 'order-2'}`}>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.senderId === 'me'
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1 px-1">
                    <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                    {message.senderId === 'me' && (
                      message.isRead ? (
                        <CheckCheck className="w-3 h-3 text-blue-500" />
                      ) : (
                        <Check className="w-3 h-3 text-muted-foreground" />
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-end gap-2">
              <div className="flex-1 bg-muted rounded-2xl px-4 py-2 flex items-center gap-2">
                <Textarea
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1 resize-none border-0 bg-transparent focus-visible:ring-0 p-0 min-h-[40px] max-h-[120px]"
                  rows={1}
                />
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="h-12 w-12 rounded-full p-0 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Conversations List */
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-xl text-foreground flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Messages
              </h1>
              {totalUnread > 0 && (
                <Badge className="bg-red-500 text-white">
                  {totalUnread}
                </Badge>
              )}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 rounded-xl"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-3 opacity-50" />
                <p className="text-muted-foreground">No conversations yet</p>
                <p className="text-sm text-muted-foreground mt-1">Connect with people on The Wall to start chatting</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className="w-full p-4 hover:bg-accent/50 transition-colors border-b border-border text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xl">
                        {conversation.avatar}
                      </div>
                      {conversation.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm text-foreground truncate">{conversation.name}</h3>
                        <span className="text-xs text-muted-foreground shrink-0 ml-2">{conversation.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate flex-1">
                          {conversation.isTyping ? (
                            <span className="text-primary">typing...</span>
                          ) : (
                            conversation.lastMessage
                          )}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge className="ml-2 shrink-0 h-5 min-w-[20px] px-1.5 bg-red-500 text-white text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
