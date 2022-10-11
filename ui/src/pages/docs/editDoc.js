import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { renderTags } from './tags';
import { Button } from '../../components';
import { useGetDocQuery, useGetDocTextQuery, useUpdateDocMutation, usePutDocTextMutation, useDeleteDocMutation } from '../../api';

export const DocEdit = () => {
  const [wrap, setWrap] = React.useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { data, isLoading } = useGetDocQuery(params.id);
  const { data: text, isLoading: textIsLoading } = useGetDocTextQuery(params.id);
  const [remove, removeState] = useDeleteDocMutation();
  const [update, updateState] = useUpdateDocMutation();
  const [putText, putTextState] = usePutDocTextMutation();
  React.useEffect(() => {
    if (removeState.isSuccess) {
      removeState.reset();
      navigate(`/docs`);
    }
  }, [removeState, navigate]);
  React.useEffect(() => {
    if (updateState.isSuccess && putTextState.isSuccess) {
      updateState.reset();
      putTextState.reset();
      navigate(`/docs/${updateState.data.id}`);
    }
  }, [updateState, putTextState, navigate]);

  const onSubmit = async (values) => {
    const data = await update(values).unwrap();
    await putText({ id: data.id, text: values.text }).unwrap();
  }
  const deleteConfirm = () => {
    if (window.confirm('Are you sure you want to delete this item')) remove(data);
  };

  if (isLoading || textIsLoading) {
    return null;
  }
  return (
    <article className="doc-page edit">
      <Form
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={{...data, text }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="controls">
              <Button type="submit">
                Save
              </Button>
              <Button onClick={deleteConfirm}>
                Delete
              </Button>
              <Link to={`/docs/${data.id}`}>
                <Button>View</Button>
              </Link>
              <Link to="/docs">
                <Button>Back</Button>
              </Link>
            </div>
            <Field name="id" component="input" type="hidden" />

            <label htmlFor="name">Name</label>
            <Field name="name" component="input" type="text" />

            <label htmlFor="tags">Tags</label>
            <Field name="tags" component={renderTags} />

            <label htmlFor="wrap">
              <input type="checkbox" checked={wrap} name="wrap" onChange={() => setWrap(!wrap)} />
              <span className="ml-1">Wrap</span>
            </label>

            <Field
              name="text"
              component="textarea"
              wrap={wrap ? 'on' : 'off'}
              className="form-control"
              rows={15}
            />
          </form>
        )}
      </Form>
    </article>
  );
};
