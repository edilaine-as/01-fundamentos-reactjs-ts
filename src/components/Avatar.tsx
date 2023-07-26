import { ImgHTMLAttributes } from 'react';

import styles from './Avatar.module.css'

//? antes de : quando não é obrigatorio
interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement>{
    hasBorder?: boolean;
}

//usando a desestruturação das minha props
//...props é como se fosse o que sobrou de hasBorder que é passado
export function Avatar({ hasBorder = true, ...props}: AvatarProps ){
    
    return(
        <img 
            className={hasBorder? styles.avatarWithBorder : styles.avatar} 
            {...props}
        />
    )
}