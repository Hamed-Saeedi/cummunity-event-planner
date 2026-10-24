import {
  CalendarDays,
  MapPin,
  ArrowRight,
  Code2,
  Palette,
  BriefcaseBusiness,
} from "lucide-react";

const events = [
  {
    id: 1,
    category: "Coding",
    title: "Web Development Workshop",
    date: "November 15, 2026",
    venue: "Herat University",
    price: 100,
    seats: 20,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    icon: Code2,
  },
  {
    id: 2,
    category: "Arts",
    title: "Creative Arts Workshop",
    date: "November 22, 2026",
    venue: "Herat Art Center",
    price: 0,
    seats: 15,
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    icon: Palette,
  },
  {
    id: 3,
    category: "Career Talks",
    title: "Career Guidance Talk",
    date: "November 28, 2026",
    venue: "Herat University",
    price: 150,
    seats: 50,
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    icon: BriefcaseBusiness,
  },
];

function FeaturedEvents() {
  return (
    <section id="events" className="bg-[#fff8f0] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
              EXPLORE & DISCOVER
            </p>

            <h2 className="mt-3 text-3xl font-bold text-stone-900 md:text-4xl">
              Featured Events<span className="text-orange-600">.</span>
            </h2>

            <p className="mt-3 text-stone-600">
              Find your next experience and learn something new.
            </p>
          </div>

          <a
            href="#events"
            className="flex items-center gap-2 font-semibold text-orange-600 hover:gap-3"
          >
            Explore Events <ArrowRight size={18} />
          </a>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const Icon = event.icon;

            return (
              <article
                key={event.id}
                className="overflow-hidden rounded-3xl border border-orange-100 bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-100/70"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-sm font-semibold text-orange-700">
                    <Icon size={16} />
                    {event.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-900">
                    {event.title}
                  </h3>

                  <div className="mt-4 space-y-3 text-sm text-stone-600">
                    <p className="flex items-center gap-2">
                      <CalendarDays size={17} className="text-orange-600" />
                      {event.date}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin size={17} className="text-orange-600" />
                      {event.venue}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-orange-100 pt-5">
                    <div>
                      <p className="text-xs text-stone-500">Ticket Price</p>
                      <p className="mt-1 text-xl font-extrabold text-orange-600">
                        {event.price === 0 ? "Free" : `${event.price} AFN`}
                      </p>
                    </div>
                    <p className="text-sm text-stone-500">
                      {event.seats} seats left
                    </p>
                  </div>

                  <a
                    href="#registration"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
                  >
                    View Event <ArrowRight size={17} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturedEvents;
