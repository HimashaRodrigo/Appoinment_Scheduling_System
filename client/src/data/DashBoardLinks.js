import { BsCashCoin, BsPersonFill, BsPersonPlusFill } from 'react-icons/bs';
import { IoDocuments } from 'react-icons/io5';
import { FaUserTie } from 'react-icons/fa';
export const DashBoardLinks = [
    {
        Role:"Admin",
        Navs:[
            {
                text:"Add Employees",
                icon:<BsPersonPlusFill />,
                link:"/admin-add-user"
            },
            {
                text:"View Users",
                icon: <BsPersonFill/>,
                link: "/admin-view-user"
            },
            {
                text:"Job Category Details",
                icon: <BsCashCoin/>,
                link: "/admin-job-categories"
            }
        ]
    },
    {
        Role:"Receptionist",
        Navs:[
            {
                text:"Appoinment Details",
                icon:<IoDocuments />,
                link:"/receptionist-appoinments"
            },
            {
                text:"Consultant/Job Seeker Details",
                icon:<FaUserTie />,
                link:"/receptionist-consaltants"
            },
        ]
    },
    {
        Role:"Consultant",
        Navs:[
            {
                text:"Appoinment Details",
                icon:<IoDocuments />,
                link:"/consaltant-appoinments"
            },
        ]
    },
    {
        Role:"Job-Seeker",
        Navs:[
            {
                text:"Appoinment Details",
                icon:<IoDocuments />,
                link:"/job-seeker-appoinments"
            },
        ]
    }
]