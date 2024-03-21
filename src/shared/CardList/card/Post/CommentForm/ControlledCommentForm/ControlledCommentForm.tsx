import * as React from 'react';
import styles from '../UncontrolledCommentForm/commentForm.css';
import { commentContext } from '../../../../../context/commentContext';

export function ControlledCommentForm() {
  const { name } = React.useContext(commentContext);
  const [value, setValue] = React.useState('');
  const refInput = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    setValue(name);
    refInput.current?.focus();
  }, [name]);
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
  }
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.input}
        value={value}
        onChange={handleChange}
        ref={refInput}
      />
      <button type="submit" className={styles.button}>
        Коментировать
      </button>
    </form>
  );
}
