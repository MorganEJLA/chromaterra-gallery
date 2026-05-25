const screens = [
  {
    title: "Chromaterra — Landing Page (Desktop)",
    desc: "Public-facing landing page introducing the concept of travel distilled into color palettes, with hero layout and CTA.",
    src: "img/chromaterra-landing_public_desktop.png",
  },
  {
    title: "Chromaterra — Profile My Atlas (Desktop)",
    desc: "Signed-in user view showing generated locales across New Orleans, the Azores, Los Angeles, and Ireland — each with an extracted palette and the option ,to share to the public atlas.",
    src: "img/updated-garden-district-thumb.png",
  },
  {
    title: "Chromaterra — Landing Page (Mobile)",
    desc: "Mobile layout of the public landing page, maintaining typographic hierarchy and responsive structure.",
    src: "img/chromaterra-landing_public_mobile.png",
  },

  {
    title: "Locale Detail — Desktop",
    desc: "Full palette detail view for a generated locale, including color swatches, gradient tool, and font pairing.",
    src: "img/chromaterra-locale_detail.png",
  },
  {
    title: "Locale Detail — Mobile",
    desc: "Mobile-optimized locale detail page with accessible layout for palette exploration on small screens.",
    src: "img/garden-district-mobile.png",
  },
  {
    title: "Generate New Locale",
    desc: "Form interface for generating a locale palette — name input, font mood selector, and reference image upload.",
    src: "img/garden-district-thumb.png",
  },
  {
    title: "Generated Locale Results",
    desc: "Post-generation view showing the extracted palette, gradient builder, and font pairings derived from uploaded photos.",
    src: "img/chromaterra-generated-profile-add-results.png",
  },

  {
    title: "Profile — Palette Thumbnails",
    desc: "Compact palette thumbnail view on the signed-in profile, showing locale count and generated color sets.",
    src: "img/chromaterra-generate-thumbnails.png",
  },
  {
    title: "Signed In Profile",
    desc: "User profile overview with avatar, locale count, and the option to generate new locale palettes.",
    src: "img/chromaterra-signedin-profile.png",
  },
  {
    title: "Updated Atlas View",
    desc: "Region detail page showing island sub-areas, locale cards with palette stripes, and neighborhood management.",
    src: "img/chromaterra-updated-atlas.png",
  },
];

const grid = document.getElementById("grid");
const search = document.getElementById("search");

const lightbox = document.getElementById("lightbox");
const lbTitle = document.getElementById("lbTitle");
const lbDesc = document.getElementById("lbDesc");
const lbImg = document.getElementById("lbImg");
const lbOpen = document.getElementById("lbOpen");

function render(items) {
  grid.innerHTML = "";

  if (!items.length) {
    grid.innerHTML = `<p style="color: rgba(59,42,33,0.72);">No matches. Try “Figma”, “Mobile”, “Desktop”, etc.</p>`;
    return;
  }

  items.forEach((item, idx) => {
    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.setAttribute("data-idx", idx);

    card.innerHTML = `
      <img src="${item.src}" alt="${item.title} screenshot" loading="lazy" />
      <div class="card__meta">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `;

    card.addEventListener("click", () => openLightbox(item));
    grid.appendChild(card);
  });
}

function openLightbox(item) {
  lbTitle.textContent = item.title;
  lbDesc.textContent = item.desc;
  lbImg.src = item.src;
  lbImg.alt = `${item.title} screenshot`;
  lbOpen.href = item.src;

  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

lightbox.addEventListener("click", (e) => {
  if (e.target.dataset.close === "true") closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.getAttribute("aria-hidden") === "false") {
    closeLightbox();
  }
});

search?.addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  const filtered = screens.filter((s) => {
    return (
      s.title.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.src.toLowerCase().includes(q)
    );
  });
  render(filtered);
});

document.getElementById("year").textContent = new Date().getFullYear();

render(screens);
