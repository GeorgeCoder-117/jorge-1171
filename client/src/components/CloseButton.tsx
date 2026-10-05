interface CloseBtnProps {
  name: string;
  handleClick: () => void;
}

export const CloseButton = ({ name, handleClick }: CloseBtnProps) => {
  return (
    <button className="btn btn-danger btn-close" type="button" onClick={handleClick}>
      {name}
    </button>
  );
};
