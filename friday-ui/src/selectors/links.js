
const mapStateToProps = (state) => {
  const { items, currentItem } = state.links;
  return { links: items, current: currentItem };
};

export default mapStateToProps;
