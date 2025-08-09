import { Translate as TranslateIcon } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { languages } from '#config/i18n';

export default function LanguageMenu() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const currentLang = languages.find((lang) => i18n.language === lang.value);

  return (
    <>
      <Button
        id="lang-menu-button"
        aria-controls="lang-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<TranslateIcon />}
        color="inherit"
      >
        {currentLang?.label}
      </Button>
      <Menu
        id="lang-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'lang-menu-button',
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.value}
            onClick={() => {
              i18n.changeLanguage(lang.value);
              setAnchorEl(null);
            }}
            selected={lang.value === currentLang?.value}
          >
            {lang.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
