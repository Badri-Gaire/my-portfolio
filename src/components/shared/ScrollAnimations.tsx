import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    let ctx: any;

    async function init() {
      const [{ gsap }, { ScrollTrigger }, { ScrollToPlugin }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("gsap/ScrollToPlugin"),
        ]);

      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      ctx = gsap.context(() => {
        // Animate-on-scroll (Experience, About, etc.)
        document.querySelectorAll(".animate-on-scroll").forEach((el) => {
          gsap.to(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          });
        });

        // Smooth anchor scroll
        document
          .querySelectorAll('a[href^="#"]')
          .forEach((anchor) => {
            anchor.addEventListener("click", (e) => {
              e.preventDefault();
              const id = (anchor as HTMLAnchorElement).getAttribute("href");
              if (!id || id === "#") return;

              const target = document.querySelector(id);
              if (!target) return;

              gsap.to(window, {
                duration: 1,
                scrollTo: { y: target, offsetY: 80 },
                ease: "power2.inOut",
              });
            });
          });
      });
    }

    init();
    return () => ctx?.revert();
  }, []);

  return null;
}
