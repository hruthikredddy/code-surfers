import React from 'react';
import { ExternalLink } from 'lucide-react';

interface FormattedAIResponseProps {
  content: string;
  isStreaming?: boolean;
}

/**
 * Formats markdown content (headings, paragraphs, bullet lists, numbered steps,
 * tables, links, bold, code) cleanly for BIS Sahayak AI responses.
 */
export function FormattedAIResponse({ content, isStreaming }: FormattedAIResponseProps) {
  if (!content) return null;

  // Split into lines to identify blocks
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];

  let i = 0;
  let keyIndex = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      i++;
      continue;
    }

    // Markdown Table Detection (line contains | and has at least 2 cells)
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.split('|').length > 2) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerCells = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());

        // Skip divider line (e.g. |---|---|)
        const rowStartIndex = tableLines[1].includes('---') ? 2 : 1;
        const rows = tableLines.slice(rowStartIndex).map((row) =>
          row
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim())
        );

        blocks.push(
          <div key={`table-${keyIndex++}`} className="my-3 overflow-x-auto rounded-xl border border-[rgba(170,167,133,0.22)] bg-[#2A3328]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[rgba(170,167,133,0.22)] bg-[#232323]">
                  {headerCells.map((header, hIdx) => (
                    <th key={hIdx} className="px-3.5 py-2.5 font-bold text-[#FDFDF5] whitespace-nowrap">
                      {renderInlineText(header)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(170,167,133,0.15)]">
                {rows.map((rowCells, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#232323]/50 transition-colors">
                    {rowCells.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3.5 py-2 text-[#E1E1D5] leading-relaxed">
                        {renderInlineText(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      blocks.push(
        <h4 key={`h3-${keyIndex++}`} className="text-sm font-bold text-[#FDFDF5] mt-4 mb-1.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#AAA785]" />
          <span>{renderInlineText(trimmed.replace(/^###\s+/, ''))}</span>
        </h4>
      );
      i++;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      blocks.push(
        <h3 key={`h2-${keyIndex++}`} className="text-base font-bold text-[#FDFDF5] mt-4 mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#AAA785]" />
          <span>{renderInlineText(trimmed.replace(/^##\s+/, ''))}</span>
        </h3>
      );
      i++;
      continue;
    }
    if (trimmed.startsWith('# ')) {
      blocks.push(
        <h2 key={`h1-${keyIndex++}`} className="text-lg font-extrabold text-[#FDFDF5] mt-4 mb-2">
          {renderInlineText(trimmed.replace(/^#\s+/, ''))}
        </h2>
      );
      i++;
      continue;
    }

    // Bullet list block
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      const listItems: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith('* ') ||
          lines[i].trim().startsWith('- ') ||
          lines[i].trim().startsWith('• '))
      ) {
        listItems.push(lines[i].trim().replace(/^[*•-]\s+/, ''));
        i++;
      }

      blocks.push(
        <ul key={`ul-${keyIndex++}`} className="my-2.5 space-y-1.5 pl-1">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#E1E1D5] leading-relaxed">
              <span className="text-[#AAA785] font-bold text-xs mt-0.5 shrink-0">•</span>
              <span className="flex-1">{renderInlineText(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list block (e.g. 1. , 2. )
    if (/^\d+\.\s+/.test(trimmed)) {
      const numberedItems: { num: string; text: string }[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        const match = lines[i].trim().match(/^(\d+)\.\s+(.*)/);
        if (match) {
          numberedItems.push({ num: match[1], text: match[2] });
        }
        i++;
      }

      blocks.push(
        <ol key={`ol-${keyIndex++}`} className="my-2.5 space-y-2 pl-0.5">
          {numberedItems.map((item, lIdx) => (
            <li key={lIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E1E1D5] leading-relaxed">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#2A3328] border border-[rgba(170,167,133,0.22)] text-[10px] font-bold text-[#AAA785]">
                {item.num}
              </span>
              <span className="flex-1 mt-0.5">{renderInlineText(item.text)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular paragraph
    blocks.push(
      <p key={`p-${keyIndex++}`} className="my-1.5 text-xs sm:text-sm text-[#FDFDF5] leading-relaxed">
        {renderInlineText(trimmed)}
      </p>
    );
    i++;
  }

  return (
    <div className="space-y-1 text-[#FDFDF5]">
      {blocks}
      {isStreaming && (
        <span
          className="inline-block w-1.5 h-3.5 ml-0.5 bg-[#AAA785] align-middle rounded-2xs animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/**
 * Handles inline markdown: **bold**, `code`, and [links](url)
 */
function renderInlineText(text: string): React.ReactNode {
  // Regex to match markdown links, bold text, and code spans
  const parts: React.ReactNode[] = [];
  const tokenRegex = /(\[.*?\]\(https?:\/\/.*?\)|\*\*.*?\*\*|`.*?`)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];

    // Markdown link: [text](url)
    if (token.startsWith('[') && token.includes('](') && token.endsWith(')')) {
      const linkMatch = token.match(/^\[(.*?)\]\((https?:\/\/.*?)\)$/);
      if (linkMatch) {
        parts.push(
          <a
            key={match.index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#AAA785] hover:underline"
          >
            <span>{linkMatch[1]}</span>
            <ExternalLink className="h-3 w-3 inline shrink-0" />
          </a>
        );
      } else {
        parts.push(token);
      }
    }
    // Bold: **text**
    else if (token.startsWith('**') && token.endsWith('**')) {
      const boldText = token.slice(2, -2);
      parts.push(
        <strong key={match.index} className="font-bold text-[#FDFDF5]">
          {boldText}
        </strong>
      );
    }
    // Inline code: `code`
    else if (token.startsWith('`') && token.endsWith('`')) {
      const codeText = token.slice(1, -1);
      parts.push(
        <code
          key={match.index}
          className="rounded bg-[#2A3328] border border-[rgba(170,167,133,0.22)] px-1.5 py-0.5 font-mono text-[11px] text-[#AAA785]"
        >
          {codeText}
        </code>
      );
    } else {
      parts.push(token);
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
