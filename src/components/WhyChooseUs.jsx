import { CalendarCheck, Users, Wallet } from "lucide-react";

const benefits = [
  {
    icon: CalendarCheck,
    title: "Easy Event Planning",
    description:
      "Explore events and organize your participation in one simple place.",
  },
  {
    icon: Users,
    title: "Discover Communities",
    description:
      "Meet people with similar interests and discover new opportunities.",
  },
  {
    icon: Wallet,
    title: "Clear & Simple Pricing",
    description:
      "See ticket prices clearly and calculate your total before registration.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-[#fffaf4] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-600">
            Why Choose Us
          </p>

          <h2 className="text-3xl font-bold text-stone-900 md:text-4xl">
            Everything You Need to
            <span className="text-orange-600"> Get Started</span>
          </h2>

          <p className="mt-4 leading-7 text-stone-600">
            Discover exciting experiences and plan your next event with
            confidence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="group rounded-3xl border border-orange-100 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100/60"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-600 group-hover:text-white">
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-bold text-stone-900">
                  {benefit.title}
                </h3>

                <p className="mt-3 leading-7 text-stone-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
