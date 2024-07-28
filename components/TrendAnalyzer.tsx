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
    actions: string[];
}

const TrendAnalyzer: React.FC = () => {
    const [field, setField] = useState<string>('');
    const [trends, setTrends] = useState<Trend[]>([]);
    const [activeTab, setActiveTab] = useState<'current' | 'future'>('current');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

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
                    typeof item.actionable_advice === 'string' &&
                    Array.isArray(item.actions)
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
        } finally {
            setLoading(false);
        }
    };

    const getBorderClass = (impact: string) => {
        switch (impact.toLowerCase()) {
            case 'high':
                return 'border-red-600';
            case 'medium':
                return 'border-yellow-400';
            case 'low':
                return 'border-green-500';
            default:
                return '';
        }
    };

    const getTextColorClass = (impact: string) => {
        switch (impact) {
            case 'high':
                return 'text-red-500';
            case 'medium':
                return 'text-yellow-500';
            case 'low':
                return 'text-green-500';
            default:
                return '';
        }
    };

    const sortTrends = (trends: Trend[]): Trend[] => {
        return trends.sort((a, b) => {
            const priority: any = { 'high': 1, 'medium': 2, 'low': 3 };
            return priority[a.impact] - priority[b.impact];
        });
    };

    const currentTrends = sortTrends(trends.filter(trend => trend.type === 'current'));
    const futureTrends = sortTrends(trends.filter(trend => trend.type === 'future'));

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Go trending with Trendalyzer!</h1>
            <form onSubmit={handleAnalyze} className="flex flex-col md:flex-row items-center justify-center mb-4 gap-x-4 gap-y-4 md:gap-y-0">
                <label htmlFor="field" className="sr-only">Field</label>
                <input
                    type="text"
                    id="field"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    placeholder="Topic to analyze trends on (e.g., 'SaaS in Bay Area', 'Clothing Industry')"
                    className="border p-2 w-full max-w-xl rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400"
                    autoComplete='off'
                />
                <button
                    type="submit"
                    className={`py-2 px-4 rounded-md text-white ${loading ? 'bg-zinc-500 cursor-not-allowed' : 'bg-black hover:bg-zinc-800'}`}
                    disabled={loading}
                >
                    Analyze
                </button>
            </form>

            {loading && (
                <>
                    <p className="text-center text-gray-500">
                        Analyzing the best trends for you
                    </p>
                    <div className="mt-8 flex items-center justify-center">
                        <svg className="trend-icon" viewBox="0 0 24 24">
                            <path d="M3 17l6-6 4 4 8-8" />
                        </svg>
                    </div>
                </>
            )}

            {error && <p className="text-red-500 text-center">{error}</p>}

            {!loading && trends.length > 0 && (
                <div>
                    <div className="mb-4 text-center flex items-center justify-center gap-x-2">
                        <button
                            className={`inline-block px-4 py-2 cursor-pointer transition-colors hover:border-b-2 hover:border-zinc-500 ${activeTab === 'current' ? 'border-b-2 border-zinc-300' : ''}`}
                            onClick={() => setActiveTab('current')}
                        >
                            Current Trends
                        </button>
                        <button
                            className={`inline-block px-4 py-2 cursor-pointer transition-colors hover:border-b-2 hover:border-zinc-500 ${activeTab === 'future' ? 'border-b-2 border-zinc-300' : ''}`}
                            onClick={() => setActiveTab('future')}
                        >
                            Future Trends
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activeTab === 'current' ? (
                            currentTrends.map(trend => (
                                <div key={trend.id} className={`p-4 border rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl ${getBorderClass(trend.impact)}`}>
                                    <h2 className="text-xl font-semibold mb-2">
                                        {trend.trend}
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-2">
                                        {trend.description}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2"><strong>Impact:</strong> {''}
                                        <span className={`${getTextColorClass(trend.impact)} capitalize font-semibold`}>{trend.impact}</span>
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2"><strong>Advice:</strong> {trend.actionable_advice}</p>
                                    <p className="text-sm text-gray-500"><strong>Actions:</strong></p>
                                    <ul className='list-disc ml-4'>
                                        {trend.actions.map(action => (
                                            <li key={action} className="text-sm text-gray-500">{action}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            futureTrends.map(trend => (
                                <div key={trend.id} className={`p-4 border rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl ${getBorderClass(trend.impact)}`}>
                                    <h2 className="text-xl font-semibold mb-2">
                                        {trend.trend}
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-2">
                                        {trend.description}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2"><strong>Impact:</strong> {''}
                                        <span className={`${getTextColorClass(trend.impact)} capitalize font-semibold`}>{trend.impact}</span>
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2"><strong>Advice:</strong> {trend.actionable_advice}</p>
                                    <p className="text-sm text-gray-500"><strong>Actions:</strong></p>
                                    <ul className='list-disc ml-4'>
                                        {trend.actions.map(action => (
                                            <li key={action} className="text-sm text-gray-500">{action}</li>
                                        ))}
                                    </ul>
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
