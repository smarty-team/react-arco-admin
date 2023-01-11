import React from 'react';
import { Upload, Progress, Image, Form } from '@arco-design/web-react';
import { IconPlus, IconEdit } from '@arco-design/web-react/icon';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import { OpResult } from '@/api/types';

export default function () {
  const { form, disabled } = Form.useFormContext();
  const [file, setFile] = React.useState<UploadItem>();
  const cs = `arco-upload-list-item${file && file.status === 'error' ? ' is-error' : ''
    }`;
  return (
    <div>
      <Upload
        disabled={disabled}
        headers={{ Authorization: 'Bearer ' + localStorage.getItem('token') }}
        action="/api/user/upload"
        fileList={file ? [file] : []}
        showUploadList={false}
        onChange={(_, currentFile) => {
          setFile({
            ...currentFile,
            url: URL.createObjectURL(currentFile.originFile),
          });

          // 上传成功，获取文件名
          if (currentFile.status === 'done') {
            const { data } = currentFile.response as OpResult<string>;
            form.setFieldValue('avatar', data);
          }
        }}
        onProgress={(currentFile) => {
          setFile(currentFile);
        }}
      >
        <div className={cs}>
          {file && file.url ? (
            <div className="arco-upload-list-item-picture custom-upload-avatar">
              <img src={file.url} />
              <div className="arco-upload-list-item-picture-mask">
                <IconEdit />
              </div>
              {file.status === 'uploading' && file.percent < 100 && (
                <Progress
                  percent={file.percent}
                  type="circle"
                  size="mini"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                  }}
                />
              )}
            </div>
          ) : (
            <div className="arco-upload-trigger-picture">
              {/* 如果存在头像显示头像，否则显示plus图标 */}
              {form.getFieldValue('avatar') ? (
                <Image
                  width={100}
                  src={form.getFieldValue('avatar')}
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
    </div>
  );
}
