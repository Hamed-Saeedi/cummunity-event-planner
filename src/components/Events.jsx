import { useState } from "react";
import "./../index.css";

function Events() {
  const events = [
    {
      id: 1,
      name: "Web Development Workshop",
      category: "Technology",
      date: "October 25, 2026",
      venue: "Computer Lab",
      price: 200,
      seats: 25,
    },
    {
      id: 2,
      name: "Creative Art Exhibition",
      category: "Arts",
      date: "October 28, 2026",
      venue: "University Hall",
      price: 100,
      seats: 15,
    },
    {
      id: 3,
      name: "Career Development Talk",
      category: "Career",
      date: "November 2, 2026",
      venue: "Main Auditorium",
      price: 150,
      seats: 20,
    },
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedEvents, setSelectedEvents] = useState({});

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || event.category === category;
    const matchesAvailability = !availableOnly || event.seats > 0;
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const sortedEvents = [...filteredEvents];

  if (sortOrder === "low") {
    sortedEvents.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high") {
    sortedEvents.sort((a, b) => b.price - a.price);
  }

  const handleSelectEvent = (event) => {
    const quantity = selectedEvents[event.id] || 1;

    setSelectedEvents({
      ...selectedEvents,
      [event.id]: quantity,
    });
  };

  const totalPrice = events.reduce((total, event) => {
    const quantity = selectedEvents[event.id] || 0;
    return total + event.price * quantity;
  }, 0);

  const removeEvent = (id) => {
    const updatedEvents = { ...selectedEvents };
    delete updatedEvents[id];
    setSelectedEvents(updatedEvents);
  };

  return (
    <section className="events-section">
      <h2>Upcoming Events</h2>

      <p className="events-description">
        Discover events, learn new skills, and connect with others.
      </p>

      <input
        className="events-search"
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="events-filter"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Technology">Technology</option>
        <option value="Arts">Arts</option>
        <option value="Career">Career</option>
      </select>

      <select
        className="events-filter"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="default">Sort by Price</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>

      <label className="events-availability">
        <input
          type="checkbox"
          checked={availableOnly}
          onChange={(e) => setAvailableOnly(e.target.checked)}
        />
        Show only events with available seats
      </label>

      <div className="events-container">
        {sortedEvents.map((event) => (
          <div className="events-card" key={event.id}>
            <span className="events-category">{event.category}</span>

            <h3>{event.name}</h3>

            <p>Date: {event.date}</p>
            <p>Venue: {event.venue}</p>
            <p>Ticket Price: {event.price} AFN</p>
            <p>Available Seats: {event.seats}</p>

            {event.seats > 0 && (
              <div className="events-ticket">
                <label>Tickets:</label>
                <input
                  type="number"
                  min="1"
                  max={event.seats}
                  value={selectedEvents[event.id] || 1}
                  onChange={(e) => {
                    const quantity = Number(e.target.value);

                    if (quantity >= 1 && quantity <= event.seats) {
                      setSelectedEvents({
                        ...selectedEvents,
                        [event.id]: quantity,
                      });
                    }
                  }}
                />
              </div>
            )}

            <button
              disabled={event.seats === 0}
              onClick={() => handleSelectEvent(event)}
            >
              {event.seats === 0 ? "Sold Out" : "Select Event"}
            </button>
          </div>
        ))}
      </div>

      <div className="events-total">
        <h3>Total Price: {totalPrice} AFN</h3>

        <h4>Selected Events</h4>

        {events.filter((event) => selectedEvents[event.id]).length === 0 ? (
          <p>No events selected yet.</p>
        ) : (
          events.map((event) =>
            selectedEvents[event.id] ? (
              <div key={event.id}>
                <p>
                  {event.name} — {selectedEvents[event.id]} ticket(s)
                </p>

                <button onClick={() => removeEvent(event.id)}>Remove</button>
              </div>
            ) : null,
          )
        )}

        <button onClick={() => setSelectedEvents({})}>Clear All</button>
      </div>
    </section>
  );
}

export default Events;
