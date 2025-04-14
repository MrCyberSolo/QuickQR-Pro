import React from 'react';
import { FaCrown, FaCheck, FaRocket, FaChartBar, FaGlobe, FaMagic, FaLock, FaFileExport, FaUserFriends } from 'react-icons/fa';

const ProFeatures = () => {
  // Pricing plans
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Basic QR code generation for personal use',
      features: [
        'Create basic QR codes',
        'Standard customization options',
        'PNG & SVG downloads',
        'Up to 5 saved QR codes',
        'Basic templates'
      ],
      limitations: [
        'No dynamic QR codes',
        'No analytics',
        'No bulk generation',
        'No API access',
        'Limited customization'
      ],
      cta: 'Current Plan',
      ctaColor: 'gray',
      popular: false
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'Advanced features for businesses and professionals',
      features: [
        'Everything in Free',
        'Unlimited QR codes',
        'Dynamic QR codes',
        'Basic analytics',
        'Bulk generation (up to 100)',
        'All templates',
        'PDF export',
        'Custom logo upload',
        'API access (1,000 calls/day)'
      ],
      limitations: [],
      cta: 'Upgrade Now',
      ctaColor: 'indigo',
      popular: true
    },
    {
      name: 'Business',
      price: '$24.99',
      period: 'per month',
      description: 'Complete solution for teams and businesses',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Advanced analytics',
        'Unlimited bulk generation',
        'API access (10,000 calls/day)',
        'White-label QR codes',
        'Custom domain',
        'Priority support',
        'Dedicated account manager'
      ],
      limitations: [],
      cta: 'Contact Sales',
      ctaColor: 'purple',
      popular: false
    }
  ];

  // Pro features with detailed descriptions
  const proFeatures = [
    {
      id: 'dynamic',
      name: 'Dynamic QR Codes',
      icon: <FaMagic className="h-8 w-8 text-indigo-600" />,
      description: 'Create QR codes that can be updated anytime without reprinting. Change the destination URL, update content, or deactivate when needed.',
      benefits: [
        'Update content without reprinting',
        'Track performance with analytics',
        'Schedule activation periods',
        'Password protection options',
        'Geo-fencing capabilities'
      ]
    },
    {
      id: 'analytics',
      name: 'Advanced Analytics',
      icon: <FaChartBar className="h-8 w-8 text-indigo-600" />,
      description: 'Gain valuable insights with comprehensive scan analytics. Track scans, user behavior, and conversion rates to optimize your QR code campaigns.',
      benefits: [
        'Real-time scan tracking',
        'Geographic data visualization',
        'Device and browser analytics',
        'Time-based performance metrics',
        'Export reports in multiple formats'
      ]
    },
    {
      id: 'bulk',
      name: 'Bulk Generation',
      icon: <FaRocket className="h-8 w-8 text-indigo-600" />,
      description: 'Generate hundreds or thousands of QR codes at once. Perfect for large campaigns, product labeling, or event management.',
      benefits: [
        'CSV/Excel import support',
        'Batch customization options',
        'Sequential or variable data',
        'ZIP download of all QR codes',
        'Automatic naming conventions'
      ]
    },
    {
      id: 'api',
      name: 'API Access',
      icon: <FaGlobe className="h-8 w-8 text-indigo-600" />,
      description: 'Integrate QR code generation directly into your applications, websites, or workflows with our comprehensive API.',
      benefits: [
        'RESTful API with documentation',
        'Authentication and security',
        'All QR types supported',
        'Webhook integration',
        'Rate limits based on plan'
      ]
    },
    {
      id: 'security',
      name: 'Enhanced Security',
      icon: <FaLock className="h-8 w-8 text-indigo-600" />,
      description: 'Protect your QR codes and the content they link to with advanced security features.',
      benefits: [
        'Password-protected QR codes',
        'Expiration dates',
        'Access logging',
        'IP restrictions',
        'HTTPS enforcement'
      ]
    },
    {
      id: 'export',
      name: 'Advanced Export Options',
      icon: <FaFileExport className="h-8 w-8 text-indigo-600" />,
      description: 'Export your QR codes in various formats and resolutions for any use case.',
      benefits: [
        'High-resolution PNG export',
        'Vector SVG for scaling',
        'PDF with design templates',
        'EPS for professional printing',
        'Transparent background option'
      ]
    },
    {
      id: 'team',
      name: 'Team Collaboration',
      icon: <FaUserFriends className="h-8 w-8 text-indigo-600" />,
      description: 'Work together with your team on QR code projects with collaborative features.',
      benefits: [
        'User roles and permissions',
        'Shared QR code libraries',
        'Activity logging',
        'Comments and feedback',
        'Approval workflows'
      ]
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: 'What are dynamic QR codes?',
      answer: 'Dynamic QR codes allow you to change the destination or content after the QR code has been created and distributed. Unlike static QR codes, which permanently encode information, dynamic QR codes point to a URL that can be redirected, allowing you to update the destination without creating a new QR code.'
    },
    {
      question: 'How does QR code analytics work?',
      answer: 'Our analytics system tracks when and where your QR codes are scanned. We collect anonymous data such as scan time, location, device type, and operating system. This data is presented in an easy-to-understand dashboard with charts and metrics to help you understand how your QR codes are performing.'
    },
    {
      question: 'Can I try Pro features before subscribing?',
      answer: 'Yes! We offer a 14-day free trial of our Pro plan with full access to all features. No credit card is required to start your trial. You can downgrade to the Free plan at any time if you decide not to continue with a paid subscription.'
    },
    {
      question: 'Is there a limit to how many QR codes I can create?',
      answer: 'Free accounts can create up to 5 saved QR codes. Pro accounts have unlimited QR code creation. Business accounts also have unlimited creation plus team management features.'
    },
    {
      question: 'How secure are the QR codes?',
      answer: 'We take security seriously. All QR codes are generated using industry-standard algorithms. Dynamic QR codes can be protected with passwords, expiration dates, and access restrictions. All data is encrypted both in transit and at rest.'
    }
  ];

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            QuickQR <span className="text-indigo-600">Pro</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Unlock powerful features to take your QR codes to the next level
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col ${
                plan.popular ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                  <div className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-indigo-100 text-indigo-600">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="ml-1 text-xl font-semibold">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
              </div>

              <div className="flex-1">
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">What's included:</h4>
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className="flex-shrink-0">
                          <FaCheck className="h-5 w-5 text-green-500" />
                        </div>
                        <p className="ml-3 text-sm text-gray-700">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Limitations:</h4>
                    <ul className="space-y-4">
                      {plan.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="ml-3 text-sm text-gray-700">{limitation}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  className={`w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                    plan.ctaColor === 'indigo' 
                      ? 'bg-indigo-600 hover:bg-indigo-700' 
                      : plan.ctaColor === 'purple' 
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-gray-600 hover:bg-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {plan.name === 'Free' ? (
                    <span>Current Plan</span>
                  ) : (
                    <>
                      <FaCrown className="mr-2 -ml-1 h-5 w-5" />
                      <span>{plan.cta}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Pro Features in Detail
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Discover the powerful capabilities that come with QuickQR Pro
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
            {proFeatures.map((feature) => (
              <div key={feature.id} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900">{feature.name}</h3>
                </div>
                <p className="text-gray-500 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <FaCheck className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{benefit}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-32 bg-indigo-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Ready to get started?</span>
                <span className="block">Start your free trial today.</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-indigo-200">
                Try all Pro features free for 14 days. No credit card required. Cancel anytime.
              </p>
              <button
                type="button"
                className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Start Free Trial
              </button>
            </div>
          </div>
          <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <div className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20 bg-indigo-600 flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                <div className="p-8 bg-white rounded-lg shadow-lg transform -rotate-6 m-4">
                  <div className="w-48 h-48 mx-auto">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <rect width="200" height="200" fill="#4F46E5" rx="10" ry="10" />
                      <rect x="40" y="40" width="120" height="120" fill="white" rx="5" ry="5" />
                      <rect x="60" y="60" width="80" height="80" fill="#4F46E5" rx="5" ry="5" />
                      <rect x="70" y="70" width="60" height="60" fill="white" rx="5" ry="5" />
                      <rect x="80" y="80" width="40" height="40" fill="#4F46E5" rx="5" ry="5" />
                      <rect x="90" y="90" width="20" height="20" fill="white" rx="5" ry="5" />
                    </svg>
                  </div>
                  <div className="text-center mt-4">
                    <div className="text-lg font-bold text-gray-900">Pro QR Code</div>
                    <div className="text-sm text-gray-500">Dynamic • Customized • Tracked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Find answers to common questions about our Pro features
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
            <dl className="space-y-6 divide-y divide-gray-200">
              {faqItems.map((faq, index) => (
                <div key={index} className="pt-6">
                  <dt className="text-lg">
                    <div className="text-left">
                      <span className="font-medium text-gray-900">{faq.question}</span>
                    </div>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProFeatures;
