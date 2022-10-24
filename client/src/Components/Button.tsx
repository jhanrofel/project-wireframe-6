import BsButton from "react-bootstrap/Button";
type AppProps = {
  name: string;
  text: string;
  variant?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ name, text, variant, className, onClick }: AppProps) => {
  return (
    <>
      <BsButton
        name={name}
        variant={variant}
        className={className}
        onClick={onClick}
      >
        {text}
      </BsButton>
    </>
  )
}

export default Button;