/* eslint-env node */
module.exports = {
  rules: {
    // Ensure consistent viewBox
    attr: [
      {
        viewBox: /^0 0 24 24$/,
        'rule::selector': 'svg',
        'rule::description': 'All icons should have a 24x24 viewBox',
      },
    ],
    // Ensure proper element usage
    elm: {
      'g:empty': false,
      'rule::description': 'Remove empty groups',
    },
    // Ensure valid SVG structure
    valid: true,
  },
  // Custom rules for icon library
  custom: [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function (reporter, $, _ast, _info) {
      // Check for consistent stroke-based design
      const hasFill = $('[fill]:not([fill="none"])').length > 0;
      const hasStroke = $('[stroke]').length > 0;

      if (hasFill && !hasStroke) {
        reporter.warn('Consider using stroke-based design for better scalability');
      }
      
      // Check for inline styles
      const hasInlineStyles = $('[style]').length > 0;
      if (hasInlineStyles) {
        reporter.error('No inline styles allowed');
      }
    },
  ],
};
