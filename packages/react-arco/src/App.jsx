function App() {
  const [file, setFile] = React.useState();
  return (
    // <Upload
    //     action='/'
    //     fileList={file ? [file] : []}
    //     showUploadList={false}
    //     onChange={(_, currentFile) => {
    //     	// 设置url为原始图提供预览
    //       setFile({
    //         ...currentFile,
    //         url: URL.createObjectURL(currentFile.originFile),
    //       });
    //     }}
    //     onProgress={(currentFile) => {
    //     	// 进度反馈
    //       setFile(currentFile);
    //     }}
    //   ></Upload>
    <Upload>
      <div className={cs}>
        {file && file.url ? (
          <div className="arco-upload-list-item-picture custom-upload-avatar">
            <img src={file.url} />
            <div className="arco-upload-list-item-picture-mask">
              <IconEdit />
            </div>
            {file.status === "uploading" && file.percent < 100 && (
              <Progress
                percent={file.percent}
                type="circle"
                size="mini"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              />
            )}
          </div>
        ) : (
          <div className="arco-upload-trigger-picture">
            {/* 如果存在头像显示头像，否则显示plus图标 */}
            {form.getFieldValue("avatar") ? (
              <Image
                width={100}
                src={form.getFieldValue("avatar")}
                alt="用户头像"
                preview={false}
              />
            ) : (
              <div className="arco-upload-trigger-picture-text">
                <IconPlus />
              </div>
            )}
          </div>
        )}
      </div>
    </Upload>
  );
}
