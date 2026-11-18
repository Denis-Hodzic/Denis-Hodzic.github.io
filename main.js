// Scroll to top
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 260 ? "block" : "none";
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Contact form – Web3Forms
const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    statusText.textContent = "Sending…";

    const data = new FormData(form);
    data.append("from_name", document.getElementById("name").value);
    data.append("reply_to", document.getElementById("email").value);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });

      const json = await res.json();

      if (json.success) {
        statusText.textContent = "Message sent successfully.";
        form.reset();
      } else {
        console.log(json);
        statusText.textContent = "Failed to send the message.";
      }
    } catch (err) {
      console.error(err);
      statusText.textContent = "Error. Please try again later.";
    }
  });
}

// Theme toggle
// const themeToggle = document.getElementById("themeToggle");
// if (themeToggle) {
//   if (localStorage.getItem("theme") === "dark") {
//     document.body.classList.add("dark");
//     themeToggle.textContent = "☀️";
//   }

//   themeToggle.addEventListener("click", () => {
//     document.body.classList.toggle("dark");
//     const isDark = document.body.classList.contains("dark");
//     themeToggle.textContent = isDark ? "☀️" : "🌙";
//     localStorage.setItem("theme", isDark ? "dark" : "light");
//   });
// }

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Smooth scroll for nav links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    const menuToggle = document.getElementById("menu-toggle");
    if (menuToggle) menuToggle.checked = false;
  });
});

// konami code

// addEventListener("click",_=>{
//   let titre = document.createElement('h1');
//   titre.innerText="TESTTTTTTT"
//   let header = document.querySelector('header');
//   header.appendChild(titre)
// })

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // 1. Gérer la classe 'active' sur les boutons
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');

    // 2. Récupérer le filtre choisi
    const filterValue = btn.getAttribute('data-filter');

    // 3. Boucler sur les projets
    projectCards.forEach(card => {
      // Si 'all' OU si la catégorie correspond
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.classList.remove('hidden');
        card.classList.add('show-anim'); // Petite animation
      } else {
        card.classList.add('hidden');
        card.classList.remove('show-anim');
      }
    });
  });
});


// ===== MODAL LOGIC =====

// Données des projets (Vous pouvez ajouter les autres ici plus tard)
const projectsData = {
  hunimalis: {
    title: "Hunimalis (SaaS Platform)",
    tags: ["Laravel", "PHP 8.2", "PostgreSQL", "TailwindCSS", "OpenAI API"],
    description: `
      <strong>Context:</strong> Created as a semester project to simulate a real-world SaaS product.<br><br>
      <strong>Features:</strong><br>
      • <strong>CRM & ERP:</strong> Complete management of clients, pets, and stock for professionals.<br>
      • <strong>SaaS Architecture:</strong> Subscription management with monthly invoicing.<br>
      • <strong>AI Assistant:</strong> Integrated chatbot to help vets find quick answers or manage schedules.<br>
      • <strong>Security:</strong> Role-based access control (Admin, Vet, Groomer, Client).
    `,
    // Liste de vos noms de fichiers images
    images: [
      "Img/Main_Screen_Hunimalis.png"
    ]
  },
  // Vous pouvez ajouter "loxam" ou "angrysnowman" ici plus tard si vous voulez des modales pour eux aussi
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalTags = document.getElementById("modalTags");
const modalDesc = document.getElementById("modalDesc");
const modalGallery = document.getElementById("modalGallery");
const closeModal = document.querySelector(".close-modal");
const openBtns = document.querySelectorAll(".open-modal-btn");

// Ouvrir la modale
openBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const projectId = btn.getAttribute("data-project");
    const data = projectsData[projectId];

    if (data) {
      // 1. Remplir le texte
      modalTitle.textContent = data.title;
      modalDesc.innerHTML = data.description; // innerHTML pour gérer les balises <br> et <strong>
      
      // 2. Remplir les tags
      modalTags.innerHTML = data.tags.map(tag => `<span>${tag}</span>`).join('');

      // 3. Remplir la galerie d'images
      modalGallery.innerHTML = ""; // Vider l'ancienne galerie
      data.images.forEach(imgSrc => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.className = "gallery-img";
        img.loading = "lazy";
        modalGallery.appendChild(img);
      });

      // 4. Afficher
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Empêcher le scroll derrière
    }
  });
});

// Fermer la modale
closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
  document.body.style.overflow = "auto"; // Réactiver le scroll
});

// Fermer en cliquant en dehors
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});