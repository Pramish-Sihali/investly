import { Zap, Users, Shield, FileText, BarChart3, Lightbulb, TrendingUp } from 'lucide-react';

import HeadingSection from '../common/heading-section';

export default function OurServices() {
  const services = [
    {
      icon: Shield,
      title: 'Due Diligence Support',
      description:
        'Investing in early-stage startups comes with risks. Our expert team conducts thorough due diligence, analyzing business models, financials, market trends, and legal frameworks to ensure informed investment decisions.',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      icon: Zap,
      title: 'Deal Flow Access',
      description:
        'As a BAIN investor, you get exclusive access to high-quality, vetted startups. We source promising ventures through our expansive network, pitching events, and direct startup outreach, ensuring investors see only the best opportunities.',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500',
    },
    {
      icon: BarChart3,
      title: 'Portfolio Management',
      description:
        'Post-investment, we help investors track startup performance, provide strategic guidance, and optimize exit strategies—ensuring their capital is effectively utilized for maximum returns.',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
    },
    {
      icon: FileText,
      title: 'Investment Structuring & Legal Support',
      description:
        'We assist investors and startups in structuring deals, drafting investment agreements, and navigating compliance requirements, ensuring smooth transactions and risk mitigation.',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
    {
      icon: Users,
      title: 'Pitching & Networking Events',
      description:
        'BAIN organizes pitch events, investor roundtables, and mentorship sessions, providing startups with the platform to showcase their ideas while offering investors a structured and engaging investment experience.',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-500',
    },
    {
      icon: Lightbulb,
      title: 'Post-Investment Support & Mentorship',
      description:
        'Beyond funding, we ensure startups receive the right mentorship, business development support, and market linkages to scale successfully. Investors can also participate in mentoring and advisory roles.',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
    },
    {
      icon: TrendingUp,
      title: 'Exit Planning & Follow-up Funding',
      description:
        'We help investors and startups strategize profitable exits—whether through acquisitions, follow-on funding, or secondary sales. Our fundraising advisory services also assist startups in securing future rounds of investment.',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-500',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HeadingSection
            title="Our Services"
            subtitle="At Biratnagar Angel Investors Network (BAIN), we go beyond just connecting startups with
investors—we provide a structured, de-risked, and value-driven investment experience."
          />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* First row - 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {services.slice(0, 4).map((service, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-gray-200 rounded-lg transition-all hover:shadow-sm"
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full ${service.bgColor}`}
                  >
                    <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                  </div>
                </div>
                <h3 className="mb-2 text-base font-semibold text-center text-gray-900">
                  {service.title}
                </h3>
                <p className="text-xs text-center text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Second row - 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {services.slice(4, 7).map((service, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-gray-200 rounded-lg transition-all hover:shadow-sm"
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full ${service.bgColor}`}
                  >
                    <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                  </div>
                </div>
                <h3 className="mb-2 text-base font-semibold text-center text-gray-900">
                  {service.title}
                </h3>
                <p className="text-xs text-center text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
