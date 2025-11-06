import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Building2, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  FileCheck,
  Shield,
  Globe,
  Phone,
  MapPin
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface OrganizationRegistrationProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export default function OrganizationRegistration({ onComplete, onBack }: OrganizationRegistrationProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    orgType: '',
    officialName: '',
    registrationNumber: '',
    taxExempt: '',
    missionStatement: '',
    contactEmail: '',
    contactPhone: '',
    location: '',
    website: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: ''
    },
    documentUploaded: false
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const organizationTypes = [
    { value: 'church', label: 'Church/Ministry', icon: '⛪', description: 'Religious organization or church' },
    { value: 'ngo', label: 'NGO/Non-profit', icon: '🤝', description: 'Non-governmental organization' },
    { value: 'business', label: 'Christian Business', icon: '💼', description: 'Faith-based business' },
    { value: 'education', label: 'Educational Institution', icon: '🎓', description: 'School, college, or training center' }
  ];

  const handleDocumentUpload = () => {
    // Simulate document upload
    setFormData({ ...formData, documentUploaded: true });
    toast.success('Document uploaded successfully! ✅');
  };

  const handleNext = () => {
    if (step === 1 && !formData.orgType) {
      toast.error('Please select your organization type');
      return;
    }
    if (step === 2 && (!formData.registrationNumber || !formData.documentUploaded)) {
      toast.error('Please complete verification documents');
      return;
    }
    if (step === 3 && (!formData.officialName || !formData.contactEmail)) {
      toast.error('Please fill in required fields');
      return;
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 p-4">
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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white">Organization Registration</h1>
            <p className="text-sm text-white/70">Get verified and build trust with the community</p>
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
          
          {/* Step 1: Organization Type */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl text-foreground mb-2">Select Organization Type</h2>
                <p className="text-sm text-muted-foreground">This helps us verify your organization correctly</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {organizationTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setFormData({ ...formData, orgType: type.value })}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.orgType === type.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 hover:bg-accent/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <div className="text-sm text-foreground mb-1">{type.label}</div>
                    <div className="text-xs text-muted-foreground">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Verification Documents */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl text-foreground mb-2">Verification Documents</h2>
                <p className="text-sm text-muted-foreground">Upload official documents to verify your organization</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="regNumber">Government Registration Number *</Label>
                  <Input
                    id="regNumber"
                    placeholder="e.g., PVT-ABC123XYZ"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label>Tax Exemption Status</Label>
                  <Select 
                    value={formData.taxExempt} 
                    onValueChange={(value) => setFormData({ ...formData, taxExempt: value })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Tax Exempt</SelectItem>
                      <SelectItem value="no">Not Tax Exempt</SelectItem>
                      <SelectItem value="pending">Application Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Upload License/Registration Certificate *</Label>
                  <div 
                    className={`mt-1.5 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                      formData.documentUploaded 
                        ? 'border-green-500 bg-green-500/10' 
                        : 'border-border hover:border-primary hover:bg-accent/50'
                    }`}
                    onClick={handleDocumentUpload}
                  >
                    {formData.documentUploaded ? (
                      <>
                        <FileCheck className="w-12 h-12 text-green-500 mx-auto mb-3" />
                        <p className="text-sm text-green-500 mb-1">Document uploaded successfully!</p>
                        <p className="text-xs text-muted-foreground">Click to replace</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm text-foreground mb-1">Click to upload document</p>
                        <p className="text-xs text-muted-foreground">PDF, PNG, or JPG (Max 10MB)</p>
                      </>
                    )}
                  </div>
                </div>

                <Card className="p-4 bg-blue-500/10 border-blue-500/20">
                  <div className="flex gap-3">
                    <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-foreground mb-1">Your documents are secure</p>
                      <p className="text-xs text-muted-foreground">
                        All documents are encrypted and reviewed by our verification team within 24-48 hours
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Step 3: Organization Profile */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h2 className="text-xl text-foreground mb-2">Organization Profile</h2>
                <p className="text-sm text-muted-foreground">Help the community know more about your organization</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="orgName">Official Organization Name *</Label>
                  <Input
                    id="orgName"
                    placeholder="Enter full official name"
                    value={formData.officialName}
                    onChange={(e) => setFormData({ ...formData, officialName: e.target.value })}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="mission">Mission Statement</Label>
                  <Textarea
                    id="mission"
                    placeholder="Briefly describe your organization's mission and vision..."
                    value={formData.missionStatement}
                    onChange={(e) => setFormData({ ...formData, missionStatement: e.target.value })}
                    rows={4}
                    className="mt-1.5"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Contact Email *</Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@organization.org"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Contact Phone</Label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="+254 XXX XXX XXX"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative mt-1.5">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <div className="relative mt-1.5">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="website"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
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
              className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            >
              {step === totalSteps ? (
                <>
                  Submit for Verification
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
