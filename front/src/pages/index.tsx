import React, { Suspense, lazy, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useThemeSwitcher } from 'react-css-theme-switcher';

import { urlFor } from 'src/routes';
import { connect } from 'src/utils/store';
import { getUserData, logoutUser } from 'src/store/services/authentication/actions';
import { Dispatch } from 'src/utils/types';
import { selectUser } from 'src/store/services/authentication/selectors';
import { User } from 'src/store/services/authentication/types';

import { Page } from 'src/components/Page';
import { Pendable } from 'src/components/Pendable';
import { ContentBox } from 'src/components/ContentBox';
import { Graphics } from 'src/components/Graphics';

import css from './styles.css';

const Skills = lazy(() => import('./Skills') as any);
// const NotFound = lazy(() => import('./NotFound') as any);

interface Props {
  user: User;
  getUserData: Dispatch<typeof getUserData>;
  logoutUser: Dispatch<typeof logoutUser>;
}

const ProtectedPagesFC = ({ user, getUserData, logoutUser }: Props): JSX.Element => {
  const { themes, switcher, currentTheme } = useThemeSwitcher();

  useEffect(() => {
    getUserData();
  }, []);

  const onLogout = (): void => {
    logoutUser();
  };

  const onHandleThemeChange = (mode: boolean): void => {
    switcher({ theme: mode ? themes.dark : themes.light });
  };

  return (
    <Pendable pending={false} pendingWrapperClassName={css.loading}>
      {user ? (
        <Page email={user.email} onThemeChange={onHandleThemeChange} onLogout={onLogout}>
          <Suspense fallback={<Pendable pending />}>
            <div className={css.root}>
              <div className={css.skills}>
                <ContentBox>
                  <Switch>
                    <Route exact path={urlFor('general')} component={Skills} />
                  </Switch>
                </ContentBox>
              </div>
              <Graphics />
            </div>
          </Suspense>
        </Page>
      ) : null}
    </Pendable>
  );
};

const mapStateToProps = (state) => ({ user: selectUser(state) });

export const ProtectedPages = connect(mapStateToProps, { getUserData, logoutUser })(ProtectedPagesFC);
