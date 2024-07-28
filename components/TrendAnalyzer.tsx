'use client'
import React, { useState } from 'react';
import axios from 'axios';

interface Trend {
    id: number;
    trend: string;
    period: string;
    description: string;
    type: string;
    impact: string;
    industry: string;
    source: string;
    relevance: string;
    actionable_advice: string;
}

const TrendAnalyzer: React.FC = () => {
    const [field, setField] = useState<string>('');
    const [trends, setTrends] = useState<Trend[]>([]);
    const [activeTab, setActiveTab] = useState<'current' | 'future'>('current');

    const handleAnalyze = async () => {
        try {
            const response = await axios.post('/api/analyze-trend', { field });
            console.log('response:', response.data);
            setTrends(response.data);
        } catch (error) {
            console.error('Error analyzing trend:', error);
        }
    };

    const currentTrends = trends.filter(trend => trend.type === 'current');
    const futureTrends = trends.filter(trend => trend.type === 'future');

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
            {trends.length > 0 && (
                <div className="analysis-result mt-4">
                    <div className="tabs mb-4">
                        <button
                            className={`tab ${activeTab === 'current' ? 'border-b-2 border-blue-500' : ''}`}
                            onClick={() => setActiveTab('current')}
                        >
                            Current Trends
                        </button>
                        <button
                            className={`tab ${activeTab === 'future' ? 'border-b-2 border-blue-500' : ''}`}
                            onClick={() => setActiveTab('future')}
                        >
                            Future Trends
                        </button>
                    </div>
                    <div className="trend-content">
                        {activeTab === 'current' ? (
                            currentTrends.map(trend => (
                                <div key={trend.id} className="trend-card p-4 mb-4 border rounded-md">
                                    <h2 className="text-xl font-semibold">{trend.trend}</h2>
                                    <p><strong>Period:</strong> {trend.period}</p>
                                    <p><strong>Description:</strong> {trend.description}</p>
                                    <p><strong>Type:</strong> {trend.type}</p>
                                    <p><strong>Impact:</strong> {trend.impact}</p>
                                    <p><strong>Industry:</strong> {trend.industry}</p>
                                    <p><strong>Source:</strong> {trend.source}</p>
                                    <p><strong>Relevance:</strong> {trend.relevance}</p>
                                    <p><strong>Actionable Advice:</strong> {trend.actionable_advice}</p>
                                </div>
                            ))
                        ) : (
                            futureTrends.map(trend => (
                                <div key={trend.id} className="trend-card p-4 mb-4 border rounded-md">
                                    <h2 className="text-xl font-semibold">{trend.trend}</h2>
                                    <p><strong>Period:</strong> {trend.period}</p>
                                    <p><strong>Description:</strong> {trend.description}</p>
                                    <p><strong>Type:</strong> {trend.type}</p>
                                    <p><strong>Impact:</strong> {trend.impact}</p>
                                    <p><strong>Industry:</strong> {trend.industry}</p>
                                    <p><strong>Source:</strong> {trend.source}</p>
                                    <p><strong>Relevance:</strong> {trend.relevance}</p>
                                    <p><strong>Actionable Advice:</strong> {trend.actionable_advice}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrendAnalyzer;