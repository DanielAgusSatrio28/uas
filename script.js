document.addEventListener('DOMContentLoaded', function() {
    // Data destinasi wisata
    const destinations = {
        'bali': { name: 'Bali - Tanah Lot', basePrice: 250000 },
        'yogya': { name: 'Yogyakarta - Candi Borobudur', basePrice: 200000 },
        'lombok': { name: 'Lombok - Pantai Pink', basePrice: 300000 },
        'rajaampat': { name: 'Raja Ampat - Pulau Wayag', basePrice: 350000 },
        'bromo': { name: 'Bromo - Gunung Bromo', basePrice: 180000 },
        'labuanbajo': { name: 'Labuan Bajo - Pulau Komodo', basePrice: 320000 },
        'bandung': { name: 'Bandung - Kawah Putih', basePrice: 150000 },
        'bogor': { name: 'Bogor - Kebun Raya Bogor', basePrice: 120000 },
        'jogja': { name: 'Jogja - Malioboro', basePrice: 100000 },
        'surabaya': { name: 'Surabaya - Tugu Pahlawan', basePrice: 80000 },
        'medan': { name: 'Medan - Danau Toba', basePrice: 220000 },
        'makassar': { name: 'Makassar - Pantai Losari', basePrice: 130000 },
        'manado': { name: 'Manado - Bunaken', basePrice: 280000 },
        'padang': { name: 'Padang - Jam Gadang', basePrice: 90000 },
        'semarang': { name: 'Semarang - Lawang Sewu', basePrice: 110000 }
    };
// Versi lebih canggih dengan JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const snowContainer = document.createElement('div');
  snowContainer.style.position = 'fixed';
  snowContainer.style.top = '0';
  snowContainer.style.left = '0';
  snowContainer.style.width = '100%';
  snowContainer.style.height = '100%';
  snowContainer.style.pointerEvents = 'none';
  snowContainer.style.zIndex = '1000';
  document.body.appendChild(snowContainer);

  function createSnowFlake() {
    const snowFlake = document.createElement('div');
    snowFlake.innerHTML = '❄';
    snowFlake.style.position = 'absolute';
    snowFlake.style.fontSize = Math.random() * 20 + 10 + 'px';
    snowFlake.style.opacity = Math.random();
    snowFlake.style.left = Math.random() * window.innerWidth + 'px';
    snowFlake.style.top = '-50px';
    snowFlake.style.animation = `fall ${Math.random() * 5 + 5}s linear infinite`;
    
    // Animasi dengan keyframes
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fall {
        to {
          transform: translateY(${window.innerHeight + 50}px) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
    
    snowContainer.appendChild(snowFlake);
    
    // Hapus setelah selesai
    setTimeout(() => {
      snowFlake.remove();
      style.remove();
    }, 10000);
  }

  // Buat salju setiap 100ms
  setInterval(createSnowFlake, 100);
});
    // Multiplier harga paket
    const packageMultipliers = {
        basic: 1.0,
        standard: 1.6,
        premium: 2.4
    };

    // Nama paket
    const packageNames = {
        basic: "Paket Basic",
        standard: "Paket Standard",
        premium: "Paket Premium"
    };

    // Elemen form
    const bookingForm = document.getElementById('bookingFormData');
    const destinationSelect = document.getElementById('destination');
    const packageCards = document.querySelectorAll('.package-card');
    const selectedPackageInput = document.getElementById('selectedPackage');
    const participantsInput = document.getElementById('participants');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const selectedPaymentInput = document.getElementById('selectedPayment');
    const confirmButton = document.getElementById('confirmButton');
    const paymentSection = document.getElementById('paymentSection');
    const thankYouSection = document.getElementById('thankYouSection');
    const bookingFormSection = document.getElementById('bookingForm');
    const newBookingButton = document.getElementById('newBookingButton');
    const bookingDetails = document.getElementById('bookingDetails');

    // Elemen ringkasan
    const summaryName = document.getElementById('summaryName');
    const summaryDate = document.getElementById('summaryDate');
    const summaryDestination = document.getElementById('summaryDestination');
    const summaryParticipants = document.getElementById('summaryParticipants');
    const summaryPackage = document.getElementById('summaryPackage');
    const summaryPrice = document.getElementById('summaryPrice');
    const summaryTotal = document.getElementById('summaryTotal');

    // Validasi form
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const dateError = document.getElementById('dateError');
    const participantsError = document.getElementById('participantsError');
    const destinationError = document.getElementById('destinationError');
    const packageError = document.getElementById('packageError');
    const paymentError = document.getElementById('paymentError');

    // Update harga berdasarkan destinasi
    function updatePrices() {
        const destination = destinationSelect.value;
        if (destination && destinations[destination]) {
            const basePrice = destinations[destination].basePrice;
            
            packageCards.forEach(card => {
                const packageType = card.getAttribute('data-package');
                const priceElement = card.querySelector('.price-amount');
                const calculatedPrice = basePrice * packageMultipliers[packageType];
                priceElement.textContent = calculatedPrice.toLocaleString('id-ID');
            });
        }
    }

    // Pilih destinasi wisata
    destinationSelect.addEventListener('change', function() {
        updatePrices();
        destinationError.style.display = 'none';
        this.classList.remove('invalid');
        updateSummary();
    });

    // Pilih paket wisata
    packageCards.forEach(card => {
        card.addEventListener('click', function() {
            packageCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            const package = this.getAttribute('data-package');
            selectedPackageInput.value = package;
            packageError.style.display = 'none';
            updateSummary();
        });
    });

    // Pilih metode pembayaran
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');
            const paymentMethod = this.getAttribute('data-method');
            selectedPaymentInput.value = paymentMethod;
            paymentError.style.display = 'none';
            confirmButton.classList.remove('hidden');
        });
    });

    // Update ringkasan pemesanan
    function updateSummary() {
        const name = document.getElementById('fullName').value;
        const date = document.getElementById('travelDate').value;
        const participants = participantsInput.value;
        const destination = destinationSelect.value;
        const package = selectedPackageInput.value;

        summaryName.textContent = name || '-';
        summaryDate.textContent = date ? new Date(date).toLocaleDateString('id-ID') : '-';
        summaryParticipants.textContent = participants || '-';
        summaryDestination.textContent = destination ? destinations[destination].name : '-';

        if (package && destination) {
            summaryPackage.textContent = packageNames[package];
            
            const basePrice = destinations[destination].basePrice;
            const packagePrice = basePrice * packageMultipliers[package];
            summaryPrice.textContent = `Rp ${packagePrice.toLocaleString('id-ID')}`;
            
            if (participants) {
                const total = packagePrice * parseInt(participants);
                summaryTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
            }
        } else {
            summaryPackage.textContent = '-';
            summaryPrice.textContent = '-';
            summaryTotal.textContent = 'Rp 0';
        }
    }

    // Event listeners untuk update ringkasan
    document.getElementById('fullName').addEventListener('input', updateSummary);
    document.getElementById('travelDate').addEventListener('change', updateSummary);
    participantsInput.addEventListener('change', updateSummary);

    // Validasi form
    function validateForm() {
        let isValid = true;

        // Validasi nama
        if (!document.getElementById('fullName').value.trim()) {
            nameError.style.display = 'block';
            document.getElementById('fullName').classList.add('invalid');
            isValid = false;
        } else {
            nameError.style.display = 'none';
            document.getElementById('fullName').classList.remove('invalid');
        }

        // Validasi email
        const email = document.getElementById('email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.style.display = 'block';
            document.getElementById('email').classList.add('invalid');
            isValid = false;
        } else {
            emailError.style.display = 'none';
            document.getElementById('email').classList.remove('invalid');
        }

        // Validasi telepon
        if (!document.getElementById('phone').value.trim()) {
            phoneError.style.display = 'block';
            document.getElementById('phone').classList.add('invalid');
            isValid = false;
        } else {
            phoneError.style.display = 'none';
            document.getElementById('phone').classList.remove('invalid');
        }

        // Validasi tanggal
        if (!document.getElementById('travelDate').value) {
            dateError.style.display = 'block';
            document.getElementById('travelDate').classList.add('invalid');
            isValid = false;
        } else {
            dateError.style.display = 'none';
            document.getElementById('travelDate').classList.remove('invalid');
        }

        // Validasi peserta
        if (!participantsInput.value || parseInt(participantsInput.value) < 1) {
            participantsError.style.display = 'block';
            participantsInput.classList.add('invalid');
            isValid = false;
        } else {
            participantsError.style.display = 'none';
            participantsInput.classList.remove('invalid');
        }

        // Validasi destinasi
        if (!destinationSelect.value) {
            destinationError.style.display = 'block';
            destinationSelect.classList.add('invalid');
            isValid = false;
        } else {
            destinationError.style.display = 'none';
            destinationSelect.classList.remove('invalid');
        }

        // Validasi paket
        if (!selectedPackageInput.value) {
            packageError.style.display = 'block';
            isValid = false;
        } else {
            packageError.style.display = 'none';
        }

        return isValid;
    }

    // Submit form pemesanan
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            paymentSection.classList.remove('hidden');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // Konfirmasi pembayaran
    confirmButton.addEventListener('click', function() {
        if (!selectedPaymentInput.value) {
            paymentError.style.display = 'block';
            return;
        }

        // Simpan data pemesanan
        const bookingData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('travelDate').value,
            participants: participantsInput.value,
            destination: destinationSelect.value,
            destinationName: destinations[destinationSelect.value].name,
            package: selectedPackageInput.value,
            packageName: packageNames[selectedPackageInput.value],
            specialRequest: document.getElementById('specialRequest').value,
            paymentMethod: selectedPaymentInput.value,
            basePrice: destinations[destinationSelect.value].basePrice,
            packageMultiplier: packageMultipliers[selectedPackageInput.value],
            totalPrice: destinations[destinationSelect.value].basePrice * 
                      packageMultipliers[selectedPackageInput.value] * 
                      parseInt(participantsInput.value)
        };

        // Tampilkan halaman terima kasih
        bookingFormSection.classList.add('hidden');
        thankYouSection.classList.remove('hidden');

        // Tampilkan detail pemesanan
        const formattedDate = new Date(bookingData.date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        bookingDetails.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto; text-align: left;">
                <h3 style="color: var(--primary); margin-bottom: 15px;">Detail Pemesanan</h3>
                <p><strong>Kode Booking:</strong> WISATA-${Math.floor(100000 + Math.random() * 900000)}</p>
                <p><strong>Nama Pemesan:</strong> ${bookingData.name}</p>
                <p><strong>Destinasi Wisata:</strong> ${bookingData.destinationName}</p>
                <p><strong>Tanggal Wisata:</strong> ${formattedDate}</p>
                <p><strong>Jumlah Peserta:</strong> ${bookingData.participants} orang</p>
                <p><strong>Paket Wisata:</strong> ${bookingData.packageName}</p>
                <p><strong>Total Pembayaran:</strong> Rp ${bookingData.totalPrice.toLocaleString('id-ID')}</p>
                <p><strong>Metode Pembayaran:</strong> ${getPaymentMethodName(bookingData.paymentMethod)}</p>
                ${bookingData.specialRequest ? `<p><strong>Permintaan Khusus:</strong> ${bookingData.specialRequest}</p>` : ''}
            </div>
        `;
    });

    // Fungsi untuk mendapatkan nama metode pembayaran
    function getPaymentMethodName(method) {
        const methods = {
            bca: 'Bank BCA',
            mandiri: 'Bank Mandiri',
            bri: 'Bank BRI',
            gopay: 'Gopay',
            ovo: 'OVO'
        };
        return methods[method] || method;
    }

    // Pesan tiket baru
    newBookingButton.addEventListener('click', function() {
        // Reset form
        bookingForm.reset();
        packageCards.forEach(c => c.classList.remove('selected'));
        paymentMethods.forEach(m => m.classList.remove('selected'));
        selectedPackageInput.value = '';
        selectedPaymentInput.value = '';
        confirmButton.classList.add('hidden');
        paymentSection.classList.add('hidden');
        
        // Reset ringkasan
        summaryName.textContent = '-';
        summaryDate.textContent = '-';
        summaryDestination.textContent = '-';
        summaryParticipants.textContent = '-';
        summaryPackage.textContent = '-';
        summaryPrice.textContent = '-';
        summaryTotal.textContent = 'Rp 0';
        
        // Tampilkan form lagi
        thankYouSection.classList.add('hidden');
        bookingFormSection.classList.remove('hidden');
        
        // Scroll ke atas
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Set tanggal minimal untuk input date (hari ini)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('travelDate').setAttribute('min', today);

    // Inisialisasi harga
    updatePrices();
});