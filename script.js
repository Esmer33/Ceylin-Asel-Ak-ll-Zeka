const input = document.getElementById("input");
const messages = document.getElementById("messages");

// ✅ BURAYA OpenRouter API key'ini yaz (gizli tut!)
const API_KEY = "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";
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
