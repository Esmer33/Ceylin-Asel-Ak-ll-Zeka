const input = document.getElementById("input");
const messages = document.getElementById("messages");

// ✅ BURAYA OpenRouter API key'ini yaz (gizli tut!)
const API_KEY = "BURAYA_API_KEYINI_YAZ";
const MODEL_ID = "openai/gpt-3.5-turbo"; // Alternatif: mistralai/mixtral-8x7b

async function gonder(metin) {
  if (!metin.trim()) return;

  messages.innerHTML += `<p><strong>Sen:</strong> ${metin}</p>`;
  input.value = "";

  try {
    const yanit = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL_ID,
        messages: [{ role: "user", content: metin }]
      })
    });

    const veri = await yanit.json();
    const cevap = veri.choices?.[0]?.message?.content || "Bir yanıt alınamadı.";
    messages.innerHTML += `<p><strong>Asistan:</strong> ${cevap}</p>`;
    messages.scrollTop = messages.scrollHeight;
  } catch (hata) {
    messages.innerHTML += `<p><strong>Asistan:</strong> Hata oluştu: ${hata.message}</p>`;
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    gonder(input.value);
  }
});