export default function Home() {
  const cards = [
    { tag: "Mystery / Thriller", title: "A whodunit that makes you feel like a detective", desc: "Building a case in your head by page three.", bg: "#1C1A17", tagBg: "#3A3830", tagColor: "#C8C3B8", titleColor: "#FAF8F4", descColor: "#C8C3B8", tall: true, href: "/collections/whodunit" },
    { tag: "Non-fiction", title: "Books that will change the way you think", desc: "Ideas that stick with you.", bg: "#EEF7E8", tagBg: "#C4E6A8", tagColor: "#2A5A10", titleColor: "#1E4210", descColor: "#2A5A10", tall: false, href: "#" },
    { tag: "Romance", title: "Slow burns that are worth the wait", desc: "The tension is the whole point.", bg: "#FBF0EE", tagBg: "#F4CBBF", tagColor: "#7A2E1A", titleColor: "#5A1F10", descColor: "#7A3020", tall: false, href: "#" },
    { tag: "Fiction", title: "Stories that will leave you inspired", desc: "Finish the last page. Feel things.", bg: "#F5F0E8", tagBg: "#E0D5BF", tagColor: "#5A4A30", titleColor: "#3A2E1A", descColor: "#5A4A30", tall: false, href: "#" },
    { tag: "Self-help", title: "Self-help that does not feel like self-help", desc: "Snuck up on you. Changed something.", bg: "#EEF3FB", tagBg: "#C0D4F0", tagColor: "#1A3A6A", titleColor: "#102A54", descColor: "#1A3A6A", tall: false, href: "#" },
  ]

  const moods = ["all moods", "need to think", "need to feel", "need to escape", "need to cry", "need to laugh", "need to be scared", "need to be inspired", "cannot sleep anyway"]

  const books = [
    { title: "And Then There Were None", author: "Agatha Christie", bg: "#1A1208", color: "#C8A84A" },
    { title: "Educated", author: "Tara Westover", bg: "#7A3728", color: "#F4C090" },
    { title: "Pachinko", author: "Min Jin Lee", bg: "#1A2A4A", color: "#B8D4F0" },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", bg: "#3D2A1A", color: "#F0D4A8" },
    { title: "The Secret History", author: "Donna Tartt", bg: "#2A1A3A", color: "#D4B0F0" },
  ]

  const themes = [
    "Reads like a novel, happened in real life",
    "Enemies to lovers done right",
    "Books you finish in one sitting",
    "Coming-of-age that hits different as an adult",
    "Plot twists that actually earned it",
    "Books people re-read every few years",
    "When you need to ugly-cry",
    "Fantasy worlds you want to live in",
    "Psychological thrillers, no gore required",
    "Science you can actually understand",
    "Swoony but actually feminist",
    "Best unreliable narrators ever written",
    "History that explains why today makes sense",
    "Books that rewired how I work",
    "Set in another country, feel transported",
  ]

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAF8F4", minHeight: "100vh" }}>

      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 2rem", borderBottom: "0.5px solid #E0DDD6", background: "#FAF8F4" }}>
        <div style={{ fontFamily: "'Lora', serif", fontSize: "17px", letterSpacing: "-0.01em" }}>
          little <em style={{ color: "#7C6F5A" }}>library</em>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <a href="#" style={{ fontSize: "13px", color: "#7C6F5A", textDecoration: "none" }}>browse all</a>
          <a href="#" style={{ fontSize: "13px", color: "#7C6F5A", textDecoration: "none" }}>about</a>
        </div>
      </nav>

      <div style={{ padding: "4rem 2rem 2.5rem", maxWidth: "680px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A89880", marginBottom: "0.9rem" }}>
          A curated reading guide
        </div>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: "38px", fontWeight: 400, lineHeight: 1.2, color: "#1C1A17", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
          What do you need<br />from a book <em style={{ color: "#7C6F5A" }}>right now?</em>
        </h1>
        <p style={{ fontSize: "15px", color: "#7C6F5A", lineHeight: 1.7, maxWidth: "460px", fontWeight: 300 }}>
          Reviews from real readers — organized by feeling, not just genre.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#7C6F5A", padding: "5px 12px", border: "0.5px solid #E0DDD6", borderRadius: "999px", background: "#fff" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF4500", display: "inline-block" }}></span>
            Reddit
          </div>
          <span style={{ color: "#C8C3B8" }}>+</span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#7C6F5A", padding: "5px 12px", border: "0.5px solid #E0DDD6", borderRadius: "999px", background: "#fff" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#5DCAA5", display: "inline-block" }}></span>
            Open Library
          </div>
        </div>
      </div>

      <div style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A89880", padding: "0 2rem", marginBottom: "1rem" }}>
        Browse by mood
      </div>
      <div style={{ display: "flex", gap: "10px", padding: "0 2rem 0.5rem", overflowX: "auto" }}>
        {moods.map((mood, i) => (
          <div key={mood} style={{ whiteSpace: "nowrap", fontSize: "13px", padding: "7px 16px", borderRadius: "999px", border: "0.5px solid #C8C3B8", background: i === 0 ? "#1C1A17" : "#fff", color: i === 0 ? "#FAF8F4" : "#4A4438", cursor: "pointer", flexShrink: 0 }}>
            {mood}
          </div>
        ))}
      </div>

      <div style={{ height: "0.5px", background: "#E0DDD6", margin: "2rem 2rem 0" }}></div>
      <div style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A89880", padding: "1.5rem 2rem 1rem" }}>
        Featured collections
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", padding: "0 2rem" }}>
        {cards.map((card) => (
          <a key={card.title} href={card.href} style={{ background: card.bg, borderRadius: "12px", padding: "1.3rem 1.4rem 1.1rem", cursor: "pointer", gridRow: card.tall ? "span 2" : "span 1", textDecoration: "none", display: "block" }}>
            <span style={{ display: "inline-block", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", borderRadius: "999px", background: card.tagBg, color: card.tagColor, marginBottom: "0.75rem" }}>
              {card.tag}
            </span>
            <h3 style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 400, lineHeight: 1.35, color: card.titleColor, marginBottom: "0.5rem" }}>
              {card.title}
            </h3>
            <p style={{ fontSize: "12px", lineHeight: 1.6, color: card.descColor, opacity: 0.75 }}>
              {card.desc}
            </p>
          </a>
        ))}
      </div>

      <div style={{ height: "0.5px", background: "#E0DDD6", margin: "2rem 2rem 0" }}></div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "1.5rem 2rem 1rem" }}>
        <span style={{ fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 400 }}>
          The people have <em style={{ color: "#7C6F5A" }}>spoken.</em>
        </span>
        <a href="#" style={{ fontSize: "12px", color: "#7C6F5A", textDecoration: "none", borderBottom: "0.5px solid #C8C3B8" }}>see all</a>
      </div>

      <div style={{ display: "flex", gap: "12px", padding: "0 2rem 2rem", overflowX: "auto" }}>
        {books.map((book) => (
          <div key={book.title} style={{ flexShrink: 0, width: "110px", cursor: "pointer" }}>
            <div style={{ width: "110px", height: "155px", borderRadius: "4px", background: book.bg, marginBottom: "8px", display: "flex", alignItems: "flex-end", padding: "10px", position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "6px", borderRadius: "4px 0 0 4px", background: book.color, opacity: 0.4 }}></div>
              <span style={{ fontFamily: "'Lora', serif", fontSize: "10px", color: book.color, lineHeight: 1.3, position: "relative", zIndex: 1 }}>{book.title}</span>
            </div>
            <div style={{ fontSize: "12px", fontWeight: 500, color: "#1C1A17", lineHeight: 1.3, marginBottom: "2px" }}>{book.title}</div>
            <div style={{ fontSize: "11px", color: "#A89880" }}>{book.author}</div>
          </div>
        ))}
      </div>

      <div style={{ height: "0.5px", background: "#E0DDD6", margin: "0 2rem" }}></div>
      <div style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A89880", padding: "1.5rem 2rem 1rem" }}>
        All themes
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", padding: "0 2rem 2rem" }}>
        {themes.map((theme) => (
          <div key={theme} style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "999px", border: "0.5px solid #C8C3B8", color: "#7C6F5A", background: "#fff", cursor: "pointer" }}>
            {theme}
          </div>
        ))}
      </div>

      <div style={{ borderTop: "0.5px solid #E0DDD6", padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'Lora', serif", fontSize: "14px" }}>
          little <em style={{ color: "#7C6F5A" }}>library</em>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <span style={{ fontSize: "11px", color: "#A89880", display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF4500", display: "inline-block" }}></span>Reddit
          </span>
          <span style={{ fontSize: "11px", color: "#A89880", display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5DCAA5", display: "inline-block" }}></span>Open Library
          </span>
        </div>
      </div>

    </main>
  )
}
