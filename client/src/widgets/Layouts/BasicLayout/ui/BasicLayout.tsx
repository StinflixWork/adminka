import { PropsWithChildren } from 'react'

export const BasicLayout = ({ children }: PropsWithChildren) => {
	return <div className='h-screen'>{children}</div>
}
