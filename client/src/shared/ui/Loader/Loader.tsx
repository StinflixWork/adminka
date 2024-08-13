import { trio } from 'ldrs'

export const Loader = () => {
	trio.register()

	return <l-trio size='40' speed='1.3' color='#3B3486'></l-trio>
}
