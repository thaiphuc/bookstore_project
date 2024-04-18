import React from 'react'
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useBook = () => {
    const axiosPublic = useAxiosPublic();

    const {data: book = [], isPending: loading, refetch} = useQuery({
        queryKey: ['book'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/book');
            return res.data;
        }
    })
  
    return [book, loading, refetch]
}

export default useBook;