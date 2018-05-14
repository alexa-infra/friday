
const mapStateToProps = (state) => {
  const { items, currentItem, filter } = state.links;
  return { links: items, current: currentItem, filter: filter };
};

export default mapStateToProps;
