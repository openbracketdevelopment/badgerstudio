"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Badger Studio turned our vision into a product that actually delivers.",
    name: "Sarah K.",
    role: "Product Manager, Fidium",
    initials: "SK",
  },
  {
    quote:
      "They brought clarity to a complicated idea and gave us a brand people remember.",
    name: "Marcus T.",
    role: "Founder, Nexora",
    initials: "MT",
  },
  {
    quote:
      "The rare team that can move from sharp strategy to beautiful code without losing momentum.",
    name: "Avery R.",
    role: "VP Marketing, Loom",
    initials: "AR",
  },
  {
    quote:
      "Every detail felt intentional, and the launch gave our team confidence from day one.",
    name: "Priya S.",
    role: "Creative Director, Common Thread",
    initials: "PS",
  },
];

export function TestimonialSlider() {
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 6500,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    [],
  );
  const [viewportRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true, skipSnaps: false },
    [autoplay],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      className="testimonial-block landing-reveal"
      id="about"
      aria-labelledby="testimonial-heading"
    >
      <div className="testimonial-top">
        <span id="testimonial-heading">TESTIMONIALS</span>
        <div className="testimonial-controls">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ArrowLeft size={14} />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => emblaApi?.scrollNext()}
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
      <div className="testimonial-viewport" ref={viewportRef}>
        <div className="testimonial-container">
          {testimonials.map((testimonial) => (
            <article
              className="testimonial-slide"
              key={testimonial.name}
              aria-label={`${testimonial.name} testimonial`}
            >
              <blockquote>“{testimonial.quote}”</blockquote>
              <div className="testimonial-person">
                <div className="person-avatar">{testimonial.initials}</div>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div
        className="testimonial-dots"
        role="tablist"
        aria-label="Choose testimonial"
      >
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.name}
            type="button"
            role="tab"
            aria-label={`Show testimonial from ${testimonial.name}`}
            aria-selected={selectedIndex === index}
            className={selectedIndex === index ? "active" : ""}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
