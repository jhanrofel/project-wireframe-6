import BsButton from "react-bootstrap/Button";
import { Link } from "react-router-dom";
type AppProps = {
  name: string;
  text: string;
  variant?: string;
  className?: string;
  link: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ name, text, variant, className, link, onClick }: AppProps) => {
  return (
    <>
      <Link to={link}>
        <BsButton
          name={name}
          variant={variant}
          className={className}
          onClick={onClick}
        >
          {text}
        </BsButton>
      </Link>
    </>
  )
}

export default Button;