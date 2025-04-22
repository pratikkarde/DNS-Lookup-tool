import React, { useState } from 'react';
import { Copy, CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { DnsResult } from '../types';

interface ResultsDisplayProps {
  results: DnsResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('records');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const getSecurityScore = () => {
    const { authRules } = results;
    let score = 0;
    let total = 0;
    
    if (authRules.spf) {
      total += 1;
      if (authRules.spf.exists && authRules.spf.valid) score += 1;
    }
    
    if (authRules.dkim) {
      total += 1;
      if (authRules.dkim.exists && authRules.dkim.valid) score += 1;
    }
    
    if (authRules.dmarc) {
      total += 1;
      if (authRules.dmarc.exists && authRules.dmarc.valid) score += 1;
    }
    
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    
    return {
      score,
      total,
      percentage,
      label: percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : percentage >= 40 ? 'Fair' : 'Poor'
    };
  };

  const securityScore = getSecurityScore();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 bg-slate-50 p-4 rounded-lg">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Results for {results.domain}</h3>
          <p className="text-sm text-gray-500">Record type: {results.recordType}</p>
        </div>
        <div className="mt-2 sm:mt-0">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-700">Email Security:</div>
            <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              securityScore.percentage >= 80 ? 'bg-green-100 text-green-800' :
              securityScore.percentage >= 60 ? 'bg-blue-100 text-blue-800' :
              securityScore.percentage >= 40 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {securityScore.label} ({securityScore.percentage}%)
            </div>
          </div>
        </div>
      </div>

      {/* DNS Records Section */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <button
          className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
          onClick={() => toggleSection('records')}
        >
          <span className="font-medium text-gray-900">DNS Records</span>
          {expandedSection === 'records' ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        
        {expandedSection === 'records' && (
          <div className="p-4">
            {results.records && results.records.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      {results.recordType === 'MX' && (
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Priority
                        </th>
                      )}
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TTL
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Copy
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.records.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                          {record.value}
                        </td>
                        {results.recordType === 'MX' && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {record.priority}
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.ttl}s
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleCopy(record.value, `record-${index}`)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {copied === `record-${index}` ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              <Copy className="h-5 w-5" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No records found for this query.</p>
            )}
          </div>
        )}
      </div>

      {/* Authentication Rules Section */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <button
          className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
          onClick={() => toggleSection('auth')}
        >
          <span className="font-medium text-gray-900">Email Authentication</span>
          {expandedSection === 'auth' ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        
        {expandedSection === 'auth' && (
          <div className="p-4 space-y-4">
            {/* SPF Record */}
            <div className="border border-gray-200 rounded-md">
              <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-900">SPF Record</h4>
                  {results.authRules.spf && results.authRules.spf.exists ? (
                    results.authRules.spf.valid ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    )
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                {results.authRules.spf && results.authRules.spf.value && (
                  <button
                    onClick={() => handleCopy(results.authRules.spf.value!, 'spf-record')}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {copied === 'spf-record' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                )}
              </div>
              <div className="p-4">
                {results.authRules.spf && results.authRules.spf.exists ? (
                  <div>
                    <p className="font-mono text-sm bg-gray-50 p-3 rounded">{results.authRules.spf.value}</p>
                    <div className="mt-2 text-sm text-gray-600">
                      {results.authRules.spf.valid ? (
                        <span className="text-green-600">✓ Valid SPF record found</span>
                      ) : (
                        <span className="text-yellow-600">⚠️ SPF record found but may have issues</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">
                    <span className="text-red-600">✗ No SPF record found</span>
                    <p className="mt-1">
                      SPF records help prevent email spoofing. We recommend adding an SPF record.
                    </p>
                  </div>
                )}
                <div className="mt-2 text-xs text-right">
                  <a 
                    href="https://en.wikipedia.org/wiki/Sender_Policy_Framework" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center justify-end gap-1"
                  >
                    Learn more <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* DKIM Record */}
            <div className="border border-gray-200 rounded-md">
              <div className="px-4 py-3 bg-gray-50 flex items-center">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-900">DKIM Record</h4>
                  {results.authRules.dkim && results.authRules.dkim.exists ? (
                    results.authRules.dkim.valid ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    )
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
              <div className="p-4">
                {results.authRules.dkim && results.authRules.dkim.exists ? (
                  <div>
                    {results.authRules.dkim.selector && (
                      <p className="text-sm text-gray-600 mb-2">
                        Selector: <span className="font-mono">{results.authRules.dkim.selector}</span>
                      </p>
                    )}
                    <div className="mt-2 text-sm text-gray-600">
                      {results.authRules.dkim.valid ? (
                        <span className="text-green-600">✓ Valid DKIM record found</span>
                      ) : (
                        <span className="text-yellow-600">⚠️ DKIM record found but may have issues</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">
                    <span className="text-red-600">✗ No DKIM record found</span>
                    <p className="mt-1">
                      DKIM adds a digital signature to your emails. We recommend setting up DKIM.
                    </p>
                  </div>
                )}
                <div className="mt-2 text-xs text-right">
                  <a 
                    href="https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center justify-end gap-1"
                  >
                    Learn more <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* DMARC Record */}
            <div className="border border-gray-200 rounded-md">
              <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-900">DMARC Record</h4>
                  {results.authRules.dmarc && results.authRules.dmarc.exists ? (
                    results.authRules.dmarc.valid ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    )
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                {results.authRules.dmarc && results.authRules.dmarc.value && (
                  <button
                    onClick={() => handleCopy(results.authRules.dmarc.value!, 'dmarc-record')}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {copied === 'dmarc-record' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                )}
              </div>
              <div className="p-4">
                {results.authRules.dmarc && results.authRules.dmarc.exists ? (
                  <div>
                    <p className="font-mono text-sm bg-gray-50 p-3 rounded">{results.authRules.dmarc.value}</p>
                    <div className="mt-2 text-sm text-gray-600">
                      {results.authRules.dmarc.valid ? (
                        <span className="text-green-600">✓ Valid DMARC record found</span>
                      ) : (
                        <span className="text-yellow-600">⚠️ DMARC record found but may have issues</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">
                    <span className="text-red-600">✗ No DMARC record found</span>
                    <p className="mt-1">
                      DMARC tells receiving mail servers what to do with emails that fail SPF or DKIM checks.
                    </p>
                  </div>
                )}
                <div className="mt-2 text-xs text-right">
                  <a 
                    href="https://en.wikipedia.org/wiki/DMARC" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center justify-end gap-1"
                  >
                    Learn more <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;