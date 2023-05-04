import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'

// Only add this to the experimental version of next js
import ClientOnly from './components/ClientOnly'


import RegisterModal from './components/modals/RegisterModal'
import ToastProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'

import { getSession } from './actions/getCurrentUser'


const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb clone',
  description: 'Airbnb airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = getSession();

  const currentUser = await getCurrentUser();


  // console.log(session)



  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <Navbar currentUser={currentUser} />
          <ToastProvider />
          {/* Modals */}
          <LoginModal />
          <RegisterModal  />
        </ClientOnly>
        
        {children}
      </body>
    </html>
  )
}
