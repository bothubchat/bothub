export const getTgMarkdown = (string: string) =>
  string
    // --- => ''
    .replace(/^\s*[-*_]{3,}\s*$/gm, '')
    // # Header -> **Bold**
    .replace(/#{1,6} *(.*)/gm, '**$1**')
    // **_BoldItalic_** -> **Bold**
    .replace(/\*\*_(.*?)_\*\*/g, '**$1**')
    // __Bold__ OR **Bold** -> **Bold**
    .replace(/_{2}(.*)_{2}/g, '**$1**')
    // *Italic* OR _Italic_ -> __Italic__
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '__$1__')
    .replace(/(?<!_)_([^_]+)_(?!_)/g, '__$1__')
    // > Quote -> __Italic__
    .replace(/^\s*>\s*(.+)$/gm, '__$1__')
    // List -> Text w/ dashes
    .replace(/^\s*[*+-]\s+(.+)$/gm, '- $1')
    .replace(/^\s*\d+\.\s+(.+)$/gm, '- $1')
    // [link](uri) OR ![image](uri) -> text
    .replace(/!?\[(.*)\]\(.*\)/g, '$1')
    // Tables -> Text
    .replace(/^\|(.+)\|$/gm, '$1')
    .replace(/^[-|:\s]+$/gm, '')
    // Remove extra lines
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
