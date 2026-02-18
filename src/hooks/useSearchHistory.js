import { useState, useEffect } from 'react';

const HISTORY_KEY = 'search_history';
const MAX_HISTORY = 10;

export const useSearchHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem(HISTORY_KEY);
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse search history', e);
            }
        }
    }, []);

    const addToHistory = (query) => {
        if (!query.trim()) return;

        setHistory(prev => {
            const newHistory = [query, ...prev.filter(item => item !== query)].slice(0, MAX_HISTORY);
            localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
            return newHistory;
        });
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(HISTORY_KEY);
    };

    return { history, addToHistory, clearHistory };
};
