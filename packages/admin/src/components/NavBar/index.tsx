import React, { useContext, useEffect, useState } from 'react';
import {
  Tooltip,
  Input,
  Avatar,
  Select,
  Dropdown,
  Menu,
  Divider,
  Message,
  Button,
} from '@arco-design/web-react';
import {
  IconLanguage,
  IconSunFill,
  IconMoonFill,
  IconSettings,
  IconPoweroff,
  IconLock,
} from '@arco-design/web-react/icon';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '@/store';
import { GlobalContext } from '@/context';
import useLocale from '@/utils/useLocale';
import Logo from '@/assets/logo.svg';
import IconButton from './IconButton';
import Settings from '../Settings';
import styles from './style/index.module.less';
import defaultLocale from '@/locale';
import useStorage from '@/utils/useStorage';
import { generatePermission } from '@/routes';
import { FormChangePWD } from '@/pages/user/components/form-change-pwd';
import { FormUser } from '@/pages/user/components/form-user';
import { User } from '@/pages/user/api';

function Navbar({ show }: { show: boolean }) {
  const t = useLocale();
  const userInfo = useSelector((state: GlobalState) => state.userInfo);
  const dispatch = useDispatch();

  const [, setUserStatus] = useStorage('userStatus');
  const [, setToken] = useStorage('token');
  const [role, setRole] = useStorage('userRole', 'admin');

  const { setLang, lang, theme, setTheme } = useContext(GlobalContext);

  function logout() {
    setUserStatus('logout');
    setToken('');
    window.location.href = '/login';
  }

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  function onMenuItemClick(key) {
    if (key === 'logout') {
      logout();
    } else if (key === 'changepwd') {
      setVisible(true)
    } else if (key === 'setting') {
      setDrawerVisible(true)
    } else {
      Message.info(`You clicked ${key}`);
    }
  }

  useEffect(() => {
    dispatch({
      type: 'update-userInfo',
      payload: {
        userInfo: {
          ...userInfo,
          permissions: generatePermission(role),
        },
      },
    });
  }, [role]);

  const updateUserInfo = (info: Partial<User>) => {
    dispatch({
      type: 'update-userInfo',
      payload: {
        userInfo: {
          ...userInfo,
          ...info
        },
      },
    });
  }
  
  if (!show) {
    return (
      <div className={styles['fixed-settings']}>
        <Settings
          trigger={
            <Button icon={<IconSettings />} type="primary" size="large" />
          }
        />
      </div>
    );
  }

  // const handleChangeRole = () => {
  //   const newRole = role === 'admin' ? 'user' : 'admin';
  //   setRole(newRole);
  // };

  const droplist = (
    <Menu onClickMenuItem={onMenuItemClick}>
      {/* <Menu.SubMenu
        key="role"
        title={
          <>
            <IconUser className={styles['dropdown-icon']} />
            <span className={styles['user-role']}>
              {role === 'admin'
                ? t['menu.user.role.admin']
                : t['menu.user.role.user']}
            </span>
          </>
        }
      >
        <Menu.Item onClick={handleChangeRole} key="switch role">
          <IconTag className={styles['dropdown-icon']} />
          {t['menu.user.switchRoles']}
        </Menu.Item>
      </Menu.SubMenu> */}
      <Menu.Item key="setting">
        <IconSettings className={styles['dropdown-icon']} />
        {t['menu.user.setting']}
      </Menu.Item>
      <Menu.Item key="changepwd">
        <IconLock className={styles['dropdown-icon']} />
        {t['menu.user.changepwd']}
      </Menu.Item>
      {/* <Menu.SubMenu
        key="more"
        title={
          <div style={{ width: 80 }}>
            <IconExperiment className={styles['dropdown-icon']} />
            {t['message.seeMore']}
          </div>
        }
      >
        <Menu.Item key="workplace">
          <IconDashboard className={styles['dropdown-icon']} />
          {t['menu.dashboard.workplace']}
        </Menu.Item>
      </Menu.SubMenu> */}

      <Divider style={{ margin: '4px 0' }} />
      <Menu.Item key="logout">
        <IconPoweroff className={styles['dropdown-icon']} />
        {t['navbar.logout']}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navbar}>
      {/* logo */}
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles['logo-name']}>前端大班车</div>
        </div>
      </div>

      <ul className={styles.right}>
        {/* 搜索栏 */}
        <li>
          <Input.Search
            className={styles.round}
            placeholder={t['navbar.search.placeholder']}
          />
        </li>
        {/* 切换语言 */}
        <li>
          <Select
            triggerElement={<IconButton icon={<IconLanguage />} />}
            options={[
              { label: '中文', value: 'zh-CN' },
              { label: 'English', value: 'en-US' },
            ]}
            value={lang}
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: 'br',
            }}
            trigger="hover"
            onChange={(value) => {
              setLang(value);
              const nextLang = defaultLocale[value];
              Message.info(`${nextLang['message.lang.tips']}${value}`);
            }}
          />
        </li>
        {/* <li>
          <MessageBox>
            <IconButton icon={<IconNotification />} />
          </MessageBox>
        </li> */}
        {/* 切换暗黑模式 */}
        <li>
          <Tooltip
            content={
              theme === 'light'
                ? t['settings.navbar.theme.toDark']
                : t['settings.navbar.theme.toLight']
            }
          >
            <IconButton
              icon={theme !== 'dark' ? <IconMoonFill /> : <IconSunFill />}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
          </Tooltip>
        </li>
        {/* 选项设置 */}
        <Settings />
        {/* 当前用户信息 */}
        {userInfo && (
          <li>
            <Dropdown droplist={droplist} position="br">
              <Avatar size={32} style={{ cursor: 'pointer' }}>
                <img alt="avatar" src={userInfo.avatar} />
              </Avatar>
            </Dropdown>
          </li>
        )}
      </ul>

      {/* 修改用户信息 */}
      <FormUser
        user={userInfo}
        visible={drawerVisible}
        setVisible={setDrawerVisible}
        callback={updateUserInfo}
      ></FormUser>

      {/* 修改用户密码 */}
      <FormChangePWD
        visible={visible}
        setVisible={setVisible}
        user={userInfo}
      ></FormChangePWD>
    </div>
  );
}

export default Navbar;
