import { useEffect } from 'react';
import Prism from 'prismjs';

// Import the required languages and themes
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  onCopy?: () => void;
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <div className="code-block">
      {title && <div className="code-block-title">{title}</div>}
      <pre className={`language-${language}`}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
