import { useState } from "react";
import { ArrowUpRight, Globe, LockKeyhole } from "lucide-react";
import "./ProjectsSection.css";

const categories = ["All", "Platforms", "Commerce", "Hospitality", "Business"];

function ProjectPreview({ project }) {
  const [failed, setFailed] = useState(false);
  const domain = new URL(project.live).hostname.replace(/^www\./, "");

  return (
    <a
      className="project-preview"
      href={project.live}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${project.title}`}
    >
      <div className="project-browser" aria-hidden="true">
        <span className="browser-lights"><i /><i /><i /></span>
        <span className="browser-address"><LockKeyhole size={10} />{domain}</span>
        <ArrowUpRight size={14} />
      </div>
      <div className="project-screen">
        {project.preview && !failed ? (
          <img
            src={project.preview}
            alt={`Homepage of ${project.title}`}
            width="1440"
            height="900"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="project-unavailable">
            <Globe size={32} strokeWidth={1} aria-hidden="true" />
            <span>{domain}</span>
            <small>{project.previewStatus || "Preview unavailable"}</small>
          </div>
        )}
        <span className="project-preview-action" aria-hidden="true">
          Open website <ArrowUpRight size={16} />
        </span>
      </div>
    </a>
  );
}

export default function ProjectsSection({ projects }) {
  const [category, setCategory] = useState("All");
  const visibleProjects = projects.filter(project => category === "All" || project.category === category);

  return (
    <section id="projects" className="work-section">
      <div className="work-heading">
        <div>
          <p className="work-eyebrow"><span /> SELECTED WORK / {String(projects.length).padStart(2, "0")}</p>
          <h2>Projects that live<br /><span>beyond the code.</span></h2>
        </div>
        <p className="work-intro">From investment platforms to neighborhood restaurants. A selection of products I have brought to the web.</p>
      </div>

      <div className="work-toolbar">
        <div className="work-filters" role="group" aria-label="Filter projects by category">
          {categories.map(item => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}<span>{item === "All" ? projects.length : projects.filter(project => project.category === item).length}</span>
            </button>
          ))}
        </div>
        <span className="work-count" aria-live="polite">{visibleProjects.length} projects</span>
      </div>

      <div className="work-grid">
        {visibleProjects.map((project, index) => {
          const [name, type] = project.title.split(" - ");
          return (
            <article key={project.live} className={index === 0 ? "work-project work-featured" : "work-project"}>
              <ProjectPreview project={project} />
              <div className="project-details">
                <div className="project-meta">
                  <span>{project.category}</span>
                  <span>{index === 0 ? "FEATURED" : String(projects.indexOf(project) + 1).padStart(2, "0")}</span>
                </div>
                <h3>{name}</h3>
                {type && <p className="project-type">{type}</p>}
                <p className="project-description">{project.desc}</p>
                <ul className="project-tags" aria-label="Project tags">
                  {project.tags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>
                <a className="project-live" href={project.live} target="_blank" rel="noopener noreferrer">
                  <span>Visit live site</span><ArrowUpRight size={18} aria-hidden="true" />
                  <span className="sr-only">: {project.title}</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
