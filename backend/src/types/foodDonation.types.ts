export interface CreateFoodDonationInput {
  foodName: string;
  quantity: number;
  unit: string;
}

export interface UpdateFoodDonationInput {
  foodName?: string;
  quantity?: number;
  unit?: string;
  availableUntil?: Date;
}