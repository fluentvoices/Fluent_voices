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

    // --- Bagian Countdown Timer (Versi Revisi) ---
    // Atur tanggal akhir promo (Tengah malam tanggal 20 Juli, masuk ke 21 Juli)
    const countdownEndDate = new Date("2025-07-21T00:00:00").getTime();

    const timerSpan = document.getElementById("countdown-timer");
    const expiredTextSpan = document.getElementById("promo-expired-text");
    const countdownContainer = document.getElementById("hero-countdown");

    if (countdownContainer) {
        const countdownInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = countdownEndDate - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Update elemen-elemen di dalam timer
                document.getElementById("days").innerText = days.toString().padStart(2, '0');
                document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
                document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
                document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
            } else {
                // Jika waktu habis
                clearInterval(countdownInterval);
                if (timerSpan) timerSpan.style.display = 'none';
                if (expiredTextSpan) expiredTextSpan.style.display = 'inline';
            }
        }, 1000);
    }


    // --- Bagian Pengiriman Formulir (DIHAPUS) ---
    // Tidak diperlukan lagi karena Netlify akan menanganinya secara otomatis.


    // --- LOGIKA DROPDOWN HARGA (SOLUSI FINAL OVERFLOW & Z-INDEX) ---
    const dropdownContainers = document.querySelectorAll('.dropdown-container');
    const formPackageSelect = document.getElementById('paket');

    dropdownContainers.forEach(container => {
        const toggleButton = container.querySelector('.dropdown-toggle');
        const dropdownMenu = container.querySelector('.dropdown-menu');
        const dropdownItems = container.querySelectorAll('.dropdown-item');
        const priceCard = container.closest('.price-card'); 

        // Saat tombol "Pilih Paket" diklik
        toggleButton.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const isAlreadyActive = dropdownMenu.classList.contains('show');

            // 1. Tutup semua dropdown lain dan hapus class 'dropdown-active'
            document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
                openMenu.classList.remove('show');
                openMenu.closest('.price-card').classList.remove('dropdown-active');
            });
            
            // 2. Jika menu yang diklik tadi belum aktif, tampilkan dan aktifkan kartunya
            if (!isAlreadyActive) {
                dropdownMenu.classList.add('show');
                priceCard.classList.add('dropdown-active'); // Terapkan class final
            }
        });

        // Saat salah satu item paket diklik
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                const selectedValue = item.getAttribute('data-value');
                if (formPackageSelect && selectedValue) {
                    formPackageSelect.value = selectedValue;
                }
                dropdownMenu.classList.remove('show');
                priceCard.classList.remove('dropdown-active'); // Nonaktifkan kembali kartu
            });
        });
    });

    // Menutup dropdown jika klik di luar area menu
    window.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
            openMenu.classList.remove('show');
            openMenu.closest('.price-card').classList.remove('dropdown-active');
        });
    });
});