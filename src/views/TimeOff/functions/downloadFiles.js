import { TARGET } from "common/constants";

export const openFile = (file) => window.open(file, TARGET.blank);

const handleDownload = (fileURL) => {
  fileURL.forEach((value, idx) => {
    const response = {
      file: value,
    };
    setTimeout(() => {
      // window.location.href = response.file;
      window.open(response.file, TARGET.blank);
    }, idx * 2000);
  });
};

export default handleDownload;
