import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author{
    name: string;
    role: string;
    avatarUrl: string;
}

export interface PostType{
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[]; //é um array da minha interface Content
}

interface PostProps{
    post: PostType;
}

interface Content{
    type: 'paragraph' | 'link';
    content: string;
}

export function Post( { post } : PostProps){
    const [comments, setComments] = useState([
        "Post muito boom!"
    ])

    //é importante eu inicializar o estado do react com uma informação que tem o mesmo formato, o mesmo tipo da informação que vamos armazenar dps
    //se eu armazenar um texto, estado é '', se eu armazenar um array de comentarios, [] etc...
    const [newCommentText, setNewCommentText] = useState('')
    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {locale: ptBR});
    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    //precisamos importar os eventos no typescript
    function handleCreateNewComment(event: FormEvent){
        event.preventDefault();

        //copia todos os comentarios que eu ja tenho usando o Spread Operator
        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    //tive que passar um parametro no ChangeEvent porque o evento foi disparado pelo meu textarea, e o nome doq é passado entre <> é generic
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function deleteComment(commentToDelete: string){
        //lista de comentario sem o deletado
        const commentsWithoutDeleteOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })

        setComments(commentsWithoutDeleteOne);

    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {post.content.map(line => {
                    if(line.type === 'paragraph'){
                        return <p key={line.content}>{line.content}</p>;
                    }else if(line.type === 'link'){
                        return <p key={line.content}><a href="">{line.content}</a></p>;
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    name='comment'
                    placeholder='Deixe um comentário'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment 
                            key={comment} 
                            content={comment} 
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}
