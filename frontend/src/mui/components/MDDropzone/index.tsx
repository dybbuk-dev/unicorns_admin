import { useEffect, useRef } from 'react';

// Dropzone components
import Dropzone from 'dropzone';

// Dropzone styles
import 'dropzone/dist/dropzone.css';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';

// Custom styles for the MDDropzone
import MDDropzoneRoot from 'src/mui/components/MDDropzone/MDDropzoneRoot';

// Declaring props types for MDDropzone
interface Props {
  options: {
    [key: string | number]: any;
  };
}

function MDDropzone({ options }: Props): JSX.Element {
  const dropzoneRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    Dropzone.autoDiscover = false;

    function createDropzone() {
      return new Dropzone(dropzoneRef.current, {
        ...options,
      });
    }

    function removeDropzone() {
      if (Dropzone.instances.length > 0)
        Dropzone.instances.forEach((dz: any) =>
          dz.destroy(),
        );
    }

    createDropzone();

    return () => removeDropzone();
  }, [options]);

  return (
    <MDDropzoneRoot
      action="/file-upload"
      ref={dropzoneRef}
      className="form-control dropzone"
    >
      <MDBox className="fallback" bgcolor="transparent">
        <input name="file" type="file" multiple />
      </MDBox>
    </MDDropzoneRoot>
  );
}

export default MDDropzone;
