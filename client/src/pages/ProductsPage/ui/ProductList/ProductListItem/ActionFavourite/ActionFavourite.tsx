import cn from 'classnames'
import { Star } from 'lucide-react'

import { useToggleFavouritesMutation } from '@entities/Product'

interface ActionFavouriteProps {
	id: string
	isFavourite: boolean | undefined
}

export const ActionFavourite = ({ id, isFavourite }: ActionFavouriteProps) => {
	const [toggleFavourites] = useToggleFavouritesMutation()
	const handleFavourites = async () => await toggleFavourites(id)

	return (
		<button onClick={handleFavourites}>
			<Star
				className={cn(
					'text-gray-400 hover:fill-gray-400 transition-colors',
					isFavourite && 'fill-gray-400'
				)}
			/>
		</button>
	)
}
