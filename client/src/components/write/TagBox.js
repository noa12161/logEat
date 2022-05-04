import './write.css';
import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';

const TagBox = ({ onChangeTags, tags }) => {
  const [inputValue, setInputValue] = useState('');
  const [localTags, setLocalTags] = useState([]);

  const inserTag = useCallback(
    (tag) => {
      if (!tag) return;
      if (localTags.includes(tag)) return;
      const nextTags = [...localTags, tag];
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onRemove = useCallback(
    (tag) => {
      const nextTags = localTags.filter((t) => t !== tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      inserTag(inputValue.trim());
      setInputValue('');
    },
    [inputValue, inserTag],
  );
  /*
  useEffect -> setLocalTags -> onSubmit -> insertTag
  -> setLocalTags -> onChangeTags 
*/

  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  const TagItem = React.memo(({ tag, onRemove }) => (
    <div onClick={() => onRemove(tag)} className="tagBox_tag">
      #{tag}
    </div>
  ));
  const TagList = React.memo(({ tags, onRemove }) => (
    <div className="tagList_container">
      {tags?.map((tag, i) => (
        <TagItem key={i} tag={tag} onRemove={onRemove} />
      ))}
    </div>
  ));

  return (
    <div className="tagBox_container">
      <h4>태그</h4>
      <form className="tagBox_form" onSubmit={onSubmit}>
        <input
          className="tagBox_form_input"
          value={inputValue}
          onChange={onChange}
        />
        <button className="tagBox_form_button" type="submit">
          추가
        </button>
      </form>
      <TagList onRemove={onRemove} tags={localTags} />
    </div>
  );
};

export default TagBox;
