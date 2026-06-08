interface FileTreeNode {
  [key: string]: FileTreeNode;
}

const buildTreeString = (paths: string[]): string => {
  const tree: FileTreeNode = {};

  paths.forEach((path) => {
    if (!path.trim()) return;
    const parts = path.split('/');
    let current = tree;
    parts.forEach((part) => {
      if (!current[part]) current[part] = {};
      current = current[part];
    });
  });

  const printTree = (node: FileTreeNode, prefix: string = ''): string => {
    const keys = Object.keys(node);
    return keys
      .map((key, index) => {
        const isLast = index === keys.length - 1;
        const marker = isLast ? '└── ' : '├── ';
        const childPrefix = isLast ? '    ' : '│   ';
        const children = printTree(node[key], prefix + childPrefix);
        return `${prefix}${marker}${key}${children ? `\n${children}` : ''}`;
      })
      .join('\n');
  };

  return printTree(tree);
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
};

export const formatGithubContextToMarkdown = ({
  rawContext,
  translation,
}: {
  rawContext?: string;
  translation: {
    repo: string;
    branch: string;
    structure: string;
    loaded: string;
  };
}): string => {
  if (!rawContext) return '';

  const ownerMatch = rawContext.match(/owner="([^"]+)"/);
  const repoMatch = rawContext.match(/repo="([^"]+)"/);
  const branchMatch = rawContext.match(/branch="([^"]+)"/);
  const treeMatch = rawContext.match(/<file-tree>([\s\S]*?)<\/file-tree>/);
  const loadedMatch = rawContext.match(
    /<loaded-files>([\s\S]*?)<\/loaded-files>/,
  );

  const owner = ownerMatch ? ownerMatch[1] : '';
  const repo = repoMatch ? repoMatch[1] : '';
  const branch = branchMatch ? branchMatch[1] : '';
  const fileTreeRaw = treeMatch ? treeMatch[1].trim() : '';

  let markdown = '';

  if (owner && repo) {
    markdown += `### 📦 ${translation.repo}: **${owner}/${repo}**\n`;
    markdown += `**${translation.branch}:** \`${branch}\`\n\n`;
  }

  if (fileTreeRaw) {
    const pathsList = fileTreeRaw
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);
    const formattedTree = buildTreeString(pathsList);

    markdown += `#### 📂 ${translation.structure}:\n`;
    markdown += `\`\`\`text\n${formattedTree}\n\`\`\`\n\n`;
  }

  if (loadedMatch) {
    const filesRaw = loadedMatch[1];

    const matches = Array.from(filesRaw.matchAll(/<file\s+([^>]+)>/g));

    if (matches.length > 0) {
      markdown += `#### 📥 ${translation.loaded}:\n`;

      const filesList = matches.map((match) => {
        const attributesRaw = match[1];

        const pathMatch = attributesRaw.match(/path="([^"]+)"/);
        const statusMatch = attributesRaw.match(/status="([^"]+)"/);
        const sizeMatch = attributesRaw.match(/size="([^"]+)"/);

        const path = pathMatch ? pathMatch[1] : 'unknown';
        const status = statusMatch ? statusMatch[1] : '-';
        const size = sizeMatch ? parseInt(sizeMatch[1], 10) : 0;

        return `- \`${path}\` *(Status: ${status}, Size: ${formatBytes(size)})*`;
      });

      markdown += `${filesList.join('\n')}\n`;
    }
  }

  return markdown;
};
