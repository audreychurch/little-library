import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function WhodunitPage() {
  const { data: books } = await supabase
    .from('book_themes')
    .select(`
      computed_rank,
      manual_rank,
      ol_rating,
      reddit_count,
      ll_score,
      books (
        id,
        title,
        author,
        published_year,
        page_count,
        pitch,
        pace,
        mood,
        best_for,
        trigger_warnings,
        cover_url
      )
    `)
    .eq('theme_id', (await supabase.from('themes').select('id').eq('slug', 'whodunit-detective').single()).data?.id)
    .order('computed_rank', { ascending: true })

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAF8F4", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 2rem", borderBottom: "0.5px solid #E0DDD6", background: "#FAF8F4" }}>
        <a href="/" style={{ fontFamily: "'Lora', serif", fontSize: "17px", color: "#1C1A17", textDecoration: "none" }}>
          little <em style={{ color: "#7C6F5A" }}>library</em>
        </a>
        <div style={{ fontSize: "12px", color: "#A89880", display: "flex", gap: "6px" }}>
          <a href="/" style={{ color: "#7C6F5A", textDecoration: "none" }}>home</a>
          <span>›</span>
          <span>mystery / thriller</span>
          <span>›</span>
          <span style={{ color: "#1C1A17" }}>whodunit</span>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "#1C1A17", padding: "3rem 2rem 2.5rem" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7C6F5A", marginBottom: "1rem" }}>
          Mystery / Thriller — Collection
        </div>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: "34px", fontWeight: 400, lineHeight: 1.2, color: "#FAF8F4", letterSpacing: "-0.02em", marginBottom: "1rem", maxWidth: "520px" }}>
          A whodunit that makes you feel like <em style={{ color: "#A89880" }}>a detective</em>
        </h1>
        <p style={{ fontSize: "14px", color: "#7C6F5A", lineHeight: 1.7, maxWidth: "480px", fontWeight: 300 }}>
          You will be building a case in your head by page three. These are the books where the clues are all there — you just have to find them.
        </p>
        <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "0.5px solid #2E2C28" }}>
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5248", marginBottom: "4px" }}>Books</div>
            <div style={{ fontSize: "14px", color: "#C8C3B8" }}>{books?.length ?? 0}</div>
          </div>
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A5248", marginBottom: "4px" }}>Updated</div>
            <div style={{ fontSize: "14px", color: "#C8C3B8" }}>April 2026</div>
          </div>
        </div>
      </div>

      {/* Book list */}
      <div style={{ padding: "0 2rem" }}>
        {books?.map((entry: any) => {
          const book = entry.books
          const rank = entry.manual_rank ?? entry.computed_rank
          return (
            <a key={book?.id} href={`/books/${book?.id}`} style={{ display: "flex", gap: "1.25rem", padding: "1.5rem 0", borderBottom: "0.5px solid #E0DDD6", textDecoration: "none" }}>

              {/* Rank + cover */}
              <div style={{ flexShrink: 0, position: "relative" }}>
                <div style={{ width: "80px", height: "115px", borderRadius: "3px", background: "#1C1A17", display: "flex", alignItems: "flex-end", padding: "8px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "5px", background: "#C8A84A", opacity: 0.5, borderRadius: "3px 0 0 3px" }}></div>
                  <span style={{ fontFamily: "'Lora', serif", fontSize: "9px", color: "#C8A84A", lineHeight: 1.3, position: "relative", zIndex: 1 }}>{book?.title}</span>
                </div>
                <div style={{ position: "absolute", top: "-6px", right: "-6px", width: "22px", height: "22px", borderRadius: "50%", background: "#FAF8F4", border: "0.5px solid #E0DDD6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 500, color: "#A89880" }}>
                  {rank}
                </div>
              </div>

              {/* Book info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: "6px", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "999px", background: "#2E2C28", color: "#A89880" }}>Mystery</span>
                  {book?.pace && <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "999px", background: "#F5F0E8", color: "#5A4A30" }}>{book.pace}</span>}
                </div>
                <div style={{ fontFamily: "'Lora', serif", fontSize: "17px", fontWeight: 400, color: "#1C1A17", lineHeight: 1.25, marginBottom: "3px" }}>
                  {book?.title}
                </div>
                <div style={{ fontSize: "12px", color: "#A89880", marginBottom: "0.6rem" }}>
                  {book?.author} · {book?.published_year}
                </div>
                <div style={{ fontSize: "13px", color: "#5A5248", lineHeight: 1.6, fontWeight: 300, marginBottom: "0.75rem" }}>
                  {book?.pitch}
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                  {entry.ol_rating && (
                    <span style={{ fontSize: "11px", color: "#A89880", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#5DCAA5", display: "inline-block" }}></span>
                      OL {entry.ol_rating}
                    </span>
                  )}
                  {entry.reddit_count && (
                    <span style={{ fontSize: "11px", color: "#A89880", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FF4500", display: "inline-block" }}></span>
                      {entry.reddit_count} Reddit threads
                    </span>
                  )}
                </div>
              </div>
         </a>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ borderTop: "0.5px solid #E0DDD6", padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2rem" }}>
        <a href="/" style={{ fontFamily: "'Lora', serif", fontSize: "14px", color: "#1C1A17", textDecoration: "none" }}>
          little <em style={{ color: "#7C6F5A" }}>library</em>
        </a>
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
