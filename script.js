function checkName() {
    const input = document.querySelector('.input-field');
    const errorMessage = document.getElementById('error-message');
    const name = input.value.trim().toLowerCase();

    if (name === 'giorgia') {
        showMainPage();
    } else {
        errorMessage.textContent = 'Chi cazzo sei?? Vattene!';
        errorMessage.style.display = 'block';
        errorMessage.style.animation = 'none';
        errorMessage.offsetHeight;
        errorMessage.style.animation = 'shake 0.5s ease-in-out';
        input.value = '';
        input.placeholder = "Magari hai sbagliato, reinseriscilo!";
    }
}

function showMainPage() {
    document.body.innerHTML = `
        <div class="welcome-container">
            <h1>CIAO GIORGI</h1>
            <p>Ora arriva la parte bella, premi uno dei bottoni!</p>
            <div class="heart-animation">💖</div>
        </div>
    `;

    const style = document.createElement('style');
    style.id = 'welcome-inline-style';
    style.textContent = `
        .heart-animation { font-size: 50px; animation: pulse 1.5s infinite; }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }
    `;
    const oldStyle = document.getElementById('welcome-inline-style');
    if (oldStyle) oldStyle.remove();
    document.head.appendChild(style);

    setTimeout(createRandomButtons, 800);
}

function createRandomButtons() {
    document.querySelectorAll('.floating-button').forEach(b => b.remove());

    const visited = JSON.parse(sessionStorage.getItem('visitedButtons') || '[]');
    const indices = [0, 1, 2, 3];

    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const mapping = {
        [indices[0]]: 'amore',
        [indices[1]]: 'ricordi',
        [indices[2]]: 'musica'
    };

    for (let i = 0; i < 4; i++) {
        const button = document.createElement('button');
        button.className = 'floating-button';
        button.dataset.id = i;

        if (visited.includes(i)) {
            button.style.backgroundColor = 'green';
            button.textContent = '✅ Già visto';
        } else {
            button.textContent = 'Clicca qui!';
        }

        const x = Math.random() * (window.innerWidth - 180);
        const y = Math.random() * (window.innerHeight - 120);
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;

        if (mapping.hasOwnProperty(i)) {
            const page = mapping[i];
            button.addEventListener('click', () => {
                const visitedNow = JSON.parse(sessionStorage.getItem('visitedButtons') || '[]');
                if (!visitedNow.includes(i)) {
                    visitedNow.push(i);
                    sessionStorage.setItem('visitedButtons', JSON.stringify(visitedNow));
                }

                button.style.backgroundColor = 'green';
                button.textContent = '✅ Già visto';

                setTimeout(() => {
                    if (page === 'amore') showAmorePage();
                    if (page === 'ricordi') showRicordiPage();
                    if (page === 'musica') showMusicaPage();
                }, 200);
            });
        } else {
            button.addEventListener('click', () => {
                const visitedNow = JSON.parse(sessionStorage.getItem('visitedButtons') || '[]');
                if (!visitedNow.includes(i)) {
                    visitedNow.push(i);
                    sessionStorage.setItem('visitedButtons', JSON.stringify(visitedNow));
                }

                button.style.backgroundColor = 'green';
                button.textContent = '✅ Già visto';
                setTimeout(() => {
                    window.location.href = 'corpo.html';
                }, 200);
            });
        }

        document.body.appendChild(button);
    }
}


function showAmorePage() {
    document.body.innerHTML = `
        <button class="back-button" onclick="showMainPage()">← Torna indietro</button>
        <div class="page" id="amore-page">
            <h1>Cara Giorgia, sei la mia vita!</h1>
            <div class="card">
                <p>Queste sono alcune cose che non mi stancherò mai di dirti:.</p>
                <ul>
                    <li>💌 1. Ti amo e ti amerò per sempre!</li>
                    <li>🌅 2. Ti penso sempre e mai smetterò di farlo.</li>
                    <li>🎁 3. Sei mia e io sono tuo!!.</li>
                </ul>
            </div>
            <div class="card">
                <p>Ti amo Giorgia, felici 4 mesi insieme!!!</p>
                <blockquote>"Il mio posto preferito è vicino a te."</blockquote>
            </div>
        </div>
    `;
}

function showRicordiPage() {
    document.body.innerHTML = `
        <button class="back-button" onclick="showMainPage()">← Torna indietro</button>
        <div class="page" id="ricordi-page">
            <h1>I nostri ricordi</h1>
            <div class="card">
                <p>ECCO ALCUNE DELLE NOSTRE FOTO (AVREI POTUTO METTERNE ALTRE 1000 MA MI LIMITO A 3):</p>
                <ol>
                    <li>BACETTO IN BIBLIOTECA.</li>
                    <li>IL GIORNO IN CUI HO FATTO SCIOPERO E SONO VENUTO A PRENDERTI A PIEDI (MI PARE).</li>
                    <li>IL TUO 18ESIMO COMPLEANNO!!</li>
                </ol>
            </div>
            <div class="card">
                <p>Galleria (clicca per ingrandire):</p>
                <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
                    <img src="biblioteca.jpg" width="160" style="border-radius:10px;">
                    <img src="linguette.jpg" width="160" style="border-radius:10px;">
                    <img src="mestrecentro.jpg" width="160" style="border-radius:10px;">
                </div>
            </div>
        </div>
    `;
}

function showMusicaPage() {
    document.body.innerHTML = `
        <button class="back-button" onclick="showMainPage()">← Torna indietro</button>
        <div class="page" id="musica-page">
            <h1>Le nostre canzoni</h1>
            <div class="card">
                <p>Queste sono le canzoni che più ci rappresentano!! ti amo.</p>
                <div style="display:flex;gap:12px;flex-direction:column;align-items:center;">
                    <iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/2ML7vSeIZEmOCOiLUmz7Sv?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    <iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/5enxwA8aAbwZbf5qCHORXi?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </div>
            </div>
        </div>
    `;
}
