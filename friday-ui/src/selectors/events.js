
export const mapEventList = (state) => {
  const { items, month, firstDay, lastDay, currentItem, editDisabled } = state.events;
  return { events: items, month, firstDay, lastDay, currentItem, editDisabled };
};

export const mapEventEdit = state => {
  const { currentItem, editDisabled } = state.events;
  return { currentItem, editDisabled };
}

export const mapEventNew = state => {
  const { newEventDate, editDisabled } = state.events;
  return { newEventDate, editDisabled };
}