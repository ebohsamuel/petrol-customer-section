import React, { useEffect, useRef, useState } from 'react'
import aoc from '../assets/aoc.jpg'
import { XLg } from 'react-bootstrap-icons';

function AccountSettings() {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [previewData, setPreviewData] = useState({
    name: '',
    phone: '',
    email: '',
    img: '',
    address: ''
  })
  const [myProfile, setMyProfile] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    img: null
  });

  useEffect(() => {
    const staffData = {
      name: 'Samuel Eboh',
      phone: '08137908237',
      email: 'ebohsamuel007@yahoo.com',
      address: '269 MM Way B/C',
      img: aoc
    }
    setMyProfile(() => ({ ...staffData }));
  }, [])

  const handleEditProfileClick = () => {
    setShowProfileForm(true);
    const { img, ...newData } = myProfile
    setPreviewData(prevData => ({ ...prevData, ...newData }))
  }

  const handleChangePasswordClick = () => {
    setShowPasswordForm(true)
  }
  return (
    <div className='p-2 md:p-12 mt-12 md:mt-0'>
      <div className={`fixed top-0 left-0 z-40 bg-gray-500 w-screen h-screen transition-opacity duration-200 ease-in-out ${showProfileForm || showPasswordForm ? 'visible opacity-50' : 'invisible opacity-0'}`}></div>
      <PasswordForm setShowPasswordForm={setShowPasswordForm} showPasswordForm={showPasswordForm} />
      <ProfileForm setMyProfile={setMyProfile} setPreviewData={setPreviewData} previewData={previewData} setShowProfileForm={setShowProfileForm} showProfileForm={showProfileForm} />
      <div className='bg-white shadow-lg rounded-md p-4 space-y-4'>
        <img src={myProfile.img} alt='aoc pics' className='h-20 w-20 rounded-full object-contain' />
        <p><span className='text-gray-900 font-semibold text-[19px]'>Name:</span> <span className='text-[17px] bg-grey-500'>{myProfile.name}</span></p>
        <p><span className='text-gray-900 font-semibold text-[19px]'>Phone:</span> <span className='text-[17px] bg-grey-500'>{myProfile.phone}</span></p>
        <p><span className='text-gray-900 font-semibold text-[19px]'>Email:</span> <span className='text-[17px] bg-grey-500'>{myProfile.email}</span></p>
        <p><span className='text-gray-900 font-semibold text-[19px]'>Address:</span> <span className='text-[17px] bg-grey-500'>{myProfile.address}</span></p>
        <div className='sam-md:space-x-2 space-y-2'>
          <button onClick={handleEditProfileClick} className='bg-blue-600 text-white hover:bg-blue-500 px-8 py-2 rounded-lg shadow-lg focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 inline-block'>Edit Profile</button>
          <button onClick={handleChangePasswordClick} className='bg-blue-600 text-white hover:bg-blue-500 px-8 py-2 rounded-lg shadow-lg focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 inline-block'>Change Password</button>
        </div>
      </div>
    </div>
  )
}

export default AccountSettings




function ProfileForm({ showProfileForm, setShowProfileForm, previewData, setPreviewData, setMyProfile }) {
  const [notEditable, setNotEditable] = useState(true);
  const fileInputRef = useRef(null)

  const handleCancelClick = () => {
    setShowProfileForm(false)
    setNotEditable(true)
  }
  const formRef = useRef();
  const handleCoverClick = (e) => {
    if (showProfileForm && !formRef.current.contains(e.target)) {
      setShowProfileForm(false);
      setNotEditable(true)
    }
  }

  const handleEditButtonClick = () => {
    setNotEditable(prevData => !prevData)
  }
  const handleInputChange = (e) => {
    const { value, name, files } = e.target;
    setPreviewData(prevData => ({ ...prevData, [name]: name === 'img' ? files[0] : value }))
  }

  const handleSaveButtonClick = () => {
    setMyProfile(prevData => {
      return {
        name: previewData.name ? previewData.name : prevData.name,
        phone: previewData.phone ? previewData.phone : prevData.phone,
        email: previewData.email ? previewData.email : prevData.email,
        address: previewData.address ? previewData.address : prevData.address,
        img: previewData.img ? URL.createObjectURL(previewData.img) : prevData.img
      }
    });
    setPreviewData({
      name: '',
      phone: '',
      email: '',
      img: '',
      address: ''
    })
    setNotEditable(true)
    setShowProfileForm(false)
    fileInputRef.current.value = null;
  }

  return (
    <div onClick={handleCoverClick} className={`fixed top-0 left-0 w-screen h-screen p-2 z-50 flex justify-center items-center transition-opacity duration-400 ease-in-out ${showProfileForm ? 'visible opacity-100' : 'invisible opacity-0'}`}>
      <div ref={formRef} className='bg-white p-4 space-y-8 shadow-lg rounded-lg relative max-h-[90vh] overflow-y-auto overscroll-y-none'>
        <XLg onClick={handleCancelClick} className='absolute top-[10px] right-[10px] text-[24px] hover:cursor-pointer' />
        <div className='flex flex-col flex-none space-y-2'>
          <label className='block text-gray-600 font-semibold' htmlFor='name'>Full Name</label>
          <input onChange={handleInputChange} value={previewData.name} className='w-full h-12 px-4 focus:outline-none rounded-md drop-shadow-md text-gray-700 border border-gray-200 placeholder-gray-400' name='name' id='name' type='text' placeholder='Samuel Eboh' disabled={notEditable} />
        </div>
        <div className='flex flex-col flex-none space-y-2'>
          <label className='block text-gray-600 font-semibold' htmlFor='phone'>Phone Number</label>
          <input onChange={handleInputChange} value={previewData.phone} className='w-full h-12 px-4 focus:outline-none rounded-md drop-shadow-md text-gray-700 border border-gray-200 placeholder-gray-400' name='phone' id='phone' type='text' placeholder='08137908237' disabled={notEditable} />
        </div>
        <div className='flex flex-col flex-none space-y-2'>
          <label className='block text-gray-600 font-semibold'>Email</label>
          <input onChange={handleInputChange} value={previewData.email} className='w-full h-12 px-4 focus:outline-none rounded-md drop-shadow-md text-gray-700 border border-gray-200 placeholder-gray-400' id='email' type='email' name='email' placeholder='example@gmail.com' disabled={notEditable} />
        </div>
        <div className='flex flex-col flex-none space-y-2'>
          <label className='block text-gray-600 font-semibold'>Image Photo</label>
          <input ref={fileInputRef} onChange={handleInputChange} className={`file:h-full file:border-0 w-full h-12 ${notEditable ? 'file:cursor-not-allowed file:bg-gray-600' : 'file:cursor-pointer file:bg-gray-900 hover:file:bg-gray-600'} file:shadow-md file:font-semibold file:text-white focus:outline-none rounded-md drop-shadow-md text-gray-700 border border-gray-200 placeholder-gray-400`} name='img' id='img' type='file' accept="image/*" disabled={notEditable} />
        </div>
        <div className='flex flex-col flex-none space-y-2'>
          <label className='block text-gray-600 font-semibold' htmlFor='address'>Address</label>
          <textarea onChange={handleInputChange} value={previewData.address} className='w-full border rounded-md p-2 focus:outline-none border-gray-300' rows={2} name='address' id='address' placeholder='269 mm way b/c' disabled={notEditable} />
        </div>
        <div className='flex justify-end items-center gap-4'>
          <button onClick={handleEditButtonClick} className='bg-blue-600 text-white hover:bg-blue-500 px-8 py-2 rounded-lg shadow-lg focus:ring-1 focus:ring-blue-400 focus:ring-offset-1'>Edit</button>
          <button onClick={handleSaveButtonClick} disabled={notEditable} className='bg-blue-600 text-white hover:bg-blue-500 px-8 py-2 rounded-lg shadow-lg focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-blue-500'>Save</button>
        </div>
      </div>
    </div>
  )
}

function PasswordForm({ showPasswordForm, setShowPasswordForm }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData(prevData => ({...prevData, [name]: value}))
  }
  useEffect(() => {
    setIsDisabled(() => {
      const isEmpty = Object.values(passwordFormData).some(value => value === '')
      if (isEmpty || passwordFormData.newPassword.length < 8 || passwordFormData.confirmPassword !== passwordFormData.newPassword) {
        return true
      } else {
        return false
      }
    })
  }, [passwordFormData])
  const handleSaveButtonClick = () => {
    setShowPasswordForm(false);
    setPasswordFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    return;
  }
  const handleCancelClick = () => {
    setShowPasswordForm(false)
  }
  const formRef = useRef();

  const handleCoverClick = (e) => {
    if (showPasswordForm && !formRef.current.contains(e.target)) {
      setShowPasswordForm(false);
    }
  }
  return (
    <div onClick={handleCoverClick} className={`fixed top-0 left-0 w-screen h-screen p-2 z-50 flex justify-center items-center transition-opacity duration-400 ease-in-out ${showPasswordForm ? 'visible opacity-100' : 'invisible opacity-0'}`}>
      <div ref={formRef} className='bg-white min-w-[98%] sam:min-w-[50%] p-4 space-y-8 shadow-lg rounded-lg relative max-h-[90vh] overflow-y-auto overscroll-y-none'>
        <XLg onClick={handleCancelClick} className='absolute top-[10px] right-[10px] text-[24px] hover:cursor-pointer' />
        <div className='flex flex-col flex-none space-y-2'>
          <label className='block text-gray-600 font-semibold' htmlFor='currentPassword'>Current Password *</label>
          <input onChange={handleInputChange} value={passwordFormData.currentPassword} className='w-full h-12 px-4 focus:outline-none rounded-md drop-shadow-md text-gray-700 border border-gray-200 placeholder-gray-400' name='currentPassword' id='currentPassword' type='password' />
        </div>
        <div className='flex flex-col flex-none space-y-2'>
          <label className='block text-gray-600 font-semibold' htmlFor='newPassword'>New Password *</label>
          <input onChange={handleInputChange} value={passwordFormData.newPassword} className='w-full h-12 px-4 focus:outline-none rounded-md drop-shadow-md text-gray-700 border border-gray-200 placeholder-gray-400' name='newPassword' id='newPassword' type='password' placeholder='8 characters minimum' />
        </div>
        <div className='flex flex-col flex-none space-y-2'>
          <label className='block text-gray-600 font-semibold'>Confirm Password *</label>
          <input onChange={handleInputChange} value={passwordFormData.confirmPassword} className='w-full h-12 px-4 focus:outline-none rounded-md drop-shadow-md text-gray-700 border border-gray-200 placeholder-gray-400' id='confirmPassword' type='password' name='confirmPassword' />
        </div>
        <div className='flex justify-end items-center gap-4'>
          <button onClick={handleSaveButtonClick} disabled={isDisabled} className='bg-blue-600 w-full text-white hover:bg-blue-500 px-8 py-2 rounded-lg shadow-lg focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-blue-500'>Save</button>
        </div>
      </div>
    </div>
  )
}



