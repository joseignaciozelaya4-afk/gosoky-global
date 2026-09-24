import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { FavoriteItem, Itinerary } from '@/services/travelService';

type TravelContextValue = {
  favorites: FavoriteItem[];
  itineraries: Itinerary[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
  createItinerary: (title: string, destinationId: string) => string;
  addToItinerary: (itineraryId: string, day: number, item: { type: string; name: string; time?: string }) => void;
  removeFromItinerary: (itineraryId: string, day: number, index: number) => void;
  removeItinerary: (itineraryId: string) => void;
  shareItem: (name: string, subtitle: string) => void;
  pendingShare: { name: string; subtitle: string } | null;
  clearPendingShare: () => void;
};

export const TravelContext = createContext<TravelContextValue | null>(null);
const DEMO_PROFILE_KEY = 'gosoky-current-profile';
const DEFAULT_PROFILE_ID = '10000000-0000-0000-0000-000000000001';

type StoredFavorite = {
  item_type: FavoriteItem['type'];
  item_id: string;
  name: string;
  subtitle: string;
  image: string;
};

function getProfileId(): string {
  try { return localStorage.getItem(DEMO_PROFILE_KEY) ?? DEFAULT_PROFILE_ID; } catch { return DEFAULT_PROFILE_ID; }
}

function toFavorite(row: StoredFavorite): FavoriteItem {
  return { id: row.item_id, type: row.item_type, name: row.name, subtitle: row.subtitle, image: row.image };
}

export function TravelProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [pendingShare, setPendingShare] = useState<{ name: string; subtitle: string } | null>(null);
  const profileId = getProfileId();

  useEffect(() => {
    let active = true;
    Promise.all([
      supabase.from('travel_favorites').select('item_type, item_id, name, subtitle, image').eq('profile_id', profileId).order('created_at', { ascending: false }),
      supabase.from('travel_itineraries').select('id, title, destination_id, days, created_at').eq('profile_id', profileId).order('created_at', { ascending: false }),
    ]).then(([favoriteResult, itineraryResult]) => {
      if (!active) return;
      if (!favoriteResult.error) setFavorites((favoriteResult.data ?? []).map((row) => toFavorite(row as StoredFavorite)));
      if (!itineraryResult.error) setItineraries((itineraryResult.data ?? []).map((row) => ({ id: row.id, title: row.title, destinationId: row.destination_id, days: row.days as Itinerary['days'], createdAt: row.created_at })));
    });
    return () => { active = false; };
  }, [profileId]);

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    const exists = favorites.some((favorite) => favorite.id === item.id);
    if (exists) {
      setFavorites((current) => current.filter((favorite) => favorite.id !== item.id));
      void supabase.from('travel_favorites').delete().eq('profile_id', profileId).eq('item_type', item.type).eq('item_id', item.id);
      return;
    }
    setFavorites((current) => [...current, item]);
    void supabase.from('travel_favorites').upsert({ profile_id: profileId, item_type: item.type, item_id: item.id, name: item.name, subtitle: item.subtitle, image: item.image }, { onConflict: 'profile_id,item_type,item_id' });
  }, [favorites, profileId]);

  const isFavorite = useCallback((id: string) => favorites.some((favorite) => favorite.id === id), [favorites]);

  const createItinerary = useCallback((title: string, destinationId: string): string => {
    const id = crypto.randomUUID();
    const newItinerary: Itinerary = { id, title, destinationId, days: [{ day: 1, items: [] }], createdAt: new Date().toISOString() };
    setItineraries((current) => [newItinerary, ...current]);
    void supabase.from('travel_itineraries').insert({ id, profile_id: profileId, title, destination_id: destinationId, days: newItinerary.days });
    return id;
  }, [profileId]);

  const saveItinerary = useCallback((itinerary: Itinerary): void => {
    void supabase.from('travel_itineraries').update({ title: itinerary.title, destination_id: itinerary.destinationId, days: itinerary.days }).eq('id', itinerary.id).eq('profile_id', profileId);
  }, [profileId]);

  const addToItinerary = useCallback((itineraryId: string, day: number, item: { type: string; name: string; time?: string }) => {
    setItineraries((current) => current.map((itinerary) => {
      if (itinerary.id !== itineraryId) return itinerary;
      const days = [...itinerary.days];
      const dayIndex = days.findIndex((itineraryDay) => itineraryDay.day === day);
      if (dayIndex === -1) days.push({ day, items: [item] });
      else days[dayIndex] = { ...days[dayIndex], items: [...days[dayIndex].items, item] };
      const updated = { ...itinerary, days };
      saveItinerary(updated);
      return updated;
    }));
  }, [saveItinerary]);

  const removeFromItinerary = useCallback((itineraryId: string, day: number, index: number) => {
    setItineraries((current) => current.map((itinerary) => {
      if (itinerary.id !== itineraryId) return itinerary;
      const updated = { ...itinerary, days: itinerary.days.map((itineraryDay) => itineraryDay.day === day ? { ...itineraryDay, items: itineraryDay.items.filter((_, itemIndex) => itemIndex !== index) } : itineraryDay) };
      saveItinerary(updated);
      return updated;
    }));
  }, [saveItinerary]);

  const removeItinerary = useCallback((itineraryId: string) => {
    setItineraries((current) => current.filter((itinerary) => itinerary.id !== itineraryId));
    void supabase.from('travel_itineraries').delete().eq('id', itineraryId).eq('profile_id', profileId);
  }, [profileId]);

  const shareItem = useCallback((name: string, subtitle: string) => {
    const item = { name, subtitle };
    setPendingShare(item);
    try { localStorage.setItem('gosoky-chat-share', JSON.stringify(item)); } catch { /* storage optional */ }
  }, []);

  const clearPendingShare = useCallback(() => {
    setPendingShare(null);
    try { localStorage.removeItem('gosoky-chat-share'); } catch { /* storage optional */ }
  }, []);

  return <TravelContext.Provider value={{ favorites, itineraries, toggleFavorite, isFavorite, createItinerary, addToItinerary, removeFromItinerary, removeItinerary, shareItem, pendingShare, clearPendingShare }}>{children}</TravelContext.Provider>;
}

