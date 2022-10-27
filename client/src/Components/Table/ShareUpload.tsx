import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import BsButton from "react-bootstrap/Button";
import TableHeader from "../tableHeader";
import EmptyRow from "../emptyRow";
import { loggedInData } from "../../utilities/loggedIn";
import { useAppDispatch, useAppSelector } from "../../utilities/hooks";
import { fetchUserShares } from "../../utilities/slice/userSlice";
// import { ApiDownloadFile } from "../../Utilitites/Api";

type AppProps = {
  data: {
    headers: Array<{
      label: string;
      width: string;
    }>;
    minRows: number;
    numCols: number;
  };
};

const ShareUpload = ({ data }: AppProps) => {
  const dispatch = useAppDispatch();
  const loggedIn = loggedInData();
  const shareFiles = useAppSelector((state) => state.users.dataShare);

  useEffect(() => {
    dispatch(fetchUserShares(loggedIn.id));
  }, [dispatch, loggedIn.id]);

  const downloadAction = (fileName: string, fileLocation: string) => {
    return (
      <BsButton
        className="btn-download"
        variant="link"
        onClick={() => onDownloadActionHandler(fileName, fileLocation)}
      >
        {fileName}
      </BsButton>
    );
  };

  const onDownloadActionHandler = (
    fileName: string,
    fileLocation: string
  ): void => {
    // ApiDownloadFile({
    //   fileLocation: fileLocation,
    //   filename: fileName,
    // })
    //   .then()
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="table-container">
      <Table striped>
        <TableHeader headers={data.headers} />
        <tbody>
          {shareFiles.map((shareTo, i) => (
            <tr key={i}>
              <td className="td-left">{shareTo.shareToUpload.label}</td>
              <td className="td-border">
                {downloadAction(
                  shareTo.shareToUpload.filename,
                  shareTo.shareToUpload.fileLocation
                )}
              </td>
              <td>{shareTo.shareToUpload.uploadUser.email}</td>
            </tr>
          ))}
          <EmptyRow
            count={data.minRows - shareFiles.length}
            colCount={data.numCols}
          />
        </tbody>
      </Table>
    </div>
  );
};

export default ShareUpload;
