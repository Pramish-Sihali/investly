'use client';

import React, { useState } from 'react';
import {
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from 'react-share';

interface ShareData {
  title: string;
  description: string;
  image: string;
  url: string;
}

interface SocialShareSidebarProps {
  shareData: ShareData;
}

const SocialShareSidebar: React.FC<SocialShareSidebarProps> = ({ shareData }) => {
  const [copied, setCopied] = useState(false);

  // Custom X (Twitter) Icon Component
  const XIcon = ({ size = 20 }: { size?: number }) => (
    <div
      className="flex items-center justify-center rounded-full bg-black"
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
    >
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </div>
  );

  // Get the full URL
  const fullUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Handle copy link functionality
  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = fullUrl;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Handle native share (for mobile devices)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareData.title,
          text: shareData.description,
          url: fullUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
        // Fallback to copy link
        handleCopyLink();
      }
    } else {
      // Fallback to copy link
      handleCopyLink();
    }
  };

  return (
    <div className="lg:sticky lg:top-20">
      {/* Card wrapper */}
      <div className="border border-gray-200 rounded-lg shadow-sm bg-white">
        <div className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Share this article</h3>

          {/* Compact Copy Link Button */}
          <div className="mb-4 sm:mb-6">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <svg
                className="w-4 h-4 mr-2 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                {copied ? 'Copied!' : 'Copy Link'}
              </span>
            </button>
          </div>

          {/* Native Share Button (mobile only) */}
          <div className="mb-4 sm:mb-6 sm:hidden">
            <button
              onClick={handleNativeShare}
              className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>

          {/* Social Media Icons - responsive grid */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4 justify-items-center">
            <FacebookShareButton
              url={fullUrl}
              title={shareData.title}
              className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-white bg-[#1877F2] hover:bg-[#166FE5] rounded-full transition-colors duration-200"
            >
              <FacebookIcon size={18} round className="sm:w-5 sm:h-5" />
            </FacebookShareButton>

            <TwitterShareButton
              url={fullUrl}
              title={shareData.title}
              className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-white bg-black hover:bg-gray-800 rounded-full transition-colors duration-200"
            >
              <XIcon size={18} />
            </TwitterShareButton>

            <LinkedinShareButton
              url={fullUrl}
              title={shareData.title}
              summary={shareData.description}
              className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-white bg-[#0A66C2] hover:bg-[#095BA8] rounded-full transition-colors duration-200"
            >
              <LinkedinIcon size={18} round className="sm:w-5 sm:h-5" />
            </LinkedinShareButton>

            <WhatsappShareButton
              url={fullUrl}
              title={shareData.title}
              className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-white bg-[#25D366] hover:bg-[#20BC5A] rounded-full transition-colors duration-200"
            >
              <WhatsappIcon size={18} round className="sm:w-5 sm:h-5" />
            </WhatsappShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShareSidebar;