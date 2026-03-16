"use client"
import { Button } from '@/components/ui/button';
import { useGetUsers } from '@/hooks/useGetUsers';
import { usePostStore } from '@/store/usePosts';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const UserPage = () => {
    const {data} = useGetUsers();
   const router = useRouter();
   const [search, setSearch] = useState("");
   const {posts} = usePostStore()
   console.log(posts)

  const filteredUsers = data?.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) || 
      user.email.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className='max-w-5xl mx-auto p-6'>
      <div className='m-6'> 
        <input type="text"
        placeholder='Search users...' 
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        className='w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black '/>
      </div>

    <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 '>
      {filteredUsers?.map((item,index)=>(
        <div key={index} className='px-3 py-4 rounded-xl bg-[#d8dce6] shadow-lg hover:shadow-xl flex flex-col justify-center'>
            <div className='text-2xl '>{item.name}</div>
            <div className='italic text-gray-800'>{item.email}</div>
            <div className='mb-2'>{item.company.name}</div>
            <Button onClick={()=> router.push(`/users/${item.id}`)}
            >View Posts</Button>
        </div>
      ))}
      </div>
    </div>
  )
}

export default UserPage
