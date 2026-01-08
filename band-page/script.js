document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');

    // SFX (mockup)
    // const sfxStart = new Audio('path/to/start-sound.mp3');

    // Start Game Interaction
    startBtn.addEventListener('click', () => {
        // sfxStart.play().catch(e => console.log('No audio file'));

        introScreen.style.opacity = '0';
        introScreen.style.transition = 'opacity 0.5s';

        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.animation = 'fadeIn 1s';
        }, 500);
    });

    // Audio Player Logic (Mockup)
    const playBtns = document.querySelectorAll('.play-btn');

    playBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const isPlaying = this.classList.contains('playing');

            // Reset all
            playBtns.forEach(b => {
                b.classList.remove('playing');
                b.style.backgroundColor = 'var(--pastel-blue)';
            });

            if (!isPlaying) {
                this.classList.add('playing');
                this.style.backgroundColor = 'var(--pastel-mint)';
                console.log('Playing track...');
            } else {
                console.log('Paused track...');
            }
        });
    });
    // --- SMART SCHEDULE LOGIC ---
    // DATA SOURCE: Extracted from TimeTree (Updated 2026-01-08)
    // --- SMART SCHEDULE LOGIC ---
    // DATA SOURCE: Manual Entry (Updated 2026-01-08)
    const allSchedules = [
        { date: '2026-01-11', venue: 'Unplugged Lounge (15:00)', status: 'SOLO' },
        { date: '2026-01-16', venue: 'Club FF', status: 'LIVE' },
        { date: '2026-02-08', venue: 'Unplugged Lounge (15:00)', status: 'SOLO' },
        { date: '2026-03-01', venue: 'DREAMSCAPE HALL', status: 'OPEN' } // Kept as future placeholder
    ];

    const scheduleContainer = document.getElementById('dynamic-schedule');
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

    // 1. Filter: Upcoming only (Date >= Today)
    const upcoming = allSchedules.filter(gig => gig.date >= today);

    // 2. Sort: Nearest first
    upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

    // 3. Slice: Take only 3
    const nextThree = upcoming.slice(0, 3);

    // 4. Render
    if (scheduleContainer) {
        scheduleContainer.innerHTML = ''; // Clear loading text

        if (nextThree.length === 0) {
            scheduleContainer.innerHTML = '<li class="gig" style="justify-content:center; border:none;">NO UPCOMING QUESTS...</li>';
        } else {
            nextThree.forEach(gig => {
                const li = document.createElement('li');
                li.className = 'gig';

                // Color logic
                const statusColor = gig.highlight ? 'var(--pastel-sky)' :
                    (gig.status === 'SOLD OUT' ? '#999' : 'var(--pastel-mint)');

                li.innerHTML = `
                    <span class="date">${gig.date.replace(/-/g, '.')}</span>
                    <span class="venue">${gig.venue}</span>
                    <span class="status" style="color: ${statusColor}">${gig.status}</span>
                `;
                scheduleContainer.appendChild(li);
            });
        }
    }
    // --- ITEM SHOP LOGIC ---
    const modal = document.getElementById('shop-modal');
    const modalName = document.getElementById('modal-item-name');
    const modalPrice = document.getElementById('modal-item-price');
    const confirmBtn = document.getElementById('modal-confirm-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const buyBtns = document.querySelectorAll('.item-btn');

    // Open Modal
    buyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const itemElement = btn.closest('.item');
            const name = itemElement.querySelector('h3').innerText;
            const price = itemElement.querySelector('p').innerText;

            modalName.innerText = name;
            modalPrice.innerText = price;

            modal.classList.remove('hidden');
        });
    });

    // Close Modal
    cancelBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Bank Transfer Logic
    confirmBtn.addEventListener('click', () => {
        // 1. Get Price
        const price = modalPrice.innerText;

        // 2. Change Modal Content to show Bank Info
        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = `
            <h2>DEPOSIT INFO</h2>
            <p style="margin-bottom: 20px;">Please transfer <strong>${price}</strong> to:</p>
            
            <div style="background:var(--bg-color); border:2px dashed var(--pastel-sky); padding:10px; margin-bottom:20px;">
                <p style="color:var(--text-color); font-size:0.9rem;">SAFE BANK (안전은행)</p>
                <p style="font-size:1.1rem; color:var(--pastel-sky);">123-456-7890</p>
                <p style="font-size:0.8rem;">Holder: NATASHA (나타샤)</p>
            </div>

            <button onclick="location.reload()" class="start-btn" style="width:100%;">I HAVE DEPOSITED</button>
        `;
    });
});

// Add extra CSS for fade in via JS if needed, or rely on CSS classes
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(styleSheet);
