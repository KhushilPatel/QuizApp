import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
import React from 'react';

const Sidebar = () => {
    const router = useRouter();
    const { user } = useUser();
    console.log("sidebar", user);

    const isActive = (route) => {
        return router.pathname === route ? ' text-blue-500 ' : 'hover:bg-gray-100';
    };

    return (
        <div className="h-[750px] bg-white text-black w-[200px] shadow-lg border-r-2">
            <ul className="mt-6 flex flex-col gap-8">
                <li
                    className={`flex items-center px-4 py-3 cursor-pointer border-b-2 ${isActive(user?.isAdmin ?'/admin/dashboard':'/user/dashboard')}`}
                    onClick={() => router.push(user.isAdmin ?'/admin/dashboard':'/user/dashboard')}
                >
                    <img src="/images/dashboard.png" alt="Dashboard Icon" className="w-[40px] h-[40px] mr-3" />
                    <span className="block text-xl font-medium">Dashboard</span>
                </li>
                <li
                    className={`flex items-center px-4 py-3 cursor-pointer border-b-2 ${isActive(user?.isAdmin ?'/admin/quizzes':'/user/quizzes')}`}
                    onClick={() => router.push(user.isAdmin ?'/admin/quizzes':'/user/quizzes')}
                >
                    <img src="/images/quizzes.png" alt="Quizzes Icon" className="w-[40px] h-[40px] mr-3" />
                    <span className="block text-xl font-medium">Quizzes</span>
                </li>
                {user?.isAdmin &&
                    <>
                        <li
                            className={`flex items-center px-4 py-3 cursor-pointer border-b-2 ${isActive('/admin/question-bank')}`}
                            onClick={() => router.push('/admin/question-bank')}
                        >
                            <img src="/images/quizzes.png" alt="Quizzes Icon" className="w-[40px] h-[40px] mr-3" />
                            <span className="block text-xl font-medium">Question Bank</span>
                        </li>
                        <li
                            className={`flex items-center px-4 py-3 cursor-pointer border-b-2 ${isActive('/admin/students')}`}
                            onClick={() => router.push('/admin/students')}
                        >
                            <img src="/images/student.png" alt="Students Icon" className="w-[40px] h-[40px] mr-3" />
                            <span className="block text-xl font-medium">Students</span>
                        </li>
                    </>
                 }
                <li
                    className={`flex items-center px-4 py-3 cursor-pointer border-b-2 ${isActive(user?.isAdmin ? '/admin/results' : '/user/results')}`}
                    onClick={() => router.push(user?.isAdmin ? '/admin/results' : '/user/results')}
                >
                    <img src="/images/result.png" alt="Results Icon" className="w-[40px] h-[40px] mr-3" />
                    <span className="block text-xl font-medium">Results</span>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
