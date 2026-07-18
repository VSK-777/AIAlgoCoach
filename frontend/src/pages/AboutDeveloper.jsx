import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfileImage from '../components/about/ProfileImage';
import SectionHeading from '../components/about/SectionHeading';
import StatCard from '../components/about/StatCard';
import TechCard from '../components/about/TechCard';
import FeatureCard from '../components/about/FeatureCard';
import ChallengeCard from '../components/about/ChallengeCard';
import TimelineItem from '../components/about/TimelineItem';
import SocialCard from '../components/about/SocialCard';
import { 
    Server, AppWindow, Code2, BrainCircuit, Box, 
    ShieldCheck, Database, Layers, Cloud, Activity, 
    Lock, LineChart, GitBranch, Briefcase, Mail, Globe, 
    ArrowDown, Code, Zap, Heart, CheckCircle2
} from 'lucide-react';

const TYPEWRITER_TEXTS = [
    "Computer Science Engineer",
    "Java Full Stack Developer",
    "AI Developer",
    "Competitive Programmer"
];

const AboutDeveloper = () => {
    const [typedText, setTypedText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const currentFullText = TYPEWRITER_TEXTS[textIndex];
            
            if (!isDeleting) {
                setTypedText(currentFullText.substring(0, typedText.length + 1));
                if (typedText.length === currentFullText.length) {
                    setTimeout(() => setIsDeleting(true), 1500); // Wait before deleting
                }
            } else {
                setTypedText(currentFullText.substring(0, typedText.length - 1));
                if (typedText.length === 0) {
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % TYPEWRITER_TEXTS.length);
                }
            }
        }, isDeleting ? 40 : 80);

        return () => clearTimeout(timeoutId);
    }, [typedText, isDeleting, textIndex]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 overflow-x-hidden relative">
            
            {/* Global Ambient Background Gradient */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #fafbff 40%, #f5f6ff 100%)',
                zIndex: -2
            }}></div>

            <div className="max-w-6xl mx-auto space-y-32 pt-20 pb-24 px-4 sm:px-6 lg:px-8">

                {/* Section 1: Hero */}
                <section className="relative flex flex-col items-center text-center">
                    <ProfileImage src="/assets/images/profile.jpg" alt="VAJJHA SAI KRISHNA" fallbackInitials="VSK" />
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mt-10"
                    >
                        <h1 className="text-[40px] md:text-[64px] font-[800] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-slate-800 to-secondary leading-tight pb-2">
                            VAJJHA SAI KRISHNA
                        </h1>
                        <div className="mt-4 h-8 md:h-10 flex items-center justify-center">
                            <p className="text-xl md:text-[22px] font-semibold text-slate-500">
                                {typedText}
                                <span className="animate-pulse text-primary ml-1">|</span>
                            </p>
                        </div>
                        
                        {/* Premium Social Icon Buttons */}
                        <div className="flex justify-center gap-4 mt-8">
                            <a href="https://github.com/VSK-777" target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-primary hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <GitBranch size={22} />
                            </a>
                            <a href="https://www.linkedin.com/in/vajjha-sai-krishna" target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-primary hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <Briefcase size={22} />
                            </a>
                            <a href="mailto:vajjhasaikrishna@gmail.com" className="p-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-primary hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <Mail size={22} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Animated Technology Badges (Pills) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-3 mt-12"
                    >
                        {['Java 25', 'Spring Boot 4.1', 'React 19', 'AI Engineer', 'PostgreSQL', 'Docker'].map((tech) => (
                            <div key={tech} className="px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 text-slate-700 text-[14px] font-semibold tracking-wide shadow-sm hover:scale-105 hover:border-primary/30 transition-all duration-300 cursor-default">
                                {tech}
                            </div>
                        ))}
                    </motion.div>
                </section>

                {/* Section 2: About Me (2 Column) */}
                <section>
                    <SectionHeading title="About Me" subtitle="A quick glimpse into my professional focus and philosophy." />
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="prose prose-lg text-slate-600"
                        >
                            <p className="text-[16px] leading-relaxed">
                                I have a profound passion for software engineering, with a strong focus on <strong>Backend Development</strong> and <strong>Artificial Intelligence</strong>. My primary objective is building highly scalable, secure applications using clean architecture principles and enterprise-grade design patterns.
                            </p>
                            <p className="text-[16px] leading-relaxed mt-4">
                                Driven by a continuous learning mindset, I thrive on solving complex technical problems and exploring modern technologies to build systems that are not only functional but architecturally elegant.
                            </p>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white/70 backdrop-blur-md border border-slate-200/80 p-6 md:p-8 rounded-3xl shadow-sm space-y-5"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-primary/10 rounded-xl text-primary"><Server size={20} /></div>
                                <div><h4 className="font-bold text-slate-900 text-[16px]">Backend Focus</h4><p className="text-[14px] text-slate-500">Java, Spring Boot, Microservices</p></div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-secondary/10 rounded-xl text-secondary"><BrainCircuit size={20} /></div>
                                <div><h4 className="font-bold text-slate-900 text-[16px]">AI Engineering</h4><p className="text-[14px] text-slate-500">LLM Integration, Prompt Engineering</p></div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-600"><Layers size={20} /></div>
                                <div><h4 className="font-bold text-slate-900 text-[16px]">Enterprise Architecture</h4><p className="text-[14px] text-slate-500">Scalability, Security, Clean Code</p></div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Section 3: AIAlgoCoach Overview (Glass Grid Showcase) */}
                <section>
                    <SectionHeading title="AIAlgoCoach Overview" subtitle="How this platform bridges the gap between static grading and personalized mentorship." />
                    <div className="grid md:grid-cols-2 gap-6 relative">
                        {/* Background glow for the grid */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
                        
                        <FeatureCard 
                            icon={Lock} 
                            title="The Problem" 
                            description="Competitive programming is challenging, and static feedback often isn't enough to help students grasp complex data structures. Traditional platforms lack personalized mentorship." 
                            delay={0.1}
                        />
                        <FeatureCard 
                            icon={CheckCircle2} 
                            title="The Solution" 
                            description="AIAlgoCoach acts as a 24/7 intelligent mentor, bridging the gap between automated grading and personalized human coaching by providing AI-driven insights directly tailored to the user's submissions." 
                            delay={0.2}
                        />
                        <FeatureCard 
                            icon={Layers} 
                            title="Architecture" 
                            description="Built from the ground up prioritizing scalability, security, and separation of concerns. It features a robust RESTful API, strong JWT security, and a stateless integration with the Groq AI engine." 
                            delay={0.3}
                        />
                        <FeatureCard 
                            icon={Activity} 
                            title="Impact" 
                            description="Transforms learning curves by drastically reducing debugging time and offering tailored roadmaps, fostering a deeper understanding of underlying algorithmic principles." 
                            delay={0.4}
                        />
                    </div>
                </section>

                {/* Section 4: Project Highlights (Large Stat Cards) */}
                <section>
                    <SectionHeading title="Project Highlights" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <StatCard label="Platform" value="AI Powered" icon={BrainCircuit} delay={0.1} />
                        <StatCard label="Backend Core" value="Java 25" icon={Server} delay={0.2} />
                        <StatCard label="Framework" value="Spring Boot 4.1" icon={Layers} delay={0.3} />
                        <StatCard label="Database" value="PostgreSQL" icon={Database} delay={0.4} />
                        <StatCard label="Intelligence" value="Spring AI" icon={Zap} delay={0.5} />
                        <StatCard label="Frontend" value="React 19" icon={AppWindow} delay={0.6} />
                        <StatCard label="LLM Provider" value="Groq AI" icon={Cloud} delay={0.7} />
                        <StatCard label="Deployment" value="Render & Vercel" icon={Globe} delay={0.8} />
                    </div>
                </section>

                {/* Section 5: Technology Stack (Premium Cards) */}
                <section>
                    <SectionHeading title="Technology Stack" />
                    <div className="space-y-16">
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <h3 className="text-[22px] font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-primary rounded-full"></span> Backend
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                <TechCard icon={Server} title="Java" version="25" description="Core backend language, utilizing Java 25 LTS features." delay={0.1} />
                                <TechCard icon={Layers} title="Spring Boot" version="4.1" description="Enterprise framework for robust REST APIs." delay={0.2} />
                                <TechCard icon={ShieldCheck} title="Spring Security" description="Strict filter chains & JWT Authentication." delay={0.3} />
                                <TechCard icon={BrainCircuit} title="Spring AI" description="Seamless LLM integration and prompt abstraction layer." delay={0.4} />
                                <TechCard icon={Database} title="Hibernate" description="ORM framework for relational database mapping." delay={0.5} />
                                <TechCard icon={Database} title="PostgreSQL" description="Primary relational database hosted on Neon." delay={0.6} />
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <h3 className="text-[22px] font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-secondary rounded-full"></span> Frontend
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                <TechCard icon={AppWindow} title="React" version="19" description="Component-based UI library for building the SPA." delay={0.1} />
                                <TechCard icon={Zap} title="Vite" version="8" description="Next-generation frontend build tooling and HMR." delay={0.2} />
                                <TechCard icon={Code2} title="JavaScript" description="Core interactive logic implementation for the browser." delay={0.3} />
                                <TechCard icon={Code} title="Tailwind CSS" description="Utility-first styling with custom Design System tokens." delay={0.4} />
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <h3 className="text-[22px] font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span> DevOps & AI
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                <TechCard icon={Box} title="Docker" description="Containerization for isolated deployments and builds." delay={0.1} />
                                <TechCard icon={GitBranch} title="Git & GitHub" description="Version control, branching, and source code management." delay={0.2} />
                                <TechCard icon={Cloud} title="Render & Vercel" description="Production CI/CD pipelines and global edge hosting." delay={0.3} />
                                <TechCard icon={BrainCircuit} title="Groq AI" description="High-speed AI inference (Llama 3) for algorithmic mentorship." delay={0.4} />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Section 6: System Architecture (Vertical Flow Infographic) */}
                <section>
                    <SectionHeading title="System Architecture" subtitle="A high-level view of how data flows through the application." />
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl mx-auto flex flex-col items-center relative py-4"
                    >
                        <div className="w-full md:w-3/4 bg-white/90 backdrop-blur-md border border-slate-200 py-5 px-6 rounded-[20px] text-center shadow-sm hover:shadow-md hover:border-slate-300 transition-all z-10">
                            <span className="text-[18px] font-bold text-slate-800 flex items-center justify-center gap-3"><AppWindow size={20} className="text-primary"/> Frontend (React SPA)</span>
                        </div>
                        
                        <div className="h-10 w-px bg-gradient-to-b from-slate-300 to-slate-400 my-1 relative">
                            <ArrowDown size={14} className="absolute -bottom-2 -left-[6px] text-slate-400" />
                        </div>

                        <div className="w-full md:w-3/4 bg-slate-50/90 border border-slate-200 py-4 px-6 rounded-2xl text-center shadow-sm z-10">
                            <span className="text-[16px] font-bold text-slate-600 font-mono tracking-wider">REST API (JSON)</span>
                        </div>

                        <div className="h-10 w-px bg-gradient-to-b from-slate-400 to-primary/50 my-1 relative">
                            <ArrowDown size={14} className="absolute -bottom-2 -left-[6px] text-primary/70" />
                        </div>

                        <div className="w-full md:w-3/4 bg-primary/10 border border-primary/20 py-5 px-6 rounded-[20px] text-center shadow-sm hover:shadow-md hover:border-primary/40 transition-all z-10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
                            <span className="text-[18px] font-bold text-primary flex items-center justify-center gap-3 relative z-10"><Server size={20} /> Spring Boot Core</span>
                        </div>

                        <div className="h-10 w-px bg-gradient-to-b from-primary/50 to-slate-300 my-1 relative">
                            <ArrowDown size={14} className="absolute -bottom-2 -left-[6px] text-slate-400" />
                        </div>

                        <div className="w-full md:w-3/4 bg-white/90 border border-slate-200 py-5 px-6 rounded-[20px] text-center shadow-sm hover:shadow-md transition-all z-10">
                            <span className="text-[18px] font-bold text-slate-700 flex items-center justify-center gap-3"><Layers size={20} className="text-secondary"/> Service Layer</span>
                        </div>

                        <div className="h-12 w-px bg-slate-300 my-1"></div>

                        {/* Split connection to Database and AI */}
                        <div className="w-full md:w-3/4 h-px bg-slate-300 relative">
                            <div className="absolute left-0 top-0 w-px h-10 bg-slate-300">
                                <ArrowDown size={14} className="absolute -bottom-2 -left-[6px] text-slate-400" />
                            </div>
                            <div className="absolute right-0 top-0 w-px h-10 bg-slate-300">
                                <ArrowDown size={14} className="absolute -bottom-2 -left-[6px] text-slate-400" />
                            </div>
                        </div>

                        <div className="flex w-full md:w-3/4 gap-6 justify-between mt-10">
                            <div className="flex-1 bg-white border border-slate-200 py-5 px-4 rounded-[20px] text-center shadow-sm hover:shadow-md hover:border-slate-300 transition-all z-10">
                                <span className="text-[16px] font-bold text-slate-700 flex flex-col items-center gap-2"><Database size={24} className="text-emerald-500"/> PostgreSQL</span>
                            </div>
                            <div className="flex-1 bg-white border border-slate-200 py-5 px-4 rounded-[20px] text-center shadow-sm hover:shadow-md hover:border-slate-300 transition-all z-10">
                                <span className="text-[16px] font-bold text-slate-700 flex flex-col items-center gap-2"><BrainCircuit size={24} className="text-secondary"/> Groq AI</span>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Section 7: Development Journey (Animated Vertical Timeline) */}
                <section>
                    <SectionHeading title="Development Journey" subtitle="The evolution of my skills leading up to this project." />
                    <div className="max-w-3xl mx-auto py-8">
                        <TimelineItem date="Phase 1" title="Programming Fundamentals" delay={0.1} />
                        <TimelineItem date="Phase 2" title="Java" delay={0.2} />
                        <TimelineItem date="Phase 3" title="Spring Boot" delay={0.3} />
                        <TimelineItem date="Phase 4" title="React" delay={0.4} />
                        <TimelineItem date="Phase 5" title="Artificial Intelligence" delay={0.5} />
                        <TimelineItem date="Present" title="AIAlgoCoach" isLast={true} delay={0.6} />
                    </div>
                </section>

                {/* Section 8: Challenges Solved */}
                <section>
                    <SectionHeading title="Challenges Solved" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <ChallengeCard title="JWT Authentication" description="Stateless, secure token-based user verification." delay={0.1} />
                        <ChallengeCard title="Spring Security" description="Robust filter chains and role-based access control." delay={0.2} />
                        <ChallengeCard title="Groq AI Integration" description="Low-latency inference with tailored prompt engineering." delay={0.3} />
                        <ChallengeCard title="Render Deployment" description="Dockerized backend container deployment." delay={0.4} />
                        <ChallengeCard title="Vercel Deployment" description="Optimized frontend static asset delivery." delay={0.5} />
                        <ChallengeCard title="Backend Architecture" description="Clean separation of controllers, services, and repositories." delay={0.6} />
                        <ChallengeCard title="Performance" description="Efficient database queries and lightweight UI updates." delay={0.7} />
                        <ChallengeCard title="API Design" description="Strict RESTful conventions and standardized JSON responses." delay={0.8} />
                    </div>
                </section>

                {/* Section 9: Key Features */}
                <section>
                    <SectionHeading title="Key Features" />
                    <div className="grid md:grid-cols-3 gap-6">
                        <FeatureCard icon={Activity} title="Analytics" description="Track submission history, success rates, and language preferences dynamically." delay={0.1} />
                        <FeatureCard icon={BrainCircuit} title="AI Mentor" description="Get precise, personalized hints and complexity analysis for algorithmic solutions." delay={0.2} />
                        <FeatureCard icon={Lock} title="Authentication" description="Secure user registration and login flows protected by modern cryptography." delay={0.3} />
                        <FeatureCard icon={ShieldCheck} title="Security" description="Comprehensive backend validation, CORS handling, and protected routes." delay={0.4} />
                        <FeatureCard icon={Server} title="REST APIs" description="A highly scalable and well-documented API driving the entire frontend interface." delay={0.5} />
                        <FeatureCard icon={LineChart} title="Roadmaps" description="Curated learning paths guiding users through essential algorithm topics." delay={0.6} />
                    </div>
                </section>

                {/* Section 10: Vision (Premium Quote Block) */}
                <section className="max-w-4xl mx-auto text-center py-20 px-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <span className="absolute -top-12 -left-4 md:-left-12 text-7xl md:text-9xl text-slate-200/50 font-serif leading-none select-none">"</span>
                        <h2 className="text-[24px] md:text-[36px] font-medium text-slate-800 leading-snug relative z-10 tracking-tight">
                            Building intelligent software by combining <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold">scalable backend engineering</span>, artificial intelligence, and thoughtful user experience.
                        </h2>
                        <span className="absolute -bottom-20 -right-4 md:-right-12 text-7xl md:text-9xl text-slate-200/50 font-serif leading-none select-none">"</span>
                    </motion.div>
                </section>

                {/* Section 11: Future Roadmap */}
                <section>
                    <SectionHeading title="Future Roadmap" />
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
                        <motion.div initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div><span className="text-[16px] text-slate-700 font-semibold">AI Code Review</span>
                        </motion.div>
                        <motion.div initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div><span className="text-[16px] text-slate-700 font-semibold">Mobile App</span>
                        </motion.div>
                        <motion.div initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.2}} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div><span className="text-[16px] text-slate-700 font-semibold">Contest Prediction</span>
                        </motion.div>
                        <motion.div initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.3}} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div><span className="text-[16px] text-slate-700 font-semibold">Advanced Analytics</span>
                        </motion.div>
                        <motion.div initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.4}} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div><span className="text-[16px] text-slate-700 font-semibold">Personalized Learning</span>
                        </motion.div>
                        <motion.div initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.5}} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div><span className="text-[16px] text-slate-700 font-semibold">More AI Agents</span>
                        </motion.div>
                    </div>
                </section>

                {/* Section 12: Connect */}
                <section>
                    <SectionHeading title="Connect With Me" subtitle="Let's build something amazing together." />
                    <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
                        <SocialCard icon={GitBranch} title="GitHub" subtitle="@VSK-777" href="https://github.com/VSK-777" delay={0.1} />
                        <SocialCard icon={Briefcase} title="LinkedIn" subtitle="Vajjha Sai Krishna" href="https://www.linkedin.com/in/vajjha-sai-krishna" delay={0.2} />
                        <SocialCard icon={Mail} title="Email" subtitle="vajjhasaikrishna@gmail.com" href="mailto:vajjhasaikrishna@gmail.com" delay={0.3} />
                        <SocialCard icon={Globe} title="Portfolio" subtitle="Coming Soon" disabled={true} delay={0.4} />
                    </div>
                </section>

                {/* Section 13: Footer */}
                <motion.footer 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="pt-24 pb-8 text-center text-slate-500 text-[14px]"
                >
                    <div className="text-[20px] font-bold text-slate-800 mb-6 tracking-tight">AIAlgoCoach</div>
                    <p className="mb-2">Designed & Developed by <span className="text-slate-800 font-semibold">VAJJHA SAI KRISHNA</span></p>
                    <p className="flex items-center justify-center gap-2 mb-6">
                        Made with <Heart size={14} className="text-red-500 fill-red-500" /> using Java, Spring, React & AI
                    </p>
                    <p className="text-slate-400 text-xs uppercase tracking-wider">&copy; 2026 All Rights Reserved</p>
                </motion.footer>

            </div>
        </div>
    );
};

export default AboutDeveloper;
