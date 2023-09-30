import React from "react";
import alri from './assets/alri.webp';
import { ImageProps } from "../../image";

export type AlriIconProps = Omit<ImageProps, 'src'>;

export const AlriIcon: React.FC<AlriIconProps> = (props) => (
  <img {...props} src={alri} />
);
