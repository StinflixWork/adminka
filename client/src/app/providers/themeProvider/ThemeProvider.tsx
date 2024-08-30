import { PropsWithChildren, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FloatButton } from 'antd'
import cl from 'classnames'
import { Languages, Moon, Sun } from 'lucide-react'

import { LANG } from '@shared/constants/languages.ts'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
	const localStorageTheme = localStorage.getItem('theme') || false
	const [isDark, setIsDark] = useState(localStorageTheme === 'dark')
	const [showLang, setShowLang] = useState(false)
	const { i18n, t } = useTranslation()

	const handleToggleDark = () => {
		setIsDark(!isDark)
		localStorage.setItem('theme', !isDark ? 'dark' : 'light')
	}

	const handleChangeLanguage = (lang: string) => {
		i18n.changeLanguage(lang)
		setShowLang(false)
	}

	return (
		<div className={cl(isDark && 'dark')}>
			{children}
			<FloatButton.Group
				trigger='click'
				shape='square'
				open={showLang}
				onClick={() => setShowLang(!showLang)}
				style={{ insetInlineEnd: 40, insetBlockEnd: 100 }}
				icon={<Languages size={18} />}
				tooltip={<div>{t('buttons.lang')}</div>}
			>
				<FloatButton
					icon={<div className='text-sm'>UK</div>}
					onClick={() => handleChangeLanguage(LANG.UKR)}
				/>
				<FloatButton
					icon={<div className='text-sm'>EN</div>}
					onClick={() => handleChangeLanguage(LANG.EN)}
				/>
			</FloatButton.Group>
			<FloatButton
				icon={isDark ? <Moon size={18} /> : <Sun size={18} />}
				onClick={handleToggleDark}
				tooltip={<div>{t('buttons.darkMode')}</div>}
				style={{ insetInlineEnd: 40, insetBlockEnd: 40 }}
			/>
		</div>
	)
}
