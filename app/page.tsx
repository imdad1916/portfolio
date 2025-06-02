"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  ExternalLink,
  Download,
  Code,
  Briefcase,
  FileText,
  User,
  Moon,
  Sun,
  ArrowRight,
  MapPin,
  Calendar,
  Sparkles,
  Zap,
  Target,
} from "lucide-react"
import Image from "next/image"

// Create a stable array of animation properties to avoid hydration mismatches
const backgroundElements = [
  { left: "10%", top: "20%", delay: "0.5s", duration: "3s" },
  { left: "30%", top: "60%", delay: "1.2s", duration: "3.5s" },
  { left: "50%", top: "40%", delay: "0.8s", duration: "2.8s" },
  { left: "70%", top: "70%", delay: "1.5s", duration: "3.2s" },
  { left: "90%", top: "30%", delay: "0.3s", duration: "2.5s" },
  { left: "20%", top: "80%", delay: "1.8s", duration: "3.8s" },
  { left: "40%", top: "10%", delay: "0.7s", duration: "2.7s" },
  { left: "60%", top: "50%", delay: "1.1s", duration: "3.1s" },
]

// Create stable floating elements for intro section
const floatingElements = [
  { left: "20%", top: "30%", delay: "0s" },
  { left: "50%", top: "50%", delay: "1s" },
  { left: "80%", top: "70%", delay: "2s" },
]

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("intro")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
    let mouseAnimationFrameId: number
    let scrollAnimationFrameId: number
    let isMouseUpdateScheduled = false
    let isScrollUpdateScheduled = false

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseUpdateScheduled) {
        isMouseUpdateScheduled = true
        mouseAnimationFrameId = requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY })
          isMouseUpdateScheduled = false
        })
      }
    }

    const handleScroll = () => {
      if (!isScrollUpdateScheduled) {
        isScrollUpdateScheduled = true
        scrollAnimationFrameId = requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          isScrollUpdateScheduled = false
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      if (mouseAnimationFrameId) {
        cancelAnimationFrame(mouseAnimationFrameId)
      }
      if (scrollAnimationFrameId) {
        cancelAnimationFrame(scrollAnimationFrameId)
      }
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  const navItems = [
    { id: "intro", label: "Intro", icon: User },
    { id: "work", label: "Work", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Code },
    { id: "about", label: "About", icon: FileText },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  return (
    <div
      ref={containerRef}
      className={`min-h-screen transition-all duration-1000 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      } overflow-x-hidden`}
    >
      {/* Custom cursor - hidden on mobile */}
      <div
        className={`fixed w-6 h-6 rounded-full pointer-events-none z-50 transition-all duration-100 ease-out will-change-transform hidden sm:hidden md:block ${
          isDarkMode ? "bg-white mix-blend-difference" : "bg-black mix-blend-difference"
        }`}
        style={{
          transform: `translate3d(${mousePosition.x - 12}px, ${mousePosition.y - 12}px, 0) scale(${isLoaded ? 1 : 0})`,
        }}
      />

      {/* Interactive background elements - using stable predefined positions */} 
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {backgroundElements.map((elem, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full will-change-transform ${
              isDarkMode ? "bg-blue-400/20" : "bg-blue-600/20"
            } animate-pulse`}
            style={{
              left: elem.left,
              top: elem.top,
              animationDelay: elem.delay,
              animationDuration: elem.duration,
              transform: `translate3d(0, ${scrollY * 0.05}px, 0)`,
            }}
          />
        ))}
      </div>

      {/* Grain overlay */}
      <div
        className="fixed inset-0 opacity-[0.015] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Side Navigation */}
      <nav className="fixed left-0 top-0 h-full w-16 md:w-20 z-40 flex flex-col items-center justify-between py-4 md:py-8">
        {/* Logo */}
        <div
          className={`w-8 h-8 md:w-12 md:h-12 rounded-full border-2 ${
            isDarkMode ? "border-white" : "border-black"
          } flex items-center justify-center font-bold text-base md:text-lg cursor-pointer hover:scale-110 transition-all duration-300 hover:rotate-12`}
          style={{
            transform: `translateY(${isLoaded ? 0 : -50}px)`,
            opacity: isLoaded ? 1 : 0,
            transitionDelay: "200ms",
          }}
        >
          SMI
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col space-y-8">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative p-3 transition-all duration-300 hover:scale-110 ${
                activeSection === item.id ? "scale-110" : ""
              }`}
              style={{
                transform: `translateX(${isLoaded ? 0 : -50}px)`,
                opacity: isLoaded ? 1 : 0,
                transitionDelay: `${300 + index * 100}ms`,
              }}
            >
              <item.icon
                size={20}
                className={`transition-all duration-300 ${
                  activeSection === item.id
                    ? isDarkMode
                      ? "text-blue-400"
                      : "text-blue-600"
                    : isDarkMode
                      ? "text-gray-400 group-hover:text-white"
                      : "text-gray-600 group-hover:text-black"
                }`}
              />
              <span
                className={`absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap ${
                  isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex flex-col space-y-4">
          <a
            href="https://github.com/imdad1916"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 transition-all duration-300 hover:scale-110 hover:rotate-12 ${
              isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
            }`}
            style={{
              transform: `translateX(${isLoaded ? 0 : -50}px)`,
              opacity: isLoaded ? 1 : 0,
              transitionDelay: "800ms",
            }}
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/imdad07/"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 transition-all duration-300 hover:scale-110 hover:rotate-12 ${
              isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
            }`}
            style={{
              transform: `translateX(${isLoaded ? 0 : -50}px)`,
              opacity: isLoaded ? 1 : 0,
              transitionDelay: "900ms",
            }}
          >
            <Linkedin size={18} />
          </a>
        </div>
      </nav>

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-8 right-8 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-180 z-40 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
        }`}
        style={{
          transform: `translateY(${isLoaded ? 0 : -50}px)`,
          opacity: isLoaded ? 1 : 0,
          transitionDelay: "1000ms",
        }}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Main Content */}
      <main className="ml-16 md:ml-20">
        {/* Intro Section */}
        <section id="intro" className="min-h-screen flex items-center justify-center px-4 md:px-16 relative">
          <div className="max-w-4xl">
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        {/* Add profile image */}
        <div className="relative w-64 h-72 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/imdad.jpg" 
            alt="Imdad"
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>

                {/* Name and Description */}
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tight">
                    SHAIK MOHAMMAD
                    <br />
                    <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      IMDADULLAH
                    </span>
                  </h1>
                  <p className={`text-lg md:text-xl lg:text-2xl font-light $$
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } max-w-2xl`}>
                    Aspiring Cloud & DevOps Engineer experiences with modern technologies
                  </p>
                </div>
              </div>

              {/* Update button group */}
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 pt-8">
                <Button
                  onClick={() => scrollToSection("work")}
                  className={`group px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full md:w-auto ${
                    isDarkMode ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  View My Work
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </Button>

                <Button
                  variant="outline"
                  asChild
                  className={`px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full md:w-auto ${
                    isDarkMode
                      ? "border-white text-black hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  <a href="/imdad_resume.pdf" download="imdad_Resume.pdf">
                    <Download className="mr-2" size={16} />
                    Resume
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Floating elements with stable positions */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {floatingElements.map((elem, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 rounded-full opacity-20 ${isDarkMode ? "bg-white" : "bg-black"}`}
                style={{
                  left: elem.left,
                  top: elem.top,
                  transform: `translate3d(0, ${scrollY * 0.03}px, 0)`,
                  animation: `float ${3 + i}s ease-in-out infinite`,
                  animationDelay: elem.delay,
                }}
              />
            ))}
          </div>
        </section>

        {/* Work Experience */}
        <section id="work" className="min-h-screen px-4 md:px-16 py-16 md:py-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light mb-12 md:mb-20 tracking-tight">Work Experience</h2>

            <div className="space-y-16">
              {[
                {
                  title: "Salesforce Developer Intern",
                  subtitle: "Virtual Internship",
                  company: "Smart Bridge",
                  period: "Dec 2024 - March 2025",
                 description:
    "Successfully completed an 8-week Salesforce Developer Virtual Internship from December 2024 to March 2025, organized by Smartbridge in partnership with Salesforce and AICTE.\n\n" +
    "During this internship, gained hands-on experience with key Salesforce concepts, including Salesforce fundamentals, organizational setup, relationship and process automation, types of flows, security, Apex programming, testing, debugging, VS Code and CLI setup, as well as Lightning Web Components (LWC) and APIs.\n\n" +
    "Earned prestigious super badges such as Apex Specialist, Process Automation Specialist, and Developer Super Set, showcasing ability to apply Salesforce development skills to real-world business scenarios. This internship has strengthened technical expertise and prepared for advanced roles in Salesforce development and automation projects.",
  status: "Current",
                },
                
              ].map((job, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                  style={{
                    transform: `translateY(${isLoaded ? 0 : 50}px)`,
                    opacity: isLoaded ? 1 : 0,
                    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: `${1000 + index * 200}ms`,
                  }}
                >
                  <div
                    className={`p-8 rounded-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl ${
                      isDarkMode ? "bg-gray-900/50 group-hover:bg-gray-900/80" : "bg-gray-50 group-hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4 flex-col md:flex-row">
                      <div>
                        <h3 className="text-2xl font-medium mb-2 md:mb-0">
                          {job.title}
                          {job.subtitle && (
                            <span className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              {" "}
                              ({job.subtitle})
                            </span>
                          )}
                        </h3>
                        <p className={`text-lg ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>{job.company}</p>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 md:mt-0">
                        <Badge
                          variant={job.status === "Current" ? "default" : "outline"}
                          className={`text-xs md:text-sm ${
                            isDarkMode
                              ? job.status === "Current"
                                ? "bg-green-600 text-white"
                                : "border-gray-600 text-gray-300"
                              : job.status === "Current"
                                ? "bg-green-600 text-white"
                                : "border-gray-400 text-gray-700"
                          }`}
                        >
                          <Calendar className="mr-1 hidden md:inline" size={12} />
                          <span className="md:hidden">
                            {job.period.split(" - ").pop()?.split(" ")[0]} {/* Shows only month for mobile */}
                          </span>
                          <span className="hidden md:inline">{job.period}</span>
                        </Badge>
                      </div>
                    </div>
                    <p className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {job.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className={`min-h-screen px-4 md:px-16 py-16 md:py-32 ${isDarkMode ? "bg-gray-900/30" : "bg-gray-50"}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light mb-12 md:mb-20 tracking-tight">Selected Projects</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              {[
                {
                  title: "Smart Cage",
                  description:
                    "Smart Cage is an IoT-based system that monitors and controls environmental conditions for pets or livestock, ensuring their well-being through real-time data and automation. It integrates sensors, connectivity to optimize temperature, humidity, and feeding schedules.",
                  tech: ["IOT"],
                  year: "2024",
                  status: "Live",
                },
                {
                  title: "Automated RENEWAL Management for Subscription Products",
                  description:
                    "This project focuses on automating the renewal process for subscription-based products using Salesforce. The goal is to reduce manual work, ensure timely renewals, improve customer retention, and boost revenue.",
                  tech: ["Salesforce"],
                  year: "2025",
                  status: "Live",
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                  style={{
                    transform: `translateY(${isLoaded ? 0 : 50}px)`,
                    opacity: isLoaded ? 1 : 0,
                    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: `${1200 + index * 200}ms`,
                  }}
                >
                  <Card
                    className={`h-full transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:rotate-1 ${
                      isDarkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"
                    }`}
                  >
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <h3 className={`text-2xl font-medium ${isDarkMode ? "text-white" : "text-black"}`}>
                          {project.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={project.status === "Live" ? "default" : "outline"}
                            className={`text-sm ${
                              isDarkMode
                                ? project.status === "Live"
                                  ? "bg-green-600 text-white"
                                  : "border-gray-600 text-gray-300"
                                : project.status === "Live"
                                  ? "bg-green-600 text-white"
                                  : "border-gray-400 text-gray-700"
                            }`}
                          >
                            {project.year}
                          </Badge>
                        </div>
                      </div>

                      <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className={`text-sm hover:scale-105 transition-transform cursor-pointer ${
                              isDarkMode
                                ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                                : "border-gray-300 text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        variant="ghost"
                        asChild
                        className={`group/btn p-0 h-auto font-medium hover:bg-transparent ${
                          isDarkMode ? "text-white hover:text-blue-400" : "text-black hover:text-blue-600"
                        }`}
                      >
                        <a href="https://github.com/imdad1916" target="_blank" rel="noopener noreferrer">
                          View Project
                          <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="min-h-screen px-4 md:px-16 py-16 md:py-32">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light mb-12 md:mb-20 tracking-tight">About</h2>

            <div className="space-y-16">
              <div
                style={{
                  transform: `translateY(${isLoaded ? 0 : 50}px)`,
                  opacity: isLoaded ? 1 : 0,
                  transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: "800ms",
                }}
              >
                <p className={`text-2xl leading-relaxed font-light ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  I'm pursuing a Bachelor of Technology in Information Technology at KKR & KSR Institute of Technology & Sciences, with prior academic credentials including an Associate's Degree in Mechanical Engineering.
                  I am passionate about Cloud Computing,and Salesforce, with hands-on knowledge in: Microsoft Azure (AZ-900 Certified) Salesforce Platform Development (PD-1 Certified)
                  In addition to my cloud expertise, I have developed strong technical skills across AZURE, Python, Java, and loT technologies, continuously expanding my knowledge and staying updated with the latest industry trends. I am driven by a commitment to innovation and a desire to contribute effectively in dynamic, tech-driven environments.
                </p>
              </div>

              {/* Interactive Skills Grid */}
              <div className="relative">
                <h3 className="text-xl font-medium mb-12 flex items-center">
                  <Sparkles className="mr-2" size={24} />
                  Technical Skills
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                  {[
                    { name: "AWS", icon: "☁️", category: "Cloud" },
                    { name: "Azure", icon: "⚡", category: "Cloud" },
                    { name: "Python", icon: "🐍", category: "Language" },
                    { name: "Java", icon: "☕", category: "Language" },
                    { name: "IOT", icon: "🔌", category: "Technology" },
                    { name: "Salesforce", icon: "⚡☁️", category: "CRM" },
                    { name: "SQL", icon: "📊", category: "Database" },
                    { name: "HTML", icon: "🌐", category: "Markup" },
                    { name: "CSS", icon: "🎨", category: "Styling" },
                  ].map((skill, index) => (
                    <div
                      key={skill.name}
                      className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-110 hover:-rotate-2 ${
                        isDarkMode ? "bg-gray-900/50 hover:bg-gray-800/80" : "bg-gray-50 hover:bg-gray-100"
                      }`}
                      style={{
                        transform: `translateY(${isLoaded ? 0 : 50}px)`,
                        opacity: isLoaded ? 1 : 0,
                        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                        transitionDelay: `${1200 + index * 100}ms`,
                      }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                          {skill.icon}
                        </div>
                        <h4 className={`font-medium text-lg mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>
                          {skill.name}
                        </h4>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{skill.category}</p>
                      </div>

                      {/* Hover effect */}
                      {hoveredSkill === skill.name && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Other Info */}
              <div className="grid md:grid-cols-2 gap-12">
                <div
                  style={{
                    transform: `translateY(${isLoaded ? 0 : 50}px)`,
                    opacity: isLoaded ? 1 : 0,
                    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: "1000ms",
                  }}
                >
                  <h3 className="text-xl font-medium mb-6 flex items-center">
                    <Target className="mr-2" size={20} />
                    Education
                  </h3>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-900/50" : "bg-gray-50"}`}>
                      <h4 className="font-medium">Bachelor's Degree</h4>
                      <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        K.I.T.S (2021-Present)
                      </p>
                      <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>CGPA: 7.9/10.0</p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-900/50" : "bg-gray-50"}`}>
                      <h4 className="font-medium">Diploma (M.E)</h4>
                      <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>M.B.T.S GOVT POLYTECHNIC (82%)</p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    transform: `translateY(${isLoaded ? 0 : 50}px)`,
                    opacity: isLoaded ? 1 : 0,
                    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: "1200ms",
                  }}
                >
                  <h3 className="text-xl font-medium mb-6 flex items-center">
                    <Zap className="mr-2" size={20} />
                    Interests
                  </h3>
                  <div className="space-y-3">
                    {["Cloud Computing", "Salesforce", "IOT", "Modern Clould Technologies"].map(
                      (interest, index) => (
                        <div
                          key={interest}
                          className={`p-3 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
                            isDarkMode ? "bg-gray-900/50 hover:bg-gray-800/80" : "bg-gray-50 hover:bg-gray-100"
                          }`}
                        >
                          <span className="text-lg">{interest}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Publication - Commented out
              <div
                className={`p-8 rounded-2xl transition-all duration-500 hover:scale-[1.02] ${
                  isDarkMode ? "bg-gray-900/50 hover:bg-gray-800/80" : "bg-gray-50 hover:bg-gray-100"
                }`}
                style={{
                  transform: `translateY(${isLoaded ? 0 : 50}px)`,
                  opacity: isLoaded ? 1 : 0,
                  transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: "1400ms",
                }}
              >
                <h3 className="text-xl font-medium mb-4">Recent Publication</h3>
                <p className="text-lg mb-2">
                  "Cholangiocarcinoma Classification using MedisawHSI: A Breakthrough in Medical Imaging"
                </p>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
                  2024 International Conference on Emerging Trends in Information Technology and Engineering (ICETITE)
                </p>
                <Button
                  variant="ghost"
                  asChild
                  className={`group/btn p-0 h-auto font-medium hover:bg-transparent ${
                    isDarkMode ? "text-white hover:text-blue-400" : "text-black hover:text-blue-600"
                  }`}
                >
                  <a
                    href="https://doi.org/10.1109/ic-ETITE58242.2024.10493579"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Paper
                    <ExternalLink className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                  </a>
                </Button>
              </div>
              */}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={`min-h-screen px-4 md:px-16 py-16 md:py-32 ${isDarkMode ? "bg-gray-900/30" : "bg-gray-50"}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light mb-12 md:mb-20 tracking-tight">Get In Touch</h2>

            <div
              style={{
                transform: `translateY(${isLoaded ? 0 : 50}px)`,
                opacity: isLoaded ? 1 : 0,
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "600ms",
              }}
            >
              <p
                className={`text-2xl leading-relaxed font-light mb-16 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about
                technology. Feel free to reach out!
              </p>

              <div className="space-y-8">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "iamimdad.07@gmail.com",
                    href: "mailto:iamimdad.07@gmail.com",
                  },
                  { icon: Phone, label: "Phone", value: "+91 9391184634", href: "tel:+919391184634" },
                  { icon: MapPin, label: "Location", value: "Andhra Pradesh, India", href: null },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="group flex items-center space-x-6 py-4 cursor-pointer hover:translate-x-2 transition-all duration-300 hover:scale-105"
                  >
                    <contact.icon
                      className={`${isDarkMode ? "text-gray-400 group-hover:text-white" : "text-gray-600 group-hover:text-black"} transition-colors`}
                      size={24}
                    />
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-1`}>
                        {contact.label}
                      </p>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          className={`text-xl hover:underline ${isDarkMode ? "text-white" : "text-black"}`}
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className={`text-xl ${isDarkMode ? "text-white" : "text-black"}`}>{contact.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
  @keyframes float {
    0%, 100% { 
      transform: translateY(0px); 
    }
    50% { 
      transform: translateY(-10px); 
    }
  }
  
  @keyframes pulse {
    0%, 100% { 
      opacity: 0.1;
      transform: scale(1);
    }
    50% { 
      opacity: 0.3;
      transform: scale(1.1);
    }
  }
  
  * {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
`}</style>
    </div>
  )
}
