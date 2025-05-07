import ReactQuill, { Quill } from 'react-quill-new';
import QuillResizeImage from 'quill-resize-image';
import './style.css';

import 'react-quill-new/dist/quill.snow.css';
Quill.register('modules/resize', QuillResizeImage);

interface InputHtmlProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const InputHtml = ({ placeholder, value, onChange }: InputHtmlProps) => {
  const Editor = {
    modules: {
      toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      clipboard: {
        matchVisual: false,
      },
      resize: {
        locale: {},
      },
    },
    formats: [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
    ],
  };

  return (
    <ReactQuill
      placeholder={placeholder}
      modules={Editor.modules}
      formats={Editor.formats}
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
};

export default InputHtml;
