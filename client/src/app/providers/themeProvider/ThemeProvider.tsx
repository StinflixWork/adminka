import { PropsWithChildren, useState } from 'react'
import { FaMoon } from 'react-icons/fa'

import cl from 'classnames'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
	const localStorageTheme = localStorage.getItem('theme') || false
	const [isDark, setIsDark] = useState(localStorageTheme === 'dark')

	const handleToggleDark = () => {
		setIsDark(!isDark)
		localStorage.setItem('theme', !isDark ? 'dark' : 'light')
	}

	return (
		<div className={cl(isDark && 'dark')}>
			{children}
			<button
				className='absolute right-10 bottom-8 bg-white p-2 rounded-[50%] shadow-xl dark:bg-neutral-300 hover:-translate-y-1 transition-transform'
				onClick={handleToggleDark}
			>
				<FaMoon className='fill-blue-600 dark:fill-neutral-950' size={26} />
			</button>
		</div>
	)
}
