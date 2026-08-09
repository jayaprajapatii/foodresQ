export interface CreateDonationData {
  foodName: string;
  quantity: number;
  unit: string;
}

export const createDonation = async (data: CreateDonationData) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5000/api/donations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create donation");
  }

  return result;
};
export const getMyDonations = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:5000/api/donations/my",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch donations");
  }

  return result;
};
export const deleteDonation = async (donationId: number) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:5000/api/donations/${donationId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete donation");
  }

  return result;
};
export interface UpdateDonationData {
  foodName?: string;
  quantity?: number;
  unit?: string;
}

export const updateDonation = async (
  donationId: number,
  data: UpdateDonationData
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:5000/api/donations/${donationId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update donation");
  }

  return result;
};