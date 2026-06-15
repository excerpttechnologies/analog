// "use client";

// import { useEffect, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   Cpu,
//   Zap,
//   Shield,
//   Target,
//   Heart,
//   Eye,
//   Award,
//   Briefcase,
//   CheckCircle,
//   ArrowRight,
//   Sparkles,
//   Layers,
//   Radio,
//   Wifi,
//   Activity,
//   Microchip,
//   Bluetooth,
//   Users,
//   Building,
// } from "lucide-react";
// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";

// // Semiconductor Expertise Data - Generic company content
// const expertiseAreas = [
//   {
//     name: "Analog IC Design",
//     icon: Microchip,
//     description: "High-performance analog circuit design",
//   },
//   {
//     name: "Mixed-Signal",
//     icon: Radio,
//     description: "Integrated analog/digital solutions",
//   },
//   { name: "SERDES", icon: Wifi, description: "High-speed serial interfaces" },
//   {
//     name: "PLL Design",
//     icon: Activity,
//     description: "Clock generation & synchronization",
//   },
//   { name: "ASIC/SoC", icon: Layers, description: "Custom silicon solutions" },
//   {
//     name: "Verification",
//     icon: Shield,
//     description: "Comprehensive design verification",
//   },
//   {
//     name: "Power Management",
//     icon: Zap,
//     description: "Efficient power solutions",
//   },
//   {
//     name: "RF Design",
//     icon: Bluetooth,
//     description: "Wireless communication systems",
//   },
// ];

// // Company Values - Generic semiconductor values
// const companyValues = [
//   {
//     title: "Innovation First",
//     description: "Continuous R&D and breakthrough solutions",
//     icon: Sparkles,
//   },
//   {
//     title: "Precision Engineering",
//     description: "Meticulous attention to detail",
//     icon: Target,
//   },
//   {
//     title: "Customer Focus",
//     description: "Tailored solutions that exceed expectations",
//     icon: Users,
//   },
//   {
//     title: "Technical Excellence",
//     description: "Highest standards of engineering",
//     icon: Award,
//   },
// ];

// export default function LeadershipPage() {
//   const sectionsRef = useRef<(HTMLElement | null)[]>([]);

//   useEffect(() => {
//     // Simple fade-in animation for sections
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("opacity-100", "translate-y-0");
//             entry.target.classList.remove("opacity-0", "translate-y-8");
//           }
//         });
//       },
//       { threshold: 0.1, rootMargin: "50px" },
//     );

//     sectionsRef.current.forEach((section) => {
//       if (section) observer.observe(section);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const addToRefs = (el: HTMLElement | null, index: number) => {
//     if (el) sectionsRef.current[index] = el;
//   };

//   return (
//     <>
//       <Navbar />
//       <main className="bg-white">
//         {/* Hero Section */}
//         <section className="relative py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div className="text-center max-w-3xl mx-auto">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-6">
//                 <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
//                 <span className="text-xs font-medium text-cyan-700">
//                   Leadership
//                 </span>
//               </div>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
//                 Leadership Team
//               </h1>
//               <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
//                 Leadership information will be updated soon.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Leadership Team Placeholder Section - Replaces fake executive profile */}
//         <section
//           ref={(el) => addToRefs(el, 0)}
//           className="py-8 opacity-0 translate-y-8 transition-all duration-700 ease-out"
//         >
//           <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
//             <div className="text-center mb-12">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
//                 <Users className="w-3.5 h-3.5 text-cyan-600" />
//                 <span className="text-xs font-medium text-cyan-700">
//                   Executive Team
//                 </span>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
//                 Coming Soon
//               </h2>
//               <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//                 Detailed leadership profiles are currently being finalized and
//                 will be published soon.
//               </p>
//             </div>

//             {/* Professional Placeholder Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
//               {[1, 2, 3].map((item) => (
//                 <div
//                   key={item}
//                   className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//                 >
//                   {/* Placeholder Image */}
//                   <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
//                     <div className="w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center">
//                       <Building className="w-14 h-14 text-slate-400" />
//                     </div>
//                   </div>

//                   {/* Placeholder Content */}
//                   <div className="p-6 text-center">
//                     <div className="h-5 w-32 bg-slate-200 rounded mx-auto mb-2 animate-pulse" />
//                     <div className="h-4 w-24 bg-slate-100 rounded mx-auto mb-4 animate-pulse" />
//                     <div className="space-y-2">
//                       <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
//                       <div className="h-3 w-3/4 bg-slate-100 rounded mx-auto animate-pulse" />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Cpu,
  Zap,
  Shield,
  Target,
  Heart,
  Eye,
  Award,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Layers,
  Radio,
  Wifi,
  Activity,
  Microchip,
  Bluetooth,
  Users,
  Building,
  Mail,
  Linkedin,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Leadership Team Data
const leadershipTeam = [
  {
    name: "Leadership #1",
    title: "Chief Executive Officer",
    expertise: "30+ years in Analog & Mixed-Signal IC Design",
    description:
      "Leading strategic vision and technical direction with deep expertise in analog semiconductor development.",
    image: "/images/leadership-1.jpg",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Leadership #2",
    title: "Chief Technology Officer",
    expertise: "28+ years in Power Management & IP Development",
    description:
      "Driving innovation in power management solutions and analog IP portfolio development.",
    image: "/images/leadership-2.jpg",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Leadership #3",
    title: "VP of Engineering",
    expertise: "32+ years in Product Development & Verification",
    description:
      "Overseeing product development lifecycle and engineering excellence across all initiatives.",
    image: "/images/leadership-3.jpg",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Leadership #4",
    title: "VP of Marketing & Sales",
    expertise: "30+ years in Semiconductor Marketing & Customer Relations",
    description:
      "Building customer relationships and driving market adoption of analog IPs and products.",
    image: "/images/leadership-4.jpg",
    linkedin: "#",
    email: "#",
  },
];

// Advisory Board Members
const advisoryMembers = [
  {
    name: "Member #1",
    title: "Strategic Advisor",
    expertise:
      "Industry veteran with extensive semiconductor ecosystem experience",
    description:
      "Providing strategic guidance on market expansion and technology roadmap.",
    image: "/images/advisory-1.jpg",
  },
  {
    name: "Member #2",
    title: "Technical Advisor",
    expertise: "Expert in advanced analog and mixed-signal architectures",
    description:
      "Advising on technical innovation and next-generation product development.",
    image: "/images/advisory-2.jpg",
  },
];

export default function LeadershipPage() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el) sectionsRef.current[index] = el;
  };

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative py-20  bg-gradient-to-b from-slate-50 to-white overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span className="text-xs font-medium text-cyan-700">
                  Leadership
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Leadership Team
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                ACT Technical leadership and Management team comes with 120+
                years of Analog focused Semiconductor Domain expertise for IPs
                and Product development, Marketing and Customer relationship.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Team Section */}
        <section
          ref={(el) => addToRefs(el, 0)}
          className="py-10 opacity-0 translate-y-8 transition-all duration-700 ease-out"
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
                <Users className="w-3.5 h-3.5 text-cyan-600" />
                <span className="text-xs font-medium text-cyan-700">
                  Executive Team
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Meet Our Leadership
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Experienced leaders driving ACT's innovation for the Development
                of Analog IPs and Products
              </p>
            </div>

            {/* Leadership Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {leadershipTeam.map((leader, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Image Placeholder - Replace with actual photos */}
                  <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                    <div className="w-32 h-32 rounded-full bg-white shadow-md flex items-center justify-center border-4 border-white">
                      <Building className="w-16 h-16 text-slate-400" />
                    </div>
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-sm font-semibold text-cyan-600 mb-2">
                      {leader.title}
                    </p>
                    <p className="text-xs text-slate-500 mb-3">
                      {leader.expertise}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {leader.description}
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-slate-100">
                      <a
                        href={leader.email}
                        className="p-2 rounded-lg bg-slate-50 hover:bg-cyan-50 transition-colors duration-300"
                        aria-label="Email"
                      >
                        <Mail className="w-4 h-4 text-slate-500 hover:text-cyan-600" />
                      </a>
                      <a
                        href={leader.linkedin}
                        className="p-2 rounded-lg bg-slate-50 hover:bg-cyan-50 transition-colors duration-300"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4 text-slate-500 hover:text-cyan-600" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advisory Board Section */}
        <section
          ref={(el) => addToRefs(el, 1)}
          className="py-16 bg-slate-50 opacity-0 translate-y-8 transition-all duration-700 ease-out"
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
                <Award className="w-3.5 h-3.5 text-cyan-600" />
                <span className="text-xs font-medium text-cyan-700">
                  Advisory Board
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Advisory Board
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Meet the experienced leaders and advisory board members driving
                ACT's innovation for the Development of Analog IPs and Products
              </p>
            </div>

            {/* Advisory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {advisoryMembers.map((member, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-2/5 relative h-48 md:h-auto bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center">
                        <Briefcase className="w-12 h-12 text-slate-400" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-3/5 p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm font-semibold text-cyan-600 mb-2">
                        {member.title}
                      </p>
                      <p className="text-xs text-slate-500 mb-3">
                        {member.expertise}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Future Addition Notice */}
        <section
          ref={(el) => addToRefs(el, 2)}
          className="py-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 text-center border border-slate-200">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 mb-4">
                <Users className="w-3.5 h-3.5 text-cyan-600" />
                <span className="text-xs font-medium text-slate-700">
                  Growing Team
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                More Leaders Joining Soon
              </h3>
              <p className="text-slate-600">
                We are continuously expanding our leadership team with top
                industry talent. Stay tuned for updates as we add more
                experienced professionals to drive our mission forward.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
