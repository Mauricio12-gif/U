import {
  db,
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  updateDoc
} from "./firebase.js";

// --- CONFIGURATION ---
const ADMIN_NAME = "Mauricio";
const ADMIN_PASSWORD = "love"; // Set your admin password here

// --- APP STATE ---
let currentUser = null;
let isAdmin = false;
let activeChatId = null;
let messagesUnsubscribe = null;
let inboxUnsubscribe = null;

// Restore saved login session automatically
window.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("app_user");
  if (savedUser) {
    currentUser = savedUser;
    isAdmin = currentUser.toLowerCase() === ADMIN_NAME.toLowerCase();
    initApp();
  }

  // Allow pressing "Enter" in the message box to send
  const msgInput = document.getElementById("messageInput");
  if (msgInput) {
    msgInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") window.sendMessage();
    });
  }
});

// --- 1. LOGIN FUNCTION ---
window.login = async function () {
  const nameInput = document.getElementById("visitorName");
  const pwdInput = document.getElementById("password");
  const errorEl = document.getElementById("error");

  const name = nameInput.value.trim();
  const pwd = pwdInput.value.trim();

  errorEl.textContent = "";

  if (!name) {
    errorEl.textContent = "Please enter your name.";
    return;
  }

  // Check if logging in as Admin
  if (name.toLowerCase() === ADMIN_NAME.toLowerCase()) {
    if (pwd !== ADMIN_PASSWORD) {
      errorEl.textContent = "Incorrect password for Mauricio.";
      return;
    }
    isAdmin = true;
  } else {
    isAdmin = false;
  }

  currentUser = name;
  localStorage.setItem("app_user", currentUser);
  initApp();
};

// --- 2. LOGOUT FUNCTION ---
window.logout = function () {
  localStorage.removeItem("app_user");
  if (messagesUnsubscribe) messagesUnsubscribe();
  if (inboxUnsubscribe) inboxUnsubscribe();
  location.reload();
};

// --- 3. INIT APPLICATION ---
function initApp() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("mainPage").classList.remove("hidden");
  document.getElementById("welcome").textContent = `Welcome ${currentUser} ❤️`;

  if (isAdmin) {
    loadAdminInbox();
  } else {
    // Visitor Mode: Hide sidebar inbox, open private chat with Mauricio directly
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.style.display = "none";

    const chatId = `chat_${currentUser.toLowerCase().replace(/\s+/g, '_')}`;
    ensureChatExists(chatId, currentUser);
    openChat(chatId, ADMIN_NAME);
  }
}

// Ensure private chat document exists in Firestore
async function ensureChatExists(chatId, visitorName) {
  const chatRef = doc(db, "chats", chatId);
  const chatSnap = await getDoc(chatRef);

  if (!chatSnap.exists()) {
    await setDoc(chatRef, {
      visitorName: visitorName,
      lastMessage: "Conversation started",
      lastUpdated: serverTimestamp()
    });
  }
}

// --- 4. ADMIN INBOX (REALTIME) ---
function loadAdminInbox() {
  const chatsQuery = query(collection(db, "chats"), orderBy("lastUpdated", "desc"));

  inboxUnsubscribe = onSnapshot(chatsQuery, (snapshot) => {
    const chatList = document.getElementById("chatList");
    chatList.innerHTML = "";

    if (snapshot.empty) {
      chatList.innerHTML = "<p style='padding:15px; color:#888;'>No conversations yet.</p>";
      return;
    }

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const chatId = docSnap.id;

      const item = document.createElement("div");
      item.className = "chat-item";
      item.innerHTML = `
        <strong>${data.visitorName}</strong>
        <div style="font-size: 12px; color: #777; margin-top: 4px;">${data.lastMessage || ''}</div>
      `;
      item.onclick = () => openChat(chatId, data.visitorName);
      chatList.appendChild(item);
    });
  });
}

// --- 5. OPEN CHAT ROOM ---
function openChat(chatId, headerTitle) {
  activeChatId = chatId;
  
  const chatHeader = document.getElementById("chatHeader");
  if (chatHeader) {
    chatHeader.innerHTML = `<h3>${headerTitle}</h3>`;
  }

  if (messagesUnsubscribe) messagesUnsubscribe();

  const msgsQuery = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("timestamp", "asc")
  );

  // Real-time listener for incoming messages
  messagesUnsubscribe = onSnapshot(msgsQuery, (snapshot) => {
    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = "";

    snapshot.forEach((docSnap) => {
      const msg = docSnap.data();
      const isSent = msg.sender === currentUser;

      const msgDiv = document.createElement("div");
      msgDiv.className = `message ${isSent ? "sent" : "received"}`;
      msgDiv.textContent = msg.text;

      messagesDiv.appendChild(msgDiv);
    });

    // Auto-scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}

// --- 6. SEND MESSAGE FUNCTION ---
window.sendMessage = async function () {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();

  if (!text || !activeChatId) return;

  input.value = "";

  await addDoc(collection(db, "chats", activeChatId, "messages"), {
    text: text,
    sender: currentUser,
    timestamp: serverTimestamp()
  });

  await updateDoc(doc(db, "chats", activeChatId), {
    lastMessage: `${currentUser}: ${text}`,
    lastUpdated: serverTimestamp()
  });
};
      
