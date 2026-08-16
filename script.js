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

  try {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(payload).toString(),
    });
  } catch {
    /* GitHub Pages is static; the form still confirms the request visually. */
  }

  form.classList.add("sent");
  success.hidden = false;
});
