import React, { useEffect, useState } from "react";
import "../App.css";
import Card from "../components/Card";

const Production = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://fetch-projects-data.uozumi05.workers.dev/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error loading projects:", error));
  }, []);
  console.log(JSON.stringify(projects));

  return (
    <div>
      <h1>KOUのこれまでの作品一覧</h1>
      <table>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>
                <div className="l-wrapper card">
                  <Card
                    img={project.img}
                    title={project.title}
                    text={project.description}
                  />
                  <div className="card-link">
                    {Object.entries(project.links).map(
                      ([linkText, linkUrl], linkIndex) => (
                        <a
                          key={linkIndex}
                          href={linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {linkText}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Production;
