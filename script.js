

const menuBtn = document.querySelector(".menu-icon"); 
const nav = document.querySelector(".responsive-nav");
const closeBtn = document.querySelector(".close");

menuBtn.addEventListener("click", () => {
  nav.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  nav.classList.remove("active");
});


//  card section 

// --- SETUP ---
const wrapper = document.querySelector(".project-card-wrapper");
const nextBtn = document.querySelector(".right-btn");
const prevBtn = document.querySelector(".left-btn");

let originalCards = Array.from(wrapper.children);
const cardCount = originalCards.length;
const cardsToClone = 3; // Number of cards to clone on each end

// --- CLONING ---
// Clone the first few cards and add them to the end
for (let i = 0; i < cardsToClone; i++) {
    const clone = originalCards[i].cloneNode(true);
    wrapper.appendChild(clone);
}
// Clone the last few cards and add them to the beginning
for (let i = cardCount - 1; i >= cardCount - cardsToClone; i--) {
    const clone = originalCards[i].cloneNode(true);
    wrapper.prepend(clone);
}

// --- POSITIONING & MOVEMENT ---
const cardWidth = originalCards[0].offsetWidth + 30; // Card width + 30px gap
let currentIndex = cardsToClone; // Start at the first "real" card
let isMoving = false;

// Set the initial position without any animation
wrapper.style.transition = "none";
wrapper.style.transform = `translateX(${-currentIndex * cardWidth}px)`;

// Re-enable transitions after the initial positioning is done
setTimeout(() => {
    wrapper.style.transition = "transform 0.5s ease-in-out";
}, 50);


// --- EVENT LISTENERS ---
const move = (direction) => {
    if (isMoving) return;
    isMoving = true;
    
    // Move the index and apply the transform
    currentIndex += direction;
    wrapper.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
};

nextBtn.addEventListener("click", () => move(1));
prevBtn.addEventListener("click", () => move(-1));

// The REVISED "Magic Jump" Logic
wrapper.addEventListener("transitionend", () => {
    isMoving = false; // Allow movement again

    // If we've slided to the clones at the END of the track
    // (e.g., after the real card 5, we see a clone of card 1)
    if (currentIndex >= cardCount + cardsToClone) {
        wrapper.style.transition = "none"; // Disable animation for the jump
        currentIndex = cardsToClone; // Jump back to the real card 1
        wrapper.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
        // Use a tiny timeout to ensure the browser applies the jump before re-enabling transitions
        setTimeout(() => {
            wrapper.style.transition = "transform 0.5s ease-in-out";
        });
    }

    // If we've slided to the clones at the BEGINNING of the track
    // (e.g., before the real card 1, we see a clone of card 5)
    if (currentIndex <= cardsToClone - 1) {
        wrapper.style.transition = "none"; // Disable animation for the jump
        currentIndex = cardCount + cardsToClone - 1; // Jump to the real card 5
        wrapper.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
        // Use a tiny timeout to ensure the browser applies the jump before re-enabling transitions
        setTimeout(() => {
            wrapper.style.transition = "transform 0.5s ease-in-out";
        });
    }
});



// certificate check logic 

function verifyCertificate() {
      const certId = document.getElementById("certId").value.trim();
      const name = document.getElementById("name").value.trim();
      const resultDiv = document.getElementById("result");

      // Clear previous result
      resultDiv.innerHTML = "";

      if (!certId || !name) {
        resultDiv.innerHTML = `<div class="result invalid">⚠️ Please enter both Certificate ID and Name.</div>`;
        return;
      }

      // Search in certificatesData (from certificates.js)
      const found = certificatesData.find(cert => 
        cert.cert_id === certId && cert.name.toLowerCase() === name.toLowerCase()
      );

      if (found) {
        const issueDate = new Date(found.issueDate.$date).toLocaleDateString();
        resultDiv.innerHTML = `
          <div class="result valid">
            ✅ This certificate is <b>valid</b>.
            <div class="details">
              <p><b>Name:</b> ${found.name}</p>
              <p><b>Course:</b> ${found.course}</p>
              <p><b>Certificate ID:</b> ${found.cert_id}</p>
              <p><b>Issue Date:</b> ${issueDate}</p>
            </div>
          </div>
        `;
      } else {
        resultDiv.innerHTML = `<div class="result invalid">❌ This Certificate is not valid</div>`;
      }

      // Clear inputs
      document.getElementById("certId").value = "";
      document.getElementById("name").value = "";
    }