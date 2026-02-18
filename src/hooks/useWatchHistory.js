import { useState, useEffect } from 'react';

const HISTORY_KEY = 'watch_history';
const MAX_HISTORY = 50;

export const useWatchHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem(HISTORY_KEY);
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse watch history', e);
            }
        }
    }, []);

    const addToHistory = (video) => {
        if (!video || !video.id) return;

        setHistory(prev => {
            // Remove if exists (to move to top)
            const filtered = prev.filter(item => item.id !== video.id);
            // Add to front
            const newHistory = [video, ...filtered].slice(0, MAX_HISTORY);
            localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
            return newHistory;
        });
    };

    const removeFromHistory = (videoId) => {
        setHistory(prev => {
            const newHistory = prev.filter(item => item.id !== videoId);
            localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
            return newHistory;
        });
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(HISTORY_KEY);
    };

    return { history, addToHistory, removeFromHistory, clearHistory };
};
