const header = document.getElementById("header");
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const form = document.getElementById("consultForm");
const success = document.getElementById("formSuccess");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
});

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = new FormData(form);
  let delivered = false;

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(payload).toString(),
    });
    delivered = response.ok;
  } catch {
    delivered = false;
  }

  form.classList.add("sent");
  success.hidden = false;
  success.querySelector("p").textContent = delivered
    ? "Заявка принята. Алина свяжется с вами в ближайшее время."
    : "Заявка сохранена на этой странице. На демо-хостинге письма не уходят — напишите Алине напрямую, когда будут контакты.";
});
