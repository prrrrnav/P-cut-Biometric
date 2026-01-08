import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Star,
  Quote,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(
          "https://bisque-ferret-748084.hostingersite.com/api/testimonials"
        );

        if (res?.data?.success && Array.isArray(res.data.data)) {
          setTestimonials(res.data.data);
        } else {
          setTestimonials([]);
        }
      } catch (err) {
        console.error("Testimonials fetch failed:", err);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length < 2) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + 2 >= testimonials.length ? 0 : prev + 2
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials]);

  const nextSlide = () => {
    if (testimonials.length < 2) return;
    setCurrentIndex((prev) =>
      prev + 2 >= testimonials.length ? 0 : prev + 2
    );
  };

  const prevSlide = () => {
    if (testimonials.length < 2) return;
    setCurrentIndex((prev) =>
      prev - 2 < 0 ? Math.max(0, testimonials.length - 2) : prev - 2
    );
  };

  if (loading) {
    return (
      <div className="py-24 bg-gray-900 flex justify-center items-center">
        <Loader2 className="animate-spin text-emerald-500" size={48} />
      </div>
    );
  }

  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full mb-6">
            <Sparkles size={16} />
            Client Success Stories
          </div>
          <h2 className="text-4xl font-bold text-white">
            Trusted by Industry Leaders
          </h2>
        </div>

        <div className="relative bg-white/5 rounded-2xl p-10">
          <button onClick={prevSlide} className="absolute left-4 top-1/2 text-white">
            <ChevronLeft />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 text-white">
            <ChevronRight />
          </button>

          <div className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${(currentIndex / 2) * 100}%)` }}
          >
            {testimonials.map((test, idx) => {
              const rating = Math.round(Number(test.rating) || 0);

              return (
                <div key={idx} className="w-full md:w-1/2 px-4">
                  <div className="bg-slate-900 p-8 rounded-xl text-white h-full">
                    <Quote className="mb-4 text-emerald-400" />

                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < rating ? "text-emerald-400" : "text-gray-600"}
                          fill="currentColor"
                        />
                      ))}
                    </div>

                    <p className="text-gray-300 italic mb-6">
                      "{test.testimonial_text}"
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center font-bold">
                        {test.client_name?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold">{test.client_name}</div>
                        <div className="text-sm text-gray-400">
                          {test.company}
                          {test.position && ` | ${test.position}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
