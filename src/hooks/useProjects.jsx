import { useEffect, useState } from 'react';

export const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
                const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

                if (!SPREADSHEET_ID || !API_KEY) {
                    throw new Error('環境変数が設定されていません');
                }

                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Projects!A2:I?key=${API_KEY}`
                );

                if (!response.ok) {
                    throw new Error('データの取得に失敗しました: ' + response.status);
                }

                const data = await response.json();

                if (!data.values || !data.values.length) {
                    console.log('データが空です');
                    setProjects([]);
                    setIsLoading(false);
                    return;
                }

                const fetchedProjects = data.values.map(([
                    title,
                    author,
                    date,
                    technologiesStr,
                    youtubeUrl,
                    description,
                    deployLink,
                    githubLink,
                    articleLink
                ]) => ({
                    title: title || '',
                    authors: author ? author.split(',').map(name => name.trim()) : [],
                    date: date || '',
                    technologies: technologiesStr ? technologiesStr.split(',').map(tech => tech.trim()) : [],
                    youtubeUrl: youtubeUrl || null,
                    description: description || '',
                    deployLink: deployLink || null,
                    githubLink: githubLink || null,
                    articleLink: articleLink || null
                })).filter(project => project.title && project.authors.length > 0);

                const sortedProjects = fetchedProjects.sort((a, b) => {
                    if (!a.date) return 1;
                    if (!b.date) return -1;

                    const dateA = new Date(a.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3'));
                    const dateB = new Date(b.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3'));

                    return dateB - dateA;
                });

                console.log('取得したプロジェクトデータ:', sortedProjects);
                setProjects(sortedProjects);
                setIsLoading(false);
            } catch (err) {
                console.error('エラーが発生しました:', err);
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return { projects, isLoading, error };
};
