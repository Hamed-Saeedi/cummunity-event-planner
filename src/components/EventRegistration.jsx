import { useState } from "react";

function EventRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("");
  const [seats, setSeats] = useState(1);

  const events = [
    { name: "Web Development Workshop", price: 200 },
    { name: "Creative Art Exhibition", price: 100 },
    { name: "Career Development Talk", price: 150 },
  ];

  const selectedEvent = events.find((item) => item.name === event);

  const totalPrice = selectedEvent ? selectedEvent.price * Number(seats) : 0;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!event) {
      alert("Please select an event.");
      return;
    }

    if (Number(seats) < 1 || Number(seats) > 25) {
      alert("Please select between 1 and 25 seats.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          eventName: event,
          quantity: Number(seats),
          totalPrice,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful!");

      setName("");
      setEmail("");
      setEvent("");
      setSeats(1);
    } catch (error) {
      alert("Registration failed. Make sure the backend is running.");
      console.error(error);
    }
  }

  return (
    <section id="register" className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-orange-600">
            Join Our Community
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Event Registration
          </h2>

          <p className="mt-4 text-gray-600">
            Choose your favorite event and reserve your seats.
          </p>
        </div>

        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=85"
              alt="People attending a community event"
              className="h-80 w-full object-cover md:h-full md:min-h-96"
            />

            <div className="bg-orange-600 p-6 text-white">
              <h3 className="text-2xl font-bold">Make Every Event Count</h3>
              <p className="mt-2">
                Learn new skills, meet new people, and be part of our community.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-orange-100 bg-white p-6 shadow-lg md:p-8"
          >
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Select Event
              </label>
              <select
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white p-3 outline-none focus:border-orange-500"
                required
              >
                <option value="">Choose an event</option>

                {events.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name} — {item.price} AFN
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Number of Seats
              </label>
              <input
                type="number"
                min="1"
                max={selectedEvent ? 25 : undefined}
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-orange-500"
                required
              />
            </div>

            <div className="rounded-xl bg-orange-50 p-5">
              <p className="text-sm text-gray-600">Total Price</p>
              <p className="mt-1 text-3xl font-bold text-orange-600">
                {totalPrice} AFN
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-orange-600 py-3 font-bold text-white transition hover:bg-orange-700"
            >
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EventRegistration;
