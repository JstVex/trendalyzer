'use client'

import React, { useState } from 'react';
import axios from 'axios';

const TrendAnalyzer: React.FC = () => {
    const [field, setField] = useState<string>('');
    const [currentTrends, setCurrentTrends] = useState<string>('');

    const handleAnalyze = async () => {
        try {
            const response = await axios.post('/api/analyze-trend', { field });
            console.log('response:', response.data);
            setCurrentTrends(response.data.text);
        } catch (error) {
            console.error('Error analyzing trend:', error);
        }
    };

    return (
        <div className="trend-analyzer p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Trend Analyzer</h1>
            <input
                type="text"
                value={field}
                onChange={(e) => setField(e.target.value)}
                placeholder="Enter field (e.g., travel)"
                className="border p-2 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleAnalyze}
                className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mb-4"
            >
                Analyze
            </button>
            {currentTrends && (
                <div>
                    <p>{currentTrends}</p>
                </div>
            )}
        </div>
    );
};

export default TrendAnalyzer;
