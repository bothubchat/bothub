import React from 'react';
import { LoaderStyled } from './styled';
import { useTheme } from '@/ui/theme';

export interface LoaderProps {
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className }) => {
  const theme = useTheme();

  return (
    <LoaderStyled
      className={className}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
    >
      <rect
        width="30"
        height="30"
        rx="4"
        fill={theme.colors.grayScale.gray3}
      />
      <circle
        cx="15"
        cy="15"
        r="7"
        stroke={theme.colors.grayScale.gray3}
        strokeWidth="2"
      />
      <mask
        id="path-3-inside-1_686_17478"
        fill="white"
      >
        <path d="M23 15C23 13.9494 22.7931 12.9091 22.391 11.9385C21.989 10.9679 21.3997 10.086 20.6569 9.34315C19.914 8.60028 19.0321 8.011 18.0615 7.60896C17.0909 7.20693 16.0506 7 15 7V9.00282C15.7876 9.00282 16.5674 9.15794 17.295 9.45933C18.0226 9.76072 18.6838 10.2025 19.2406 10.7594C19.7975 11.3162 20.2393 11.9774 20.5407 12.705C20.8421 13.4326 20.9972 14.2124 20.9972 15H23Z" />
      </mask>
      <path
        d="M23 15C23 13.9494 22.7931 12.9091 22.391 11.9385C21.989 10.9679 21.3997 10.086 20.6569 9.34315C19.914 8.60028 19.0321 8.011 18.0615 7.60896C17.0909 7.20693 16.0506 7 15 7V9.00282C15.7876 9.00282 16.5674 9.15794 17.295 9.45933C18.0226 9.76072 18.6838 10.2025 19.2406 10.7594C19.7975 11.3162 20.2393 11.9774 20.5407 12.705C20.8421 13.4326 20.9972 14.2124 20.9972 15H23Z"
        stroke={theme.colors.accent.primary}
        strokeWidth="4"
        mask="url(#path-3-inside-1_686_17478)"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 15 15"
          to="360 15 15"
          repeatCount="indefinite"
        />
      </path>
    </LoaderStyled>
  );
};

export * from './three-dots-loader';
