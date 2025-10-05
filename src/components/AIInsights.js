import React, { useState } from 'react';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Activity,
  Heart,
  Eye,
  ChevronDown,
  ChevronUp,
  Zap
} from 'lucide-react';
import './AIInsights.css';

const AIInsights = ({ insights }) => {
  const [expandedInsight, setExpandedInsight] = useState(null);

  const getInsightIcon = (type) => {
    switch (type) {
      case 'risk': return AlertTriangle;
      case 'improvement': return TrendingUp;
      case 'recommendation': return CheckCircle;
      case 'monitoring': return Clock;
      case 'alert': return Zap;
      default: return Brain;
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'risk': return '#ef4444';
      case 'improvement': return '#10b981';
      case 'recommendation': return '#3b82f6';
      case 'monitoring': return '#f59e0b';
      case 'alert': return '#8b5cf6';
      default: return '#64748b';
    }
  };

  const getInsightBgColor = (type) => {
    switch (type) {
      case 'risk': return '#fef2f2';
      case 'improvement': return '#f0fdf4';
      case 'recommendation': return '#eff6ff';
      case 'monitoring': return '#fffbeb';
      case 'alert': return '#f3e8ff';
      default: return '#f8fafc';
    }
  };

  const InsightCard = ({ insight }) => {
    const Icon = getInsightIcon(insight.type);
    const color = getInsightColor(insight.type);
    const bgColor = getInsightBgColor(insight.type);
    const isExpanded = expandedInsight === insight.id;

    return (
      <div className={`insight-card ${insight.type}`}>
        <div 
          className="insight-header"
          onClick={() => setExpandedInsight(isExpanded ? null : insight.id)}
        >
          <div className="insight-icon" style={{ backgroundColor: bgColor, color }}>
            <Icon size={20} />
          </div>
          <div className="insight-content">
            <h3 className="insight-title">{insight.title}</h3>
            <p className="insight-summary">{insight.summary}</p>
          </div>
          <div className="insight-actions">
            <span className="insight-priority">{insight.priority}</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
        
        {isExpanded && (
          <div className="insight-details">
            <div className="insight-metrics">
              <h4>Key Metrics</h4>
              <div className="metrics-grid">
                {insight.metrics.map((metric, index) => (
                  <div key={index} className="metric-item">
                    <span className="metric-label">{metric.label}</span>
                    <span className="metric-value">{metric.value}</span>
                    <span className={`metric-change ${metric.change > 0 ? 'positive' : 'negative'}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="insight-recommendations">
              <h4>AI Recommendations</h4>
              <ul className="recommendations-list">
                {insight.recommendations.map((rec, index) => (
                  <li key={index} className="recommendation-item">
                    <CheckCircle size={16} className="rec-icon" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="insight-timeline">
              <h4>Patient Timeline</h4>
              <div className="timeline">
                {insight.timeline.map((event, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <span className="timeline-date">{event.date}</span>
                      <span className="timeline-event">{event.event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const RiskAnalysis = () => {
    const highRiskPatients = insights.filter(insight => 
      insight.type === 'risk' && insight.priority === 'High'
    ).length;
    
    const totalPatients = insights.length;
    const riskPercentage = Math.round((highRiskPatients / totalPatients) * 100);

    return (
      <div className="risk-analysis">
        <h3>Risk Analysis Overview</h3>
        <div className="risk-stats">
          <div className="risk-stat">
            <div className="risk-number">{highRiskPatients}</div>
            <div className="risk-label">High Risk Patients</div>
          </div>
          <div className="risk-stat">
            <div className="risk-number">{riskPercentage}%</div>
            <div className="risk-label">Risk Rate</div>
          </div>
        </div>
      </div>
    );
  };

  const TrendAnalysis = () => {
    const improvementInsights = insights.filter(insight => insight.type === 'improvement');
    const avgImprovement = improvementInsights.length > 0 
      ? Math.round(improvementInsights.reduce((sum, insight) => 
          sum + insight.metrics.reduce((mSum, metric) => mSum + metric.change, 0) / insight.metrics.length, 0
        ) / improvementInsights.length)
      : 0;

    return (
      <div className="trend-analysis">
        <h3>Trend Analysis</h3>
        <div className="trend-stats">
          <div className="trend-stat">
            <TrendingUp className="trend-icon" size={24} />
            <div className="trend-content">
              <div className="trend-value">+{avgImprovement}%</div>
              <div className="trend-label">Average Improvement</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="ai-insights">
      <div className="insights-header">
        <h2 className="insights-title">
          <Brain size={24} />
          AI Insights & Analytics
        </h2>
        <div className="insights-summary">
          <RiskAnalysis />
          <TrendAnalysis />
        </div>
      </div>
      
      <div className="insights-list">
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
};

export default AIInsights;
