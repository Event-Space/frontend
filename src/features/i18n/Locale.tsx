import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/base';
import styles from './styles.module.scss';
import { Eng, Kaz, Rus } from '../../shared/icons';

export default function Locale() {
  const languages = [
    { language: 'ru', name: 'Русский', icon: Rus },
    { language: 'kk', name: 'Қазақ', icon: Kaz },
    { language: 'en', name: 'English', icon: Eng },
  ];

  const { i18n } = useTranslation();

  const onChangeLanguage = useCallback(
    (lang: string) => () => {
      i18n.changeLanguage(lang);
    },
    [i18n]
  );

  const getFullLang = useMemo(() => {
    switch (i18n.language) {
      case 'kk':
        return 'Қазақ';
      case 'ru':
        return 'Русский';
      default:
        return 'English';
    }
  }, [i18n.language]);

  return (
    <Dropdown>
      <MenuButton className={styles.menuButton}>{getFullLang}</MenuButton>
      <Menu className={styles.menu}>
        {languages.map((lang) => (
          <MenuItem
            key={lang.language}
            className={styles.menuItem}
            onClick={onChangeLanguage(lang.language)}
          >
            <img
              src={lang.icon}
              alt={lang.name}
              style={{ marginRight: '8px' }}
              width="20px"
            />
            {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
}
