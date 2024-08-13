import LogoIcon from '../../assets/images/logo.png'

export const Logo = () => {
	return (
		<div className='inline-flex items-center gap-x-2'>
			<img src={LogoIcon} alt='Dashboard' width='32' height='32' />
			<h1 className='text-2xl font-semibold text-orange-500'>ADM</h1>
		</div>
	)
}
