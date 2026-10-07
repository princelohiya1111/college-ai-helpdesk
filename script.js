/* =====================================================
   AI COLLEGE HELPDESK
   Frontend-only JavaScript
   No backend / API required
===================================================== */


/* ================= HELPER FUNCTIONS ================= */

const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];


/* ================= DEMO DATA ================= */

const notices = [

  {
    title: "Mid-Semester Examination Schedule Released",

    desc:
      "The mid-semester examination timetable is now available for students.",

    date: "Today",

    type: "Exam",

    body:
      "The mid-semester examination schedule has been released. Students are advised to check the official timetable and arrive at the examination venue at least 15 minutes before the scheduled time."
  },

  {
    title: "Library Hours Extended During Exams",

    desc:
      "The central library will remain open until 9:00 PM during the examination period.",

    date: "Yesterday",

    type: "Library",

    body:
      "Extended library hours are available during the examination period. Students can use the reading areas and reference sections until 9:00 PM."
  },

  {
    title: "Semester Fee Payment Reminder",

    desc:
      "Students are requested to complete their semester fee payment before the due date.",

    date: "2 days ago",

    type: "Fees",

    body:
      "Please complete your semester fee payment before the published deadline to avoid late-payment charges."
  },

  {
    title: "Campus Placement Drive — Registration Open",

    desc:
      "Registration is open for the upcoming placement and internship drive.",

    date: "4 days ago",

    type: "Placement",

    body:
      "Eligible students can register for the upcoming placement drive through the college placement cell. Bring your updated resume for the registration process."
  },

  {
    title: "Attendance Shortage List Published",

    desc:
      "Students with attendance below the required threshold should contact their department.",

    date: "6 days ago",

    type: "Academic",

    body:
      "The latest attendance shortage list has been published. Students who have questions about their attendance should contact their department office."
  }

];


const documents = [

  {
    name: "Academic Calendar 2026–27",
    type: "PDF",
    size: "1.2 MB",
    icon: "▤"
  },

  {
    name: "Student Handbook",
    type: "PDF",
    size: "3.8 MB",
    icon: "▥"
  },

  {
    name: "Examination Guidelines",
    type: "PDF",
    size: "860 KB",
    icon: "✓"
  },

  {
    name: "Fee Structure",
    type: "PDF",
    size: "540 KB",
    icon: "₹"
  },

  {
    name: "Attendance Policy",
    type: "PDF",
    size: "420 KB",
    icon: "◉"
  },

  {
    name: "Library Rules & Timings",
    type: "PDF",
    size: "310 KB",
    icon: "▤"
  }

];


const quick = [

  {
    title: "Exams & Schedule",
    desc: "Timetables, dates and exam info",
    icon: "📅",
    color: "#eaf0ff",
    text: "#315bea",
    q: "When do semester exams start?"
  },

  {
    title: "Fees & Payments",
    desc: "Fees, deadlines and payment help",
    icon: "₹",
    color: "#fff3dc",
    text: "#e5a321",
    q: "How can I pay my semester fees?"
  },

  {
    title: "Library",
    desc: "Timings, rules and resources",
    icon: "▤",
    color: "#eee9ff",
    text: "#7955df",
    q: "What are the library timings?"
  },

  {
    title: "Attendance",
    desc: "Check rules and attendance info",
    icon: "✓",
    color: "#e3f8ee",
    text: "#1da86d",
    q: "How can I check my attendance?"
  },

  {
    title: "Documents",
    desc: "Forms, policies and guidelines",
    icon: "▥",
    color: "#ffe9ee",
    text: "#dd5872",
    q: "Where can I find academic documents?"
  }

];


/* ================= AI DEMO ANSWERS ================= */

const answers = [

  {
    keys: [
      "exam",
      "exams",
      "timetable",
      "semester"
    ],

    answer:
      "The semester examination timetable is available in the Notices section. For this demo, the latest schedule has been marked as released today. Open Notices → Mid-Semester Examination Schedule for more details."
  },

  {
    keys: [
      "library",
      "timing",
      "timings"
    ],

    answer:
      "The library is open Monday–Saturday. During the examination period, extended hours are available until 9:00 PM. Check the Library notice for the latest timing."
  },

  {
    keys: [
      "fee",
      "fees",
      "payment",
      "pay"
    ],

    answer:
      "You can use the college's student fee portal to complete semester fee payments. Keep your student ID and payment details ready. The demo Documents section also contains the Fee Structure."
  },

  {
    keys: [
      "attendance",
      "absent"
    ],

    answer:
      "Attendance information can be checked through the student academic portal. If you believe your attendance is incorrect, contact your department office with your course details."
  },

  {
    keys: [
      "document",
      "documents",
      "form",
      "handbook"
    ],

    answer:
      "You can find common academic resources in the Documents section, including the Student Handbook, Academic Calendar, Examination Guidelines, Fee Structure and Attendance Policy."
  },

  {
    keys: [
      "placement",
      "internship",
      "job"
    ],

    answer:
      "The latest demo notice includes a campus placement drive with registration open. Check Notices for the placement update and contact the placement cell for official details."
  }

];


/* ================= CHAT HISTORY ================= */

let history =
  JSON.parse(
    localStorage.getItem("helpdeskHistory") || "[]"
  );


/* ================= PAGE NAVIGATION ================= */

function showPage(page) {

  $$(".page").forEach((p) => {

    p.classList.toggle(
      "active",
      p.id === page
    );

  });


  $$(".nav-item").forEach((nav) => {

    nav.classList.toggle(
      "active",
      nav.dataset.page === page
    );

  });


  const names = {

    dashboard: "Dashboard",

    assistant: "AI Assistant",

    notices: "Notices",

    documents: "Documents",

    history: "Chat History",

    settings: "Settings"

  };


  $("#pageTitle").textContent =
    names[page] || "Dashboard";


  $("#sidebar").classList.remove("open");

  $("#overlay").classList.remove("open");


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  if (page === "history") {

    renderHistory();

  }

}


/* ================= QUICK HELP ================= */

function renderQuick() {

  $("#quickGrid").innerHTML =
    quick.map((x) => `

      <button
        class="quick-card"
        data-question="${x.q}">

        <span class="arrow">
          ↗
        </span>

        <div
          class="q-icon"
          style="
            background:${x.color};
            color:${x.text};
          ">

          ${x.icon}

        </div>

        <h3>
          ${x.title}
        </h3>

        <p>
          ${x.desc}
        </p>

      </button>

    `).join("");


  $$("#quickGrid [data-question]")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          askFromAnywhere(
            button.dataset.question
          );

        }
      );

    });

}


/* ================= NOTICE PREVIEW ================= */

function renderNoticePreview() {

  $("#noticePreview").innerHTML =
    notices.slice(0, 3).map((notice) => `

      <button
        class="notice-row"
        data-notice="${notices.indexOf(notice)}">

        <span class="notice-dot"></span>

        <div>

          <b>
            ${notice.title}
          </b>

          <small>
            ${notice.desc}
          </small>

        </div>

        <span class="notice-date">
          ${notice.date}
        </span>

      </button>

    `).join("");


  $$("#noticePreview [data-notice]")
    .forEach((button) => {

      button.onclick = () =>
        openNotice(
          Number(button.dataset.notice)
        );

    });

}


/* ================= NOTICES PAGE ================= */

function renderNotices() {

  $("#noticeList").innerHTML =
    notices.map((notice, index) => `

      <article class="notice-item">

        <div class="notice-type">

          ${
            notice.type === "Exam"
              ? "✓"
              : notice.type === "Fees"
              ? "₹"
              : "◉"
          }

        </div>


        <main>

          <h3>
            ${notice.title}
          </h3>

          <p>
            ${notice.desc}
          </p>

        </main>


        <time>
          ${notice.date}
        </time>


        <button
          class="outline-btn"
          data-notice="${index}">

          Read →

        </button>

      </article>

    `).join("");


  $$("#noticeList [data-notice]")
    .forEach((button) => {

      button.onclick = () =>
        openNotice(
          Number(button.dataset.notice)
        );

    });

}


/* ================= DOCUMENTS ================= */

function renderDocs(filter = "") {

  const list =
    documents.filter((document) =>
      document.name
        .toLowerCase()
        .includes(
          filter.toLowerCase()
        )
    );


  if (!list.length) {

    $("#docGrid").innerHTML = `

      <div class="panel">

        <p>
          No documents found.
        </p>

      </div>

    `;

    return;

  }


  $("#docGrid").innerHTML =
    list.map((document) => `

      <article class="doc-card">

        <div class="doc-top">

          <div class="file-icon">
            ${document.icon}
          </div>

          <span class="section-label">
            ${document.type}
          </span>

        </div>


        <h3>
          ${document.name}
        </h3>


        <p>
          Official college resource for
          students and academic support.
        </p>


        <div class="doc-meta">

          <span>
            ${document.type}
          </span>

          <span>
            ${document.size}
          </span>

        </div>


        <button
          class="outline-btn"
          data-doc="${document.name}">

          View document →

        </button>

      </article>

    `).join("");


  $$("#docGrid [data-doc]")
    .forEach((button) => {

      button.onclick = () => {

        showToast(
          `${button.dataset.doc} is a frontend demo document.`
        );

      };

    });

}


/* ================= HISTORY ================= */

function renderHistory() {

  const box = $("#historyList");


  if (!history.length) {

    box.innerHTML = `

      <div
        class="panel"
        style="
          text-align:center;
          padding:45px;
        ">

        <div
          style="
            font-size:30px;
            margin-bottom:10px;
          ">

          ↶

        </div>

        <h3>
          No questions yet
        </h3>

        <p
          style="
            font-size:10px;
            color:#8b95a5;
            margin-top:6px;
          ">

          Your AI Assistant questions
          will appear here.

        </p>

      </div>

    `;

    return;

  }


  box.innerHTML =
    history
      .slice()
      .reverse()
      .map((item) => `

        <div class="history-item">

          <div class="h-icon">
            ✦
          </div>

          <main>

            <b>
              ${escapeHTML(item.question)}
            </b>

            <span>
              ${escapeHTML(
                item.answer.slice(0, 90)
              )}...
            </span>

          </main>

          <time>
            ${item.time}
          </time>

        </div>

      `)
      .join("");

}


/* ================= SECURITY ================= */

function escapeHTML(text) {

  return text.replace(
    /[&<>"']/g,
    (character) => {

      const map = {

        "&": "&amp;",

        "<": "&lt;",

        ">": "&gt;",

        '"': "&quot;",

        "'": "&#039;"

      };

      return map[character];

    }
  );

}


/* ================= AI RESPONSE ================= */

function getAnswer(question) {

  const lower =
    question.toLowerCase();


  const matched =
    answers.find((answer) =>
      answer.keys.some((key) =>
        lower.includes(key)
      )
    );


  if (matched) {

    return matched.answer;

  }


  return `
    I can help with common college topics
    such as exams, fees, library timings,
    attendance, placements and documents.
    Try asking one of those questions.
  `;

}


/* ================= CHAT MESSAGE ================= */

function addMessage(text, user = false) {

  const box =
    $("#chatMessages");


  const element =
    document.createElement("div");


  element.className =
    `message ${user ? "user" : ""}`;


  element.innerHTML = `

    <div class="msg-avatar">

      ${user ? "ST" : "✦"}

    </div>

    <div>

      <div class="bubble">

        ${escapeHTML(text)}

      </div>

      <time>

        ${user
          ? "You"
          : "AI Helpdesk"
        }

        · just now

      </time>

    </div>

  `;


  box.appendChild(element);


  box.scrollTop =
    box.scrollHeight;

}


/* ================= ASK QUESTION ================= */

function askQuestion(question) {

  question =
    question.trim();


  if (!question) {

    return;

  }


  addMessage(
    question,
    true
  );


  const answer =
    getAnswer(question);


  history.push({

    question: question,

    answer: answer,

    time:
      new Date()
        .toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit"
          }
        )

  });


  localStorage.setItem(
    "helpdeskHistory",
    JSON.stringify(history)
  );


  $("#statQueries").textContent =
    128 + history.length;


  setTimeout(() => {

    addMessage(answer);

  }, 450);

}


/* ================= ASK FROM ANYWHERE ================= */

function askFromAnywhere(question) {

  showPage("assistant");


  setTimeout(() => {

    $("#questionInput").value =
      question;

    askQuestion(question);

    $("#questionInput").value =
      "";

  }, 250);

}


/* ================= NOTICE MODAL ================= */

function openNotice(index) {

  const notice =
    notices[index];


  $("#modalMeta").textContent =
    notice.type.toUpperCase();


  $("#modalTitle").textContent =
    notice.title;


  $("#modalBody").textContent =
    notice.body;


  $("#modal").classList.add(
    "open"
  );

}


function closeModal() {

  $("#modal").classList.remove(
    "open"
  );

}


/* ================= TOAST ================= */

let toastTimer;


function showToast(message) {

  clearTimeout(toastTimer);


  $("#toast").textContent =
    message;


  $("#toast").classList.add(
    "show"
  );


  toastTimer =
    setTimeout(() => {

      $("#toast").classList.remove(
        "show"
      );

    }, 2400);

}


/* ================= NAVIGATION ================= */

$$("[data-page]").forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      showPage(
        button.dataset.page
      );

    }
  );

});


/* ================= QUESTION BUTTONS ================= */

$$("[data-question]").forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      askFromAnywhere(
        button.dataset.question
      );

    }
  );

});


/* ================= HERO SEARCH ================= */

$("#heroForm").addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    const question =
      $("#heroInput").value;


    askFromAnywhere(question);


    $("#heroInput").value =
      "";

  }
);


/* ================= CHAT FORM ================= */

$("#chatForm").addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    askQuestion(
      $("#questionInput").value
    );


    $("#questionInput").value =
      "";

  }
);


/* ================= CLEAR CHAT ================= */

$("#clearChatBtn").onclick = () => {

  $("#chatMessages").innerHTML =
    "";


  addMessage(
    "Hi! I'm your College Helpdesk AI. What would you like to know?"
  );

};


/* ================= MOBILE MENU ================= */

$("#menuBtn").onclick = () => {

  $("#sidebar").classList.add(
    "open"
  );

  $("#overlay").classList.add(
    "open"
  );

};


$("#overlay").onclick = () => {

  $("#sidebar").classList.remove(
    "open"
  );

  $("#overlay").classList.remove(
    "open"
  );

};


/* ================= MODAL ================= */

$("#modalClose").onclick =
  closeModal;

$("#modalAction").onclick =
  closeModal;


$("#modal").addEventListener(
  "click",
  (event) => {

    if (
      event.target.id === "modal"
    ) {

      closeModal();

    }

  }
);


document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      closeModal();

    }

  }
);


/* ================= DOCUMENT SEARCH ================= */

$("#docSearch").addEventListener(
  "input",
  (event) => {

    renderDocs(
      event.target.value
    );

  }
);


/* ================= CLEAR HISTORY ================= */

function clearChatHistory() {

  history = [];

  localStorage.removeItem(
    "helpdeskHistory"
  );

  renderHistory();

  showToast(
    "Chat history cleared."
  );

}


$("#clearHistory").onclick =
  clearChatHistory;


$("#clearSettingsHistory").onclick =
  clearChatHistory;


/* ================= PROFILE ================= */

$("#profileForm").addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    const name =
      $("#profileName").value ||
      "Student";


    $("#profileNameView").textContent =
      name;


    const initials =
      name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();


    $("#topAvatar").textContent =
      initials;


    $("#profileAvatar").textContent =
      initials;


    showToast(
      "Profile saved successfully."
    );

  }
);


/* ================= DARK MODE ================= */

$("#darkToggle").addEventListener(
  "change",
  (event) => {

    document.body.classList.toggle(
      "dark",
      event.target.checked
    );


    localStorage.setItem(
      "darkMode",
      event.target.checked
    );

  }
);


/* ================= REDUCE ANIMATION ================= */

$("#motionToggle").addEventListener(
  "change",
  (event) => {

    document.body.classList.toggle(
      "reduce-motion",
      event.target.checked
    );

  }
);


/* ================= NOTIFICATIONS ================= */

$("#notificationBtn").onclick =
  () => {

    showToast(
      "You have 4 new college notices."
    );

  };


/* ================= LOAD SAVED SETTINGS ================= */

if (
  localStorage.getItem("darkMode") ===
  "true"
) {

  document.body.classList.add(
    "dark"
  );

  $("#darkToggle").checked =
    true;

}


/* ================= INITIALIZE ================= */

renderQuick();

renderNoticePreview();

renderNotices();

renderDocs();

renderHistory();


/* Initial AI message */

addMessage(
  "Hi prince! 👋 I'm your College Helpdesk AI. Ask me about exams, fees, attendance, library timings or documents."
);