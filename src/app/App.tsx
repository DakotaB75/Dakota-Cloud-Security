import { useState, useEffect, useRef, useCallback } from "react";
import {
  Shield, Cloud, Search, Menu, X, ExternalLink, Youtube, Tag,
  BookOpen, Home, Mail, Github, Linkedin, Instagram, Twitter,
  ArrowRight, Eye, Layers, Terminal, CheckCircle2, Mic,
  Briefcase, FileText, Bug, Wrench, Users, Code2, Zap, Award,
  ChevronDown, Send, ShieldCheck, GraduationCap, HeadphonesIcon,
  ScanSearch, Filter,
} from "lucide-react";

interface Article {
  id: number;
  title: string;
  date: string;
  category: string;
  read: string;
  color: string;
  diff: "Expert" | "Advanced" | "Intermediate";
  tags: string[];
}

interface Video {
  id: number;
  title: string;
  dur: string;
  views: string;
  thumb: string;
  tags: string[];
}


function useCountUp(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const id = requestAnimationFrame(function step(now) {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - t, 3)) * target));
      if (t < 1) requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(id);
  }, [target, duration, started]);
  return count;
}

function useInView(ref: React.RefObject<Element | null>, threshold = 0.2) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}


const NAV_LINKS = [
  { label: "Home",       href: "#home",       icon: Home },
  { label: "Artículos",  href: "#articles",   icon: BookOpen },
  { label: "Categorías", href: "#categories", icon: Layers },
  { label: "Etiquetas",  href: "#tags",        icon: Tag },
  { label: "Videos",     href: "#videos",     icon: Youtube },
];

const TERMINAL_LINES = [
  { delay: 0,    text: "$ az login --tenant d******",            color: "#80B6FF" },
  { delay: 700,  text: "  ✓ Authentication successful · tenant verified",    color: "#4ade80" },
  { delay: 1400, text: "$ az group create --name demo-rg --location eastus", color: "#80B6FF" },
  { delay: 2300, text: "  ✓ Resource Group created: demo-rg",                 color: "#4ade80" },
  { delay: 3000, text: "$ az network vnet create --name demo-vnet",          color: "#80B6FF" },
  { delay: 3700, text: "  ✓ Virtual Network configured",                      color: "#4ade80" },
  { delay: 4400, text: "$ az network nsg create --name demo-nsg",            color: "#80B6FF" },
  { delay: 5100, text: "  ✓ Network Security Group deployed",                 color: "#4ade80" },
  { delay: 5800, text: "$ az vm create --name linux-vm --image UbuntuLTS",   color: "#80B6FF" },
  { delay: 6500, text: "  ✓ Virtual Machine deployed · SSH access ready",     color: "#4ade80" },
  { delay: 7200, text: "$ az webapp create --name demo-app --runtime docker",color: "#80B6FF" },
  { delay: 7900, text: "  ✓ App Service running Docker container",            color: "#4ade80" },
  { delay: 8600, text: "$ terraform apply",                                  color: "#80B6FF" },
  { delay: 9300, text: "  ✓ Infrastructure provisioned with Terraform",       color: "#4ade80" },
];

const ALL_ARTICLES: Article[] = [
  { id: 1,  title: "VS Code & Beyond: Tecnología práctica y comunidad",           date: "Publicado hace 3 meses", category: "Newsletter",        read: "8 min",  color: "#A5B4FC", diff: "Advanced",     tags: ["VSCode", "Azure", "Community"] },
  { id: 2,  title: "Conversaciones con MVPs y empleados de Microsoft",      date: "Junio 2026", category: "Entrevistas", read: "Confirmado", color: "#78D8F4", diff: "Expert",       tags: ["MVP", "Microsoft", "Community"] },
  { id: 3,  title: "What It Actually Takes to Get Code Merged into Large GitHub Repositories",          date: "Publicado hace 6 meses", category: "Newsletter",    read: "10 min", color: "#3B80F4", diff: "Intermediate",  tags: ["OpenSource", "GitHub", "SoftwareEngineering"] },

];

const ALL_VIDEOS: Video[] = [
  { id: 1, title: "-",      dur: "-", views: "-", thumb: "photo-1558494949-ef010cbdcc31", tags: ["-"] },
  { id: 2, title: "-",  dur: "-", views: "-", thumb: "photo-1558494949-ef010cbdcc31", tags: ["-"] },
  { id: 3, title: "-",          dur: "-", views: "-", thumb: "photo-1558494949-ef010cbdcc31", tags: ["-"] },
  { id: 4, title: "-",                    dur: "-", views: "-", thumb: "photo-1558494949-ef010cbdcc31", tags: ["-"] },
  { id: 5, title: "-",           dur: "-", views: "-", thumb: "photo-1558494949-ef010cbdcc31", tags: ["-"] },
  { id: 6, title: "-",        dur: "-", views: "-", thumb: "photo-1558494949-ef010cbdcc31", tags: ["-"] },
];

const EXPERIENCE_BLOCKS = [
  { icon: Mic,       title: "Apariciones",      color: "#3B80F4", glow: "rgba(59,128,244,.35)",   count: "12+",    items: ["Sesión inaugural del Microsoft Speakers Hub en Español 2026", "Sesión de consolidación del Microsoft Speakers Hub en Español 2026"] },
  { icon: Briefcase, title: "Experiencia",       color: "#78D8F4", glow: "rgba(120,216,244,.30)",  count: "5 años", items: ["Microsoft Speakers Hub Community Member", "Technical Student Mentor Teclab", "Information Systems Analyst"] },
{ 
  icon: FileText,  
  title: "Material de Apoyo", 
  color: "#80B6FF", 
  glow: "rgba(128,182,255,.30)",  
  count: "34 docs",
  items: [
    "Azure para Arquitectos",
    "Microsoft Azure - Examen AZ-104",
    "Azure Firewall",
    "Fundamentals of Azure Essentials"
  ] 
},

  { 
  icon: GraduationCap,       
  title: "Microsoft Learn",              
  color: "#2563eb", 
  glow: "rgba(37,99,235,.25)",  
  count: "4 módulos", 
  items: [
    "Azure con GitHub Actions",
    "Soluciones de red AZ-700",
    "Seguridad, cumplimiento e identidad",
    "Azure App Service"
  ] 
},

{ 
  icon: Code2,     
  title: "Proyectos GitHub",    
  color: "#a78bfa", 
  glow: "rgba(167,139,250,.25)",  
  count: "38 repos", 
  items: [
    "Azure-Security-Fabric",
    "azure-infrastructure-foundation-lab",
    "Terraform DevOps Platform",
    "catalogo1830-cloud-edition"
  ] 
},
{ 
  icon: Wrench,    
  title: "Herramientas",       
  color: "#34d399", 
  glow: "rgba(52,211,153,.25)",   
  count: "8",    
  items: [
    "VS Code - GitHub Desktop",
    "Windows PowerShell",
    "Azure Portal",
    "Docker"
  ] 
},

{ 
  icon: Users,     
  title: "Asistencias",        
  color: "#fbbf24", 
  glow: "rgba(251,191,36,.25)",   
  count: "En curso",     
  items: [
    "Asistente docente - Universidad Siglo 21",
  ] 
},
{ 
  icon: Award,     
  title: "Contribuciones oficiales",    
  color: "#f472b6", 
  glow: "rgba(244,114,182,.25)",  
  count: "12",     
  items: [
    "PR #9191 Platform/workspace variables Microsoft",
    "PR #9215 Bracket matching scope Microsoft",
    "PR #9214 LineComment formats Microsoft"
  ] 
},


];
const SERVICES = [
  { 
    icon: ScanSearch,      
    title: "Auditorías de Seguridad (asistente)",  
    desc: "Apoyo en evaluaciones de vulnerabilidades en Azure, elaborando informes ejecutivos y planes de remediación junto al consultor principal.",  
    color: "#3B80F4", 
    glow: "rgba(59,128,244,.4)",   
    badge: "Auditorías",
    link: "#contact"
  },
  { 
    icon: Cloud,           
    title: "Protección de Datos en Azure (asistente)",     
    desc: "Colaboración en la implementación de medidas de seguridad y preparación de presentaciones en PowerPoint para explicar resultados a clientes.",               
    color: "#78D8F4", 
    glow: "rgba(120,216,244,.35)", 
    badge: "Cloud",
    link: "#contact"
  },
  { 
    icon: HeadphonesIcon,  
    title: "Soporte Preventivo (asistente)",          
    desc: "Mantenimiento en entornos Microsoft/Azure, adaptado a horarios internacionales, en coordinación con la consultoría.", 
    color: "#80B6FF", 
    glow: "rgba(128,182,255,.35)", 
    badge: "Soporte",
    link: "#contact"
  },
  { 
    icon: GraduationCap,   
    title: "Capacitación Asistida",             
    desc: "Participación como asistente en entrenamientos de Microsoft 365, apoyando a equipos técnicos en su formación.",                 
    color: "#a78bfa", 
    glow: "rgba(167,139,250,.35)", 
    badge: "Training",
    link: "#contact"
  },
];


const ALL_TAGS = [
  "VSCode",
  "Azure",
  "Community",
  "MVP",
  "Microsoft",
  "OpenSource",
  "GitHub",
  "GitHubCopilot",
  "SoftwareEngineering",
  "Podcast",
  "Cloud",
  "DevOps",
  "Consultoria"
];


const SOCIAL_LINKS = [
  { icon: Linkedin,  label: "LinkedIn",  color: "#0A66C2", url: "https://www.linkedin.com/in/dakota-bazan" },
  { icon: Github,    label: "GitHub",    color: "#E6EFF7", url: "https://github.com/DakotaB75" },
  { icon: Instagram, label: "Instagram", color: "#E1306C" },
  { icon: Youtube,   label: "YouTube",   color: "#FF0000" },
  { icon: Twitter,   label: "Twitter",   color: "#1DA1F2" },
];



const GLOBAL_CSS = `
  @keyframes fadeInUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
  @keyframes termLine  { from{opacity:0;transform:translateY(4px)}  to{opacity:1;transform:none} }
  @keyframes gradMove  { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes orbFloat  { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-22px) scale(1.04)} }
  @keyframes pulseDot  { 0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,.55)} 50%{box-shadow:0 0 0 7px rgba(74,222,128,0)} }
  @keyframes shimmer   { 0%{opacity:.4} 50%{opacity:1} 100%{opacity:.4} }
  .scrollbar-none::-webkit-scrollbar{display:none}
  .scrollbar-none{scrollbar-width:none}
  ::placeholder{color:rgba(165,180,252,.4)}
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
`;


function AnimatedTerminal() {
  const [shown, setShown] = useState<number[]>([]);
  const [blink, setBlink] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers = TERMINAL_LINES.map(({ delay }, i) =>
      setTimeout(() => setShown((p) => [...p, i]), delay + 400)
    );
    const blinkId = setInterval(() => setBlink((b) => !b), 530);
    return () => { timers.forEach(clearTimeout); clearInterval(blinkId); };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [shown]);

  return (
  <div style={{
    borderRadius: 16, overflow: "hidden",
    background: "rgba(4,7,13,.88)",
    border: "1px solid rgba(128,182,255,.14)",
    boxShadow: "0 0 48px rgba(59,128,244,.1),inset 0 1px 0 rgba(255,255,255,.04)",
    backdropFilter: "blur(8px)",
  }}>
  <div style={{
  display: "flex", alignItems: "center", gap: 8,
  padding: "10px 16px", borderBottom: "1px solid rgba(128,182,255,.1)",
  background: "rgba(255,255,255,.025)",
}}>
<span style={{ fontSize: 12, color: "#3B80F4" }}>&gt;_</span>

  <span style={{ fontSize: 13, fontWeight: 500, color: "#A5B4FC" }}>Azure Cloud Shell</span>

</div>

    <div className="scrollbar-none" style={{
      padding: "16px 18px", minHeight: 240, maxHeight: 280,
      overflowY: "auto", fontFamily: "monospace", fontSize: 13, lineHeight: 1.7,
      display: "flex", flexDirection: "column", gap: 2,
    }}>
      {TERMINAL_LINES.map((line, i) =>
        shown.includes(i) ? (
          <div key={i} style={{ color: line.color, animation: "termLine .25s ease both" }}>
            {line.text}
          </div>
        ) : null
      )}
      {shown.length < TERMINAL_LINES.length && (
        <span style={{
          display: "inline-block", width: 8, height: "1.1em",
          background: "#80B6FF", opacity: blink ? 1 : 0,
          transition: "opacity .08s", borderRadius: 1,
          verticalAlign: "middle",
        }} />
      )}
      <div ref={bottomRef} />
    </div>
  </div>
);
}

function CounterStat({ target, suffix, label, started }: { target: number; suffix: string; label: string; started: boolean }) {
  const n = useCountUp(target, 1800, started);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 700,
        lineHeight: 1.1, marginBottom: 6,
        background: "linear-gradient(135deg,#80B6FF,#78D8F4)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        filter: "drop-shadow(0 0 10px rgba(120,216,244,.45))",
      }}>
        {n}{suffix}
      </div>
      <div style={{ fontSize: 13, fontWeight: 300, color: "#A5B4FC" }}>{label}</div>
    </div>
  );
}

function ServiceCard({ svc }: { svc: typeof SERVICES[0] }) {
  const Icon = svc.icon;
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", borderRadius: 20, padding: "28px 24px",
        display: "flex", flexDirection: "column", gap: 18,
        background: hov ? "rgba(255,255,255,.07)" : "rgba(255,255,255,.035)",
        border: hov ? `1px solid ${svc.color}45` : "1px solid rgba(128,182,255,.09)",
        backdropFilter: "blur(14px)",
        boxShadow: hov ? `0 0 48px ${svc.glow},0 20px 48px rgba(0,0,0,.35)` : "none",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        transition: "all .3s cubic-bezier(.4,.2,1)",
        cursor: "pointer",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 24, right: 24, height: 1, borderRadius: 999,
        background: `linear-gradient(90deg,transparent,${svc.color},transparent)`,
        opacity: hov ? 1 : 0, transition: "opacity .3s",
      }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: `${svc.color}18`, border: `1px solid ${svc.color}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: hov ? "scale(1.1)" : "scale(1)",
          boxShadow: hov ? `0 0 22px ${svc.glow}` : "none",
          transition: "all .3s",
        }}>
          <Icon size={26} style={{ color: svc.color }} strokeWidth={1.6} />
        </div>
        <span style={{
          fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 8,
          textTransform: "uppercase" as const, letterSpacing: ".08em",
          background: `${svc.color}15`, color: svc.color,
        }}>{svc.badge}</span>
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#E6EFF7", marginBottom: 8 }}>{svc.title}</h3>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: "#A5B4FC", fontWeight: 300 }}>{svc.desc}</p>
      </div>
     <a
  href="#contact"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: 13,
    fontWeight: 600,
    color: svc.color,
    textDecoration: "none",
    transition: "gap .2s",
  }}
  onMouseEnter={(e) => {
    (e.currentTarget as HTMLAnchorElement).style.gap = "14px";
  }}
  onMouseLeave={(e) => {
    (e.currentTarget as HTMLAnchorElement).style.gap = "8px";
  }}
>
  Consultar <ArrowRight size={15} />
</a>

    </div>
  );
}

function MagicContactCard() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("https://formsubmit.co/ajax/dakota@anessiconsultoria.com.ar", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Contacto desde Portfolio: ${form.name}`,
        }),
      });
    } catch (_) { }
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const inputBase: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 12, fontSize: 14,
    background: "rgba(255,255,255,.05)", border: "1px solid rgba(128,182,255,.15)",
    color: "#E6EFF7", outline: "none", fontFamily: "inherit",
    transition: "all .2s cubic-bezier(.4,.2,1)",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(59,128,244,.55)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,128,244,.12)";
    e.currentTarget.style.background = "rgba(59,128,244,.05)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(128,182,255,.15)";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.background = "rgba(255,255,255,.05)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      style={{
        position: "relative", borderRadius: 28, overflow: "hidden",
        background: "rgba(255,255,255,.03)",
        border: "1px solid rgba(128,182,255,.12)",
        backdropFilter: "blur(20px)",
      }}
    >
      {}
      <div style={{
        pointerEvents: "none", position: "absolute", inset: 0,
        background: `radial-gradient(380px circle at ${mouse.x}px ${mouse.y}px,rgba(59,128,244,.12) 0%,transparent 70%)`,
        transition: "background .1s",
      }} />
      {}
      <div style={{
        position: "absolute", top: 0, left: 32, right: 32, height: 1,
        background: "linear-gradient(90deg,transparent,rgba(59,128,244,.65),rgba(120,216,244,.45),transparent)",
      }} />

      <div style={{ position: "relative", padding: "48px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "6px 16px", borderRadius: 999, marginBottom: 20,
            background: "rgba(59,128,244,.1)", border: "1px solid rgba(59,128,244,.28)",
            color: "#80B6FF", fontSize: 12, fontWeight: 500,
          }}>
            <Mail size={12} />
            Disponible para consultoría
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: "#E6EFF7", marginBottom: 10 }}>
            Hablemos de Seguridad
          </h2>
          <p style={{ fontSize: 14, fontWeight: 300, color: "#A5B4FC", maxWidth: 400, margin: "0 auto" }}>
            Como socia en la consultoría, estoy disponible para colaborar en proyectos de seguridad en la nube,
            revisiones y charlas técnicas, aportando con honestidad y ganas de crecer.
          </p>
        </div>

        {sent ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "24px 0", animation: "fadeInUp .4s ease both" }}>
            <div style={{
              width: 64, height: 64, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(74,222,128,.1)", border: "1px solid rgba(74,222,128,.3)",
            }}>
              <CheckCircle2 size={32} style={{ color: "#4ade80" }} />
            </div>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#4ade80" }}>Mensaje enviado correctamente</p>
            <p style={{ fontSize: 13, color: "#A5B4FC" }}>Recibirás respuesta en menos de 24 h.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} style={{ maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <input
                required type="text" placeholder="Nombre y Apellido"
                value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                style={inputBase} onFocus={onFocus} onBlur={onBlur}
              />
              <input
                required type="email" placeholder="Correo electrónico"
                value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                style={inputBase} onFocus={onFocus} onBlur={onBlur}
              />
            </div>
            <textarea
              required rows={5} placeholder="Cuéntame sobre tu proyecto o consulta..."
              value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              style={{ ...inputBase, resize: "none" }} onFocus={onFocus} onBlur={onBlur}
            />
            <button
              type="submit" disabled={sending}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "14px 24px", borderRadius: 16, fontSize: 14, fontWeight: 600,
                background: sending ? "rgba(59,128,244,.5)" : "linear-gradient(135deg,#3B80F4,#1d5fd4)",
                color: "#fff", border: "none", cursor: sending ? "not-allowed" : "pointer",
                boxShadow: "0 0 28px rgba(59,128,244,.38),inset 0 1px 0 rgba(255,255,255,.12)",
                transition: "all .3s cubic-bezier(.4,.2,1)",
              }}
              onMouseEnter={(e) => {
                if (sending) return;
                const b = e.currentTarget;
                b.style.boxShadow = "0 0 52px rgba(59,128,244,.7),inset 0 1px 0 rgba(255,255,255,.18)";
                b.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget;
                b.style.boxShadow = "0 0 28px rgba(59,128,244,.38),inset 0 1px 0 rgba(255,255,255,.12)";
                b.style.transform = "translateY(0)";
              }}
            >
              {sending ? (
                <><span style={{ animation: "shimmer 1s infinite" }}>Enviando...</span></>
              ) : (
                <><Send size={15} /> Enviar Mensaje</>
              )}
            </button>
            <p style={{ fontSize: 11, textAlign: "center", color: "#A5B4FC", fontWeight: 300 }}>
              Tu mensaje será enviado a <span style={{ color: "#80B6FF" }}>dakota@******.**.*r</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}


function SearchOverlay({ query, onClose }: { query: string; onClose: () => void }) {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  const matchedArticles = ALL_ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
  const matchedVideos = ALL_VIDEOS.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      v.tags.some((t) => t.toLowerCase().includes(q))
  );

  const total = matchedArticles.length + matchedVideos.length;

  return (
    <div style={{
      position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
      borderRadius: 16, overflow: "hidden",
      background: "rgba(10,14,22,.97)",
      border: "1px solid rgba(128,182,255,.18)",
      backdropFilter: "blur(24px)",
      boxShadow: "0 16px 48px rgba(0,0,0,.6)",
      maxHeight: 420, overflowY: "auto",
      animation: "fadeInUp .2s ease both",
      zIndex: 100,
    }} className="scrollbar-none">
      {total === 0 ? (
        <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
          <Search size={28} style={{ color: "#A5B4FC", opacity: .5 }} />
          <p style={{ fontSize: 14, fontWeight: 500, color: "#E6EFF7" }}>
            No se encontraron artículos relacionados.
          </p>
          <p style={{ fontSize: 12, fontWeight: 300, color: "#A5B4FC", maxWidth: 320 }}>
            Revise nuestras categorías o contacte soporte para orientación personalizada.
          </p>
          <button
            onClick={() => { onClose(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              marginTop: 6, padding: "8px 18px", borderRadius: 10, fontSize: 12, fontWeight: 600,
              background: "rgba(59,128,244,.15)", border: "1px solid rgba(59,128,244,.3)",
              color: "#80B6FF", cursor: "pointer",
            }}
          >
            Contactar soporte
          </button>
        </div>
      ) : (
        <div style={{ padding: "12px 0" }}>
          <div style={{ padding: "6px 16px 10px", fontSize: 10, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: ".1em", color: "#A5B4FC" }}>
            {total} resultado{total !== 1 ? "s" : ""} para "{query}"
          </div>
          {matchedArticles.length > 0 && (
            <>
              <div style={{ padding: "4px 16px 6px", fontSize: 10, fontWeight: 600, color: "#78D8F4", textTransform: "uppercase" as const, letterSpacing: ".08em" }}>
                Artículos
              </div>
              {matchedArticles.map((a) => (
                <button
                  key={a.id}
                  onClick={() => { onClose(); document.querySelector("#articles")?.scrollIntoView({ behavior: "smooth" }); }}
                  style={{
                    width: "100%", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10,
                    background: "transparent", border: "none", cursor: "pointer", textAlign: "left" as const,
                    transition: "background .15s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(59,128,244,.08)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  <BookOpen size={13} style={{ color: a.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, color: "#E6EFF7", fontWeight: 500 }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: "#A5B4FC", fontWeight: 300 }}>{a.category} · {a.read}</div>
                  </div>
                </button>
              ))}
            </>
          )}
          {matchedVideos.length > 0 && (
            <>
              <div style={{ padding: "10px 16px 6px", fontSize: 10, fontWeight: 600, color: "#78D8F4", textTransform: "uppercase" as const, letterSpacing: ".08em" }}>
                Videos
              </div>
              {matchedVideos.map((v) => (
                <button
                  key={v.id}
                  onClick={() => { onClose(); document.querySelector("#videos")?.scrollIntoView({ behavior: "smooth" }); }}
                  style={{
                    width: "100%", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10,
                    background: "transparent", border: "none", cursor: "pointer", textAlign: "left" as const,
                    transition: "background .15s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(59,128,244,.08)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  <Youtube size={13} style={{ color: "#f87171", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, color: "#E6EFF7", fontWeight: 500 }}>{v.title}</div>
                    <div style={{ fontSize: 11, color: "#A5B4FC", fontWeight: 300 }}>{v.dur} · {v.views} views</div>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}


export default function App() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ]       = useState("");
  const [active, setActive]         = useState("home");
  const [activeTag, setActiveTag]   = useState<string | null>(null);

  const statsRef    = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQ("");
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const go = (href: string, label?: string) => {
    if (label) setActive(label.toLowerCase());
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredArticles = activeTag
    ? ALL_ARTICLES.filter((a) => a.tags.includes(activeTag))
    : ALL_ARTICLES;
  const filteredVideos = activeTag
    ? ALL_VIDEOS.filter((v) => v.tags.includes(activeTag))
    : ALL_VIDEOS;

  return (
    <div style={{
      fontFamily: '"Segoe UI Variable","Segoe UI",Inter,system-ui,sans-serif',
      background: "#0D1117", color: "#E6EFF7", minHeight: "100vh",
    }}>
      <style>{GLOBAL_CSS}</style>

      {}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", width: 750, height: 750, borderRadius: "50%", background: "radial-gradient(circle,#3B80F4 0%,transparent 65%)", top: "-18%", right: "-10%", opacity: .15, animation: "orbFloat 14s ease-in-out infinite", filter: "blur(2px)" }} />
        <div style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle,#78D8F4 0%,transparent 65%)", bottom: "4%", left: "-12%", opacity: .08, animation: "orbFloat 18s ease-in-out 5s infinite" }} />
        <div style={{ position: "absolute", inset: 0, opacity: .022, backgroundImage: "linear-gradient(rgba(128,182,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(128,182,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      </div>

      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "center", padding: "14px 16px 0" }}>
        <nav style={{
          width: "100%", maxWidth: 1100, position: "relative",
          backdropFilter: scrolled ? "blur(28px) saturate(200%)" : "blur(14px)",
          WebkitBackdropFilter: scrolled ? "blur(28px) saturate(200%)" : "blur(14px)",
          background: scrolled ? "rgba(13,17,23,.92)" : "rgba(13,17,23,.55)",
          border: "1px solid rgba(128,182,255,.14)",
          borderRadius: 20,
          boxShadow: scrolled ? "0 8px 48px rgba(0,0,0,.55)" : "0 4px 28px rgba(0,0,0,.28)",
          padding: "10px 20px",
          transition: "all .3s cubic-bezier(.4,.2,1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>

            <a href="#home" onClick={(e) => { e.preventDefault(); go("#home","home"); }}
              style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
              <div
                style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg,#3B80F4,#78D8F4)", boxShadow: "0 0 22px rgba(59,128,244,.6)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .3s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.12)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
              >
                <Shield size={17} color="#fff" strokeWidth={2.5} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#E6EFF7", letterSpacing: "-.01em" }}>Dakota</span>
                <span style={{ fontWeight: 300, fontSize: 11, color: "#A5B4FC" }}>Microsoft Cloud Security</span>
              </div>
            </a>

            <ul style={{ display: "none", margin: 0, padding: 0, listStyle: "none" }} className="desktop-nav">
              {NAV_LINKS.map(({ label, href }) => {
                const isA = active === label.toLowerCase();
                return (
                  <li key={label} style={{ display: "inline-block" }}>
                    <a href={href} onClick={(e) => { e.preventDefault(); go(href, label); }}
                      style={{
                        display: "inline-flex", alignItems: "center", padding: "7px 14px",
                        borderRadius: 12, fontSize: 13, fontWeight: 500, textDecoration: "none",
                        color: isA ? "#80B6FF" : "#A5B4FC",
                        background: isA ? "rgba(59,128,244,.1)" : "transparent",
                        border: isA ? "1px solid rgba(59,128,244,.22)" : "1px solid transparent",
                        transition: "all .2s cubic-bezier(.4,.2,1)",
                      }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; if (!isA) { el.style.background = "rgba(59,128,244,.08)"; el.style.color = "#80B6FF"; } }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; if (!isA) { el.style.background = "transparent"; el.style.color = "#A5B4FC"; } }}
                    >{label}</a>
                  </li>
                );
              })}
            </ul>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div ref={searchWrapRef} style={{ position: "relative" }}>
                {searchOpen ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input
                      autoFocus value={searchQ}
                      onChange={(e) => setSearchQ(e.target.value)}
                      onKeyDown={(e) => e.key === "Escape" && (setSearchOpen(false), setSearchQ(""))}
                      placeholder="Buscar artículos, videos..."
                      style={{
                        width: 220, padding: "7px 12px", borderRadius: 10, fontSize: 13,
                        background: "rgba(255,255,255,.06)", border: "1px solid rgba(59,128,244,.32)",
                        color: "#E6EFF7", outline: "none",
                      }}
                    />
                    <button onClick={() => { setSearchOpen(false); setSearchQ(""); }}
                      style={{ padding: 6, borderRadius: 8, background: "transparent", border: "none", color: "#A5B4FC", cursor: "pointer" }}>
                      <X size={16} />
                    </button>
                    <SearchOverlay query={searchQ} onClose={() => { setSearchOpen(false); setSearchQ(""); }} />
                  </div>
                ) : (
                  <button onClick={() => setSearchOpen(true)}
                    style={{ padding: 8, borderRadius: 10, background: "transparent", border: "none", color: "#A5B4FC", cursor: "pointer", transition: "all .2s" }}
                    onMouseEnter={(e) => { const b = e.currentTarget as HTMLElement; b.style.background = "rgba(59,128,244,.1)"; b.style.color = "#80B6FF"; b.style.filter = "drop-shadow(0 0 6px rgba(59,128,244,.8))"; }}
                    onMouseLeave={(e) => { const b = e.currentTarget as HTMLElement; b.style.background = "transparent"; b.style.color = "#A5B4FC"; b.style.filter = "none"; }}
                  >
                    <Search size={18} />
                  </button>
                )}
              </div>

              <a href="#contact" onClick={(e) => { e.preventDefault(); go("#contact","contact"); }}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 18px", borderRadius: 12,
                  background: "linear-gradient(135deg,#3B80F4,#1d5fd4)",
                  color: "#fff", fontSize: 13, fontWeight: 600, textDecoration: "none",
                  boxShadow: "0 0 22px rgba(59,128,244,.32),inset 0 1px 0 rgba(255,255,255,.12)",
                  transition: "all .3s cubic-bezier(.4,.2,1)",
                  whiteSpace: "nowrap" as const,
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 0 42px rgba(59,128,244,.65),inset 0 1px 0 rgba(255,255,255,.18)"; el.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 0 22px rgba(59,128,244,.32),inset 0 1px 0 rgba(255,255,255,.12)"; el.style.transform = "translateY(0)"; }}
              >
                 Contacto
              </a>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menú"
                style={{ padding: 8, borderRadius: 10, background: "transparent", border: "none", color: "#A5B4FC", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(128,182,255,.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 12, marginBottom: 8, background: "rgba(255,255,255,.04)" }}>
                <Search size={14} style={{ color: "#A5B4FC" }} />
                <input
                  value={searchQ} onChange={(e) => setSearchQ(e.target.value)}
                  placeholder="Buscar..."
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 13, color: "#E6EFF7" }}
                />
              </div>
              {NAV_LINKS.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} onClick={(e) => { e.preventDefault(); go(href, label); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                    borderRadius: 12, marginBottom: 4, fontSize: 14, fontWeight: 500,
                    textDecoration: "none",
                    color: active === label.toLowerCase() ? "#80B6FF" : "#A5B4FC",
                    background: active === label.toLowerCase() ? "rgba(59,128,244,.1)" : "transparent",
                    transition: "all .2s",
                  }}
                >
                  <Icon size={15} />{label}
                </a>
              ))}
              <a href="#contact" onClick={(e) => { e.preventDefault(); go("#contact","contact"); }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 12px", borderRadius: 12, marginTop: 8, background: "linear-gradient(135deg,#3B80F4,#1d5fd4)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}
              >
                Contacto
              </a>
            </div>
          )}
        </nav>
        <style>{`
          @media (min-width: 900px) {
            .desktop-nav { display: flex !important; gap: 2px; }
          }
        `}</style>
      </header>

      <section id="home" style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "120px 20px 80px" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0D1117 0%,#091530 30%,#060e1e 55%,#0D1117 100%)", backgroundSize: "400% 400%", animation: "gradMove 18s ease infinite" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 999, marginBottom: 28, background: "rgba(59,128,244,.1)", border: "1px solid rgba(59,128,244,.3)", color: "#80B6FF", fontSize: 12, fontWeight: 500, animation: "fadeInUp .7s ease both" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", animation: "pulseDot 2s infinite" }} />
            Microsoft Speaker Hub (ES) · GitHub & GitHub Copilot
          </div>

          <h1 style={{ fontSize: "clamp(2.4rem,7vw,5rem)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-.025em", color: "#E6EFF7", marginBottom: 24, animation: "fadeInUp .8s .15s ease both" }}>
            Microsoft Cloud{" "}
            <span style={{ background: "linear-gradient(135deg,#3B80F4 0%,#78D8F4 55%,#80B6FF 100%)", backgroundSize: "200% 200%", animation: "gradMove 6s ease infinite", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 24px rgba(59,128,244,.38))" }}>
              Azure Specialist
            </span>
            <br />
          </h1>

          <p style={{ fontSize: "clamp(.95rem,2vw,1.15rem)", fontWeight: 300, lineHeight: 1.7, color: "#A5B4FC", maxWidth: 620, margin: "0 auto 36px", animation: "fadeInUp .8s .3s ease both" }}>
            Comparto conocimiento, experiencias y recursos sobre seguridad en la nube con Microsoft Azure.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", animation: "fadeInUp .8s .45s ease both" }}>
            <a href="#articles" onClick={(e) => { e.preventDefault(); go("#articles","artículos"); }}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 16, background: "linear-gradient(135deg,#3B80F4,#1d5fd4)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 0 36px rgba(59,128,244,.45),inset 0 1px 0 rgba(255,255,255,.12)", transition: "all .3s cubic-bezier(.4,.2,1)" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 0 60px rgba(59,128,244,.7),inset 0 1px 0 rgba(255,255,255,.18)"; el.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 0 36px rgba(59,128,244,.45),inset 0 1px 0 rgba(255,255,255,.12)"; el.style.transform = "translateY(0)"; }}
            >
              Explorar Artículos <ArrowRight size={16} />
            </a>
            <a href="#about" onClick={(e) => { e.preventDefault(); go("#about"); }}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 16, background: "rgba(255,255,255,.04)", color: "#80B6FF", fontSize: 14, fontWeight: 500, textDecoration: "none", border: "1px solid rgba(128,182,255,.2)", backdropFilter: "blur(8px)", transition: "all .3s cubic-bezier(.4,.2,1)" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(59,128,244,.1)"; el.style.borderColor = "rgba(59,128,244,.4)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,.04)"; el.style.borderColor = "rgba(128,182,255,.2)"; }}
            >
              Sobre Dakota
            </a>
          </div>

          <div ref={statsRef} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px 32px", maxWidth: 480, margin: "72px auto 0" }}>
            <CounterStat target={78}  suffix="+" label="Artículos"  started={statsInView} />
            <CounterStat target={12}  suffix="K+" label="Lectores"   started={statsInView} />
            <CounterStat target={6}   suffix=""  label="CVEs"        started={statsInView} />
          </div>
        </div>

        <a href="#about" onClick={(e) => { e.preventDefault(); go("#about"); }}
          style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "#A5B4FC", opacity: .45, textDecoration: "none", fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase" as const }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = ".8")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = ".45")}
        >
          Scroll <ChevronDown size={15} />
        </a>
      </section>

      <section id="about" style={{ position: "relative", zIndex: 1, padding: "96px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 48, alignItems: "center" }}>

          <div style={{ borderRadius: 24, overflow: "hidden", background: "rgba(255,255,255,.03)", border: "1px solid rgba(128,182,255,.12)", backdropFilter: "blur(16px)" }}>
            <div style={{ height: 3, background: "linear-gradient(90deg,#3B80F4,#78D8F4,#80B6FF)" }} />
            <div style={{ padding: "36px 32px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
                <div style={{ position: "relative" }}>
                  <div style={{ width: 120, height: 120, borderRadius: 28, overflow: "hidden", border: "3px solid rgba(59,128,244,.45)", boxShadow: "0 0 40px rgba(59,128,244,.35)" }}>
                   <img
  src="/Dakota-Cloud-Security/assets/images/profile/Foto_Profesional.jpg"
  alt="Dakota Bazan — Cloud Security Specialist"
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>
                  </div>
                  <span style={{ position: "absolute", bottom: -2, right: -2, width: 22, height: 22, borderRadius: "50%", background: "#4ade80", border: "3px solid #0D1117", boxShadow: "0 0 10px rgba(74,222,128,.75)", animation: "pulseDot 2s infinite" }} />
                </div>
                <div style={{ marginTop: 16, textAlign: "center" }}>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: "#E6EFF7", marginBottom: 4 }}>Dakota Bazan</h2>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#80B6FF", marginBottom: 3 }}>Cloud Security Azure Specialist</p>
                  <p style={{ fontSize: 12, fontWeight: 300, color: "#A5B4FC" }}>Socia Anessi Consultoría Informática</p>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 24 }}>
                {["Azure Portal","M365","SSR System Analyst","DevOps"].map((s) => (
                  <span key={s} style={{ fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 8, background: "rgba(59,128,244,.1)", border: "1px solid rgba(59,128,244,.2)", color: "#80B6FF" }}>{s}</span>
                ))}
              </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              {SOCIAL_LINKS.map(({ icon: Icon, label, color, url }) => (
                <button
                  key={label}
                  title={label}
                  style={{ 
                    width: 42, 
                    height: 42, 
                    borderRadius: 12, 
                    border: "1px solid rgba(128,182,255,.1)", 
                    background: "rgba(255,255,255,.04)", 
                    color: "#A5B4FC", 
                    cursor: url ? "pointer" : "default", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    transition: "all .22s cubic-bezier(.4,.2,1)" 
                  }}
                  onClick={() => {
                    if (url) {
                      window.open(url, "_blank"); // solo abre si existe url
                    }
                  }}
                  onMouseEnter={(e) => { 
                    const b = e.currentTarget as HTMLElement; 
                    b.style.background = `${color}18`; 
                    b.style.borderColor = `${color}50`; 
                    b.style.color = color; 
                    b.style.boxShadow = `0 0 18px ${color}35`; 
                    b.style.transform = "translateY(-3px) scale(1.1)"; 
                  }}
                  onMouseLeave={(e) => { 
                    const b = e.currentTarget as HTMLElement; 
                    b.style.background = "rgba(255,255,255,.04)"; 
                    b.style.borderColor = "rgba(128,182,255,.1)"; 
                    b.style.color = "#A5B4FC"; 
                    b.style.boxShadow = "none"; 
                    b.style.transform = "translateY(0) scale(1)"; 
                  }}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
            </div>

              <div style={{
              padding: "14px 28px",
              borderTop: "1px solid rgba(128,182,255,.08)",
              background: "rgba(0,0,0,.18)",
              display: "flex",
              flexDirection: "column",  
              alignItems: "center",     
              gap: 12                   
            }}>
              <p style={{
                fontSize: 12,
                fontWeight: 300,
                color: "#A5B4FC",
                textAlign: "center",
                margin: 0               
              }}>
                Objetivos de carrera
              </p>

              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                justifyContent: "center"
              }}>
                {[{l:"AZ-305",c:"#3B80F4"},
                  {l:"SC-100",c:"#78D8F4"},
                  {l:"AZ-400",c:"#80B6FF"},
                  {l:"CISSP",c:"#f87171"},
                  {l:"CISM",c:"#b0f871"},
                  {l:"CCSP",c:"#fbbf24"}].map(({l,c}) => (
                  <span key={l} style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "3px 9px",
                    borderRadius: 6,
                    background: `${c}15`,
                    border: `1px solid ${c}30`,
                    color: c
                  }}>{l}</span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <span
      style={{
        marginLeft: "auto",
        fontSize: 10,
        padding: "2px 10px",
        borderRadius: 999,
        background: "rgba(74,222,128,.1)",
        border: "1px solid rgba(74,222,128,.28)",
        color: "#4ade80",
        fontWeight: 600,
      }}
            >
              ● LIVE
            </span>
          </div>
          <AnimatedTerminal />
          <p
            style={{
              fontSize: 13,
              fontWeight: 300,
              color: "#A5B4FC",
              lineHeight: 1.7,
            }}
          >
            Me dedico a Microsoft Azure diseñando y desplegando App Services y recursos
            cloud.  
            Combino mi experiencia en DevOps con pipelines CI/CD y Terraform para crear
            plataformas escalables.  
            He trabajado en proyectos donde implementé grupos de recursos, redes
            virtuales (VNet) y máquinas virtuales Linux, configurando accesos seguros
            vía SSH.  
            También integré Azure Metrics y Azure Monitor como centro de observabilidad,
            lo que permitió a los clientes mejorar la disponibilidad y detectar
            anomalías en tiempo real.  
            Mi propósito es ayudar a emprendimientos y organizaciones a impulsar su
            negocio con soluciones cloud confiables y prácticas de ingeniería de
            plataformas.
          </p>
        </div>
        </div>

      </section>

      <section id="categories" style={{ position: "relative", zIndex: 1, padding: "80px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 999, marginBottom: 16, background: "rgba(120,216,244,.1)", border: "1px solid rgba(120,216,244,.25)", color: "#78D8F4", fontSize: 11, fontWeight: 500 }}>
              <Zap size={11} />Trayectoria Profesional
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 700, color: "#E6EFF7", marginBottom: 12 }}>Mi experiencia y aprendizajes</h2>
            <p style={{ fontSize: 14, fontWeight: 300, color: "#A5B4FC", maxWidth: 520, margin: "0 auto" }}>Mi recorrido en seguridad cloud con Microsoft: eventos, proyectos, aportes y aprendizajes.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
            {EXPERIENCE_BLOCKS.map((b) => {
              const Icon = b.icon;
              return (
                <article key={b.title}
                  style={{ borderRadius: 18, padding: "22px 20px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(128,182,255,.08)", backdropFilter: "blur(12px)", cursor: "pointer", transition: "all .3s cubic-bezier(.4,.2,1)", position: "relative", overflow: "hidden" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,.06)"; el.style.border = `1px solid ${b.color}38`; el.style.boxShadow = `0 0 44px ${b.glow},0 18px 48px rgba(0,0,0,.32)`; el.style.transform = "translateY(-6px)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,.03)"; el.style.border = "1px solid rgba(128,182,255,.08)"; el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 13, background: `${b.color}16`, border: `1px solid ${b.color}28`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={20} style={{ color: b.color }} strokeWidth={1.7} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 8, background: `${b.color}16`, color: b.color }}>{b.count}</span>
                  </div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: "#E6EFF7", marginBottom: 10 }}>{b.title}</h3>
                  <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                    {b.items.map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 12, color: "#A5B4FC", fontWeight: 300 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: b.color, flexShrink: 0, marginTop: 5 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="services" style={{ position: "relative", zIndex: 1, padding: "80px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 999, marginBottom: 16, background: "rgba(59,128,244,.1)", border: "1px solid rgba(59,128,244,.28)", color: "#80B6FF", fontSize: 11, fontWeight: 500 }}>
              <ShieldCheck size={11} />Servicios & Capacitación
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 700, color: "#E6EFF7", marginBottom: 12 }}>¿En qué puedo ayudarte?</h2>
            <p style={{ fontSize: 14, fontWeight: 300, color: "#A5B4FC", maxWidth: 500, margin: "0 auto" }}>Servicios especializados en seguridad cloud, soporte técnico y formación para organizaciones.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {SERVICES.map((svc) => <ServiceCard key={svc.title} svc={svc} />)}
          </div>
        </div>
      </section>

      <section id="articles" style={{ position: "relative", zIndex: 1, padding: "80px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 44, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 999, marginBottom: 14, background: "rgba(59,128,244,.1)", border: "1px solid rgba(59,128,244,.25)", color: "#80B6FF", fontSize: 11, fontWeight: 500 }}>
                <BookOpen size={11} />Publicaciones
              </div>
              <h2 style={{ fontSize: "clamp(1.7rem,4vw,2.4rem)", fontWeight: 700, color: "#E6EFF7" }}>
                {activeTag ? `Artículos: #${activeTag}` : "Últimos Artículos"}
              </h2>
            </div>
            {activeTag && (
              <button onClick={() => setActiveTag(null)}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 10, background: "rgba(59,128,244,.1)", border: "1px solid rgba(59,128,244,.3)", color: "#80B6FF", fontSize: 12, fontWeight: 500, cursor: "pointer" }}
              >
                <X size={12} /> Quitar filtro
              </button>
            )}
          </div>

          {filteredArticles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 20px", color: "#A5B4FC" }}>
              <Filter size={32} style={{ opacity: .4, marginBottom: 12 }} />
              <p style={{ fontSize: 14 }}>No hay artículos con la etiqueta <strong style={{ color: "#80B6FF" }}>#{activeTag}</strong></p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
              {filteredArticles.map((a) => {
                const diffColor = a.diff === "Expert" ? "#f87171" : a.diff === "Advanced" ? "#fbbf24" : "#4ade80";
                return (
                  <article key={a.id}
                    style={{ borderRadius: 18, padding: "20px 18px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(128,182,255,.08)", backdropFilter: "blur(8px)", cursor: "pointer", transition: "all .3s cubic-bezier(.4,.2,1)" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,.055)"; el.style.borderColor = `${a.color}32`; el.style.transform = "translateY(-3px)"; el.style.boxShadow = `0 8px 36px rgba(0,0,0,.25),0 0 18px ${a.color}14`; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,.03)"; el.style.borderColor = "rgba(128,182,255,.08)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 6, background: `${a.color}16`, color: a.color, textTransform: "uppercase" as const, letterSpacing: ".05em" }}>{a.category}</span>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 6, background: `${diffColor}12`, color: diffColor }}>{a.diff}</span>
                    </div>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: "#E6EFF7", lineHeight: 1.45, marginBottom: 14 }}>{a.title}</h3>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                      {a.tags.slice(0,3).map((t) => (
                        <button key={t} onClick={(e) => { e.stopPropagation(); setActiveTag(t); document.querySelector("#tags")?.scrollIntoView({ behavior: "smooth" }); }}
                          style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: "rgba(128,182,255,.08)", border: "1px solid rgba(128,182,255,.12)", color: "#A5B4FC", cursor: "pointer", transition: "all .15s" }}
                          onMouseEnter={(e) => { const b = e.currentTarget as HTMLElement; b.style.background = "rgba(59,128,244,.12)"; b.style.color = "#80B6FF"; }}
                          onMouseLeave={(e) => { const b = e.currentTarget as HTMLElement; b.style.background = "rgba(128,182,255,.08)"; b.style.color = "#A5B4FC"; }}
                        >#{t}</button>
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <time style={{ fontSize: 11, color: "#A5B4FC", fontWeight: 300 }}>{a.date}</time>
                      <span style={{ fontSize: 11, color: "#A5B4FC", fontWeight: 300 }}>{a.read}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section id="tags" style={{ position: "relative", zIndex: 1, padding: "64px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 999, marginBottom: 16, background: "rgba(165,180,252,.1)", border: "1px solid rgba(165,180,252,.25)", color: "#A5B4FC", fontSize: 11, fontWeight: 500 }}>
            <Tag size={11} />Etiquetas
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.3rem)", fontWeight: 700, color: "#E6EFF7", marginBottom: 10 }}>Explora por Etiqueta</h2>
          <p style={{ fontSize: 13, fontWeight: 300, color: "#A5B4FC", marginBottom: 32 }}>
            Haz clic en una etiqueta para filtrar artículos y videos relacionados.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
            {ALL_TAGS.map((tag) => {
              const isActive = activeTag === tag;
              return (
                <button key={tag}
                  onClick={() => {
                    setActiveTag(isActive ? null : tag);
                    if (!isActive) {
                      setTimeout(() => document.querySelector("#articles")?.scrollIntoView({ behavior: "smooth" }), 50);
                    }
                  }}
                  style={{
                    padding: "7px 16px", borderRadius: 999, fontSize: 12, fontWeight: isActive ? 600 : 500,
                    background: isActive ? "rgba(59,128,244,.2)" : "rgba(255,255,255,.04)",
                    border: isActive ? "1px solid rgba(59,128,244,.5)" : "1px solid rgba(128,182,255,.12)",
                    color: isActive ? "#80B6FF" : "#A5B4FC",
                    boxShadow: isActive ? "0 0 16px rgba(59,128,244,.3)" : "none",
                    cursor: "pointer",
                    transition: "all .22s cubic-bezier(.4,.2,1)",
                    transform: isActive ? "translateY(-1px)" : "translateY(0)",
                  }}
                  onMouseEnter={(e) => { if (!isActive) { const b = e.currentTarget as HTMLElement; b.style.background = "rgba(59,128,244,.1)"; b.style.borderColor = "rgba(59,128,244,.38)"; b.style.color = "#80B6FF"; b.style.boxShadow = "0 0 16px rgba(59,128,244,.22)"; b.style.transform = "translateY(-1px)"; } }}
                  onMouseLeave={(e) => { if (!isActive) { const b = e.currentTarget as HTMLElement; b.style.background = "rgba(255,255,255,.04)"; b.style.borderColor = "rgba(128,182,255,.12)"; b.style.color = "#A5B4FC"; b.style.boxShadow = "none"; b.style.transform = "translateY(0)"; } }}
                >
                  #{tag}
                  {isActive && (
                    <span style={{ marginLeft: 6, fontSize: 10, opacity: .7 }}>
                      ({ALL_ARTICLES.filter(a => a.tags.includes(tag)).length + ALL_VIDEOS.filter(v => v.tags.includes(tag)).length})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {activeTag && (
            <button onClick={() => setActiveTag(null)}
              style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 16px", borderRadius: 10, background: "rgba(255,255,255,.04)", border: "1px solid rgba(128,182,255,.15)", color: "#A5B4FC", fontSize: 12, cursor: "pointer" }}
            >
              <X size={12} /> Limpiar filtro
            </button>
          )}
        </div>
      </section>

      <section id="videos" style={{ position: "relative", zIndex: 1, padding: "80px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 44, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 999, marginBottom: 14, background: "rgba(120,216,244,.1)", border: "1px solid rgba(120,216,244,.25)", color: "#78D8F4", fontSize: 11, fontWeight: 500 }}>
                <Youtube size={11} />Contenido en Video
              </div>
              <h2 style={{ fontSize: "clamp(1.7rem,4vw,2.4rem)", fontWeight: 700, color: "#E6EFF7" }}>
                {activeTag ? `Videos: #${activeTag}` : "Videos Recientes (Proximamente)"}
              </h2>
            </div>
            {activeTag && (
              <button onClick={() => setActiveTag(null)}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 10, background: "rgba(59,128,244,.1)", border: "1px solid rgba(59,128,244,.3)", color: "#80B6FF", fontSize: 12, cursor: "pointer" }}
              >
                <X size={12} /> Quitar filtro
              </button>
            )}
          </div>

          {filteredVideos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 20px", color: "#A5B4FC" }}>
              <Youtube size={32} style={{ opacity: .4, marginBottom: 12 }} />
              <p style={{ fontSize: 14 }}>No hay videos con la etiqueta <strong style={{ color: "#80B6FF" }}>#{activeTag}</strong></p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 18 }}>
              {filteredVideos.map((v) => (
                <div key={v.id}
                  style={{ borderRadius: 18, overflow: "hidden", background: "rgba(255,255,255,.03)", border: "1px solid rgba(128,182,255,.08)", cursor: "pointer", transition: "all .3s cubic-bezier(.4,.2,1)" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 22px 64px rgba(0,0,0,.48),0 0 36px rgba(59,128,244,.18)"; el.style.borderColor = "rgba(59,128,244,.32)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; el.style.borderColor = "rgba(128,182,255,.08)"; }}
                >
                  <div style={{ position: "relative", aspectRatio: "16/9", background: "#0a0f1a", overflow: "hidden" }}>
                    <img
                      src={`https://images.unsplash.com/${v.thumb}?w=640&h=360&fit=crop&auto=format`}
                      alt={v.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .55, transition: "opacity .5s,transform .5s" }}
                      onMouseEnter={(e) => { const img = e.currentTarget as HTMLElement; img.style.opacity = ".8"; img.style.transform = "scale(1.04)"; }}
                      onMouseLeave={(e) => { const img = e.currentTarget as HTMLElement; img.style.opacity = ".55"; img.style.transform = "scale(1)"; }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(13,17,23,.95) 0%,rgba(13,17,23,.2) 55%,transparent 100%)" }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(59,128,244,.9)", backdropFilter: "blur(4px)", boxShadow: "0 0 36px rgba(59,128,244,.65)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 0, height: 0, marginLeft: 4, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "16px solid #fff" }} />
                      </div>
                    </div>
                    <span style={{ position: "absolute", bottom: 10, right: 10, fontSize: 11, fontFamily: "monospace", fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: "rgba(0,0,0,.72)", color: "#E6EFF7", backdropFilter: "blur(4px)" }}>{v.dur}</span>
                  </div>
                  <div style={{ padding: "18px 16px" }}>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: "#E6EFF7", lineHeight: 1.45, marginBottom: 8 }}>{v.title}</h3>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <p style={{ fontSize: 11, color: "#A5B4FC", fontWeight: 300 }}>{v.views} visualizaciones</p>
                      <div style={{ display: "flex", gap: 4 }}>
                        {v.tags.slice(0,2).map((t) => (
                          <span key={t} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 5, background: "rgba(120,216,244,.1)", color: "#78D8F4" }}>#{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="contact" style={{ position: "relative", zIndex: 1, padding: "80px 20px 100px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <MagicContactCard />
        </div>
      </section>

      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(128,182,255,.08)", background: "rgba(13,17,23,.9)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "52px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 36, marginBottom: 36 }}>
            <div style={{ gridColumn: "span 2" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 14, background: "linear-gradient(135deg,#3B80F4,#78D8F4)", boxShadow: "0 0 18px rgba(59,128,244,.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield size={18} color="#fff" strokeWidth={2.5} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#E6EFF7" }}>Dakota</div>
                  <div style={{ fontSize: 11, fontWeight: 300, color: "#A5B4FC" }}>Microsoft Cloud Security</div>
                </div>
              </div>
              <p style={{ fontSize: 13, fontWeight: 300, color: "#A5B4FC", lineHeight: 1.7, maxWidth: 280, marginBottom: 18 }}>

Mi compromiso es crecer, aprender y aportar con honestidad en cada colaboración. Asistiendo en proyectos de seguridad cloud y parte del ecosistema Microsoft.  
              </p>
              <div style={{ display: "flex", gap: 8 }}>
             {SOCIAL_LINKS.map(({ icon: Icon, label, color, url }) => (
  <button
    key={label}
    title={label}
    style={{ 
      width: 42, 
      height: 42, 
      borderRadius: 12, 
      border: "1px solid rgba(128,182,255,.1)", 
      background: "rgba(255,255,255,.04)", 
      color: "#A5B4FC", 
      cursor: url ? "pointer" : "default", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      transition: "all .22s cubic-bezier(.4,.2,1)" 
    }}
    onClick={() => {
      if (url) {
        window.open(url, "_blank"); // solo LinkedIn y GitHub funcionan
      }
      // si no hay url, no hace nada
    }}
    onMouseEnter={(e) => { 
      const b = e.currentTarget as HTMLElement; 
      b.style.background = `${color}18`; 
      b.style.borderColor = `${color}50`; 
      b.style.color = color; 
      b.style.boxShadow = `0 0 18px ${color}35`; 
      b.style.transform = "translateY(-3px) scale(1.1)"; 
    }}
    onMouseLeave={(e) => { 
      const b = e.currentTarget as HTMLElement; 
      b.style.background = "rgba(255,255,255,.04)"; 
      b.style.borderColor = "rgba(128,182,255,.1)"; 
      b.style.color = "#A5B4FC"; 
      b.style.boxShadow = "none"; 
      b.style.transform = "translateY(0) scale(1)"; 
    }}
  >
    <Icon size={18} />
  </button>
))}


              </div>
            </div>
         <div>
  <h4 
    style={{ 
      fontSize: 10, 
      fontWeight: 600, 
      textTransform: "uppercase" as const, 
      letterSpacing: ".14em", 
      color: "#78D8F4", 
      marginBottom: 14 
    }}
  >
    Contenido
  </h4>
  {[
    { label: "Artículos", href: "#articles" },
    { label: "Categorías", href: "#categories" },
    { label: "Etiquetas", href: "#tags" },
    { label: "Videos", href: "#videos" },
  ].map(({ label, href }) => (
    <a 
      key={label} 
      href={href} 
      style={{ 
        display: "block", 
        fontSize: 13, 
        fontWeight: 300, 
        color: "#A5B4FC", 
        textDecoration: "none", 
        marginBottom: 8, 
        transition: "color .2s" 
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#80B6FF")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#A5B4FC")}
    >
      {label}
    </a>
  ))}
</div>

            <div>
              <h4 style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: ".14em", color: "#78D8F4", marginBottom: 14 }}>Servicios</h4>
              {["Auditorías de Seguridad","Seguridad en la Nube","Soporte Técnico","Capacitación"].map((l) => (
                <a key={l} href="#services" onClick={(e) => { e.preventDefault(); go("#services"); }}
                  style={{ display: "block", fontSize: 13, fontWeight: 300, color: "#A5B4FC", textDecoration: "none", marginBottom: 8, transition: "color .2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#80B6FF")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#A5B4FC")}
                >{l}</a>
              ))}
            </div>
          </div>
          <div style={{ paddingTop: 22, borderTop: "1px solid rgba(128,182,255,.07)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 300, color: "#A5B4FC" }}>© 2026 Dakota Bazan · Microsoft Cloud Security. Todos los derechos reservados.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#A5B4FC" }}>
              <Eye size={12} />
              <span style={{ fontWeight: 300 }}>Seguro por diseño · </span>
              <span style={{ color: "#3B80F4", fontWeight: 600 }}>Powered by Azure</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
