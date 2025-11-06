import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { 
  GraduationCap, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Award,
  Briefcase,
  Church,
  Star,
  Users,
  Clock
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface MentorRegistrationProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export default function MentorRegistration({ onComplete, onBack }: MentorRegistrationProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    industry: '',
    yearsExperience: 5,
    professionalTitle: '',
    cvUploaded: false,
    linkedInProfile: '',
    churchEndorsement: false,
    ministryExperience: '',
    theologicalTraining: '',
    expertiseAreas: [] as string[],
    mentorshipPreference: '',
    groupSize: '',
    availability: [] as string[],
    commitmentLevel: ''
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const industries = [
    'Technology & IT',
    'Business & Entrepreneurship',
    'Healthcare & Medicine',
    'Education & Training',
    'Creative Arts & Media',
    'Finance & Banking',
    'Law & Legal Services',
    'Engineering',
    'Marketing & Communications',
    'Non-profit & NGO',
    'Other'
  ];

  const expertiseOptions = [
    { value: 'career', label: 'Career Development', icon: '💼' },
    { value: 'spiritual', label: 'Spiritual Growth', icon: '✝️' },
    { value: 'leadership', label: 'Leadership', icon: '👑' },
    { value: 'business', label: 'Business & Entrepreneurship', icon: '📈' },
    { value: 'mental', label: 'Mental Health & Wellness', icon: '🧠' },
    { value: 'relationships', label: 'Relationships', icon: '❤️' }
  ];

  const availabilityOptions = [
    { value: 'weekday-morning', label: 'Weekday Mornings' },
    { value: 'weekday-evening', label: 'Weekday Evenings' },
    { value: 'weekend', label: 'Weekends' },
    { value: 'flexible', label: 'Flexible Schedule' }
  ];

  const handleCVUpload = () => {
    setFormData({ ...formData, cvUploaded: true });
    toast.success('CV/Resume uploaded successfully! ✅');
  };

  const toggleExpertise = (value: string) => {
    setFormData({
      ...formData,
      expertiseAreas: formData.expertiseAreas.includes(value)
        ? formData.expertiseAreas.filter(v => v !== value)
        : [...formData.expertiseAreas, value]
    });
  };

  const toggleAvailability = (value: string) => {
    setFormData({
      ...formData,
      availability: formData.availability.includes(value)
        ? formData.availability.filter(v => v !== value)
        : [...formData.availability, value]
    });
  };

  const handleNext = () => {
    if (step === 1 && (!formData.industry || !formData.professionalTitle)) {
      toast.error('Please complete all required fields');
      return;
    }
    if (step === 2 && formData.expertiseAreas.length === 0) {
      toast.error('Please select at least one area of expertise');
      return;
    }
    if (step === 3 && (!formData.mentorshipPreference || formData.availability.length === 0)) {
      toast.error('Please complete mentorship preferences');
      return;
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-yellow-950 p-4">
      {/* Header */}
      <div className="max-w-2xl w-full mx-auto mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white">Mentor Registration</h1>
            <p className="text-sm text-white/70">Join our network of certified mentors and industry leaders</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-white/70 mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 max-w-2xl w-full mx-auto">
        <Card className="p-6 glass border-white/10 space-y-6">
          
          {/* Step 1: Professional Background */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl text-foreground mb-2">Professional Background</h2>
                <p className="text-sm text-muted-foreground">Tell us about your professional experience</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <Select 
                    value={formData.industry} 
                    onValueChange={(value) => setFormData({ ...formData, industry: value })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title">Professional Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Senior Software Engineer, Marketing Director"
                    value={formData.professionalTitle}
                    onChange={(e) => setFormData({ ...formData, professionalTitle: e.target.value })}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Years of Professional Experience: {formData.yearsExperience}</Label>
                  <input
                    id="experience"
                    type="range"
                    min="0"
                    max="40"
                    value={formData.yearsExperience}
                    onChange={(e) => setFormData({ ...formData, yearsExperience: parseInt(e.target.value) })}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0 years</span>
                    <span>40+ years</span>
                  </div>
                </div>

                <div>
                  <Label>Upload CV/Resume</Label>
                  <div 
                    className={`mt-1.5 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                      formData.cvUploaded 
                        ? 'border-green-500 bg-green-500/10' 
                        : 'border-border hover:border-primary hover:bg-accent/50'
                    }`}
                    onClick={handleCVUpload}
                  >
                    {formData.cvUploaded ? (
                      <>
                        <Award className="w-10 h-10 text-green-500 mx-auto mb-2" />
                        <p className="text-sm text-green-500 mb-1">CV uploaded successfully!</p>
                        <p className="text-xs text-muted-foreground">Click to replace</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-foreground mb-1">Click to upload CV</p>
                        <p className="text-xs text-muted-foreground">PDF or DOCX (Max 5MB)</p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedInProfile}
                    onChange={(e) => setFormData({ ...formData, linkedInProfile: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Spiritual Qualifications */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl text-foreground mb-2">Spiritual Qualifications</h2>
                <p className="text-sm text-muted-foreground">Help us understand your faith background</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
                  <Checkbox
                    id="endorsement"
                    checked={formData.churchEndorsement}
                    onCheckedChange={(checked) => setFormData({ ...formData, churchEndorsement: checked as boolean })}
                  />
                  <div className="flex-1">
                    <Label htmlFor="endorsement" className="cursor-pointer">
                      I have a church endorsement/reference
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your local church pastor or leader can vouch for your character and faith
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="ministry">Ministry Experience</Label>
                  <Textarea
                    id="ministry"
                    placeholder="Describe your ministry involvement (youth groups, missions, teaching, etc.)"
                    value={formData.ministryExperience}
                    onChange={(e) => setFormData({ ...formData, ministryExperience: e.target.value })}
                    rows={4}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="theological">Theological Training/Education</Label>
                  <Textarea
                    id="theological"
                    placeholder="Bible college, seminary, discipleship programs, etc."
                    value={formData.theologicalTraining}
                    onChange={(e) => setFormData({ ...formData, theologicalTraining: e.target.value })}
                    rows={3}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label className="mb-3 block">Areas of Expertise (Select all that apply) *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {expertiseOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => toggleExpertise(option.value)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          formData.expertiseAreas.includes(option.value)
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="text-2xl mb-1">{option.icon}</div>
                        <div className="text-xs text-foreground">{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Mentorship Preferences */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl text-foreground mb-2">Mentorship Preferences</h2>
                <p className="text-sm text-muted-foreground">Set your mentorship style and availability</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Preferred Mentorship Type *</Label>
                  <Select 
                    value={formData.mentorshipPreference} 
                    onValueChange={(value) => setFormData({ ...formData, mentorshipPreference: value })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="career">Career Development</SelectItem>
                      <SelectItem value="spiritual">Spiritual Growth</SelectItem>
                      <SelectItem value="leadership">Leadership Development</SelectItem>
                      <SelectItem value="all">All Areas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Preferred Group Size</Label>
                  <div className="grid grid-cols-3 gap-3 mt-1.5">
                    {[
                      { value: '1-on-1', label: '1-on-1', icon: Users },
                      { value: 'small', label: 'Small Group (2-5)', icon: Users },
                      { value: 'flexible', label: 'Flexible', icon: Users }
                    ].map((size) => {
                      const Icon = size.icon;
                      return (
                        <button
                          key={size.value}
                          onClick={() => setFormData({ ...formData, groupSize: size.value })}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.groupSize === size.value
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <Icon className="w-5 h-5 mx-auto mb-1" />
                          <div className="text-xs text-center text-foreground">{size.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Availability (Select all that apply) *</Label>
                  <div className="space-y-2">
                    {availabilityOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.availability.includes(option.value)
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => toggleAvailability(option.value)}
                      >
                        <Checkbox
                          checked={formData.availability.includes(option.value)}
                          onCheckedChange={() => toggleAvailability(option.value)}
                        />
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{option.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Commitment Level</Label>
                  <Select 
                    value={formData.commitmentLevel} 
                    onValueChange={(value) => setFormData({ ...formData, commitmentLevel: value })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select commitment level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="occasional">Occasional (As needed)</SelectItem>
                      <SelectItem value="monthly">Monthly Check-ins</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly Sessions</SelectItem>
                      <SelectItem value="weekly">Weekly Commitment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Card className="p-4 bg-yellow-500/10 border-yellow-500/20">
                  <div className="flex gap-3">
                    <Star className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-foreground mb-1">Earn Your Gold Badge</p>
                      <p className="text-xs text-muted-foreground">
                        Complete verification and mentor at least 3 people to earn your Certified Mentor badge
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button
                onClick={() => setStep(step - 1)}
                variant="outline"
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
            >
              {step === totalSteps ? (
                <>
                  Submit Application
                  <CheckCircle2 className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
