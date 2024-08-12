import { trio } from 'ldrs'

export const Loader = () => {
	trio.register()

	return <l-trio size='40' speed='1.3' color='black'></l-trio>
}
