import { useEffect, useState } from 'react';

export const useCareer = () => {
    const [career, setCareer] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCareer = async () => {
            try {
                const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
                const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
                console.log('SPREADSHEET_ID:', SPREADSHEET_ID);
                console.log('API_KEY:', API_KEY);

                if (!SPREADSHEET_ID || !API_KEY) {
                    throw new Error('環境変数が設定されていません');
                }

                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Career!A2:I?key=${API_KEY}`
                );

                if (!response.ok) {
                    throw new Error('データの取得に失敗しました: ' + response.status);
                }

                const data = await response.json();

                if (!data.values || !data.values.length) {
                    console.log('データが空です');
                    setCareer([]);
                    setIsLoading(false);
                    return;
                }

                const fetchedCareer = data.values.map(([
                    date,
                    title,
                    description,
                    type,
                ]) => ({
                    date: date || '',
                    title: title || '',
                    description: description || '',
                    type: type || '',
                })).filter(career => career.title && career.description.length > 0);

                const sortedCareer = fetchedCareer.sort((a, b) => {
                    if (!a.date) return 1;
                    if (!b.date) return -1;

                    const dateA = new Date(a.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3'));
                    const dateB = new Date(b.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3'));

                    return dateB - dateA;
                });

                console.log('取得したキャリアデータ:', sortedCareer);
                setCareer(sortedCareer);
                setIsLoading(false);
            } catch (err) {
                console.error('エラーが発生しました:', err);
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchCareer();
    }, []);

    return { career, isLoading, error };
};
