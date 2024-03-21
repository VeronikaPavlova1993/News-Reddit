import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout/Layout';
import './main.global.css';
import { CardsList } from './shared/CardList/CardsList';
import { Header } from './shared/Header/Header';
import { UserContextProvider } from './shared/context/userContext';
import { PostsContextProvider } from './shared/context/postsContext';
import { Provider } from 'react-redux';
import { rootReducer } from './store/store';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { saveToken } from './store/token/actions';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Post } from './shared/CardList/card/Post/Post';
import { NoMatch404 } from './shared/NoMatch(404)/NoMatch404';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

function AppComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  store.dispatch(saveToken());
  return (
    <>
      {mounted && (
        <BrowserRouter>
          <UserContextProvider>
            <Layout>
              <Header />
              <PostsContextProvider>
                <Switch>
                  <Route exact path="/auth">
                    <Redirect to="/posts" />
                  </Route>
                  <Route exact path="/">
                    <Redirect to="/posts" />
                  </Route>
                  <Route path="/posts">
                    <CardsList />
                    <Switch>
                      <Route path="/posts/:subreddit/:id">
                        <Post />
                      </Route>
                    </Switch>
                  </Route>
                  <Route path="*">
                    <NoMatch404 />
                  </Route>
                </Switch>
              </PostsContextProvider>
            </Layout>
          </UserContextProvider>
        </BrowserRouter>
      )}
    </>
  );
}

export const App = hot(() => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
));
