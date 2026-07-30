import { useEffect, useState } from "react";

import Button from "../../components/Button";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const {
    user,
    loading,
    updateProfile,
  } = useAuth();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setSuccess("");
    setError("");

    try {
      await updateProfile({
        first_name: formData.first_name,
        last_name: formData.last_name,
      });

      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="mx-auto max-w-2xl">
        <Card>
          <h1 className="mb-6 text-3xl font-bold text-[#2563EB]">
            My Profile
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="first_name"
                className="mb-1 block font-medium"
              >
                First Name
              </label>

              <input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full rounded-lg border p-3 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label
                htmlFor="last_name"
                className="mb-1 block font-medium"
              >
                Last Name
              </label>

              <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full rounded-lg border p-3 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1 block font-medium"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={formData.email}
                disabled
                className="w-full rounded-lg border bg-gray-100 p-3 text-gray-500"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">
                Role
              </label>

              <input
                value={user?.role || ""}
                disabled
                className="w-full rounded-lg border bg-gray-100 p-3 text-gray-500"
              />
            </div>

            {success && (
              <p className="text-sm text-[#22C55E]">
                {success}
              </p>
            )}

            {error && (
              <p className="text-sm text-[#EF4444]">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Update Profile"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;