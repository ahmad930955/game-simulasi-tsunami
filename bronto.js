// ================== GLOBAL CONTROL ==================
let gameRunning = false;
let paused = false;
let gameOver = false;

let allIntervals = [];

// ================== GEMPA ==================
let gempaSudah = false;
let gempaAktif = false;   // 🔥 TAMBAHAN
let gempaDurasi = 0;      // 🔥 TAMBAHAN

// ================== NYAWA ==================
let nyawa = 3;
let sudahKena = false;

let nyawa1 = document.getElementById("nyawa1");
let nyawa2 = document.getElementById("nyawa2");
let nyawa3 = document.getElementById("nyawa3");

// ================== UI ==================
let waktuHasil = document.getElementById("hidden");
let sisanyawa = document.getElementById("sisanyawa");

if (sisanyawa) {
    sisanyawa.classList.add("hidden");
}

// ================== MENU ==================
let menuKalah = document.getElementById("kalahya");
let btnKalahLagi = document.querySelector(".kalahlagi");
let btnKalahKeluar = document.querySelector(".kalahkeluar");
let btnbesi = document.querySelector(".besi");

let menuMenang = document.getElementById("menangya");
let btnMenangLagi = document.querySelector(".menanglagi");
let btnMenangKeluar = document.querySelector(".menangkeluar");

// ================== UPDATE NYAWA ==================
function updateNyawa() {

    let target;

    if (nyawa === 2) target = nyawa3;
    else if (nyawa === 1) target = nyawa2;
    else if (nyawa <= 0) target = nyawa1;

    if (target) {
        target.classList.add("denyut");

        setTimeout(() => {
            target.style.display = "none";
            target.classList.remove("denyut");

            if (nyawa <= 0 && !gameOver) {
                hentikanGame();
            }

        }, 1200);
    }
}

// ================== STATE P ==================
let pState = {
    p1: { aktif: false, sisa: 0 },
    p2: { aktif: false, sisa: 0 },
    p3: { aktif: false, sisa: 0 },
    p4: { aktif: false, sisa: 0 },
    p5: { aktif: false, sisa: 0 }
};

let pSudahJalan = {
    p1: false,
    p2: false,
    p3: false,
    p4: false,
    p5: false
};

let waktuMuncul = {
    p1: 115,
    p2: 100,
    p3: 85,
    p4: 70,
    p5: 55
};

// ================== LOAD AWAL ==================
window.onload = function () {

    function munculkanObjek(id) {
        if (!gameRunning || paused || gameOver) return;

        let obj = document.getElementById(id);
        if (!obj) return;

        obj.style.left = "100%";

        if (id === "meja") obj.classList.remove("meja-gerak");
        else if (id === "kursi") obj.classList.remove("kursi-gerak");

        void obj.offsetWidth;

        if (paused || gameOver) return;

        if (id === "meja") obj.classList.add("meja-gerak");
        else if (id === "kursi") obj.classList.add("kursi-gerak");
    }

    let i1 = setInterval(() => munculkanObjek("meja"), 15000);
    let i2 = setInterval(() => munculkanObjek("kursi"), 20000);

    allIntervals.push(i1, i2);
};

// ================== ANIMASI P ==================
function animasiP(id) {
    if (!gameRunning || gameOver) return;

    let p = document.getElementById(id);
    if (!p) return;

    pState[id].aktif = true;
    pState[id].sisa = 10;

    p.style.display = "block";
    p.style.transition = "none";
    p.style.left = "-120%";

    void p.offsetWidth;

    p.style.transition = "left 1s linear";
    p.style.left = "0%";
}

// ================== LOOP P ==================
let pLoop = setInterval(() => {

    if (!gameRunning || paused || gameOver) return;

    Object.keys(pState).forEach(id => {

        if (!pState[id].aktif) return;

        pState[id].sisa--;

        if (pState[id].sisa <= 0) {
            let p = document.getElementById(id);
            if (!p) return;

            p.style.transition = "left 2s linear";
            p.style.left = "-120%";

            setTimeout(() => {
                p.style.display = "none";
                pState[id].aktif = false;
            }, 2000);
        }
    });

}, 1000);

allIntervals.push(pLoop);

// ================== TIMER ==================
let sisaWaktu = 120;
let timerElement = document.getElementById("timer");

let endTriggered = false;

let hitungMundur = setInterval(function () {

    if (!gameRunning || paused || gameOver) return;

    sisaWaktu--;

    let menit = Math.floor(sisaWaktu / 60);
    let detik = sisaWaktu % 60;
    if (detik < 10) detik = "0" + detik;

    timerElement.innerHTML = menit + ":" + detik;

    Object.keys(waktuMuncul).forEach(id => {
        if (!pSudahJalan[id] && sisaWaktu <= waktuMuncul[id]) {
            pSudahJalan[id] = true;
            animasiP(id);
        }
        // ================== PETA MUNCUL DI 01:39 ==================
    if (sisaWaktu === 99) {

    let peta = document.querySelector(".peta");

    if (peta) {
        peta.style.animationPlayState = "running";
    }
}
    });

    // ================== GEMPA DI 01:50 ==================
    if (sisaWaktu === 110 && !gempaSudah) {
        gempaSudah = true;
        gempaAktif = true;
        gempaDurasi = 10;

        let bg = document.querySelector(".backgroundmove");
        if (bg) bg.classList.add("gempa");
    }

    // ================== DURASI GEMPA ==================
    if (gempaAktif) {
        gempaDurasi--;

        if (gempaDurasi <= 0) {
            gempaAktif = false;

            let bg = document.querySelector(".backgroundmove");
            if (bg) bg.classList.remove("gempa");
        }
    }

    // ================== 00:00 WIN ==================
    if (sisaWaktu <= 0 && !endTriggered) {

        endTriggered = true;

        gameRunning = false;
        paused = true;
        gameOver = true;

        stopAll();

        document.body.classList.add("paused");
        bgMusic.pause();

        if (sisanyawa) {
            sisanyawa.classList.add("hidden");
        }

        if (menuMenang) {
            menuMenang.classList.remove("hidden");
        }
    }

}, 1000);

allIntervals.push(hitungMundur);

// ================== PAUSE ==================
let tombol = document.getElementById("btnExit");
let menu = document.getElementById("menu");
let btnLanjut = document.querySelector(".menulanjut");
let btnKeluar = document.querySelector(".menukeluar");
let bgMusic = document.getElementById("bgMusic");

function pauseGame() {
    paused = true;
    document.body.classList.add("paused");
    bgMusic.pause();
}

function lanjutGame() {
    if (gameOver) return;

    paused = false;
    document.body.classList.remove("paused");
    bgMusic.play().catch(err => console.log(err));
}

// ================== STOP ==================
function stopAll() {
    allIntervals.forEach(i => clearInterval(i));
}

// ================== KALAH ==================
function hentikanGame() {

    if (gameOver) return;

    gameOver = true;
    gameRunning = false;
    paused = true;

    stopAll();

    document.body.classList.add("paused");
    bgMusic.pause();

    let waktuDicapai = 120 - sisaWaktu;

    if (waktuHasil) {
        waktuHasil.style.display = "block";
        waktuHasil.innerHTML = "( " + waktuDicapai + "s )";
    }

    if (menuKalah) {
        menuKalah.classList.remove("hidden");
    }
}

// ================== BUTTON ==================
if (btnKalahLagi) btnKalahLagi.onclick = () => location.reload();
if (btnKalahKeluar) btnKalahKeluar.onclick = () => window.location.href = "index.html";

if (btnMenangLagi) btnMenangLagi.onclick = () => location.reload();
if (btnMenangKeluar) btnMenangKeluar.onclick = () => window.location.href = "index.html";

// ================== MENU ==================
tombol.onclick = function () {
    if (gameOver) return;
    menu.classList.remove("hidden");
    pauseGame();
};

btnLanjut.onclick = function () {
    menu.classList.add("hidden");
    lanjutGame();
};

btnKeluar.onclick = function () {
    window.location.href = "index.html";
};

// ================== START ==================
let tombolMulai = document.getElementById("mulai");
let layarAwal = document.getElementById("ombak1");
let player = document.querySelector(".sprite-box");

tombolMulai.onclick = function () {

    tombolMulai.style.display = "none";
    layarAwal.classList.add("geser");

    setTimeout(() => {

        layarAwal.style.display = "none";

        gameRunning = true;
        paused = false;
        gameOver = false;

        document.body.classList.remove("paused");

        player.classList.add("berjalan");
        bgMusic.play().catch(err => console.log(err));

    }, 1000);
};

// ================== LOMPAT ==================
const MAX_LOMPAT = 4;
let lompatCounter = 0;
let posisiY = 0;
let lompatInterval;

const TINGGI_LOMPAT = 700;
let jumpSound = new Audio("hehehe.mp3");

document.addEventListener("click", function () {

    if (!gameRunning || paused || gameOver) return;
    if (lompatCounter >= MAX_LOMPAT) return;

    jumpSound.currentTime = 0;
    jumpSound.play().catch(err => console.log(err));

    lompatCounter++;
    posisiY -= TINGGI_LOMPAT;

    player.style.transition = "top 0.2s linear";
    player.style.top = `calc(44% + ${posisiY}px)`;

    player.classList.remove("berjalan");

    let cek = setInterval(() => {
        if (posisiY === 0) {
            player.classList.add("berjalan");
            clearInterval(cek);
        }
    }, 30);

    if (!lompatInterval) {
        lompatInterval = setInterval(() => {
            if (posisiY < 0) {
                posisiY += 25;
                if (posisiY > 0) posisiY = 0;
                player.style.top = `calc(44% + ${posisiY}px)`;
            } else {
                lompatCounter = 0;
                clearInterval(lompatInterval);
                lompatInterval = null;
            }
        }, 30);
    }
});

// ================== TABRAKAN ==================
function cekTabrakan(sprite, meja, buffer = 120) {
    const s = sprite.getBoundingClientRect();
    const m = meja.getBoundingClientRect();

    return !(
        s.right - buffer < m.left ||
        s.left + buffer > m.right ||
        s.bottom - buffer < m.top ||
        s.top + buffer > m.bottom
    );
}

let mejaElem = document.getElementById("meja");

let tabrakanLoop = setInterval(() => {

    if (!gameRunning || paused || gameOver) return;

    if (cekTabrakan(player, mejaElem, 120)) {

        if (!sudahKena) {
            sudahKena = true;

            player.classList.add("terkena");

            setTimeout(() => {
                player.classList.remove("terkena");

                nyawa--;
                updateNyawa();

            }, 500);

            setTimeout(() => {
                sudahKena = false;
            }, 1000);
        }
    }

}, 30);

allIntervals.push(tabrakanLoop);
// ================== AUTO SCALE ==================
function scaleGame() {

    const game = document.querySelector(".game-container");

    if (!game) return;

    const baseWidth = 1920;
    const baseHeight = 1080;

    const scaleX = window.innerWidth / baseWidth;
    const scaleY = window.innerHeight / baseHeight;

    const scale = Math.min(scaleX, scaleY);

    game.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", scaleGame);

scaleGame();
