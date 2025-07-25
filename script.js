document.addEventListener('DOMContentLoaded', function() {
    // --- Bagian Menu Hamburger ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const navLinks = mobileNavMenu.querySelectorAll('a');

    function toggleMenu() {
        mobileNavMenu.classList.toggle('active');
    }

    hamburgerBtn.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNavMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- Bagian Countdown Timer & Promo ---
    
    const KODE_PROMO_AKTIF = 'GASKENFLUENT';
    const countdownEndDate = new Date("2025-07-21T00:00:00").getTime();

    const countdownContainer = document.getElementById("hero-countdown");

    if (countdownContainer) {
        const countdownInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = countdownEndDate - now;

            if (distance > 0) {
                // **** PERUBAHAN DI SINI ****
                // Tampilkan kontainer karena promo masih aktif
                countdownContainer.style.display = 'inline-block';

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById("days").innerText = days.toString().padStart(2, '0');
                document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
                document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
                document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
            } else {
                // Jika waktu habis, cukup hentikan interval. Elemen sudah tersembunyi.
                clearInterval(countdownInterval);
            }
        }, 1000);
    }
    
    // LOGIKA VALIDASI PROMO
    const registrationForm = document.getElementById('main-form');
    const formStatus = document.getElementById('form-status');
    const promoCodeInput = document.getElementById('kode_promo');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            const kodeYangDimasukkan = promoCodeInput.value.toUpperCase();
            const waktuSekarang = new Date().getTime();

            if (kodeYangDimasukkan === KODE_PROMO_AKTIF && waktuSekarang > countdownEndDate) {
                event.preventDefault(); 
                if (formStatus) {
                    formStatus.textContent = `Maaf, kode promo "${KODE_PROMO_AKTIF}" sudah tidak berlaku.`;
                    formStatus.style.color = 'red';
                }
            } else {
                if (formStatus) {
                    formStatus.textContent = '';
                }
            }
        });
    }

    // --- LOGIKA DROPDOWN HARGA ---
    const dropdownContainers = document.querySelectorAll('.dropdown-container');
    const formPackageSelect = document.getElementById('paket');

    dropdownContainers.forEach(container => {
        const toggleButton = container.querySelector('.dropdown-toggle');
        const dropdownMenu = container.querySelector('.dropdown-menu');
        const dropdownItems = container.querySelectorAll('.dropdown-item');
        const priceCard = container.closest('.price-card'); 

        toggleButton.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const isAlreadyActive = dropdownMenu.classList.contains('show');

            document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
                openMenu.classList.remove('show');
                openMenu.closest('.price-card').classList.remove('dropdown-active');
            });
            
            if (!isAlreadyActive) {
                dropdownMenu.classList.add('show');
                priceCard.classList.add('dropdown-active');
            }
        });

        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                const selectedValue = item.getAttribute('data-value');
                if (formPackageSelect && selectedValue) {
                    formPackageSelect.value = selectedValue;
                }
                dropdownMenu.classList.remove('show');
                priceCard.classList.remove('dropdown-active');
            });
        });
    });

    window.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
            openMenu.classList.remove('show');
            openMenu.closest('.price-card').classList.remove('dropdown-active');
        });
    });
});