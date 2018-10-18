import React, { Component } from 'react';
import './tags.css';


const Tag = ({tag, onRemove, disabled}) => (
  <div className='tag'>
    {tag}
    {disabled ? null : (
      <i className='fa fa-times delete'
         onClick={onRemove} />
    )}
  </div>
)

const Tags = ({ tags, remove, disabled }) => {
  let nextId = 1;
  return (
    <div className='tags'>
      {
        tags.map(tag => (
          <Tag key={nextId++}
               tag={tag}
               disabled={disabled}
               onRemove={() => remove(tag)}
          />
        ))
      }
    </div>
  );
}

class TagInput extends Component {
  state = {
    text : '',
    breaks : [' ', ',', ';', '.'],
  }
  getNewTags(text) {
    const { breaks } = this.state;
    const re = `[${ breaks.join('') }]`;
    return text.split(new RegExp(re))
      .map(it => it.trim())
      .filter(it => it.length > 0);
  }
  addTags(text) {
    const tags = this.getNewTags(text);
    if (!tags) return;
    const { addRange } = this.props;
    addRange(tags)
    this.setState({ text: '' });
  }
  checkBreaks(txt) {
    const { breaks } = this.state;
    for (let i=0; i < breaks.length; i++) {
      if (txt.indexOf(breaks[i]) !== -1) {
        return true;
      }
    }
    return false;
  }
  onTextChange = event => {
    const text = event.target.value;
    if (this.checkBreaks(text)) {
      if (text.length === 1)
        return;
      this.addTags(text);
    } else {
      this.setState({ text });
    }
  }
  handleKeyUp = event => {
    const text = event.target.value;
    if (event.keyCode === 13) {
      event.preventDefault();
      this.addTags(text);
      return false;
    }
  }
  handleBlur = event => {
    const text = event.target.value;
    this.addTags(text);
  }
  setFocus() {
    if (this.props.disabled) return;
    this.el.focus();
  }
  render() {
    const { text } = this.state;
    const { placeholder, disabled } = this.props;
    if (disabled) return null;
    return (
      <input type='text'
             className='tag-input'
             value={text}
             ref={el => { this.el = el; }}
             placeholder={placeholder}
             onChange={this.onTextChange}
             onKeyUp={this.handleKeyUp}
             onBlur={this.handleBlur} />
    )
  }
}

class TagsEdit extends Component {
  remove = tag => {
    const { tags } = this.props;
    const newTags = tags.filter(it => it !== tag);
    this.props.onChange(newTags);
  }
  add = tag => {
    const { tags } = this.props;
    const newTags = [...tags, tag];
    this.props.onChange(newTags);
  }
  addRange = tags => {
    const { tags: oldTags } = this.props;
    const newTags = [...oldTags, ...tags];
    this.props.onChange(newTags);
  }
  setFocus = () => {
    if (this.props.disabled) return;
    this.tagInput.setFocus();
  }
  render() {
    const { tags, placeholder, disabled } = this.props;
    return (
      <div className='tags-container'
           onClick={this.setFocus}
           disabled={disabled}>
        <Tags tags={tags || []}
              remove={this.remove}
              disabled={disabled} />
        <TagInput addRange={this.addRange}
                  ref={el => { this.tagInput = el; }}
                  disabled={disabled}
                  placeholder={tags.length ? '' : placeholder} />
      </div>
    )
  }
}

const TagsViewer = ({tags}) => (
  <div className='tags-container' disabled>
    <Tags tags={tags || []} disabled />
  </div>
);

const renderTags = ({ input }) => (
  <TagsEdit tags={input.value}
            onChange={input.onChange} />
);

export { TagsEdit, TagsViewer, renderTags };
