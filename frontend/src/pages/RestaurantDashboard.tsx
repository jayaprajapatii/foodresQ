import { useState } from "react";
import type { FormEvent } from "react";
import { createDonation } from "../services/donation.service";

function RestaurantDashboard() {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("plates");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    try {
      await createDonation({
        foodName,
        quantity: Number(quantity),
        unit,
      });

      setMessage("Donation created successfully!");
      setFoodName("");
      setQuantity("");
      setUnit("plates");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to create donation"
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
    </div>
  );
}

export default RestaurantDashboard;