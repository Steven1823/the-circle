import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  MapPin, 
  Calendar, 
  Church, 
  Heart, 
  GraduationCap, 
  Users,
  Search,
  Filter,
  Navigation,
  ArrowLeft,
  ExternalLink,
  Phone
} from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  type: 'event' | 'safe-space' | 'opportunity' | 'church';
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  date?: string;
  time?: string;
  contact?: string;
  verified: boolean;
}

// Sample data for Kenyan Christian resources
const sampleResources: Resource[] = [
  {
    id: '1',
    name: 'Nairobi Chapel Youth Service',
    type: 'event',
    description: 'Every Sunday youth service with worship, teaching, and fellowship',
    location: { lat: -1.2921, lng: 36.8219, address: 'Ngong Road', city: 'Nairobi' },
    date: '2025-11-09',
    time: '10:00 AM',
    contact: '+254 712 345 678',
    verified: true
  },
  {
    id: '2',
    name: 'Citam Valley Road - Safe Space',
    type: 'safe-space',
    description: 'Counseling services, prayer support, and mental health resources',
    location: { lat: -1.2647, lng: 36.8020, address: 'Valley Road', city: 'Nairobi' },
    contact: '+254 700 111 222',
    verified: true
  },
  {
    id: '3',
    name: 'Christian Creatives Workshop',
    type: 'opportunity',
    description: 'Free digital skills training for young Christian creatives',
    location: { lat: -1.2864, lng: 36.8172, address: 'Westlands', city: 'Nairobi' },
    date: '2025-11-15',
    time: '2:00 PM',
    contact: '+254 733 456 789',
    verified: true
  },
  {
    id: '4',
    name: 'Mavuno Church Outreach',
    type: 'event',
    description: 'Community outreach and mentorship program',
    location: { lat: -1.2743, lng: 36.8155, address: 'Mombasa Road', city: 'Nairobi' },
    date: '2025-11-12',
    time: '3:00 PM',
    verified: true
  },
  {
    id: '5',
    name: 'Thika Road Fellowship',
    type: 'church',
    description: 'Vibrant community focused on youth empowerment',
    location: { lat: -1.2195, lng: 36.8868, address: 'Thika Road', city: 'Nairobi' },
    contact: '+254 722 333 444',
    verified: false
  },
  {
    id: '6',
    name: 'Mombasa Christian Center',
    type: 'safe-space',
    description: 'Spiritual guidance and emotional support services',
    location: { lat: -4.0435, lng: 39.6682, address: 'Nyali', city: 'Mombasa' },
    contact: '+254 741 555 666',
    verified: true
  },
  {
    id: '7',
    name: 'Kisumu Faith & Skills Hub',
    type: 'opportunity',
    description: 'Vocational training with Christian values',
    location: { lat: -0.0917, lng: 34.7680, address: 'Kisumu CBD', city: 'Kisumu' },
    date: '2025-11-20',
    time: '9:00 AM',
    verified: true
  },
  {
    id: '8',
    name: 'Nakuru Youth Revival',
    type: 'event',
    description: '3-day youth conference with powerful speakers',
    location: { lat: -0.3031, lng: 36.0800, address: 'Nakuru Town', city: 'Nakuru' },
    date: '2025-11-25',
    time: '6:00 PM',
    verified: true
  }
];

interface ResourceMapScreenProps {
  onBack?: () => void;
}

export default function ResourceMapScreen({ onBack }: ResourceMapScreenProps = {}) {
  const [resources] = useState<Resource[]>(sampleResources);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const cities = ['all', ...Array.from(new Set(resources.map(r => r.location.city)))];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="w-4 h-4" />;
      case 'safe-space':
        return <Heart className="w-4 h-4" />;
      case 'opportunity':
        return <GraduationCap className="w-4 h-4" />;
      case 'church':
        return <Church className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event':
        return 'bg-purple-500/20 text-purple-500 border-purple-500/50';
      case 'safe-space':
        return 'bg-cyan-500/20 text-cyan-500 border-cyan-500/50';
      case 'opportunity':
        return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'church':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesCity = selectedCity === 'all' || resource.location.city === selectedCity;
    return matchesSearch && matchesType && matchesCity;
  });

  const handleOpenMaps = (resource: Resource) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${resource.location.lat},${resource.location.lng}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-2">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-foreground flex-1">Resource Map 🗺️</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Discover Christian events, safe spaces & opportunities near you
        </p>
      </div>

      {/* Search & Filters */}
      <div className="p-4 space-y-3 bg-background/95 backdrop-blur-sm border-b border-border sticky top-[88px] z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search locations, events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl"
          />
        </div>

        {/* Type Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            variant={selectedType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('all')}
            className="rounded-full shrink-0"
          >
            <Filter className="w-3 h-3 mr-1" />
            All
          </Button>
          <Button
            variant={selectedType === 'event' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('event')}
            className="rounded-full shrink-0"
          >
            <Calendar className="w-3 h-3 mr-1" />
            Events
          </Button>
          <Button
            variant={selectedType === 'safe-space' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('safe-space')}
            className="rounded-full shrink-0"
          >
            <Heart className="w-3 h-3 mr-1" />
            Safe Spaces
          </Button>
          <Button
            variant={selectedType === 'opportunity' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('opportunity')}
            className="rounded-full shrink-0"
          >
            <GraduationCap className="w-3 h-3 mr-1" />
            Opportunities
          </Button>
          <Button
            variant={selectedType === 'church' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('church')}
            className="rounded-full shrink-0"
          >
            <Church className="w-3 h-3 mr-1" />
            Churches
          </Button>
        </div>

        {/* City Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {cities.map((city) => (
            <Button
              key={city}
              variant={selectedCity === city ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCity(city)}
              className="rounded-full shrink-0 capitalize"
            >
              {city}
            </Button>
          ))}
        </div>
      </div>

      {/* Resource List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No resources found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="text-sm text-muted-foreground mb-2">
              {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
            </div>
            
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="p-4 glass hover:border-primary/50 transition-all animate-fadeIn">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-lg shrink-0 ${getTypeColor(resource.type)}`}>
                    {getTypeIcon(resource.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{resource.name}</h3>
                      {resource.verified && (
                        <Badge className="text-xs bg-green-500/20 text-green-500 border-green-500/50 shrink-0">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                    
                    {/* Location Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="text-foreground">
                          {resource.location.address}, {resource.location.city}
                        </span>
                      </div>
                      
                      {resource.date && (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-primary">
                            {resource.date} at {resource.time}
                          </span>
                        </div>
                      )}
                      
                      {resource.contact && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                          <span className="text-foreground">{resource.contact}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 rounded-lg"
                    onClick={() => handleOpenMaps(resource)}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  {resource.contact && (
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1 rounded-lg"
                      onClick={() => window.open(`tel:${resource.contact}`)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </>
        )}
      </div>

      {/* Info Banner */}
      <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <Card className="p-3 glass border-primary/20">
          <p className="text-xs text-center text-muted-foreground">
            💡 <strong className="text-foreground">Know a resource?</strong> Share it with the community on The Wall
          </p>
        </Card>
      </div>
    </div>
  );
}
