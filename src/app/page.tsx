import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollSections from "@/components/ScrollSections";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  return (
    <>
      {/* Static background: pantry/meal image with dark overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1920"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(5,15,10,0.88)" }} />
      </div>
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ScrollSections />

        {/* CTA Section */}
        <section id="waitlist" className="relative py-36 px-8 md:px-14 text-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em] mb-8">
              Ready to{" "}
              <span className="gradient-text">Eat Smarter</span>?
            </h2>
            <p className="text-lg text-emerald-200/50 mb-10 leading-relaxed max-w-lg mx-auto">
              Join our waitlist to get early access to new features, updates, and discover new meals every day.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
