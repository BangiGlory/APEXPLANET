const moods = [
  {
    title: "Innovative Mode",
    quote: "Coding is not just logic, it’s also art.",
    background: ["#ffecd2", "#fcb69f"],
    tip: "HTML creates the structure — like the bones of your website."
  },
  {
    title: "Stylish Mode",
    quote: "Good design is good business.",
    background: ["#a1c4fd", "#c2e9fb"],
    tip: "CSS makes your site beautiful — it’s the skin and personality."
  },
  {
    title: "Interactive Mode",
    quote: "Your website isn't complete without JavaScript.",
    background: ["#fbc2eb", "#a6c1ee"],
    tip: "JavaScript brings life — it handles actions and reactions."
  },
  {
    title: "Responsive Mode",
    quote: "Design for people, not just pixels.",
    background: ["#89f7fe", "#66a6ff"],
    tip: "Use CSS Flexbox and Media Queries to make your site work on all devices."
  },
  {
    title: "Efficient Mode",
    quote: "Write less, do more.",
    background: ["#fad0c4", "#ffd1ff"],
    tip: "Use external CSS and JS files to keep code clean and reusable."
  }
];

function changeMood() {
  const random = moods[Math.floor(Math.random() * moods.length)];

  // Change mood text
  document.getElementById("mood-title").textContent = random.title;
  document.getElementById("mood-quote").textContent = `"${random.quote}"`;
  document.getElementById("dev-tip").textContent = random.tip;

  // Change background
  document.body.style.background = `linear-gradient(to right, ${random.background[0]}, ${random.background[1]})`;
}
