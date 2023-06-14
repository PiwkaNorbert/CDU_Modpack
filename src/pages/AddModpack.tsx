import React from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import {  toast } from 'react-toastify'
import { Header } from '../components/Header'
import axios from 'axios'

export interface AddModpackProps {
  modpackName: string
  modpackDescription: string
  modpackImage: File | undefined
  modpackColor: string
  modpackSuggestor: string
}

const AddModpack = () => {
    const [modpackName, setModpackName] = React.useState<string>('')
    const [modpackDescription, setModpackDescription] = React.useState<string>('')
    const [modpackImage, setModpackImage] = React.useState<File>()
    const [modpackColor, setModpackColor] = React.useState<string>('sky')
    const [modpackSuggestor, setModpackSuggestor] = React.useState<string>('')

    const colorOptions = [
      { value: 'red', label: 'Red' },
      { value: 'orange', label: 'Orange' },
      { value: 'yellow', label: 'Yellow' },
      { value: 'lime', label: 'Lime' },
      { value: 'green', label: 'Green' },
      { value: 'teal', label: 'Teal' },
      { value: 'sky', label: 'Sky' },
      { value: 'blue', label: 'Blue' },
      { value: 'violet', label: 'Violet' },
      { value: 'fuchsia', label: 'Fuchsia' },
    ]

    const queryClient = useQueryClient()
  
    const addModpackMutation = useMutation(({modpackName, modpackDescription,modpackImage,modpackColor,modpackSuggestor}: AddModpackProps) =>

      
       axios.post(`/api/add-modpack`,{modpackName, modpackDescription,modpackImage,modpackColor,modpackSuggestor},
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    }
    ),
    {  onSettled: () => {
      queryClient.invalidateQueries(["modpacks"])

      setModpackName('')
      setModpackDescription('') 
      setModpackImage(undefined) 
      setModpackColor('')
      setModpackSuggestor('')
  
    }, onSuccess: () => {
    queryClient.setQueriesData(["modpacks"], (oldData: any) => [...oldData, {modpackName, modpackDescription,modpackImage,modpackColor,modpackSuggestor}])
      toast.success('Modpack Added!')  
    }, onError: (error) => {
      toast.error(`Couldn't post comment: ${error}`)
    }
  
  })

  const borderColor = modpackColor || 'sky';
  
  const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      
      setModpackImage(e.target.files[0])
      console.log(modpackImage)
    }
  } 
  
    return (
      <>
        <Header />
        {/* Title of the form, centered */}
        <div className='flex items-center justify-center'>
          <h1 className='text-2xl xl:text-3xl text-bkg-0 dark:text-bkg-0 m-3 mt-5'>Create a new CDU Modpack Listing!</h1>
        </div>
        <form  method="post" className='grid items-center placeholder:text-slate-400 justify-center gap-4 text-bkg-0  pt-[.5em]  text-sm xl:text-base' onSubmit={ async(e: React.FormEvent<HTMLFormElement>)=>
          {
              e.preventDefault()
             
              if(addModpackMutation.isLoading) return;
              
              addModpackMutation.mutate({modpackName, modpackDescription,modpackImage,modpackColor,modpackSuggestor})
          }} >
          
          {/* Modpack name field, single line. */}
          <input required className={` h-8 rounded-md border-2 dark:bg-bkg-50 border-${borderColor}-500 px-3 py-1`} type="text" placeholder="Modpack Name" value={modpackName} onChange={(e) => setModpackName(e.target.value)} />
          
          {/* Modpack description field, multi line. */}
          {/* In order to make the modpack field multi line, we need to use a textarea instead of an input. */}
          <textarea
            className={` min-h-[100px] rounded-md border-2 dark:bg-bkg-50  border-${borderColor}-500 px-3 py-1 w-96 out-of-range:border-red-500 `}
            placeholder="Modpack Description"
            value={modpackDescription}

            required
            onChange={(e) =>{
              const newLength = e.target.value.length;
                if (newLength >= 0 &&  newLength <= 500){
                  return setModpackDescription(e.target.value)
                } 
                toast.error("Too many characters")
              
              }}
          />
          {/* Adds a character counter to the description field */}
          <div className='flex items-center -mt-2 justify-center'>
            <p>{modpackDescription.length}/500</p>
          </div>

          {/*Color selection*/}
          <select className={` h-8 rounded-md text-bkg-0 dark:text-bkg-100 border-2 border-${borderColor}-500 bg-${borderColor}-300 px-3 py-1 font-Tilt `} value={modpackColor} onChange={(e) => setModpackColor(e.target.value)}>
            {colorOptions.map((colorOption,index) => (
              <option key={index} value={colorOption.value} className={`hover:bg-${colorOption?.value}-500`} >
                {colorOption.label}
              </option>
            ))}
          </select>
          

          <p className='-mb-2'>Modpack Image</p>
          <input required name='modpack__image--input' className={`rounded-md border-2 cursor-pointer  file:placeholder:text-slate-400  border-${borderColor}-500   w-full h-8  px-3 py-1 `} type="file"   onChange={fileSelectedHandler} />
            
          <label htmlFor='modpack__image--input' className={`-mt-2 text-sm xl:text-base`}> (PNG or JPG MAX. 5MB, 640x480px) </label>
          
          {/* Modpack suggestor field, single line. */}
          <input  className={`h-8 rounded-md border-2 dark:bg-bkg-50  border-${borderColor}-500 px-3 py-1 `} type="text" placeholder="Modpack Suggestor" value={modpackSuggestor} onChange={(e) => setModpackSuggestor(e.target.value)} />

          <br/>
          
          <button className={`text-bkg-0 dark:text-bkg-100 h-16 rounded-md border-2 border-black bg-${borderColor}-500 px-3 py-1 text-sm xl:text-base`}>
          Add Modpack
          </button>

        </form>

      </>
    )
  }



export default AddModpack