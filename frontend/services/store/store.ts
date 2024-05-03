import { create } from "zustand";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type GlobalState = {
    isFavouriteToggled: boolean;
    setIsFavouriteToggled: (value: boolean) => void;
    restaurantCount: number;
    setRestaurantCount: (value: number) => void;
};

export const useGlobalState = create<GlobalState>(set => ({
    isFavouriteToggled: false,
    setIsFavouriteToggled: (newValue: boolean): void => set(() => ({ isFavouriteToggled: newValue })),
    restaurantCount: 0,
    setRestaurantCount: (newValue: number): void => set(() => ({ restaurantCount: newValue })),
}));
