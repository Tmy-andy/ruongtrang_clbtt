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
                background: '#FFE6EB',
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
                allowOutsideClick: false
            });
        }
    }

        // 2) Check mã → Birthday Wishes
    function checkAnswer() {
        const correct = "THU SINH NHẬT VUI VẺ NHÉ";
        const userAnswer = answerInput.value.trim().toUpperCase();
        
        if (userAnswer === correct) {
            Swal.fire({
                title: '🎉 Chính xác!',
                html: `<p>Quà của bé đến nè!</p>
                       <div style="margin-top:15px;font-size:24px;
                        font-weight:bold;color:#E77C8D;
                        background:rgb(246, 208, 215) ;padding:10px 20px;
                        border-radius:12px;box-shadow:0 0 8px rgba(231,124,141,0.2);">
                         TẢN THU SINH NHẬT VUI VẺ NHÉ ❤️
                       </div>`,
                icon: 'success',
                showConfirmButton: false,
                timer: 4000,
                background: 'rgb(249, 247, 247)',
                color: '#E77C8D',
                timerProgressBar: true,
                allowOutsideClick: false,
                didOpen: () => {
                    setTimeout(() => confetti({
                        particleCount: 150,
                        spread: 80,
                        origin: { y: 0.6 },
                        colors: ['#E77C8D', '#F397AC', '#FFBFD1', '#FFE6EB', '#FFF5F7']
                    }), 300);
                }
            });
            setTimeout(() => fadeOut(codePage, () => fadeIn(wishesPage)), 4000);
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
                allowOutsideClick: false
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
        
        // Preload images for smoother experience
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        
        let idx = 0;
        const imgEl = document.getElementById("slide-image");
        const counterEl = document.createElement("div");
        counterEl.className = "slide-counter";
        counterEl.textContent = `1/${images.length}`;
        counterEl.style.position = "absolute";
        counterEl.style.bottom = "10px";
        counterEl.style.right = "10px";
        counterEl.style.background = "rgba(0, 0, 0, 0.5)";
        counterEl.style.color = "white";
        counterEl.style.padding = "5px 10px";
        counterEl.style.borderRadius = "15px";
        counterEl.style.fontSize = "14px";
        
        if (imgEl && imgEl.parentNode) {
            imgEl.parentNode.appendChild(counterEl);
        }
        
        const updateCounter = () => {
            if (counterEl) counterEl.textContent = `${idx + 1}/${images.length}`;
        };
        
        document.getElementById("next-btn")?.addEventListener("click", () => {
            if (!imgEl) return;
            imgEl.style.opacity = "0";
            setTimeout(() => {
                idx = (idx + 1) % images.length;
                imgEl.src = images[idx];
                updateCounter();
                setTimeout(() => {
                    imgEl.style.opacity = "1";
                }, 50);
            }, 300);
        });
        
        document.getElementById("prev-btn")?.addEventListener("click", () => {
            if (!imgEl) return;
            imgEl.style.opacity = "0";
            setTimeout(() => {
                idx = (idx - 1 + images.length) % images.length;
                imgEl.src = images[idx];
                updateCounter();
                setTimeout(() => {
                    imgEl.style.opacity = "1";
                }, 50);
            }, 300);
        });
        
        document.getElementById("download-btn")?.addEventListener("click", () => {
            if (!imgEl || !imgEl.src) return;
            const a = document.createElement("a");
            a.href = imgEl.src;
            
            // Extract file name from the src
            const fileName = imgEl.src.split('/').pop() || "birthday_image.jpg";
            a.download = fileName;
            
            // Create download animation
            const downloadMsg = document.createElement("div");
            downloadMsg.textContent = "Đang tải...";
            downloadMsg.style.position = "fixed";
            downloadMsg.style.top = "20px";
            downloadMsg.style.left = "50%";
            downloadMsg.style.transform = "translateX(-50%)";
            downloadMsg.style.background = "#00796b";
            downloadMsg.style.color = "white";
            downloadMsg.style.padding = "10px 20px";
            downloadMsg.style.borderRadius = "30px";
            downloadMsg.style.zIndex = "9999";
            document.body.appendChild(downloadMsg);
            
            // Simulate download process
            setTimeout(() => {
                a.click();
                downloadMsg.textContent = "Tải thành công! ✓";
                downloadMsg.style.background = "#388e3c";
                setTimeout(() => {
                    document.body.removeChild(downloadMsg);
                }, 2000);
            }, 500);
        });
        
        // Enable keyboard navigation for slideshow
        document.addEventListener("keydown", (e) => {
            if (!wishesPage || wishesPage.classList.contains("hidden")) return;
            
            if (e.key === "ArrowRight") {
                document.getElementById("next-btn")?.click();
            } else if (e.key === "ArrowLeft") {
                document.getElementById("prev-btn")?.click();
            }
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

    // --- Popup cuối và chuyển trang cuối ---
    const downloadAllBtn = document.getElementById("download-all");
    const finalPopup    = document.getElementById("final-popup");
    const viewFinalBtn  = document.getElementById("view-final");
    const forceViewBtn  = document.getElementById("force-view");
    const lastPage = document.getElementById("last-page");

    downloadAllBtn?.addEventListener("click", () => {
        // URL của hai ảnh cần tải
        const urls = [
          "Image/profile.jpg",
          "Image/special-gift.jpg"
        ];
      
        urls.forEach((url) => {
          const a = document.createElement("a");
          a.href = url;
          // Đặt tên file tương ứng:
          a.download = url.split("/").pop();
          document.body.append(a);
          a.click();
          a.remove();
        });
      
      });      

    //     // Thêm sự kiện lật cho thẻ Mật Mã
    // document.getElementById("code-card").addEventListener("click", function() {
    //     this.querySelector(".card-inner").classList.toggle("flipped");
    // });

    // Add keyboard support for entering the code
    if (answerInput) {
        answerInput.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault(); // Prevent default to avoid form submission
                checkAnswer();
            }
        });
    }
    
    // Close popup when clicking outside
    if (popup) {
        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                popup.classList.add("hidden");
            }
        });
    }
    // ESC key closes popups
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (popup && !popup.classList.contains("hidden")) {
                popup.classList.add("hidden");
            } else if (profileContainer && !profileContainer.classList.contains("hidden")) {
                profileContainer.classList.add("hidden");
                fadeIn(textWishes);
                if (specialGift) specialGift.classList.remove("hidden");
            }
        }
    });

    // Add background particles effect (snow-like)
    function addParticles() {
        const particlesContainer = document.createElement("div");
        particlesContainer.className = "particles-container";
        particlesContainer.style.position = "fixed";
        particlesContainer.style.top = "0";
        particlesContainer.style.left = "0";
        particlesContainer.style.width = "100%";
        particlesContainer.style.height = "100%";
        particlesContainer.style.pointerEvents = "none";
        particlesContainer.style.zIndex = "-1";
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.position = "absolute";
            particle.style.width = `${Math.random() * 6 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(0, 121, 107, ${Math.random() * 0.2 + 0.1})`;
            particle.style.borderRadius = "50%";
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animation = `float ${Math.random() * 10 + 20}s linear infinite`;
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particlesContainer.appendChild(particle);
        }
    }

    // Execute the main functions
    addParticles();
    showCakeThenCode();
    initSlideshow();
    
    // Event bindings
    submitButton?.addEventListener("click", checkAnswer);
    goToTextBtn?.addEventListener("click", () => {
        fadeOut(wishesPage, () => {
            fadeIn(textWishes);
            activateGiftScroll();
        });
    });
    
    // Add loading animation
    window.addEventListener("load", () => {
        document.body.classList.add("loaded");
    });

    // Kick off
    showCakeThenCode();
});
