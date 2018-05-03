
const mapStateToProps = (state) => {
  const { items, month, firstDay, lastDay } = state.events;
  return { events: items, month, firstDay, lastDay };
};

export default mapStateToProps;
