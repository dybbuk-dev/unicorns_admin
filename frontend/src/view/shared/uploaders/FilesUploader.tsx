import { FileIcon, defaultStyles } from 'react-file-icon';
import { styleDefObj } from 'src/view/shared/styles/react-file-icon-styles';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Close';
import DragAndDropUploaderArea from 'src/view/shared/uploaders/DragAndDropUploaderArea';
import Errors from 'src/modules/shared/error/errors';
import filesize from 'filesize';
import FileUploader, {
  extractExtensionFrom,
} from 'src/modules/shared/fileUpload/fileUploader';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import Spinner from 'src/view/shared/Spinner';

function FilesUploader(props) {
  const [loading, setLoading] = useState(false);

  const value = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    return Array.isArray(value) ? value : [value];
  };

  const fileList = () => {
    return value().map((item) => ({
      uid: item.id || undefined,
      name: item.name,
      status: 'done',
      url: item.downloadUrl,
    }));
  };

  const handleRemove = (id) => {
    props.onChange(
      value().filter((item) => item.id !== id),
    );
  };

  const formats =
    props.formats ||
    (props.storage && props.storage.formats);

  const handleChange = async (uploads) => {
    if (!uploads || !uploads.length) {
      return;
    }

    const newValue = [...value()];

    setLoading(true);

    for (let i = 0; i < uploads.length; i++) {
      try {
        const file = await FileUploader.upload(uploads[i], {
          storage: props.storage,
          formats,
        });
        if (!file) {
          continue;
        }
        newValue.push(file);
      } catch (error) {
        console.error(error);
        Errors.showMessage(error);
      }
    }

    setLoading(false);

    props.onChange && props.onChange(newValue);
  };

  const { max, readonly } = props;

  const size = filesize.partial({
    base: 2,
    standard: 'jedec',
  });

  const renderFileIcon = (file) => {
    const ext = extractExtensionFrom(file.name);
    const customDefaultLabelColor = styleDefObj[ext]
      ? styleDefObj[ext]['labelColor'] ?? '#777'
      : '#777';
    const libDefaultGlyphColor =
      defaultStyles[ext] &&
      defaultStyles[ext]['labelColor'];
    return (
      <MDBox
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
        mb={1}
        mr={2}
      >
        <MDBox minWidth="48px" maxWidth="48px">
          <MaterialLink
            href={file.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'block',
              lineHeight: 0,
            }}
            download
          >
            <FileIcon
              extension={ext}
              glyphColor={
                libDefaultGlyphColor ??
                customDefaultLabelColor
              }
              labelColor={customDefaultLabelColor}
              {...defaultStyles[ext]}
              {...styleDefObj[ext]}
            />
          </MaterialLink>
        </MDBox>
        <MDBox
          minWidth={`calc(100% - ${
            readonly ? '48' : '88'
          }px)`}
          maxWidth={`calc(100% - ${
            readonly ? '48' : '88'
          }px)`}
        >
          <MDTypography
            display="block"
            variant="button"
            fontWeight="regular"
            color="text"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            minWidth="100%"
            maxWidth="100%"
          >
            {file.name}
            <br />
            {size(file.sizeInBytes)}
          </MDTypography>
        </MDBox>
        {!readonly && (
          <MaterialLink
            component="button"
            color="secondary"
            onClick={() => handleRemove(file.id)}
            underline="hover"
          >
            <ClearIcon fontSize="small" />
          </MaterialLink>
        )}
      </MDBox>
    );
  };

  return (
    <div>
      {value() && value().length ? (
        <MDBox mt={1}>
          {value().map((item) => {
            return (
              <MDBox
                key={item.id}
                display="inline-block"
                width="25%"
              >
                {renderFileIcon(item)}
              </MDBox>
            );
          })}
        </MDBox>
      ) : null}

      {loading && <Spinner />}

      {loading ||
      readonly ||
      (max && fileList().length >= max) ? null : (
        <DragAndDropUploaderArea
          handleChange={handleChange}
          // multiple={max !== 1}
          storage={props.storage}
          types={formats}
        />
      )}
    </div>
  );
}

FilesUploader.propTypes = {
  formats: PropTypes.arrayOf(PropTypes.string),
  max: PropTypes.number,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  storage: PropTypes.object,
  value: PropTypes.any,
};

export default FilesUploader;
