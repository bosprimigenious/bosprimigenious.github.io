(() => {
  const greetEl = document.getElementById("atelier-greet");
  const clockEl = document.getElementById("atelier-clock");
  const hour = new Date().getHours();
  const greet =
    hour < 5 ? "深夜好" : hour < 11 ? "早上好" : hour < 14 ? "中午好" : hour < 18 ? "下午好" : "晚上好";
  if (greetEl) greetEl.textContent = greet;

  const writeClock = () => {
    if (!clockEl) return;
    clockEl.textContent = new Date().toLocaleString("zh-CN", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  writeClock();
  if (clockEl) window.setInterval(writeClock, 30000);

  const nodes = document.querySelectorAll("[data-reveal]");
  const show = (node) => node.classList.add("is-in");
  if (nodes.length) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(show);
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            show(entry.target);
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.12 },
      );
      nodes.forEach((node) => io.observe(node));
    }
  }

  const spot = document.querySelector(".vibe-spot");
  const canFollow =
    spot &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canFollow) return;

  let x = window.innerWidth * 0.5;
  let y = 180;
  let tx = x;
  let ty = y;
  window.addEventListener(
    "pointermove",
    (event) => {
      tx = event.clientX;
      ty = event.clientY;
    },
    { passive: true },
  );

  const tick = () => {
    x += (tx - x) * 0.1;
    y += (ty - y) * 0.1;
    spot.style.setProperty("--spot-x", `${x}px`);
    spot.style.setProperty("--spot-y", `${y}px`);
    window.requestAnimationFrame(tick);
  };
  window.requestAnimationFrame(tick);
})();
