import React from 'react';
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
    Lock, LineChart, Target, GitBranch, Briefcase, Mail, Globe, 
    ArrowDown, Code, Zap
} from 'lucide-react';

const AboutDeveloper = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 overflow-x-hidden pt-10 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-32">

                {/* Section 1: Hero */}
                <section className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <ProfileImage src="/assets/images/profile.jpg" alt="VAJJHA SAI KRISHNA" fallbackInitials="VSK" />
                    
                    <div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-slate-800 to-secondary pb-2">
                            VAJJHA SAI KRISHNA
                        </h1>
                        <p className="mt-4 text-xl md:text-2xl font-medium text-slate-600">
                            Computer Science Engineering Student
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm font-semibold">
                            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">Full Stack Java Developer</span>
                            <span className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">AI Engineer</span>
                            <span className="px-4 py-1.5 rounded-full bg-white/10 text-slate-900 border border-white/20">Creator of AIAlgoCoach</span>
                        </div>
                    </div>

                    {/* Animated Technology Badges */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8 pt-4">
                        {['Java', 'Spring Boot', 'React', 'AI', 'PostgreSQL', 'Docker'].map((tech) => (
                            <div key={tech} className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm hover:scale-110 hover:bg-slate-50 transition-all duration-300 cursor-default">
                                {tech}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 2: About Me */}
                <section className="max-w-3xl mx-auto text-center">
                    <SectionHeading title="About Me" />
                    <article className="prose prose-lg mx-auto text-slate-600">
                        <p>
                            I have a profound passion for software engineering, with a strong focus on <strong>Backend Development</strong> and <strong>Artificial Intelligence</strong>. My primary objective is building highly scalable, secure applications using clean architecture principles and enterprise-grade design patterns.
                        </p>
                        <p>
                            Driven by a continuous learning mindset, I thrive on solving complex technical problems and exploring modern technologies to build systems that are not only functional but architecturally elegant.
                        </p>
                    </article>
                </section>

                {/* Section 3: AIAlgoCoach Overview */}
                <section>
                    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-slate-200 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <SectionHeading title="AIAlgoCoach Overview" />
                        <div className="grid md:grid-cols-2 gap-12 text-slate-600 relative z-10">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">The Problem</h3>
                                <p className="mb-6 leading-relaxed">Competitive programming is challenging, and static feedback often isn't enough to help students grasp complex data structures. Traditional platforms lack personalized mentorship.</p>
                                
                                <h3 className="text-xl font-bold text-slate-900 mb-3">The Solution</h3>
                                <p className="leading-relaxed">AIAlgoCoach acts as a 24/7 intelligent mentor, bridging the gap between automated grading and personalized human coaching by providing AI-driven insights directly tailored to the user's submissions.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Architecture Philosophy</h3>
                                <p className="mb-6 leading-relaxed">Built from the ground up prioritizing scalability, security, and separation of concerns. It features a robust RESTful API, robust JWT security, and a stateless integration with the Groq AI engine.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Project Statistics */}
                <section>
                    <SectionHeading title="Project Highlights" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <StatCard label="Platform" value="AI Powered" />
                        <StatCard label="Backend Core" value="Java 25" />
                        <StatCard label="Framework" value="Spring Boot 4.1" />
                        <StatCard label="Database" value="PostgreSQL" />
                        <StatCard label="Intelligence" value="Spring AI" />
                        <StatCard label="Frontend" value="React" />
                        <StatCard label="LLM Provider" value="Groq AI" />
                        <StatCard label="Deployment" value="Render & Vercel" />
                    </div>
                </section>

                {/* Section 5: Technology Stack */}
                <section>
                    <SectionHeading title="Technology Stack" />
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 pl-2 border-l-4 border-primary">Backend</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <TechCard icon={Server} title="Java" description="Core backend language, utilizing Java 25." />
                                <TechCard icon={Layers} title="Spring Boot" description="Enterprise framework (v4.1) for REST APIs." />
                                <TechCard icon={ShieldCheck} title="Spring Security" description="Robust protection & JWT Authentication." />
                                <TechCard icon={BrainCircuit} title="Spring AI" description="Seamless LLM integration layer." />
                                <TechCard icon={Database} title="Hibernate" description="ORM framework for database mapping." />
                                <TechCard icon={Database} title="PostgreSQL" description="Primary relational database (Neon)." />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 pl-2 border-l-4 border-secondary">Frontend</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <TechCard icon={AppWindow} title="React" description="UI library for building the SPA component." />
                                <TechCard icon={Zap} title="Vite" description="Next-generation frontend tooling." />
                                <TechCard icon={Code2} title="JavaScript" description="Core logic implementation for the browser." />
                                <TechCard icon={Code} title="HTML & CSS" description="Semantic structure and Tailwind styling." />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 pl-2 border-l-4 border-emerald-500">DevOps & AI</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <TechCard icon={Box} title="Docker" description="Containerization for isolated deployments." />
                                <TechCard icon={GitBranch} title="Git & GitHub" description="Version control and source code management." />
                                <TechCard icon={Cloud} title="Render & Vercel" description="Production backend and frontend hosting." />
                                <TechCard icon={BrainCircuit} title="Groq & Ollama" description="High-speed AI inference for mentorship." />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 6: System Architecture */}
                <section>
                    <SectionHeading title="System Architecture" />
                    <div className="max-w-2xl mx-auto flex flex-col items-center">
                        <div className="w-full bg-white border border-slate-200 py-4 px-6 rounded-2xl text-center shadow-lg">
                            <span className="text-xl font-bold text-slate-900">Frontend (React SPA)</span>
                        </div>
                        
                        <div className="h-10 w-px bg-slate-300 my-2 relative">
                            <ArrowDown size={16} className="absolute -bottom-2 -ml-2 text-slate-500" />
                        </div>

                        <div className="w-full bg-white border border-slate-200 py-4 px-6 rounded-2xl text-center shadow-lg">
                            <span className="text-xl font-bold text-slate-900">REST API (JSON)</span>
                        </div>

                        <div className="h-10 w-px bg-slate-300 my-2 relative">
                            <ArrowDown size={16} className="absolute -bottom-2 -ml-2 text-slate-500" />
                        </div>

                        <div className="w-full bg-primary/20 border border-primary/30 py-4 px-6 rounded-2xl text-center shadow-lg">
                            <span className="text-xl font-bold text-primary">Spring Boot Core</span>
                        </div>

                        <div className="h-10 w-px bg-slate-300 my-2 relative">
                            <ArrowDown size={16} className="absolute -bottom-2 -ml-2 text-slate-500" />
                        </div>

                        <div className="w-full bg-white border border-slate-200 py-4 px-6 rounded-2xl text-center shadow-lg">
                            <span className="text-xl font-bold text-slate-900">Service Layer (Business Logic)</span>
                        </div>

                        <div className="h-10 w-px bg-slate-300 my-2 relative">
                            <ArrowDown size={16} className="absolute -bottom-2 -ml-2 text-slate-500" />
                        </div>

                        <div className="flex w-full gap-4 justify-center">
                            <div className="flex-1 bg-secondary/20 border border-secondary/30 py-4 px-6 rounded-2xl text-center shadow-lg">
                                <span className="text-lg font-bold text-secondary">PostgreSQL</span>
                            </div>
                            <div className="flex-1 bg-secondary/20 border border-secondary/30 py-4 px-6 rounded-2xl text-center shadow-lg">
                                <span className="text-lg font-bold text-secondary">Groq AI Engine</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 7: Development Journey */}
                <section>
                    <SectionHeading title="Development Journey" />
                    <div className="max-w-md mx-auto py-8">
                        <TimelineItem title="Programming Fundamentals" />
                        <TimelineItem title="Java" />
                        <TimelineItem title="Spring Boot" />
                        <TimelineItem title="React" />
                        <TimelineItem title="Artificial Intelligence" />
                        <TimelineItem title="AIAlgoCoach" isLast={true} />
                    </div>
                </section>

                {/* Section 8: Challenges Solved */}
                <section>
                    <SectionHeading title="Challenges Solved" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <ChallengeCard title="JWT Authentication" description="Stateless, secure token-based user verification." />
                        <ChallengeCard title="Spring Security" description="Robust filter chains and role-based access control." />
                        <ChallengeCard title="Groq AI Integration" description="Low-latency inference with tailored prompt engineering." />
                        <ChallengeCard title="Render Deployment" description="Dockerized backend container deployment." />
                        <ChallengeCard title="Vercel Deployment" description="Optimized frontend static asset delivery." />
                        <ChallengeCard title="Backend Architecture" description="Clean separation of controllers, services, and repositories." />
                        <ChallengeCard title="Performance" description="Efficient database queries and lightweight UI updates." />
                        <ChallengeCard title="API Design" description="Strict RESTful conventions and standardized JSON responses." />
                    </div>
                </section>

                {/* Section 9: Key Features */}
                <section>
                    <SectionHeading title="Key Features" />
                    <div className="grid md:grid-cols-3 gap-6">
                        <FeatureCard icon={Activity} title="Analytics" description="Track submission history, success rates, and language preferences dynamically." />
                        <FeatureCard icon={BrainCircuit} title="AI Mentor" description="Get precise, personalized hints and complexity analysis for algorithmic solutions." />
                        <FeatureCard icon={Lock} title="Authentication" description="Secure user registration and login flows protected by modern cryptography." />
                        <FeatureCard icon={ShieldCheck} title="Security" description="Comprehensive backend validation, CORS handling, and protected routes." />
                        <FeatureCard icon={Server} title="REST APIs" description="A highly scalable and well-documented API driving the entire frontend interface." />
                        <FeatureCard icon={LineChart} title="Roadmaps" description="Curated learning paths guiding users through essential algorithm topics." />
                    </div>
                </section>

                {/* Section 10: Vision */}
                <section className="max-w-4xl mx-auto text-center py-16">
                    <div className="relative">
                        <span className="absolute -top-10 -left-6 text-7xl text-slate-700/30 font-serif">"</span>
                        <h2 className="text-2xl md:text-4xl font-medium text-slate-800 leading-relaxed relative z-10">
                            Building intelligent software by combining <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">scalable backend engineering</span>, artificial intelligence, and thoughtful user experience.
                        </h2>
                        <span className="absolute -bottom-16 -right-6 text-7xl text-slate-700/30 font-serif">"</span>
                    </div>
                </section>

                {/* Section 11: Future Roadmap */}
                <section>
                    <SectionHeading title="Future Roadmap" />
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-white border border-slate-200 rounded-xl p-5 text-center text-slate-600 font-medium">AI Code Review</div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 text-center text-slate-600 font-medium">Mobile App</div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 text-center text-slate-600 font-medium">Contest Prediction</div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 text-center text-slate-600 font-medium">Advanced Analytics</div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 text-center text-slate-600 font-medium">Personalized Learning</div>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 text-center text-slate-600 font-medium">More AI Agents</div>
                    </div>
                </section>

                {/* Section 12: Connect */}
                <section>
                    <SectionHeading title="Connect With Me" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        <SocialCard icon={GitBranch} title="GitHub" href="TODO" />
                        <SocialCard icon={Briefcase} title="LinkedIn" href="TODO" />
                        <SocialCard icon={Mail} title="Email" href="TODO" />
                        <SocialCard icon={Globe} title="Portfolio" href="TODO" />
                    </div>
                </section>

                {/* Section 13: Footer */}
                <footer className="pt-20 pb-8 text-center border-t border-slate-200 text-slate-500 text-sm space-y-2">
                    <div className="text-xl font-bold text-slate-600 mb-4">AIAlgoCoach</div>
                    <p>Designed, Architected, Developed, and Maintained by <span className="text-slate-600 font-medium">VAJJHA SAI KRISHNA</span></p>
                    <p>Version 1.0.0</p>
                    <p>&copy; 2026 All Rights Reserved.</p>
                </footer>

            </div>
        </div>
    );
};

export default AboutDeveloper;
