import React, { useState } from 'react';
import { Input } from 'antd';
import { AiFillDelete } from 'react-icons/ai';

import useTodos from '../hooks/useTodos';
import axios from 'axios';
import { Button, message, Space } from 'antd';
import Swal from 'sweetalert2';
import Heading from '../Heading/Heading';
import { motion } from "framer-motion";

export default function Todo() {
  const [refetch, todos] = useTodos();
  const [messageApi, contextHolder] = message.useMessage();
  const [todoInput, setTodoInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let todo = todoInput;

    if (todo === '') {
      return Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'Please fill up input field',
      });
    }

    axios.post('/todos', { todo }).then((res) => {
      if (res.insertedId) {
        refetch();

        messageApi.open({
          type: 'success',
          content: 'Todo has been added',
        });

        setTodoInput(''); // Clear the input field
      }
    });
  };

  let handleDelete = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/todos/${_id}`).then((res) => {
          if (res.deletedCount > 0) {
            refetch();
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          }
        });
      }
    });
  };

  let handleTodo=(_id)=>{
    axios.patch(`/todos/${_id}`,{
      status:'complete'
    })
    .then(res=>{
      if(res.modifiedCount>0){
        refetch()
      }
    })
  }

  let handleNotTodo=(_id)=>{
    axios.patch(`/todos/${_id}`,{
      status:'not-complete'
    })
    .then(res=>{
      if(res.modifiedCount>0){
        refetch()
      }
    })
  }

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit} className='flex mt-14 justify-center gap-3 md:gap-10 items-center'>
        <div className='text-center'>
          <Input
            placeholder='Todo'
            name='todo'
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            className='md:w-96 py-5 placeholder-white text-white border-yellow-500 bg-zinc-800'
          />
        </div>
        <div>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.1 }}
            className=' rounded-md md:text-5xl  text-3xl text-center btn border border-yellow-500 hover:bg-yellow-500 duration-300 hover:text-white text-yellow-500 md:p-7 p-3 bg-zinc-800 flex justify-center '
          >
            +
          </motion.button>
        </div>
      </form>

      <div></div>

      {/* lists todo */}
      <div className='mt-10'>
        <ul className='md:w-4/12 mx-auto h-96 overflow-y-scroll no-scrollbar'>
          {todos.length === 0 ? (
            <Heading />
          ) : (
            todos.map((task) => {
              return (
                <li
                  key={task._id}
                  className={` shadow-md border mt-8 border-yellow-500 rounded-lg bg-zinc-800 p-4 flex justify-between  duration-300 items-center md:flex-row flex-col text-white ${task.status==='complete'&& 'line-through'} cursor-pointer hover:line-through   `}
                onClick={()=>{task.status==='complete'?handleNotTodo(task._id):handleTodo(task._id)}}
                  
                >
                  
                  <div>
                   <h2 className='text-2xl text-white  mb-5 md:mb-0'>{task.todo}</h2>
                  </div>
                  <div className='flex md:flex-row justify-center items-center gap-2'>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.1 }}
                      onClick={() => handleDelete(task._id)}
                      className=' rounded-md md:text-xl   text-center btn border border-yellow-500 hover:bg-yellow-500 duration-100 hover:text-white text-yellow-500  p-3 bg-zinc-800 flex justify-center '
                    >
                      <AiFillDelete />
                    </motion.button>
                  </div>
                </li>
              );
            })
          )}
        </ul>

      </div>
    </>
  );
}
