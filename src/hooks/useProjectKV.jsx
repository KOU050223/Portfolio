import { useEffect, useState } from 'react';

export const useProjectKV = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

   useEffect(() => {
     fetch("https://fetch-projects-data.uozumi05.workers.dev/projects")
       .then((response) => response.json())
       .then((data) => setProjects(data))
       .catch((error) => setError("Error loading projects:", error));
    setIsLoading(false);
   }, []);

    return { projects, isLoading, error };
};
