const chatForm = document.getElementById("chatForm");
const chatBox = document.getElementById("chatBox");
const errors = document.getElementById("errors");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");

const chatData = {
  "chats": [
    {
      "question": "Bagaimana cara membeli tiket?",
      "answer": "Pilih film => klik 'Beli Tiket' => pilih bioskop, tanggal, jam, kursi => checkout pembayaran.",
      "keywords": ["beli", "pesan", "booking", "tiket"]
    },
    {
      "question": "Bagaimana cara menggunakan voucher?",
      "answer": "Masukkan kode voucher di halaman checkout. Jika valid, total harga akan terpotong.",
      "keywords": ["voucher", "diskon", "promo"]
    },
    {
      "question": "Apakah saya bisa refund tiket?",
      "answer": "Mohon maaf, tiket yang sudah dibeli tidak dapat direfund.",
      "keywords": ["refund", "kembalikan", "uang", "batal"]
    },
    {
      "question": "Bagaimana cara melihat riwayat pembelian?",
      "answer": "Klik menu 'Riwayat' di navigasi. Semua tiket yang Anda pesan akan tampil di sana.",
      "keywords": ["riwayat", "history", "pembelian", "pesanan"]
    },
    {
      "question": "Berapa harga tiket?",
      "answer": "Harga tiket standar Rp 50.000 per kursi. Promo tertentu bisa berbeda.",
      "keywords": ["harga", "biaya", "bayar", "tiket"]
    },
    {
      "question": "Bagaimana cara memilih kursi?",
      "answer": "Setelah pilih film & jadwal, Anda akan diarahkan ke halaman denah kursi. Klik kursi yang masih tersedia.",
      "keywords": ["kursi", "seat", "tempat duduk"]
    }
  ]
};

function addMessage(user, text, isBot = false, withButton = false) {
  let msgDiv = document.createElement("div");
  msgDiv.className = isBot ? "chat-msg chat-bot" : "chat-msg chat-user";
  msgDiv.innerHTML = `<strong>${user}:</strong> ${text}`;

  if (withButton) {
    let btn = document.createElement("a");
    btn.href = "#";
    btn.innerText = "Hubungi CS";
    btn.className = "faq-btn";
    btn.style.display = "block";
    btn.style.marginTop = "6px";
    msgDiv.appendChild(btn);
  }

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
  let typingDiv = document.createElement("div");
  typingDiv.className = "chat-msg chat-bot typing";
  typingDiv.innerHTML = "<span></span><span></span><span></span>";
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  return typingDiv;
}

function botReply(userText) {
  let reply = null;
  const lower = userText.toLowerCase();

  if (/halo|hai|hi|hallo|hei/i.test(lower)) {
    let typing = showTyping();
    setTimeout(() => {
      typing.remove();
      addMessage("Bot", "Halo! Ada yang bisa saya bantu?", true);
    }, 800);
    return;
  }

  for (let item of chatData.chats) {
    if (item.keywords.some(kw => lower.includes(kw))) {
      reply = item.answer;
      break;
    }
  }

  let typing = showTyping();
  setTimeout(() => {
    typing.remove();
    if (reply) {
      addMessage("Bot", reply, true);
    } else {
      addMessage(
        "Bot",
        "Maaf, saya tidak mengerti pertanyaan Anda. Silakan hubungi Customer Service langsung.",
        true,
        true
      );
    }
  }, 1000);
}

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let username = usernameInput.value.trim() || "Anda";
  let message = messageInput.value.trim();

  if (!message) {
    errors.innerHTML = "Message cannot be empty";
    return;
  }

  addMessage(username, message, false);
  errors.innerHTML = "";
  messageInput.value = "";

  setTimeout(() => botReply(message), 600);
});

document.getElementById("fontSlider").addEventListener("input", function (e) {
  chatBox.style.fontSize = e.target.value + "px";
});

document.getElementById("themeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark");
});

function showFAQOptions() {
  addMessage("Bot", "Halo! Pilih pertanyaan umum berikut atau ketik pertanyaan Anda:", true);
  chatData.chats.forEach((item, idx) => {
    let btn = document.createElement("button");
    btn.className = "faq-btn";
    btn.innerText = item.question;
    btn.dataset.index = idx;

    let wrapper = document.createElement("div");
    wrapper.className = "chat-msg chat-bot";
    wrapper.appendChild(btn);
    chatBox.appendChild(wrapper);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatBox.addEventListener("click", function (e) {
  if (e.target.classList.contains("faq-btn") && !e.target.href) {
    const idx = e.target.dataset.index;
    const q = chatData.chats[idx].question;
    const a = chatData.chats[idx].answer;

    addMessage("Anda", q, false);
    setTimeout(() => addMessage("Bot", a, true), 500);
  }
});

showFAQOptions();
