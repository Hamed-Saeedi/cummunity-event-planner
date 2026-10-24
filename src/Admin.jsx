import { useCallback, useEffect, useState } from "react";

function Admin() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editQuantity, setEditQuantity] = useState(1);
  const [saving, setSaving] = useState(false);

  const getRegistrations = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/registrations");

      if (!response.ok) {
        throw new Error("Could not load registrations");
      }

      const data = await response.json();
      setRegistrations(data);
      setError("");
    } catch (error) {
      setError("Could not connect to the backend.");
      console.error(error);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function loadRegistrations() {
      try {
        const response = await fetch("http://localhost:5000/registrations");

        if (!response.ok) {
          throw new Error("Could not load registrations");
        }

        const data = await response.json();

        if (active) {
          setRegistrations(data);
          setError("");
        }
      } catch (error) {
        if (active) {
          setError("Could not connect to the backend.");
        }
        console.error(error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadRegistrations();

    return () => {
      active = false;
    };
  }, []);

  async function handleRefresh() {
    setLoading(true);
    await getRegistrations();
    setLoading(false);
  }

  function handleEdit(item) {
    setEditingId(item._id);
    setEditName(item.name || "");
    setEditEmail(item.email || "");
    setEditQuantity(item.quantity || 1);
  }

  function handleCancel() {
    setEditingId(null);
    setEditName("");
    setEditEmail("");
    setEditQuantity(1);
  }

  async function handleUpdate(id) {
    if (!editName.trim() || !editEmail.trim()) {
      window.alert("Name and email are required.");
      return;
    }

    const quantity = Number(editQuantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      window.alert("Seats must be a whole number greater than zero.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `http://localhost:5000/registrations/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editName.trim(),
            email: editEmail.trim(),
            quantity,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Could not update registration");
      }

      const updatedRegistration = await response.json();

      setRegistrations((previous) =>
        previous.map((item) => (item._id === id ? updatedRegistration : item)),
      );

      handleCancel();
    } catch (error) {
      console.error(error);
      window.alert("Could not update registration. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id, name) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}'s registration?`,
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/registrations/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Could not delete registration");
      }

      setRegistrations((previous) =>
        previous.filter((item) => item._id !== id),
      );
      if (editingId === id) {
        handleCancel();
      }
    } catch (error) {
      console.error(error);
      window.alert("Could not delete registration. Please try again.");
    }
  }

  const filteredRegistrations = registrations.filter((item) => {
    const name = (item.name || "").toLowerCase();
    const email = (item.email || "").toLowerCase();
    const text = search.toLowerCase();

    return name.includes(text) || email.includes(text);
  });

  const totalSeats = registrations.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );

  const totalRevenue = registrations.reduce(
    (total, item) => total + Number(item.totalPrice || 0),
    0,
  );

  return (
    <section className="min-h-screen bg-orange-50 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Manage and view community event registrations.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-gray-500">Total Registrations</p>
            <p className="mt-2 text-3xl font-bold text-orange-600">
              {registrations.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-gray-500">Seats Reserved</p>
            <p className="mt-2 text-3xl font-bold text-orange-600">
              {totalSeats}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-gray-500">Total Amount</p>
            <p className="mt-2 text-3xl font-bold text-orange-600">
              {totalRevenue} AFN
            </p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="mb-6 w-full rounded-xl border border-orange-200 bg-white px-4 py-3 outline-none focus:border-orange-500"
        />

        {error && (
          <p className="mb-5 rounded-lg bg-red-100 p-4 text-red-700">{error}</p>
        )}

        {loading && (
          <p className="py-6 text-gray-600">Loading registrations...</p>
        )}

        {!loading && !error && filteredRegistrations.length === 0 && (
          <p className="rounded-xl bg-white p-6 text-gray-600 shadow-sm">
            {registrations.length === 0
              ? "No registrations found."
              : "No matching registrations."}
          </p>
        )}

        {!loading && !error && filteredRegistrations.length > 0 && (
          <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-orange-100">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Event</th>
                  <th className="p-4">Seats</th>
                  <th className="p-4">Total Price</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((item) => (
                  <tr key={item._id} className="border-t border-orange-100">
                    {editingId === item._id ? (
                      <>
                        <td className="p-3">
                          <input
                            value={editName}
                            onChange={(event) =>
                              setEditName(event.target.value)
                            }
                            className="w-32 rounded border p-2"
                          />
                        </td>

                        <td className="p-3">
                          <input
                            type="email"
                            value={editEmail}
                            onChange={(event) =>
                              setEditEmail(event.target.value)
                            }
                            className="w-40 rounded border p-2"
                          />
                        </td>

                        <td className="p-4">{item.eventName}</td>

                        <td className="p-3">
                          <input
                            type="number"
                            min="1"
                            value={editQuantity}
                            onChange={(event) =>
                              setEditQuantity(event.target.value)
                            }
                            className="w-20 rounded border p-2"
                          />
                        </td>

                        <td className="p-4">{item.totalPrice} AFN</td>

                        <td className="p-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdate(item._id)}
                              disabled={saving}
                              className="rounded bg-green-600 px-3 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                            >
                              {saving ? "Saving..." : "Save"}
                            </button>

                            <button
                              onClick={handleCancel}
                              disabled={saving}
                              className="rounded bg-gray-500 px-3 py-2 text-white hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-4">{item.name}</td>
                        <td className="p-4">{item.email}</td>
                        <td className="p-4">{item.eventName}</td>
                        <td className="p-4">{item.quantity}</td>
                        <td className="p-4">{item.totalPrice} AFN</td>

                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(item._id, item.name)}
                              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Admin;
