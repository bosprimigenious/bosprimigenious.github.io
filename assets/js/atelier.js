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
  if (!nodes.length) return;

  const show = (node) => node.classList.add("is-in");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nodes.forEach(show);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.14 },
  );
  nodes.forEach((node) => io.observe(node));
})();
