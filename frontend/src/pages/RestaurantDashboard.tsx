import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  createDonation,
  getMyDonations,
} from "../services/donation.service";

function RestaurantDashboard() {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("plates");
  const [message, setMessage] = useState("");
  const [donations, setDonations] = useState<any[]>([]);
  const [loadingDonations, setLoadingDonations] = useState(true);

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

      {message && <p>{message}</p>}

      <h2>My Donations</h2>

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RestaurantDashboard;