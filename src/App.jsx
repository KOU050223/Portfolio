import './App.css';
import Card from './Card.jsx';
import { useEffect, useState } from 'react';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/src/projects.json')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error loading projects:', error));
  }, []);

  return (
    <>
      <div>
        <h1>KOUのこれまでの作品一覧</h1>
        <table>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <div className="l-wrapper card">
                  <Card
                    img={project.img}
                    title={project.title}
                    text={project.description.replace(/\n/g, '<br />')}
                  />
                  <div className="card-link">
                    {Object.entries(project.links).map(([linkText, linkUrl], linkIndex) => (
                      <a key={linkIndex} href={linkUrl}>{linkText}</a>
                    ))}
                  </div>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;