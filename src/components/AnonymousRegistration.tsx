import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, Phone } from 'lucide-react';

interface AnonymousRegistrationProps {
  onComplete: (data: { displayName: string; purpose: string[]; phoneNumber?: string }) => void;
}

const purposeOptions = [
  'Explore faith',
  'Find community',
  'Learn skills',
  'Healing & peace',
  'All of the above'
];

export default function AnonymousRegistration({ onComplete }: AnonymousRegistrationProps) {
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState<string[]>([]);

  const togglePurpose = (purpose: string) => {
    if (purpose === 'All of the above') {
      setSelectedPurpose(selectedPurpose.length === purposeOptions.length ? [] : purposeOptions);
    } else {
      setSelectedPurpose(prev => 
        prev.includes(purpose) 
          ? prev.filter(p => p !== purpose && p !== 'All of the above')
          : [...prev.filter(p => p !== 'All of the above'), purpose]
      );
    }
  };

  const canContinue = displayName.trim().length > 0 && selectedPurpose.length > 0;

  return (
    <div className="min-h-screen bg-background px-6 py-8 animate-fadeIn">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-foreground mb-2">Welcome to TheCircle</h2>
          <p className="text-muted-foreground">Let's get you started on your journey</p>
        </div>

        {/* Display Name */}
        <div className="mb-6">
          <Label htmlFor="displayName" className="text-foreground mb-2 block">
            Choose a display name
          </Label>
          <Input
            id="displayName"
            type="text"
            placeholder="e.g., Grace, David, Hope..."
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="rounded-lg h-12"
          />
          <p className="text-sm text-muted-foreground mt-2">
            This is how others will see you
          </p>
        </div>

        {/* Phone/WhatsApp Number (Optional) */}
        <div className="mb-8">
          <Label htmlFor="phoneNumber" className="text-foreground mb-2 block">
            WhatsApp/Phone Number <span className="text-muted-foreground">(Optional)</span>
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+254 712 345 678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="rounded-lg h-12 pl-11"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            📱 Get event reminders, prayer circles & USSD access (254XXXX for Kenya)
          </p>
        </div>

        {/* Purpose Selection */}
        <div className="mb-8">
          <Label className="text-foreground mb-3 block">
            Why are you here?
          </Label>
          <div className="space-y-3">
            {purposeOptions.map((purpose) => (
              <div
                key={purpose}
                onClick={() => togglePurpose(purpose)}
                className="flex items-center space-x-3 p-4 rounded-lg border border-border cursor-pointer hover:border-primary transition-all bg-card hover:bg-accent/50"
              >
                <Checkbox
                  checked={selectedPurpose.includes(purpose)}
                  onCheckedChange={() => togglePurpose(purpose)}
                />
                <span className="text-foreground">{purpose}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Promise */}
        <div className="mb-8 p-4 glass rounded-lg border border-primary/20">
          <p className="text-sm text-primary">
            🔒 Your journey is private and safe. We value your anonymity and peace of mind.
          </p>
        </div>

        {/* Continue Button */}
        <Button
          onClick={() => onComplete({ 
            displayName, 
            purpose: selectedPurpose,
            phoneNumber: phoneNumber.trim() || undefined
          })}
          disabled={!canContinue}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-lg btn-hover"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
