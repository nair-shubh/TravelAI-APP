import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapPin, Calendar as CalendarIcon, Heart, Mountain, UtensilsCrossed, Zap, Waves, ShoppingBag, Building, Music } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TravelFormData {
  destination: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  interests: string[];
}

interface TravelFormProps {
  onSubmit: (data: TravelFormData) => void;
  isLoading?: boolean;
}

const interestOptions = [
  { id: 'Culture', label: 'Culture', icon: Building, color: 'bg-primary' },
  { id: 'Nature', label: 'Nature', icon: Mountain, color: 'bg-accent' },
  { id: 'Food', label: 'Food', icon: UtensilsCrossed, color: 'bg-secondary' },
  { id: 'Adventure', label: 'Adventure', icon: Zap, color: 'bg-primary' },
  { id: 'Relaxation', label: 'Relaxation', icon: Waves, color: 'bg-accent' },
  { id: 'Shopping', label: 'Shopping', icon: ShoppingBag, color: 'bg-secondary' },
  { id: 'History', label: 'History', icon: Building, color: 'bg-primary' },
  { id: 'Nightlife', label: 'Nightlife', icon: Music, color: 'bg-accent' },
];

export const TravelForm = ({ onSubmit, isLoading }: TravelFormProps) => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination && startDate && endDate && selectedInterests.length > 0) {
      onSubmit({
        destination,
        startDate,
        endDate,
        interests: selectedInterests
      });
    }
  };

  return (
    <Card className="travel-card w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
          Plan Your Perfect Journey
        </CardTitle>
        <p className="text-muted-foreground">Tell us about your dream destination and we'll create a personalized itinerary</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Destination Input */}
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-base font-semibold">
              Where would you like to go?
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="destination"
                type="text"
                placeholder="Enter your destination..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10 h-12 text-base"
                required
              />
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base font-semibold">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-semibold">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => date < (startDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Interests Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">What interests you?</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interestOptions.map((interest) => {
                const Icon = interest.icon;
                const isSelected = selectedInterests.includes(interest.id);
                
                return (
                  <Button
                    key={interest.id}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    className={cn(
                      "h-20 flex flex-col items-center justify-center space-y-2 transition-all duration-300",
                      isSelected && "animate-pulse-glow",
                      !isSelected && "hover:scale-105"
                    )}
                    onClick={() => toggleInterest(interest.id)}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="text-sm font-medium">{interest.label}</span>
                  </Button>
                );
              })}
            </div>
            {selectedInterests.length === 0 && (
              <p className="text-sm text-muted-foreground">Select at least one interest to continue</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-lg font-semibold bg-gradient-ocean hover:opacity-90 transition-all duration-300"
            disabled={!destination || !startDate || !endDate || selectedInterests.length === 0 || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating Your Itinerary...</span>
              </div>
            ) : (
              <>
                <Heart className="mr-2 h-5 w-5" />
                Generate My Travel Plan
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};