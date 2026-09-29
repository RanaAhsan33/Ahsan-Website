"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Send,
  Shield,
  Sparkles,
  X,
} from "lucide-react";

const sections = [
  ["01", "hero", "Home"], ["02", "about", "About"], ["03", "skills", "Skills"],
  ["04", "experience", "Experience"], ["05", "projects", "Projects"], ["06", "cybersecurity", "Cybersecurity"],
  ["07", "certifications", "Certifications"], ["08", "services", "Services"], ["09", "contact", "Contact"],
] as const;

const fade = { hidden:{ opacity:0, y:28 }, visible:{ opacity:1, y:0, transition:{ duration:.7, ease:[.2,.8,.2,1] as const } } };

const skillGroups = {
  "Cybersecurity": ["CEH", "CHFI", "OWASP Top 10", "SIEM", "Wazuh", "Wireshark", "Kali Linux", "Vulnerability Assessment", "Threat Analysis", "Incident Response"],
  "Project Management": ["Project Initiation", "Project Planning", "Execution", "Agile", "Risk Management", "Stakeholder Communication", "Team Coordination", "Delivery Oversight"],
  "Technical": ["Active Directory", "Network Security", "CSI Linux", "IDS & IPS", "Nessus Scan", "Application Security", "Penetration Testing", "Purple Teaming", "Digital Forensics", "Security Documentation"],
};

const experience = [
  {
    company:"Pheonux.Design", role:"Cyber Security Analyst", dates:"Aug 2026 — Present",
    text:"Coordinating project delivery while supporting cybersecurity analysis, security monitoring, incident-oriented workflows and technical communication across teams.",
    tags:["Project Management","Cybersecurity","Stakeholders","Security Operations"]
  },
  {
    company:"Big Immersive", role:"Project Coordination & Technical Production", dates:"Jun 2021 — Aug 2026",
    text:"Worked across multidisciplinary production teams, coordinating schedules, deliverables, approvals and quality while supporting complex technical pipelines and client facing execution.",
    tags:["Coordination","Delivery","Team Leadership","Quality"]
  },
  {
    company:"Maqsad Animation School", role:"Instructor", dates:"Earlier Experience",
    text:"Taught technical and creative workflows, translating complex processes into structured learning material and practical production guidance.",
    tags:["Teaching","Mentoring","Communication"]
  }
];

const projects = [
  ["Security Operations", "SOC Monitoring Workflow", "A structured SOC-style monitoring concept covering alert review, triage, investigation and escalation using SIEM-oriented thinking.", ["Wazuh","SIEM","Threat Analysis"]],
  ["Application Security", "OWASP Review Framework", "A repeatable review workflow for common web application risks, findings prioritization and remediation communication.", ["OWASP","Web Security","Risk"]],
  ["Digital Forensics", "Incident Evidence Workflow", "A defensible digital evidence process centered on identification, preservation, analysis, reconstruction and reporting.", ["CHFI","Forensics","Reporting"]],
  ["Project Management", "Delivery Control System", "A practical delivery structure for scope, milestones, stakeholder updates, risks, approvals and handoff quality.", ["Agile","Planning","Execution"]],
  ["Network Security", "Threat Visibility Lab", "A portfolio lab concept focused on traffic visibility, anomaly review and security-tool correlation across network events.", ["Wireshark","Suricata","Network Security"]],
  ["Security Assessment", "Vulnerability Review Workflow", "A security assessment framework for discovering, validating, documenting and prioritizing vulnerabilities.", ["CEH","Nessus","Remediation"]],
] as const;

const services = [
  ["01","Cybersecurity Assessment","Structured review of security posture, common weaknesses and prioritized remediation guidance."],
  ["02","SOC & Threat Analysis","Alert triage, threat-oriented investigation thinking and security monitoring workflows."],
  ["03","Application Security Review","OWASP-focused review of web application risks and security-aware delivery practices."],
  ["04","Project Management","Planning, coordination, stakeholder communication, risk tracking and delivery oversight."],
  ["05","Security Documentation","Clear technical findings, incident notes, remediation summaries and executive-ready communication."],
  ["06","Technical Team Coordination","Cross-functional coordination across technical, creative and security-adjacent workstreams."],
] as const;

const certs = [
  { name:"Certified Ethical Hacker (C|EH)", issuer:"EC-Council", image:"/certificates/ceh-preview.png", issued:"19 Aug 2026", renewable:"01 Sep 2027", text:"Ethical hacking methodologies, vulnerability assessment and security posture improvement." },
  { name:"Computer Hacking Forensic Investigator (C|HFI)", issuer:"EC-Council", image:"/certificates/chfi.jpeg", issued:"04 Sep 2026", renewable:"01 Oct 2027", text:"Digital evidence, forensic methodology, reconstruction and reporting of cyber incidents." },
];

const pmCerts = [
  ["Google Project Management", "/certificates/google-pm-preview.png", "/certificates/google-project-management.pdf"],
  ["Foundations of Project Management", "/certificates/foundations-pm.png", "/certificates/foundations-pm.png"],
  ["Project Initiation", "/certificates/project-initiation.png", "/certificates/project-initiation.pdf"],
  ["Project Planning", "/certificates/project-planning.png", "/certificates/project-planning.pdf"],
  ["Project Execution", "/certificates/project-execution.png", "/certificates/project-execution.pdf"],
  ["Agile Project Management", "/certificates/agile-pm.png", "/certificates/agile-project-management.pdf"],
] as const;

function Pill({children}:{children:React.ReactNode}) { return <span className="rounded-full border border-white/10 bg-white/[.035] px-3 py-1.5 text-xs text-white/70">{children}</span>; }
function SectionIntro({kicker,title,copy}:{kicker:string,title:string,copy?:string}) {
  return <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{once:true,amount:.2}}>
    <div className="section-label">{kicker}</div><h2 className="section-title">{title}</h2>{copy && <p className="section-copy">{copy}</p>}
  </motion.div>;
}

function ChatWidget() {
  const [open,setOpen]=useState(false); const [input,setInput]=useState(""); const [messages,setMessages]=useState([{from:"bot",text:"Hi — ask me about Ahsan’s certifications, cybersecurity skills, project management experience, or availability."}]);
  const answer=(q:string)=>{
    const s=q.toLowerCase();
    if(s.includes("cert")) return "Ahsan holds CEH and CHFI certifications from EC-Council, plus the Google Project Management Professional Certificate and its course credentials.";
    if(s.includes("skill")||s.includes("cyber")) return "His current cybersecurity focus includes SOC concepts, threat analysis, application security, red/blue/purple team concepts, Wazuh, Wireshark, Kali Linux, OWASP and network security.";
    if(s.includes("project")||s.includes("management")) return "He works as a Project Manager and Cyber Security Analyst, with experience in planning, stakeholder communication, team coordination, delivery oversight and Agile project management.";
    if(s.includes("contact")||s.includes("email")) return "You can reach Ahsan at ranaaahsan33@gmail.com or through LinkedIn from the contact section.";
    return "I can answer portfolio questions about Ahsan’s cybersecurity work, project management background, certifications, tools and contact details.";
  };
  const submit=(e:FormEvent)=>{e.preventDefault(); if(!input.trim()) return; const q=input.trim(); setMessages(m=>[...m,{from:"user",text:q},{from:"bot",text:answer(q)}]); setInput("");};
  return <div className="fixed bottom-5 right-5 z-[80]">
    <AnimatePresence>{open && <motion.div initial={{opacity:0,y:16,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:16,scale:.96}} className="glass mb-3 w-[min(360px,calc(100vw-28px))] overflow-hidden rounded-3xl border border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><div><div className="text-sm font-semibold">Ask about Ahsan</div><div className="text-[11px] text-white/45">Portfolio assistant</div></div><button onClick={()=>setOpen(false)} aria-label="Close chat"><X size={18}/></button></div>
      <div className="max-h-80 space-y-3 overflow-y-auto p-4">{messages.map((m,i)=><div key={i} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${m.from==="user"?"ml-auto bg-violet-500 text-white":"bg-white/5 text-white/75"}`}>{m.text}</div>)}</div>
      <form onSubmit={submit} className="flex gap-2 border-t border-white/10 p-3"><input value={input} onChange={e=>setInput(e.target.value)} aria-label="Ask a question" placeholder="Ask about skills…" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-violet-400/50"/><button className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500" aria-label="Send"><Send size={16}/></button></form>
    </motion.div>}</AnimatePresence>
    <button onClick={()=>setOpen(v=>!v)} className="flex items-center gap-2 rounded-full bg-violet-500 px-4 py-3 text-sm font-semibold shadow-[0_12px_50px_rgba(139,92,246,.35)]"><MessageCircle size={17}/> Ask about Ahsan</button>
  </div>;
}

export default function Portfolio(){
  const [active,setActive]=useState("hero"); const [mobile,setMobile]=useState(false); const [filter,setFilter]=useState("All");
  useEffect(()=>{ const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting) setActive(e.target.id)}),{threshold:.42}); sections.forEach(([,id])=>{const el=document.getElementById(id); if(el)io.observe(el)}); return()=>io.disconnect(); },[]);
  const visibleSkills=useMemo(()=>filter==="All"?skillGroups:Object.fromEntries(Object.entries(skillGroups).filter(([k])=>k===filter)),[filter]);
  const submitContact=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault(); const fd=new FormData(e.currentTarget); const subject=encodeURIComponent(`Portfolio inquiry from ${fd.get("name")}`); const body=encodeURIComponent(`${fd.get("message")}\n\nFrom: ${fd.get("name")} <${fd.get("email")}>`); window.location.href=`mailto:ranaaahsan33@gmail.com?subject=${subject}&body=${body}`;};
  return <main>
    <div className="cosmic-noise"/><div className="nebula one"/><div className="nebula two"/>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.06] bg-[#090911]/70 backdrop-blur-xl">
      <div className="container-shell flex h-18 items-center justify-between">
        <a href="#hero" className="font-[var(--font-syne)] text-lg font-bold tracking-tight">AIK<span className="text-violet-400">.</span></a>
        <nav className="hidden gap-7 text-sm text-white/60 md:flex">{["About","Skills","Experience","Projects","Contact"].map(x=><a key={x} href={`#${x.toLowerCase()}`} className="transition hover:text-white">{x}</a>)}</nav>
        <a href="#contact" className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-black md:inline-flex">Let’s talk <ArrowUpRight className="ml-1" size={15}/></a>
        <button className="md:hidden" onClick={()=>setMobile(v=>!v)} aria-label="Toggle menu">{mobile?<X/>:<Menu/>}</button>
      </div>
      <AnimatePresence>{mobile&&<motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden border-t border-white/10 bg-[#0b0b14] md:hidden"><div className="container-shell flex flex-col py-4">{["About","Skills","Experience","Projects","Cybersecurity","Certifications","Services","Contact"].map(x=><a key={x} href={`#${x.toLowerCase()}`} onClick={()=>setMobile(false)} className="border-b border-white/[.06] py-3 text-sm text-white/70">{x}</a>)}</div></motion.div>}</AnimatePresence>
    </header>

    <aside className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 xl:flex">{sections.map(([n,id,label])=><a key={id} href={`#${id}`} title={label} className={`flex items-center gap-2 text-[10px] tracking-[.2em] transition ${active===id?"text-violet-300":"text-white/25 hover:text-white/50"}`}><span className={`h-px transition-all ${active===id?"w-7 bg-violet-400":"w-3 bg-white/20"}`}/>{n}</a>)}</aside>

    <section id="hero" className="section pt-28"><div className="container-shell grid items-center gap-8 lg:grid-cols-[1.12fr_.88fr]">
      <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.9}}>
        <div className="section-label mb-5">CYBERSECURITY</div>
        <div className="mb-2 text-xl text-white/55">Hello, I’m</div>
        <h1 className="font-[var(--font-syne)] text-[clamp(3.8rem,8vw,7.5rem)] font-bold leading-[.86] tracking-[-.06em]">AHSAN IQBAL <span className="text-violet-400">KHAN.</span></h1>
        <p className="mt-6 text-xl text-white/80">Cybersecurity Analyst <span className="text-violet-400">|</span> </p>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/52">I work at the intersection of security, execution and communication — translating technical risk into structured action, coordinating delivery, and building security-aware workflows that teams can actually use.</p>
        <div className="mt-6 flex flex-wrap gap-2"><Pill><BadgeCheck className="mr-1 inline" size={13}/> CEH Certified</Pill><Pill><BadgeCheck className="mr-1 inline" size={13}/> CHFI Certified</Pill><Pill>Google Project Management</Pill></div>
        <div className="mt-8 flex flex-wrap gap-3"><a href="#projects" className="rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold shadow-[0_12px_40px_rgba(139,92,246,.25)]">View My Work</a><a href="#contact" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 hover:border-violet-400/40">Let’s Work Together</a></div>
        <div className="mt-8 flex gap-4 text-white/45"><a href="https://www.linkedin.com/in/ahsan-iqbal-khan-353b52120/" target="_blank" aria-label="LinkedIn"><Linkedin size={19}/></a><a href="https://github.com/RanaAhsan33/Ahsan-Website-1" target="_blank" aria-label="GitHub"><Github size={19}/></a><a href="mailto:ranaaahsan33@gmail.com" aria-label="Email"><Mail size={19}/></a></div>
        <a href="#about" className="mt-12 inline-flex items-center gap-2 text-[10px] font-bold tracking-[.25em] text-white/35">SCROLL TO EXPLORE <ArrowDown size={14}/></a>
      </motion.div>
      <motion.div initial={{opacity:0,scale:.85}} animate={{opacity:1,scale:1}} transition={{delay:.2,duration:1}} className="planet-wrap"><div className="ring"/><div className="ring r2"/><div className="planet"/><div className="absolute left-[10%] top-[18%] h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_18px_#c4b5fd]"/><div className="absolute bottom-[20%] right-[8%] h-1.5 w-1.5 rounded-full bg-white/80"/></motion.div>
    </div></section>

    <section id="about" className="section"><div className="container-shell"><SectionIntro kicker="02 • BEYOND THE INTERFACE" title="Thoughtful on the surface. Structured at the core."/><div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_.8fr]"><motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{once:true}} className="section-copy">My background spans cybersecurity, project management, technical production and team coordination. That combination gives me a practical view of security: controls matter, but so do people, timelines, evidence, communication and execution. I focus on making complex work understandable, trackable and deliverable.<div className="mt-6 flex flex-wrap gap-2"><Pill>Security aware</Pill><Pill>Project delivery</Pill><Pill>Cross-functional communication</Pill></div></motion.div><div className="grid grid-cols-3 gap-3">{[["7+","Years"],["3","Core disciplines"],["CEH + CHFI","Certified"]].map(([v,l])=><div key={l} className="glass rounded-2xl p-5"><div className="font-[var(--font-syne)] text-2xl font-bold text-violet-300">{v}</div><div className="mt-1 text-xs text-white/45">{l}</div></div>)}</div></div></div></section>

    <section id="skills" className="section"><div className="container-shell"><SectionIntro kicker="03 • MY TECHNICAL UNIVERSE" title="A toolkit without fixed boundaries." copy="Security, delivery and technical fluency — organized around outcomes rather than labels."/><div className="mt-8 flex flex-wrap gap-2">{["All",...Object.keys(skillGroups)].map(x=><button key={x} onClick={()=>setFilter(x)} className={`rounded-full px-4 py-2 text-sm transition ${filter===x?"bg-violet-500 text-white":"border border-white/10 text-white/55 hover:text-white"}`}>{x}</button>)}</div><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{Object.entries(visibleSkills).map(([group,items])=><motion.div key={group} layout className="glass glow-hover rounded-3xl p-6"><div className="mb-5 flex items-center gap-2 font-semibold"><Sparkles size={16} className="text-violet-400"/>{group}</div><div className="flex flex-wrap gap-2">{items.map(i=><Pill key={i}>{i}</Pill>)}</div></motion.div>)}</div></div></section>

    <section id="experience" className="section"><div className="container-shell"><SectionIntro kicker="04 • THE PATH SO FAR" title="Always building. Always evolving."/><div className="relative mt-14 ml-3 border-l border-white/10 pl-8">{experience.map((e,i)=><motion.div key={e.company} variants={fade} initial="hidden" whileInView="visible" viewport={{once:true}} className="relative mb-12 last:mb-0"><div className="absolute -left-[38px] top-2 h-3 w-3 rounded-full border-2 border-violet-400 bg-[#090911] shadow-[0_0_20px_rgba(167,139,250,.5)]"/><div className="text-xs tracking-[.18em] text-violet-300">{e.dates}</div><div className="mt-2 text-sm text-white/45">{e.company}</div><h3 className="mt-1 font-[var(--font-syne)] text-2xl font-bold">{e.role}</h3><p className="mt-3 max-w-3xl leading-7 text-white/52">{e.text}</p><div className="mt-4 flex flex-wrap gap-2">{e.tags.map(t=><Pill key={t}>{t}</Pill>)}</div></motion.div>)}</div></div></section>

    <section id="projects" className="section"><div className="container-shell"><SectionIntro kicker="05 • SELECTED WORK" title="Ideas into systems." copy="A curated set of security and delivery-oriented portfolio case studies reflecting the way I approach technical work."/><div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{projects.map(([type,name,desc,tags],i)=><motion.article key={name} variants={fade} initial="hidden" whileInView="visible" viewport={{once:true}} className="glass glow-hover group rounded-3xl p-6"><div className="flex items-center justify-between"><span className="text-[11px] font-bold tracking-[.18em] text-violet-300">{type}</span><span className="text-xs text-white/25">0{i+1}</span></div><h3 className="mt-7 font-[var(--font-syne)] text-2xl font-bold">{name}</h3><p className="mt-3 min-h-24 text-sm leading-7 text-white/50">{desc}</p><div className="mt-5 flex flex-wrap gap-2">{tags.map(t=><Pill key={t}>{t}</Pill>)}</div><div className="mt-7 flex items-center gap-2 text-xs font-semibold text-white/55 transition group-hover:text-violet-300">VIEW PROJECT DETAILS <ChevronRight size={14}/></div></motion.article>)}</div></div></section>

    <section id="cybersecurity" className="section"><div className="container-shell"><SectionIntro kicker="06 • A DIFFERENT PERSPECTIVE" title="Delivery meets security."/><div className="mt-12 grid gap-5 lg:grid-cols-2"><div className="glass rounded-3xl p-6 font-mono text-sm leading-8 text-white/70"><span className="text-violet-300">const</span> experience = &#123;<br/><span className="pl-5 text-white/40">mindset:</span> <span className="text-violet-200">&quot;security-aware&quot;</span>,<br/><span className="pl-5 text-white/40">focus:</span> [<span className="text-violet-200">&quot;threat analysis&quot;</span>, <span className="text-violet-200">&quot;delivery&quot;</span>],<br/><span className="pl-5 text-white/40">approach:</span> <span className="text-violet-200">&quot;identify → assess → act&quot;</span>,<br/><span className="pl-5 text-white/40">communication:</span> <span className="text-violet-200">&quot;clear + actionable&quot;</span><br/>&#125;;</div><div className="grid gap-3">{["Think in attack paths, not isolated findings.","Preserve evidence and context before acting.","Prioritize remediation by impact and likelihood.","Translate technical risk into decisions people can execute."].map(x=><div key={x} className="glass rounded-2xl p-4 text-sm text-white/60"><CheckCircle2 className="mr-2 inline text-violet-400" size={16}/>{x}</div>)}</div></div><div className="mt-12"><div className="section-label">THE CYBERSECURITY LAB</div><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{["Kali Linux","Wazuh","Suricata","Wireshark","Nessus"].map((x,i)=><div key={x} className={`glass rounded-2xl p-5 ${x==="Wazuh"?"border-violet-400/30 shadow-[0_0_50px_rgba(139,92,246,.12)]":""}`}><Shield size={19} className="text-violet-400"/><div className="mt-4 font-semibold">{x}</div>{x==="Wazuh"&&<div className="mt-2 text-xs text-violet-300">Highlighted SIEM / XDR tool</div>}</div>)}</div></div></div></section>

    <section id="certifications" className="section"><div className="container-shell"><SectionIntro kicker="07 • KNOWLEDGE, VALIDATED" title="Credentials with context."/><div className="mt-12 grid gap-5 lg:grid-cols-2">{certs.map(c=><article key={c.name} className="glass glow-hover overflow-hidden rounded-3xl"><div className="relative aspect-[16/9] bg-white"><Image src={c.image} alt={`${c.name} certificate`} fill className="object-contain" sizes="(max-width:900px) 100vw, 50vw"/></div><div className="p-6"><div className="text-xs font-bold tracking-[.18em] text-violet-300">{c.issuer}</div><h3 className="mt-3 font-[var(--font-syne)] text-2xl font-bold">{c.name}</h3><p className="mt-3 text-sm leading-7 text-white/50">{c.text}</p><div className="mt-5 flex flex-wrap gap-4 text-xs text-white/40"><span>Issued {c.issued}</span><span>Renewable {c.renewable}</span></div><a href={c.image} target="_blank" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-300">View certificate <ExternalLink size={14}/></a></div></article>)}</div><div className="mt-10"><div className="section-label">GOOGLE PROJECT MANAGEMENT</div><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{pmCerts.map(([n,img,href])=><a key={n} href={href} target="_blank" className="glass glow-hover overflow-hidden rounded-2xl"><div className="relative aspect-[4/3] bg-white"><Image src={img} alt={`${n} certificate`} fill className="object-contain" sizes="(max-width:640px) 100vw, 33vw"/></div><div className="p-4 text-sm font-semibold">{n}</div></a>)}</div></div></div></section>

    <section id="services" className="section"><div className="container-shell"><SectionIntro kicker="08 • LET’S MAKE IT HAPPEN" title="Your challenge. My next system to solve."/><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{services.map(([n,t,d])=><div key={n} className="glass glow-hover rounded-3xl p-6"><div className="text-xs font-bold tracking-[.2em] text-violet-300">{n}</div><h3 className="mt-8 font-[var(--font-syne)] text-xl font-bold">{t}</h3><p className="mt-3 text-sm leading-7 text-white/50">{d}</p></div>)}</div></div></section>

    <section id="contact" className="section"><div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr]"><div><div className="section-label">09 • CONTACT</div><h2 className="section-title">LET’S BUILD SOMETHING GREAT.</h2><p className="section-copy">If you need security-aware execution, structured project delivery, or someone who can bridge technical work with clear communication, let’s talk.</p><div className="mt-8 space-y-3 text-sm text-white/55"><a className="flex items-center gap-3" href="mailto:ranaaahsan33@gmail.com"><Mail size={17} className="text-violet-400"/> ranaaahsan33@gmail.com</a><a className="flex items-center gap-3" href="https://www.linkedin.com/in/ahsan-iqbal-khan-353b52120/" target="_blank"><Linkedin size={17} className="text-violet-400"/> LinkedIn</a><a className="flex items-center gap-3" href="https://github.com/RanaAhsan33/Ahsan-Website-1" target="_blank"><Github size={17} className="text-violet-400"/> GitHub</a></div></div><form onSubmit={submitContact} className="glass rounded-3xl p-6 sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm text-white/55">Name<input name="name" required className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.035] px-4 py-3 text-white outline-none focus:border-violet-400/50"/></label><label className="text-sm text-white/55">Email<input name="email" type="email" required className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.035] px-4 py-3 text-white outline-none focus:border-violet-400/50"/></label></div><label className="mt-5 block text-sm text-white/55">Message<textarea name="message" rows={6} required className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[.035] px-4 py-3 text-white outline-none focus:border-violet-400/50"/></label><button className="mt-5 inline-flex items-center gap-2 rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold">Send message <Send size={15}/></button></form></div></section>

    <footer className="border-t border-white/[.07] py-7"><div className="container-shell flex flex-col items-center justify-between gap-4 text-xs text-white/35 sm:flex-row"><span>© 2026 Ahsan Iqbal Khan</span><button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} className="inline-flex items-center gap-2 hover:text-white">BACK TO TOP <ArrowDown className="rotate-180" size={13}/></button></div></footer>
    <ChatWidget/>
  </main>
}
