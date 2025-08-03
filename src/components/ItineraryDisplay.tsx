import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Sun, Cloud, CloudRain, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

interface WeatherData {
  date: string;
  weather_code: number;
  temperature_max: number;
  temperature_min: number;
  sunrise: string;
  sunset: string;
}

interface Activity {
  name: string;
  description: string;
  time: string;
  duration: string;
  category: string;
  isOpen: boolean;
}

interface DayItinerary {
  date: string;
  weather: WeatherData;
  activities: Activity[];
}

interface ItineraryDisplayProps {
  itinerary: DayItinerary[];
  destination: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

const getWeatherIcon = (weatherCode: number) => {
  if (weatherCode <= 3) return Sun;
  if (weatherCode <= 48) return Cloud;
  return CloudRain;
};

const getWeatherColor = (weatherCode: number) => {
  if (weatherCode <= 3) return 'text-yellow-500';
  if (weatherCode <= 48) return 'text-gray-500';
  return 'text-blue-500';
};

export const ItineraryDisplay = ({ 
  itinerary, 
  destination, 
  onRegenerate, 
  isRegenerating 
}: ItineraryDisplayProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="travel-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
            Your Personalized Itinerary for {destination}
          </CardTitle>
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="mt-2"
            >
              {isRegenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate Plan
                </>
              )}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Daily Itineraries */}
      <div className="space-y-6">
        {itinerary.map((day, index) => {
          const WeatherIcon = getWeatherIcon(day.weather.weather_code);
          const weatherColor = getWeatherColor(day.weather.weather_code);
          
          return (
            <Card key={day.date} className="travel-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">
                      Day {index + 1} - {format(new Date(day.date), 'EEEE, MMMM d')}
                    </CardTitle>
                    <p className="text-muted-foreground mt-1">
                      {format(new Date(day.date), 'yyyy')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <WeatherIcon className={`h-6 w-6 ${weatherColor}`} />
                      <div className="text-right">
                        <p className="font-semibold">
                          {Math.round(day.weather.temperature_max)}°/{Math.round(day.weather.temperature_min)}°C
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(day.weather.sunrise), 'HH:mm')} - {format(new Date(day.weather.sunset), 'HH:mm')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {day.activities.map((activity, actIndex) => (
                    <div 
                      key={actIndex} 
                      className="flex items-start space-x-4 p-4 rounded-lg bg-background/50 border hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col items-center space-y-1 min-w-[80px]">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-sm font-semibold">{activity.time}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.duration}</span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-lg">{activity.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant="secondary"
                              className="text-xs"
                            >
                              {activity.category}
                            </Badge>
                            <Badge 
                              variant={activity.isOpen ? "default" : "destructive"}
                              className="text-xs"
                            >
                              {activity.isOpen ? "Open" : "Closed"}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};