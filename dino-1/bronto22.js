document.addEventListener("DOMContentLoaded", function () {

    let gameRunning = false;

    let tombolMulai = document.getElementById("mulai");
    let layarAwal = document.getElementById("ombak1");
    
    let tombolBuku = document.getElementById("tandatsunami");
    let buku = document.getElementById("buku");

    let krakatau = document.getElementById("krakatau");
    let subduksi = document.getElementById("subduksi");
    let tandagempa = document.getElementById("tandagempa");

    // ✅ TAMBAHAN PANDUAN
    let tombolPanduan = document.getElementById("bukupanduan");
    let panduan = document.getElementById("panduan");

    // ✅ TAMBAHAN MISI (GLOW)
    let misi = document.getElementById("misi");
    if (misi) {
        misi.classList.add("misi-glow");
    }

    // ✅ TAMBAHAN RAMBU
    let rambu = document.getElementById("rambu");
    let tingkatbencana = document.getElementById("tingkatbencana");

    let bgMusic = document.getElementById("bgMusic");

    document.body.classList.add("paused");

    // ======================
    // CEK SESSION
    // ======================
    if (sessionStorage.getItem("sudahMain") === "true") {
        layarAwal.style.display = "none";
        tombolMulai.style.display = "none";
        tampilkanGame();
    }

    // ======================
    // TOMBOL MULAI
    // ======================
    tombolMulai.onclick = function () {

        sessionStorage.setItem("sudahMain", "true");

        tombolMulai.style.display = "none";
        layarAwal.classList.add("geser");

        setTimeout(() => {
            layarAwal.style.display = "none";
            tampilkanGame();
        }, 1000);
    };

    function tampilkanGame() {
        let elems = [
            "#analog",
            ".out2",
            ".sprite-box",
            "#meja",
            "#kursi",
            ".backgroundmove"
        ];

        elems.forEach(sel => {
            let el = document.querySelector(sel);
            if (el) {
                el.style.display = "block";
                el.style.pointerEvents = "auto";
            }
        });

        gameRunning = true;
        document.body.classList.remove("paused");
        bgMusic.play().catch(err => console.log(err));
    }

    // ======================
    // BUKA BUKU (tandatsunami)
    // ======================
    tombolBuku.onclick = function (e) {
        e.stopPropagation();

        buku.classList.remove("hidden");
        panduan.classList.add("hidden");
        tingkatbencana.classList.add("hidden");

        gameRunning = false;
        document.body.classList.add("paused");
        bgMusic.pause();
    };

    // ======================
    // BUKA PANDUAN (bukupanduan)
    // ======================
    if (tombolPanduan && panduan) {
        tombolPanduan.onclick = function (e) {
            e.stopPropagation();

            panduan.classList.remove("hidden");
            buku.classList.add("hidden");
            tingkatbencana.classList.add("hidden");

            gameRunning = false;
            document.body.classList.add("paused");
            bgMusic.pause();
        };
    }

    // ======================
    // BUKA TINGKAT BENCANA (rambu)
    // ======================
    if (rambu && tingkatbencana) {
        rambu.onclick = function (e) {
            e.stopPropagation();

            tingkatbencana.classList.remove("hidden");
            buku.classList.add("hidden");
            panduan.classList.add("hidden");
        };
    }

    // ======================
    // KLIK LUAR → TUTUP SEMUA
    // ======================
    document.addEventListener("mousedown", function (e) {

        if (
            !buku.classList.contains("hidden") ||
            !panduan.classList.contains("hidden") ||
            !tingkatbencana.classList.contains("hidden")
        ) {

            let klikDiDalam =
                buku.contains(e.target) ||
                panduan.contains(e.target) ||
                tingkatbencana.contains(e.target) ||
                krakatau.contains(e.target) ||
                subduksi.contains(e.target) ||
                tandagempa.contains(e.target) ||
                (tombolPanduan && tombolPanduan.contains(e.target)) ||
                (rambu && rambu.contains(e.target));

            if (!klikDiDalam) {
                buku.classList.add("hidden");
                panduan.classList.add("hidden");
                tingkatbencana.classList.add("hidden");

                gameRunning = true;
                document.body.classList.remove("paused");
                bgMusic.play().catch(err => console.log(err));
            }
        }

    }, true);

    // ======================
    // TOGGLE KRAKATAU
    // ======================
    let isKrakatau = false;

    krakatau.onclick = function (e) {
        e.stopPropagation();

        krakatau.src = isKrakatau ? "krakatau.png" : "tandagempa.png";
        isKrakatau = !isKrakatau;
    };

    // ======================
    // SUBDUKSI & GEMPA
    // ======================
    subduksi.onclick = function (e) {
        e.stopPropagation();
    };

    tandagempa.onclick = function (e) {
        e.stopPropagation();
    };

});