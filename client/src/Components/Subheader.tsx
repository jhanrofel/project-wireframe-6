type AppProps = {
  text: string;
};

const Subheader = ({ text }: AppProps) => {
  return (
    <div>
      <h5>{text}</h5>
    </div>
  )
}

export default Subheader;