type AppProps = {
  text: string;
};

const TableTitle = ({ text }: AppProps) => {  
  return <div style={styles.container}>{text}</div>;
}

const styles = {
  container: {
    fontSize: "25px",
    marginLeft: "10px",
    marginTop: "40px",
    marginBottom: "10px",
    textAlign: "start",
  }
} as const;

export default TableTitle;