import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const initialFacilities = [
  {
    id: 1,
    name: "Main Hall",
    location: "Block A",
    capacity: 200,
    available: true,
  },
  {
    id: 2,
    name: "Lab 2",
    location: "Block B",
    capacity: 40,
    available: true,
  },
  {
    id: 3,
    name: "Auditorium",
    location: "Block C",
    capacity: 350,
    available: false,
  },
];

export default function ManageFacilities() {
  const [facilities, setFacilities] = useState(initialFacilities);

  const [showModal, setShowModal] = useState(false);

  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    capacity: "",
    available: true,
  });

  const openAdd = () => {
    setEditing(null);

    setForm({
      name: "",
      location: "",
      capacity: "",
      available: true,
    });

    setShowModal(true);
  };

  const openEdit = (facility) => {
    setEditing(facility);

    setForm({
      ...facility,
    });

    setShowModal(true);
  };

  const saveFacility = () => {
    if (editing) {
      setFacilities((prev) =>
        prev.map((f) =>
          f.id === editing.id
            ? {
                ...form,
                id: editing.id,
              }
            : f
        )
      );
    } else {
      setFacilities((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now(),
        },
      ]);
    }

    setShowModal(false);
  };

  const deleteFacility = (id) => {
    if (!window.confirm("Delete this facility?")) return;

    setFacilities((prev) =>
      prev.filter((f) => f.id !== id)
    );
  };

  return (
    <AdminLayout>
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Manage Facilities
          </h1>
          <p className="text-gray-500">
            Add, edit or delete facilities
          </p>
        </div>

        <button
          onClick={openAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Facility
        </button>
      </div>

      <div className="bg-white rounded-xl p-5">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th>Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {facilities.map((facility) => (
              <tr key={facility.id}>
                <td>{facility.name}</td>
                <td>{facility.location}</td>
                <td>{facility.capacity}</td>

                <td>
                  {facility.available
                    ? "Available"
                    : "Unavailable"}
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() =>
                      openEdit(facility)
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteFacility(facility.id)
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg w-96 p-6 space-y-4">
            <h2 className="text-xl font-bold">
              {editing
                ? "Edit Facility"
                : "Add Facility"}
            </h2>

            <input
              placeholder="Name"
              className="border w-full p-2 rounded"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Location"
              className="border w-full p-2 rounded"
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value,
                })
              }
            />

            <input
              placeholder="Capacity"
              type="number"
              className="border w-full p-2 rounded"
              value={form.capacity}
              onChange={(e) =>
                setForm({
                  ...form,
                  capacity: Number(
                    e.target.value
                  ),
                })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveFacility}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}