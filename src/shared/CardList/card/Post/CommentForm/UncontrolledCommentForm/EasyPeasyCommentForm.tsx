import * as React from 'react';
import styles from './commentForm.css';
import { action, Action, createStore, createTypedHooks } from 'easy-peasy';

interface IStore {
  comment: string;
  setComment: Action<IComment, string>;
}

interface IComment {
  comment: string;
}

export const store = createStore<IStore>({
  comment: '',
  setComment: action((state, payload) => {
    state.comment = payload;
  }),
});

const commentHooks = createTypedHooks<IStore>();
const useStoreState = commentHooks.useStoreState;
const useStoreDispatch = commentHooks.useStoreDispatch;

export function EasyPeasyCommentForm() {
  const value = useStoreState((state) => state.comment);
  const { setComment } = useStoreDispatch();
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment(event.target.value);
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.input}
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <button type="submit" className={styles.button}>
        Коментировать
      </button>
    </form>
  );
}
