import ReactMarkdown from 'react-markdown';

export const MarkdownContent = ({ content, isUser = false }) => {
  if (isUser) {
    return <span className="whitespace-pre-wrap">{content}</span>;
  }

  return (
    <div className="prose prose-sm max-w-none text-slate-800 space-y-2 break-words leading-relaxed text-sm">
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-base font-bold text-slate-900 mt-3 mb-1.5 border-b border-slate-200 pb-1" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-sm font-bold text-slate-900 mt-2.5 mb-1" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-sm font-semibold text-slate-900 mt-2 mb-1" {...props} />
          ),
          p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1 mb-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-1 mb-2" {...props} />,
          li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-semibold text-slate-900" {...props} />,
          a: ({ node, ...props }) => (
            <a
              className="text-brand font-medium underline underline-offset-2 hover:text-brand/80"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-brand/40 bg-slate-50 pl-3 py-1 my-2 italic text-slate-600 text-xs rounded-r" {...props} />
          ),
          code: ({ node, inline, ...props }) =>
            inline ? (
              <code className="bg-slate-200/80 px-1 py-0.5 rounded text-xs font-mono text-slate-800 font-semibold" {...props} />
            ) : (
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs font-mono overflow-x-auto my-2 shadow-inner">
                <code {...props} />
              </pre>
            ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
