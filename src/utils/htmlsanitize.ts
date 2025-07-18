interface SanitizerConfig {
  allowedTags?: string[];
  allowedAttributes?: string[];
  allowedCss?: Record<string, RegExp>;
  enableListStyling?: boolean;
}

const DEFAULT_CONFIG: SanitizerConfig = {
  allowedTags: [
    // Headings
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    // Text formatting
    'p',
    'br',
    'div',
    'span',
    'section',
    'article',
    'strong',
    'em',
    'b',
    'i',
    'u',
    's',
    'sub',
    'sup',
    'mark',
    'small',
    'del',
    'ins',
    // Lists - IMPORTANT: Keep these for numbering
    'ul',
    'ol',
    'li',
    'dl',
    'dt',
    'dd',
    // Links and media
    'a',
    'img',
    'figure',
    'figcaption',
    // Code and quotes
    'blockquote',
    'cite',
    'q',
    'pre',
    'code',
    'kbd',
    'samp',
    // Tables
    'table',
    'thead',
    'tbody',
    'tfoot',
    'tr',
    'th',
    'td',
    'caption',
    'colgroup',
    'col',
    // Other common elements
    'hr',
    'address',
    'time',
  ],
  allowedAttributes: [
    // Links
    'href',
    'target',
    'rel',
    'title',
    // Media
    'src',
    'alt',
    'width',
    'height',
    'loading',
    // General - IMPORTANT: These preserve Quill formatting
    'class',
    'id',
    'style',
    'data-*',
    // Tables
    'colspan',
    'rowspan',
    'scope',
    // Lists - IMPORTANT: These attributes preserve list numbering
    'start',
    'type',
    'reversed',
    // Time
    'datetime',
  ],
  allowedCss: {
    'text-align': /^(left|right|center|justify)$/,
    'font-weight': /^(bold|normal|\d+)$/,
    'font-style': /^(italic|normal)$/,
    'text-decoration': /^(underline|line-through|none)$/,
    color: /^#[0-9a-f]{3,6}$/i,
    'background-color': /^#[0-9a-f]{3,6}$/i,
    margin: /^[\d\s.%px-]+$/,
    padding: /^[\d\s.%px-]+$/,
    'list-style-type':
      /^(decimal|lower-alpha|upper-alpha|lower-roman|upper-roman|disc|circle|square|none)$/,
    'margin-left': /^[\d.%px-]+$/,
    'padding-left': /^[\d.%px-]+$/,
  },
  enableListStyling: true,
};

// Initialize DOMPurify for server-side usage
let DOMPurify: any = null;

const initializeDOMPurify = async () => {
  if (DOMPurify) return DOMPurify;

  if (typeof window !== 'undefined') {
    // Browser environment
    const { default: DOMPurifyBrowser } = await import('dompurify');
    DOMPurify = DOMPurifyBrowser;
  } else {
    // Server environment
    const { default: DOMPurifyServer } = await import('dompurify');
    const { JSDOM } = await import('jsdom');
    const window = new JSDOM('').window;
    DOMPurify = DOMPurifyServer(window as any);
  }

  return DOMPurify;
};

/**
 * Sanitizes HTML content using DOMPurify with a secure configuration
 * @param htmlContent - The HTML content to sanitize
 * @param customConfig - Optional custom configuration to override defaults
 * @returns Sanitized HTML string
 */
export async function sanitizeHtmlContent(
  htmlContent: string,
  customConfig: Partial<SanitizerConfig> = {}
): Promise<string> {
  if (!htmlContent || typeof htmlContent !== 'string') {
    return '';
  }

  // Merge custom config with defaults
  const config = { ...DEFAULT_CONFIG, ...customConfig };

  const dompurifyConfig = {
    ALLOWED_TAGS: config.allowedTags,
    ALLOWED_ATTR: config.allowedAttributes,
    ALLOWED_CSS: config.allowedCss,
    ALLOWED_URI_REGEXP:
      /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,

    ADD_ATTR: ['target'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onmouseout', 'onfocus', 'onblur'],
    KEEP_CONTENT: true,
    RETURN_DOM_FRAGMENT: false,
    RETURN_DOM: false,
    ALLOW_DATA_ATTR: true,
    ALLOW_UNKNOWN_PROTOCOLS: false,
  };

  try {
    const purify = await initializeDOMPurify();
    let sanitized = purify.sanitize(htmlContent, dompurifyConfig);

    // Post-processing to ensure proper list styling if enabled
    if (config.enableListStyling) {
      sanitized = enhanceListStyling(sanitized);
    }

    return sanitized;
  } catch (error) {
    console.error('DOMPurify sanitization error:', error);
    // Return empty string on error for safety
    return '';
  }
}

/**
 * Synchronous version that uses a simple regex-based sanitizer as fallback
 * @param htmlContent - The HTML content to sanitize
 * @param customConfig - Optional custom configuration to override defaults
 * @returns Sanitized HTML string
 */
export function sanitizeHtmlContentSync(
  htmlContent: string,
  customConfig: Partial<SanitizerConfig> = {}
): string {
  if (!htmlContent || typeof htmlContent !== 'string') {
    return '';
  }

  // Merge custom config with defaults
  const config = { ...DEFAULT_CONFIG, ...customConfig };

  // Basic sanitization using regex (fallback for sync usage)
  let sanitized = htmlContent
    // Remove script tags and their content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove on* event handlers
    .replace(/\s*on\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/\s*on\w+\s*=\s*'[^']*'/gi, '')
    // Remove javascript: protocols
    .replace(/javascript:/gi, '')
    // Remove data: protocols (except for images)
    .replace(/data:(?!image)/gi, '')
    // Remove style tags
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Filter allowed tags
  if (config.allowedTags) {
    const allowedTagsRegex = new RegExp(
      `<(?!/?(?:${config.allowedTags.join('|')})(?:\\s|>))[^>]*>`,
      'gi'
    );
    sanitized = sanitized.replace(allowedTagsRegex, '');
  }

  // Post-processing to ensure proper list styling if enabled
  if (config.enableListStyling) {
    sanitized = enhanceListStyling(sanitized);
  }

  return sanitized;
}

/**
 * Enhances list styling in sanitized HTML
 * @param htmlContent - The sanitized HTML content
 * @returns HTML with enhanced list styling
 */
function enhanceListStyling(htmlContent: string): string {
  return (
    htmlContent
      // Ensure ordered lists have proper styling
      .replace(
        /<ol(?![^>]*style)/g,
        '<ol style="list-style-type: decimal; padding-left: 1.5rem; margin: 1rem 0;"'
      )
      .replace(
        /<ol([^>]*style="[^"]*?)"/g,
        '<ol$1; list-style-type: decimal; padding-left: 1.5rem; margin: 1rem 0;"'
      )
      // Ensure unordered lists have proper styling
      .replace(
        /<ul(?![^>]*style)/g,
        '<ul style="list-style-type: disc; padding-left: 1.5rem; margin: 1rem 0;"'
      )
      .replace(
        /<ul([^>]*style="[^"]*?)"/g,
        '<ul$1; list-style-type: disc; padding-left: 1.5rem; margin: 1rem 0;"'
      )
      // Ensure list items have proper styling
      .replace(/<li(?![^>]*style)/g, '<li style="margin: 0.25rem 0; display: list-item;"')
      .replace(/<li([^>]*style="[^"]*?)"/g, '<li$1; margin: 0.25rem 0; display: list-item;"')
  );
}

/**
 * Sanitizes blog content with specific configuration for blog posts
 * @param blogContent - The blog content to sanitize
 * @returns Sanitized blog content
 */
export async function sanitizeBlogContent(blogContent: string): Promise<string> {
  return await sanitizeHtmlContent(blogContent, {
    // Blog-specific customizations can go here
    enableListStyling: true,
  });
}

/**
 * Synchronous version for blog content
 * @param blogContent - The blog content to sanitize
 * @returns Sanitized blog content
 */
export function sanitizeBlogContentSync(blogContent: string): string {
  return sanitizeHtmlContentSync(blogContent, {
    // Blog-specific customizations can go here
    enableListStyling: true,
  });
}

/**
 * Sanitizes product descriptions with specific configuration
 * @param productDescription - The product description to sanitize
 * @returns Sanitized product description
 */
export async function sanitizeProductDescription(productDescription: string): Promise<string> {
  return await sanitizeHtmlContent(productDescription, {
    // Product-specific customizations
    allowedTags: [
      'p',
      'br',
      'div',
      'span',
      'strong',
      'em',
      'b',
      'i',
      'u',
      'ul',
      'ol',
      'li',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
    ],
    enableListStyling: true,
  });
}

/**
 * Basic sanitization for user-generated content
 * @param userContent - The user content to sanitize
 * @returns Sanitized user content
 */
export async function sanitizeUserContent(userContent: string): Promise<string> {
  return await sanitizeHtmlContent(userContent, {
    allowedTags: ['p', 'br', 'strong', 'em', 'b', 'i'],
    allowedAttributes: [],
    enableListStyling: false,
  });
}

/**
 * Synchronous version for user content
 * @param userContent - The user content to sanitize
 * @returns Sanitized user content
 */
export function sanitizeUserContentSync(userContent: string): string {
  return sanitizeHtmlContentSync(userContent, {
    allowedTags: ['p', 'br', 'strong', 'em', 'b', 'i'],
    allowedAttributes: [],
    enableListStyling: false,
  });
}
