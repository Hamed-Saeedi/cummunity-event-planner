function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <p className="about-label">ABOUT OUR PROJECT</p>

        <h2>About CEP</h2>

        <p className="about-description">
          Community Event Registration Planner (CEP) is a simple and
          user-friendly platform designed to help students explore university
          events and manage their registrations.
        </p>

        <div className="about-features">
          <div className="about-card">
            <h3>Explore Events</h3>
            <p>Discover workshops, exhibitions, and university activities.</p>
          </div>

          <div className="about-card">
            <h3>Easy Registration</h3>
            <p>Select events and choose the number of tickets you need.</p>
          </div>

          <div className="about-card">
            <h3>Manage Plans</h3>
            <p>Review your selected events and calculate the total cost.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
