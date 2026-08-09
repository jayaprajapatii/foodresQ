import { useEffect, useState } from "react";
import {
  getMyDonations,
  claimDonation,
  pickupDonation,
  completeDonation,
} from "../services/donation.service";

function NgoDashboard() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadDonations = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/donations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load donations");
      }

      setDonations(result.donations);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to load donations"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  const handleClaim = async (donationId: number) => {
    try {
      const result = await claimDonation(donationId);

      setDonations((currentDonations) =>
        currentDonations.map((donation) =>
          donation.id === donationId
            ? result.donation
            : donation
        )
      );

      setMessage("Donation claimed successfully!");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to claim donation"
      );
    }
  };

  const handlePickup = async (donationId: number) => {
    try {
      const result = await pickupDonation(donationId);

      setDonations((currentDonations) =>
        currentDonations.map((donation) =>
          donation.id === donationId
            ? result.donation
            : donation
        )
      );

      setMessage("Donation picked up successfully!");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to pick up donation"
      );
    }
  };

  const handleComplete = async (donationId: number) => {
    try {
      const result = await completeDonation(donationId);

      setDonations((currentDonations) =>
        currentDonations.map((donation) =>
          donation.id === donationId
            ? result.donation
            : donation
        )
      );

      setMessage("Donation completed successfully!");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to complete donation"
      );
    }
  };

  return (
    <div>
      <h1>NGO Dashboard</h1>

      {message && <p>{message}</p>}

      {loading ? (
        <p>Loading donations...</p>
      ) : donations.length === 0 ? (
        <p>No donations available.</p>
      ) : (
        <div>
          {donations.map((donation) => (
            <div key={donation.id}>
              <h3>{donation.foodName}</h3>

              <p>
                {donation.quantity} {donation.unit}
              </p>

              <p>Status: {donation.status}</p>

              {donation.status === "AVAILABLE" && (
                <button
                  type="button"
                  onClick={() => handleClaim(donation.id)}
                >
                  Claim
                </button>
              )}

              {donation.status === "CLAIMED" && (
                <button
                  type="button"
                  onClick={() => handlePickup(donation.id)}
                >
                  Pickup
                </button>
              )}

              {donation.status === "PICKED_UP" && (
                <button
                  type="button"
                  onClick={() => handleComplete(donation.id)}
                >
                  Complete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NgoDashboard;