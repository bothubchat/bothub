import { createGlobalStyle, css } from 'styled-components';
import { BothubScaleVariant } from './types';

export const BothubMainScaleStyle = css`
  @media (max-width: 1600px) {
    --bothub-scale: 0.85;
  }
  @media (max-width: 1200px) {
    --bothub-scale: 0.8;
  }
  @media (max-width: 1100px) {
    --bothub-scale: 0.75;
  }
  @media (max-width: 1060px) {
    --bothub-scale: 0.9;
  }
  @media (max-width: 800px) {
    --bothub-scale: 0.85;
  }
  @media (max-width: 600px) {
    --bothub-scale: 0.8;
  }
  @media (max-width: 550px) {
    --bothub-scale: 0.9;
  }
  @media (max-width: 380px) {
    --bothub-scale: 0.8;
  }
  @media (max-width: 360px) {
    --bothub-scale: 0.7;
  }
  @media (max-width: 320px) {
    --bothub-scale: 0.7;
  }
  @media (max-width: 290px) {
    --bothub-scale: 0.6;
  }
  @media (max-width: 250px) {
    --bothub-scale: 0.5;
  }
  @media (max-width: 220px) {
    --bothub-scale: 0.45;
  }
  @media (max-width: 220px) {
    --bothub-scale: 0.35;
  }
`;

export const BothubDashboardScaleStyle = css`
  @media (max-width: 2000px) {
    --bothub-scale: 0.95;
  }
  @media (max-width: 1800px) {
    --bothub-scale: 0.9;
  }
  @media (max-width: 1600px) {
    --bothub-scale: 0.85;
  }
  @media (max-width: 1500px) {
    --bothub-scale: 0.8;
  }
  @media (max-width: 1400px) {
    --bothub-scale: 0.7;
  }
  @media (max-width: 1200px) {
    --bothub-scale: 0.66;
  }
  @media (max-width: 1130px) {
    --bothub-scale: 0.63;
  }
  @media (max-width: 1060px) {
    --bothub-scale: 0.85;
  }
  @media (max-width: 350px) {
    --bothub-scale: 0.8;
  }
  @media (max-width: 325px) {
    --bothub-scale: 0.75;
  }
  @media (max-width: 305px) {
    --bothub-scale: 0.7;
  }
  @media (max-width: 290px) {
    --bothub-scale: 0.6;
  }
  @media (max-width: 250px) {
    --bothub-scale: 0.5;
  }
  @media (max-width: 210px) {
    --bothub-scale: 0.4;
  }
  @media (max-width: 190px) {
    --bothub-scale: 0.3;
  }
  @media (max-width: 175px) {
    --bothub-scale: 0.2;
  }
`;

export interface BothubScaleGlobalStyleStyledProps {
  $variant: BothubScaleVariant; 
}

export const BothubScaleGlobalStyleStyled = createGlobalStyle<BothubScaleGlobalStyleStyledProps>`
  html {
    ${({ $variant }) => {
    switch ($variant) {
      case 'main':
        return BothubMainScaleStyle;
      case 'dashboard':
        return BothubDashboardScaleStyle;
    }
  }}
  }
`;
