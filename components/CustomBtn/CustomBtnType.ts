interface CommonBtnProps {
  text: string;
  Icon?: React.ReactNode;
  fit?: boolean;
  left?: boolean;
  color?: "Transparent";
}

export interface CustomLinkBtnProps extends CommonBtnProps {
  LinkUrl: string;
}

export interface CustomBtnProps extends CommonBtnProps {
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
