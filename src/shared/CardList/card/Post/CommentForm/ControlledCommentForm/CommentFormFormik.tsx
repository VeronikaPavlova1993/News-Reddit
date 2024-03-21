import styles from '../UncontrolledCommentForm/commentForm.css';
import React from 'react';
import { useFormik } from 'formik';
import { commentContext } from '../../../../../context/commentContext';

interface ICommentForm {
  text: string;
}

export function CommentFormFormik() {
  const { name } = React.useContext(commentContext);
  const refInput = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    refInput.current?.focus();
  }, [name]);

  function handleSubmit() {
    alert('Комментарий отправлен');
  }

  function validateValue(values: ICommentForm) {
    const errors = { text: '' };
    if (values.text.length <= 3) {
      errors.text = 'Введите более 3-х cимволов';
      return errors;
    }
  }

  const formik = useFormik({
    initialValues: {
      text: name ? `${name}` : '',
    },
    onSubmit: handleSubmit,
    validate: validateValue,
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <textarea
        id="text"
        name="text"
        className={styles.input}
        value={formik.values.text}
        onChange={formik.handleChange}
        aria-invalid={formik.errors.text ? 'true' : undefined}
        ref={refInput}
        onFocus={(event) =>
          event.currentTarget.setSelectionRange(
            event.currentTarget.value.length,
            event.currentTarget.value.length
          )
        }
      />
      {formik.touched && formik.errors.text && <div>{formik.errors.text}</div>}
      <button type="submit" className={styles.button}>
        Комментировать
      </button>
    </form>
  );
}
