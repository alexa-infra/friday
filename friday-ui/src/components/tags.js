import React, { Component } from 'react';
import './tags.css';


const Tag = ({tag, onRemove, disabled}) => (
  <div className='tag'>
    {tag}
    <i className='fa fa-times delete'
       disabled={disabled}
       onClick={onRemove} />
  </div>
)

const Tags = ({ tags, remove, disabled }) => (
  <div className='tags'>
    {
      tags.map(it => (
        <Tag key={it.id}
             tag={it.name}
             disabled={disabled}
             onRemove={() => remove(it)}
        />
      ))
    }
  </div>
)

class TagInput extends Component {
  state = {
    text : '',
    breaks : [' ', ',', ';', '.'],
  }
  getNewTags(text) {
    const { breaks } = this.state;
    const re = `[${ breaks.join('') }]`;
    return text.split(new RegExp(re));
  }
  addTags(text) {
    const tags = this.getNewTags(text);
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

class TagsContainer extends Component {
  state = {
    tags: [],
    nextId: 1,
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tags !== prevState.tags) {
      const tags = nextProps.tags;
      if (tags === null || tags === undefined) return null;
      let nextId = 1;
      const newTags = tags.map(it => ({id: nextId++, name: it}));
      return { tags: newTags, nextId: nextId };
    }
    return null;
  }
  remove = tag => {
    const { tags } = this.state;
    const newTags = tags.filter(it => it.id !== tag.id);
    this.props.onChange(newTags.map(it => it.name));
  }
  add = tag => {
    const { tags, nextId } = this.state;
    const newTags = [...tags, { name: tag, id: nextId+1 }];
    this.props.onChange(newTags.map(it => it.name));
  }
  addRange = tags => {
    const oldTags = this.state.tags;
    let { nextId } = this.state;
    const converted = tags.filter(it => it.trim().length > 0).map(
      it => ({name: it, id: nextId++})
    );
    const newTags = [...oldTags, ...converted];
    this.props.onChange(newTags.map(it => it.name));
  }
  setFocus() {
    if (this.props.disabled) return;
    this.tagInput.setFocus();
  }
  render() {
    const { tags } = this.state;
    const { placeholder, disabled } = this.props;
    return (
      <div className='tags-container'
           onClick={() => this.setFocus()}
           disabled={disabled}>
        <Tags tags={tags}
              remove={this.remove}
              disabled={disabled} />
        <TagInput tags={tags}
                  addRange={this.addRange}
                  ref={el => { this.tagInput = el; }}
                  disabled={disabled}
                  placeholder={tags.length === 0 ? placeholder : ''} />
      </div>
    )
  }
}

export default TagsContainer;
