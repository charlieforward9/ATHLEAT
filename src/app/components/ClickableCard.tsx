import React from "react";

interface ClickableCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const ClickableCard: React.FC<ClickableCardProps> = (props) => {
  return (
    <div onClick={props.onClick}>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};

export default ClickableCard;
