import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  createDonation,
  getMyDonations,
  deleteDonation,
  updateDonation,
} from "../services/donation.service";

function RestaurantDashboard() {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("plates");
  const [message, setMessage] = useState("");
  const [donations, setDonations] = useState<any[]>([]);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [editingDonationId, setEditingDonationId] = useState<number | null>(
  null
);

  useEffect(() => {
    const loadDonations = async () => {
      try {
        const result = await getMyDonations();
        setDonations(result.donations);
      } catch (error) {
        console.error("Failed to load donations:", error);
      } finally {
        setLoadingDonations(false);
      }
    };

    loadDonations();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    try {
      const result = await createDonation({
        foodName,
        quantity: Number(quantity),
        unit,
      });

      setMessage("Donation created successfully!");

      setFoodName("");
      setQuantity("");
      setUnit("plates");

      setDonations((currentDonations) => [
        result.donation,
        ...currentDonations,
      ]);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to create donation"
      );
    }
  };
  const handleDelete = async (donationId: number) => {
    setMessage("");
  const confirmed = window.confirm(
    "Are you sure you want to delete this donation?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteDonation(donationId);

    setDonations((currentDonations) =>
      currentDonations.filter(
        (donation) => donation.id !== donationId
      )
    );

    setMessage("Donation deleted successfully!");
  } catch (error) {
    setMessage(
      error instanceof Error
        ? error.message
        : "Failed to delete donation"
    );
  }
};
const handleUpdate = async (donationId: number) => {
  setMessage("");
  const donation = donations.find(
    (item) => item.id === donationId
  );

  if (!donation) {
    return;
  }

  const foodName = window.prompt(
    "Food name:",
    donation.foodName
  );

  if (foodName === null) {
    return;
  }

  const quantityInput = window.prompt(
    "Quantity:",
    String(donation.quantity)
  );

  if (quantityInput === null) {
    return;
  }

  const quantity = Number(quantityInput);

  if (!Number.isFinite(quantity) || quantity <= 0) {
    setMessage("Quantity must be a positive number.");
    return;
  }

  try {
    setEditingDonationId(donationId);

    const result = await updateDonation(donationId, {
      foodName,
      quantity,
    });
    console.log("UPDATE RESULT:", result);

    setDonations((currentDonations) =>
      currentDonations.map((item) =>
        item.id === donationId ? result.donation : item
      )
    );
    setMessage("Donation updated successfully!");
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    setMessage(
      error instanceof Error
        ? error.message
        : "Failed to update donation"
    );
  } finally {
    setEditingDonationId(null);
  }
};

  return (
    <div>
      <h1>Restaurant Dashboard</h1>

      <h2>Create Food Donation</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="foodName">Food Name</label>
          <input
            id="foodName"
            type="text"
            value={foodName}
            onChange={(event) => setFoodName(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="unit">Unit</label>
          <select
            id="unit"
            value={unit}
            onChange={(event) => setUnit(event.target.value)}
          >
            <option value="plates">Plates</option>
            <option value="packets">Packets</option>
            <option value="kg">Kg</option>
            <option value="litres">Litres</option>
          </select>
        </div>

        <button type="submit">Create Donation</button>
      </form>

      <h2>My Donations</h2>
      {message && <p>{message}</p>}

      {loadingDonations ? (
        <p>Loading donations...</p>
      ) : donations.length === 0 ? (
        <p>No donations yet.</p>
      ) : (
        <div>
          {donations.map((donation) => (
            <div key={donation.id}>
              <h3>{donation.foodName}</h3>
              <p>
                {donation.quantity} {donation.unit}
              </p>
              <p>Status: {donation.status}</p>
              <button
                type="button"
                onClick={() => handleUpdate(donation.id)}
                disabled={editingDonationId === donation.id}
              > 
                {editingDonationId === donation.id ? "Updating..." : "Edit"}
              </button>

              <button
                type="button"
                onClick={() => handleDelete(donation.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RestaurantDashboard;