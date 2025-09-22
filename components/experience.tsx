"use client"

import { useEffect, useRef, useState } from "react"
import {
  ExternalLink,
  Award,
  Building,
  Calendar,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  X,
  ZoomIn,
  Maximize2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCertificates, setSelectedCertificates] = useState<any>(null)
  const [expandedImage, setExpandedImage] = useState<string | null>(null)
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)
  const [expandedCompanies, setExpandedCompanies] = useState<Set<number>>(new Set())
  const [expandedRoles, setExpandedRoles] = useState<Set<string>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const experiences = [
    {
      company: "Tata Consultancy Services",
      title: "Systems Engineer",
      period: "Oct 2020 - Sep 2024",
      logo: <Building className="w-6 h-6 lg:w-8 lg:h-8" />,
      summary:
        "4 years of experience as Systems Engineer working on enterprise applications, browser migration projects, and full-stack development across multiple domains including insurance and blockchain.",
      certificates: [
        {
          title: "Special Initiative Award",
          image: "/company/tcs1.jpeg",
          pdf: "/company/tcs1.pdf",
        },
        {
          title: "On the Spot Team Award",
          image: "/company/tcs2.jpeg",
          pdf: "/company/tcs2.pdf",
        },
        {
          title: "Star Team Award",
          image: "/company/tcs3.jpeg",
          pdf: "/company/tcs3.pdf",
        },
        {
          title: "Star of the Month",
          image: "/company/tcs4.jpeg",
          pdf: "/company/tcs4.pdf",
        },
        {
          title: "Special Initiative Award",
          image: "/company/tcs5.jpeg",
          pdf: "/company/tcs5.pdf",
        },
        {
          title: "Star of the Month",
          image: "/company/tcs6.jpeg",
          pdf: "/company/tcs6.pdf",
        },
      ],
      roles: [
        {
          id: "tcs-migration-lead",
          title: "Full-Stack Developer & Browser Migration Lead – ICICI Lombard",
          period: "Apr 2023 – Sep 2024",
          summary:
            "Led Chrome migration project and corporate module development, mentoring team members and delivering modernized solutions.",
          technologies: [".NET Core", "PL/SQL", "Oracle", "JavaScript", "Jira"],
          projects: [
            {
              name: "Chrome Migration Project",
              description:
                "Led the Chrome Migration Project, resolved long-standing PDF rendering issues and led the migration of UI modules from IE to Chrome, addressing over 400 critical bugs.",
              duration: "1 year",
            },
            {
              name: "Corporate Module Enhancement",
              duration: "1.5 years",
              description:
                "Developed new product flows, implemented change requests, and resolved critical bugs. Also handled production issues and mentored junior developers to ensure smooth module operations.",
            },
          ],
        },
        {
          id: "tcs-accounts-lead",
          title: "Accounts Module Lead Developer – ICICI Lombard",
          period: "Oct 2022 – Aug 2023",
          summary:
            "Solely managed the entire Accounts Module, ensuring stable backend logic and timely feature deliveries.",
          technologies: [".NET Core", "PL/SQL", "Oracle"],
          projects: [
            {
              name: "Accounts Module",
              description:
                "Handled all development and bug fixes independently, working on reconciliations, payment APIs, and reporting enhancements.",
              duration: "10 months",
            },
          ],
        },
        {
          id: "tcs-blockchain",
          title: "Blockchain Developer – BTG BI - Blockchain COE",
          period: "Jun 2022 – Sep 2022",
          summary: "Worked on blockchain-based project using Hyperledger Fabric, developing smart contract logic.",
          technologies: ["Hyperledger Fabric", "Node.js", "YAML", "Docker"],
          projects: [
            {
              name: "Blockchain Prototype",
              description:
                "Built and tested a permissioned blockchain proof-of-concept for secure and auditable asset transfers.",
              duration: "3 months",
            },
          ],
        },
        {
          id: "tcs-production",
          title: "Production Support Engineer – ICICI Prudential",
          period: "Nov 2020 – Apr 2022",
          summary: "Provided end-to-end production support for live claims and vendor management system.",
          technologies: ["ASP.NET MVC Core", "PL/SQL"],
          projects: [
            {
              name: "Claims & Vendor Management System",
              description:
                "Monitored production performance and resolved incidents to maintain SLA compliance and ensure system stability.",
              duration: "1.5 years",
            },
          ],
        },
      ],
    },
    {
      company: "Creative Capsule",
      title: "Student Intern",
      period: "Jun 2018 – Jul 2018",
      logo: <Building className="w-6 h-6 lg:w-8 lg:h-8" />,
      summary:
        "2-month internship focused on frontend development using Angular, building template-driven forms with real-time validation.",
      certificates: [
        {
          title: "Internship Certificate",
          image: "/company/Internship certificate.png",
        },
      ],
      roles: [
        {
          id: "cc-intern",
          title: "Student Intern – Frontend Developer",
          period: "2 months",
          summary: "Developed template-driven Student Form using Angular with focus on real-time validation and UI/UX.",
          technologies: ["Angular", "FormsModule", "HTML", "CSS"],
          projects: [
            {
              name: "Student Form Application",
              description:
                "Built a template-driven form using Angular's FormsModule with real-time validation, conditional error messages, and responsive layout design to improve user experience.",
              duration: "2 months",
            },
          ],
        },
      ],
    },
  ]

  const toggleCompanyExpansion = (index: number) => {
    const newExpanded = new Set(expandedCompanies)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
      const companyRoleIds = experiences[index].roles.map((role) => role.id)
      const newExpandedRoles = new Set(expandedRoles)
      companyRoleIds.forEach((id) => newExpandedRoles.delete(id))
      setExpandedRoles(newExpandedRoles)
    } else {
      newExpanded.add(index)
    }
    setExpandedCompanies(newExpanded)
  }

  const toggleRoleExpansion = (roleId: string) => {
    const newExpanded = new Set(expandedRoles)
    if (newExpanded.has(roleId)) {
      newExpanded.delete(roleId)
    } else {
      newExpanded.add(roleId)
    }
    setExpandedRoles(newExpanded)
  }

  const showCertificates = (certificates: any) => {
    setSelectedCertificates(certificates)
  }

  const closeCertificates = () => {
    setSelectedCertificates(null)
    setExpandedImage(null)
    setSelectedPdf(null)
  }

  return (
    <section ref={sectionRef} id="experience" className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              Professional Experience
            </h2>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, expIndex) => (
              <div
                key={expIndex}
                className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                style={{ transitionDelay: `${expIndex * 200}ms` }}
              >
                <div className="bg-white dark:bg-zinc-900 p-4 sm:p-6 border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1">
                      {exp.logo}
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white group-hover:scale-105 transition-transform duration-300">
                          {exp.company}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-semibold">{exp.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm font-medium">{exp.period}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Button
                        onClick={() => showCertificates(exp.certificates)}
                        size="sm"
                        className="bg-purple-400 text-black font-semibold border-2 border-black hover:bg-purple-500 hover:scale-105 transition-all duration-200 text-xs sm:text-sm"
                      >
                        <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Certificates ({exp.certificates.length})
                      </Button>
                      <Button
                        onClick={() => toggleCompanyExpansion(expIndex)}
                        size="sm"
                        className="bg-blue-400 text-black font-semibold border-2 border-black hover:bg-blue-500 hover:scale-105 transition-all duration-200 text-xs sm:text-sm"
                      >
                        {expandedCompanies.has(expIndex) ? (
                          <>
                            <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Know More
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-4">{exp.summary}</p>
                </div>

                <div
                  className={`transition-all duration-500 overflow-hidden ${expandedCompanies.has(expIndex) ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="mt-6 space-y-4">
                    {exp.roles.map((role, roleIndex) => (
                      <div key={role.id} className="ml-4 sm:ml-8">
                        <div className="bg-blue-50 dark:bg-zinc-800 p-4 sm:p-6 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                            <div className="flex-1">
                              <h4 className="text-base sm:text-lg font-bold text-black dark:text-white mb-2">{role.title}</h4>
                              <div className="bg-green-400 text-black font-bold px-2 sm:px-3 py-1 border-2 border-black dark:border-white mb-3 inline-block text-xs sm:text-sm">
                                {role.period}
                              </div>
                              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{role.summary}</p>

                              <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                                {role.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="bg-white dark:bg-zinc-900 text-black dark:text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold border border-black dark:border-white hover:scale-105 transition-all duration-200 cursor-default"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <Button
                              onClick={() => toggleRoleExpansion(role.id)}
                              size="sm"
                              className="bg-yellow-400 text-black font-semibold border-2 border-black dark:border-white hover:bg-yellow-500 hover:scale-105 transition-all duration-200 text-xs sm:text-sm self-start"
                            >
                              {expandedRoles.has(role.id) ? (
                                <>
                                  <Minus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  Hide Projects
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  View Projects
                                </>
                              )}
                            </Button>
                          </div>

                          <div
                            className={`transition-all duration-300 overflow-hidden ${expandedRoles.has(role.id) ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
                              }`}
                          >
                            <div className="border-t-2 border-black dark:border-white pt-4">
                              <h5 className="text-sm sm:text-base font-bold text-black dark:text-white mb-3">Key Projects:</h5>
                              <div className="space-y-3">
                                {role.projects.map((project, projectIndex) => (
                                  <div key={projectIndex} className="border-l-4 border-black pl-3 sm:pl-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                                      <h6 className="font-bold text-black dark:text-white text-sm sm:text-base">{project.name}</h6>
                                      <span className="bg-red-400 text-black px-2 py-1 text-xs font-bold border border-black dark:border-white self-start">
                                        {project.duration}
                                      </span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                                      {project.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Certificates Modal */}
      {selectedCertificates && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 flex items-center justify-center z-[200] p-2 sm:p-4">
          <div className="bg-white dark:bg-zinc-950 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b-4 border-black dark:border-white">
              <h3 className="text-lg sm:text-2xl font-bold">Certificates & Awards</h3>
              <Button
                onClick={closeCertificates}
                variant="ghost"
                className="text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black border-2 border-black dark:border-white p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {selectedPdf ? (
                /* Enhanced PDF Viewer */
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b-2 border-black dark:border-white flex justify-between items-center">
                    <h4 className="font-bold">Certificate PDF</h4>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => window.open(selectedPdf, "_blank")}
                        size="sm"
                        className="bg-green-400 text-black border-2 border-black dark:border-white hover:bg-green-500"
                      >
                        <Maximize2 className="w-4 h-4 mr-2" />
                        Open Full Size
                      </Button>
                      <Button
                        onClick={() => setSelectedPdf(null)}
                        size="sm"
                        className="bg-gray-200 dark:bg-zinc-800 text-black dark:text-white border-2 border-black dark:border-white hover:bg-gray-300 dark:hover:bg-zinc-700"
                      >
                        ← Back to Grid
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 p-2 sm:p-4">
                    <div className="w-full h-full min-h-[70vh] border-2 border-black dark:border-white">
                      <iframe
                        src={selectedPdf}
                        className="w-full h-full"
                        title="Certificate PDF"
                        style={{ minHeight: "70vh" }}
                      />
                    </div>
                  </div>
                </div>
              ) : expandedImage ? (
                /* Expanded Image Viewer */
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b-2 border-black dark:border-white flex justify-between items-center">
                    <h4 className="font-bold">Certificate Image</h4>
                    <Button
                      onClick={() => setExpandedImage(null)}
                      size="sm"
                      className="bg-gray-200 dark:bg-zinc-800 text-black dark:text-white border-2 border-black dark:border-white hover:bg-gray-300 dark:hover:bg-zinc-700"
                    >
                      ← Back to Grid
                    </Button>
                  </div>
                  <div className="flex-1 p-4 flex items-center justify-center">
                    <img
                      src={expandedImage || "/placeholder.svg"}
                      alt="Certificate"
                      className="max-w-full max-h-full object-contain border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                    />
                  </div>
                </div>
              ) : (
                /* Certificate Grid */
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedCertificates.map((cert: any, index: number) => (
                      <div key={index} className="bg-gray-50 dark:bg-zinc-900 p-3 sm:p-4 border-2 border-black dark:border-white group">
                        <h4 className="font-bold mb-2 text-sm sm:text-base">{cert.title}</h4>
                        {cert.image && (
                          <div className="relative mb-3">
                            <img
                              src={cert.image || "/placeholder.svg"}
                              alt={cert.title}
                              className="w-full h-24 sm:h-32 object-cover border-2 border-black dark:border-white cursor-pointer hover:scale-105 transition-transform duration-200"
                              onClick={() => setExpandedImage(cert.image)}
                            />
                            <div
                              className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center cursor-pointer"
                              onClick={() => setExpandedImage(cert.image)}
                            >
                              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </div>
                          </div>
                        )}
                        {cert.pdf && (
                          <Button
                            onClick={() => setSelectedPdf(cert.pdf)}
                            size="sm"
                            className="w-full bg-blue-400 text-black border-2 border-black dark:border-white hover:bg-blue-500 text-xs sm:text-sm"
                          >
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            View PDF
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
