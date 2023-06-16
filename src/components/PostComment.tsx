import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import axios from 'axios'
 
const PostComment = ( {borderColor, modpackId  } : {borderColor:string , modpackId: string }) => {
  
  const [comment, setComment] = React.useState<string>('')
  const queryClient = useQueryClient()

  const commentMutation = useMutation((comment: string) => axios.post(`/api/comment`, {comment, modpackId},
  {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  }
  ),
  {  onSettled: () => {
    queryClient.invalidateQueries(["details", modpackId])
    setComment('')

  }
  , onSuccess: () => {
    queryClient.setQueriesData(["details", modpackId], (oldData: any) => {
      return {
        ...oldData,
        comments: [...oldData.comments, {comment, username: 'You'}]
      }
    })
    setComment('')
    toast.success('Comment posted!')
  }
  , onError: (error) => {
    toast.error(`Couldn't post comment: ${error}`)
  }

})

  return (
    <form  method="post" className='flex  items-center justify-center gap-4  pt-[.5em] text-sm xl:text-base ' onSubmit={ async(e: React.FormEvent<HTMLFormElement>)=>
      {
          e.preventDefault()
          // short circuit if the user is already posting a comment
          if(commentMutation.isLoading) return;

          // if statement to check if the user has any more comments left to post on this modpack 
          commentMutation.mutate(comment)
      }} >
      <input
        type="text"
        className={` h-10 rounded-md w-full dark:text-bg  border border-${borderColor}-300 px-3 py-1 `}
        placeholder="Add a comment..."
        onChange={(e) => setComment(e.target.value)}
        value={comment}

        />
      <button type="submit" className={`text-text  h-10 rounded-md  bg-${borderColor}-500   px-3 py-1 `}>
        Post
      </button>
    </form>
  )
}

export default PostComment
