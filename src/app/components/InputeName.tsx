'use client'
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { selectUserState, setUserState } from '@/redux/user/userSlice';
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

const InputeName = () => {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserState);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userName.trim()) {
      setMessage('');
      dispatch(setUserState({ name: userName, authState: true }))
      router.refresh();
    } else {
      setMessage('Please input your name.');
    }
  }

  console.log(user);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }
  const content = (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <input
          type="text"
          id="username"
          name="username"
          value={userName}
          onChange={handleChange}
          className="text-2xl p-1 rounded-lg flex-grow w-full text-black"
          placeholder="Please, enter your name"
          autoFocus
        />

        <button type="submit" className="p-2 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-green-500 hover:cursor-pointer hover:bg-green-400">
          Submit
        </button>
      </form>
      <p>{message}</p>
    </>
  );

  return content;
}

export default InputeName;