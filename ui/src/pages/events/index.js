import React from 'react';
import { Calendar } from './calendar';
import { EventEditForm } from './editForm';
import { EventNewForm } from './newForm';

export const EventsPage = () => {
  const [editItem, showEditItem] = React.useState(null);
  const [newItem, showNewItem] = React.useState(null);
  const showEdit = it => showEditItem(it);
  const hideEdit = () => showEditItem(null);
  const showNew = it => showNewItem(it);
  const hideNew = () => showNewItem(null);
  return (
    <div className="row justify-content-center">
      <div className="col col-md-10">
        <Calendar
          showEdit={showEdit}
          showNew={showNew}
        />
        <EventEditForm
          item={editItem}
          show={editItem !== null}
          hide={hideEdit}
        />
        <EventNewForm
          item={newItem}
          show={newItem !== null}
          hide={hideNew}
        />
      </div>
    </div>
  );
}
