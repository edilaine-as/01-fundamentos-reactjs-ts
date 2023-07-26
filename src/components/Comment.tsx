import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react';

interface CommentProps{
    content: string;
    onDeleteComment: (comment: string) => void;
}

export function Comment(props: CommentProps){
    const [likeCount, setLikeCount] = useState(0);

    function handleDeleteComment(){
        props.onDeleteComment(props.content);
    }

    function handleLikeComment(){
        setLikeCount(likeCount + 1);
    }

    return(
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/edilaine-as.png" alt=""/>

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Edilaine Santos</strong>
                            <time title='19 de julho às 20:00h' dateTime='2023-07-19 20:00:00'>Cerca de 1h atrás</time>
                        </div>

                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <Trash size={24} />
                        </button>
                    </header>
                    <p>{props.content}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp/>
                        Aplaudir
                        <span>{likeCount}</span>
                    </button>
                </footer>
            </div>

        </div>
    )
}