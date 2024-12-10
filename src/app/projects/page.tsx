import { ExternalLinkIcon, GithubIcon } from "lucide-react";
import Link from "next/link";

type Project = {
  name: string;
  description: string;
  hostedUrl?: string;
  githubUrl?: string;
  tags: string[];
};

const projects: Project[] = [
  {
    name: "LovePost App",
    description:
      "Send expressive love letter to your close ones. Customize letters and envelopes",
    hostedUrl: "https://kkshitiz.github.io/lovepost-landing-page",
    tags: ["Android"],
  },
  {
    name: "Portfolio V2",
    description:
      "V2 of my portfolio website built using Nextjs, Typescript and TailwindCSS",
    hostedUrl: "https://v2.kshitizkamal.in/",
    githubUrl: "https://github.com/KKshitiz/portfolio-v2",
    tags: ["Personal website", "NextJS", "TailwindCSS", "TypeScript"],
  },
  {
    name: "Life Visualizer",
    description:
      "Embrace mortality using this tool based on the Your Life in Weeks post by Tim Urban, from Wait But Why.",
    hostedUrl: "https://life.kshitizkamal.in",
    githubUrl: "https://github.com/KKshitiz/life-visualizer",
    tags: [],
  },
  {
    name: "Flutter Art",
    description:
      "Expressing my creative side by creating random art built entirely in Flutter, from scratch",
    hostedUrl: "https://art.kshitizkamal.in",
    githubUrl: "https://github.com/KKshitiz/flutter-art",
    tags: ["Art", "Flutter", "Dart"],
  },
  {
    name: "WhatsApp UI Clone",
    description:
      "WhatsApp clone created using html, css and javascript. All vanilla technologies.",
    hostedUrl: "https://whatsapp-ui-clone-nine.vercel.app",
    githubUrl: "https://github.com/KKshitiz/whatsapp-ui-clone",
    tags: ["WhatsApp Clone", "HTML", "CSS", "Javascript"],
  },
];

export default function Projects() {
  return (
    <section className="flex flex-col">
      <h1 className="text-7xl font-extrabold text-center m-10">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectTile
            key={project.name}
            name={project.name}
            description={project.description}
            hostedUrl={project.hostedUrl}
            githubUrl={project.githubUrl}
            tags={project.tags}
          />
        ))}
      </div>
    </section>
  );
}

const ProjectTile = (project: Project) => {
  return (
    <div className="border border-gray-600 p-3 rounded-md">
      <div className="flex justify-between content-center">
        <Link
          href={project.hostedUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-x-2 mb-2"
        >
          <h4 className="font-bold">{project.name}</h4>
          <ExternalLinkIcon size={15} />
        </Link>
        {project.githubUrl && (
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon size={20} />
          </Link>
        )}
      </div>
      <p className="mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-y-2">
        {project.tags.map((tag) => (
          <ProjectTag key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
};

const ProjectTag = ({ tag }: { tag: string }) => {
  return (
    <span className="bg-cyan-200 text-black text-xs font-medium px-3 py-0.5 rounded-sm mr-2">
      {tag}
    </span>
  );
};
