import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function BookPage({ params }: { params: { id: string } }) {
  const { data: book } = await supabase
    .from('books')
    .select('*')
    .eq('id', params.id)
    .single()

  const { data: bookThemes } = await supabase
    .from('book_themes')
    .select('ol_rating, reddit_count, ll_score, computed_rank, manual_rank, themes(name, slug)')
    .eq('book_id', params.id)

  const { data: quotes } = await supabase
    .from('reddit_quotes')
    .select('*')
    .eq('book_id', params.id)
    .order('upvotes', { ascending: false })
    .limit(3)

  if (!book) {
    return <div style={{ padding: "2rem", fontFamily: "'DM Sans', sans-serif" }}>Book not found.</div>
  }

  const primarySignals = bookThemes?.[0]

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAF8F4", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 2rem", borderBottom: "0.5px solid #E0DDD6", background: "#FAF8F4" }}>
        <a href="/" style={{ fontFamily: "'Lora', serif", fontSize: "17px", color: "#1C1A17", textDecoration: "none" }}>
          little <em style={{ color: "#7C6F5A" }}>library</em>
        </a>
        <div style={{ fontSize: "12px", color: "#A89880", display: "flex", gap: "6px", alignItems: "center" }}>
          <a href="/" style={{ color: "#7C6F5A", textDecoration: "none" }}>home</a>
          <span>›</span>
          <a href="/collections/whodunit" style={{ color: "#7C6F5A", textDecoration: "none" }}>whodunit</a>
          <span>›</span>
          <span style={{ color: "#1C1A17" }}>{book.title}</span>
        </div>
      </nav>

      {/* Book hero */}
      <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "2rem", padding: "2.5rem 2rem 2rem", alignItems: "start" }}>

        {/* Cover */}
        <div style={{ width: "140px", height: "200px", borderRadius: "5px", background: "#1A1208", display: "flex", alignItems: "flex-end", padding: "12px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "7px", borderRadius: "5px 0 0 5px", background: "#C8A84A", opacity: 0.6 }}></div>
          <span style={{ fontFamily: "'Lora', serif", fontSize: "11px", color: "#C8A84A", lineHeight: 1.4, position: "relative", zIndex: 1 }}>{book.title}</span>
        </div>

        {/* Meta */}
        <div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "0.8rem" }}>
            <span style={{ fontSize: "10px", padding: "3px 9px", borderRadius: "999px", background: "#2E2C28", color: "#A89880" }}>Mystery</span>
            {book.pace && <span style={{ fontSize: "10px", padding: "3px 9px", borderRadius: "999px", background: "#F5F0E8", color: "#5A4A30" }}>{book.pace}</span>}
            {book.published_year && <span style={{ fontSize: "10px", padding: "3px 9px", borderRadius: "999px", background: "#F5F0E8", color: "#5A4A30" }}>{book.published_year}</span>}
          </div>

          <h1 style={{ fontFamily: "'Lora', serif", fontSize: "26px", fontWeight: 400, lineHeight: 1.2, color: "#1C1A17", letterSpacing: "-0.02em", marginBottom: "0.3rem" }}>
            {book.title}
          </h1>
          <div style={{ fontSize: "14px", color: "#7C6F5A", marginBottom: "1.2rem", fontWeight: 300 }}>
            {book.author} {book.page_count && `· ${book.page_count} pages`}
          </div>

          {/* Signals */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            {primarySignals?.ol_rating && (
              <div>
                <div style={{ fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#A89880", display: "flex", alignItems: "center", gap: "4px", marginBottom: "2px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5DCAA5", display: "inline-block" }}></span>
                  Open Library
                </div>
                <div style={{ fontSize: "22px", fontFamily: "'Lora', serif", color: "#1C1A17" }}>{primarySignals.ol_rating}<span style={{ fontSize: "12px", color: "#A89880" }}> / 5</span></div>
              </div>
            )}
            {primarySignals?.ol_rating && primarySignals?.reddit_count && (
              <div style={{ width: "0.5px", height: "36px", background: "#E0DDD6" }}></div>
            )}
            {primarySignals?.reddit_count && (
              <div>
                <div style={{ fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#A89880", display: "flex", alignItems: "center", gap: "4px", marginBottom: "2px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF4500", display: "inline-block" }}></span>
                  Reddit
                </div>
                <div style={{ fontSize: "22px", fontFamily: "'Lora', serif", color: "#1C1A17" }}>{primarySignals.reddit_count}<span style={{ fontSize: "12px", color: "#A89880" }}> threads</span></div>
              </div>
            )}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <a href={`https://openlibrary.org/works/${book.ol_work_id}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", padding: "8px 18px", borderRadius: "999px", background: "#1C1A17", color: "#FAF8F4", textDecoration: "none" }}>
              Find this book
            </a>
            <a href="/collections/whodunit" style={{ fontSize: "13px", padding: "8px 18px", borderRadius: "999px", background: "transparent", color: "#4A4438", border: "0.5px solid #C8C3B8", textDecoration: "none" }}>
              Back to collection
            </a>
          </div>
        </div>
      </div>

      <div style={{ height: "0.5px", background: "#E0DDD6", margin: "0 2rem" }}></div>

      {/* Pitch */}
      {book.pitch && (
        <div style={{ padding: "1.75rem 2rem", borderBottom: "0.5px solid #E0DDD6" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A89880", marginBottom: "1rem" }}>The pitch</div>
          <p style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 400, lineHeight: 1.75, color: "#2A2620", fontStyle: "italic" }}>
            {book.pitch}
          </p>
          <div style={{ fontSize: "12px", color: "#A89880", marginTop: "0.75rem" }}>Little Library editorial</div>
        </div>
      )}

      {/* Fast facts */}
      <div style={{ padding: "1.75rem 2rem", borderBottom: "0.5px solid #E0DDD6" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A89880", marginBottom: "1rem" }}>Fast facts</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {[
            { label: "Pace", val: book.pace },
            { label: "Mood", val: book.mood },
            { label: "Best for", val: book.best_for },
            { label: "Pages", val: book.page_count },
            { label: "Published", val: book.published_year },
            { label: "Trigger warnings", val: book.trigger_warnings },
          ].filter(f => f.val).map((fact) => (
            <div key={fact.label} style={{ background: "#F5F0E8", borderRadius: "8px", padding: "0.75rem 1rem" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#A89880", marginBottom: "4px" }}>{fact.label}</div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: "#1C1A17" }}>{fact.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reddit quotes */}
      {quotes && quotes.length > 0 && (
        <div style={{ padding: "1.75rem 2rem", borderBottom: "0.5px solid #E0DDD6" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A89880", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF4500", display: "inline-block" }}></span>
            What Reddit is saying
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {quotes.map((quote) => (
              <div key={quote.id} style={{ border: "0.5px solid #E0DDD6", borderRadius: "10px", padding: "1rem 1.1rem", background: "#fff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.6rem" }}>
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "#1C1A17" }}>r/{quote.subreddit}</span>
                  <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#C8C3B8", display: "inline-block" }}></span>
                  <span style={{ fontSize: "11px", color: "#A89880" }}>{quote.upvotes.toLocaleString()} upvotes</span>
                </div>
                <div style={{ fontSize: "13px", color: "#3A3428", lineHeight: 1.6, fontWeight: 300 }}>{quote.quote}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collections this book appears in */}
      {bookThemes && bookThemes.length > 0 && (
        <div style={{ padding: "1.75rem 2rem", borderBottom: "0.5px solid #E0DDD6" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#A89880", marginBottom: "1rem" }}>Collections this book appears in</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {bookThemes.map((bt: any) => (
              <span key={bt.themes?.slug} style={{ fontSize: "12px", padding: "6px 14px", borderRadius: "999px", border: "0.5px solid #C8C3B8", color: "#4A4438", background: "#fff" }}>
                {bt.themes?.name}
              </span>
            ))}
          </div>
        </div>
      )}

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
