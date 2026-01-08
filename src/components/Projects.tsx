import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Github, ArrowRight, Cloud, DollarSign, X, Server, GitBranch, Shield, Zap } from 'lucide-react';

const projects = [
  {
    title: 'Two-tier Flaskapp Deployment',
    description: 'A comprehensive CI/CD pipeline for deploying a two-tier Flask application using Docker containers and Kubernetes orchestration.',
    tags: ['Docker', 'Kubernetes', 'Flask', 'MySQL', 'Jenkins'],
    icon: Cloud,
    color: 'primary',
    highlights: ['High Availability', 'Scalable Design', 'Secure VPC'],
    github: 'https://github.com/Hemanshubt/two-tier-flaskapp',
    readme: {
      overview: 'A comprehensive CI/CD pipeline for deploying a two-tier Flask application using Docker containers and Kubernetes orchestration.',
      features: [
        'Containerized Flask application with Docker',
        'MySQL database integration with persistent storage',
        'Kubernetes deployment with auto-scaling',
        'Jenkins CI/CD pipeline automation',
        'Health checks and monitoring'
      ],
      architecture: [
        'Frontend: Flask Web Application',
        'Backend: MySQL Database',
        'Container: Docker with multi-stage builds',
        'Orchestration: Kubernetes with Helm charts',
        'CI/CD: Jenkins pipeline with automated testing'
      ],
      techStack: ['Python', 'Flask', 'MySQL', 'Docker', 'Kubernetes', 'Jenkins', 'Helm']
    }
  },
  {
    title: 'Node.js To-Do CI/CD Pipeline',
    description: 'Implemented an automated CI/CD pipeline for a Node.js To-Do application using Jenkins, Docker, and AWS infrastructure.',
    tags: ['Node.js', 'Jenkins', 'Docker', 'AWS', 'Terraform'],
    icon: Server,
    color: 'secondary',
    highlights: ['Cost Optimized', 'Automated Testing', 'Real-time Monitoring'],
    github: 'https://github.com/Hemanshubt/Node-todo-app-main',
    readme: {
      overview: 'Implemented an automated CI/CD pipeline for a Node.js To-Do application using Jenkins, Docker, and AWS infrastructure.',
      features: [
        'Automated build and deployment pipeline',
        'Docker containerization for consistency',
        'AWS EC2 deployment with auto-scaling',
        'Terraform infrastructure as code',
        'Automated testing integration'
      ],
      architecture: [
        'Application: Node.js Express server',
        'Database: MongoDB/MySQL',
        'Infrastructure: AWS EC2, VPC, Security Groups',
        'IaC: Terraform for resource provisioning',
        'CI/CD: Jenkins with webhook triggers'
      ],
      techStack: ['Node.js', 'Express', 'Docker', 'Jenkins', 'AWS', 'Terraform']
    }
  },
  {
    title: 'Scalable AWS Deployment with Kubernetes',
    description: 'Designed CI/CD pipeline for Flask/MySQL app, doubling capacity to 20,000 users. Achieved 99.9% uptime with Docker, Kubernetes, and Helm.',
    tags: ['Amazon EKS', 'Kubernetes', 'Helm', 'Terraform', 'AWS VPC'],
    icon: Cloud,
    color: 'primary',
    highlights: ['99.9% Uptime', '2x User Capacity', '80% Faster Setup'],
    github: '#',
    readme: {
      overview: 'Designed and implemented a CI/CD pipeline for a Flask/MySQL application, doubling user capacity from 10,000 to 20,000 users.',
      features: [
        'Scalable Pipeline Design: Doubled user capacity to 20,000',
        'High-Availability System: 99.9% uptime, 60% reduced downtime',
        'Deployment Acceleration: 30% improved efficiency, 80% faster setup',
        'VPC Security Architecture: 100% internal traffic isolation'
      ],
      architecture: [
        'Container Orchestration: Amazon EKS',
        'Package Management: Helm Charts',
        'Infrastructure: Terraform IaC',
        'Networking: AWS VPC with private subnets',
        'Load Balancing: Application Load Balancer'
      ],
      techStack: ['Amazon EKS', 'Kubernetes', 'Helm', 'Terraform', 'AWS VPC', 'Docker', 'Flask', 'MySQL']
    }
  },
  {
    title: 'Cost-Efficient CI/CD Pipeline Management',
    description: 'Achieved 40% cost reduction and 50% faster setup with Jenkins and Terraform. Automated resource management with AWS Lambda.',
    tags: ['Jenkins', 'Terraform', 'AWS Lambda', 'CloudWatch', 'Cost Explorer'],
    icon: DollarSign,
    color: 'secondary',
    highlights: ['40% Cost Reduction', '90% Automation', '30% More Reliable'],
    github: '#',
    readme: {
      overview: 'Achieved a 40% reduction in infrastructure costs and a 50% faster setup time by refining the CI/CD pipeline with Jenkins and Terraform.',
      features: [
        'Cost Optimization: 40% infrastructure cost reduction',
        'Automation: 90% reduction in manual intervention',
        'Automated Reporting: 20% improved budget adherence',
        'Reliability Enhancement: 30% boost in pipeline reliability'
      ],
      architecture: [
        'CI/CD: Jenkins with optimized pipelines',
        'IaC: Terraform for resource management',
        'Serverless: AWS Lambda for automation',
        'Monitoring: AWS CloudWatch real-time alerts',
        'Cost Management: AWS Cost Explorer API integration'
      ],
      techStack: ['Jenkins', 'Terraform', 'AWS Lambda', 'CloudWatch', 'Cost Explorer', 'Python']
    }
  },
];

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-sm p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              project.color === 'primary' ? 'bg-primary/10' :
              project.color === 'secondary' ? 'bg-secondary/10' : 'bg-accent/10'
            }`}>
              <project.icon className={`h-5 w-5 ${
                project.color === 'primary' ? 'text-primary' :
                project.color === 'secondary' ? 'text-secondary' : 'text-accent'
              }`} />
            </div>
            <h2 className="text-lg font-bold text-foreground sm:text-xl">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Overview */}
          <div className="mb-6">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <Server className="h-4 w-4" /> Overview
            </h3>
            <p className="text-foreground">{project.readme.overview}</p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <Zap className="h-4 w-4" /> Key Features
            </h3>
            <ul className="space-y-2">
              {project.readme.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground sm:text-base">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture */}
          <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <GitBranch className="h-4 w-4" /> Architecture
            </h3>
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <ul className="space-y-2">
                {project.readme.architecture.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-mono text-xs text-foreground sm:text-sm">
                    <span className="text-secondary">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <Shield className="h-4 w-4" /> Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.readme.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="rounded-lg border border-border bg-muted/50 px-3 py-1.5 font-mono text-xs text-foreground sm:text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Highlights
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.highlights.map((highlight, i) => (
                <span
                  key={i}
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    project.color === 'primary' ? 'bg-primary/10 text-primary' :
                    project.color === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                  }`}
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
            {project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </a>
            )}
            <button
              onClick={onClose}
              className="rounded-lg border border-border px-6 py-3 font-semibold text-foreground transition-all hover:bg-muted"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="relative py-16 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="section-heading">Portfolio</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Hands-on projects demonstrating practical DevOps skills and cloud infrastructure knowledge.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border-gradient group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="mb-3 flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    project.color === 'primary' ? 'bg-primary/10' :
                    project.color === 'secondary' ? 'bg-secondary/10' : 'bg-accent/10'
                  }`}>
                    <project.icon className={`h-5 w-5 ${
                      project.color === 'primary' ? 'text-primary' :
                      project.color === 'secondary' ? 'text-secondary' : 'text-accent'
                    }`} />
                  </div>
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 rounded-lg border border-primary/50 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-all hover:bg-primary/20"
                  >
                    <Github className="h-4 w-4" />
                    <span>Code</span>
                  </a>
                </div>

                {/* Title & Description */}
                <h3 className="mb-2 text-base font-bold text-foreground transition-colors group-hover:text-primary sm:text-lg">
                  {project.title}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{project.description}</p>

                {/* Highlights */}
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {project.highlights.map((highlight, j) => (
                    <span
                      key={j}
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        project.color === 'primary' ? 'bg-primary/10 text-primary' :
                        project.color === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                      }`}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag, j) => (
                    <span
                      key={j}
                      className="rounded-md border border-border bg-muted/30 px-1.5 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="rounded-md border border-border bg-muted/30 px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* View more link */}
                <div className="mt-4 flex items-center gap-2 font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="text-sm">View Details</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
