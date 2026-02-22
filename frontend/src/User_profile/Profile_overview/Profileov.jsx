// Profileov.jsx
import React, { useEffect, useMemo, useState } from "react";
import { FiCalendar, FiMapPin, FiAward, FiClock } from "react-icons/fi";
import "./Profileov.scss";
import {
  fetchAvatarUrl,
  fetchTrips,
  getProfile,
} from "../../Api/userProfile/userProfileApi";

const Profileov = ({ onFinishProfile }) => {
  const [profile, setProfile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileMissing, setProfileMissing] = useState(false);
  const [error, setError] = useState("");
  const [nextTrip, setNextTrip] = useState(null);

  const email = useMemo(() => {
    return profile?.email || localStorage.getItem("userEmail") || "";
  }, [profile]);

  const displayName = useMemo(() => {
    if (profile?.firstName || profile?.lastName) {
      return `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim();
    }
    return "Traveler";
  }, [profile]);

  const initials = useMemo(() => {
    const first = profile?.firstName?.[0] || "";
    const last = profile?.lastName?.[0] || "";
    const value = `${first}${last}`.trim();
    return value || "SB";
  }, [profile]);

  useEffect(() => {
    let isActive = true;

    const loadProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getProfile();
        if (!isActive) return;
        setProfile(data);
        setProfileMissing(false);
      } catch (err) {
        if (!isActive) return;
        const message = err?.message || "Failed to load profile";
        if (message.toLowerCase().includes("profile not found")) {
          setProfileMissing(true);
        } else {
          setError(message);
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadProfile();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;
    const loadAvatar = async () => {
      if (!profile?.avatarFileId) return;
      try {
        const url = await fetchAvatarUrl(profile.avatarFileId);
        if (!isActive) return;
        setAvatarUrl(url);
      } catch (err) {
        console.error(err);
      }
    };

    loadAvatar();

    return () => {
      isActive = false;
    };
  }, [profile]);

  useEffect(() => {
    if (!profile) return;
    let isActive = true;
    const loadNextTrip = async () => {
      try {
        const trips = await fetchTrips({ status: "CONFIRMED", page: 0, size: 1 });
        if (!isActive) return;
        setNextTrip(trips?.[0] || null);
      } catch (err) {
        console.error(err);
      }
    };

    loadNextTrip();

    return () => {
      isActive = false;
    };
  }, [profile]);

  useEffect(() => {
    return () => {
      if (avatarUrl) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [avatarUrl]);

  return (
    <div className="profile-wrap">
      <div className="profile-card">
        <div className="avatar-container">
          <div className="avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" className="avatar-img" />
            ) : (
              initials
            )}
          </div>
        </div>
        <div>
          <h2>{displayName}</h2>
          <p>{email || "No email available"}</p>
          <p>{profile?.phone || "Add your phone number"}</p>
          <span className="badge">
            <FiAward /> {profile?.profileTier || "SILVER"} Traveler
          </span>
        </div>
      </div>

      {loading && <p>Loading your profile...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {profileMissing && (
        <div className="trip-card">
          <h3>Finish your profile</h3>
          <p>
            Add your details to unlock your profile overview and traveler
            features.
          </p>
          <button
            className="primary"
            onClick={() => onFinishProfile && onFinishProfile()}
          >
            Finish ur profile
          </button>
        </div>
      )}

      {!loading && !profileMissing && (
        <>
          <div className="stats-row">
            <div className="stat">
              <FiCalendar className="blue" />
              <h3>0</h3>
              <span>Upcoming Trips</span>
            </div>
            <div className="stat">
              <FiMapPin className="purple" />
              <h3>0</h3>
              <span>Past Trips</span>
            </div>
            <div className="stat">
              <FiAward className="green" />
              <h3>0</h3>
              <span>Total Bookings</span>
            </div>
            <div className="stat">
              <FiClock className="orange" />
              <h3>0</h3>
              <span>Days Traveled</span>
            </div>
          </div>

          <div className="trip-card">
            <h3>Next Trip</h3>
            {nextTrip ? (
              <div className="trip-box">
                <div className="trip-info">
                  <h4>{nextTrip.hotelName}</h4>
                  <p>
                    <FiMapPin /> {nextTrip.location}
                  </p>

                  <div className="dates">
                    <div>
                      <label>Check-in</label>
                      <strong>
                        {new Date(nextTrip.checkInDate).toLocaleDateString()}
                      </strong>
                    </div>
                    <div>
                      <label>Check-out</label>
                      <strong>
                        {new Date(nextTrip.checkOutDate).toLocaleDateString()}
                      </strong>
                    </div>
                  </div>

                  <p>Room Type: {nextTrip.roomType}</p>
                  <p>Booking ID: {nextTrip.bookingId}</p>
                </div>

                <div className="trip-actions">
                  <span className="status">
                    {nextTrip.status?.toLowerCase()}
                  </span>
                  <button className="primary">View Details</button>
                  <button className="outline">Modify</button>
                </div>
              </div>
            ) : (
              <div className="trip-box">
                <p>No upcoming trips yet.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profileov;
