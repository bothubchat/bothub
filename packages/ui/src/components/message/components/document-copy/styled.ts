import { styled } from 'styled-components';

export const MessageDocumentContentBlock = styled.div`
  position: relative;
  margin: 16px 0;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.grayScale.gray1};

  .ai-generated-document-content {
    white-space: normal;

    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .ai-generated-document-content p,
  .ai-generated-document-content ul,
  .ai-generated-document-content ol,
  .ai-generated-document-content h1,
  .ai-generated-document-content h2,
  .ai-generated-document-content h3,
  .ai-generated-document-content h4,
  .ai-generated-document-content h5,
  .ai-generated-document-content h6 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  .ai-generated-document-content li {
    margin-bottom: 4px;
  }
  .ai-generated-document-content li:last-child {
    margin-bottom: 0;
  }
`;

export const MessageDocumentContentBlockTop = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 12px;
`;

export const MessageDocumentCopyButton = styled.button`
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.grayScale.gray1};
  background: transparent;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;
