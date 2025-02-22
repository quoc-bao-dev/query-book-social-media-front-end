// import FloatInput from '@/components/common/FloatInput';
// import Check from '@/components/icons/Check';
// import Xmark from '@/components/icons/X-mark';
// import React, { useState } from 'react';

// const UserEditForm = ({ user, onSave, onCancel }) => {
//   const [firstName, setFirstName] = useState(user.firstName);
//   const [lastName, setLastName] = useState(user.lastName);

//   const handleSave = () => {
//     onSave({ firstName, lastName });
//   };

//   return (
//     <div className="w-full flex space-x-4">
//       {/* Trường Họ */}
//       <div className="w-1/2">
//         <div className="relative">
//           <FloatInput
//             label="Họ"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Trường Tên */}
//       <div className="w-1/2">
//         <div className="relative">
//           <FloatInput
//             label="Tên"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Nút xác nhận và hủy */}
//       <div className="mt-2 flex justify-end space-x-2">
//         <button
//           className="w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer"
//           aria-label="Hủy"
//           onClick={onCancel}
//         >
//           <Xmark className="text-red-500" />
//         </button>
//         <button
//           className="w-7 h-7 bg-gray-200 flex items-center justify-center rounded-full hover:bg-gray-300 transition cursor-pointer"
//           aria-label="Xác nhận"
//           onClick={handleSave}
//         >
//           <Check className="text-primary-500" />
//         </button>
//       </div>
//     </div>
//   );
// };
// export default UserEditForm
