document.addEventListener("DOMContentLoaded", () => {
	// --- 1. Animation au Scroll (Reveal) ---
	const reveals = document.querySelectorAll(".reveal");
	const observerOptions = {
		root: null,
		rootMargin: "0px",
		threshold: 0.15
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("active");
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	reveals.forEach((reveal) => {
		observer.observe(reveal);
	});

	// --- 2. Système de Zoom (Lightbox) ---
	const modal = document.getElementById("image-modal");
	const modalImg = document.getElementById("modal-img");
	const images = document.querySelectorAll(".preuve-img");
	const closeBtn = document.querySelector(".modal-close");

	if (modal && modalImg && images.length > 0) {
		images.forEach(img => {
			img.addEventListener("click", () => {
				modal.classList.add("active");
				modal.style.display = "flex";
				modalImg.src = img.src;
				modalImg.alt = img.alt;
			});
		});

		// Fonction pour fermer la box
		const closeModal = () => {
			modal.classList.remove("active");
			setTimeout(() => {
				modal.style.display = "none";
			}, 300);
		};

		// Ferme si on clique sur la croix
		if (closeBtn) {
			closeBtn.addEventListener("click", closeModal);
		}

		// Ferme si on clique n'importe où à côté de l'image
		modal.addEventListener("click", (e) => {
			if (e.target !== modalImg) {
				closeModal();
			}
		});
	}
});