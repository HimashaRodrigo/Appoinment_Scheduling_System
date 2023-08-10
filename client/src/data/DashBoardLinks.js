import { BsCashCoin, BsPersonFill, BsPersonPlusFill } from 'react-icons/bs';
import { IoDocuments } from 'react-icons/io5';
export const DashBoardLinks = [
    {
        Role:"Admin",
        Navs:[
            {
                text:"Add User",
                icon:<BsPersonPlusFill />,
                link:"/admin-add-user"
            },
            {
                text:"View User",
                icon: <BsPersonFill/>,
                link: "/admin-view-user"
            },
            {
                text:"Job Category Details",
                icon: <BsCashCoin/>,
                link: "/admin-view-user"
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
        ]
    },
    {
        Role:"Consaltant",
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