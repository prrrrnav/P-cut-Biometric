import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, Quote, Sparkles, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Fetch data from Hostinger Backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        // Using the live URL verified earlier
        const response = await axios.get("https://bisque-ferret-748084.hostingersite.com/api/testimonials");
        
        if (response.data.success) {
          setTestimonials(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // 2. Auto-slide logic
  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + 2 >= testimonials.length ? 0 : prev + 2
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 2 >= testimonials.length ? 0 : prev + 2
    );
  };

  const prevSlide = () => {
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

  return (
    <section className="relative py-24 bg-gray-900 overflow-hidden">
      {/* Background elements remain the same */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900"></div>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="relative text-center mb-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 text-emerald-300 rounded-full mb-6">
              <Sparkles size={16} />
              <span className="text-sm font-semibold">Client Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Trusted by Industry Leaders</h2>
          </div>
        </div>

        <div className="relative">
          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 overflow-hidden">
            {/* Navigation Buttons */}
            <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center hover:bg-white/20 transition-colors z-10 text-white">
              <ChevronLeft />
            </button>
            <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center hover:bg-white/20 transition-colors z-10 text-white">
              <ChevronRight />
            </button>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${(currentIndex / 2) * 100}%)` }}
              >
                {testimonials.map((test, idx) => (
                  <div key={idx} className="w-full md:w-1/2 flex-shrink-0 px-4">
                    <div className="relative h-full group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl opacity-30 group-hover:opacity-50 blur transition-opacity" />
                      <div className="relative h-full bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl hover:border-emerald-500/30 transition-colors">
                        <div className="absolute -top-3 -right-3 w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Quote className="text-white" size={24} />
                        </div>

                        {/* Stars based on DB 'rating' */}
                        <div className="flex gap-1 mb-5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className={i < test.rating ? "text-emerald-400" : "text-gray-600"}
                              fill="currentColor"
                            />
                          ))}
                        </div>

                        {/* Database mapping: 'testimonial_text' */}
                        <p className="text-gray-300 mb-8 leading-relaxed italic">
                          "{test.testimonial_text}"
                        </p>

                        <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                          {/* Use avatar_url if present, else first initial */}
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg overflow-hidden">
                            {test.avatar_url ? (
                              <img src={test.avatar_url} alt={test.client_name} className="w-full h-full object-cover" />
                            ) : (
                              test.client_name.charAt(0)
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-white">{test.client_name}</div>
                            <div className="text-sm text-gray-400">{test.company} {test.position && `| ${test.position}`}</div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 rounded-b-2xl" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}