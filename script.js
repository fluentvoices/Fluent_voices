document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const navLinks = mobileNavMenu.querySelectorAll('a');

    // Fungsi untuk membuka/menutup menu
    function toggleMenu() {
        mobileNavMenu.classList.toggle('active');
    }

    // Event listener untuk tombol hamburger
    hamburgerBtn.addEventListener('click', toggleMenu);

    // Event listener untuk setiap link di menu mobile
    // Ini agar menu otomatis tertutup saat salah satu link di-klik
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNavMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});

// ... (kode hamburger menu yang sudah ada)

// --- Kode untuk Menangani Pengiriman Formulir ---
document.addEventListener('DOMContentLoaded', function() {
    // ... (kode hamburger yang sudah ada bisa tetap di dalam event listener ini)

    const registrationForm = document.getElementById('main-form');
    const formStatus = document.getElementById('form-status');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            // 1. Mencegah perilaku default form (yang akan me-reload halaman)
            event.preventDefault();

            // 2. Mengubah teks tombol dan status
            const submitButton = registrationForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Mengirim...';
            formStatus.textContent = '';
            formStatus.style.color = '#333';

            // 3. Mengambil data dari form
            const formData = new FormData(registrationForm);
            const data = Object.fromEntries(formData.entries());

            // 4. Mengirim data ke server backend menggunakan Fetch API
            fetch('https://fluent-voice-backend.onrender.com/daftar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(result => {
                // 5. Menangani respons dari server
                console.log('Sukses:', result);
                formStatus.textContent = result.message; // Tampilkan pesan sukses dari server
                formStatus.style.color = 'green';
                registrationForm.reset(); // Kosongkan formulir setelah berhasil
            })
            .catch(error => {
                // 6. Menangani jika terjadi error
                console.error('Error:', error);
                formStatus.textContent = 'Terjadi kesalahan saat mengirim. Silakan coba lagi.';
                formStatus.style.color = 'red';
            })
            .finally(() => {
                // 7. Mengembalikan tombol ke keadaan semula
                submitButton.disabled = false;
                submitButton.textContent = 'Kirim Pendaftaran';
            });
        });
    }
});