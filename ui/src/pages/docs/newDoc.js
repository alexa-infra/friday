import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { renderTags } from './tags';
import { Button } from '../../components';
import { useCreateDocMutation, usePutDocTextMutation } from '../../api';

export const DocNew = () => {
  const navigate = useNavigate();
  const [wrap, setWrap] = React.useState(false);
  const [create, createState] = useCreateDocMutation();
  const [putText, putTextState] = usePutDocTextMutation();
  React.useEffect(() => {
    if (createState.isSuccess && putTextState.isSuccess) {
      createState.reset();
      putTextState.reset();
      navigate(`/docs/${createState.data.id}`);
    }
  }, [createState, putTextState, navigate]);
  const onSubmit = async (values) => {
    const data = await create(values).unwrap();
    await putText({ id: data.id, text: values.text }).unwrap();
  }
  return (
    <article className="doc-page new">
      <Form
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="controls">
              <Button type="submit">
                Create
              </Button>
              <Link to="/docs">
                <Button>Back</Button>
              </Link>
            </div>

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
