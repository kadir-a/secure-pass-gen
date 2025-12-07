// Proje: Güvenli Şifre Oluşturucu
// Dosya: Mantık ve Algoritma (JS)

// DOM Elementlerini (HTML kutucuklarını) değişkene atıyoruz
const sonucKutusu = document.getElementById('password');
const uzunlukKutusu = document.getElementById('length');
const buyukHarfKutusu = document.getElementById('uppercase');
const sayiKutusu = document.getElementById('numbers');
const sembolKutusu = document.getElementById('symbols');

const randomFunc = {
    lower: rastgeleKucukHarf,
    upper: rastgeleBuyukHarf,
    number: rastgeleSayi,
    symbol: rastgeleSembol
};

// BUTONA BASINCA ÇALIŞAN ANA FONKSİYON
function sifreUret() {
    const uzunluk = +uzunlukKutusu.value;
    const kucukVarMi = true; 
    const buyukVarMi = buyukHarfKutusu.checked;
    const sayiVarMi = sayiKutusu.checked;
    const sembolVarMi = sembolKutusu.checked;

    sonucKutusu.innerText = algoritmayiCalistir(kucukVarMi, buyukVarMi, sayiVarMi, sembolVarMi, uzunluk);
}

// ŞİFRE ÜRETME MANTIĞI (ALGORİTMA)
function algoritmayiCalistir(lower, upper, number, symbol, length) {
    let uretilenSifre = '';
    const cesitSayisi = lower + upper + number + symbol;
    const secilenTurler = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if(cesitSayisi === 0) return '';

    for(let i = 0; i < length; i += cesitSayisi) {
        secilenTurler.forEach(type => {
            const funcName = Object.keys(type)[0];
            uretilenSifre += randomFunc[funcName]();
        });
    }

    const finalPassword = uretilenSifre.slice(0, length);
    return finalPassword;
}

// --- YARDIMCI FONKSİYONLAR ---
function rastgeleKucukHarf() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function rastgeleBuyukHarf() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function rastgeleSayi() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function rastgeleSembol() {
    const semboller = '!@#$%^&*(){}[]=<>/,.';
    return semboller[Math.floor(Math.random() * semboller.length)];
}

function kopyala() {
    const password = sonucKutusu.innerText;
    if(!password || password === "Şifre Bekleniyor...") return;
    navigator.clipboard.writeText(password);
    alert('Şifre Kopyalandı!');
}
