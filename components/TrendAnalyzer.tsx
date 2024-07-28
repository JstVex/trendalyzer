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
    actionable_advice: string;
}

const TrendAnalyzer: React.FC = () => {
    const [field, setField] = useState<string>('');
    const [trends, setTrends] = useState<Trend[]>([]);
    const [activeTab, setActiveTab] = useState<'current' | 'future'>('current');
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        try {
            const response = await axios.post('/api/analyze-trend', { field });
            console.log('response:', response.data);

            if (Array.isArray(response.data)) {
                const validTrends = response.data.filter((item: any) => (
                    item &&
                    typeof item.id === 'number' &&
                    typeof item.trend === 'string' &&
                    typeof item.period === 'string' &&
                    typeof item.description === 'string' &&
                    typeof item.type === 'string' &&
                    typeof item.impact === 'string' &&
                    typeof item.actionable_advice === 'string'
                ));
                setTrends(validTrends);
                setError(null);
            } else {
                setTrends([]);
                setError('Invalid response format');
            }
        } catch (error) {
            console.error('Error analyzing trend:', error);
            setTrends([]);
            setError('Error fetching trends. Please try again.');
        }
    };

    const currentTrends = trends.filter(trend => trend.type === 'current');
    const futureTrends = trends.filter(trend => trend.type === 'future');

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Trendalyzer</h1>
            <div className="flex items-center justify-center gap-x-4 mb-4">
                <label htmlFor="field" className="sr-only">Field</label>
                <input
                    type="text"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    placeholder="Topic to analyze trends on (e.g., 'SaaS in Bay Area', 'Clothing Industry')"
                    className="border p-2 w-full max-w-xl rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
                <button
                    onClick={handleAnalyze}
                    className="bg-black text-white py-2 px-4 rounded-md"
                >
                    Analyze
                </button>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {trends.length > 0 && (
                <div>
                    <div className="mb-4 text-center">
                        <button
                            className={`inline-block px-5 py-3 cursor-pointer transition-colors hover:border-b-2 hover:border-blue-500 ${activeTab === 'current' ? 'border-b-2 border-blue-500' : ''}`}
                            onClick={() => setActiveTab('current')}
                        >
                            Current Trends
                        </button>
                        <button
                            className={`inline-block px-5 py-3 cursor-pointer transition-colors hover:border-b-2 hover:border-blue-500 ${activeTab === 'future' ? 'border-b-2 border-blue-500' : ''}`}
                            onClick={() => setActiveTab('future')}
                        >
                            Future Trends
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activeTab === 'current' ? (
                            currentTrends.map(trend => (
                                <div key={trend.id} className="p-4 border rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
                                    <h2 className="text-xl font-semibold mb-2">{trend.trend}</h2>
                                    <p className="text-sm text-gray-500 mb-2"><strong>Period:</strong> {trend.period}</p>
                                    <p className="text-sm text-gray-500 mb-2"><strong>Description:</strong> {trend.description}</p>
                                    <p className="text-sm text-gray-500 mb-2"><strong>Impact:</strong> {trend.impact}</p>
                                    <p className="text-sm text-gray-500 mb-2"><strong>Actionable Advice:</strong> {trend.actionable_advice}</p>
                                </div>
                            ))
                        ) : (
                            futureTrends.map(trend => (
                                <div key={trend.id} className="p-4 border rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
                                    <h2 className="text-xl font-semibold mb-2">{trend.trend}</h2>
                                    <p className="text-sm text-gray-500 mb-2"><strong>Period:</strong> {trend.period}</p>
                                    <p className="text-sm text-gray-500 mb-2"><strong>Description:</strong> {trend.description}</p>
                                    <p className="text-sm text-gray-500 mb-2"><strong>Impact:</strong> {trend.impact}</p>
                                    <p className="text-sm text-gray-500 mb-2"><strong>Actionable Advice:</strong> {trend.actionable_advice}</p>
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
