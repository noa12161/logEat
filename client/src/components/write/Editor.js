import './write.css';
import { useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect } from 'react';

const Editor = ({ onChangeValue, title, message }) => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      modules: {
        toolbar: [[{ header: [1, 2, 3, false] }], ['bold', 'italic']],
      },
      placeholder: '기록...',
      theme: 'snow', // or 'bubble'
    });

    const quill = quillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeValue({ name: 'message', value: quill.root.innerHTML });
      }
    });
  }, [onChangeValue]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = message;
  }, [message]);

  // 리덕스 스토어 write.title 변경 함수
  const onChangeTitle = (e) => {
    onChangeValue({ name: 'title', value: e.target.value });
  };

  return (
    <div className="editor_container">
      <input
        type="text"
        className="editor_form_title"
        placeholder="제목..."
        value={title}
        onChange={onChangeTitle}
      />
      <div className="quill_container">
        <div ref={quillElement} />
      </div>
    </div>
  );
};

export default Editor;
