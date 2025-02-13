import type { Job } from "../../../types/career"

export const jobs: Job[] = [
    {
        id: 1,
        title: "Frontend Developer",
        department: "Engineering",
        location: "Remote",
        shortDescription:
            "We're looking for a talented Frontend Developer to join our team and help build amazing user experiences.",
        requirements: [
            "3+ years of experience with React",
            "Proficiency in TypeScript",
            "Experience with Next.js",
            "Strong understanding of web performance optimization",
        ],
    },
    {
        id: 2,
        title: "UX Designer",
        department: "Design",
        location: "New York, NY",
        shortDescription:
            "Join our design team to create intuitive and engaging user experiences for our financial products.",
        requirements: [
            "5+ years of UX design experience",
            "Strong portfolio demonstrating user-centered design process",
            "Experience with design tools like Figma or Sketch",
            "Knowledge of user research and usability testing",
        ],
    },
    {
        id: 3,
        title: "Data Scientist",
        department: "Data",
        location: "San Francisco, CA",
        shortDescription:
            "We're seeking a Data Scientist to help us derive insights from our vast amount of financial data.",
        requirements: [
            "Advanced degree in Computer Science, Statistics, or related field",
            "Experience with machine learning and statistical modeling",
            "Proficiency in Python and SQL",
            "Knowledge of financial markets is a plus",
        ],
    },
]

