const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");
const navLabel = navToggle?.querySelector("[data-label]");

function setNav(open) {
  if (!navToggle || !siteNav) return;
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  siteNav.classList.toggle("is-open", open);
  if (navLabel) navLabel.textContent = open ? "Close menu" : "Menu";
}

navToggle?.addEventListener("click", () => {
  setNav(navToggle.getAttribute("aria-expanded") !== "true");
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNav(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNav(false);
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxCaption = lightbox?.querySelector(".lb-caption");

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    if (!lightbox || !lightboxImage || !image) return;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxImage.width = image.naturalWidth || image.width;
    lightboxImage.height = image.naturalHeight || image.height;
    if (lightboxCaption) lightboxCaption.textContent = button.dataset.caption || "";
    lightbox.showModal();
  });
});

lightbox?.querySelector(".lb-close")?.addEventListener("click", () => {
  lightbox.close();
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

const copyButton = document.querySelector("[data-copy-email]");

function copyWithFallback(text) {
  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  return copied;
}

copyButton?.addEventListener("click", async () => {
  const email = copyButton.dataset.copyEmail;
  const original = copyButton.textContent;
  let copied = false;
  try {
    await navigator.clipboard.writeText(email);
    copied = true;
  } catch {
    copied = copyWithFallback(email);
  }
  copyButton.textContent = copied ? "Copied" : "Couldn't copy";
  window.setTimeout(() => {
    copyButton.textContent = original;
  }, 2000);
});
