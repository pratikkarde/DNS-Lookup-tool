import React from 'react';
import { Search, Shield, Zap, Server } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 mb-8">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-teal-100 opacity-50 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Comprehensive 
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"> DNS Lookup</span> Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Verify DNS records and email authentication rules (SPF, DKIM, DMARC) with our professional, easy-to-use tool.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <FeatureCard 
            icon={<Search className="h-8 w-8 text-blue-500" />}
            title="Complete Record Lookup"
            description="Check A, AAAA, MX, TXT, CNAME, NS and other DNS records from a single interface."
          />
          <FeatureCard 
            icon={<Shield className="h-8 w-8 text-blue-500" />}
            title="Authentication Rules"
            description="Verify SPF, DKIM, and DMARC configuration for better email deliverability and security."
          />
          <FeatureCard 
            icon={<Zap className="h-8 w-8 text-blue-500" />}
            title="Fast & Reliable"
            description="Get accurate results quickly with our optimized lookup algorithms and clean interface."
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-blue-50 rounded-lg mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Hero;