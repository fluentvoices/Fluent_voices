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

    // --- Bagian Pengiriman Formulir ---
    const registrationForm = document.getElementById('main-form');
    const formStatus = document.getElementById('form-status');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const submitButton = registrationForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Mengirim...';
            formStatus.textContent = '';
            formStatus.style.color = '#333';

            const formData = new FormData(registrationForm);
            const data = Object.fromEntries(formData.entries());

            fetch('https://backend-fluentvoices.onrender.com/daftar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(result => {
                console.log('Sukses:', result);
                formStatus.textContent = result.message;
                formStatus.style.color = 'green';
                registrationForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                formStatus.textContent = 'Terjadi kesalahan saat mengirim. Silakan coba lagi.';
                formStatus.style.color = 'red';
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Kirim Pendaftaran';
            });
        });
    }

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