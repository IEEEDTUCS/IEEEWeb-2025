import boilerPlate from '@/layout/Boilerplate'
import React from 'react'
import Events from '@/components/Events'

function EventsPage() {

const eventsData=[

  
   {
    title:"Project WIEVEK",
    subheader:"July 19-21 2025",
    image:"https://www.ieeedtu.in/images/clients/wievek.jpg", // assuming the image is in public/images/clients/
    typography:"Empowering Young Minds in Engineering"
  },
   {
    title:"",
    subheader:"",
    image:"https://www.ieeedtu.in/images/clients/ieeeday24.jpg",
    typography:""
  },
   {
    title:"IEEEXtreme",
    subheader:"",
    image:"https://www.ieeedtu.in/images/clients/ieeextreme.png",
    Typography:"24-hour global competition"
  },
   {
    title:"",
    subheader:"",
    image:"https://www.ieeedtu.in/images/clients/MIST.jpg",
    Typography:""
  },
  
   {
    title:"",
    subheader:"",
    image:"https://www.ieeedtu.in/images/clients/devcraft.jpg",
    Typography:""
  },
   {
    title:"",
    subheader:"",
    image:"https://www.ieeedtu.in/images/clients/vihaan007.jpg",
    Typography:""
  },
   {
    title:"",
    subheader:"",
    image:"https://www.ieeedtu.in/images/clients/codecrunch.jpg",
    Typography:""
  },
   {
    title:"",
    subheader:"",
    image:"https://www.ieeedtu.in/images/clients/casestudy.jpg",
    Typography:""
  },
 
   {
    title:"",
    subheader:"",
    image:"https://www.ieeedtu.in/images/clients/techweek23.jpg",
    Typography:""
  },
   {
    title:"",
    subheader:"",
    image:"https://www.ieeedtu.in/images/clients/domain.jpg",
    Typography:""
  },
   {
    title:"",
    subheader:"",
    image:"https://www.ieeedtu.in/images/clients/field.jpg",
    Typography:""
  },
   {
    title:"",
    subheader:"",
    image:"https://www.ieeedtu.in/images/clients/prog.jpg",
    Typography:""
  },
  
   {
    title:"",
    subheader:"",
    image:"https://www.ieeedtu.in/images/clients/hackaithon.png",
    Typography:""
  },
   {
    title:"",
    subheader:"",
    image:"https://www.ieeedtu.in/images/clients/blockchain.png",
    Typography:""
  },
   {
    title:"",
    subheader:"",
    image:"https://www.ieeedtu.in/images/clients/wordquit.png",
    Typography:""
  },
   {
    title:"",
    subheader:"",
    image:"https://www.ieeedtu.in/images/clients/DSSYWC.png",
    Typography:""
  },
]




  return (
    <div style={{ display : 'grid',
      gridTemplateColumns:'4 rem',
       gridTemplateRows:'3 rem'

     }}>

        {eventsData.map((event, index) => {
        return <Events key={index} {...event} />
})}
    </div>
  )
}

export default boilerPlate(EventsPage)