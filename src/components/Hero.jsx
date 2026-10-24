function Hero() {
  return (
    <section id="home" className="bg-[#fff8f0] px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        {/* Left side: Text */}
        <div>
          <p className="mb-5 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            Discover · Connect · Participate
          </p>

          <h1 className="text-4xl font-bold leading-tight text-stone-900 md:text-6xl">
            Find Events.
            <br />
            Make Memories.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-stone-600 md:text-lg">
            Discover exciting workshops, creative activities, and inspiring
            talks. Find your next experience and plan your participation in one
            place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#events"
              className="rounded-full bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
            >
              Explore Events →
            </a>

            <a
              href="#about"
              className="rounded-full border border-stone-300 px-6 py-3 font-semibold text-stone-800 transition hover:border-orange-500 hover:text-orange-600"
            >
              Learn More
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-8">
            <div>
              <p className="text-2xl font-bold text-stone-900">10+</p>
              <p className="mt-1 text-sm text-stone-500">Upcoming Events</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-stone-900">3</p>
              <p className="mt-1 text-sm text-stone-500">Event Categories</p>
            </div>
          </div>
        </div>

        {/* Right side: Image */}
        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-orange-200/50 blur-2xl" />

          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85"
            alt="People participating in a workshop"
            className="relative h-[320px] w-full rounded-[2rem] object-cover shadow-xl md:h-[480px]"
          />

          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
            <p className="font-bold text-stone-900">
              Your Next Experience Starts Here
            </p>
            <p className="mt-1 text-sm text-stone-600">
              Learn something new. Meet new people.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
