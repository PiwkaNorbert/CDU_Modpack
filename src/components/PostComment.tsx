import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

 
const PostComment = ( {borderColor, modpackId  } : {borderColor:string , modpackId: string }) => {
  
  const [comment, setComment] = React.useState<string>('')
  const queryClient = useQueryClient()

  const commentMutation = useMutation((comment: string) => fetch(`https://www.trainjumper.com/api/comment`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({comment, modpackId}),
    credentials: 'include',
  }
  ).then(res => res.json()),
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
    <form  method="post" className='flex items-center justify-center gap-4  pt-[.5em] ' onSubmit={ async(e: React.FormEvent<HTMLFormElement>)=>
      {
          e.preventDefault()
          if(commentMutation.isLoading) return;
          commentMutation.mutate(comment)
          // sent a post with axios with a body of the comment content and withCredentials to true and refresh the page to show the new comment IN REACT! 
      }} >
      <input
        type="text"
        className={` h-10 rounded-md w-full  border border-${borderColor}-300 px-3 py-1 text-sm`}
        placeholder="Add a comment..."
        onChange={(e) => setComment(e.target.value)}
        value={comment}

        />
      <button type="submit" className={`text-content  h-10 rounded-md  bg-${borderColor}-500 px-3 pT-1 text-sm`}>
        Post
      </button>
        </form>
  )
}

export default PostComment
