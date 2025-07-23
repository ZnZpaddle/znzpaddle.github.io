// Inject Chatbot HTML
document.body.insertAdjacentHTML('beforeend', `
  <button id="chatToggle">💬</button>
  <div id="chatbox">
    <h2>ZnZ Paddle 🏄‍♂️</h2>
    <div id="messages"></div>
    <div id="inputArea">
      <input type="text" id="userInput" placeholder="Ask about rentals..." />
      <button id="sendBtn">Send</button>
    </div>
  </div>
`);

const chatbox = document.getElementById('chatbox');
const chatToggle = document.getElementById('chatToggle');
const messagesDiv = document.getElementById('messages');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');

// Chat styles
const style = document.createElement('style');
style.textContent = `
#chatToggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #0077cc;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 28px;
  cursor: pointer;
  z-index: 1000;
}
#chatbox {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 350px;
  max-height: 500px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  display: none;
  flex-direction: column;
  z-index: 999;
}
#chatbox h2 {
  background: #0077cc;
  color: white;
  margin: 0;
  padding: 10px;
  font-size: 18px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
#messages {
  padding: 10px;
  overflow-y: auto;
  flex-grow: 1;
  height: 250px;
}
.bot, .user {
  padding: 8px 12px;
  margin: 8px 0;
  border-radius: 6px;
  max-width: 80%;
}
.bot { background: #e6f2ff; text-align: left; }
.user { background: #d1ffd6; text-align: right; margin-left: auto; }
#inputArea {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
}
#userInput {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
#sendBtn {
  padding: 8px;
  background: #0077cc;
  color: white;
  border: none;
  border-radius: 6px;
  margin-left: 10px;
  cursor: pointer;
}
`;
document.head.appendChild(style);

// Toggle Chat
chatToggle.onclick = () => {
  chatbox.style.display = chatbox.style.display === 'flex' ? 'none' : 'flex';
};

// Chat logic
const botReplies = (input) => {
  input = input.toLowerCase();

  if (input.includes("price") || input.includes("cost")) {
    return "Paddleboard rentals are $35 for 2 hours or $60 all day.";
  } else if (input.includes("book") || input.includes("rent")) {
    return \`
      <form action="https://formspree.io/f/your-form-id" method="POST">
        <label>Date: <input type="date" name="rental-date" required></label><br><br>
        <label>Name: <input type="text" name="name" required></label><br><br>
        <label>Email: <input type="email" name="email" required></label><br><br>
        <button type="submit">Confirm Booking</button>
      </form>
    \`;
  } else if (input.includes("location")) {
    return "We’re located at False Creek, Vancouver.";
  } else if (input.includes("email")) {
    return "You can reach us at znzpaddle@gmail.com.";
  } else if (input.includes("hours") || input.includes("open")) {
    return "We're open from 9am to 7pm daily!";
  } else {
    return "I can help with rentals, pricing, and booking info!";
  }
};

sendBtn.onclick = () => {
  const input = userInput.value.trim();
  if (!input) return;
  messagesDiv.innerHTML += `<div class="user">${input}</div>`;
  const response = botReplies(input);
  messagesDiv.innerHTML += `<div class="bot">${response}</div>`;
  userInput.value = '';
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};
