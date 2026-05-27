import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Brain,
    BarChart3,
    Flame,
    Trophy,
    ArrowRight
} from "lucide-react";

function Home() {

    const navigate = useNavigate();

    const [handle, setHandle] = useState("");



    const handleAnalyze = () => {

        if (!handle.trim()) {
            return;
        }

        navigate(`/dashboard/${handle}`);
    };



    return (

        <div
            className="
                min-h-screen
                bg-[#f5f7ff]
                text-slate-900
            "
        >

            {/* ================= NAVBAR ================= */}

            <header
                className="
                    flex
                    items-center
                    justify-between
                    px-10
                    py-6
                "
            >

                {/* LOGO */}

                <div>

                    <h1
                        className="
                            text-5xl
                            font-black
                            tracking-[-2px]
                            bg-gradient-to-r
                            from-blue-600
                            via-indigo-600
                            to-purple-600
                            bg-clip-text
                            text-transparent
                        "
                    >
                        AlgoCoach AI
                    </h1>

                    <p
                        className="
                            text-slate-500
                            mt-2
                            text-lg
                            font-medium
                        "
                    >
                        AI-Powered Competitive Programming Mentor
                    </p>

                </div>



                {/* NAVIGATION */}

                <div
                    className="
                        flex
                        items-center
                        gap-4
                    "
                >

                    <button
                        className="
                            px-6
                            py-3
                            rounded-2xl
                            font-semibold
                            text-slate-700
                            hover:bg-white
                            transition-all
                        "
                    >
                        Login
                    </button>

                    <button
                        className="
                            px-6
                            py-3
                            rounded-2xl
                            font-bold
                            text-white
                            bg-gradient-to-r
                            from-blue-600
                            to-indigo-600
                            shadow-lg
                            hover:scale-[1.02]
                            transition-all
                        "
                    >
                        Signup
                    </button>

                </div>

            </header>



            {/* ================= HERO SECTION ================= */}

            <section
                className="
                    max-w-7xl
                    mx-auto
                    px-10
                    pt-20
                    pb-24
                    grid
                    lg:grid-cols-2
                    gap-20
                    items-center
                "
            >

                {/* LEFT CONTENT */}

                <div>

                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-5
                            py-2
                            rounded-full
                            bg-blue-100
                            text-blue-700
                            font-semibold
                            mb-8
                        "
                    >
                        <Brain size={18} />

                        AI Powered Analytics Platform
                    </div>



                    <h2
                        className="
                            text-7xl
                            leading-[1.05]
                            font-black
                            tracking-[-3px]
                            text-slate-900
                        "
                    >
                        Analyze Competitive Programming Like Never Before
                    </h2>



                    <p
                        className="
                            mt-8
                            text-2xl
                            leading-10
                            text-slate-600
                            max-w-2xl
                        "
                    >
                        Track Codeforces performance, visualize rating growth,
                        discover weak topics, generate AI insights,
                        and improve strategically.
                    </p>



                    {/* SEARCH BAR */}

                    <div
                        className="
                            mt-12
                            flex
                            items-center
                            bg-white
                            rounded-3xl
                            shadow-xl
                            p-3
                            max-w-2xl
                        "
                    >

                        <input
                            type="text"
                            placeholder="Enter Codeforces Handle"
                            value={handle}
                            onChange={(e) => setHandle(e.target.value)}
                            className="
                                flex-1
                                px-6
                                py-5
                                text-xl
                                outline-none
                                rounded-2xl
                            "
                        />



                        <button
                            onClick={handleAnalyze}
                            className="
                                flex
                                items-center
                                gap-3
                                px-8
                                py-5
                                rounded-2xl
                                text-white
                                font-bold
                                text-lg
                                bg-gradient-to-r
                                from-blue-600
                                to-indigo-600
                                shadow-lg
                                hover:scale-[1.02]
                                transition-all
                            "
                        >

                            Analyze

                            <ArrowRight size={20} />

                        </button>

                    </div>

                </div>



                {/* RIGHT VISUAL */}

                <div
                    className="
                        bg-white/70
                        backdrop-blur-xl
                        rounded-[40px]
                        border
                        border-white/60
                        shadow-2xl
                        p-10
                    "
                >

                    <div
                        className="
                            grid
                            grid-cols-2
                            gap-6
                        "
                    >

                        <FeatureCard
                            icon={<BarChart3 size={28} />}
                            title="Rating Analytics"
                            description="Track rating progression and contest growth trends."
                        />

                        <FeatureCard
                            icon={<Brain size={28} />}
                            title="AI Mentor"
                            description="Get AI-generated recommendations and improvement plans."
                        />

                        <FeatureCard
                            icon={<Flame size={28} />}
                            title="Heatmaps"
                            description="Visualize coding consistency and activity patterns."
                        />

                        <FeatureCard
                            icon={<Trophy size={28} />}
                            title="Contest Insights"
                            description="Analyze contest performance and ranking behavior."
                        />

                    </div>

                </div>

            </section>

        </div>
    );
}



/* ================= FEATURE CARD ================= */

function FeatureCard({
    icon,
    title,
    description
}) {

    return (

        <div
            className="
                bg-white
                rounded-3xl
                p-8
                shadow-lg
                border
                border-slate-100
            "
        >

            <div
                className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-600
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    mb-6
                "
            >
                {icon}
            </div>



            <h3
                className="
                    text-2xl
                    font-black
                    text-slate-900
                    mb-3
                "
            >
                {title}
            </h3>



            <p
                className="
                    text-slate-600
                    leading-8
                    text-lg
                "
            >
                {description}
            </p>

        </div>
    );
}

export default Home;