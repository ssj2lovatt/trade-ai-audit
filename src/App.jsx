import { useEffect, useRef, useState } from "react";

const LOGO = "https://i.ibb.co/1tGfcwfp/IMG-0855.png";
const CALENDLY_URL = "https://calendly.com/ssj2lovatt/free-15-minute-business-assessment-call";

const C = {
  bg: "#080d18",
  bg2: "#0c1220",
  navy: "#1B4F72",
  cyan: "#17a2c4",
  text: "#eef2f7",
  muted: "rgba(238,242,247,0.55)",
  divider: "rgba(46,134,193,0.35)",
};

const navLinks = [
  ["how-it-works", "How It Works"],
  ["pricing", "Pricing"],
  ["about", "About"],
  ["testimonials", "Testimonials"],
];

const problems = [
  { icon: "⏱", title: "Manual Quoting", desc: "Spending your evenings writing quotes by hand? Most trade businesses lose 8-15 hours a week on admin that could be sorted properly." },
  { icon: "📵", title: "Missed Calls", desc: "Every missed call is a missed job. While you're on the tools, potential customers are calling your competitor instead." },
  { icon: "💸", title: "Chasing Invoices", desc: "Late payments hurt cashflow. Automated reminders and simple payment systems get you paid faster without the awkward phone calls." },
  { icon: "✉️", title: "Drowning in Emails", desc: "The same questions, over and over -- pricing, availability, job details. Hours a week answering emails that could be handled without you." },
];

const steps = [
  { num: "01", title: "The Assessment Call", desc: "A focused 15-minute conversation about how your business runs day to day. No jargon, no pressure -- just an honest look at where time is slipping away." },
  { num: "02", title: "Your Custom Report", desc: "Within 48 hours you receive a clear, plain-English breakdown of exactly where your business is losing time -- with straightforward numbers attached." },
  { num: "03", title: "See Real Results", desc: "We walk you through the solutions, set up the right tools for your trade, and you start getting your evenings back within the first week." },
];

const plans = [
  { name: "Audit Only", label: "Entry -- Perfect starting point", price: "£249", features: ["Full business assessment", "Written findings report", "Problem area breakdown", "Estimated savings summary"] },
  { name: "Audit + Action Plan", label: "Most Popular", price: "£499", highlight: true, sub: "This is where most businesses start", features: ["Everything in Audit Only", "Specific tool recommendations", "Step-by-step action plan", "Follow-up consultation call"] },
  { name: "Done For You Setup", label: "Full Service", price: "£899", sub: "Best for busy owners who want everything handled", features: ["Everything in Audit + Action Plan", "Full tool setup and automation", "AI email responses configured", "10-day draft review -- you approve before sending", "Team walkthrough session", "30-day support included"] },
];

const tools = [
  { icon: "📋", title: "Quotes Done in Minutes", desc: "You describe the job once and your quote is ready to send. No more sitting down in the evening typing everything out after a long day. This runs automatically -- and can be refined as your business grows.", tag: "Save 5-8 hrs/week" },
  { icon: "📵", title: "Missed Calls Covered", desc: "If you miss a call, they still hear back from you straight away. No more losing work just because you were on the tools.", tag: "Never lose a job" },
  { icon: "💷", title: "Stop Chasing Invoices", desc: "Invoices go out straight away, and reminders follow up for you. No more awkward chasing or waiting weeks to get paid. This runs automatically -- and can be refined as your business grows.", tag: "Get paid faster" },
  { icon: "📝", title: "Job Notes Done For You", desc: "Speak your notes into your phone and they are turned into clear records. No more trying to remember details later on.", tag: "Zero admin time" },
  { icon: "📅", title: "No More Back and Forth Calls", desc: "Customers book straight into your diary. No more ringing back and forth trying to sort times.", tag: "Save 3+ hrs/week" },
  { icon: "⭐", title: "Reviews Come In Automatically", desc: "After each job, customers get a simple message asking for a review. Build your reputation without chasing anyone.", tag: "Get more 5 star reviews" },
  { icon: "✉️", title: "Your Inbox, Handled", desc: "Most customer emails are already written for you. You just check and send -- no more sitting there replying to the same questions every night. This runs automatically -- and can be refined over time.", tag: "Done For You -- £899" },
];

const testimonials = [
  { name: "Example Plumbing Business", trade: "Plumber", quote: "We didn't realise how much time was going on quotes and chasing invoices. After making a few changes, evenings are a lot quieter and the business feels more organised.", initials: "EP" },
  { name: "Example Electrical Business", trade: "Electrician", quote: "The quoting alone was taking hours every week. Once that was sorted it made a real difference -- more time to focus on the actual work.", initials: "EE" },
  { name: "Example Building Business", trade: "General Builder", quote: "Wasn't sure what to expect but it was all kept simple. Missed calls were costing jobs -- that's been sorted and invoices go out on time now.", initials: "EB" },
];

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => entry.isIntersecting && setInView(true), { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s` }}>{children}</div>;
}

function SectionTitle({ eyebrow, title, children, center = false }) {
  return <FadeIn><div className={center ? "section-title center" : "section-title"}><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{children && <p>{children}</p>}</div></FadeIn>;
}

function openCalendly() {
  window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 150);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return <div className="site">
    <style>{css}</style>
    <nav className={scrolled ? "nav nav-scrolled" : "nav"}>
      <div className="brand"><img src={LOGO} alt="Trade AI Audit Logo" /><span>TRADE <b>AI</b> AUDIT</span></div>
      <div className="nav-links">{navLinks.map(([id, label]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}<button className="small-cta" onClick={openCalendly}>Book Free Call</button></div>
    </nav>

    <header className="hero">
      <div className="grid-bg" /><div className="glow one" /><div className="glow two" />
      <div className="hero-content">
        <div className="kicker" style={{ opacity: heroVisible ? 1 : 0 }}><span />Admin Systems for UK Trades</div>
        <h1 style={{ opacity: heroVisible ? 1 : 0 }}>Your trade business is losing time.</h1>
        <h1 className="accent" style={{ opacity: heroVisible ? 1 : 0 }}>We'll find where it's going.</h1>
        <p>We help small trade businesses cut down the admin that eats into evenings -- quotes, missed calls, invoices, emails and bookings -- using simple systems set up properly.</p>
        <p className="note">Most businesses don't realise how much time they're losing until we break it down.</p>
        <div className="button-row"><button className="cta" onClick={openCalendly}>Book a Free 15-Minute Assessment Call</button><button className="ghost" onClick={() => scrollTo("how-it-works")}>See How It Works</button></div>
        <p className="micro">We'll show you exactly where your time is going. Free. No obligation.</p>
        <div className="stats">{[["8-15 hrs", "Saved per week"], ["£5,000+", "Typical annual saving"], ["48 hrs", "Report turnaround"]].map(([n, l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div>
      </div>
    </header>

    <section><SectionTitle center eyebrow="The Reality" title="Where is your time really going?" /><div className="cards four">{problems.map((p, i) => <FadeIn key={p.title} delay={i * .1}><Card {...p} /></FadeIn>)}</div></section>

    <section id="how-it-works" className="dark"><SectionTitle eyebrow="How It Works" title="Simple process. Real results." /><div className="steps">{steps.map((s, i) => <FadeIn key={s.num} delay={i * .15}><div className="step"><div className="num">{s.num}</div><i /><h3>{s.title}</h3><p>{s.desc}</p></div></FadeIn>)}</div></section>

    <section><SectionTitle center eyebrow="What We Set Up For You" title="Here is exactly what changes in your business.">No vague promises. No tech speak. Just practical changes that make your working week look very different.</SectionTitle><div className="cards">{tools.map((t, i) => <FadeIn key={t.title} delay={i * .07}><Card {...t} /></FadeIn>)}</div><div className="banner"><div><h3>Want your evenings back?</h3><p>Most people we work with save a few hours every week within the first couple of weeks. Book a quick call and we will show you exactly where you are losing time.</p></div><button className="cta" onClick={openCalendly}>Book a Free 15-Minute Assessment Call</button></div></section>

    <section id="pricing" className="dark"><SectionTitle center eyebrow="Invest in Your Business" title="Simple, Transparent Pricing"><span>Most clients recover the cost within the first month.</span><br /><small>One-off setup. Ongoing support available separately if you want it.</small></SectionTitle><div className="pricing">{plans.map((p, i) => <FadeIn key={p.name} delay={i * .12}><div className={p.highlight ? "plan highlight" : "plan"}>{p.highlight && <div className="popular">MOST POPULAR</div>}<div className="eyebrow">{p.name}</div><p>{p.label}</p>{p.sub && <em>{p.sub}</em>}<strong>{p.price}</strong><ul>{p.features.map(f => <li key={f}>{f}</li>)}</ul><button className={p.highlight ? "cta" : "ghost"} onClick={openCalendly}>Book a Call</button></div></FadeIn>)}</div></section>

    <section><SectionTitle center eyebrow="Optional" title="Ongoing Optimisation"><span>Once everything is set up, you can leave it as it is -- or keep improving it over time.</span><br /><br />We offer ongoing system support and improvements for businesses that want everything running at its best as they grow.</SectionTitle><div className="monthly"><span>From</span><strong>£59<small>/month</small></strong><p>Depending on your setup</p></div><p className="center muted">Optional. No pressure. Just there if you want it.<br />No long-term commitment -- stay on it only if it's useful.</p></section>

    <section id="about" className="dark about"><FadeIn><div><div className="eyebrow">About Trade AI Audit</div><h2>Built by a tradesperson,<br /><em>for tradespeople.</em></h2><p>I have worked as a plasterer and bricklayer. I know what it is like to come home exhausted and still spend two hours writing quotes, chasing unpaid invoices, and answering missed calls.</p><p>Trade AI Audit exists because tradespeople deserve the same tools that bigger businesses use -- explained in plain English, set up properly, and actually useful from day one.</p></div></FadeIn><FadeIn delay={.2}><div className="about-grid">{[["Trades background", "Plasterer and bricklayer with hands-on industry experience"], ["Plain English", "No jargon -- just clear, honest advice you can act on"], ["UK focused", "Built specifically for the UK trades market"], ["Results driven", "Every recommendation tied to real time and money savings"]].map(([a, b]) => <div key={a}><b>{a}</b><span>{b}</span></div>)}</div></FadeIn></section>

    <section id="testimonials"><SectionTitle center eyebrow="What Clients Say" title="Typical results from trade businesses">Based on the kinds of results we see from businesses we work with.</SectionTitle><div className="cards three">{testimonials.map((t, i) => <FadeIn key={t.name} delay={i * .12}><div className="testimonial"><div className="stars">★★★★★</div><p>"{t.quote}"</p><div className="person"><div>{t.initials}</div><span><b>{t.name}</b><small>{t.trade} -- UK</small></span></div></div></FadeIn>)}</div></section>

    <section id="contact" className="dark cta-section"><SectionTitle center eyebrow="Ready to Start?" title={<>Find out where your time<br /><em>is really going.</em></>}>Book a free 15-minute call. No pressure, no jargon -- just an honest conversation about your business and where the time is going.</SectionTitle><div className="booking"><p>Pick a time that suits you:</p><button className="cta" onClick={openCalendly}>Book a Free 15-Minute Assessment Call</button><small>We'll show you exactly where your time is going. Free. No obligation.</small></div><a className="email" href="mailto:jon@tradeaiaudit.com">jon@tradeaiaudit.com</a></section>

    <footer><div className="brand"><img src={LOGO} alt="Logo" /><span>TRADE <b>AI</b> AUDIT</span></div><p>2026 Trade AI Audit -- tradeaiaudit.com -- Helping UK Trade Businesses Work Smarter</p></footer>
  </div>;
}

function Card({ icon, title, desc, tag }) {
  return <div className="card"><div className="icon">{icon}</div>{tag && <div className="tag">{tag}</div>}<h3>{title}</h3><p>{desc}</p></div>;
}

const css = `
*{box-sizing:border-box}body{margin:0;background:${C.bg};}.site{font-family:Georgia,serif;background:${C.bg};color:${C.text};overflow-x:hidden}.nav{position:sticky;top:0;z-index:10;height:80px;background:${C.bg2};backdrop-filter:blur(16px);border-bottom:1px solid ${C.divider};padding:0 5%;display:flex;align-items:center;justify-content:space-between;gap:24px}.nav-scrolled{background:rgba(8,13,24,.97)}.brand{display:flex;align-items:center;gap:10px;white-space:nowrap}.brand img{height:54px;width:54px;object-fit:contain}.brand span{font-size:12px;font-weight:700;letter-spacing:.08em}.brand b,.accent,.eyebrow,em{color:${C.cyan}}.nav-links{display:flex;gap:24px;align-items:center}.nav button,.ghost,.cta,.small-cta{font-family:Georgia,serif;text-transform:uppercase;letter-spacing:.14em;cursor:pointer;transition:.22s}.nav-links button:not(.small-cta){background:none;border:0;color:${C.muted};font-size:11px}.nav-links button:hover{color:${C.cyan}}.cta,.small-cta{background:${C.cyan};color:${C.bg};border:0;font-weight:700}.cta{padding:15px 34px;font-size:12px}.small-cta{padding:9px 20px;font-size:11px}.ghost{background:transparent;color:rgba(238,242,247,.75);border:1px solid ${C.divider};padding:14px 28px;font-size:12px}.cta:hover,.small-cta:hover{background:#1ec8f0;transform:translateY(-2px);box-shadow:0 8px 28px rgba(23,162,196,.3)}.ghost:hover{color:${C.cyan};border-color:${C.cyan}}.hero{min-height:92vh;position:relative;display:flex;align-items:center;padding:80px 5%;overflow:hidden}.grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(46,134,193,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(46,134,193,.05) 1px,transparent 1px);background-size:60px 60px}.glow{position:absolute;border-radius:50%;filter:blur(50px)}.glow.one{top:15%;right:10%;width:450px;height:450px;background:radial-gradient(circle,rgba(27,79,114,.3),transparent 70%)}.glow.two{bottom:10%;left:0;width:320px;height:320px;background:radial-gradient(circle,rgba(23,162,196,.12),transparent 70%)}.hero-content{position:relative;z-index:1;max-width:680px}.kicker{display:flex;align-items:center;gap:12px;color:${C.cyan};font-size:11px;letter-spacing:.22em;text-transform:uppercase;margin-bottom:28px}.kicker span{width:36px;height:1px;background:${C.cyan}}h1{font-size:clamp(36px,6.5vw,72px);line-height:1.06;font-weight:400;margin:0 0 4px;letter-spacing:-.02em}h2{font-size:clamp(26px,4vw,42px);font-weight:400;margin:0;color:${C.text}}p{line-height:1.75;color:${C.muted}}.hero p{font-size:16px;max-width:460px;margin:28px 0 12px}.hero .note,.micro{font-size:13px;color:rgba(238,242,247,.38);font-style:italic}.micro{font-style:normal;font-size:12px;margin-top:12px}.button-row{display:flex;gap:14px;flex-wrap:wrap;align-items:center}.stats{display:flex;gap:44px;margin-top:48px;border-top:1px solid ${C.divider};padding-top:28px;flex-wrap:wrap}.stats strong{display:block;font-size:26px;color:${C.cyan};font-style:italic;font-weight:400}.stats span{font-size:10px;letter-spacing:.16em;color:rgba(238,242,247,.35);text-transform:uppercase}section{position:relative;padding:80px 5%;background:${C.bg2};border-top:1px solid ${C.divider}}section.dark{background:${C.bg}}.section-title{margin-bottom:56px}.section-title.center{text-align:center}.section-title.center p{margin-left:auto;margin-right:auto}.eyebrow{font-size:11px;letter-spacing:.25em;text-transform:uppercase;margin-bottom:14px}.section-title p{font-size:15px;max-width:560px}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2px;max-width:1060px;margin:0 auto 48px}.cards.four{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}.cards.three{grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}.card,.testimonial{background:${C.bg};padding:36px 32px;border-top:2px solid transparent;height:100%;transition:.3s}.dark .card,.plan,.booking{background:${C.bg2}}.card:hover,.testimonial:hover{border-top-color:${C.cyan};background:#0e1525}.icon{font-size:28px;margin-bottom:14px}.tag{display:inline-block;font-size:10px;letter-spacing:.15em;color:${C.cyan};text-transform:uppercase;background:rgba(23,162,196,.1);padding:4px 10px;margin-bottom:14px}.card h3,.step h3,.banner h3{font-size:18px;font-weight:400;margin:0 0 10px}.card p,.step p,.banner p{font-size:14px;margin:0}.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:44px;max-width:1060px}.num{font-size:clamp(56px,9vw,88px);font-style:italic;color:rgba(46,134,193,.08);line-height:1;margin-bottom:-16px}.step i{display:block;width:36px;height:2px;background:${C.cyan};margin-bottom:16px}.banner{max-width:1060px;margin:0 auto;background:${C.navy};padding:36px 40px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap}.pricing{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2px;max-width:960px;margin:0 auto}.plan{position:relative;padding:40px 30px;border:1px solid ${C.divider};height:100%;transition:.3s}.plan:hover{transform:translateY(-4px)}.plan.highlight{background:${C.navy};border:0}.popular{position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:${C.cyan};color:${C.bg};font-size:10px;letter-spacing:.18em;padding:4px 14px;font-weight:700}.plan strong{display:block;font-size:46px;font-weight:400;font-style:italic;margin:22px 0;color:${C.text}}.plan em{display:block;font-size:12px;margin-bottom:18px}.plan ul{list-style:none;padding:20px 0 0;margin:0 0 28px;border-top:1px solid ${C.divider}}.plan li{font-size:13px;color:${C.muted};margin-bottom:10px}.plan li:before{content:'•';color:${C.cyan};margin-right:10px}.plan button{width:100%}.monthly{display:inline-block;border:1px solid ${C.divider};padding:24px 40px;background:rgba(23,162,196,.04);position:relative;left:50%;transform:translateX(-50%);text-align:center}.monthly span{font-size:11px;letter-spacing:.2em;color:${C.cyan};text-transform:uppercase}.monthly strong{display:block;font-size:36px;font-style:italic;font-weight:400}.monthly small{font-size:16px;font-style:normal;color:${C.muted}}.center{text-align:center}.muted{color:rgba(238,242,247,.4)}.about{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:64px;align-items:center}.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px}.about-grid div{background:${C.bg2};border-top:2px solid ${C.divider};padding:22px 18px}.about-grid b{display:block;color:${C.cyan};font-size:12px;margin-bottom:6px}.about-grid span{display:block;color:rgba(238,242,247,.42);font-size:12px;line-height:1.6}.stars{color:${C.cyan};font-size:13px;margin-bottom:18px}.person{display:flex;align-items:center;gap:12px}.person>div{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,${C.navy},${C.cyan});display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700}.person b,.person small{display:block}.person small{font-size:11px;color:${C.cyan};letter-spacing:.08em}.cta-section{text-align:center}.cta-section .section-title p{margin-left:auto;margin-right:auto}.cta-section em{font-style:italic}.booking{max-width:520px;margin:0 auto 32px;border:1px solid ${C.divider};padding:32px}.booking .cta{display:block;width:100%;margin-bottom:12px}.booking small{color:rgba(238,242,247,.3)}.email{display:inline-block;text-decoration:none}.email{background:transparent;color:rgba(238,242,247,.75);border:1px solid ${C.divider};padding:14px 28px;font-size:12px;letter-spacing:.12em;text-transform:uppercase}footer{background:#050810;padding:32px 5%;border-top:1px solid ${C.divider};display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px}footer .brand img{height:32px;width:32px}footer p{font-size:11px;color:rgba(238,242,247,.2);letter-spacing:.07em;margin:0}@media(max-width:820px){.nav{height:auto;padding:16px 5%;align-items:flex-start}.nav-links{display:none}.hero{padding-top:64px}.button-row .cta,.button-row .ghost{width:100%}.banner{padding:28px 24px}.banner .cta{width:100%}.about-grid{grid-template-columns:1fr}footer{justify-content:center;text-align:center}}`;
