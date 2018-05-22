
const mapStateToProps = (state) => {
  const { items, currentItem, filter, editMode, newLink, editDisabled } = state.links;
  return { links: items, currentItem: currentItem, filter: filter, editMode: editMode, newLink: newLink, editDisabled: editDisabled };
};

export default mapStateToProps;
