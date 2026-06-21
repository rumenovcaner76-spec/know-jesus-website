/* =====================================================
   Know Jesus – script.js
   ===================================================== */

/* ===================== QUIZ DATA ===================== */
const questions = [
    {
        q: "İsa nerede doğdu?",
        options: ["Kudüs", "Beytüllahim", "Nasıra", "Celile"],
        correct: 1,
        verse: "Peygamberlik: Mika 5:2 | Gerçekleşme: Matta 2:1",
        feedback: "İsa, Yahuda'nın Beytüllahim kentinde doğdu — peygamberlerin önceden haber verdiği gibi!"
    },
    {
        q: "İsa'nın annesi kimdir?",
        options: ["Marta", "Meryem Ana", "Elişeba", "Rahel"],
        correct: 1,
        verse: "Luka 1:27-31",
        feedback: "İsa'nın annesi bakire Meryem'dir. Melek Cebrail ona müjdeyi getirdi."
    },
    {
        q: "İsa kaç yaşında öğretmenlik yapmaya başladı?",
        options: ["25", "30", "33", "40"],
        correct: 1,
        verse: "Luka 3:23",
        feedback: "İsa yaklaşık 30 yaşında vaftiz oldu ve kamuya açık görevine başladı."
    },
    {
        q: "İsa'yı vaftiz eden kişi kimdir?",
        options: ["Petrus", "Yahya (Vaftizci)", "Andreas", "Filip"],
        correct: 1,
        verse: "Matta 3:13-17",
        feedback: "İsa, Şeria Nehri'nde Vaftizci Yahya tarafından vaftiz edildi."
    },
    {
        q: "İsa'nın gerçekleştirdiği ilk mucize neydi?",
        options: ["Suları bölmek", "Suyu şaraba çevirmek", "Kör adamı iyileştirmek", "Fırtınayı durdurmak"],
        correct: 1,
        verse: "Yuhanna 2:1-11",
        feedback: "Kana'daki düğünde suyu şaraba çevirdi — bu, ilk mucizenin gerçekleştiği yerdi."
    },
    {
        q: "Dağdaki Vaaz'da İsa kaç Kutluluk (Beatitude) açıkladı?",
        options: ["6", "8", "10", "12"],
        correct: 1,
        verse: "Matta 5:3-10",
        feedback: "Sekiz Kutluluk, Tanrı'nın Egemenliği'ndeki yaşamın temel ilkelerini ortaya koyar."
    },
    {
        q: "İsa havarilerinden hangisi onu ele verdi?",
        options: ["Petrus", "Yuhanna", "Yahuda İskariyot", "Tomas"],
        correct: 2,
        verse: "Matta 26:14-16",
        feedback: "Yahuda İskariyot, İsa'yı 30 gümüş karşılığında baş kâhinlere teslim etti."
    },
    {
        q: "İsa'nın çarmıha gerildiği yer neresidir?",
        options: ["Getsemani", "Beytanya", "Golgota (Kafatası Tepesi)", "Zeytin Dağı"],
        correct: 2,
        verse: "Matta 27:33 | Yuhanna 19:17",
        feedback: "Golgota, 'Kafatası yeri' anlamına gelir; İsa orada çarmıha gerildi."
    },
    {
        q: "İsa ölümünden kaç gün sonra dirildi?",
        options: ["1", "2", "3", "7"],
        correct: 2,
        verse: "Matta 16:21 | 1. Korintliler 15:4",
        feedback: "İsa üçüncü günde dirilerek ölüme galip geldi — bu, Hristiyan inancının temelidir!"
    },
    {
        q: "İsa dirilişten sonra kaç gün daha yeryüzünde kaldı?",
        options: ["3", "7", "40", "50"],
        correct: 2,
        verse: "Elçilerin İşleri 1:3",
        feedback: "İsa 40 gün boyunca öğrencilerine göründü, Tanrı'nın Egemenliği'ni anlattı, sonra göğe yükseldi."
    },
    {
        q: "İsa'nın doğumunu müjdeleyen melek kimdir?",
        options: ["Mikail", "Cebrail", "Rafael", "Uriel"],
        correct: 1,
        verse: "Luka 1:26-28",
        feedback: "Melek Cebrail, Meryem Ana'ya İsa'nın doğacağını müjdeledi."
    },
    {
        q: "\"Yol, gerçek ve yaşam benim\" sözleri hangi kitaptadır?",
        options: ["Matta 5:3", "Markos 1:1", "Yuhanna 14:6", "Luka 2:11"],
        correct: 2,
        verse: "Yuhanna 14:6",
        feedback: "İsa bu güçlü ifadeyle kendisinin Baba'ya giden tek yol olduğunu açıkladı."
    }
];

/* ===================== QUIZ STATE ===================== */
let currentQuestion = 0;
let score = 0;
let answered = false;

/* ===================== SECTION NAVIGATION ===================== */
function showSection(sec) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(sec).classList.add('active');

    document.querySelectorAll('.nav button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(sec)) {
            btn.classList.add('active');
        }
    });

    // Scroll to top of page on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===================== QUIZ LOGIC ===================== */
function startGame() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('results-screen').style.display = 'none';
    loadQuestion();
}

function loadQuestion() {
    answered = false;
    const q = questions[currentQuestion];
    document.getElementById('current-q').textContent = currentQuestion + 1;
    document.getElementById('score').textContent = score;
    document.getElementById('question-text').textContent = q.q;
    document.getElementById('verse-hint').textContent = '📖 ' + q.verse;
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-btn').style.display = 'none';

    // Progress bar
    document.getElementById('progress').style.width = ((currentQuestion / questions.length) * 100) + '%';

    // Render options
    const optionsEl = document.getElementById('options');
    optionsEl.innerHTML = '';
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(i, btn);
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(index, el) {
    if (answered) return;
    answered = true;

    const q = questions[currentQuestion];
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(btn => btn.style.pointerEvents = 'none');

    if (index === q.correct) {
        el.classList.add('correct');
        score++;
        document.getElementById('score').textContent = score;
        document.getElementById('feedback').innerHTML = '✅ ' + q.feedback;
        document.getElementById('feedback').style.color = '#155724';
    } else {
        el.classList.add('wrong');
        allOptions[q.correct].classList.add('correct');
        document.getElementById('feedback').innerHTML = '❌ Doğru cevap: <strong>' + q.options[q.correct] + '</strong><br>' + q.feedback;
        document.getElementById('feedback').style.color = '#721c24';
    }

    document.getElementById('next-btn').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        showResults();
    } else {
        loadQuestion();
    }
}

function showResults() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('results-screen').style.display = 'block';
    document.getElementById('progress').style.width = '100%';

    const total = questions.length;
    const pct = Math.round((score / total) * 100);

    document.getElementById('final-score').textContent = score + ' / ' + total + ' (' + pct + '%)';

    let emoji, title, message;
    if (pct >= 90) {
        emoji = '🏆'; title = 'Mükemmel! İman Şampiyonu!';
        message = 'Harika bilgi! İsa Mesih\'i gerçekten tanıyorsunuz. İmanınız başkalarına da ışık olsun!';
    } else if (pct >= 70) {
        emoji = '🌟'; title = 'Harika Sonuç!';
        message = 'Çok iyi! Kutsal Kitap bilginiz güçleniyor. Biraz daha çalışın, şampiyon olacaksınız!';
    } else if (pct >= 50) {
        emoji = '📖'; title = 'İyi Başlangıç!';
        message = 'Güzel bir başlangıç! İncil\'i daha çok okuyarak bilginizi artırabilirsiniz.';
    } else {
        emoji = '🙏'; title = 'Keşfetmeye Devam Et!';
        message = 'Her yolculuk bir adımla başlar. Kutsal Kitap\'ı okuyun ve İsa\'yı kişisel olarak tanıyın!';
    }

    document.getElementById('result-emoji').textContent = emoji;
    document.getElementById('result-title').textContent = title;
    document.getElementById('result-message').textContent = message;
}

function restartGame() {
    startGame();
}

function shareResults() {
    const scoreEl = document.getElementById('final-score').textContent;
    const text = '✝️ Know Jesus Quiz\'inden ' + scoreEl + ' aldım! Sen de dene: iman yolculuğuna başla!';
    if (navigator.share) {
        navigator.share({ title: 'Know Jesus', text: text });
    } else {
        navigator.clipboard.writeText(text).then(() => alert('Metin panoya kopyalandı! Paylaşabilirsiniz.\n\n' + text));
    }
}

/* ===================== PRAYERS ===================== */
function readPrayer(el, fullText) {
    alert('🙏 Dua:\n\n' + fullText + '\n\nTanrı seni duyuyor!');
}

function saveNote() {
    const note = document.getElementById('note-area').value.trim();
    if (note) {
        localStorage.setItem('know-jesus-prayer-note', note);
        document.getElementById('note-saved').textContent = '✅ Not kaydedildi!';
        setTimeout(() => { document.getElementById('note-saved').textContent = ''; }, 3000);
    } else {
        document.getElementById('note-saved').textContent = '⚠️ Lütfen bir şeyler yaz.';
    }
}

/* ===================== DARK MODE ===================== */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const btn = document.querySelector('.toggle-btn');
    btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('know-jesus-dark', document.body.classList.contains('dark-mode'));
}

/* ===================== MINI GAME ===================== */
let canvas, ctx;
let gameRunning = false;
let gameScore = 0;
let highScore = 0;
let animFrameId = null;

let player = { x: 100, y: 300, width: 40, height: 50, velY: 0, jumping: false };
const GRAVITY = 0.85;
const JUMP_FORCE = -18;
const GROUND_Y = 300;

let obstacles = [];
let faithItems = [];
let frame = 0;
let speed = 6;

function startMiniGame() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // Reset state
    if (animFrameId) cancelAnimationFrame(animFrameId);
    gameRunning = true;
    gameScore = 0;
    frame = 0;
    speed = 6;
    obstacles = [];
    faithItems = [];
    player.y = GROUND_Y;
    player.velY = 0;
    player.jumping = false;

    document.getElementById('game-score').textContent = '0';
    animFrameId = requestAnimationFrame(gameLoop);
}

function endMiniGame() {
    gameRunning = false;
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (gameScore > highScore) {
        highScore = gameScore;
        document.getElementById('high-score').textContent = highScore;
    }
    if (ctx) {
        ctx.fillStyle = 'rgba(30,42,68,0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 36px Poppins, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Oyun Bitti! Skor: ' + gameScore, canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = '22px Poppins, sans-serif';
        ctx.fillText('Başlat butonuna bas ve tekrar dene ✝️', canvas.width / 2, canvas.height / 2 + 28);
    }
}

function gameLoop() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, 350);
    sky.addColorStop(0, '#a8d8ea');
    sky.addColorStop(1, '#87CEEB');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, canvas.width, 350);

    // Clouds (decorative)
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    drawCloud(ctx, (150 - frame * 0.5) % canvas.width, 60, 50);
    drawCloud(ctx, (450 - frame * 0.8) % canvas.width, 90, 70);
    drawCloud(ctx, (700 - frame * 0.6) % canvas.width, 45, 40);

    // Ground
    ctx.fillStyle = '#5a8a2f';
    ctx.fillRect(0, 350, canvas.width, 50);
    ctx.fillStyle = '#3d6b1e';
    ctx.fillRect(0, 350, canvas.width, 8);

    // ---- Player ----
    drawPlayer();

    // Apply gravity
    player.velY += GRAVITY;
    player.y += player.velY;
    if (player.y >= GROUND_Y) {
        player.y = GROUND_Y;
        player.velY = 0;
        player.jumping = false;
    }

    frame++;

    // Increase speed gradually
    if (frame % 300 === 0 && speed < 14) speed += 0.5;

    // Passive score (time survived)
    if (frame % 10 === 0) {
        gameScore++;
        document.getElementById('game-score').textContent = gameScore;
    }

    // Spawn obstacles
    const spawnRate = Math.max(40, 80 - Math.floor(frame / 300) * 5);
    if (frame % spawnRate === 0) {
        obstacles.push({ x: canvas.width, y: GROUND_Y + 10, width: 28, height: 40 });
    }

    // Spawn faith items (crosses / stars)
    if (frame % 55 === 0) {
        faithItems.push({
            x: canvas.width,
            y: 200 + Math.random() * 100,
            width: 28,
            height: 28,
            collected: false
        });
    }

    // Draw & update obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const o = obstacles[i];
        o.x -= speed;
        drawObstacle(o);
        if (o.x < -60) { obstacles.splice(i, 1); continue; }

        // Collision
        if (rectOverlap(player, o)) {
            endMiniGame();
            alert('Çarpıştın! ✝️ İman yolculuğuna devam et!\nSkorun: ' + gameScore);
            return;
        }
    }

    // Draw & update faith items
    for (let i = faithItems.length - 1; i >= 0; i--) {
        const f = faithItems[i];
        f.x -= speed;
        drawCross(f.x, f.y, f.width);
        if (f.x < -60) { faithItems.splice(i, 1); continue; }

        // Collect
        if (rectOverlap(player, f)) {
            gameScore += 10;
            document.getElementById('game-score').textContent = gameScore;
            faithItems.splice(i, 1);
            // Flash effect text
            showFloatingText('+10', player.x + 20, player.y - 20);
        }
    }

    animFrameId = requestAnimationFrame(gameLoop);
}

// ---- Drawing helpers ----

function drawPlayer() {
    const px = player.x, py = player.y;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.ellipse(px + 20, 355, 22, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body (robe)
    ctx.fillStyle = '#e67e22';
    ctx.beginPath();
    ctx.roundRect(px, py + 18, 40, 32, 6);
    ctx.fill();

    // Head
    ctx.fillStyle = '#f5cba7';
    ctx.beginPath();
    ctx.arc(px + 20, py + 12, 14, 0, Math.PI * 2);
    ctx.fill();

    // Hair
    ctx.fillStyle = '#6b3a1f';
    ctx.beginPath();
    ctx.arc(px + 20, py + 6, 14, Math.PI, 0);
    ctx.fill();

    // Cross on robe
    ctx.fillStyle = '#fff';
    ctx.fillRect(px + 17, py + 22, 6, 14);
    ctx.fillRect(px + 12, py + 26, 16, 6);

    // Legs (animated)
    const legSwing = Math.sin(frame * 0.3) * 5;
    ctx.fillStyle = '#c0392b';
    ctx.fillRect(px + 8, py + 48, 10, 12 + legSwing);
    ctx.fillRect(px + 22, py + 48, 10, 12 - legSwing);
}

function drawObstacle(o) {
    // Rock/boulder
    ctx.fillStyle = '#7f8c8d';
    ctx.beginPath();
    ctx.roundRect(o.x, o.y, o.width, o.height, 8);
    ctx.fill();
    ctx.fillStyle = '#95a5a6';
    ctx.beginPath();
    ctx.roundRect(o.x + 4, o.y + 4, o.width - 10, o.height / 3, 4);
    ctx.fill();
}

function drawCross(x, y, size) {
    ctx.fillStyle = '#f1c40f';
    ctx.shadowColor = '#f39c12';
    ctx.shadowBlur = 8;
    // Vertical bar
    ctx.fillRect(x + size * 0.38, y, size * 0.24, size);
    // Horizontal bar
    ctx.fillRect(x, y + size * 0.2, size, size * 0.24);
    ctx.shadowBlur = 0;
}

function drawCloud(ctx, x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
    ctx.arc(x + size * 0.4, y - size * 0.1, size * 0.35, 0, Math.PI * 2);
    ctx.arc(x + size * 0.8, y, size * 0.4, 0, Math.PI * 2);
    ctx.fill();
}

// Simple floating text (drawn once)
const floatingTexts = [];
function showFloatingText(text, x, y) {
    floatingTexts.push({ text, x, y, alpha: 1, vy: -1.5 });
}

// Render floating texts in loop (called after other draws)
function renderFloatingTexts() {
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
        const ft = floatingTexts[i];
        ctx.globalAlpha = ft.alpha;
        ctx.fillStyle = '#f1c40f';
        ctx.font = 'bold 20px Poppins, sans-serif';
        ctx.fillText(ft.text, ft.x, ft.y);
        ft.y += ft.vy;
        ft.alpha -= 0.03;
        if (ft.alpha <= 0) floatingTexts.splice(i, 1);
    }
    ctx.globalAlpha = 1;
}

function rectOverlap(a, b) {
    return (
        a.x + a.width  > b.x + 4 &&
        a.x            < b.x + b.width - 4 &&
        a.y + a.height > b.y + 4 &&
        a.y            < b.y + b.height - 4
    );
}

// CanvasRenderingContext2D.roundRect polyfill for older browsers
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y,   x + w, y + h, r);
        this.arcTo(x + w, y + h, x,   y + h, r);
        this.arcTo(x,   y + h, x,   y,     r);
        this.arcTo(x,   y,     x + w, y,   r);
        this.closePath();
        return this;
    };
}

/* ===================== KEYBOARD & TOUCH CONTROLS ===================== */
document.addEventListener('keydown', (e) => {
    if ((e.key === ' ' || e.key === 'ArrowUp') && !player.jumping && gameRunning) {
        e.preventDefault();
        player.velY = JUMP_FORCE;
        player.jumping = true;
    }
});

// Touch jump for mobile
document.addEventListener('touchstart', (e) => {
    if (!player.jumping && gameRunning) {
        player.velY = JUMP_FORCE;
        player.jumping = true;
    }
});

/* ===================== INIT ===================== */
window.onload = () => {
    // Restore saved dark mode
    if (localStorage.getItem('know-jesus-dark') === 'true') {
        document.body.classList.add('dark-mode');
        document.querySelector('.toggle-btn').textContent = '☀️';
    }

    // Restore saved prayer note
    const savedNote = localStorage.getItem('know-jesus-prayer-note');
    if (savedNote) {
        const noteArea = document.getElementById('note-area');
        if (noteArea) noteArea.value = savedNote;
    }

    console.log('%cKnow Jesus ✝️ – Hazır!', 'color:#e67e22;font-weight:bold;font-size:16px');
};
