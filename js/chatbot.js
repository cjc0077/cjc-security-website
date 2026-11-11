/* ── CJC Security AI Chatbot Widget ── */
(function () {
  'use strict';

  // ── Knowledge base ──
  const KB = {
    services: {
      keywords: ['service','offer','provide','do you','what can','armed','unarmed','guard','patrol','investigation','k9','dog','school','executive','protection','counter','surveillance','spy','camera','tracking','gps'],
      answer: `CJC Security & Investigation LLC offers 8 core services across Texas:\n\n• <strong>Armed Security Guards</strong> — licensed, trained armed officers\n• <strong>Unarmed Security Officers</strong> — professional deterrence & monitoring\n• <strong>School Safety Programs</strong> — campus security & SB 11 compliance\n• <strong>Private Investigations</strong> — background checks, surveillance, fraud\n• <strong>Counter-Surveillance Sweeps</strong> — hidden cameras, GPS trackers, listening devices\n• <strong>Mobile Patrol</strong> — randomized vehicle patrol for properties\n• <strong>Executive Protection</strong> — personal security details\n• <strong>K9 Unit Services</strong> — certified detection & deterrence teams\n\nWant details on a specific service? Just ask.`
    },
    areas: {
      keywords: ['area','cover','region','location','serve','where','texas','dallas','fort worth','dfw','san antonio','el paso','lubbock','abilene','laredo','corpus','mcallen','edinburg','rgv','rio grande','valley','statewide'],
      answer: `We serve all of Texas across four regions:\n\n📍 <strong>South Texas</strong> — McAllen, Edinburg, Rio Grande Valley, Laredo, Corpus Christi\n📍 <strong>Central Texas</strong> — San Antonio, Abilene\n📍 <strong>West Texas</strong> — El Paso, Lubbock\n📍 <strong>North Texas</strong> — Dallas & Fort Worth (expanding now)\n\nFor full coverage details visit our <a href="regions.html" style="color:var(--color-primary);">Service Areas page</a>.`
    },
    pricing: {
      keywords: ['price','cost','rate','charge','how much','quote','fee','affordable','budget','pricing'],
      answer: `Pricing varies by service type, number of officers, hours of coverage, and location. We don't publish flat rates because every deployment is customized.\n\nThe best way to get an accurate number is to submit a <a href="contact.html" style="color:var(--color-primary);">Deployment Assessment Request</a> — we'll put together a proposal within 24 hours at no cost to you.`
    },
    contact: {
      keywords: ['contact','reach','call','email','phone','talk','speak','get in touch','number','address'],
      answer: `You can reach CJC Security & Investigation LLC at:\n\n📧 <strong>Email:</strong> <a href="mailto:contact@cjcsecuritytx.com" style="color:var(--color-primary);">contact@cjcsecuritytx.com</a>\n📞 Available 24/7 for urgent requests\n\nOr submit a <a href="contact.html" style="color:var(--color-primary);">Deployment Assessment Request</a> and we'll respond within 24 hours.`
    },
    careers: {
      keywords: ['job','career','hire','apply','work','employment','application','position','guard','officer','opening','join','hiring'],
      answer: `CJC Security is actively hiring across Texas. Current open positions include:\n\n• Armed Security Officer\n• Unarmed Security Officer\n• K9 Handler\n• School Safety Officer\n• Mobile Patrol Officer\n\nDownload and complete our fillable application on the <a href="careers.html" style="color:var(--color-primary);">Careers page</a>. We review all applications and follow up within 5 business days.`
    },
    about: {
      keywords: ['who','about','founder','background','experience','history','license','bonded','insured','uei','cage','federal','government','dps','credential','qualified'],
      answer: `CJC Security & Investigation LLC was founded in 2023 in Edinburg, Texas by a 20+ year law enforcement veteran — including 10 years as a Hidalgo County Sheriff's deputy.\n\nWe are:\n✅ Texas DPS Licensed (Private Security Division)\n✅ Fully Insured & Bonded\n✅ Federal Contractor Registered (UEI: NE5LXHD56355 | CAGE: 0G8Q1)\n✅ School Safety Specialists (SB 11 compliant)\n\nLearn more on our <a href="about.html" style="color:var(--color-primary);">About page</a>.`
    },
    quote: {
      keywords: ['quote','assessment','deploy','deployment','proposal','start','begin','get started','request','hire','book','schedule'],
      answer: `Ready to get protected? Here's how to start:\n\n1. Visit our <a href="contact.html" style="color:var(--color-primary);">Contact page</a>\n2. Complete the Deployment Assessment Request form\n3. We'll review your needs and respond within 24 hours with a customized proposal\n\nFor urgent requests, email us directly at <a href="mailto:contact@cjcsecuritytx.com" style="color:var(--color-primary);">contact@cjcsecuritytx.com</a>.`
    },
    school: {
      keywords: ['school','campus','student','sb 11','senate bill','education','district','k-12','teacher','principal','threat'],
      answer: `CJC Security specializes in school safety programs designed to meet Texas Senate Bill 11 requirements. Our school safety officers are trained in:\n\n• Threat assessment & de-escalation\n• Active threat response\n• Campus access control\n• Emergency coordination with law enforcement\n• Daily safety patrol\n\nWe currently serve schools across South Texas and can deploy statewide. <a href="contact.html" style="color:var(--color-primary);">Request an assessment</a> for your campus.`
    },
    k9: {
      keywords: ['k9','dog','canine','detection','narcotics','drug','explosive','sniff'],
      answer: `Our K9 Unit services include certified detection dogs and licensed handlers trained for:\n\n• Narcotics detection\n• Explosive sweep detection\n• Campus & event deterrence\n• Building searches\n\nK9 teams are available across our Texas service regions. <a href="services.html#k9" style="color:var(--color-primary);">View K9 service details</a> or request a deployment assessment.`
    },
    investigation: {
      keywords: ['investigat','surveillance','background','check','missing','fraud','evidence','infidelity','divorce','cheating','locate','witness'],
      answer: `Our licensed private investigators handle:\n\n• Background checks\n• Covert surveillance\n• Missing persons\n• Fraud investigation\n• Infidelity & domestic cases\n• Evidence collection & court-ready reports\n• Witness location & interviews\n\nAll investigations are conducted discreetly by licensed PIs with real law enforcement backgrounds. <a href="contact.html" style="color:var(--color-primary);">Request a confidential consultation</a>.`
    },
    sweep: {
      keywords: ['sweep','spy','camera','hidden','bug','wiretap','tracker','gps','listening','device','tap','record','monitor','snoop','stalker','stalk'],
      answer: `Our Counter-Surveillance Sweep service detects and locates:\n\n• Hidden spy cameras (homes, offices, rental properties)\n• GPS tracking devices (vehicles & personal property)\n• Covert audio listening devices\n• Wireless signal & RF scanning\n\nIf you believe you are being monitored without your consent, contact us immediately. Sweeps are conducted discreetly and confidentially. <a href="services.html#counter-surveillance" style="color:var(--color-primary);">Learn more</a> or <a href="contact.html" style="color:var(--color-primary);">request a sweep</a>.`
    }
  };

  const FALLBACK = `I'm the CJC Security virtual assistant. I can answer questions about our services, service areas, pricing, careers, and more.\n\nTry asking:\n• "What services do you offer?"\n• "What areas do you cover?"\n• "How do I get a quote?"\n• "Are you hiring?"\n\nFor anything else, <a href="contact.html" style="color:var(--color-primary);">contact our team directly</a>.`;

  const GREETINGS = ['hi','hello','hey','howdy','good morning','good afternoon','good evening','what up','sup','hola'];

  function getResponse(input) {
    const lower = input.toLowerCase().trim();
    if (GREETINGS.some(g => lower.startsWith(g) || lower === g)) {
      return `Hello! Welcome to CJC Security & Investigation LLC. I'm here 24/7 to answer your questions about our security services, coverage areas, careers, and more.\n\nWhat can I help you with today?`;
    }
    // Score each category
    let best = null, bestScore = 0;
    for (const [, cat] of Object.entries(KB)) {
      const score = cat.keywords.filter(k => lower.includes(k)).length;
      if (score > bestScore) { bestScore = score; best = cat; }
    }
    return bestScore > 0 ? best.answer : FALLBACK;
  }

  // ── Build widget HTML ──
  const style = document.createElement('style');
  style.textContent = `
    #cjc-chat-btn {
      position: fixed; bottom: 28px; right: 28px; z-index: 9000;
      width: 60px; height: 60px; border-radius: 50%;
      background: var(--color-primary, #c9940d);
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 32px rgba(0,0,0,0.35), 0 0 0 0 rgba(201,148,13,0.4);
      animation: cjc-pulse 2.5s infinite;
      transition: transform 0.2s, background 0.2s;
    }
    #cjc-chat-btn:hover { transform: scale(1.08); background: #d4a017; }
    #cjc-chat-btn svg { width: 28px; height: 28px; color: #000; }
    @keyframes cjc-pulse {
      0%   { box-shadow: 0 8px 32px rgba(0,0,0,0.35), 0 0 0 0 rgba(201,148,13,0.5); }
      70%  { box-shadow: 0 8px 32px rgba(0,0,0,0.35), 0 0 0 14px rgba(201,148,13,0); }
      100% { box-shadow: 0 8px 32px rgba(0,0,0,0.35), 0 0 0 0 rgba(201,148,13,0); }
    }
    #cjc-chat-window {
      position: fixed; bottom: 100px; right: 28px; z-index: 9001;
      width: 360px; max-width: calc(100vw - 40px);
      border-radius: 20px;
      background: #1a1a14;
      border: 1px solid rgba(201,148,13,0.25);
      box-shadow: 0 24px 80px rgba(0,0,0,0.6);
      display: flex; flex-direction: column;
      overflow: hidden;
      transform: scale(0.9) translateY(16px);
      opacity: 0; pointer-events: none;
      transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease;
      max-height: 520px;
    }
    #cjc-chat-window.open {
      transform: scale(1) translateY(0);
      opacity: 1; pointer-events: all;
    }
    #cjc-chat-header {
      background: linear-gradient(135deg, #1e1c12 0%, #2a2510 100%);
      border-bottom: 1px solid rgba(201,148,13,0.2);
      padding: 14px 18px;
      display: flex; align-items: center; gap: 12px;
    }
    #cjc-chat-header .chat-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: rgba(201,148,13,0.15);
      border: 1.5px solid rgba(201,148,13,0.4);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    #cjc-chat-header .chat-avatar svg { width: 22px; height: 22px; color: #c9940d; }
    .chat-header-text { flex: 1; }
    .chat-header-text strong { display: block; font-size: 14px; font-weight: 700; color: #fff; font-family: 'Clash Display', sans-serif; }
    .chat-header-text span { font-size: 11px; color: #4ade80; font-weight: 600; }
    .chat-header-text span::before { content: '●'; margin-right: 4px; }
    #cjc-chat-close {
      background: none; border: none; cursor: pointer;
      color: rgba(255,255,255,0.5); font-size: 20px; line-height: 1;
      padding: 4px; border-radius: 50%;
      transition: color 0.2s, background 0.2s;
    }
    #cjc-chat-close:hover { color: #fff; background: rgba(255,255,255,0.08); }
    #cjc-chat-messages {
      flex: 1; overflow-y: auto; padding: 16px;
      display: flex; flex-direction: column; gap: 12px;
      scroll-behavior: smooth;
    }
    #cjc-chat-messages::-webkit-scrollbar { width: 4px; }
    #cjc-chat-messages::-webkit-scrollbar-track { background: transparent; }
    #cjc-chat-messages::-webkit-scrollbar-thumb { background: rgba(201,148,13,0.3); border-radius: 4px; }
    .chat-msg {
      max-width: 88%; font-size: 13.5px; line-height: 1.55;
      border-radius: 14px; padding: 10px 14px;
      animation: cjc-msg-in 0.2s ease;
    }
    @keyframes cjc-msg-in { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
    .chat-msg.bot {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.88);
      align-self: flex-start; border-bottom-left-radius: 4px;
    }
    .chat-msg.user {
      background: rgba(201,148,13,0.18);
      border: 1px solid rgba(201,148,13,0.3);
      color: #fff;
      align-self: flex-end; border-bottom-right-radius: 4px;
    }
    .chat-msg a { color: #c9940d; }
    .chat-typing {
      display: flex; gap: 5px; align-items: center;
      padding: 12px 14px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 14px; border-bottom-left-radius: 4px;
      align-self: flex-start; width: fit-content;
    }
    .chat-typing span {
      width: 7px; height: 7px; border-radius: 50%;
      background: rgba(201,148,13,0.7);
      animation: cjc-dot 1.2s infinite;
    }
    .chat-typing span:nth-child(2) { animation-delay: 0.2s; }
    .chat-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes cjc-dot { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-5px); } }
    #cjc-chat-quick {
      display: flex; flex-wrap: wrap; gap: 6px;
      padding: 0 16px 12px;
    }
    .quick-btn {
      padding: 5px 11px; border-radius: 99px;
      border: 1px solid rgba(201,148,13,0.35);
      background: transparent; color: rgba(201,148,13,0.9);
      font-size: 12px; cursor: pointer; white-space: nowrap;
      transition: background 0.2s, color 0.2s;
      font-family: inherit;
    }
    .quick-btn:hover { background: rgba(201,148,13,0.15); color: #c9940d; }
    #cjc-chat-form {
      display: flex; gap: 8px;
      padding: 12px 14px;
      border-top: 1px solid rgba(255,255,255,0.07);
      background: rgba(0,0,0,0.2);
    }
    #cjc-chat-input {
      flex: 1; background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 10px; padding: 9px 13px;
      color: #fff; font-size: 13.5px; outline: none;
      font-family: inherit;
      transition: border-color 0.2s;
    }
    #cjc-chat-input::placeholder { color: rgba(255,255,255,0.3); }
    #cjc-chat-input:focus { border-color: rgba(201,148,13,0.5); }
    #cjc-chat-send {
      width: 38px; height: 38px; border-radius: 10px;
      background: #c9940d; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: background 0.2s, transform 0.15s;
    }
    #cjc-chat-send:hover { background: #d4a017; transform: scale(1.05); }
    #cjc-chat-send svg { width: 17px; height: 17px; color: #000; }
    #cjc-chat-badge {
      position: absolute; top: -4px; right: -4px;
      width: 18px; height: 18px; border-radius: 50%;
      background: #ef4444; color: #fff;
      font-size: 11px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      animation: cjc-badge-pop 0.3s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes cjc-badge-pop { from { transform:scale(0); } to { transform:scale(1); } }
  `;
  document.head.appendChild(style);

  // Button
  const btnWrap = document.createElement('div');
  btnWrap.style.cssText = 'position:fixed;bottom:28px;right:28px;z-index:9000;';
  btnWrap.innerHTML = `
    <button id="cjc-chat-btn" aria-label="Open CJC Security chat">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    </button>
    <div id="cjc-chat-badge">1</div>
  `;
  document.body.appendChild(btnWrap);

  // Window
  const win = document.createElement('div');
  win.id = 'cjc-chat-window';
  win.setAttribute('role', 'dialog');
  win.setAttribute('aria-label', 'CJC Security Chat Assistant');
  win.innerHTML = `
    <div id="cjc-chat-header">
      <div class="chat-avatar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
      <div class="chat-header-text">
        <strong>CJC Security Assistant</strong>
        <span>Online 24/7</span>
      </div>
      <button id="cjc-chat-close" aria-label="Close chat">&times;</button>
    </div>
    <div id="cjc-chat-messages"></div>
    <div id="cjc-chat-quick">
      <button class="quick-btn" data-q="What services do you offer?">Services</button>
      <button class="quick-btn" data-q="What areas do you cover?">Coverage Areas</button>
      <button class="quick-btn" data-q="How do I get a quote?">Get a Quote</button>
      <button class="quick-btn" data-q="Are you hiring?">Careers</button>
      <button class="quick-btn" data-q="Tell me about your K9 unit">K9 Unit</button>
      <button class="quick-btn" data-q="What is a counter-surveillance sweep?">Spy Sweep</button>
    </div>
    <form id="cjc-chat-form" autocomplete="off">
      <input id="cjc-chat-input" type="text" placeholder="Ask a question…" maxlength="300" />
      <button type="submit" id="cjc-chat-send" aria-label="Send">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </form>
  `;
  document.body.appendChild(win);

  const msgs   = win.querySelector('#cjc-chat-messages');
  const input  = win.querySelector('#cjc-chat-input');
  const badge  = btnWrap.querySelector('#cjc-chat-badge');
  let opened   = false;

  function addMsg(text, role) {
    const div = document.createElement('div');
    div.className = 'chat-msg ' + role;
    div.innerHTML = text.replace(/\n/g, '<br/>');
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(typing);
    msgs.scrollTop = msgs.scrollHeight;
    return typing;
  }

  function botReply(text) {
    const typing = showTyping();
    setTimeout(() => {
      typing.remove();
      addMsg(text, 'bot');
    }, 700 + Math.random() * 500);
  }

  // ── AI replies via /api/chat (Perplexity Orchestrator API) ──
  // Falls back to the local knowledge base when the endpoint is unavailable
  // (static preview, missing key, rate limit, or network error).
  const history = [];
  let aiAvailable = true;

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  }

  async function askAI(question) {
    history.push({ role: 'user', content: question });
    if (!aiAvailable) { botReply(getResponse(question)); return; }
    const typing = showTyping();
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 20000);
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-10) }),
        signal: controller.signal
      });
      clearTimeout(timer);
      if (!r.ok) {
        if (r.status === 404 || r.status === 405 || r.status === 503) aiAvailable = false;
        throw new Error('HTTP ' + r.status);
      }
      const data = await r.json();
      if (!data || typeof data.reply !== 'string') throw new Error('bad shape');
      history.push({ role: 'assistant', content: data.reply });
      typing.remove();
      addMsg(escapeHtml(data.reply), 'bot');
    } catch (err) {
      typing.remove();
      history.pop();
      addMsg(getResponse(question), 'bot');
    }
  }

  function openChat() {
    win.classList.add('open');
    badge.style.display = 'none';
    opened = true;
    if (!msgs.children.length) {
      botReply(`👋 Welcome to <strong>CJC Security & Investigation LLC</strong>.<br/><br/>I'm your 24/7 virtual assistant. I can answer questions about our services, coverage areas across Texas, careers, pricing, and more.<br/><br/>How can I help you today?`);
    }
    setTimeout(() => input.focus(), 300);
  }

  function closeChat() { win.classList.remove('open'); }

  document.getElementById('cjc-chat-btn').addEventListener('click', () => {
    win.classList.contains('open') ? closeChat() : openChat();
  });
  document.getElementById('cjc-chat-close').addEventListener('click', closeChat);

  win.querySelector('#cjc-chat-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    addMsg(escapeHtml(val), 'user');
    input.value = '';
    askAI(val);
  });

  win.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.q;
      addMsg(q, 'user');
      botReply(getResponse(q));
    });
  });

  // Show badge after 4 seconds to draw attention
  setTimeout(() => {
    if (!opened) badge.style.display = 'flex';
  }, 4000);

})();
