document.addEventListener("DOMContentLoaded", () => {
    // Element references
    const cake = document.getElementById("birthday-cake");
    const codePage = document.getElementById("code-page");
    const wishesPage = document.getElementById("birthday-wishes");
    const textWishes = document.getElementById("text-wishes");
    const answerInput = document.getElementById("answer");
    const submitButton = document.getElementById("submit-answer");
    const goToTextBtn = document.getElementById("go-to-text-wishes");
    const specialGift = document.getElementById("special-gift");
    const profileContainer = document.querySelector(".profile-container");
    const profileImg = document.getElementById("profile-img");
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("close-popup");
    const downloadAllBtn = document.getElementById("download-all");

    // Helpers
    function fadeIn(el) {
        if (!el) return;
        el.classList.remove("hidden");
        setTimeout(() => {
            el.classList.add("fade-in");
            el.classList.remove("fade-out");
        }, 10);
    }

    function fadeOut(el, cb) {
        if (!el) return;
        el.classList.add("fade-out");
        el.classList.remove("fade-in");
        setTimeout(() => {
            el.classList.add("hidden");
            if (typeof cb === 'function') cb();
        }, 600);
    }

    // 1) Show cake and then code page
    function showCakeThenCode() {
        fadeIn(cake);
        setTimeout(() => {
            fadeOut(cake, () => fadeIn(codePage));
        }, 3500);
    }

    // 2) Check answer and show birthday wishes
    let isProcessingAnswer = false;

    function checkAnswer() {
        if (isProcessingAnswer) return;
        isProcessingAnswer = true;

        const correct = "THU SINH NHẬT VUI VẺ NHÉ";
        const userAnswer = answerInput.value.trim().toUpperCase();

        if (userAnswer === correct) {
            Swal.fire({
                title: '🎉 Chính xác!',
                html: `<p>Quà của bé đến nè!</p>
                       <div style="margin-top:15px;font-size:24px;
                        font-weight:bold;color:#E77C8D;
                        background:#FFE6EB;padding:10px 20px;
                        border-radius:12px;box-shadow:0 0 8px rgba(231,124,141,0.2);">
                         TẢN THU SINH NHẬT VUI VẺ NHÉ ❤️
                       </div>`,
                icon: 'success',
                showConfirmButton: false,
                timer: 4000,
                background: '#e0f7fa',
                color: '#00695c',
                timerProgressBar: true,
                allowOutsideClick: false,
            }).then(() => {
                fadeOut(codePage, () => fadeIn(wishesPage));
                isProcessingAnswer = false;
            });
        } else {
            Swal.fire({
                title: 'Nuh-uh~ Sai rồi bé ơi',
                html: `<p>Thử lại xem</p>
                       <img src="https://media.giphy.com/media/10dU7AN7xsi1I4/giphy.gif"
                            alt="sad cat" style="width:100%;max-width:250px;
                            margin-top:12px;border-radius:8px;"/>`,
                icon: 'error',
                confirmButtonText: 'OK nè 💪',
                background: '#fff0f6',
                color: '#d81b60',
                confirmButtonColor: '#f06292',
                customClass: { popup: 'rounded-popup' },
                allowOutsideClick: false
            }).then(() => {
                answerInput.focus();
                isProcessingAnswer = false;
            });
        }
    }

    // 3) Slideshow trong Birthday Wishes
    function initSlideshow() {
      const images = [
        "Image/Chúc/IMG_20250423_000927.jpg",
        "Image/Chúc/IMG_20250423_234627.jpg",
        "Image/Chúc/IMG_1745395066610_1745425491431.jpg",
        "Image/Chúc/Messenger_creation_7EF8903F-35C8-4BCE-BD96-9F8D3E3A35F4.jpg",
        "Image/Chúc/Messenger_creation_B0080B6A-8CAC-4DBE-9A83-978DE4E55D65.jpg",
        "Image/Chúc/Thiệp sinh nhật Trác.png",
        "Image/Chúc/CMSN_Trac.png",
        "Image/Chúc/dea8081a-3efb-4835-837a-d4aec4777cf0.jpg",
        "Image/DT.jpg"
      ];
      let idx = 0;
      const imgEl = document.getElementById("slide-image");
      document.getElementById("next-btn")?.addEventListener("click", () => {
        idx = (idx+1) % images.length; imgEl.src = images[idx];
      });
      document.getElementById("prev-btn")?.addEventListener("click", () => {
        idx = (idx-1 + images.length) % images.length; imgEl.src = images[idx];
      });
      document.getElementById("download-btn")?.addEventListener("click", () => {
        const a = document.createElement("a");
        a.href = imgEl.src; a.download = "image.jpg"; a.click();
      });
    }

    // 4) Activate Text Wishes → Special Gift & Popup
    specialGift.addEventListener("click", () => {
          fadeOut(textWishes);
          profileContainer.classList.remove("hidden");
          document.getElementById("chest-sound")?.play();
      });

    // Popup handling
    profileImg.addEventListener("click", () => {
        popup.classList.remove("hidden");
    });
    closePopup.addEventListener("click", () => {
        popup.classList.add("hidden");
    });

    // Event bindings
    submitButton?.addEventListener("click", checkAnswer);
    answerInput?.addEventListener("keydown", e => { if (e.key === "Enter") checkAnswer(); });
    goToTextBtn?.addEventListener("click", () => {
        fadeOut(wishesPage, () => fadeIn(textWishes));
    });

        // Thêm sự kiện lật cho thẻ Mật Mã
    document.getElementById("code-card").addEventListener("click", function() {
        this.querySelector(".card-inner").classList.toggle("flipped");
    });

    // Kick off
    showCakeThenCode();
});
