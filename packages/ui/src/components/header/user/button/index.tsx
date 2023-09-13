import React from "react";
import { Button, ButtonProps } from "../../../button";
import { useHeaderMenu } from "../../menu/context";

export const HeaderUserButton: React.FC<ButtonProps> = ({ ...props }) => {
  const { isInMenu } = useHeaderMenu();

  return <Button {...props} fullWidth={isInMenu} />;
};