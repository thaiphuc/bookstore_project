import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const useCart = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('access_token');

  const { refetch, data: cart = [], isError, error } = useQuery({
    queryKey: ['carts', user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Không thể lấy dữ liệu giỏ hàng');
      }
      return res.json();
    },
  });

  if (isError) {
    console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
    // Xử lý trạng thái lỗi ở đây (ví dụ: hiển thị thông báo lỗi)
  }

  return [cart, refetch];
};

export default useCart;