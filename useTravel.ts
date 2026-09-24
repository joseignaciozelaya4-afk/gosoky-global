import { useContext, type ContextType } from 'react';
import { TravelContext } from '@/components/travel/TravelContext';

type TravelContextValue = NonNullable<ContextType<typeof TravelContext>>;

export function useTravel(): TravelContextValue {
  const context = useContext(TravelContext);
  if (!context) throw new Error('useTravel must be used within TravelProvider');
  return context;
}
