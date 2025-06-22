let komutlar = {};

fetch("komutlar_200000_birlesik.json")
  .then((response) => response.json())
  .then((data) => (komutlar = data));

const input = document.getElementById("input");
const messages = document.getElementById("messages");

function gonder(giris) {
  if (!giris.trim()) return;

  let cevap = komutlar[giris.toLowerCase()];
  if (!cevap) {
    const anahtarlar = Object.keys(komutlar);
    const rastgele = anahtarlar.sort(() => 0.5 - Math.random()).slice(0, 3);
    cevap = `Bunu bilmiyorum. Şunları deneyebilirsin:\n- ${rastgele.join(
      "\n- "
    )}`;
  }

  messages.innerHTML += `<p><strong>Sen:</strong> ${giris}</p>`;
  messages.innerHTML += `<p><strong>Asistan:</strong> ${cevap}</p>`;
  messages.scrollTop = messages.scrollHeight;
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    gonder(input.value);
    input.value = "";
  }
});