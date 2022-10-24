type AppProps = {
  text: string;
};

const Header = ({ text }: AppProps) => {
  return (
    <div>
      <h3>{text}</h3>
    </div>
  );
};

export default Header;
