export interface CreateFoodDonationInput {
  foodName: string;
  quantity: number;
  unit: string;
  restaurantId: number;
}

export interface UpdateFoodDonationInput {
  foodName?: string;
  quantity?: number;
  unit?: string;
  availableUntil?: Date;
}